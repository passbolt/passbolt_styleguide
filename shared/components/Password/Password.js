/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import EyeOpenSVG from "../../../img/svg/eye_open.svg";
import EyeCloseSVG from "../../../img/svg/eye_close.svg";
import { Trans, withTranslation } from "react-i18next";

/**
 * This component represent a password input field with some additional properties
 */
class Password extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      viewPassword: false, // view password
      hasPassphraseFocus: false, // password input has focus
      isPassphraseActive: false, // password input is active
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordInputFocus = this.handlePasswordInputFocus.bind(this);
    this.handlePasswordInputBlur = this.handlePasswordInputBlur.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this); // Bind here
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  /**
   * Whenever the user focus on the password input
   */
  handlePasswordInputFocus() {
    this.setState({ hasPassphraseFocus: true });
  }

  /**
   * Whenever the user blurs on the password input
   */
  handlePasswordInputBlur() {
    this.setState({ hasPassphraseFocus: false });
  }

  /**
   * Handle view password button click.
   */
  handleViewPasswordButtonClick() {
    if (this.props.disabled) {
      return;
    }
    this.setState({ viewPassword: !this.state.viewPassword });
  }

  /**
   * Returns the style of the security token (color and text color)
   */
  get securityTokenStyle() {
    const inverseStyle = {
      background: this.props.securityToken.textColor,
      color: this.props.securityToken.backgroundColor,
    };
    const fullStyle = {
      background: this.props.securityToken.backgroundColor,
      color: this.props.securityToken.textColor,
    };
    return this.state.hasPassphraseFocus ? inverseStyle : fullStyle;
  }

  /**
   * Get the passphrase input style.
   * @return {Object}
   */
  get passphraseInputStyle() {
    if (!this.state.hasPassphraseFocus) {
      return undefined;
    }

    const { backgroundColor } = this.props.securityToken;
    const textColor = this.getContrastTextColor(backgroundColor);

    return {
      background: backgroundColor,
      color: textColor,
      "--passphrase-placeholder-color": textColor,
    };
  }

  /**
   * Returns the style of preview (icon color and icon background color)
   */
  get previewStyle() {
    if (!this.state.hasPassphraseFocus) {
      return undefined;
    }

    const { backgroundColor } = this.props.securityToken;
    const textColor = this.getContrastTextColor(backgroundColor);
    return {
      "--icon-color": textColor,
      "--icon-background-color": backgroundColor,
    };
  }

  /**
   * Calculate the luminance of a color and return the appropriate text color variable.
   * @param {string} backgroundColor - The background color in hex format.
   * @returns {string} - The CSS variable for text color.
   */
  getContrastTextColor(backgroundColor) {
    // Convert hex color to RGB
    const hex = backgroundColor.replace("#", "");
    const bigint = parseInt(hex, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;

    // Calculate luminance
    const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

    // Return the appropriate CSS variable based on luminance

    return luminance > 0.5 ? "var(--Token-Token-text-and-icon)" : "var(--Token-Token-text-and-icon-reversed)";
  }

  /**
   * Handle the mouse down to set active item
   */
  handleMouseDown() {
    this.setState({ isPassphraseActive: true });
  }

  /**
   * Handle the mouse down to set active item to false
   */
  handleMouseUp() {
    this.setState({ isPassphraseActive: false });
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div
        className={`input password ${this.props.disabled ? "disabled" : ""} ${this.state.hasPassphraseFocus ? "" : "no-focus"} ${this.state.isPassphraseActive ? "active" : ""} ${this.props.securityToken ? "security" : ""}`}
        style={this.props.securityToken ? this.passphraseInputStyle : undefined}
      >
        <input
          id={this.props.id}
          name={this.props.name}
          maxLength="4096"
          placeholder={this.props.placeholder}
          type={this.state.viewPassword && !this.props.disabled ? "text" : "password"}
          onKeyUp={this.props.onKeyUp}
          value={this.props.value}
          onFocus={this.handlePasswordInputFocus}
          onBlur={this.handlePasswordInputBlur}
          onChange={this.handleInputChange}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          autoComplete={this.props.autoComplete}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          aria-required={true}
          ref={this.props.inputRef}
        />
        {this.props.preview && (
          <div className="password-view-wrapper">
            <button
              type="button"
              onClick={this.handleViewPasswordButtonClick}
              style={this.props.securityToken ? this.previewStyle : undefined}
              className={`password-view infield button-transparent ${this.props.disabled ? "disabled" : ""}`}
            >
              {!this.state.viewPassword && <EyeOpenSVG className="svg-icon eye-open" />}
              {this.state.viewPassword && <EyeCloseSVG className="svg-icon eye-close" />}
              <span className="visually-hidden">
                <Trans>View</Trans>
              </span>
            </button>
          </div>
        )}
        {this.props.securityToken && (
          <div className="security-token-wrapper">
            <span className="security-token" style={this.securityTokenStyle}>
              {this.props.securityToken.code}
            </span>
          </div>
        )}
      </div>
    );
  }
}

Password.defaultProps = {
  id: "",
  name: "",
  autoComplete: "off",
};

Password.propTypes = {
  context: PropTypes.any, // The application context
  id: PropTypes.string, // The id of the the input
  name: PropTypes.string, // The name of the the input
  value: PropTypes.string, // The value of the input
  placeholder: PropTypes.string, // Placeholder of the input
  autoComplete: PropTypes.string, // The auto complete of the input
  inputRef: PropTypes.object, // The forwarded ref of the input
  disabled: PropTypes.bool, // Disabled input
  readOnly: PropTypes.bool, // Disabled input
  preview: PropTypes.bool, // Display preview button for the password
  onChange: PropTypes.func, // Function onChange of the input
  onKeyUp: PropTypes.func, // Function onKeyUp of the input
  securityToken: PropTypes.shape({
    code: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
  }), // The securityTokenDto
};

export default withTranslation("common")(Password);
