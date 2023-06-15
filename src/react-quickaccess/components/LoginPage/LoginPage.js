import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import Password from "../../../shared/components/Password/Password";
import SsoProviders from "../../../react-extension/components/Administration/ManageSsoSettings/SsoProviders.data";
import {withSso} from "../../contexts/SsoContext";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.initEventHandlers();
    this.passphraseInputRef = React.createRef();
  }

  initEventHandlers() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwitchToPassphrase = this.handleSwitchToPassphrase.bind(this);
    this.handleSwitchToSso = this.handleSwitchToSso.bind(this);
    this.handleSignInWithSso = this.handleSignInWithSso.bind(this);
  }

  initState() {
    return {
      error: "",
      ssoError: null,
      processing: false,
      rememberMe: false,
      displaySso: false,
      isSsoAvailable: false,
      isReady: false,
    };
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.props.ssoContext.loadSsoConfiguration();
    if (this.props.ssoContext.hasUserAnSsoKit()) {
      this.setState({isSsoAvailable: true, displaySso: true, isReady: true});
    } else {
      this.setState({isReady: true});
      this.focusOnPassphrase();
    }
  }

  /**
   * Put the focus on the passphrase input
   */
  focusOnPassphrase() {
    this.passphraseInputRef.current.focus();
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    this.setState({processing: true, error: ""});

    try {
      await this.login();
    } catch (error) {
      this.setState({
        error: error.message,
        processing: false
      });
      // Force the focus onto the passphrase input. The autoFocus attribute only works with the first rendering.
      this.focusOnPassphrase();
    }
  }

  async login() {
    let passphrase = this.passphraseInputRef.current.value;
    await this.props.context.port.request("passbolt.auth.login", passphrase, this.state.rememberMe);
    passphrase = null;
    this.passphraseInputRef.current.value = null;
    await this.handleLoginSuccess();
  }

  async handleLoginSuccess() {
    const isMfaRequired = await this.props.context.port.request("passbolt.auth.is-mfa-required");
    if (!isMfaRequired) {
      this.props.loginSuccessCallback();
      this.props.history.push("/webAccessibleResources/quickaccess.html");
    } else {
      this.props.mfaRequiredCallback(this.props.context.userSettings.getTrustedDomain());
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /**
   * Switches the UI to the SSO mode.
   */
  handleSwitchToSso(event) {
    event.preventDefault();
    this.setState({displaySso: true, ssoError: null});
  }

  /**
   * Switches the UI to the passphrase mode.
   */
  handleSwitchToPassphrase(event) {
    event.preventDefault();
    this.setState({displaySso: false});
  }

  /**
   * Handle the click on the SSO login button.
   * @returns {Promise<void>}
   */
  async handleSignInWithSso(event) {
    event.preventDefault();
    this.setState({processing: true, ssoError: ""});
    //save the current window blur behaviour option
    const currentWindowBlurState = this.props.context.shouldCloseAtWindowBlur;
    this.props.context.setWindowBlurBehaviour(false);
    try {
      await this.props.ssoContext.runSignInProcess();
      await this.handleLoginSuccess();
    } catch (e) {
      if (e.name === "SsoSettingsChangedError") {
        window.close();
      }
      if (e.name !== "UserAbortsOperationError") {
        this.setState({ssoError: e.message});
      }
    } finally {
      this.setState({
        processing: false
      });
      //rollback the current window blur behaviour option
      this.props.context.setWindowBlurBehaviour(currentWindowBlurState);
    }
  }

  /**
   * Returns true if SSO is enabled and configured for Azure.
   * @return {bool}
   */
  get isSsoLocalKitPresent() {
    const ssoProvider = this.props.ssoContext.getProvider();
    const isProviderAvailable = SsoProviders.find(provider => ssoProvider === provider.id);
    return isProviderAvailable;
  }

  /**
   * Returns the provider information of the current SSO provider configured.
   * @return {object}
   */
  get ssoProviderData() {
    const ssoProvider = this.props.ssoContext.getProvider();
    if (!ssoProvider) {
      return null;
    }
    return SsoProviders.find(provider => provider.id === ssoProvider);
  }

  render() {
    const ssoProviderData = this.ssoProviderData;
    return (
      <div className="quickaccess-login">
        <div className="login-form">
          {!this.state.displaySso && this.state.isReady &&
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-container">
              <div className="input text required">
                <label htmlFor="username"><Trans>Username</Trans></label>
                <input className="required" maxLength="50" type="text" id="username" required="required" value={this.props.context.userSettings.username} disabled="disabled" />
              </div>
              <div className="input text passphrase required">
                <label htmlFor="passphrase"><Trans>Passphrase</Trans></label>
                <div className="password with-token">
                  <Password
                    name="passphrase"
                    placeholder={this.props.t('Passphrase')}
                    id="passphrase"
                    autoComplete="off"
                    inputRef={this.passphraseInputRef}
                    preview={true}
                    securityToken={this.props.context.userSettings.getSecurityToken()}
                    disabled={this.state.processing}/>
                </div>
                {this.state.error &&
                <div className="error-message">{this.state.error}</div>
                }
              </div>
              {this.props.canRememberMe &&
                <div className="input checkbox">
                  <input type="checkbox" name="rememberMe" id="remember-me" checked={this.state.rememberMe} onChange={this.handleInputChange} disabled={this.state.processing} />
                  <label htmlFor="remember-me"><Trans>Remember until I log out.</Trans></label>
                </div>
              }
            </div>
            <div className="submit-wrapper">
              <button type="submit" className={`button primary big full-width ${this.state.processing ? "processing" : ""}`} role="button" disabled={this.state.processing}>
                <Trans>login</Trans>
                {this.state.processing &&
                  <Icon name="spinner"/>
                }
              </button>
              {this.state.isSsoAvailable &&
                <a className="show-sso-form-button" onClick={this.handleSwitchToSso}>
                  <Trans>Sign in with Single Sign-On.</Trans>
                </a>
              }
            </div>
          </form>
          }
          {this.state.displaySso && this.state.isReady &&
          <>
            <div className="form-actions sso-login-form">
              {this.isSsoLocalKitPresent &&
                <a className={`button sso-login-button ${this.state.processing ? "disabled" : ""} ${ssoProviderData.id}`} onClick={this.handleSignInWithSso} disabled={this.state.processing} >
                  <span className="provider-logo">
                    {ssoProviderData.icon}
                  </span>
                  {this.props.t(`Sign in with {{providerName}}`, {providerName: ssoProviderData.name})}
                </a>
              }
              <a className="show-passphrase-form-button" onClick={this.handleSwitchToPassphrase}>
                <Trans>Sign in with my passphrase.</Trans>
              </a>
              {this.state.ssoError &&
                <div className="error-message">
                  <Trans>An error occured during the sign-in via SSO.</Trans><br/>
                  {this.state.ssoError}
                </div>
              }
            </div>
          </>
          }
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  context: PropTypes.any, // The application context
  ssoContext: PropTypes.object, // The SSO context
  canRememberMe: PropTypes.bool, // True if the remember me flag must be displayed
  loginSuccessCallback: PropTypes.func,
  mfaRequiredCallback: PropTypes.func,
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withSso(withTranslation('common')(LoginPage))));
