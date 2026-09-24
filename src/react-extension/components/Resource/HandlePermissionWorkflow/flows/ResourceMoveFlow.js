/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.16.0
 */
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { withAppContext } from "../../../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../../../contexts/DialogContext";
import { withActionFeedback } from "../../../../contexts/ActionFeedbackContext";
import ShareDialog from "../../../Share/ShareDialog";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import PermissionsCollection from "../../../../../shared/models/entity/permission/permissionsCollection";
import MoveItemsServiceWorkerService from "../../../../../shared/services/serviceWorker/move/moveItemsServiceWorkerService";
import { AbstractPermissionFlow, PERMISSION_FLOW_STATUS } from "./AbstractPermissionFlow";

/**
 * Status values of the resource-move flow: the shared ones plus the move dialog state.
 * @type {Readonly<{INITIALIZING: string, SHARE_DIALOG_OPEN: string, ERROR: string}>}
 */
export const RESOURCE_MOVE_FLOW_STATUS = Object.freeze({
  ...PERMISSION_FLOW_STATUS,
  SHARE_DIALOG_OPEN: "share-dialog-open",
});

/**
 * Orchestrates the resource-move flow: a move applies the destination folder's permissions to the
 * moved resources.
 *
 * 1. Snapshot the destination permissions. The root and a personal folder contribute nothing.
 * 2. Move without the dialog when no owned resource would change permission.
 * 3. Otherwise open ShareDialog so the operator reviews and edits the permissions first.
 * 4. On confirmation, re-snapshot to catch a concurrent change, then hand the permissions to the
 *    service worker, which applies them to the owned resources and performs the move.
 *
 * The flow stays mounted until the operator cancels or the move ends, then calls `props.onStop()`.
 */
export class ResourceMoveFlow extends AbstractPermissionFlow {
  /**
   * Default constructor.
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.moveItemsServiceWorkerService = new MoveItemsServiceWorkerService(props.context.port);
    // The selection never changes, so derive the ids and the owned subset once.
    this.resourcesIds = props.resources.map((resource) => resource.id);
    this.ownedResourceIds = new Set(
      props.resources.filter((resource) => this.isOwnedItem(resource)).map((resource) => resource.id),
    );
    /*
     * The resources whose permissions this move can change: the owned ones that really do move.
     * One already in the destination keeps its permissions, so it is neither shown nor counted.
     */
    this.rePermissionedResourceIds = new Set(
      props.resources
        .filter(
          (resource) =>
            this.ownedResourceIds.has(resource.id) &&
            (resource.folder_parent_id ?? null) !== (props.destinationFolderId ?? null),
        )
        .map((resource) => resource.id),
    );
    // Instance flag (not state) so the close-after-confirm signal is visible synchronously.
    this.moveConfirmed = false;
    this.handleShareDialogConfirm = this.handleShareDialogConfirm.bind(this);
    this.handleShareDialogClose = this.handleShareDialogClose.bind(this);
  }

  /**
   * Get default state.
   * @returns {Object}
   */
  get defaultState() {
    return {
      status: RESOURCE_MOVE_FLOW_STATUS.INITIALIZING,
      snapshot: null,
      movedSnapshots: null,
    };
  }

  /**
   * The destination folder id, or null when moving to the root.
   * @returns {string|null}
   */
  get destinationFolderId() {
    return this.props.destinationFolderId ?? null;
  }

  /**
   * Snapshot the destination, then open the dialog only if an owned resource would really change
   * permission. A destination shared with nobody can still change them.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    try {
      const snapshot = this.destinationFolderId
        ? await this.permissionSnapshotService.buildSnapshotForFolderShare(this.destinationFolderId)
        : null;
      if (this.rePermissionedResourceIds.size === 0) {
        /*
         * The operator owns none of the resources, or the owned ones are already in the
         * destination. No permission can change, so move without the dialog.
         */
        const result = await this.moveItemsServiceWorkerService.moveResources(
          this.resourcesIds,
          this.destinationFolderId,
          null,
        );
        await this.finalizeMove(result);
        return;
      }
      // The permissions each owned resource ends up with, which decide whether the dialog opens.
      const movedSnapshots = await this.permissionSnapshotService.buildSnapshotForResourcesShare(this.resourcesIds);
      const parentPermissionsById = await this.findOwnedResourcesParentPermissions();
      const appliedPermissions = this.buildAppliedPermissions(movedSnapshots, parentPermissionsById, snapshot);
      // Owning a resource is not enough: a permission has to actually change.
      const anyOwnedResourceHasDelta = this.props.resources.some(
        (resource, index) =>
          this.rePermissionedResourceIds.has(resource.id) &&
          this.permissionChangesService.hasPermissionsDelta(
            movedSnapshots[index].permissions,
            appliedPermissions[index],
          ),
      );
      if (!anyOwnedResourceHasDelta) {
        const result = await this.moveItemsServiceWorkerService.moveResources(
          this.resourcesIds,
          this.destinationFolderId,
          null,
        );
        await this.finalizeMove(result);
        return;
      }
      // The dialog needs two sets: the permissions each resource has now, which the badges and the
      // revert button compare against, and the ones the move applies, staged on top once the dialog is open.
      this.initialResources = this.buildInitialResources(this.props.resources, movedSnapshots);
      this.appliedPermissionsByItemId = new Map(
        this.props.resources
          .map((resource, index) => [resource.id, appliedPermissions[index]])
          .filter(([, applied]) => applied !== null),
      );
      this.setState({ snapshot, movedSnapshots }, () => this.openMoveDialog());
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * The current parent-folder permissions of the owned moved resources, by folder id.
   * A resource at the root has no parent and is absent from the map.
   * @returns {Promise<Object<string, PermissionsCollection>>}
   */
  async findOwnedResourcesParentPermissions() {
    const parentPermissionsById = {};
    for (const resource of this.props.resources) {
      const parentFolderId = resource.folder_parent_id;
      if (parentFolderId && this.rePermissionedResourceIds.has(resource.id) && !parentPermissionsById[parentFolderId]) {
        parentPermissionsById[parentFolderId] = await this.permissionServiceWorkerService.findPermissions(
          parentFolderId,
          PermissionEntity.ACO_FOLDER,
        );
      }
    }
    return parentPermissionsById;
  }

  /**
   * The permissions each owned moved resource ends up with: the ones it keeps plus the
   * destination's, the higher level winning. A resource the operator does not own gives null.
   * @param {Array<PermissionSnapshotEntity>} movedSnapshots The moved resources' own permission snapshots.
   * @param {Object<string, PermissionsCollection>} parentPermissionsById The owned resources' current parent permissions, by folder id.
   * @param {PermissionSnapshotEntity|null} snapshot The destination folder's permission snapshot. Null
   *   for a move to the root, which has nothing to contribute.
   * @returns {Array<PermissionsCollection|null>} Aligned with `this.props.resources`.
   */
  buildAppliedPermissions(movedSnapshots, parentPermissionsById, snapshot) {
    return this.props.resources.map((resource, index) => {
      if (!this.rePermissionedResourceIds.has(resource.id)) {
        return null;
      }
      return PermissionsCollection.calculateMovedPermissions({
        itemPermissions: movedSnapshots[index].permissions,
        parentPermissions: this.getParentPermissions(resource, parentPermissionsById),
        destinationPermissions: snapshot?.permissions ?? null,
        operatorPermission: new PermissionEntity(resource.permission),
        aco: PermissionEntity.ACO_RESOURCE,
        acoForeignKey: resource.id,
      });
    });
  }

  /**
   * The current parent-folder permissions of a moved resource, or null when it sits at the root.
   * A parent that could not be retrieved throws, it would be read as "nothing to drop".
   * @param {object} resource The moved resource DTO.
   * @param {Object<string, PermissionsCollection>} parentPermissionsById The parent permissions by folder id.
   * @returns {PermissionsCollection|null}
   * @throws {Error} if the resource's parent folder permissions are missing.
   * @private
   */
  getParentPermissions(resource, parentPermissionsById) {
    if (!resource.folder_parent_id) {
      return null;
    }
    const parentPermissions = parentPermissionsById[resource.folder_parent_id];
    if (!parentPermissions) {
      throw new Error("Could not move, the permissions of a resource's parent folder could not be retrieved.");
    }
    return parentPermissions;
  }

  /**
   * Open ShareDialog seeded with the resources' current permissions and the ones the move applies.
   * ShareDialog stages the latter on mount, so the badges show without any operator edit.
   */
  openMoveDialog() {
    // The not-owned resources only move, so the dialog lists them as unchanged.
    const unchangedAcos = this.props.resources
      .filter((resource) => !this.ownedResourceIds.has(resource.id))
      .map((resource) => ({ id: resource.id, name: resource.metadata?.name }));
    const { groups, users } = this.mergeArosFromSnapshots(
      [this.state.snapshot, ...this.state.movedSnapshots].filter(Boolean),
    );
    this.props.dialogContext.open(ShareDialog, {
      initialResources: this.initialResources,
      initialGroups: groups,
      initialUsers: users,
      initialAppliedPermissions: this.appliedPermissionsByItemId,
      unchangedAcos,
      onConfirm: this.handleShareDialogConfirm,
      onClose: this.handleShareDialogClose,
    });
    this.setState({ status: RESOURCE_MOVE_FLOW_STATUS.SHARE_DIALOG_OPEN });
  }

  /**
   * Handle the operator's confirmation: abort if the permissions changed during the review,
   * otherwise hand the confirmed ones to the service worker, which applies them and moves.
   * @param {Array<object>} permissionChanges The DTO-shape permission changes ShareDialog emits.
   * @returns {Promise<void>}
   */
  async handleShareDialogConfirm(permissionChanges) {
    this.moveConfirmed = true;
    try {
      await this.assertDestinationPermissionsUnchanged(this.destinationFolderId, this.state.snapshot);
      // The confirmed set was built when the dialog opened, so applying it now would silently undo
      // a permission somebody else changed since.
      const currentMovedSnapshots = await this.permissionSnapshotService.buildSnapshotForResourcesShare(
        this.resourcesIds,
      );
      const aMovedResourceDrifted = currentMovedSnapshots.some(
        (snapshot, index) => !this.state.movedSnapshots[index].equals(snapshot),
      );
      if (aMovedResourceDrifted) {
        throw new Error(
          this.props.t(
            "The permissions of a resource being moved changed during your review. Please retry the operation and verify the permissions again.",
          ),
        );
      }
      const confirmedPermissionsByItemId = this.permissionChangesService.buildAuthoritativeMovePermissions(
        this.initialResources,
        permissionChanges,
        PermissionEntity.ACO_RESOURCE,
      );
      const result = await this.moveItemsServiceWorkerService.moveResources(
        this.resourcesIds,
        this.destinationFolderId,
        confirmedPermissionsByItemId,
      );
      await this.finalizeMove(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handle ShareDialog closing: a close that does not follow a confirmation is a cancellation.
   */
  handleShareDialogClose() {
    if (this.moveConfirmed) {
      return;
    }
    this.terminate();
  }

  /**
   * Finalize the move from the service-worker result. It skips the resources it cannot move, so
   * warn when some were skipped and error when none moved at all.
   * @param {{skippedResourceIds: Array<string>}|undefined} result The service-worker move result.
   * @returns {Promise<void>}
   */
  async finalizeMove(result) {
    const skippedResourceIds = result?.skippedResourceIds ?? [];
    const movedResourceIds = this.resourcesIds.filter((id) => !skippedResourceIds.includes(id));

    if (movedResourceIds.length === 0) {
      await this.props.actionFeedbackContext.displayError(this.props.t("The resources could not be moved."));
      this.terminate();
      return;
    }
    if (skippedResourceIds.length > 0) {
      await this.props.actionFeedbackContext.displayWarning(
        this.props.t("Some resources could not be moved and were left in place."),
      );
      this.props.history.push(`/app/passwords/view/${movedResourceIds[0]}`);
      this.terminate();
      return;
    }
    await this.finalizeSuccess(
      this.props.t("The resources have been moved successfully."),
      `/app/passwords/view/${movedResourceIds[0]}`,
    );
  }
}

ResourceMoveFlow.propTypes = {
  ...AbstractPermissionFlow.propTypes,
  resources: PropTypes.array.isRequired, // the resource DTOs being moved
  destinationFolderId: PropTypes.string, // the destination folder id, or null/undefined for the root
};

export default withAppContext(withDialog(withActionFeedback(withRouter(withTranslation("common")(ResourceMoveFlow)))));
