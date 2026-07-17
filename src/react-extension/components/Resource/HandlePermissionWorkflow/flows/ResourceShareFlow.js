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
import { AbstractPermissionFlow, PERMISSION_FLOW_STATUS } from "./AbstractPermissionFlow";

/**
 * Status values driving the resource-share flow state machine.
 * Extends the shared base status enum with the share-specific dialog state.
 * @type {Readonly<{INITIALIZING: string, SHARE_DIALOG_OPEN: string, ERROR: string}>}
 */
export const RESOURCE_SHARE_FLOW_STATUS = Object.freeze({
  ...PERMISSION_FLOW_STATUS,
  SHARE_DIALOG_OPEN: "share-dialog-open",
});

/**
 * Orchestrates the resource-share flow. Unlike create/edit there is no resource form: the operator
 * only reviews and edits the recipient set.
 *
 * Captures a permission snapshot per selected resource (a snapshot targets a single ACO), dispatches
 * ShareDialog in controlled mode seeded from those snapshots, and — on confirmation — re-snapshots
 * to detect drift before saving the operator-confirmed permission changes via
 * `passbolt.share.resources.save`. A single-resource share is just a selection of one.
 *
 * The flow stays mounted in the workflow registry until either the operator cancels or the
 * server-side operation succeeds; at that point it calls `props.onStop()` to deregister.
 */
export class ResourceShareFlow extends AbstractPermissionFlow {
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
      status: RESOURCE_SHARE_FLOW_STATUS.INITIALIZING,
      snapshots: null,
    };
  }

  /**
   * The ids of the resources being shared, in a stable order shared by the snapshots.
   * @returns {Array<string>}
   */
  get resourcesIds() {
    return this.props.resources.map((resource) => resource.id);
  }

  /**
   * Component did mount: capture one snapshot per resource, then open the share dialog.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    try {
      const snapshots = await this.permissionSnapshotService.buildSnapshotForResourcesShare(this.resourcesIds);
      // Open from the setState callback so `openShareDialog` reads the committed snapshots.
      this.setState({ snapshots }, () => this.openShareDialog());
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Open the ShareDialog in controlled mode, seeded from the per-resource snapshots. The dialog is
   * fully editable (the operator owns every shared resource) and the opt-out checkbox is not shown.
   */
  openShareDialog() {
    const { groups, users } = this.mergeArosFromSnapshots(this.state.snapshots);
    this.props.dialogContext.open(ShareDialog, {
      initialResources: this.buildControlledResources(this.props.resources, this.state.snapshots),
      initialGroups: groups,
      initialUsers: users,
      onConfirm: this.handleShareDialogConfirm,
      onClose: this.handleShareDialogClose,
      isPermissionConfirmationMode: false,
    });
    this.setState({ status: RESOURCE_SHARE_FLOW_STATUS.SHARE_DIALOG_OPEN });
  }

  /**
   * Handle the operator's confirmation of the permission set in ShareDialog. Re-snapshot every
   * resource and compare against the initial snapshots — any drift aborts the submission. The
   * dialog emits deltas already targeting the real resources, so they are saved as-is. An empty
   * delta set means the operator confirmed the existing permissions as-is: nothing is sent.
   * @param {Array<object>} permissionChanges The DTO-shape permission changes ShareDialog emits.
   * @param {boolean} canOperatorRead true if the operator can still read the modified resource
   * @returns {Promise<void>}
   */
  async handleShareDialogConfirm(permissionChanges, canOperatorRead) {
    this.shareConfirmed = true;
    try {
      const currentSnapshots = await this.permissionSnapshotService.buildSnapshotForResourcesShare(this.resourcesIds);
      const drifted = this.state.snapshots.some((snapshot, index) => !snapshot.equals(currentSnapshots[index]));
      if (drifted) {
        throw new Error(
          this.props.t(
            "The resource permissions changed during your review. Please retry the operation and verify the permissions again.",
          ),
        );
      }
      if (permissionChanges.length) {
        await this.permissionServiceWorkerService.saveResourcesPermissions(this.resourcesIds, permissionChanges);
      }
      const redirectUrl = canOperatorRead ? `/app/passwords/view/${this.resourcesIds[0]}` : `/app/passwords/`;
      await this.finalizeSuccess(this.props.t("The permissions have been changed successfully."), redirectUrl);
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

ResourceShareFlow.propTypes = {
  ...AbstractPermissionFlow.propTypes,
  resources: PropTypes.array.isRequired, // the resource DTOs to share (each carries the operator's own permission)
};

export default withAppContext(withDialog(withActionFeedback(withRouter(withTranslation("common")(ResourceShareFlow)))));
