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
 * @since         5.12.0
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";

import Password from "../../../../shared/components/Password/Password";
import { PinCodeGenerator, PIN_CODE_LENGTH_CONSTRAINTS } from "../../../../shared/lib/SecretGenerator/PinCodeGenerator";

import DiceSVG from "../../../../img/svg/dice.svg";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

class AddResourcePinCode extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.createReferences();
  }

  get defaultState() {
    return {
      pinCodeLength: PIN_CODE_LENGTH_CONSTRAINTS.DEFAULT,
      displayAdvancedSettings: false,
    };
  }

  bindCallbacks() {
    this.handlePinCodeInputChange = this.handlePinCodeInputChange.bind(this);
    this.handleGeneratePinCode = this.handleGeneratePinCode.bind(this);
    this.handleLengthChange = this.handleLengthChange.bind(this);
    this.toggleDisplayAdvancedSettings = this.toggleDisplayAdvancedSettings.bind(this);
  }

  createReferences() {
    this.pinCodeInputRef = React.createRef();
  }

  // This is useful if the user switches tab while there is an error; the erroring field will be focused when coming back.
  componentDidMount() {
    if (this.props.errors) {
      this.focusFirstFieldError();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const isFirstError = prevProps.errors === null;
    const hasSameError = prevProps.errors === this.props.errors;
    const hasSameResource = prevProps.resource === this.props.resource;
    const hasDisplayAdvancedSettingsChanged = prevState.displayAdvancedSettings !== this.state.displayAdvancedSettings;

    const shouldFocusFirstErrorField =
      isFirstError || (hasSameError && hasSameResource && !hasDisplayAdvancedSettingsChanged);

    if (shouldFocusFirstErrorField) {
      this.focusFirstFieldError();
    }
  }

  /**
   * Handle form input change.
   * @param {ReactEvent} event The react event.
   */
  handlePinCodeInputChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  /**
   * Handle the pin code generation.
   */
  handleGeneratePinCode() {
    const generatedPinCode = PinCodeGenerator.generate(this.state.pinCodeLength);
    this.handlePinCodeInputChange({
      target: {
        name: "secret.pin_code",
        value: generatedPinCode,
      },
    });
  }

  /**
   * Handle the pin code length change.
   * @param {ReactEvent} event The react event.
   */
  handleLengthChange(event) {
    const parsed = Number(event.target.value);

    // Clamp parsed value between min and max pin code lengths
    const pinCodeLength = Math.max(PIN_CODE_LENGTH_CONSTRAINTS.MIN, Math.min(PIN_CODE_LENGTH_CONSTRAINTS.MAX, parsed));

    this.setState(
      { pinCodeLength },
      // Re-generate the pin code after state update
      () => this.handleGeneratePinCode(),
    );
  }

  toggleDisplayAdvancedSettings() {
    this.setState({ displayAdvancedSettings: !this.state.displayAdvancedSettings });
  }

  hasFieldPinCodeError() {
    return Boolean(this.props.errors?.details?.secret?.hasError("pin_code"));
  }

  /**
   * Get the error message for the pin code field, if any.
   */
  get pinCodeErrorMessage() {
    const error = this.props.errors?.details?.secret?.getError("pin_code");
    if (!error) {
      return null;
    }

    if (error.required) {
      return this.translate("The PIN code is required.");
    } else if (error.pattern) {
      return this.translate("The PIN code must only contain digits.");
    } else if (error.minLength) {
      return this.translate("The PIN code must be at least 4 digits.");
    } else if (error.maxLength) {
      return this.translate("The PIN code cannot exceed 12 digits.");
    }

    return null;
  }

  /**
   * Does the pin code length exceeds the max pin code length?
   */
  isMaxLengthError() {
    return this.props.errors?.details?.secret?.hasError("pin_code", "maxLength");
  }

  /**
   * Focus the first erroring field, if any.
   */
  focusFirstFieldError() {
    if (this.hasFieldPinCodeError() && this.pinCodeInputRef.current) {
      this.pinCodeInputRef.current.focus();
    }
  }

  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <>
        <div className="title">
          <h2>
            <Trans>Pin code</Trans>
          </h2>
        </div>
        <div className="content">
          <div className="pin-code-fields">
            <div
              className={`input-password-wrapper input ${this.hasFieldPinCodeError() ? "error" : ""} ${this.props.disabled ? "disabled" : ""}`}
            >
              <label htmlFor="resource-pin-code">
                <Trans>Pin code</Trans>
              </label>
              <div className="password-button-inline">
                <Password
                  id="resource-pin-code"
                  name="secret.pin_code"
                  autoComplete="off"
                  placeholder={this.translate("Pin code")}
                  preview={true}
                  value={this.props.resource?.secret?.pin_code}
                  onChange={this.handlePinCodeInputChange}
                  inputRef={this.pinCodeInputRef}
                  disabled={this.props.disabled}
                />
                <button
                  type="button"
                  disabled={this.props.disabled}
                  className="pin-code-generate button-icon"
                  onClick={this.handleGeneratePinCode}
                >
                  <DiceSVG />
                </button>
              </div>
              {this.hasFieldPinCodeError() && <div className="pin-code error-message">{this.pinCodeErrorMessage}</div>}
            </div>
          </div>
          <div className="additional-information">
            <button type="button" className="section-header no-border" onClick={this.toggleDisplayAdvancedSettings}>
              <h4>
                <Trans>Advanced settings</Trans>
              </h4>
              {this.state.displayAdvancedSettings ? <CaretDownSVG /> : <CaretRightSVG />}
            </button>
            {this.state.displayAdvancedSettings && (
              <div className="advanced-settings">
                <div className={`pin-code-length input text ${this.props.disabled ? "disabled" : ""}`}>
                  <label htmlFor="resource-pin-code-length">
                    <Trans>Length</Trans>
                  </label>
                  <div className="slider">
                    <input
                      name="pin_code_length"
                      type="range"
                      min={PIN_CODE_LENGTH_CONSTRAINTS.MIN}
                      max={PIN_CODE_LENGTH_CONSTRAINTS.MAX}
                      step="1"
                      value={this.state.pinCodeLength}
                      onChange={this.handleLengthChange}
                      disabled={this.props.disabled}
                    />
                    <input
                      id="resource-pin-code-length"
                      type="number"
                      min={PIN_CODE_LENGTH_CONSTRAINTS.MIN}
                      max={PIN_CODE_LENGTH_CONSTRAINTS.MAX}
                      value={this.state.pinCodeLength}
                      onChange={this.handleLengthChange}
                      disabled={this.props.disabled}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

AddResourcePinCode.propTypes = {
  resource: PropTypes.object,
  onChange: PropTypes.func,
  t: PropTypes.func,
  warnings: PropTypes.object,
  errors: PropTypes.object,
  disabled: PropTypes.bool,
};

export default withTranslation("common")(AddResourcePinCode);
