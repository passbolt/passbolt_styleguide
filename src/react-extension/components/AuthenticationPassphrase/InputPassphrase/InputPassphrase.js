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
import Icon from "../../Common/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";

class InputPassphrase extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createInputRef();
  }

  componentDidMount() {
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
      rememberMeDuration: 0,
      passphraseInputHasFocus: true,
      isObfuscated: true, // True if the passphrase should not be visible
    };
  }

  initEventHandlers() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRememberMeDurationSelectChange = this.handleRememberMeDurationSelectChange.bind(this);
    this.handlePassphraseInputFocus = this.handlePassphraseInputFocus.bind(this);
    this.handlePassphraseInputBlur = this.handlePassphraseInputBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleToggleObfuscate = this.handleToggleObfuscate.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.passphraseInputRef = React.createRef();
    this.rememberMeDurationSelectRef = React.createRef();
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
   * Handle key down on the component.
   * @params {ReactEvent} The react event
   */
  handleKeyDown(event) {
    // Close the dialog when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      event.stopPropagation();
      this.close();
    }
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
    const attempt = this.state.attempt + 1;
    this.setState({
      processing: false,
      attempt: attempt,
      passphraseError: this.translate("This is not a valid passphrase.")
    });
    if (attempt < 3) {
      // Force the passphrase input focus. The autoFocus attribute only works during the first rendering.
      this.passphraseInputRef.current.focus();
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
      rememberMeDuration: parseInt(event.target.value)
    });
  }

  /**
   * Handle passphrase input focus.
   */
  handlePassphraseInputFocus() {
    const passphraseInputHasFocus = true;
    this.setState({passphraseInputHasFocus: passphraseInputHasFocus});
  }

  /**
   * Handle passphrase input blur.
   */
  handlePassphraseInputBlur() {
    const passphraseInputHasFocus = false;
    this.setState({passphraseInputHasFocus: passphraseInputHasFocus});
  }

  /**
   * Get the passphrase input style.
   * @return {Object}
   */
  getPassphraseInputStyle() {
    if (this.state.passphraseInputHasFocus) {
      const backgroundColor = this.props.context.userSettings.getSecurityTokenBackgroundColor();
      const textColor = this.props.context.userSettings.getSecurityTokenTextColor();

      return {
        background: backgroundColor,
        color: textColor
      };
    }

    return {
      background: "",
      color: "",
    };
  }

  /**
   * Get the security token style.
   * @return {Object}
   */
  getSecurityTokenStyle() {
    const backgroundColor = this.props.context.userSettings.getSecurityTokenBackgroundColor();
    const textColor = this.props.context.userSettings.getSecurityTokenTextColor();

    if (this.state.passphraseInputHasFocus) {
      return {
        background: textColor,
        color: backgroundColor,
      };
    }

    return {
      background: backgroundColor,
      color: textColor,
    };
  }

  /**
   * Whenever one wants to toggle the obfusctated mode
   */
  handleToggleObfuscate() {
    this.toggleObfuscate();
  }

  /**
   * Toggle the obfuscate mode of the passphrase view
   */
  toggleObfuscate() {
    this.setState({isObfuscated: !this.state.isObfuscated});
  }

  /**
   * Render the remember me options
   * @return {array<JSX>}
   */
  renderRememberMeOptions() {
    const selectOptions = [];
    const rememberMeOptions = this.props.context.siteSettings.getRememberMeOptions();

    for (const time in rememberMeOptions) {
      selectOptions.push(<option value={time} key={time}>{rememberMeOptions[time]}</option>);
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
    const passphraseStyle = this.getPassphraseInputStyle();
    const securityTokenStyle = this.getSecurityTokenStyle();
    const securityTokenCode = this.props.context.userSettings.getSecurityTokenCode();
    let passphraseInputLabel = this.translate("You need your passphrase to continue.");
    if (this.state.passphraseError) {
      passphraseInputLabel = this.translate("Please enter a valid passphrase.");
    }
    const hasRememberMeOptions = this.hasRememberMeOptions();

    return (
      <div className="dialog-wrapper" onKeyDown={this.handleKeyDown}>
        <div className="dialog passphrase-entry">
          <div className="dialog-header">
            <h2><Trans>Please enter your passphrase.</Trans></h2>
            <a className="dialog-close" onClick={this.handleCloseClick}>
              <Icon name="close"/>
              <span className="visually-hidden">cancel</span>
            </a>
          </div>
          {this.state.attempt < 3 &&
          <div className="dialog-content">
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-content">
                <div className={`input text password required ${this.state.passphraseError ? "error" : ""}`}>
                  <label htmlFor="passphrase-entry-form-passphrase">{passphraseInputLabel}</label>
                  <input
                    id="passphrase-entry-form-passphrase"
                    type={this.state.isObfuscated ? "password" : "text"}
                    name="passphrase"
                    placeholder={this.translate("Passphrase")}
                    required="required" ref={this.passphraseInputRef}
                    className={`required ${this.state.passphraseError ? "error" : ""}`}
                    value={this.state.passphrase}
                    autoFocus={true}
                    onFocus={this.handlePassphraseInputFocus}
                    onBlur={this.handlePassphraseInputBlur}
                    onChange={this.handleInputChange}
                    disabled={this.state.processing}
                    style={passphraseStyle}
                  />
                  <a
                    className={`password-view button-icon button button-toggle ${this.state.isObfuscated ? "" : "selected"}`}
                    role="button"
                    onClick={this.handleToggleObfuscate}>
                    <Icon name="eye-open"/>
                    <span className="visually-hidden">view</span>
                  </a>
                  <div className="security-token"
                    style={securityTokenStyle}>{securityTokenCode}
                  </div>

                </div>
                {this.state.passphraseError &&
                <div className="input text">
                  <div className="error-message">{this.state.passphraseError}</div>
                </div>
                }
                {hasRememberMeOptions &&
                <div>
                  <div className="input checkbox">
                    <input id="passphrase-entry-form-remember-me" type="checkbox" name="rememberMe"
                      checked={this.state.rememberMe} onChange={this.handleInputChange}/>
                    <label htmlFor="passphrase-entry-form-remember-me"><Trans>Remember it for</Trans> </label>
                  </div>
                  <div className="input select">
                    <select name="rememberMeDuration" value={this.state.rememberMeDuration}
                      onChange={this.handleRememberMeDurationSelectChange}
                      ref={this.rememberMeDurationSelectRef}>
                      {this.renderRememberMeOptions()}
                    </select>
                  </div>
                </div>
                }
              </div>
              <div className="submit-wrapper clearfix">
                <input type="submit" className="button primary" role="button" value={this.translate("OK")}/>
                <a className="cancel" onClick={this.handleCloseClick}><Trans>Cancel</Trans></a>
              </div>
            </form>
          </div>
          }
          {this.state.attempt === 3 &&
          <div className="dialog-content">
            <div className="form-content">
              <Trans>Your passphrase is wrong! The operation has been aborted.</Trans>
            </div>
            <div className="submit-wrapper clearfix">
              <a className="button primary" role="button" onClick={this.handleCloseClick}><Trans>Close</Trans></a>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}

InputPassphrase.propTypes = {
  context: PropTypes.object, // The application context
  onClose: PropTypes.func,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(InputPassphrase));
