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
 * @since         6.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import Password from "../../../shared/components/Password/Password";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withOfflineSettingsLocalStorage } from "../../../shared/context/offline/OfflineSettingsLocalStorageContext";
import { SESSION_DURATION_OPTIONS } from "../../../react-extension/components/Administration/DisplayOfflineAdministration/OfflineSettingsEnum";
import Select from "../../../react-extension/components/Common/Select/Select";

const DEFAULT_SESSION_DURATION = SESSION_DURATION_OPTIONS[0].value;

/**
 * The offline login page. A mirror of the online LoginPage: local passphrase check only,
 * no SSO, no MFA. The remember-me checkbox is replaced by a session-duration dropdown.
 */
class OfflineLoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.initEventHandlers();
    this.passphraseInputRef = React.createRef();
  }

  initEventHandlers() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  initState() {
    return {
      error: "",
      processing: false,
      sessionDuration: DEFAULT_SESSION_DURATION,
    };
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.focusOnPassphrase();
  }

  /**
   * Put the focus on the passphrase input
   */
  focusOnPassphrase() {
    this.passphraseInputRef.current.focus();
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    this.setState({ processing: true, error: "" });

    try {
      await this.login();
    } catch (error) {
      this.setState({
        error: error.message,
        processing: false,
      });
      // Force the focus onto the passphrase input. The autoFocus attribute only works with the first rendering.
      this.focusOnPassphrase();
    }
  }

  async login() {
    let passphrase = this.passphraseInputRef.current.value;
    await this.props.context.port.request("passbolt.auth.login-offline", passphrase, this.state.sessionDuration);
    passphrase = null;
    this.passphraseInputRef.current.value = null;
    await this.handleLoginSuccess();
  }

  async handleLoginSuccess() {
    await this.props.context.loginOfflineSuccessCallBack();
    this.props.history.push("/webAccessibleResources/quickaccess/home");
  }

  /**
   * Handle form input changes.
   * @param {ReactEvent} event the react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.name === "sessionDuration" ? parseInt(target.value, 10) : target.value;
    this.setState({
      [target.name]: value,
    });
  }

  /**
   * Populate the session duration dropdown.
   * @returns a subset of SESSION_DURATION_OPTIONS capped with admin max session duration
   */
  getAvailableSessionOptions() {
    const max_session_duration = this.props.offlineSettings?.sessionDuration || 300;
    return SESSION_DURATION_OPTIONS.filter((option) => option.value <= max_session_duration);
  }

  render() {
    return (
      <div className="quickaccess-login quickaccess-offline-login">
        <div className="login-form">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-container">
              <div className="input text required">
                <label htmlFor="username">
                  <Trans>Username</Trans>
                </label>
                <input
                  className="required"
                  maxLength="50"
                  type="text"
                  id="username"
                  required="required"
                  value={this.props.context.userSettings.username}
                  disabled="disabled"
                />
              </div>
              <div className="input text passphrase required">
                <label htmlFor="passphrase">
                  <Trans>Passphrase</Trans>
                </label>
                <div className="password with-token">
                  <Password
                    name="passphrase"
                    placeholder={this.props.t("Passphrase")}
                    id="passphrase"
                    autoComplete="off"
                    inputRef={this.passphraseInputRef}
                    preview={true}
                    securityToken={this.props.context.userSettings.getSecurityToken()}
                    disabled={this.state.processing}
                  />
                </div>
                {this.state.error && <div className="error-message">{this.state.error}</div>}
              </div>
              <div className="input select">
                <label htmlFor="session-duration">
                  <Trans>Remember until signed out</Trans>
                </label>

                <Select
                  items={this.getAvailableSessionOptions()}
                  id="default-session-duration-select"
                  name="sessionDuration"
                  value={this.state.sessionDuration}
                  onChange={this.handleInputChange}
                  disabled={this.state.processing}
                />
              </div>
            </div>
            <div className="submit-wrapper">
              <button
                type="submit"
                className={`button primary big full-width ${this.state.processing ? "processing" : ""}`}
                role="button"
                disabled={this.state.processing}
              >
                <Trans>Sign in offline</Trans>
                {this.state.processing && <SpinnerSVG />}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

OfflineLoginPage.propTypes = {
  context: PropTypes.any, // The application context
  offlineSettings: PropTypes.object, // The organisation offline settings (null when not cached locally)
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withOfflineSettingsLocalStorage(withRouter(withTranslation("common")(OfflineLoginPage))));
