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
import CreateResource from "../../CreateResource/CreateResource";
import ShareDialog from "../../../Share/ShareDialog";
import ResourceTypeEntity from "../../../../../shared/models/entity/resourceType/resourceTypeEntity";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import { RESOURCE_TYPE_PASSWORD_STRING_SLUG } from "../../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import { AbstractPermissionFlow, PERMISSION_FLOW_STATUS } from "./AbstractPermissionFlow";

/**
 * Status values driving the resource-creation flow state machine.
 * Extends the shared base status enum with the creation-specific dialog states.
 * @type {Readonly<{INITIALIZING: string, CREATE_RESOURCE_OPEN: string, SHARE_DIALOG_OPEN: string, ERROR: string}>}
 */
export const RESOURCE_CREATION_FLOW_STATUS = Object.freeze({
  ...PERMISSION_FLOW_STATUS,
  CREATE_RESOURCE_OPEN: "create-resource-open",
  SHARE_DIALOG_OPEN: "share-dialog-open",
});

/**
 * Orchestrates the resource-creation flow:
 * 1. Captures a permission snapshot from the parent folder (when there is one).
 * 2. Dispatches the CreateResource dialog for the operator to fill the form.
 * 3. If the parent is a shared folder, dispatches ShareDialog (in controlled mode, seeded from the
 *    snapshot) so the operator confirms the permission set BEFORE anything hits the server.
 * 4. Calls `passbolt.resources.create` and, for the shared case, `passbolt.share.resources.save`
 *    in the spec-mandated safe order.
 *
 * The flow stays mounted in the workflow registry until either the operator cancels at any step
 * or the server-side operations succeed; at that point it calls `props.onStop()` to deregister.
 */
export class ResourceCreationFlow extends AbstractPermissionFlow {
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
    this.createResourceDialogFocusBackListener = null;
    this.handleCreateResourceSubmit = this.handleCreateResourceSubmit.bind(this);
    this.handleCreateResourceClose = this.handleCreateResourceClose.bind(this);
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
      status: RESOURCE_CREATION_FLOW_STATUS.INITIALIZING,
      createResourceDialogId: null,
      snapshot: null,
    };
  }

  /**
   * Component did mount: build the snapshot (when applicable) and open the resource-creation form.
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    try {
      if (this.props.folderParentId) {
        const snapshot = await this.permissionSnapshotService.buildSnapshotForResourceCreation(
          this.props.folderParentId,
        );
        this.setState({ snapshot });
      }
      this.openCreateResourceDialog();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Open the CreateResource dialog and transition to the CREATE_RESOURCE_OPEN state.
   */
  openCreateResourceDialog() {
    const createResourceDialogId = this.props.dialogContext.open(CreateResource, {
      resourceType: this.props.resourceType,
      folderParentId: this.props.folderParentId,
      onSubmit: this.handleCreateResourceSubmit,
      onClose: this.handleCreateResourceClose,
      setFocusBackListener: this.setFocusBackListener,
    });
    this.setState({
      status: RESOURCE_CREATION_FLOW_STATUS.CREATE_RESOURCE_OPEN,
      createResourceDialogId: createResourceDialogId,
    });
  }

  /**
   * Open the ShareDialog in controlled mode, seeded from the snapshot.
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
      initialChanges: this.state.snapshot.permissions.items,
      initialGroups: this.state.snapshot.groups,
      initialUsers: this.state.snapshot.users,
      onConfirm: this.handleShareDialogConfirm,
      onClose: this.handleShareDialogClose,
    });
    this.setState({ status: RESOURCE_CREATION_FLOW_STATUS.SHARE_DIALOG_OPEN });
  }

  /**
   * Handle the operator's submission of the resource-creation form.
   * If the parent folder is shared, dispatches ShareDialog so the operator confirms the permission
   * set first. Otherwise creates the resource immediately.
   * @param {ResourceFormEntity} resourceFormEntity The validated form entity.
   * @returns {Promise<void>}
   */
  async handleCreateResourceSubmit(resourceFormEntity) {
    this.formSubmitted = true;
    this.pendingResourceFormEntity = resourceFormEntity;
    try {
      if (this.isShared(this.state.snapshot)) {
        this.openShareDialog();
        return;
      }
      const created = await this.createResource(resourceFormEntity);
      await this.finalizeSuccess(
        this.props.t("The resource has been added successfully"),
        `/app/passwords/view/${created.id}`,
      );
      this.closeCreateResourceDialog();
      this.terminate();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handle CreateResource closing.
   * If the close comes after a successful submission, the flow has already moved on (snapshot
   * dialog or API call); ignore it. Otherwise it's a cancellation: terminate.
   */
  handleCreateResourceClose() {
    this.terminate();
  }

  /**
   * Handle the operator's confirmation of the permission set in ShareDialog (controlled mode).
   * Re-snapshot the parent folder and compare against the initial snapshot — any drift aborts
   * the submission. Fold the operator's edits onto the snapshot to get the final share set, then
   * delegate the operator-only create + share orchestration to the extension via a single
   * `passbolt.resources.create` call carrying both the secret and the permission changes.
   * @param {Array<object>} permissionChanges The DTO-shape permission changes ShareDialog emits.
   * @param {boolean} canOperatorRead true if the operator can still read the modified resource
   * @returns {Promise<void>}
   */
  async handleShareDialogConfirm(permissionChanges, canOperatorRead) {
    this.shareConfirmed = true;
    try {
      const currentSnapshot = await this.permissionSnapshotService.buildSnapshotForResourceCreation(
        this.props.folderParentId,
      );
      if (!this.state.snapshot.equals(currentSnapshot)) {
        throw new Error(
          this.props.t(
            "The parent folder permissions changed during your review. Please retry the operation and verify the permissions again.",
          ),
        );
      }
      const finalChanges = this.permissionChangesService.buildResourcePermissionChanges(
        this.state.snapshot,
        permissionChanges,
        // The dialog seeds is_new deltas with aco_foreign_key: null because the resource doesn't
        // exist yet. The extension stamps real ids server-side as part of its create-then-share
        // orchestration, so passing null here is fine.
        null,
      );
      const created = await this.createResource(this.pendingResourceFormEntity, finalChanges);
      const redirectUrl = canOperatorRead ? `/app/passwords/view/${created.id}` : `/app/passwords/`;
      await this.finalizeSuccess(this.props.t("The resource has been added successfully"), redirectUrl);
      this.closeCreateResourceDialog();
      this.terminate();
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Handle ShareDialog closing.
   * Same logic as the create-resource close: if the close comes after a confirmation the flow is
   * already moving forward; otherwise the operator cancelled, terminate.
   */
  handleShareDialogClose() {
    if (this.shareConfirmed) {
      return;
    }
    this.createResourceDialogFocusBackListener?.();
  }

  /**
   * Closes the currently opened create resource dialog.
   */
  closeCreateResourceDialog() {
    this.props.dialogContext.close(this.state.createResourceDialogId);
  }

  /**
   * Sets the callback for when the create resource dialog needs to get the focus back.
   * It's necessary for when the operator cancels the "share" process.
   * @param {function} listener
   */
  setFocusBackListener(listener) {
    this.createResourceDialogFocusBackListener = listener;
  }

  /**
   * Call `passbolt.resources.create` with the DTOs the resource form entity exposes. When
   * `permissionChanges` is non-empty the extension creates the resource operator-only and then
   * runs `share.resources.save` in the same orchestrated call (single passphrase prompt, single
   * progress dialog, atomic-feeling result to the operator).
   * @param {ResourceFormEntity} resourceFormEntity
   * @param {Array<object>} [permissionChanges] Operator-confirmed final permission set.
   * @returns {Promise<Object>} The newly created resource DTO.
   */
  createResource(resourceFormEntity, permissionChanges) {
    const resourceDto = resourceFormEntity.toResourceDto();
    const resourceType = resourceFormEntity.resourceTypeId
      ? resourceFormEntity.resourceTypes?.getFirstById(resourceFormEntity.resourceTypeId)
      : null;
    const isV4PasswordString = resourceType?.slug === RESOURCE_TYPE_PASSWORD_STRING_SLUG;
    const secretDto = isV4PasswordString ? resourceFormEntity.toSecretDto().password : resourceFormEntity.toSecretDto();
    return this.permissionServiceWorkerService.createResource(resourceDto, secretDto, permissionChanges);
  }
}

ResourceCreationFlow.propTypes = {
  ...AbstractPermissionFlow.propTypes,
  resourceType: PropTypes.instanceOf(ResourceTypeEntity).isRequired,
  folderParentId: PropTypes.string,
};

export default withAppContext(
  withDialog(withActionFeedback(withRouter(withTranslation("common")(ResourceCreationFlow)))),
);
