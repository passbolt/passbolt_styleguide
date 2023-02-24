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
import {withAppContext} from "../../../contexts/AppContext";

class IdentifyWithSso extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
    this.identifyViaSsoService = new IdentifyViaSsoService(this.props.context);
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
      const recoverUrl = await this.identifyViaSsoService.exec(this.props.ssoProvider.id);
      window.location.href = recoverUrl;
    } catch (e) {}
    this.toggleProcessing();
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

  /**
   * Render
   * @returns {JSX.Element}
   */
  render() {
    const ssoProvider = this.props.ssoProvider;
    if (!ssoProvider) {
      return null;
    }
    return (
      <div className="enter-username">
        <h1><Trans>Welcome back!</Trans></h1>
        <p><Trans>Your browser is not configured to work with this passbolt instance.</Trans> <Trans>Please authenticate with the Single Sign-On provider to continue.</Trans></p>
        <div className="sso-login-form form-actions">
          <a className={`button sso-login-button ${this.isProcessing ? "disabled" : ""} ${ssoProvider.id}`} onClick={this.handleSsoRecoverClick} disabled={this.isProcessing} >
            <span className="provider-logo">
              {ssoProvider.icon}
            </span>
            {this.props.t(`Sign in with {{providerName}}`, {providerName: ssoProvider.name})}
          </a>
          <a onClick={this.handleGoToEmailClick}>
            <Trans>Continue with my email.</Trans>
          </a>
        </div>
      </div>
    );
  }
}

IdentifyWithSso.propTypes = {
  ssoProvider: PropTypes.object, // The
  onSecondaryActionClick: PropTypes.func, // the callback for the secondary action button
  context: PropTypes.any, // The application context provider
  history: PropTypes.object, // The router history
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(IdentifyWithSso));
