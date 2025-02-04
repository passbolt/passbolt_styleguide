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
import {withTranslation} from "react-i18next";
import {Trans} from 'react-i18next';
import {MfaSettingsWorkflowStates, withMfa} from "../../../contexts/MFAContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";

/**
 * This component will display the yubikey setup
 */
class YubikeySetup extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
    this.state = this.defaultState;
    this.createInputRef();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      yubikeyCode: "",
      isSubmitted: false,
      error: {
        isRequired: false,
        invalidCode: false
      }
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.focusOnOtpInput();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.otpInputRef = React.createRef();
  }

  /**
   * Put the focus on the otp input
   */
  focusOnOtpInput() {
    this.otpInputRef.current.focus();
  }

  /**
   * set an error to object
   */
  setError(key, value) {
    const error = Object.assign({}, this.state.error, {[key]: value});
    this.setState({error});
  }

  /**
   * Handle change of generic form input.
   * @param {object} event
   */
  handleInputChange(event) {
    const target = event.target;
    const yubikeyCode = target.value;
    if (this.state.yubikeyCode !== "") {
      this.setError("isRequired", false);
    }
    this.setState({yubikeyCode});
  }

  /**
   * handle the valdation click
   * @param event A form submit event
   */
  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.setState({isSubmitted: true});
      if (this.state.yubikeyCode === "") {
        this.setError("isRequired", true);
      } else {
        await this.props.mfaContext.validateYubikeyCode(this.state.yubikeyCode);
        this.props.mfaContext.navigate(MfaSettingsWorkflowStates.VIEWCONFIGURATION);
        await this.props.mfaContext.findMfaSettings();
      }
    } catch (error) {
      this.setError("invalidCode", true);
    }
  }
  /**
   * handle the cancelation when setup the provider
   */
  handleCancelClick() {
    this.props.mfaContext.goToProviderList();
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.mfaContext.isProcessing();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        <div className="main-column mfa-setup">
          <div className="main-content yubikey-setup">
            <h3>Yubikey One Time Password</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="input required">
                <label htmlFor="yubikey">Yubikey OTP</label>
                <input
                  type="password"
                  name="yubikey"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                  disabled={this.hasAllInputDisabled()}
                  ref={this.otpInputRef}/>
                {(this.state.error.isRequired && this.state.isSubmitted) &&
                <div className="code-required error-message"><Trans>A OTP code is required.</Trans></div>
                }
                {(this.state.error.invalidCode && this.state.isSubmitted) &&
                <div className="invalid-code error-message"><Trans>This OTP is not valid.</Trans></div>
                }
              </div>
              <div className="helptext">
                    Plug in the yubikey and put your finger on it.
              </div>
            </form>
          </div>
        </div>
        <div className="actions-wrapper">
          <button
            className="button cancel secondary"
            type='button'
            disabled={this.hasAllInputDisabled()}
            onClick={this.handleCancelClick}>
            <span><Trans>Cancel</Trans></span>
          </button>
          <button
            className="button primary"
            type='button'
            disabled={this.hasAllInputDisabled()}
            onClick={this.handleSubmit}>
            <span><Trans>Validate</Trans></span>
          </button>
        </div>
      </>
    );
  }
}

YubikeySetup.propTypes = {
  context: PropTypes.object, // the app context
  t: PropTypes.func, // The translation function
  mfaContext: PropTypes.object, // The mfa context
};

export default withAppContext(withMfa(withTranslation("common")(YubikeySetup)));
