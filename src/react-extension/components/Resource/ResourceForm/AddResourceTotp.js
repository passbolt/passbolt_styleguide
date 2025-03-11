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

class AddResourceTotp extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      displayAdvancedSettings: false,
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
    this.isFieldUriError = this.isFieldUriError.bind(this);
  }

  /**
   * Handles the click on the display secrets button.
   */
  handleDisplayAdvancedSettingsClick() {
    this.setState({displayAdvancedSettings: !this.state.displayAdvancedSettings});
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
    if (error?.minLength) {
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
                <div className="input text">
                  <label htmlFor="resource-uri"><Trans>URI</Trans></label>
                  <input id="resource-uri" name="metadata.uris.0" maxLength="1024" type="text" autoComplete="off" placeholder={this.translate("URI")} value={this.props.resource?.metadata?.uris?.[0]} onChange={this.handleInputChange} />
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
              <div className="input text">
                <label htmlFor="resource-totp-key"><Trans>Key</Trans> (<Trans>secret</Trans>)</label>
                <div className="secret-key-wrapper">
                  <Password id="resource-totp-key" name="secret.totp.secret_key" autoComplete="new-password" placeholder={this.translate("Key")} preview={true} value={this.props.resource?.secret?.totp?.secret_key} onChange={this.handleInputChange}/>
                  {this.isFieldTotpError("secret_key") &&
                      <div className="totp-key error-message">{this.secretKeyErrorMessage}</div>
                  }
                  <input
                    type="file"
                    id="dialog-upload-qr-code"
                    accept=".png, .jpg, .jpeg"/>
                  <button
                    className="button"
                    type="button">
                    <QrCodeSVG/>
                    <span><Trans>Upload a QR code</Trans></span>
                  </button>
                </div>
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
                  <div className="input text">
                    <label htmlFor="resource-totp-period"><Trans>TOTP expiry</Trans></label>
                    <div className="input-wrapper-inline">
                      <input id="resource-totp-period" name="secret.totp.period" type="number" min="1" max="120" value={this.props.resource?.secret?.totp?.period} onChange={this.handleInputChange}/>
                      <span><Trans>seconds until the TOTP expires</Trans></span>
                    </div>
                  </div>
                  {this.isFieldTotpError("period") &&
                      <div className="period error-message">{this.periodErrorMessage}</div>
                  }
                  <div className="input text">
                    <label htmlFor="resource-totp-digits"><Trans>TOTP length</Trans></label>
                    <div className="input-wrapper-inline">
                      <input id="resource-totp-digits" name="secret.totp.digits" type="number" min="6" max="8" value={this.props.resource?.secret?.totp?.digits} onChange={this.handleInputChange}/>
                      <span><Trans>digits</Trans></span>
                    </div>
                    {this.isFieldTotpError("digits") &&
                      <div className="digits error-message">{this.digitsErrorMessage}</div>
                    }
                  </div>
                  <div className="select-wrapper input">
                    <label htmlFor="resource-totp-algorithm"><Trans>Algorithm</Trans></label>
                    <Select id="resource-totp-algorithm" name="secret.totp.algorithm" items={this.supportedAlgorithms} value={this.props.resource?.secret?.totp?.algorithm} onChange={this.handleInputChange}/>
                  </div>
                </div>
              }
            </div>
          </div>
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
  errors: PropTypes.object // The errors entity error validation
};

export default  withAppContext(withActionFeedback(withTranslation('common')(AddResourceTotp)));

