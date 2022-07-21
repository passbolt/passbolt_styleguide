import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {withAppContext} from "../../contexts/AppContext";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import Password from "../../../shared/components/Password/Password";

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
  }

  initState() {
    return {
      error: "",
      processing: false,
      passphrase: "",
      rememberMe: false,
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
    await this.props.context.port.request("passbolt.auth.login", this.state.passphrase, this.state.rememberMe);
    const isMfaRequired = await this.props.context.port.request("passbolt.auth.is-mfa-required");

    if (!isMfaRequired) {
      this.props.loginSuccessCallback();
      this.props.history.push("/data/quickaccess.html");
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

  render() {
    return (
      <div className="quickaccess-login">
        <div className="login-form">
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
                    name="passphrase" placeholder={this.props.t('Passphrase')}
                    id="passphrase"
                    autoComplete="off"
                    inputRef={this.passphraseInputRef}
                    value={this.state.passphrase}
                    onChange={this.handleInputChange}
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  context: PropTypes.any, // The application context
  canRememberMe: PropTypes.bool, // True if the remember me flag must be displayed
  loginSuccessCallback: PropTypes.func,
  mfaRequiredCallback: PropTypes.func,
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withTranslation('common')(LoginPage)));
