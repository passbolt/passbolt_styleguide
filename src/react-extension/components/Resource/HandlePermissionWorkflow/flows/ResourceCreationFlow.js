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
    this.handleCreateResourceSubmit = this.handleCreateResourceSubmit.bind(this);
    this.handleCreateResourceClose = this.handleCreateResourceClose.bind(this);
    this.handleShareDialogConfirm = this.handleShareDialogConfirm.bind(this);
    this.handleShareDialogClose = this.handleShareDialogClose.bind(this);
  }

  /**
   * Get default state.
   * @returns {Object}
   */
  get defaultState() {
    return {
      status: RESOURCE_CREATION_FLOW_STATUS.INITIALIZING,
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
    this.props.dialogContext.open(CreateResource, {
      resourceType: this.props.resourceType,
      folderParentId: this.props.folderParentId,
      onSubmit: this.handleCreateResourceSubmit,
      onClose: this.handleCreateResourceClose,
    });
    this.setState({ status: RESOURCE_CREATION_FLOW_STATUS.CREATE_RESOURCE_OPEN });
  }

  /**
   * Open the ShareDialog in controlled mode, seeded from the snapshot.
   */
  openShareDialog() {
    this.props.dialogContext.open(ShareDialog, {
      initialPermissions: this.state.snapshot.permissions,
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
    if (this.formSubmitted) {
      return;
    }
    this.terminate();
  }

  /**
   * Handle the operator's confirmation of the permission set in ShareDialog (controlled mode).
   * Before encrypting anything, re-snapshot the parent folder and compare it to the initial
   * snapshot; any drift aborts the submission so the operator re-reviews a fresh baseline.
   * Then creates the resource and applies the confirmed permissions in the spec-mandated safe
   * order (resource exists with the operator as sole owner BEFORE permissions are extended).
   * @param {Array<object>} permissionChanges The DTO-shape permission changes ShareDialog emits.
   * @returns {Promise<void>}
   */
  async handleShareDialogConfirm(permissionChanges) {
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
      const created = await this.createResource(this.pendingResourceFormEntity);
      if (permissionChanges.length > 0) {
        await this.props.context.port.request("passbolt.share.resources.save", [created.id], permissionChanges);
      }
      await this.finalizeSuccess(
        this.props.t("The resource has been added successfully"),
        `/app/passwords/view/${created.id}`,
      );
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
    this.terminate();
  }

  /**
   * Call `passbolt.resources.create` with the DTOs the resource form entity exposes.
   * @param {ResourceFormEntity} resourceFormEntity
   * @returns {Promise<Object>} The newly created resource DTO.
   */
  createResource(resourceFormEntity) {
    const resourceDto = resourceFormEntity.toResourceDto();
    const resourceType = resourceFormEntity.resourceTypeId
      ? this.props.context.resourceTypesCollection?.getFirstById(resourceFormEntity.resourceTypeId)
      : null;
    const isV4PasswordString = resourceType?.slug === RESOURCE_TYPE_PASSWORD_STRING_SLUG;
    const secretDto = isV4PasswordString ? resourceFormEntity.toSecretDto().password : resourceFormEntity.toSecretDto();
    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
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
