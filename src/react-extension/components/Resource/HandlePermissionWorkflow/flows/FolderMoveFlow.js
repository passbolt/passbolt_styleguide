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
 * Status values of the folder-move flow: the shared ones plus the move dialog state.
 * @type {Readonly<{INITIALIZING: string, SHARE_DIALOG_OPEN: string, ERROR: string}>}
 */
export const FOLDER_MOVE_FLOW_STATUS = Object.freeze({
  ...PERMISSION_FLOW_STATUS,
  SHARE_DIALOG_OPEN: "share-dialog-open",
});

/**
 * Orchestrates the folder-move flow: a move applies the destination folder's permissions to the
 * moved folder and to the items it contains.
 *
 * 1. Snapshot the destination permissions. The root and a personal folder contribute nothing.
 * 2. Move without the dialog when the folder is not owned or would not change permission.
 * 3. Otherwise open ShareDialog so the operator reviews and edits the permissions first.
 * 4. On confirmation, re-snapshot to catch a concurrent change, then hand the permissions to the
 *    service worker, which applies them to the folder and its owned content and performs the move.
 *
 * The flow stays mounted until the operator cancels or the move ends, then calls `props.onStop()`.
 */
export class FolderMoveFlow extends AbstractPermissionFlow {
  /**
   * Default constructor.
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.moveItemsServiceWorkerService = new MoveItemsServiceWorkerService(props.context.port);
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
      status: FOLDER_MOVE_FLOW_STATUS.INITIALIZING,
      snapshot: null,
      folderSnapshot: null,
    };
  }

  /**
   * The id of the folder being moved.
   * @returns {string}
   */
  get folderId() {
    return this.props.folder.id;
  }

  /**
   * The destination folder id, or null when moving to the root.
   * @returns {string|null}
   */
  get destinationFolderId() {
    return this.props.destinationFolderId ?? null;
  }

  /**
   * Snapshot the destination, then open the dialog only if the owned folder would really change
   * permission. A destination shared with nobody can still change them.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    try {
      const snapshot = this.destinationFolderId
        ? await this.permissionSnapshotService.buildSnapshotForFolderShare(this.destinationFolderId)
        : null;
      if (!this.isOwnedItem(this.props.folder)) {
        /*
         * A read-only folder may only travel between the root and personal folders, see
         * FolderEntity.canFolderMove. Say why here, since the service worker only answers a generic error.
         */
        if (this.props.folder.permission?.type === PermissionEntity.PERMISSION_READ) {
          const readOnlyMoveError = await this.getReadOnlyFolderMoveError(snapshot);
          if (readOnlyMoveError) {
            await this.props.actionFeedbackContext.displayError(readOnlyMoveError);
            this.terminate();
            return;
          }
        }
        // The folder is not owned, so no permission can change. Move without the dialog.
        await this.moveItemsServiceWorkerService.moveFolder(this.folderId, this.destinationFolderId, null);
        await this.finalizeSuccess(
          this.props.t("The folder has been moved successfully."),
          `/app/folders/view/${this.folderId}`,
        );
        return;
      }
      // The permissions the owned folder ends up with, which decide whether the dialog opens.
      const folderSnapshot = await this.permissionSnapshotService.buildSnapshotForFolderShare(this.folderId);
      const parentPermissions = this.props.folder.folder_parent_id
        ? await this.permissionServiceWorkerService.findPermissions(
            this.props.folder.folder_parent_id,
            PermissionEntity.ACO_FOLDER,
          )
        : null;
      const appliedPermissions = PermissionsCollection.calculateMovedPermissions({
        itemPermissions: folderSnapshot.permissions,
        parentPermissions,
        destinationPermissions: snapshot?.permissions ?? null,
        operatorPermission: new PermissionEntity(this.props.folder.permission),
        aco: PermissionEntity.ACO_FOLDER,
        acoForeignKey: this.folderId,
      });
      // Owning the folder is not enough: a permission has to actually change.
      if (!this.permissionChangesService.hasPermissionsDelta(folderSnapshot.permissions, appliedPermissions)) {
        await this.moveItemsServiceWorkerService.moveFolder(this.folderId, this.destinationFolderId, null);
        await this.finalizeSuccess(
          this.props.t("The folder has been moved successfully."),
          `/app/folders/view/${this.folderId}`,
        );
        return;
      }
      // The dialog needs two sets: the permissions the folder has now, which the badges and the revert
      // button compare against, and the ones the move applies, staged on top once the dialog is open.
      this.initialFolders = [
        {
          id: this.folderId,
          metadata: { name: this.props.folder.name ?? "" },
          permission: this.props.folder.permission,
          permissions: folderSnapshot.permissions,
        },
      ];
      this.appliedPermissionsByItemId = new Map([[this.folderId, appliedPermissions]]);
      this.setState({ snapshot, folderSnapshot }, () => this.openShareDialog());
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * The reason a read-only folder cannot be moved, or null when the move is allowed: its current
   * parent and its destination must each be the root or a personal folder.
   * @param {object|null} snapshot The destination folder's permission snapshot, null for the root.
   * @returns {Promise<string|null>} The message to display, or null when the move can proceed.
   * @private
   */
  async getReadOnlyFolderMoveError(snapshot) {
    if (!this.isPersonalPermissionSet(snapshot?.permissions ?? null)) {
      return this.props.t("Folders you can only read cannot be moved into a shared folder.");
    }
    const parentPermissions = this.props.folder.folder_parent_id
      ? await this.permissionServiceWorkerService.findPermissions(
          this.props.folder.folder_parent_id,
          PermissionEntity.ACO_FOLDER,
        )
      : null;
    if (!this.isPersonalPermissionSet(parentPermissions)) {
      return this.props.t("Folders you can only read cannot be moved out of a shared folder.");
    }
    return null;
  }

  /**
   * Whether a folder is personal, as FolderEntity.isPersonal: it has a single permission.
   * A null set is the root, which the move rules treat as personal.
   * @param {PermissionsCollection|null} permissions The folder's permissions, null for the root.
   * @returns {boolean}
   * @private
   */
  isPersonalPermissionSet(permissions) {
    return permissions === null || permissions.length === 1;
  }

  /**
   * Open ShareDialog seeded with the folder's current permissions and the ones the move applies.
   * ShareDialog stages the latter on mount, so the badges show without any operator edit.
   */
  openShareDialog() {
    const { groups, users } = this.mergeArosFromSnapshots(
      [this.state.snapshot, this.state.folderSnapshot].filter(Boolean),
    );
    this.props.dialogContext.open(ShareDialog, {
      initialFolders: this.initialFolders,
      acoType: PermissionEntity.ACO_FOLDER,
      initialGroups: groups,
      initialUsers: users,
      initialAppliedPermissions: this.appliedPermissionsByItemId,
      onConfirm: this.handleShareDialogConfirm,
      onClose: this.handleShareDialogClose,
    });
    this.setState({ status: FOLDER_MOVE_FLOW_STATUS.SHARE_DIALOG_OPEN });
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
      const currentFolderSnapshot = await this.permissionSnapshotService.buildSnapshotForFolderShare(this.folderId);
      if (!this.state.folderSnapshot.equals(currentFolderSnapshot)) {
        throw new Error(
          this.props.t(
            "The permissions of the folder being moved changed during your review. Please retry the operation and verify the permissions again.",
          ),
        );
      }
      const confirmedPermissionsByItemId = this.permissionChangesService.buildAuthoritativeMovePermissions(
        this.initialFolders,
        permissionChanges,
        PermissionEntity.ACO_FOLDER,
      );
      await this.moveItemsServiceWorkerService.moveFolder(
        this.folderId,
        this.destinationFolderId,
        confirmedPermissionsByItemId,
      );
      await this.finalizeSuccess(
        this.props.t("The folder has been moved successfully."),
        `/app/folders/view/${this.folderId}`,
      );
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
}

FolderMoveFlow.propTypes = {
  ...AbstractPermissionFlow.propTypes,
  folder: PropTypes.object.isRequired, // the folder DTO being moved
  destinationFolderId: PropTypes.string, // the destination folder id, or null/undefined for the root
};

export default withAppContext(withDialog(withActionFeedback(withRouter(withTranslation("common")(FolderMoveFlow)))));
