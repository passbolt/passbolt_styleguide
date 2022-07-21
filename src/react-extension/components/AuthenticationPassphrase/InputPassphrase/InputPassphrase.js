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
 * @since         2.12.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import UserAbortsOperationError from "../../../lib/Error/UserAbortsOperationError";
import {Trans, withTranslation} from "react-i18next";
import Password from "../../../../shared/components/Password/Password";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import Select from "../../Common/Select/Select";

class InputPassphrase extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createInputRef();
  }

  componentDidMount() {
    this.focusOnPassphrase();
    // Init the default remember me duration based on the remember me options given in options.
    if (this.hasRememberMeOptions()) {
      const rememberMeOptions = this.props.context.siteSettings.getRememberMeOptions();
      const rememberMeDurations = Object.keys(rememberMeOptions);
      const rememberMeDuration = parseInt(rememberMeDurations[0]);
      this.setState({rememberMeDuration: rememberMeDuration});
    }
  }

  getDefaultState() {
    return {
      attempt: 0,
      processing: false,
      passphrase: "",
      rememberMe: false,
      passphraseError: "",
      rememberMeDuration: 300,
    };
  }

  initEventHandlers() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRememberMeDurationSelectChange = this.handleRememberMeDurationSelectChange.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.passphraseInputRef = React.createRef();
  }

  /**
   * Put the focus on the passphrase input
   */
  focusOnPassphrase() {
    this.passphraseInputRef.current.focus();
  }

  /**
   * Close the dialog.
   */
  close() {
    const error = new UserAbortsOperationError("The dialog has been closed.");
    this.props.context.port.emit(this.props.context.passphraseRequestId, "ERROR", error);
    this.props.context.setContext({passphraseRequestId: null});
    this.props.onClose();
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.close();
  }

  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    this.setState({processing: true});
    if (await this.isValidPassphrase()) {
      this.handleValidPassphrase();
    } else {
      this.handleInvalidPassphrase();
    }
  }

  /**
   * Check the passphrase.
   * @return {boolean}
   */
  async isValidPassphrase() {
    try {
      await this.props.context.port.request("passbolt.keyring.private.checkpassphrase", this.state.passphrase);
    } catch (error) {
      return false;
    }
    return true;
  }

  /**
   * Check if remember me options are provided.
   */
  hasRememberMeOptions() {
    const options = this.props.context.siteSettings.getRememberMeOptions();

    return options !== null && Object.keys(options).length > 0;
  }

  /**
   * Handle valid passphrase
   */
  handleValidPassphrase() {
    let rememberMe = false;
    if (this.state.rememberMe && this.hasRememberMeOptions()) {
      rememberMe = this.state.rememberMeDuration;
    }

    this.props.context.port.emit(this.props.context.passphraseRequestId, "SUCCESS", {
      passphrase: this.state.passphrase,
      rememberMe: rememberMe
    });
    this.props.context.setContext({passphraseRequestId: null});
    this.props.onClose();
  }

  /**
   * Handle invalid passphrase.
   */
  handleInvalidPassphrase() {
    const isPassphraseEmpty = this.state.passphrase === "";
    const passphraseError = isPassphraseEmpty
      ? this.translate("The passphrase should not be empty.")
      : this.translate("This is not a valid passphrase.");

    let attempt = this.state.attempt;
    if (!isPassphraseEmpty) {
      attempt++;
    }

    this.setState({
      processing: false,
      attempt: attempt,
      passphraseError: passphraseError
    });
    if (attempt < 3) {
      // Force the passphrase input focus. The autoFocus attribute only works during the first rendering.
      this.focusOnPassphrase();
    }
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /**
   * Handle remember me duration selection change.
   * @params {ReactEvent} The react event
   */
  handleRememberMeDurationSelectChange(event) {
    this.setState({
      rememberMe: true,
      rememberMeDuration: event.target.value
    });
  }


  /**
   * Render the remember me options
   * @returns {*[]}
   */
  renderRememberMeOptions() {
    const selectOptions = [];
    const rememberMeOptions = this.props.context.siteSettings.getRememberMeOptions();

    for (const time in rememberMeOptions) {
      selectOptions.push({value: parseInt(time), label: rememberMeOptions[time]});
    }

    return selectOptions;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    let passphraseInputLabel = this.translate("You need your passphrase to continue.");
    if (this.state.passphraseError) {
      passphraseInputLabel = this.translate("Please enter a valid passphrase.");
    }
    const hasRememberMeOptions = this.hasRememberMeOptions();

    return (
      <DialogWrapper className="passphrase-entry"  title={this.translate("Please enter your passphrase.")} onClose={this.handleCloseClick}>
        {this.state.attempt < 3 &&
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-content">
              <div className={`input-password-wrapper input required ${this.state.passphraseError ? "error" : ""}`}>
                <label htmlFor="passphrase-entry-form-passphrase">{passphraseInputLabel}</label>
                <Password
                  id="passphrase-entry-form-passphrase"
                  name="passphrase"
                  autoComplete="off"
                  placeholder={this.translate("Passphrase")}
                  inputRef={this.passphraseInputRef}
                  value={this.state.passphrase}
                  onChange={this.handleInputChange}
                  disabled={this.state.processing}
                  preview={true}
                  securityToken={this.props.context.userSettings.getSecurityToken()}
                />
              </div>
              {this.state.passphraseError &&
                <div className="error-message">{this.state.passphraseError}</div>
              }
              {hasRememberMeOptions &&
                <div className="remember-me">
                  <div className="input checkbox">
                    <input id="passphrase-entry-form-remember-me" type="checkbox" name="rememberMe"
                      checked={this.state.rememberMe} onChange={this.handleInputChange}/>
                    <label htmlFor="passphrase-entry-form-remember-me"><Trans>Remember it for</Trans> </label>
                  </div>
                  <Select className="inline" name="rememberMeDuration" items={this.renderRememberMeOptions()} value={this.state.rememberMeDuration}
                    onChange={this.handleRememberMeDurationSelectChange}/>
                </div>
              }
            </div>
            <div className="submit-wrapper clearfix">
              <a className="cancel" onClick={this.handleCloseClick}><Trans>Cancel</Trans></a>
              <button type="submit" className="button primary" role="button"><Trans>Ok</Trans></button>
            </div>
          </form>
        }
        {this.state.attempt === 3 &&
          <>
            <div className="form-content">
              <p><Trans>Your passphrase is wrong! The operation has been aborted.</Trans></p>
            </div>
            <div className="submit-wrapper clearfix">
              <a className="button primary" role="button" onClick={this.handleCloseClick}><Trans>Close</Trans></a>
            </div>
          </>
        }
      </DialogWrapper>
    );
  }
}

InputPassphrase.propTypes = {
  context: PropTypes.object, // The application context
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(InputPassphrase));
