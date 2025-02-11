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

import Icon from "../../../../shared/components/Icons/Icon";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {Trans, withTranslation} from "react-i18next";
import Select from "../../Common/Select/Select";
import StandaloneTotpViewModel from "../../../../shared/models/standaloneTotp/StandaloneTotpViewModel";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import TotpViewModel from "../../../../shared/models/totp/TotpViewModel";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import AttentionSVG from "../../../../img/svg/attention.svg";

class EditStandaloneTotp extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
    this.createInputRef();
  }

  /**
   * Get the default state
   * @return {*}
   */
  get defaultState() {
    const resource = this.props.resource || {};
    const name = resource.metadata.name || "";
    const uri = resource.metadata.uris?.[0] || "";

    return {
      nameOriginal: name,
      originalTotp: null,
      standaloneTotp: new StandaloneTotpViewModel({name, uri}),
      errors: null, // The errors
      warnings: {}, // The warnings
      processing: false, //The processing flag
      isSecretDecrypting: true,
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
      openAdvancedSettings: false, // True if the advanced settings section is open
    };
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.handleAdvancedSettingClickEvent = this.handleAdvancedSettingClickEvent.bind(this);
    this.handleUploadImageButtonClick = this.handleUploadImageButtonClick.bind(this);
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

  /**
   * Whenever the component has been mounted
   */
  async componentDidMount() {
    await this.decryptSecret();
  }

  /*
   * =============================================================
   *  Decryption
   * =============================================================
   */
  /**
   * Decrypt the password secret
   */
  async decryptSecret() {
    this.setState({isSecretDecrypting: true});

    try {
      const plaintextSecretDto = await this.getDecryptedSecret();
      const totp = plaintextSecretDto.totp;
      totp.name = this.state.standaloneTotp.name;
      totp.uri = this.state.standaloneTotp.uri;
      const standaloneTotp = new StandaloneTotpViewModel(totp);
      const originalTotp = new StandaloneTotpViewModel(totp);
      this.setState({standaloneTotp, originalTotp, isSecretDecrypting: false});
    } catch (error) {
      this.handleClose();
    }
  }

  /**
   * Get the decrypted password secret
   * @return {Promise<Object>}
   */
  async getDecryptedSecret() {
    return this.props.context.port.request("passbolt.secret.find-by-resource-id", this.props.resource.id);
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

    if (!this.validate()) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }

    // Resource type with encrypted totp
    const resourceDto = this.state.standaloneTotp.toResourceDto();
    const secretDto = TotpViewModel.areSecretsDifferent(this.state.standaloneTotp, this.state.originalTotp)
      ? this.state.standaloneTotp.toSecretDto()
      : null;

    this.props.onSubmit(resourceDto, secretDto);
    this.handleClose();
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
   * @return {boolean}
   */
  validate() {
    const errors = this.state.standaloneTotp.validate();
    this.setState({errors});
    return !errors.hasErrors();
  }

  /**
   * Focus the first field of the form which is in error state.
   */
  focusFirstFieldError() {
    if (this.isFieldError("name")) {
      this.nameInputRef.current.focus();
    } else if (this.isFieldError("secret_key")) {
      this.keyInputRef.current.focus();
    } else if (this.isFieldError("period")) {
      this.setState({openAdvancedSettings: true});
      this.periodInputRef.current.focus();
    } else if (this.isFieldError("digits")) {
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
    let value;
    if (target.type === "number") {
      value = Number.isNaN(target.valueAsNumber) ? "" : target.valueAsNumber;
    } else {
      value = target.value;
    }
    const name = target.name;
    const standaloneTotp = this.state.standaloneTotp.cloneWithMutation(name, value);
    this.setState({standaloneTotp});
  }

  /**
   * Handle name input keyUp event.
   */
  handleInputKeyUp(event) {
    const target = event.target;
    const name = target.name;
    if (this.state.hasAlreadyBeenValidated) {
      const errors = this.state.standaloneTotp.validateField(name);
      this.updateErrorsField(errors, name);
    } else {
      this.updateWarningsField(name);
    }
  }

  /**
   * Update errors field
   * @param {EntityValidationError} errors
   * @param {string} fieldName
   */
  updateErrorsField(errors, fieldName) {
    const errorsDetails = this.state.errors.details;
    // Reset  errors for the field
    delete errorsDetails[fieldName];
    // Merge errors details
    Object.assign(errors.details, errorsDetails);
    this.setState({errors});
  }

  /**
   * Update warnings field
   * @param {string} fieldName
   */
  updateWarningsField(fieldName) {
    const warnings = {...this.state.warnings};
    // Reset warning for the field
    delete warnings[fieldName];
    if (this.state.standaloneTotp.isWarningSizeField(fieldName)) {
      warnings[fieldName] = this.translate("this is the maximum size for this field, make sure your data was not truncated");
    }
    this.setState({warnings});
  }

  /**
   * Handle close
   */
  handleClose() {
    this.props.onCancel();
    this.props.onClose();
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
    this.props.onOpenUploadQrCode();
  }

  /**
   * Get the name error message
   * @return {*|null}
   */
  get nameErrorMessage() {
    const error = this.state.errors?.getError('name');
    if (error?.notEmpty) {
      return this.translate("The name is required.");
    }
    return null;
  }

  /**
   * Get the secret key error message
   * @return {*|null}
   */
  get secretKeyErrorMessage() {
    const error = this.state.errors?.getError('secret_key');
    if (error?.notEmpty) {
      return this.translate("The key is required.");
    } else if (error?.pattern) {
      return this.translate("The key is not valid.");
    }
    return null;
  }

  /**
   * Get the period error message
   * @return {*|null}
   */
  get periodErrorMessage() {
    const error = this.state.errors?.getError('period');
    if (error?.type) {
      return this.translate("TOTP expiry is required.");
    } else if (error?.minimum) {
      return this.translate("TOTP expiry must be greater than 0.");
    }
    return null;
  }

  /**
   * Get the digits error message
   * @return {*|null}
   */
  get digitsErrorMessage() {
    const error = this.state.errors?.getError('digits');
    if (error?.type) {
      return this.translate("TOTP length is required.");
    } else if (error?.minimum || error?.maximum) {
      return this.translate("TOTP length must be between 6 and 8.");
    }
    return null;
  }

  /*
   * =============================================================
   *  Placeholder texts / status helpers
   * =============================================================
   */

  /**
   * Get the secret key input field placeholder.
   * @returns {string}
   */
  get secretKeyInputPlaceholder() {
    let placeholder =  this.translate("Key");
    if (this.state.isSecretDecrypting) {
      placeholder = this.translate("Decrypting");
    }

    return placeholder;
  }

  /**
   * Is field has error
   * @param {string} name
   * @return {boolean}
   */
  isFieldError(name) {
    return this.state.errors?.hasError(name);
  }

  /**
   * Is field has warning
   * @param {string} name
   * @return {boolean}
   */
  isFieldWarning(name) {
    return Boolean(this.state.warnings[name]);
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  get hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * @returns {boolean}
   */
  get isSecretKeyDisabled() {
    return this.state.isSecretDecrypting;
  }

  /**
   * Get the supported algorithms
   * @returns {array}
   */
  get supportedAlgorithms() {
    return StandaloneTotpViewModel.SUPPORTED_ALGORITHMS.map(algorithm => ({value: algorithm, label: algorithm}));
  }

  /**
   * Get translate function
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
      <DialogWrapper title={this.translate("Edit standalone TOTP")} subtitle={this.state.nameOriginal} className="edit-standalone-totp-dialog"
        disabled={this.hasAllInputDisabled} onClose={this.handleClose}>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.isFieldError("name") ? "error" : ""} ${this.hasAllInputDisabled ? 'disabled' : ''}`}>
              <label htmlFor="edit-standalone-totp-form-name"><Trans>Name</Trans> (<Trans>Label</Trans>){this.isFieldWarning("name") && <AttentionSVG className="attention-required"/>}</label>
              <input id="edit-standalone-totp-form-name" name="name" type="text" value={this.state.standaloneTotp.name}
                onKeyUp={this.handleInputKeyUp} onChange={this.handleInputChange}
                disabled={this.hasAllInputDisabled} ref={this.nameInputRef} className="required fluid" maxLength="255"
                required="required" autoComplete="off" autoFocus={true} placeholder={this.translate("Name")}/>
              {this.isFieldError("name") &&
              <div className="name error-message">{this.nameErrorMessage}</div>
              }
              {this.isFieldWarning("name") && (
                <div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.warnings.name}
                </div>
              )}
            </div>
            <div className={`input text ${this.hasAllInputDisabled ? 'disabled' : ''}`}>
              <label htmlFor="edit-standalone-totp-form-uri"><Trans>URI</Trans> (<Trans>Issuer</Trans>){this.isFieldWarning("uri") && <AttentionSVG className="attention-required"/>}</label>
              <input id="edit-standalone-totp-form-uri" name="uri" className="fluid" maxLength="1024" type="text" onKeyUp={this.handleInputKeyUp}
                autoComplete="off" value={this.state.standaloneTotp.uri} onChange={this.handleInputChange} placeholder={this.translate("URI")}
                disabled={this.hasAllInputDisabled}/>
              {this.isFieldWarning("uri") && (
                <div className="uri warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.warnings.uri}
                </div>
              )}
            </div>
            <div className={`input text required ${this.isFieldError("secret_key") ? "error" : ""} ${this.hasAllInputDisabled ? 'disabled' : ''}`}>
              <label htmlFor="edit-standalone-totp-form-key">
                <Trans>Key</Trans> (<Trans>secret</Trans>){this.isFieldWarning("secret_key") && <AttentionSVG className="attention-required"/>}
              </label>
              <div className="input-wrapper-inline">
                <input id="edit-standalone-totp-form-key" name="secret_key" maxLength="1024" type="text" onKeyUp={this.handleInputKeyUp}
                  autoComplete="off" value={this.state.standaloneTotp.secret_key} onChange={this.handleInputChange} placeholder={this.secretKeyInputPlaceholder}
                  disabled={this.hasAllInputDisabled || this.isSecretKeyDisabled} ref={this.keyInputRef}/>
                <button type="button" onClick={this.handleUploadImageButtonClick} disabled={this.hasAllInputDisabled}
                  className={`button-icon ${this.hasAllInputDisabled ? "disabled" : ""}`}>
                  <Icon name='camera' big={true}/>
                </button>
              </div>
              {this.isFieldError("secret_key") &&
                <div className="key error-message">{this.secretKeyErrorMessage}</div>
              }
              {this.isFieldWarning("secret_key") &&
                <div className="key warning-message"><strong><Trans>Warning:</Trans></strong> {this.state.warnings.secret_key}</div>
              }
            </div>
            <div className="accordion accordion-section no-padding-bottom no-margin-divider">
              <div className="accordion-header">
                <h4>
                  <button className="link no-border" type="button" onClick={this.handleAdvancedSettingClickEvent}>
                    <span><Trans>Advanced settings</Trans></span>
                    {this.state.openAdvancedSettings
                      ? <CaretDownSVG/>
                      : <CaretRightSVG/>
                    }
                  </button>
                </h4>
                {this.state.openAdvancedSettings &&
                  <div className="accordion-content">
                    <div className={`input text required ${this.isFieldError("period") ? "error" : ""} ${this.hasAllInputDisabled ? 'disabled' : ''}`}>
                      <label htmlFor="edit-standalone-totp-form-period"><Trans>TOTP expiry</Trans></label>
                      <div className="input-wrapper-inline">
                        <input id="edit-standalone-totp-form-period" name="period" type="number" value={this.state.standaloneTotp.period} onChange={this.handleInputChange}
                          disabled={this.hasAllInputDisabled} ref={this.periodInputRef} onKeyUp={this.handleInputKeyUp} className="required" min="1" max="120"/>
                        <span><Trans>seconds until the TOTP expires</Trans></span>
                      </div>
                      {this.isFieldError("period") &&
                        <div className="period error-message">{this.periodErrorMessage}</div>
                      }
                    </div>
                    <div className={`input text required ${this.isFieldError("digits") ? "error" : ""} ${this.hasAllInputDisabled ? 'disabled' : ''}`}>
                      <label htmlFor="edit-standalone-totp-form-digits"><Trans>TOTP length</Trans></label>
                      <div className="input-wrapper-inline">
                        <input id="edit-standalone-totp-form-digits" name="digits" type="number" value={this.state.standaloneTotp.digits} onChange={this.handleInputChange}
                          disabled={this.hasAllInputDisabled} className="required" min="6" max="8" onKeyUp={this.handleInputKeyUp} ref={this.digitsInputRef}/>
                        <span><Trans>digits</Trans></span>
                      </div>
                      {this.isFieldError("digits") &&
                        <div className="digits error-message">{this.digitsErrorMessage}</div>
                      }
                    </div>
                    <div className={`select-wrapper input required ${this.hasAllInputDisabled ? 'disabled' : ''}`}>
                      <label htmlFor="edit-standalone-totp-form-algorithm"><Trans>Algorithm</Trans></label>
                      <Select id="edit-standalone-totp-form-algorithm" name="algorithm" value={this.state.standaloneTotp.algorithm}
                        items={this.supportedAlgorithms} disabled={this.hasAllInputDisabled} onChange={this.handleInputChange}/>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled} onClick={this.handleClose}/>
            <FormSubmitButton value={this.translate("Save")} disabled={this.hasAllInputDisabled} processing={this.state.processing}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditStandaloneTotp.propTypes = {
  resource: PropTypes.object.isRequired, // The id of the resource
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // Whenever the component must be closed
  onCancel: PropTypes.func, // Whenever the component must be canceled
  onSubmit: PropTypes.func, // Whenever the component must be submitted
  onOpenUploadQrCode: PropTypes.func, // Whenever the component open the upload QR code dialog
  t: PropTypes.func, // The translation function
};

export default  withAppContext(withTranslation('common')(EditStandaloneTotp));

