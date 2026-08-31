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
 * Status values driving the folder-move flow state machine.
 * Extends the shared base status enum with the move-specific dialog state.
 * @type {Readonly<{INITIALIZING: string, SHARE_DIALOG_OPEN: string, ERROR: string}>}
 */
export const FOLDER_MOVE_FLOW_STATUS = Object.freeze({
  ...PERMISSION_FLOW_STATUS,
  SHARE_DIALOG_OPEN: "share-dialog-open",
});

/**
 * Orchestrates the folder-move flow.
 * The destination folder's permissions are what the move proposes for the moved folder and for the
 * items it contains.
 *
 * 1. Snapshot the destination folder's permissions. The root and a personal folder snapshot to
 *    nothing, they simply have nothing to contribute.
 * 2. Move without opening the dialog when the operator does not own the folder, or when nothing
 *    would change. This is checked even for a destination that shares with nobody: losing a
 *    permission with nothing to replace it is still a change.
 * 3. Otherwise open ShareDialog, seeded from the destination snapshot, so the operator can review
 *    and edit the permissions before anything is encrypted.
 * 4. On confirmation, snapshot the destination again to catch a change made during the review,
 *    rebuild the permissions the folder must end up with, and hand them to the service worker,
 *    which applies them to the folder and its owned content and performs the move.
 *
 * The flow stays mounted until the operator cancels or the move succeeds, then calls
 * `props.onStop()` to deregister itself.
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
   * Component did mount. Snapshot the destination, or nothing at all when moving to the root.
   * The dialog then opens on two conditions: the operator owns the folder, and something would
   * actually change. Whether the destination is shared is never enough on its own.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    try {
      const snapshot = this.destinationFolderId
        ? await this.permissionSnapshotService.buildSnapshotForFolderShare(this.destinationFolderId)
        : null;
      if (!this.isOwnedItem(this.props.folder)) {
        /*
         * A folder the operator can only read may only be reorganised within their own space. The
         * service worker refuses the move unless the folder's current parent and the destination are
         * both the root or a personal folder. See FolderEntity.canFolderMove.
         * Say why here, rather than let the service worker answer a generic "can not be moved".
         */
        if (this.props.folder.permission?.type === PermissionEntity.PERMISSION_READ) {
          const readOnlyMoveError = await this.getReadOnlyFolderMoveError(snapshot);
          if (readOnlyMoveError) {
            await this.props.actionFeedbackContext.displayError(readOnlyMoveError);
            this.terminate();
            return;
          }
        }
        // The operator does not own the folder, so no permission can change. Nothing is encrypted
        // and no secret is shared, so move without the dialog.
        await this.moveItemsServiceWorkerService.moveFolder(this.folderId, this.destinationFolderId, null);
        await this.finalizeSuccess(
          this.props.t("The folder has been moved successfully."),
          `/app/folders/view/${this.folderId}`,
        );
        return;
      }
      // The folder is owned. Work out the permissions it ends up with: what it keeps of its own, plus
      // the destination, which contributes nothing when moving to the root or to a personal folder.
      // That answers whether the dialog opens, and what the operator edits when it does.
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
        operatorPermission: this.props.folder.permission,
        aco: PermissionEntity.ACO_FOLDER,
        acoForeignKey: this.folderId,
      });
      // Owning the folder is not enough, something has to actually change. When nothing does, move
      // silently, like the case above.
      if (!this.permissionChangesService.hasPermissionsDelta(folderSnapshot.permissions, appliedPermissions)) {
        await this.moveItemsServiceWorkerService.moveFolder(this.folderId, this.destinationFolderId, null);
        await this.finalizeSuccess(
          this.props.t("The folder has been moved successfully."),
          `/app/folders/view/${this.folderId}`,
        );
        return;
      }
      // Seed the dialog with the permissions the folder has today, not the ones it will end up with.
      // That is the baseline the badges and the revert button compare against.
      // The resulting permissions are staged separately, once the dialog is mounted, so the badges
      // come out right. See openShareDialog and ShareDialog.applyInitialAppliedPermissions.
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
   * The reason a read-only folder cannot be moved, or null when the move is allowed.
   * Follows the same rule as FolderEntity.canFolderMove. Such a folder may only travel between the
   * root and personal folders, so its current parent and its destination must each be one or the other.
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
   * Whether a folder is personal, in the same sense as FolderEntity.isPersonal: it has exactly one
   * permission, so nobody but its owner can reach it.
   * A null set means there is no folder at all, the root, which the move rules treat as personal.
   * @param {PermissionsCollection|null} permissions The folder's permissions, null for the root.
   * @returns {boolean}
   * @private
   */
  isPersonalPermissionSet(permissions) {
    return permissions === null || permissions.length === 1;
  }

  /**
   * Open the ShareDialog in controlled mode.
   * It is seeded with the permissions the folder has today, `this.initialFolders`, plus the
   * permissions it ends up with, `this.appliedPermissionsByItemId`. ShareDialog stages the second on
   * mount, so the added, modified and removed badges show without any operator edit.
   *
   * The operator can then edit, and their edits are applied as shown, lowerings and removals
   * included. `this.initialFolders` is kept for the confirmation step to fold them into.
   * The service worker then copies the change onto the folder's owned content.
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
   * Handle the operator's confirmation.
   * Snapshot the destination again and compare it with the first one. Any difference aborts.
   * Then rebuild the permissions the folder must end up with and hand them to the service worker,
   * which applies them to the folder and its owned content and performs the move.
   * @param {Array<object>} permissionChanges The DTO-shape permission changes ShareDialog emits.
   * @returns {Promise<void>}
   */
  async handleShareDialogConfirm(permissionChanges) {
    this.moveConfirmed = true;
    try {
      await this.assertDestinationPermissionsUnchanged(this.destinationFolderId, this.state.snapshot);
      // What the operator confirmed was built from the permissions the folder had when the dialog
      // opened. Snapshot them again and abort on any difference, so a permission somebody else added
      // during the review is not silently undone by a set that is now out of date.
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
}

FolderMoveFlow.propTypes = {
  ...AbstractPermissionFlow.propTypes,
  folder: PropTypes.object.isRequired, // the folder DTO being moved
  destinationFolderId: PropTypes.string, // the destination folder id, or null/undefined for the root
};

export default withAppContext(withDialog(withActionFeedback(withRouter(withTranslation("common")(FolderMoveFlow)))));
