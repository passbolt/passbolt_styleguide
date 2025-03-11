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
 * @since         2.13.0
 */

import React from "react";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import PropTypes from "prop-types";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withResourceWorkspace } from "../../../contexts/ResourceWorkspaceContext";
import { withDialog } from "../../../contexts/DialogContext";
import DeleteResource from "../DeleteResource/DeleteResource";
import EditResource from "../EditResource/EditResource";
import ShareDialog from "../../Share/ShareDialog";
import ExportResources from "../ExportResources/ExportResources";
import { withTranslation } from "react-i18next";
import ClipBoard from '../../../../shared/lib/Browser/clipBoard';
import { withRbac } from "../../../../shared/context/Rbac/RbacContext";
import { uiActions } from "../../../../shared/services/rbacs/uiActionEnumeration";
import { withProgress } from "../../../contexts/ProgressContext";
import { TotpCodeGeneratorService } from "../../../../shared/services/otp/TotpCodeGeneratorService";
import { TotpWorkflowMode } from "../HandleTotpWorkflow/HandleTotpWorkflowMode";
import HandleTotpWorkflow from "../HandleTotpWorkflow/HandleTotpWorkflow";
import { withWorkflow } from "../../../contexts/WorkflowContext";
import PasswordExpiryDialog from "../PasswordExpiryDialog/PasswordExpiryDialog";
import { withPasswordExpiry } from "../../../contexts/PasswordExpirySettingsContext";
import { formatDateForApi } from "../../../../shared/utils/dateUtils";
import { DateTime } from "luxon";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";

/**
 * This component allows the current user to add a new comment on a resource
 */
class DisplayResourcesWorkspaceMenu extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.createRefs();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      moreMenuOpen: false, // more menu open or not
      viewColumnsMenuOpen: false, // view column menu open or not
    };
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.moreMenuRef = React.createRef();
    this.viewColumnsMenuRef = React.createRef();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleDocumentContextualMenuEvent = this.handleDocumentContextualMenuEvent.bind(this);
    this.handleDocumentDragStartEvent = this.handleDocumentDragStartEvent.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
    this.handleDeleteClickEvent = this.handleDeleteClickEvent.bind(this);
    this.handleEditClickEvent = this.handleEditClickEvent.bind(this);
    this.handleCopyPermalinkClickEvent = this.handleCopyPermalinkClickEvent.bind(this);
    this.handleCopyUsernameClickEvent = this.handleCopyUsernameClickEvent.bind(this);
    this.handleShareClickEvent = this.handleShareClickEvent.bind(this);
    this.handleCopySecretClickEvent = this.handleCopySecretClickEvent.bind(this);
    this.handleCopyTotpClickEvent = this.handleCopyTotpClickEvent.bind(this);
    this.handleViewDetailClickEvent = this.handleViewDetailClickEvent.bind(this);
    this.handleExportClickEvent = this.handleExportClickEvent.bind(this);
    this.handleViewColumnsClickEvent = this.handleViewColumnsClickEvent.bind(this);
    this.handleOnChangeColumnView = this.handleOnChangeColumnView.bind(this);
    this.handleMarkAsExpiredClick = this.handleMarkAsExpiredClick.bind(this);
    this.handleSetExpiryDateClickEvent = this.handleSetExpiryDateClickEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent);
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent, { capture: true });
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent, { capture: true });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent);
    document.removeEventListener('contextmenu', this.handleDocumentContextualMenuEvent, { capture: true });
    document.removeEventListener('dragstart', this.handleDocumentDragStartEvent, { capture: true });
  }

  /**
   * Handle click events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentClickEvent(event) {
    // Prevent closing when the user click on an element of the menu
    if (this.moreMenuRef.current.contains(event.target)) {
      this.handleCloseViewColumnsMenu();
      return;
    } else if (this.viewColumnsMenuRef.current.contains(event.target)) { // Prevent closing when the user click on an element of the view columns menu
      this.handleCloseMoreMenu();
      return;
    }
    this.handleCloseMoreMenu();
    this.handleCloseViewColumnsMenu();
  }

  /**
   * Handle contextual menu events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentContextualMenuEvent(event) {
    // Prevent closing when the user click on an element of the menu
    if (this.moreMenuRef.current.contains(event.target)) {
      this.handleCloseViewColumnsMenu();
      return;
    } else if (this.viewColumnsMenuRef.current.contains(event.target)) { // Prevent closing when the user click on an element of the view columns menu
      this.handleCloseMoreMenu();
      return;
    }
    this.handleCloseMoreMenu();
    this.handleCloseViewColumnsMenu();
  }

  /**
   * Handle drag start event on document. Hide the component if any.
   */
  handleDocumentDragStartEvent() {
    this.handleCloseMoreMenu();
    this.handleCloseViewColumnsMenu();
  }

  /**
   * open or close the more menu
   */
  handleMoreClickEvent() {
    const moreMenuOpen = !this.state.moreMenuOpen;
    this.setState({ moreMenuOpen });
  }

  /**
   * handle delete one or more resources
   */
  handleDeleteClickEvent() {
    this.props.dialogContext.open(DeleteResource, { resources: this.selectedResources });
    this.handleCloseMoreMenu();
  }

  /**
   * Handle mark as expired
   * @returns {Promise<void>}
   */
  async handleMarkAsExpiredClick() {
    this.handleCloseMoreMenu();
    const resourcesExpiryDateToUpdate = this.selectedResources.map(resource => ({ id: resource.id, expired: formatDateForApi(DateTime.utc()) }));
    try {
      await this.props.context.port.request("passbolt.resources.set-expiration-date", resourcesExpiryDateToUpdate);
      await this.props.actionFeedbackContext.displaySuccess(this.translate("The resource has been marked as expired.", { count: resourcesExpiryDateToUpdate.length }));
    } catch (error) {
      await this.props.actionFeedbackContext.displayError(this.translate("Unable to mark the resource as expired.", { count: resourcesExpiryDateToUpdate.length }));
    } finally {
      this.handleCloseMoreMenu();
    }
  }

  /**
   * handle edit one resource
   */
  handleEditClickEvent() {
    if (this.isStandaloneTotpResource) {
      this.props.workflowContext.start(HandleTotpWorkflow, { mode: TotpWorkflowMode.EDIT_STANDALONE_TOTP });
    } else {
      this.props.dialogContext.open(EditResource, { resource: this.selectedResources[0] });
    }
  }

  /**
   * handle share resources
   */
  async handleShareClickEvent() {
    const resourcesIds = this.selectedResources.map(resource => resource.id);
    await this.props.context.setContext({ shareDialogProps: { resourcesIds } });
    this.props.dialogContext.open(ShareDialog);
  }

  /**
   * handle copy permalink of one resource
   */
  async handleCopyPermalinkClickEvent() {
    this.handleCloseMoreMenu();
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/passwords/view/${this.selectedResources[0].id}`;
    await ClipBoard.copy(permalink, this.props.context.port);
    this.displaySuccessNotification(this.translate("The permalink has been copied to clipboard"));
  }

  /**
   * handle copy username of one resource
   */
  async handleCopyUsernameClickEvent() {
    this.handleCloseMoreMenu();
    await ClipBoard.copy(this.selectedResources[0].metadata.username, this.props.context.port);
    this.displaySuccessNotification(this.translate("The username has been copied to clipboard"));
  }

  /**
   * Decrypt the resource secret
   * @returns {Promise<object>} The secret in plaintext format
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret() {
    return this.props.context.port.request("passbolt.secret.find-by-resource-id", this.selectedResources[0].id);
  }

  /**
   * Copy password from dto to clipboard
   * Support original password (a simple string) and composed objects)
   *
   * @param {object} plaintextSecretDto The plaintext secret DTO.
   * @returns {Promise<void>}
   */
  async copyPasswordToClipboard(plaintextSecretDto) {
    const password = plaintextSecretDto.password;
    if (!password) {
      throw new TypeError(this.translate("The password is empty."));
    }
    await ClipBoard.copy(password, this.props.context.port);
  }

  /**
   * handle copy to clipboard the secret of the selected resource
   */
  async handleCopySecretClickEvent() {
    let plaintextSecretDto;
    this.handleCloseMoreMenu();

    this.props.progressContext.open(this.props.t('Decrypting secret'));
    try {
      plaintextSecretDto = await this.decryptResourceSecret();
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }
    this.props.progressContext.close();

    if (!plaintextSecretDto?.password?.length) {
      await this.props.actionFeedbackContext.displayError(this.translate("The password is empty and cannot be copied to clipboard."));
      return;
    }

    await this.copyPasswordToClipboard(plaintextSecretDto);
    this.props.resourceWorkspaceContext.onResourceCopied();
    this.props.actionFeedbackContext.displaySuccess(this.translate("The secret has been copied to clipboard"));
  }

  /**
   * handle copy to clipboard the totp of the selected resource
   */
  async handleCopyTotpClickEvent() {
    let plaintextSecretDto, code;
    this.handleCloseMoreMenu();

    this.props.progressContext.open(this.props.t('Decrypting secret'));
    try {
      plaintextSecretDto = await this.decryptResourceSecret();
    } catch (error) {
      if (error.name !== "UserAbortsOperationError") {
        this.props.actionFeedbackContext.displayError(error.message);
      }
    }
    this.props.progressContext.close();

    if (!plaintextSecretDto) {
      return;
    }

    if (!plaintextSecretDto.totp) {
      await this.props.actionFeedbackContext.displayError(this.translate("The TOTP is empty and cannot be copied to clipboard."));
      return;
    }

    try {
      code = TotpCodeGeneratorService.generate(plaintextSecretDto.totp);
    } catch (error) {
      await this.props.actionFeedbackContext.displayError(this.translate("Unable to copy the TOTP"));
      return;
    }

    await ClipBoard.copy(code, this.props.context.port);
    await this.props.resourceWorkspaceContext.onResourceCopied();
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The TOTP has been copied to clipboard"));
  }

  /**
   * Whenever the user intends to set the expiration date on the selected resources
   */
  handleSetExpiryDateClickEvent() {
    this.handleCloseMoreMenu();
    this.props.dialogContext.open(PasswordExpiryDialog, {
      resources: this.selectedResources
    });
  }

  /**
   * Whenever the user intends to export the selected resources
   */
  handleExportClickEvent() {
    this.export();
  }

  /**
   * open or close the more menu
   */
  handleViewColumnsClickEvent() {
    const viewColumnsMenuOpen = !this.state.viewColumnsMenuOpen;
    this.setState({ viewColumnsMenuOpen });
  }

  handleOnChangeColumnView(event) {
    const target = event.target;
    this.props.resourceWorkspaceContext.onChangeColumnView(target.id, target.checked);
  }

  /**
   * display a success notification message
   * @param message
   */
  displaySuccessNotification(message) {
    this.props.actionFeedbackContext.displaySuccess(message);
  }

  /**
   * Close the more menu
   */
  handleCloseMoreMenu() {
    this.setState({ moreMenuOpen: false });
  }

  /**
   * Close the more menu
   */
  handleCloseViewColumnsMenu() {
    this.setState({ viewColumnsMenuOpen: false });
  }

  /**
   * selected resources
   * @returns {[]|null}
   */
  get filteredResources() {
    return this.props.resourceWorkspaceContext.filteredResources;
  }

  /**
   * selected resources
   * @returns {[]|null}
   */
  get selectedResources() {
    return this.props.resourceWorkspaceContext.selectedResources;
  }

  /**
   * has at least one resource selected
   * @returns {boolean}
   */
  hasResourceSelected() {
    return this.selectedResources.length > 0;
  }

  /**
   * has at least one resource selected
   * @returns {boolean}
   */
  hasOneResourceSelected() {
    return this.selectedResources.length === 1;
  }

  /**
   * has multiple resources selected
   * @returns {boolean}
   */
  hasMultipleResourcesSelected() {
    return this.selectedResources.length > 1;
  }

  /**
   * Can update the selected resources
   * @return {boolean}
   */
  canUpdate() {
    return this.hasResourceSelected()
      && this.selectedResources.every(resource => resource.permission.type >= 7);
  }

  /**
   * Can share the selected resources
   * @return {boolean}
   */
  canShare() {
    return this.hasResourceSelected() && this.selectedResources.every(resource => resource.permission.type === 15);
  }

  /**
   * Check if the user can export.
   * @return {boolean}
   */
  canExport() {
    return this.props.context.siteSettings.canIUse("export")
      && this.props.rbacContext.canIUseUiAction(uiActions.RESOURCES_EXPORT);
  }

  /**
   * Can copy username
   * @returns {boolean}
   */
  canCopyUsername() {
    return this.hasOneResourceSelected() && this.selectedResources[0].metadata?.username;
  }

  /**
   * Can copy password
   * @returns {boolean}
   */
  canCopyPassword() {
    return this.hasOneResourceSelected() && this.isPasswordResources;
  }

  /**
   * Is password resource
   * @return {boolean}
   */
  get isPasswordResources() {
    return this.props.resourceTypes.getFirstById(this.selectedResources[0].resource_type_id)?.hasPassword();
  }

  /**
   * Can copy totp
   * @returns {boolean}
   */
  canCopyTotp() {
    return this.hasOneResourceSelected() && this.isTotpResources;
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  get isTotpResources() {
    return this.props.resourceTypes.getFirstById(this.selectedResources[0].resource_type_id)?.hasTotp();
  }

  /**
   * Is TOTP resource
   * @return {boolean}
   */
  get isStandaloneTotpResource() {
    return this.props.resourceTypes.getFirstById(this.selectedResources[0].resource_type_id).isStandaloneTotp();
  }

  /**
   * Has at least one action of the more menu allowed.
   * @return {boolean}
   */
  hasMoreActionAllowed() {
    // If only one resource is selected then the all the copy operation are enabled.
    if (this.hasOneResourceSelected()) {
      return true;
    } else if (this.hasMultipleResourcesSelected) {
      // If multiple resources are selected, the only more action available is the delete operation.
      return this.canUpdate();
    }

    return false;
  }

  /**
   * handle view detail click event
   */
  handleViewDetailClickEvent() {
    // lock or unlock the detail resource or folder
    this.props.resourceWorkspaceContext.onLockDetail();
  }

  /**
   * Has lock for the detail display
   * @returns {boolean}
   */
  hasLockDetail() {
    return this.props.resourceWorkspaceContext.lockDisplayDetail;
  }

  /**
   * Exports the selected resources
   */
  async export() {
    const resourcesIds = this.selectedResources.map(resource => resource.id);
    await this.props.resourceWorkspaceContext.onResourcesToExport({ resourcesIds });
    await this.props.dialogContext.open(ExportResources);
  }

  /**
   * Get the columns list of resource
   * @return {[Object]}
   */
  get columnsResourceSetting() {
    return this.props.resourceWorkspaceContext.columnsResourceSetting?.items;
  }

  /**
   * Can use Totp
   * @return {*}
   */
  get canUseTotp() {
    return this.props.context.siteSettings.canIUse('totpResourceTypes');
  }

  /**
   * Can use password expiry
   * @return {boolean}
   */
  get canOverridePasswordExpiry() {
    const passwordExpirySettings = this.props.passwordExpiryContext.getSettings();
    return this.props.passwordExpiryContext.isFeatureEnabled() && passwordExpirySettings?.policy_override;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        {/** 表示禁止のため削除 */}
      </>
    );
  }
}

DisplayResourcesWorkspaceMenu.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  resourceWorkspaceContext: PropTypes.any, // the resource workspace context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  passwordExpiryContext: PropTypes.object, // the password expiry context
  dialogContext: PropTypes.any, // the dialog context
  progressContext: PropTypes.any, // The progress context
  workflowContext: PropTypes.any, // The workflow contex
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRbac(withDialog(withWorkflow(withProgress(withPasswordExpiry(withResourceWorkspace(withResourceTypesLocalStorage(withActionFeedback(withTranslation('common')(DisplayResourcesWorkspaceMenu))))))))));
