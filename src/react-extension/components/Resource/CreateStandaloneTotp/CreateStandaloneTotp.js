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

import React, {Component} from "react";
import PropTypes from "prop-types";

import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {withDialog} from "../../../contexts/DialogContext";
import {withRouter} from "react-router-dom";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";

import {Trans, withTranslation} from "react-i18next";
import {maxSizeValidation} from "../../../lib/Error/InputValidator";
import {
  RESOURCE_NAME_MAX_LENGTH,
  RESOURCE_TOTP_KEY_MAX_LENGTH,
  RESOURCE_URI_MAX_LENGTH,
} from "../../../../shared/constants/inputs.const";
import Select from "../../Common/Select/Select";
import {isValidBase32} from "../../../../shared/utils/assertions";
import UploadQrCode from "../UploadQrCode/UploadQrCode";

class CreateStandaloneTotp extends Component {
  constructor() {
    super();
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createInputRef();
  }

  getDefaultState() {
    return {
      name: "",
      nameError: "",
      nameWarning: "",
      uri: "",
      uriWarning: "",
      key: "",
      keyError: "",
      keyWarning: "",
      period: "30",
      periodError: "",
      digits: "6",
      digitsError: "",
      algorithm: "SHA1",
      processing: false, // The processing flag
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
      openAdvancedSettings: false, // True if the advanced settings section is open
    };
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
    this.handleKeyInputKeyUp = this.handleKeyInputKeyUp.bind(this);
    this.handleUriInputKeyUp = this.handleUriInputKeyUp.bind(this);
    this.handlePeriodInputKeyUp = this.handlePeriodInputKeyUp.bind(this);
    this.handleDigitsInputKeyUp = this.handleDigitsInputKeyUp.bind(this);
    this.handleAdvancedSettingClickEvent = this.handleAdvancedSettingClickEvent.bind(this);
    this.handleUploadImageButtonClick = this.handleUploadImageButtonClick.bind(this);
    this.handleSaveUploadQrCode = this.handleSaveUploadQrCode.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
    this.keyInputRef = React.createRef();
    this.periodInputRef = React.createRef();
    this.digitsInputRef = React.createRef();
  }

  /*
   * =============================================================
   *  Form submit
   * =============================================================
   */
  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.processing) {
      return;
    }

    this.setState({hasAlreadyBeenValidated: true});
    await this.toggleProcessing();

    if (!await this.validate()) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }

    try {
      const resource = await this.createStandaloneOtp();
      await this.handleSaveSuccess(resource);
    } catch (error) {
      await this.toggleProcessing();
      await this.handleSaveError(error);
    }
  }

  /**
   * Toggle processing state when validating / saving
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return new Promise(resolve => {
      this.setState({processing: !prev}, resolve());
    });
  }

  /*
   * =============================================================
   *  Validation
   * =============================================================
   */
  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
      nameError: "",
      keyError: "",
      periodError: "",
      digitsError: ""
    });

    // Validate the form inputs.
    await Promise.all([
      this.validateNameInput(),
      this.validateKeyInput(),
      this.validateDigitsInput(),
      this.validatePeriodInput()
    ]);

    return this.state.nameError === "" && this.state.keyError === ""
      && this.state.digitsError === "" && this.state.periodError === "";
  }

  /**
   * Validate the key input.
   * @return {Promise<void>}
   */
  validateKeyInput() {
    const key = this.state.key.trim();
    let keyError = "";
    if (!key.length) {
      keyError = this.translate("A key is required.");
    } else if (!isValidBase32(key.toUpperCase())) {
      keyError = this.translate("The key should be a valid base32 string.");
    }

    return new Promise(resolve => {
      this.setState({keyError}, resolve);
    });
  }

  /**
   * Validate the name input.
   * @return {Promise<void>}
   */
  validateNameInput() {
    const name = this.state.name.trim();
    let nameError = "";
    if (!name.length) {
      nameError = this.translate("A name is required.");
    }

    return new Promise(resolve => {
      this.setState({nameError}, resolve);
    });
  }

  /**
   * Validate the digits input.
   * @return {Promise<void>}
   */
  validateDigitsInput() {
    const digits = this.state.digits;
    let digitsError = "";
    if (digits < 6 || digits > 8) {
      digitsError = this.translate("The TOTP length should be between {{minLength}} and {{maxLength}}.", {minLength: 6, maxLength: 8});
    }

    return new Promise(resolve => {
      this.setState({digitsError}, resolve);
    });
  }

  /**
   * Validate the period input.
   * @return {Promise<void>}
   */
  validatePeriodInput() {
    const period = this.state.period;
    let periodError = "";
    if (!period.length) {
      periodError = this.translate("A TOTP expiry is required.");
    }

    return new Promise(resolve => {
      this.setState({periodError}, resolve);
    });
  }

  /*
   * =============================================================
   *  Create resource
   * =============================================================
   */
  /**
   * Create the resource
   * @returns {Promise<Object>} returns the newly created resource
   */
  async createStandaloneOtp() {
    const resourceDto = {
      name: this.state.name,
      uri: this.state.uri,
      folder_parent_id: this.props.folderParentId,
    };

    // Resource type with encrypted totp
    return this.create(resourceDto, {
      totp: {
        algorithm:  this.state.algorithm,
        digits: parseInt(this.state.digits, 10),
        period: parseInt(this.state.period, 10),
        secret_key: this.state.key.trim().toUpperCase(),
      },
    });
  }

  /**
   * Create with encrypted description type
   *
   * @param {object} resourceDto
   * @param {object} secretDto
   * @returns {Promise<*>}
   */
  async create(resourceDto, secretDto) {
    resourceDto.resource_type_id = this.props.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.TOTP
    );

    return this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess(resource) {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The TOTP has been added successfully"));
    this.props.history.push(`/app/passwords/view/${resource.id}`);
    this.handleClose();
  }

  /*
   * =============================================================
   *  Error handling
   * =============================================================
   */
  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  async handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      // Do nothing
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleUnexpectedError(error);
    }
  }

  /**
   * handle unexpected error to display the error dialog
   * @param error
   */
  handleUnexpectedError(error) {
    const errorDialogProps = {
      error: error,
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Focus the first field of the form which is in error state.
   */
  focusFirstFieldError() {
    if (this.state.nameError) {
      this.nameInputRef.current.focus();
    } else if (this.state.keyError) {
      this.keyInputRef.current.focus();
    } else if (this.state.periodError) {
      this.setState({openAdvancedSettings: true});
      this.periodInputRef.current.focus();
    } else if (this.state.digitsError) {
      this.setState({openAdvancedSettings: true});
      this.digitsInputRef.current.focus();
    }
  }

  /*
   * =============================================================
   *  Dialog actions event handlers
   * =============================================================
   */
  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  /**
   * Handle name input keyUp event.
   */
  handleNameInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateNameInput();
      this.setState(state);
    } else {
      const nameWarning = maxSizeValidation(this.state.name, RESOURCE_NAME_MAX_LENGTH, this.translate);
      this.setState({nameWarning});
    }
  }

  /**
   * Handle key input keyUp event.
   */
  handleKeyInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateKeyInput();
      this.setState(state);
    } else {
      const keyWarning = maxSizeValidation(this.state.key, RESOURCE_TOTP_KEY_MAX_LENGTH, this.translate);
      this.setState({keyWarning});
    }
  }

  /**
   * Handle period input keyUp event.
   */
  handlePeriodInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validatePeriodInput();
      this.setState(state);
    }
  }

  /**
   * Handle digits input keyUp event.
   */
  handleDigitsInputKeyUp() {
    if (this.state.hasAlreadyBeenValidated) {
      const state = this.validateDigitsInput();
      this.setState(state);
    }
  }

  /**
   * Handle close
   */
  async handleClose() {
    this.props.onClose();
  }

  /**
   * Whenever the user input keys in the name area
   */
  handleUriInputKeyUp() {
    if (!this.state.hasAlreadyBeenValidated) {
      const uriWarning = maxSizeValidation(this.state.uri, RESOURCE_URI_MAX_LENGTH, this.translate);
      this.setState({uriWarning});
    }
  }

  /**
   * handle when the users click on the section advanced settings.
   * Open/Close it.
   */
  async handleAdvancedSettingClickEvent() {
    // If the section is open, close the section.
    const openAdvancedSettings = !this.state.openAdvancedSettings;
    this.setState({openAdvancedSettings});
  }

  /**
   * Handle click on camera icon to upload qr code
   */
  handleUploadImageButtonClick() {
    this.props.dialogContext.open(UploadQrCode, {title: this.translate("Create standalone TOTP"), onSave: this.handleSaveUploadQrCode});
  }

  /**
   * Handle save an uploaded QR code
   * @param qrCode
   * @return {Promise<void>}
   */
  async handleSaveUploadQrCode(qrCode) {
    await this.toggleProcessing();
    qrCode.resourceDto.folder_parent_id = this.props.folderParentId;
    try {
      const resource = await this.create(qrCode.resourceDto, qrCode.secretDto);
      await this.handleSaveSuccess(resource);
    } catch (error) {
      await this.toggleProcessing();
      await this.handleSaveError(error);
    }
  }

  /**
   * Get the supported algorithms
   * @returns {array}
   */
  get supportedAlgorithms() {
    return [
      {value: "SHA1", label: "SHA1"},
      {value: "SHA256", label: "SHA256"},
      {value: "SHA512", label: "SHA512"}
    ];
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <DialogWrapper title={this.translate("Create standalone TOTP")} className="create-standalone-totp-dialog"
        disabled={this.state.processing} onClose={this.handleClose}>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.nameError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-standalone-totp-form-name"><Trans>Name</Trans> (<Trans>Label</Trans>){this.state.nameWarning && <Icon name="exclamation" />}</label>
              <input id="create-standalone-totp-form-name" name="name" type="text" value={this.state.name}
                onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                disabled={this.state.processing} ref={this.nameInputRef} className="required fluid" maxLength="255"
                required="required" autoComplete="off" autoFocus={true} placeholder={this.translate("Name")}/>
              {this.state.nameError &&
              <div className="name error-message">{this.state.nameError}</div>
              }
              {this.state.nameWarning && (
                <div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.nameWarning}
                </div>
              )}
            </div>
            <div className={`input text ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-standalone-totp-form-uri"><Trans>URI</Trans> (<Trans>Issuer</Trans>){this.state.uriWarning && <Icon name="exclamation" />}</label>
              <input id="create-standalone-totp-form-uri" name="uri" className="fluid" maxLength="1024" type="text" onKeyUp={this.handleUriInputKeyUp}
                autoComplete="off" value={this.state.uri} onChange={this.handleInputChange} placeholder={this.translate("URI")}
                disabled={this.state.processing}/>
              {this.state.uriWarning && (
                <div className="uri warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.uriWarning}
                </div>
              )}
            </div>
            <div className={`input text required ${this.state.keyError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-standalone-totp-form-key">
                <Trans>Key</Trans> (<Trans>secret</Trans>){this.state.keyWarning && <Icon name="exclamation"/>}
              </label>
              <div className="input-wrapper-inline">
                <input id="create-standalone-totp-form-key" name="key" maxLength="1024" type="text" onKeyUp={this.handleKeyInputKeyUp}
                  autoComplete="off" value={this.state.key} onChange={this.handleInputChange} placeholder={this.translate("Key")}
                  disabled={this.state.processing} ref={this.keyInputRef}/>
                <button type="button" onClick={this.handleUploadImageButtonClick} disabled={this.state.processing}
                  className={`button-icon ${this.state.processing ? "disabled" : ""}`}>
                  <Icon name='camera' big={true}/>
                </button>
              </div>
              {this.state.keyError &&
                <div className="key error-message">{this.state.keyError}</div>
              }
              {this.state.keyWarning &&
                <div className="key warning-message"><strong><Trans>Warning:</Trans></strong> {this.state.keyWarning}</div>
              }
            </div>
          </div>
          <div className="form-content no-padding">
            <div className={`accordion accordion-section ${this.state.openAdvancedSettings ? "" : "closed"}`}>
              <div className="accordion-header">
                <h4>
                  <button className="link no-border" type="button" onClick={this.handleAdvancedSettingClickEvent}>
                    <Trans>Advanced settings</Trans>
                    {this.state.openAdvancedSettings &&
                      <Icon name="caret-down"/>
                    }
                    {!this.state.openAdvancedSettings &&
                      <Icon name="caret-right"/>
                    }
                  </button>
                </h4>
              </div>
              <div className="accordion-content">
                <div className={`input text required ${this.state.periodError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
                  <label htmlFor="create-standalone-totp-form-period"><Trans>TOTP expiry</Trans></label>
                  <div className="input-wrapper-inline">
                    <input id="create-standalone-totp-form-period" name="period" type="number" value={this.state.period} onChange={this.handleInputChange}
                      disabled={this.state.processing} ref={this.periodInputRef} onKeyUp={this.handlePeriodInputKeyUp} className="required" min="30" max="120"/>
                    <span><Trans>seconds until the TOTP expires</Trans></span>
                  </div>
                  {this.state.periodError &&
                    <div className="period error-message">{this.state.periodError}</div>
                  }
                </div>
                <div className={`input text required ${this.state.digitsError ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
                  <label htmlFor="create-standalone-totp-form-digits"><Trans>TOTP length</Trans></label>
                  <div className="input-wrapper-inline">
                    <input id="create-standalone-totp-form-digits" name="digits" type="number" value={this.state.digits} onChange={this.handleInputChange}
                      disabled={this.state.processing} className="required" min="6" max="8" onKeyUp={this.handleDigitsInputKeyUp} ref={this.digitsInputRef}/>
                    <span><Trans>digits</Trans></span>
                  </div>
                  {this.state.digitsError &&
                    <div className="digits error-message">{this.state.digitsError}</div>
                  }
                </div>
                <div className={`select-wrapper input required ${this.state.processing ? 'disabled' : ''}`}>
                  <label htmlFor="create-standalone-totp-form-algorithm"><Trans>Algorithm</Trans></label>
                  <Select id="create-standalone-totp-form-algorithm" name="algorithm" value={this.state.algorithm}
                    items={this.supportedAlgorithms} disabled={this.state.processing} onChange={this.handleInputChange}/>
                </div>
              </div>
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.state.processing} onClick={this.handleClose}/>
            <FormSubmitButton value={this.translate("Create")} disabled={this.state.processing} processing={this.state.processing}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

CreateStandaloneTotp.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.object, // Router history
  onClose: PropTypes.func, // Whenever the component must be closed
  folderParentId: PropTypes.string, // The folder parent id
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context
  t: PropTypes.func, // The translation function
};

export default  withRouter(withAppContext(withActionFeedback(withDialog(withTranslation('common')(CreateStandaloneTotp)))));

