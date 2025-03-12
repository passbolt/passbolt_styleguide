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
 * @since         5.0.0
 */

import PropTypes from "prop-types";
import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import CopySVG from "../../../../img/svg/copy.svg";
import QrCodeSVG from "../../../../img/svg/qr_code.svg";
import TimerSVG from "../../../../img/svg/timer.svg";
import Password from "../../../../shared/components/Password/Password";
import Totp from "../../../../shared/components/Totp/Totp";
import TotpViewModel from "../../../../shared/models/totp/TotpViewModel";
import Select from "../../Common/Select/Select";
import TotpEntity from "../../../../shared/models/entity/totp/totpEntity";
import {TotpCodeGeneratorService} from "../../../../shared/services/otp/TotpCodeGeneratorService";
import ClipBoard from "../../../../shared/lib/Browser/clipBoard";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {Html5Qrcode, Html5QrcodeSupportedFormats} from "html5-qrcode";
import AttentionSVG from "../../../../img/svg/attention.svg";

class AddResourceTotp extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createReferences();
  }

  get defaultState() {
    return {
      displayAdvancedSettings: false,
      warningImportFile: null,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleDisplayAdvancedSettingsClick = this.handleDisplayAdvancedSettingsClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.hasValidTotp = this.hasValidTotp.bind(this);
    this.handleTotpClick = this.handleTotpClick.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.handleInputFileChange = this.handleInputFileChange.bind(this);
    this.isFieldUriError = this.isFieldUriError.bind(this);
  }

  /**
   * Create elements references
   */
  createReferences() {
    this.fileUploaderRef = React.createRef();
    this.keyInputRef = React.createRef();
    this.periodInputRef = React.createRef();
    this.digitsInputRef = React.createRef();
  }


  /**
   * Component did mount
   */
  componentDidMount() {
    const hasError = Boolean(this.props.errors);
    if (hasError) {
      this.focusFirstFieldError();
    }
  }

  /**
   * Component did update
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    const hasSameError = prevProps.errors === this.props.errors;
    const isFirstError = prevProps.errors === null;
    // Avoid focus when the user change the form
    const hasNotResourceChanged = prevProps.resource === this.props.resource;
    // Avoid a call and a loop when state displayAdvancedSettings changed
    const hasChangedDisplayAdvancedSettings = prevState.displayAdvancedSettings !== this.state.displayAdvancedSettings;
    // Should focus on the first error field
    const shouldFocusFirstErrorField = hasSameError && hasNotResourceChanged && !hasChangedDisplayAdvancedSettings || isFirstError;
    if (shouldFocusFirstErrorField) {
      this.focusFirstFieldError();
    }
  }

  /**
   * Handles the click on the display secrets button.
   */
  handleDisplayAdvancedSettingsClick() {
    this.setState({displayAdvancedSettings: !this.state.displayAdvancedSettings});
  }

  /**
   * Handle the selection of a file by file explorer
   */
  handleSelectFile() {
    this.fileUploaderRef.current.click();
  }

  async handleInputFileChange(event) {
    try {
      const [file] = event.target.files;
      const value = await this.getTotpFromFile(file);
      const eventTotp = {
        target: {
          name: "secret.totp",
          value: value
        }
      };
      this.props.onChange?.(eventTotp);
    } catch (error) {
      this.handleImportError(error);
    }
  }

  /**
   * Get the supported algorithms
   * @returns {array}
   */
  get supportedAlgorithms() {
    return TotpViewModel.SUPPORTED_ALGORITHMS.map(algorithm => ({value: algorithm, label: algorithm}));
  }

  /**
   * Is resource has password
   * @returns {boolean}
   */
  get isResourceHasPassword() {
    return this.props.resource?.secret?.password != null;
  }

  /**
   * Get the translation function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    this.setState({warningImportFile: null});
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  /**
   * Has valid totp
   * @returns {boolean}
   */
  hasValidTotp() {
    const totpEntity = new TotpEntity(this.props.resource?.secret?.totp, {validate: false});
    const errors = totpEntity.validate();
    return errors === null;
  }

  /**
   * Handle Totp click
   * @returns {Promise<void>}
   */
  async handleTotpClick() {
    const code = TotpCodeGeneratorService.generate(this.props.resource.secret.totp);
    await ClipBoard.copy(code, this.props.context.port);
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The TOTP has been copied to clipboard"));
  }

  /**
   * Get the totp from qr code
   * @param {File} file The file
   * @returns {Promise<TotpEntity>}
   */
  async getTotpFromFile(file) {
    const url = await this.getDataFromQrCode(file);
    return TotpEntity.createTotpFromUrl(url);
  }

  /**
   * Get data from QR code
   * @param {File} file The file
   * @return {Promise<module:url.URL>}
   */
  async getDataFromQrCode(file) {
    const html5QrCode = new Html5Qrcode("upload-qr-code", {formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]});
    const result = await html5QrCode.scanFileV2(file, false);
    // Decode uri for special characters
    return new URL(decodeURIComponent(result.decodedText));
  }

  /**
   * Handle import error.
   * @param {Object} error The error returned by the qr code file and entity
   */
  handleImportError(error) {
    const isNoQrCodeFound = error.name === "NotFoundException";
    let warningImportFile = null;

    if (isNoQrCodeFound) {
      warningImportFile = this.translate("No QR code found.");
    } else {
      console.error(error);
      warningImportFile = this.translate("The QR code is incomplete.");
    }

    this.setState({warningImportFile: warningImportFile});
  }

  /**
   * Has errors import file
   * @returns {boolean}
   */
  get hasWarningImportFile() {
    return Boolean(this.state.warningImportFile);
  }

  /**
   * Checks if there is a max length warning for a specific property.
   *
   * @param {string} propName - The name of the property to check for max length warnings.
   * @returns {boolean} - Returns true if there is a max length warning for the property, false otherwise.
   */
  isMaxLengthWarnings(propName) {
    return this.props.warnings?.hasError(propName, "maxLength");
  }

  /**
   * Is field totp has error
   * @param {string} name
   * @return {boolean}
   */
  isFieldTotpError(name) {
    return this.props.errors?.details?.secret?.details.totp?.hasError(name);
  }

  /**
   * Is field uri has error
   * @param {string} propName
   * @return {boolean}
   */
  isFieldUriError(propName) {
    const uris = propName.split('.');
    const propArrayName = uris[0];
    const propsArrayIndex = uris[1];
    return this.props.errors?.details?.metadata?.details?.[propArrayName]?.[propsArrayIndex].maxLength;
  }

  /**
   * Get the secret key error message
   * @return {*|null}
   */
  get secretKeyErrorMessage() {
    const secretError = this.props.errors?.details.secret;
    const error = secretError?.details.totp.getError('secret_key');
    if (error?.minLength && this.props.resource.secret.totp.secret_key.length === 0) {
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
    const secretError = this.props.errors?.details.secret;
    const error = secretError?.details.totp.getError('period');
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
    const secretError = this.props.errors?.details.secret;
    const error = secretError?.details.totp.getError('digits');

    if (error?.type) {
      return this.translate("TOTP length is required.");
    } else if (error?.minimum || error?.maximum) {
      return this.translate("TOTP length must be between 6 and 8.");
    }
    return null;
  }

  /**
   * Focus the first field of the form which is in error state.
   */
  focusFirstFieldError() {
    if (this.isFieldTotpError("secret_key")) {
      this.keyInputRef.current.focus();
    } else if (this.isFieldTotpError("period")) {
      // Avoid a loop on the did update
      if (this.state.displayAdvancedSettings) {
        this.periodInputRef.current.focus();
      } else {
        this.setState({displayAdvancedSettings: true}, () => this.periodInputRef.current.focus());
      }
    } else if (this.isFieldTotpError("digits")) {
      // Avoid a loop on the did update
      if (this.state.displayAdvancedSettings) {
        this.digitsInputRef.current.focus();
      } else {
        this.setState({displayAdvancedSettings: true}, () => this.digitsInputRef.current.focus());
      }
    }
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    const hasValidTotp = this.hasValidTotp();

    return (
      <div className="totp-workspace">
        <div className="totp-form">
          <div className="title">
            <h2><Trans>TOTP</Trans></h2>
          </div>
          <div className="content">
            <div className="totp-fields">
              {!this.isResourceHasPassword &&
                <div className={`input text ${this.props.disabled ? 'disabled' : ''}`}>
                  <label htmlFor="resource-uri"><Trans>URI</Trans>{this.isMaxLengthWarnings("uris.0") && <AttentionSVG className="attention-required"/>}</label>
                  <input id="resource-uri" disabled={this.props.disabled} name="metadata.uris.0" maxLength="1024" type="text" autoComplete="off" placeholder={this.translate("URI")} value={this.props.resource?.metadata?.uris?.[0]} onChange={this.handleInputChange} />
                  {this.isMaxLengthWarnings("uris.0") && !this.isFieldUriError("uris.0") &&
                    <div className="uri warning-message">
                      <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                    </div>
                  }
                  {this.isFieldUriError("uris.0") &&
                    <div className="uri error-message"><Trans>This is the maximum size for this field, make sure your data was not truncated.</Trans></div>
                  }
                </div>
              }
              <div className={`input text ${this.isFieldTotpError("secret_key") ? "error" : ""} ${this.props.disabled ? 'disabled' : ''}`}>
                <label htmlFor="resource-totp-key"><Trans>Key</Trans> (<Trans>secret</Trans>)</label>
                <div className="secret-key-wrapper">
                  <Password id="resource-totp-key" disabled={this.props.disabled} name="secret.totp.secret_key" inputRef={this.keyInputRef} autoComplete="new-password" placeholder={this.translate("Key")} preview={true} value={this.props.resource?.secret?.totp?.secret_key} onChange={this.handleInputChange}/>
                  <input
                    type="file"
                    name="secret.totp"
                    id="upload-qr-code"
                    ref={this.fileUploaderRef}
                    onChange={this.handleInputFileChange}
                    accept=".png, .jpg, .jpeg"/>
                  <button
                    className="button"
                    type="button"
                    id="import-qr-code"
                    onClick={this.handleSelectFile}>
                    <QrCodeSVG/>
                    <span><Trans>Upload a QR code</Trans></span>
                  </button>
                </div>
                {this.isFieldTotpError("secret_key") &&
                  <div className="totp-key error-message">{this.secretKeyErrorMessage}</div>
                }
              </div>
            </div>
            <div className="additional-information">
              <button type="button" className="section-header no-border" onClick={this.handleDisplayAdvancedSettingsClick}>
                <h4><Trans>Advanced password generation</Trans></h4>
                {this.state.displayAdvancedSettings
                  ? <CaretDownSVG/>
                  : <CaretRightSVG/>
                }
              </button>
              {this.state.displayAdvancedSettings &&
                <div className="advanced-settings">
                  <div className={`input text ${this.isFieldTotpError("period") ? "error" : ""} ${this.props.disabled ? 'disabled' : ''}`}>
                    <label htmlFor="resource-totp-period"><Trans>TOTP expiry</Trans></label>
                    <div className="input-wrapper-inline">
                      <input id="resource-totp-period" ref={this.periodInputRef} disabled={this.props.disabled} name="secret.totp.period" type="number" min="1" max="120" value={this.props.resource?.secret?.totp?.period} onChange={this.handleInputChange}/>
                      <span><Trans>seconds until the TOTP expires</Trans></span>
                    </div>
                    {this.isFieldTotpError("period") &&
                      <div className="period error-message">{this.periodErrorMessage}</div>
                    }
                  </div>
                  <div className={`input text ${this.isFieldTotpError("digits") ? "error" : ""} ${this.props.disabled ? 'disabled' : ''}`}>
                    <label htmlFor="resource-totp-digits"><Trans>TOTP length</Trans></label>
                    <div className="input-wrapper-inline">
                      <input id="resource-totp-digits" ref={this.digitsInputRef} disabled={this.props.disabled} name="secret.totp.digits" type="number" min="6" max="8" value={this.props.resource?.secret?.totp?.digits} onChange={this.handleInputChange}/>
                      <span><Trans>digits</Trans></span>
                    </div>
                    {this.isFieldTotpError("digits") &&
                      <div className="digits error-message">{this.digitsErrorMessage}</div>
                    }
                  </div>
                  <div className={`select-wrapper input ${this.props.disabled ? 'disabled' : ''}`}>
                    <label htmlFor="resource-totp-algorithm"><Trans>Algorithm</Trans></label>
                    <Select id="resource-totp-algorithm" disabled={this.props.disabled} name="secret.totp.algorithm" items={this.supportedAlgorithms} value={this.props.resource?.secret?.totp?.algorithm} onChange={this.handleInputChange}/>
                  </div>
                </div>
              }
            </div>
          </div>
          {this.hasWarningImportFile &&
            <div className="message warning">
              <p>
                {this.state.warningImportFile}
              </p>
            </div>
          }
        </div>

        <div className="totp-view">
          <div className="title">
            <h2 className="preview"><Trans>Preview</Trans></h2>
          </div>
          <div className="totp-wrapper">
            {hasValidTotp
              ? <div className="secret-totp"><Totp totp={this.props.resource.secret.totp} canClick={true} onClick={this.handleTotpClick}/></div>
              : <div className="secret-totp secret-copy">
                <button type="button" className="no-border" disabled={true}>
                  <span>Copy TOTP to clipboard</span>
                </button>
                <TimerSVG style={{
                  "--timer-duration": "0s",
                  "--timer-delay": "0s",
                  "--timer-stroke-width": "0.25rem"
                }}/>
              </div>
            }
            <button id="copy-totp" type="button" onClick={this.handleTotpClick} disabled={!hasValidTotp}>
              <CopySVG/>
              <span>Copy TOTP</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddResourceTotp.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.object, // the action feedback context
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, //The resource setter
  t: PropTypes.func, // The translation function
  warnings: PropTypes.object, //The warnings validation
  errors: PropTypes.object, // The errors entity error validation
  disabled: PropTypes.bool // The disabled property
};

export default  withAppContext(withActionFeedback(withTranslation('common')(AddResourceTotp)));

