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
 * @since         4.4.0
 */
import React from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import CreateStandaloneTotp from "../CreateStandaloneTotp/CreateStandaloneTotp";
import {withRouter} from "react-router-dom";
import UploadQrCode from "../UploadQrCode/UploadQrCode";
import {TotpWorkflowMode} from "./HandleTotpWorkflowMode";
import AddTotp from "../AddTotp/AddTotp";
import EditTotp from "../EditTotp/EditTotp";

/**
 * This component handle the TOTP workflow.
 */
export class HandleTotpWorkflow extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      totp: null, // The totp.
      mainOpenedDialogId: null, // The main opened dialog id
    };
  }

  /**
   * Component did mount
   */
  async componentDidMount() {
    await this.displayTotpDialog();
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  /**
   * Display review account recovery dialog
   * @return {Promise<void>}
   */
  async displayTotpDialog() {
    switch (this.props.mode) {
      case TotpWorkflowMode.ADD_TOTP: {
        this.displayAddTotpDialog();
        break;
      }
      case TotpWorkflowMode.EDIT_TOTP: {
        this.displayEditTotpDialog();
        break;
      }
      case TotpWorkflowMode.CREATE_STANDALONE_TOTP: {
        this.displayCreateStandaloneTotpDialog();
        break;
      }
      case TotpWorkflowMode.EDIT_STANDALONE_TOTP: {
        break;
      }
    }
  }

  /**
   * Display add totp dialog
   */
  displayAddTotpDialog() {
    const propsUploadQrCode = {
      title: this.props.t("Add TOTP"),
      action: this.props.t("Apply"),
      onSubmit: this.handleApply
    };

    const dialogId = this.props.dialogContext.open(AddTotp, {
      onCancel: this.handleCancelDialog,
      onOpenUploadQrCode: () => this.displayUploadQrCodeDialog(propsUploadQrCode),
      onSubmit: this.handleApply
    });
    this.setState({mainOpenedDialogId: dialogId});
  }

  /**
   * Display edit totp dialog
   */
  displayEditTotpDialog() {
    const propsUploadQrCode = {
      title: this.props.t("Edit TOTP"),
      action: this.props.t("Apply"),
      onSubmit: this.handleApply
    };

    const dialogId = this.props.dialogContext.open(EditTotp, {
      totp: this.props.totp,
      onCancel: this.handleCancelDialog,
      onOpenUploadQrCode: () => this.displayUploadQrCodeDialog(propsUploadQrCode),
      onSubmit: this.handleApply
    });
    this.setState({mainOpenedDialogId: dialogId});
  }

  /**
   * Display create standalone totp dialog
   */
  displayCreateStandaloneTotpDialog() {
    const propsUploadQrCode = {
      title: this.props.t("Create standalone TOTP"),
      action: this.props.t("Save"),
      onSubmit: this.handleSave
    };

    const dialogId = this.props.dialogContext.open(CreateStandaloneTotp, {
      onCancel: this.handleCancelDialog,
      onOpenUploadQrCode: () => this.displayUploadQrCodeDialog(propsUploadQrCode),
      onSubmit: this.handleSave
    });
    this.setState({mainOpenedDialogId: dialogId});
  }

  /**
   * Display upload QR code dialog
   * @param props
   */
  displayUploadQrCodeDialog(props) {
    this.props.dialogContext.open(UploadQrCode, {...props});
  }

  /**
   * Handle cancel dialog
   */
  handleCancelDialog() {
    this.props.onStop();
  }

  /**
   * Handle the save standalone totp.
   * @param {StandaloneTotpViewModel} standaloneTotp the totp.
   */
  async handleSave(standaloneTotp) {
    try {
      // Resource type with encrypted totp
      const resource = await this.createStandaloneOtp(standaloneTotp.toResourceDto(), standaloneTotp.toSecretDto());
      await this.handleSaveSuccess(resource);
    } catch (error) {
      if (error.name === "UserAbortsOperationError") {
        // It can happen when the user has closed the passphrase entry dialog by instance.
        return;
      }
      this.handleError(error);
    } finally {
      // Close the main dialog in case the user save a standalone totp from an uploaded image
      this.props.dialogContext.close(this.state.mainOpenedDialogId);
      this.props.onStop();
    }
  }

  /**
   * Handle apply totp.
   * @param {TotpViewModel} totp the totp.
   */
  handleApply(totp) {
    try {
      this.props.onApply(totp);
    } catch (error) {
      this.handleError(error);
    } finally {
      // Close the main dialog in case the user save a standalone totp from an uploaded image
      this.props.dialogContext.close(this.state.mainOpenedDialogId);
      this.props.onStop();
    }
  }

  /**
   * Create with encrypted description type
   *
   * @param {object} resourceDto
   * @param {object} secretDto
   * @returns {Promise<*>}
   */
  async createStandaloneOtp(resourceDto, secretDto) {
    resourceDto.folder_parent_id = this.props.folderParentId;
    resourceDto.resource_type_id = this.props.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.TOTP
    );

    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess(resource) {
    await this.props.actionFeedbackContext.displaySuccess(this.props.t("The TOTP has been added successfully"));
    this.props.history.push(`/app/passwords/view/${resource.id}`);
  }

  /**
   * Handle an unexpected error
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleTotpWorkflow.propTypes = {
  onStop: PropTypes.func.isRequired, // The callback to stop the workflow
  dialogContext: PropTypes.any, // The dialog context
  actionFeedbackContext: PropTypes.object, // The action feedback context
  context: PropTypes.object, // The app context
  history: PropTypes.object, // Router history
  folderParentId: PropTypes.string, // The folder parent id
  mode: PropTypes.oneOf([
    TotpWorkflowMode.ADD_TOTP,
    TotpWorkflowMode.EDIT_TOTP,
    TotpWorkflowMode.CREATE_STANDALONE_TOTP,
    TotpWorkflowMode.EDIT_STANDALONE_TOTP,
  ]).isRequired, // The mode of the workflow
  totp: PropTypes.object, // The totp to edit
  onApply: PropTypes.func, // The onApply function
  t: PropTypes.func // the translation function
};

export default withRouter(withAppContext(withDialog(withActionFeedback(withTranslation("common")(HandleTotpWorkflow)))));