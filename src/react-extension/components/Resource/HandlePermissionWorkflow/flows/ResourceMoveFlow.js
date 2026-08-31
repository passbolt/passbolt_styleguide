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
 * Status values driving the resource-move flow state machine.
 * Extends the shared base status enum with the move-specific dialog state.
 * @type {Readonly<{INITIALIZING: string, SHARE_DIALOG_OPEN: string, ERROR: string}>}
 */
export const RESOURCE_MOVE_FLOW_STATUS = Object.freeze({
  ...PERMISSION_FLOW_STATUS,
  SHARE_DIALOG_OPEN: "share-dialog-open",
});

/**
 * Orchestrates the resource-move flow.
 * The destination folder's permissions are what the move proposes for the moved resources.
 *
 * 1. Snapshot the destination folder's permissions. The root and a personal folder snapshot to
 *    nothing, they simply have nothing to contribute.
 * 2. Move without opening the dialog when the operator owns none of the resources, or when nothing
 *    would change for any of the ones they own. This is checked even for a destination that shares
 *    with nobody: losing a permission with nothing to replace it is still a change.
 * 3. Otherwise open ShareDialog, seeded from the destination snapshot, so the operator can review
 *    and edit the permissions before anything is encrypted.
 * 4. On confirmation, snapshot the destination again to catch a change made during the review,
 *    rebuild the permissions each resource must end up with, and hand them to the service worker,
 *    which applies them to the owned resources and performs the move.
 *
 * The flow stays mounted until the operator cancels or the move succeeds, then calls
 * `props.onStop()` to deregister itself.
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
    // The moved selection is fixed for the flow's lifetime: derive the owned subset once.
    this.ownedResourceIds = new Set(
      props.resources.filter((resource) => this.isOwnedItem(resource)).map((resource) => resource.id),
    );
    /*
     * The resources whose permissions this move can change: the owned ones that really do move.
     * A resource already sitting in the destination does not move, and the service worker leaves its
     * permissions alone. It must therefore not appear in the dialog, nor count towards the change.
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
   * The ids of the resources being moved.
   * @returns {Array<string>}
   */
  get resourcesIds() {
    return this.props.resources.map((resource) => resource.id);
  }

  /**
   * The destination folder id, or null when moving to the root.
   * @returns {string|null}
   */
  get destinationFolderId() {
    return this.props.destinationFolderId ?? null;
  }

  /**
   * Component did mount. Snapshot the destination, or nothing at all when moving to the root.
   * The dialog then opens on two conditions: the operator owns something, and something would
   * actually change. Whether the destination is shared is never enough on its own.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    try {
      const snapshot = this.destinationFolderId
        ? await this.permissionSnapshotService.buildSnapshotForFolderShare(this.destinationFolderId)
        : null;
      if (this.rePermissionedResourceIds.size === 0) {
        /*
         * No permission can change here. Either the operator owns none of the selected resources, or
         * the ones they own are already in the destination. Nothing is encrypted and no secret is
         * shared, so move without the dialog. The service worker moves the ones that can move.
         */
        const result = await this.moveItemsServiceWorkerService.moveResources(
          this.resourcesIds,
          this.destinationFolderId,
          null,
        );
        await this.finalizeMove(result);
        return;
      }
      // At least one resource is owned. Work out the permissions each owned resource ends up with:
      // what it keeps of its own, plus the destination, the higher of the two levels winning.
      // That answers whether the dialog opens, and seeds its added, modified and removed badges.
      const movedSnapshots = await this.permissionSnapshotService.buildSnapshotForResourcesShare(this.resourcesIds);
      const parentPermissionsById = await this.findOwnedResourcesParentPermissions();
      const appliedPermissions = this.buildAppliedPermissions(movedSnapshots, parentPermissionsById, snapshot);
      // Owning something is not enough, something has to actually change. When nothing does for any
      // owned resource, move silently, like the case above.
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
      // Seed the dialog with the permissions each resource has today, not the ones it will end up
      // with. That is the baseline the badges and the revert button compare against.
      // The resulting permissions are staged separately, once the dialog is mounted, so the badges
      // come out right. See openMoveDialog and ShareDialog.applyInitialAppliedPermissions.
      this.initialResources = this.buildControlledResources(this.props.resources, movedSnapshots);
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
   * Fetch the current parent-folder permissions of the owned moved resources, so their applied
   * permissions can be previewed in the dialog. Keyed by folder id; resources at the root have no
   * parent and are absent from the map.
   * @returns {Promise<Object<string, PermissionsCollection>>}
   */
  async findOwnedResourcesParentPermissions() {
    const parentFolderIds = [
      ...new Set(
        this.props.resources
          .filter((resource) => this.rePermissionedResourceIds.has(resource.id) && resource.folder_parent_id)
          .map((resource) => resource.folder_parent_id),
      ),
    ];
    const permissions = await Promise.all(
      parentFolderIds.map((parentFolderId) =>
        this.permissionServiceWorkerService.findPermissions(parentFolderId, PermissionEntity.ACO_FOLDER),
      ),
    );
    return Object.fromEntries(parentFolderIds.map((parentFolderId, index) => [parentFolderId, permissions[index]]));
  }

  /**
   * Work out the permissions each owned moved resource ends up with: what it keeps of its own, plus
   * the destination, the higher of the two levels winning.
   * A resource the operator does not own gives `null`, there is nothing to apply to it.
   * Used to decide whether the dialog opens, and to seed it when it does.
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
        operatorPermission: resource.permission,
        aco: PermissionEntity.ACO_RESOURCE,
        acoForeignKey: resource.id,
      });
    });
  }

  /**
   * The current parent-folder permissions of a moved resource, or null when it sits at the root.
   * A resource that has a parent but whose permissions could not be retrieved is an error, not a
   * move from the root. calculateMovedPermissions reads a missing parent as "nothing to drop", and
   * would quietly keep the permissions the move is meant to remove.
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
   * Open the ShareDialog for a move.
   * It is seeded with the permissions each resource has today, `this.initialResources`, plus the
   * permissions the owned ones end up with, `this.appliedPermissionsByItemId`. ShareDialog stages
   * the second on mount, so the added, modified and removed badges show without any operator edit.
   *
   * The operator can then edit, and their edits are applied as shown, lowerings and removals
   * included. `this.initialResources` is kept for the confirmation step to fold them into.
   * The resources the operator does not own just move.
   * A recipient who does not end up at the same level on every resource gets an "i".
   */
  openMoveDialog() {
    // The resources the operator does not own keep their permissions, they only move.
    // Pass them to the dialog so it can warn about them and list them behind the marker.
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
   * Handle the operator's confirmation.
   * Snapshot the destination again and compare it with the first one. Any difference aborts.
   * Then rebuild the permissions each resource must end up with and hand them to the service worker,
   * which applies them to the owned resources and performs the move.
   * @param {Array<object>} permissionChanges The DTO-shape permission changes ShareDialog emits.
   * @returns {Promise<void>}
   */
  async handleShareDialogConfirm(permissionChanges) {
    this.moveConfirmed = true;
    try {
      await this.assertDestinationPermissionsUnchanged(this.destinationFolderId, this.state.snapshot);
      // What the operator confirmed was built from the permissions the items had when the dialog
      // opened. Snapshot them again and abort on any difference, so a permission somebody else added
      // during the review is not silently undone by a set that is now out of date.
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
   * Handle ShareDialog closing.
   * After a confirmation the flow is already moving forward. Otherwise the operator cancelled, so
   * terminate.
   */
  handleShareDialogClose() {
    if (this.moveConfirmed) {
      return;
    }
    this.terminate();
  }

  /**
   * Finalize the move from the service-worker result.
   * The service worker skips the resources it cannot move, a read-only one going into a shared
   * folder for instance. Report that rather than a plain success.
   * A warning when some were skipped, an error when none could move at all.
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
