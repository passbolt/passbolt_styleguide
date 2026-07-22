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
 * @since         5.13.0
 */
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { withAppContext } from "../../../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../../../contexts/DialogContext";
import { withActionFeedback } from "../../../../contexts/ActionFeedbackContext";
import EditResource from "../../EditResource/EditResource";
import ShareDialog from "../../../Share/ShareDialog";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import { AbstractPermissionFlow, PERMISSION_FLOW_STATUS } from "./AbstractPermissionFlow";
import { withResourceWorkspace } from "../../../../contexts/ResourceWorkspaceContext";

/**
 * Status values driving the resource-edition flow state machine.
 * Extends the shared base status enum with the edition-specific dialog states.
 * @type {Readonly<{INITIALIZING: string, EDIT_RESOURCE_OPEN: string, SHARE_DIALOG_OPEN: string, ERROR: string}>}
 */
export const RESOURCE_EDIT_FLOW_STATUS = Object.freeze({
  ...PERMISSION_FLOW_STATUS,
  EDIT_RESOURCE_OPEN: "edit-resource-open",
  SHARE_DIALOG_OPEN: "share-dialog-open",
});

/**
 * Orchestrates the resource-edition flow:
 * 1. Captures a permission snapshot from the resource being edited (not its parent folder).
 * 2. Dispatches the EditResource dialog for the operator to update the form.
 * 3. If the resource is shared, dispatches ShareDialog (controlled mode, seeded from the snapshot)
 *    so the operator confirms the recipient set BEFORE the re-encrypted secret hits the server. The
 *    dialog is shown read-only when the operator has update but not owner permission on the resource.
 * 4. Calls `passbolt.resources.update`, carrying the operator-confirmed permission changes for the
 *    shared case so the extension re-encrypts and re-shares in the spec-mandated safe order.
 *
 * The flow stays mounted in the workflow registry until either the operator cancels at any step
 * or the server-side operations succeed; at that point it calls `props.onStop()` to deregister.
 */
export class ResourceEditFlow extends AbstractPermissionFlow {
  /**
   * Default constructor.
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    // Instance flags (not state) so the close-after-submit signal is visible synchronously when
    // the dialog's wrapped onClose fires right after `onSubmit` resolves — `setState` flushes
    // at React commit boundaries and would race the close.
    this.formSubmitted = false;
    this.shareConfirmed = false;
    this.pendingResourceFormEntity = null;
    this.pendingResourceSecret = null;
    this.editResourceDialogFocusBackListener = null;
    this.handleEditResourceSubmit = this.handleEditResourceSubmit.bind(this);
    this.handleEditResourceClose = this.handleEditResourceClose.bind(this);
    this.handleShareDialogConfirm = this.handleShareDialogConfirm.bind(this);
    this.handleShareDialogClose = this.handleShareDialogClose.bind(this);
    this.setFocusBackListener = this.setFocusBackListener.bind(this);
  }

  /**
   * Get default state.
   * @returns {Object}
   */
  get defaultState() {
    return {
      status: RESOURCE_EDIT_FLOW_STATUS.INITIALIZING,
      editResourceDialogId: null,
      snapshot: null,
    };
  }

  /**
   * Whether the ShareDialog must be displayed read-only for this edition.
   * Triggered when the operator has update but not owner permission on the resource: editing the
   * resource already requires at least update, so "not owner" is exactly "update but not owner".
   * In that case the operator may review who receives the re-encrypted secret but cannot change
   * the sharing.
   * @returns {boolean}
   */
  get isShareReadOnly() {
    return this.props.resource.permission?.type !== PermissionEntity.PERMISSION_OWNER;
  }

  /**
   * Component did mount: open the edition form.
   */
  componentDidMount() {
    this.openEditResourceDialog();
  }

  /**
   * Open the EditResource dialog and transition to the EDIT_RESOURCE_OPEN state.
   */
  openEditResourceDialog() {
    const editResourceDialogId = this.props.dialogContext.open(EditResource, {
      resource: this.props.resource,
      onSubmit: this.handleEditResourceSubmit,
      onClose: this.handleEditResourceClose,
      setFocusBackListener: this.setFocusBackListener,
    });
    this.setState({ status: RESOURCE_EDIT_FLOW_STATUS.EDIT_RESOURCE_OPEN, editResourceDialogId: editResourceDialogId });
  }

  /**
   * Open the ShareDialog in controlled mode, seeded from the snapshot. Displayed read-only when the
   * operator has update but not owner permission on the resource.
   */
  openShareDialog() {
    this.props.dialogContext.open(ShareDialog, {
      initialResources: [
        {
          id: null,
          metadata: { name: "" },
          permission: { type: PermissionEntity.PERMISSION_OWNER },
          permissions: this.state.snapshot.permissions,
        },
      ],
      initialGroups: this.state.snapshot.groups,
      initialUsers: this.state.snapshot.users,
      readOnly: this.isShareReadOnly,
      onConfirm: this.handleShareDialogConfirm,
      onClose: this.handleShareDialogClose,
      ensureOperatorIsOwner: !this.isShareReadOnly,
    });
    this.setState({ status: RESOURCE_EDIT_FLOW_STATUS.SHARE_DIALOG_OPEN });
  }

  /**
   * Handle the operator's submission of the resource-edition form.
   * Captures the resource's permission snapshot now that the operator has committed, so the fetch
   * runs while the form dialog's submit button spins. If the resource is shared, dispatches
   * ShareDialog so the operator confirms the recipient set first (the secret is re-encrypted for
   * them). Otherwise updates the resource immediately.
   * @param {ResourceFormEntity} resourceFormEntity The validated form entity.
   * @returns {Promise<void>}
   */
  async handleEditResourceSubmit(resourceFormEntity, secretDto) {
    this.formSubmitted = true;
    this.pendingResourceFormEntity = resourceFormEntity;
    this.pendingResourceSecret = secretDto;
    try {
      const snapshot = await this.permissionSnapshotService.buildSnapshotForResourceEdition(this.props.resource.id);
      if (this.isShared(snapshot)) {
        this.setState({ snapshot }, () => this.openShareDialog());
        return;
      }
      await this.updateResource(resourceFormEntity, secretDto);
      await this.finalizeSuccess(
        this.props.t("The resource has been updated successfully"),
        `/app/passwords/view/${this.props.resource.id}`,
      );
      this.closeEditResourceDialog();
      this.terminate();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handle EditResource closing.
   * If the close comes after a successful submission, the flow has already moved on (share dialog
   * or API call); ignore it. Otherwise it's a cancellation: terminate.
   */
  handleEditResourceClose() {
    this.terminate();
  }

  /**
   * Handle the operator's confirmation of the permission set in ShareDialog (controlled mode).
   * Re-snapshot the resource and compare against the initial snapshot — any drift aborts the
   * submission. The dialog already emits deltas relative to the resource's current permissions, so
   * (unlike creation) they are handed straight to the update orchestration: the extension
   * re-encrypts the secret and applies the share changes in the spec-mandated safe order. In
   * read-only mode the deltas are empty, so the resource is simply re-encrypted for its existing
   * recipients.
   * @param {Array<object>} permissionChanges The DTO-shape permission changes ShareDialog emits.
   * @param {boolean} isPersonal true if the resource must be marked as personal
   * @returns {Promise<void>}
   */
  async handleShareDialogConfirm(permissionChanges, _, isPersonal) {
    this.shareConfirmed = true;
    try {
      const currentSnapshot = await this.permissionSnapshotService.buildSnapshotForResourceEdition(
        this.props.resource.id,
      );
      if (!this.state.snapshot.equals(currentSnapshot)) {
        throw new Error(
          this.props.t(
            "The resource permissions changed during your review. Please retry the operation and verify the permissions again.",
          ),
        );
      }
      await this.updateResource(
        this.pendingResourceFormEntity,
        this.pendingResourceSecret,
        permissionChanges,
        isPersonal,
      );
      await this.finalizeSuccess(
        this.props.t("The resource has been updated successfully"),
        `/app/passwords/view/${this.props.resource.id}`,
      );
      this.closeEditResourceDialog();
      this.terminate();
      this.props.resourceWorkspaceContext.onResourceEdited();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handle ShareDialog closing.
   * Same logic as the edit-resource close: if the close comes after a confirmation the flow is
   * already moving forward; otherwise the operator cancelled, terminate.
   */
  handleShareDialogClose() {
    if (this.shareConfirmed) {
      return;
    }
    this.editResourceDialogFocusBackListener?.();
  }

  /**
   * Closes the currently opened edit resource dialog.
   */
  closeEditResourceDialog() {
    this.pendingResourceSecret = null;
    this.props.dialogContext.close(this.state.editResourceDialogId);
  }

  /**
   * Sets the callback for when the edit resource dialog needs to get the focus back.
   * It's necessary for when the operator cancels the "share" process.
   * @param {function} listener
   */
  setFocusBackListener(listener) {
    this.editResourceDialogFocusBackListener = listener;
  }

  /**
   * Call `passbolt.resources.update` with the DTOs the resource form entity exposes. When
   * `permissionChanges` is non-empty the extension re-encrypts the secret and runs the share
   * orchestration in the same call (single passphrase prompt, single progress dialog).
   * @param {ResourceFormEntity} resourceFormEntity
   * @param {Object|null} secretDto the updated secret is any
   * @param {Array<object>} [permissionChanges] Operator-confirmed permission changes.
   * @param {boolean} [isPersonal=true] must be true when the resource is actually personal
   * @returns {Promise<Object>} The updated resource DTO.
   */
  updateResource(resourceFormEntity, secretDto, permissionChanges, isPersonal = true) {
    const resourceDto = resourceFormEntity.toResourceDto();
    resourceDto.personal = isPersonal;
    return this.permissionServiceWorkerService.updateResource(resourceDto, secretDto, permissionChanges);
  }
}

ResourceEditFlow.propTypes = {
  ...AbstractPermissionFlow.propTypes,
  resource: PropTypes.object.isRequired, // the resource DTO being edited (carries the operator's own permission)
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
};

export default withAppContext(
  withDialog(withActionFeedback(withRouter(withResourceWorkspace(withTranslation("common")(ResourceEditFlow))))),
);
