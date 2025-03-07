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
import AttentionSVG from "../../../../img/svg/attention.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

class CreateStandaloneTotp extends Component {
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
    return {
      standaloneTotp: new StandaloneTotpViewModel(),
      errors: null, // The errors
      warnings: {}, // The warnings
      processing: false, //The processing flag
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
    this.props.onSubmit(this.state.standaloneTotp);
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
      <DialogWrapper title={this.translate("Create standalone TOTP")} className="create-standalone-totp-dialog"
        disabled={this.state.processing} onClose={this.handleClose}>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.isFieldError("name") ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-standalone-totp-form-name"><Trans>Name</Trans> (<Trans>Label</Trans>){this.isFieldWarning("name") && <AttentionSVG className="attention-required"/>}</label>
              <input id="create-standalone-totp-form-name" name="name" type="text" value={this.state.standaloneTotp.name}
                onKeyUp={this.handleInputKeyUp} onChange={this.handleInputChange}
                disabled={this.state.processing} ref={this.nameInputRef} className="required fluid" maxLength="255"
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
            <div className={`input text ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-standalone-totp-form-uri"><Trans>URI</Trans> (<Trans>Issuer</Trans>){this.isFieldWarning("uri") && <AttentionSVG className="attention-required"/>}</label>
              <input id="create-standalone-totp-form-uri" name="uri" className="fluid" maxLength="1024" type="text" onKeyUp={this.handleInputKeyUp}
                autoComplete="off" value={this.state.standaloneTotp.uri} onChange={this.handleInputChange} placeholder={this.translate("URI")}
                disabled={this.state.processing}/>
              {this.isFieldWarning("uri") && (
                <div className="uri warning-message">
                  <strong><Trans>Warning:</Trans></strong> {this.state.warnings.uri}
                </div>
              )}
            </div>
            <div className={`input text required ${this.isFieldError("secret_key") ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
              <label htmlFor="create-standalone-totp-form-key">
                <Trans>Key</Trans> (<Trans>secret</Trans>){this.isFieldWarning("secret_key") && <AttentionSVG className="attention-required"/>}
              </label>
              <div className="input-wrapper-inline">
                <input id="create-standalone-totp-form-key" name="secret_key" maxLength="1024" type="text" onKeyUp={this.handleInputKeyUp}
                  autoComplete="off" value={this.state.standaloneTotp.secret_key} onChange={this.handleInputChange} placeholder={this.translate("Key")}
                  disabled={this.state.processing} ref={this.keyInputRef}/>
                <button type="button" onClick={this.handleUploadImageButtonClick} disabled={this.state.processing}
                  className={`button-icon ${this.state.processing ? "disabled" : ""}`}>
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
              </div>
              {this.state.openAdvancedSettings &&
                <div className="accordion-content">
                  <div className={`input text required ${this.isFieldError("period") ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
                    <label htmlFor="create-standalone-totp-form-period"><Trans>TOTP expiry</Trans></label>
                    <div className="input-wrapper-inline">
                      <input id="create-standalone-totp-form-period" name="period" type="number" value={this.state.standaloneTotp.period} onChange={this.handleInputChange}
                        disabled={this.state.processing} ref={this.periodInputRef} onKeyUp={this.handleInputKeyUp} className="required" min="1" max="120"/>
                      <span><Trans>seconds until the TOTP expires</Trans></span>
                    </div>
                    {this.isFieldError("period") &&
                      <div className="period error-message">{this.periodErrorMessage}</div>
                    }
                  </div>
                  <div className={`input text required ${this.isFieldError("digits") ? "error" : ""} ${this.state.processing ? 'disabled' : ''}`}>
                    <label htmlFor="create-standalone-totp-form-digits"><Trans>TOTP length</Trans></label>
                    <div className="input-wrapper-inline">
                      <input id="create-standalone-totp-form-digits" name="digits" type="number" value={this.state.standaloneTotp.digits} onChange={this.handleInputChange}
                        disabled={this.state.processing} className="required" min="6" max="8" onKeyUp={this.handleInputKeyUp} ref={this.digitsInputRef}/>
                      <span><Trans>digits</Trans></span>
                    </div>
                    {this.isFieldError("digits") &&
                      <div className="digits error-message">{this.digitsErrorMessage}</div>
                    }
                  </div>
                  <div className={`select-wrapper input required ${this.state.processing ? 'disabled' : ''}`}>
                    <label htmlFor="create-standalone-totp-form-algorithm"><Trans>Algorithm</Trans></label>
                    <Select id="create-standalone-totp-form-algorithm" name="algorithm" value={this.state.standaloneTotp.algorithm}
                      items={this.supportedAlgorithms} disabled={this.state.processing} onChange={this.handleInputChange}/>
                  </div>
                </div>
              }
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
  onClose: PropTypes.func, // Whenever the component must be closed
  onCancel: PropTypes.func, // Whenever the component must be canceled
  onSubmit: PropTypes.func, // Whenever the component must be submitted
  onOpenUploadQrCode: PropTypes.func, // Whenever the component open the upload QR code dialog
  t: PropTypes.func, // The translation function
};

export default  withTranslation('common')(CreateStandaloneTotp);

