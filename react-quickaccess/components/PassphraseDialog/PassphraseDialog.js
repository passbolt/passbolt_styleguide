import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import Password from "../../../shared/components/Password/Password";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import CloseSVG from "../../../img/svg/close.svg";
import {
  PASSKEY_CEREMONY_CREATE,
  PASSKEY_PROMPT_PURPOSE_UNLOCK,
  PASSKEY_PROMPT_PURPOSE_VERIFY,
  PASSKEY_PROMPT_PURPOSE_VERIFY_ORGANISATION,
} from "../../../shared/constants/passkey.const";

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
      passphrase: "",
      rememberMe: false,
      passphraseError: "",
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
    this.setState({ processing: true });

    if (this.state.passphrase === "") {
      this.handlePassphraseError();
      return;
    }

    try {
      await this.props.context.port.request("passbolt.keyring.private.checkpassphrase", this.state.passphrase);
      await this.handlePassphraseSuccess();
    } catch (error) {
      console.error(`Invalid passphrase":`, error);
      this.handlePassphraseError();
    }
  }

  async handlePassphraseSuccess() {
    const rememberMeDuration = this.state.rememberMe ? -1 : false;
    this.props.context.port.emit(this.props.requestId, "SUCCESS", {
      passphrase: this.state.passphrase,
      rememberMe: rememberMeDuration,
    });
    await this.props.onComplete();
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
      passphraseError: errorMessage,
    });
    if (attempt < 3) {
      // Force the passphrase input focus. The autoFocus attribute only works during the first rendering.
      this.focusOnPassphrase();
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleCloseButtonClick() {
    this.props.context.port.emit(this.props.requestId, "ERROR", {
      name: "UserAbortsOperationError",
      message: "The dialog has been closed.",
    });
    this.props.onComplete();
  }

  handleKeyDown(event) {
    // Close the dialog when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      // If not stop it will bubble to the QuickAccess component and it will close the quickaccess dialog.
      event.stopPropagation();
      this.props.context.port.emit(this.props.requestId, "ERROR", {
        name: "UserAbortsOperationError",
        message: "The dialog has been closed.",
      });
      this.props.onComplete();
    }
  }

  /**
   * Can the user use the remember until I logout option
   * @return {boolean}
   */
  get canRememberMe() {
    const options = this.props.context.siteSettings?.getRememberMeOptions();
    return options != null && typeof options[-1] !== "undefined";
  }

  /**
   * Whether the prompt unlocks a passkey for an unlocked-session preference, rather than verifying the user.
   * @returns {boolean}
   */
  get isPasskeyUnlock() {
    return this.props.passkeyPrompt?.purpose === PASSKEY_PROMPT_PURPOSE_UNLOCK;
  }

  /**
   * Whether the passkey prompt is for a registration.
   * @returns {boolean}
   */
  get isPasskeyCreate() {
    return this.props.passkeyPrompt?.ceremony === PASSKEY_CEREMONY_CREATE;
  }

  /**
   * Render the title.
   * @returns {JSX.Element}
   */
  renderTitle() {
    if (!this.props.passkeyPrompt) {
      return <Trans>Passphrase required</Trans>;
    }
    if (this.isPasskeyUnlock) {
      return this.isPasskeyCreate ? (
        <Trans>Unlock Passbolt to save your passkey</Trans>
      ) : (
        <Trans>Unlock your passkey</Trans>
      );
    }
    return this.isPasskeyCreate ? (
      <Trans>Verify your passkey registration</Trans>
    ) : (
      <Trans>Verify your passkey sign-in</Trans>
    );
  }

  /**
   * Render the explanation of a passkey prompt.
   * @returns {JSX.Element}
   */
  renderPasskeyMessages() {
    const rpId = this.props.passkeyPrompt.rpId;
    return (
      <div className="passkey-messages">
        <p>
          <Trans>
            <bdi id="rp-id">{{ rpId }}</bdi> requires user verification as part of the passkey protocol.
          </Trans>
        </p>
        {this.props.passkeyPrompt.purpose === PASSKEY_PROMPT_PURPOSE_VERIFY_ORGANISATION && (
          <p>
            <Trans>Your organisation requires your Passbolt passphrase for this request.</Trans>
          </p>
        )}
        {this.props.passkeyPrompt.purpose === PASSKEY_PROMPT_PURPOSE_VERIFY && (
          <p>
            <Trans>Your passkey setting requires your Passbolt passphrase for this request.</Trans>
          </p>
        )}
        {this.isPasskeyUnlock && (
          <p>
            {this.isPasskeyCreate ? (
              <Trans>
                Your setting allows Passbolt to use an unlocked session. Enter your passphrase to save this passkey and
                continue.
              </Trans>
            ) : (
              <Trans>
                Your setting allows Passbolt to use an unlocked session. Enter your passphrase to unlock this passkey
                and continue.
              </Trans>
            )}
          </p>
        )}
        <p className="hint">
          {this.isPasskeyUnlock ? (
            <Trans>Your Passbolt “remember me” preference stays the same.</Trans>
          ) : (
            <Trans>“Remember me” still applies to your Passbolt session.</Trans>
          )}
        </p>
      </div>
    );
  }

  /**
   * Render the submit button label.
   * @returns {JSX.Element}
   */
  renderSubmitLabel() {
    if (!this.props.passkeyPrompt) {
      return <Trans>Submit</Trans>;
    }
    return this.isPasskeyUnlock ? <Trans>Unlock and continue</Trans> : <Trans>Verify and continue</Trans>;
  }

  render() {
    return (
      <div className="passphrase" onKeyDown={this.handleKeyDown}>
        <div className="back-link">
          <a className="primary-action">
            <span className="primary-action-title">{this.renderTitle()}</span>
          </a>
          <a
            onClick={this.handleCloseButtonClick}
            className="secondary-action button-transparent button"
            title={this.translate("Cancel the operation")}
          >
            <CloseSVG />
            <span className="visually-hidden">
              <Trans>Cancel</Trans>
            </span>
          </a>
        </div>
        {this.state.attempt < 3 && (
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-container">
              {this.props.passkeyPrompt && this.renderPasskeyMessages()}
              <div className={`input-password-wrapper input required ${this.state.passphraseError ? "error" : ""}`}>
                <label htmlFor="passphrase">
                  {this.props.passkeyPrompt ? <Trans>Passphrase</Trans> : <Trans>Please enter your passphrase</Trans>}
                </label>
                <Password
                  name="passphrase"
                  placeholder={this.translate("Passphrase")}
                  id="passphrase"
                  inputRef={this.passphraseInputRef}
                  value={this.state.passphrase}
                  onChange={this.handleInputChange}
                  disabled={this.state.processing}
                  securityToken={this.props.context.userSettings.getSecurityToken()}
                  autoComplete="off"
                />
                {this.state.passphraseError && <div className="error-message">{this.state.passphraseError}</div>}
              </div>
              {/* A passkey prompt never changes what is remembered: without the checkbox it answers rememberMe false. */}
              {!this.props.passkeyPrompt && this.canRememberMe && (
                <div className="input checkbox">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="remember-me"
                    checked={this.state.rememberMe}
                    onChange={this.handleInputChange}
                    disabled={this.state.processing}
                  />
                  <label htmlFor="remember-me">
                    <Trans>Remember until I log out.</Trans>
                  </label>
                </div>
              )}
            </div>
            <div className="submit-wrapper">
              <button
                type="submit"
                className={`button primary big full-width ${this.state.processing ? "processing" : ""}`}
                role="button"
                disabled={this.state.processing}
              >
                {this.renderSubmitLabel()}
                {this.state.processing && <SpinnerSVG />}
              </button>
            </div>
          </form>
        )}
        {this.state.attempt === 3 && (
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
        )}
      </div>
    );
  }
}

PassphraseDialog.propTypes = {
  context: PropTypes.any, // The application context
  className: PropTypes.string,
  requestId: PropTypes.string,
  passkeyPrompt: PropTypes.shape({
    rpId: PropTypes.string,
    purpose: PropTypes.oneOf([
      PASSKEY_PROMPT_PURPOSE_VERIFY,
      PASSKEY_PROMPT_PURPOSE_VERIFY_ORGANISATION,
      PASSKEY_PROMPT_PURPOSE_UNLOCK,
    ]),
    ceremony: PropTypes.string,
  }), // The passkey variant of the prompt, for a request requiring user verification
  onComplete: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation("common")(PassphraseDialog));
