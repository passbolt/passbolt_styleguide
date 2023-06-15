/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.11.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import IdentifyViaSsoService from "../../../../shared/services/sso/IdentifyViaSsoService";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";

class IdentifyWithSso extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
    this.identifyViaSsoService = new IdentifyViaSsoService(this.props.ssoProvider.id, this.props.context, this.handleSsoAuthSuccess, this.handleSsoAuthSuccessForRegistration);
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      processing: false,
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentWillUnmount() {
    this.handleBeforeUnload();
  }

  /**
   * Handles the `beforeunload` event to ensure ^popup is closed and event listener is removed.
   */
  handleBeforeUnload() {
    this.identifyViaSsoService.stopProcess();
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);
    this.handleSsoRecoverClick = this.handleSsoRecoverClick.bind(this);
    this.handleGoToEmailClick = this.handleGoToEmailClick.bind(this);
    this.handleSsoAuthSuccess = this.handleSsoAuthSuccess.bind(this);
    this.handleSsoAuthSuccessForRegistration = this.handleSsoAuthSuccessForRegistration.bind(this);
  }

  /**
   * Handles the click on the SSO recover button
   * @returns {void}
   */
  async handleSsoRecoverClick() {
    if (this.state.processing) {
      return;
    }
    this.toggleProcessing();
    try {
      await this.identifyViaSsoService.exec();
    } catch (e) {}
    this.toggleProcessing();
  }

  /**
   * Handles IdentifyViaSsoService success callback
   * @param {string} recoverUrl the URL to redirect to
   */
  handleSsoAuthSuccess(recoverUrl) {
    window.location.href = recoverUrl;
  }

  /**
   * Handles IdentifyViaSsoService callback when SSO auth succeed but requires registration
   * @param {string} email the user email to use for the registration
   */
  handleSsoAuthSuccessForRegistration(email) {
    this.props.onUserRegistrationRequired(email);
  }

  /**
   * Handles the click to switch to the identification via email process.
   */
  handleGoToEmailClick() {
    this.identifyViaSsoService.stopProcess();
    this.props.onSecondaryActionClick();
  }

  /**
   * Toggle processing state
   */
  toggleProcessing() {
    const prev = this.state.processing;
    this.setState({processing: !prev});
  }

  isProcessing() {
    return this.state.processing;
  }

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const ssoProvider = this.props.ssoProvider;
    if (!ssoProvider) {
      return null;
    }
    const isDisabled = this.isProcessing();
    const processingClassName = isDisabled ? 'disabled' : '';
    return (
      <div className="enter-username">
        <h1><Trans>Welcome back!</Trans></h1>
        <p><Trans>Your browser is not configured to work with this passbolt instance.</Trans> <Trans>Please authenticate with the Single Sign-On provider to continue.</Trans></p>
        <div className="sso-login-form form-actions">
          <button type="button" className={`sso-login-button ${processingClassName} ${ssoProvider.id}`} onClick={this.handleSsoRecoverClick} disabled={isDisabled} >
            <span className="provider-logo">
              {ssoProvider.icon}
            </span>
            {this.props.t(`Sign in with {{providerName}}`, {providerName: ssoProvider.name})}
          </button>
          <button type="button" className="link" onClick={this.handleGoToEmailClick}>
            <Trans>Continue with my email.</Trans>
          </button>
        </div>
      </div>
    );
  }
}

IdentifyWithSso.propTypes = {
  ssoProvider: PropTypes.object, // The
  onSecondaryActionClick: PropTypes.func, // the callback for the secondary action button
  onUserRegistrationRequired: PropTypes.func, // the callback to call when the user needs to register
  context: PropTypes.any, // The application context provider
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(IdentifyWithSso));
