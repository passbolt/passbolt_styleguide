import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../contexts/AppContext";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../shared/components/Icons/Icon";
import Password from "../../../shared/components/Password/Password";

class PassphraseDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.initEventHandlers();
    this.passphraseInputRef = React.createRef();
  }

  initEventHandlers() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  initState() {
    return {
      attempt: 0,
      processing: false,
      passphrase: '',
      rememberMe: false,
      passphraseError: '',
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

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    this.setState({processing: true});

    if (this.state.passphrase === "") {
      this.handlePassphraseError();
      return;
    }

    try {
      await this.props.context.port.request('passbolt.keyring.private.checkpassphrase', this.state.passphrase);
      this.handlePassphraseSuccess();
    } catch (error) {
      this.handlePassphraseError();
    }
  }

  handlePassphraseSuccess() {
    const rememberMeDuration = this.state.rememberMe ? -1 : false;
    this.props.context.port.emit(this.props.requestId, "SUCCESS", {
      passphrase: this.state.passphrase,
      rememberMe: rememberMeDuration
    });
    this.props.onComplete();
  }

  handlePassphraseError() {
    const isPassphraseEmpty = this.state.passphrase === "";
    const errorMessage = isPassphraseEmpty
      ? this.translate("The passphrase should not be empty.")
      : this.translate("This is not a valid passphrase.");

    let attempt = this.state.attempt;
    if (!isPassphraseEmpty) {
      attempt++;
    }

    this.setState({
      processing: false,
      attempt: attempt,
      passphraseError: errorMessage
    });
    if (attempt < 3) {
      // Force the passphrase input focus. The autoFocus attribute only works during the first rendering.
      this.focusOnPassphrase();
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCloseButtonClick() {
    this.props.context.port.emit(this.props.requestId, "ERROR", {name: "UserAbortsOperationError", message: "The dialog has been closed."});
    this.props.onComplete();
  }

  handleKeyDown(event) {
    // Close the dialog when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      // If not stop it will bubble to the QuickAccess component and it will close the quickaccess dialog.
      event.stopPropagation();
      this.props.context.port.emit(this.props.requestId, "ERROR", {name: "UserAbortsOperationError", message: "The dialog has been closed."});
      this.props.onComplete();
    }
  }

  render() {
    return (
      <div className="passphrase" onKeyDown={this.handleKeyDown}>
        <div className="back-link">
          <a className="primary-action">
            <span className="primary-action-title"><Trans>Passphrase required</Trans></span>
          </a>
          <a onClick={this.handleCloseButtonClick} className="secondary-action button-transparent button" title={this.translate("Cancel the operation")}>
            <Icon name="close"/>
            <span className="visually-hidden"><Trans>Cancel</Trans></span>
          </a>
        </div>
        {this.state.attempt < 3 &&
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-container">
              <div className={`input-password-wrapper input required ${this.state.passphraseError ? 'error' : ''}`} >
                <label htmlFor="passphrase"><Trans>Please enter your passphrase</Trans></label>
                <Password name="passphrase" placeholder={this.translate('Passphrase')} id="passphrase" inputRef={this.passphraseInputRef}
                  value={this.state.passphrase} onChange={this.handleInputChange} disabled={this.state.processing}
                  securityToken={this.props.context.userSettings.getSecurityToken()} autoComplete="off"/>
                {this.state.passphraseError &&
                  <div className="error-message">{this.state.passphraseError}</div>
                }
              </div>
              <div className="input checkbox">
                <input type="checkbox" name="rememberMe" id="remember-me" checked={this.state.rememberMe} onChange={this.handleInputChange} disabled={this.state.processing}/>
                <label htmlFor="remember-me"><Trans>Remember until I log out.</Trans></label>
              </div>
            </div>
            <div className="submit-wrapper">
              <button type="submit" className={`button primary big full-width ${this.state.processing ? "processing" : ""}`} role="button"
                disabled={this.state.processing}>
                <Trans>Submit</Trans>
                {this.state.processing &&
                  <Icon name="spinner"/>
                }
              </button>
            </div>
          </form>
        }
        {this.state.attempt === 3 &&
          <div className="passphrase-wrong">
            <div className="too-many-attempts-error">
              <Trans>Your passphrase is wrong!</Trans> <Trans>The operation has been aborted.</Trans>
            </div>
            <div className="submit-wrapper">
              <a className="button primary big full-width" role="button" onClick={this.handleCloseButtonClick}>
                <Trans>Close</Trans>
              </a>
            </div>
          </div>
        }
      </div>
    );
  }
}

PassphraseDialog.propTypes = {
  context: PropTypes.any, // The application context
  className: PropTypes.string,
  requestId: PropTypes.string,
  onComplete: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(PassphraseDialog));
