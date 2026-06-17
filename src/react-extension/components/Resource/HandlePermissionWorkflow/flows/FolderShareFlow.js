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
 * @since         5.14.0
 */
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { withAppContext } from "../../../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../../../contexts/DialogContext";
import { withActionFeedback } from "../../../../contexts/ActionFeedbackContext";
import ShareDialog from "../../../Share/ShareDialog";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import { AbstractPermissionFlow, PERMISSION_FLOW_STATUS } from "./AbstractPermissionFlow";

/**
 * Status values driving the folder-share flow state machine.
 * Extends the shared base status enum with the share-specific dialog state.
 * @type {Readonly<{INITIALIZING: string, SHARE_DIALOG_OPEN: string, ERROR: string}>}
 */
export const FOLDER_SHARE_FLOW_STATUS = Object.freeze({
  ...PERMISSION_FLOW_STATUS,
  SHARE_DIALOG_OPEN: "share-dialog-open",
});

/**
 * Orchestrates the folder-share flow. A single dialog lets the operator set and validate the
 * folder's permission set at once:
 * 1. Captures a permission snapshot of the folder itself.
 * 2. Dispatches ShareDialog (controlled mode, ACO_FOLDER) so the operator reviews and edits the
 *    folder's own permission set.
 * 3. On confirmation, re-snapshots the folder to detect drift, then applies the folder permission
 *    changes via `passbolt.share.folders.save` (the extension re-derives and propagates to content).
 *
 * The flow stays mounted in the workflow registry until either the operator cancels or the
 * server-side operation succeeds; at that point it calls `props.onStop()` to deregister.
 */
export class FolderShareFlow extends AbstractPermissionFlow {
  /**
   * Default constructor.
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    // Instance flag (not state) so the close-after-confirm signal is visible synchronously when the
    // dialog's wrapped onClose fires right after onConfirm resolves.
    this.shareConfirmed = false;
    this.handleShareDialogConfirm = this.handleShareDialogConfirm.bind(this);
    this.handleShareDialogClose = this.handleShareDialogClose.bind(this);
  }

  /**
   * Get default state.
   * @returns {Object}
   */
  get defaultState() {
    return {
      status: FOLDER_SHARE_FLOW_STATUS.INITIALIZING,
      folderSnapshot: null,
    };
  }

  /**
   * The id of the folder being shared.
   * @returns {string}
   */
  get folderId() {
    return this.props.folder.id;
  }

  /**
   * Component did mount: capture the folder snapshot, then open the share dialog.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    try {
      const folderSnapshot = await this.permissionSnapshotService.buildSnapshotForFolderShare(this.folderId);
      // Open from the setState callback so `openShareDialog` reads the committed snapshot.
      this.setState({ folderSnapshot }, () => this.openShareDialog());
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Open the ShareDialog in controlled mode seeded from the folder snapshot, so the operator reviews
   * and edits the folder's own permissions.
   */
  openShareDialog() {
    this.props.dialogContext.open(ShareDialog, {
      initialResources: [
        {
          id: this.folderId,
          metadata: { name: this.props.folder.metadata?.name ?? this.props.folder.name ?? "" },
          permission: this.props.folder.permission,
          permissions: this.state.folderSnapshot.permissions,
        },
      ],
      acoType: PermissionEntity.ACO_FOLDER,
      initialGroups: this.state.folderSnapshot.groups,
      initialUsers: this.state.folderSnapshot.users,
      onConfirm: this.handleShareDialogConfirm,
      onClose: this.handleShareDialogClose,
    });
    this.setState({ status: FOLDER_SHARE_FLOW_STATUS.SHARE_DIALOG_OPEN });
  }

  /**
   * Handle the operator's confirmation of the folder permission set. Re-snapshot the folder and
   * compare against the initial snapshot — any drift aborts the submission. An empty delta set means
   * the operator confirmed the existing permissions as-is: nothing is sent. The extension re-derives
   * the propagation to the folder's content.
   * @param {Array<object>} folderPermissionChanges The DTO-shape folder permission changes.
   * @returns {Promise<void>}
   */
  async handleShareDialogConfirm(folderPermissionChanges) {
    this.shareConfirmed = true;
    try {
      const currentSnapshot = await this.permissionSnapshotService.buildSnapshotForFolderShare(this.folderId);
      if (!this.state.folderSnapshot.equals(currentSnapshot)) {
        throw new Error(
          this.props.t(
            "The folder permissions changed during your review. Please retry the operation and verify the permissions again.",
          ),
        );
      }
      if (folderPermissionChanges.length) {
        await this.permissionServiceWorkerService.saveFoldersPermissions(this.folderId, folderPermissionChanges);
      }
      await this.finalizeSuccess(
        this.props.t("The permissions have been changed successfully."),
        `/app/folders/view/${this.folderId}`,
      );
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handle ShareDialog closing.
   * If the close comes after a confirmation the flow is already moving forward; ignore it. Otherwise
   * the operator cancelled: terminate.
   */
  handleShareDialogClose() {
    if (this.shareConfirmed) {
      return;
    }
    this.terminate();
  }
}

FolderShareFlow.propTypes = {
  ...AbstractPermissionFlow.propTypes,
  folder: PropTypes.object.isRequired, // the folder DTO to share (carries the operator's own permission)
};

export default withAppContext(withDialog(withActionFeedback(withRouter(withTranslation("common")(FolderShareFlow)))));
