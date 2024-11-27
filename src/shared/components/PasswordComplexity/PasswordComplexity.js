/**
 * Passbolt ~ Open source PasswordComplexity manager for teams
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
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {SecretGeneratorComplexity} from "../../lib/SecretGenerator/SecretGeneratorComplexity";
import Tooltip from "../../../react-extension/components/Common/Tooltip/Tooltip";
import Icon from "../Icons/Icon";

const COLOR_GRADIENT = {
  COLOR_1: hexToRgb("#BA2809"),
  COLOR_2: hexToRgb("#FFA724"),
  COLOR_3: hexToRgb("#0EAA00"),
};

/**
 * Hex color to rgb color object
 * @param hex
 * @returns {null|{red: number, green: number, blue: number}}
 */
function hexToRgb(hex) {
  const hexRegex = new RegExp("^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$", "i");
  const result = hexRegex.exec(hex.trim());
  if (result) {
    const red = parseInt(result[1], 16);
    const green = parseInt(result[2], 16);
    const blue = parseInt(result[3], 16);
    return {red, green, blue};
  }
  return null;
}

/**
 * This component represents a password complexity with the strength, an entropy and a bar
 */
class PasswordComplexity extends Component {
  /**
   * Get the entropy value formatted for display.
   * @returns {number}
   */
  get entropy() {
    const entropy = this.props.entropy || 0.0;
    return entropy.toFixed(1);
  }

  /**
   * Get the translated tooltip message.
   * @returns {JSX}
   */
  get tooltipMessage() {
    return (<>
      <Trans>Entropy:</Trans> {this.entropy} bits
    </>);
  }

  /**
   * Get the password strength label to display based on the actual entropy or error state.
   * @returns {JSX};
   */
  get passwordStrengthLabel() {
    const shouldDisplayEntropyLabel = this.hasEntropy() || this.hasError();
    if (!shouldDisplayEntropyLabel) {
      return (<Trans>Quality</Trans>);
    }

    /*
     * The parser can't find the translation for passwordStrength.label
     * To fix that we can use it in comment
     * this.translate("n/a")
     * this.translate("Very weak")
     * this.translate("Weak")
     * this.translate("Fair")
     * this.translate("Strong")
     * this.translate("Very strong")
     */
    const strength = SecretGeneratorComplexity.strength(this.props.entropy);
    return (<>{strength.label}</>);
  }

  /**
   * Has entropy
   * @returns {boolean}
   */
  hasEntropy() {
    return this.props.entropy !== null
      && typeof this.props.entropy !== "undefined";
  }

  /**
   * Has error
   * @returns {boolean}
   */
  hasError() {
    return this.props.error;
  }

  /**
   * Get the dynamic part style of the entropy progression bar.
   * @returns {object}
   */
  getProgresseBarStyle() {
    const relativePositionForEntropy = this.getRelativeEntropyPosition();
    return {width: `${relativePositionForEntropy}%`, backgroundColor: this.colorGradient(relativePositionForEntropy)};
  }

  /**
   * Get the rgb color at a specific position in percentage
   * @param {number} fadeFraction The fade fraction
   * @returns {string} the color in rgb(0,0,0)
   */
  colorGradient(fadeFraction) {
    let rgbColor1, rgbColor2;
    let fade = fadeFraction / 100 * 2;

    // Find which interval to use and adjust the fade percentage
    if (fade >= 1) {
      fade -= 1;
      rgbColor1 = COLOR_GRADIENT.COLOR_2;
      rgbColor2 = COLOR_GRADIENT.COLOR_3;
    } else {
      rgbColor1 = COLOR_GRADIENT.COLOR_1;
      rgbColor2 = COLOR_GRADIENT.COLOR_2;
    }

    const red = Math.floor(rgbColor1.red + (rgbColor2.red - rgbColor1.red) * fade);
    const green = Math.floor(rgbColor1.green + (rgbColor2.green - rgbColor1.green) * fade);
    const blue = Math.floor(rgbColor1.blue + (rgbColor2.blue - rgbColor1.blue) * fade);

    return `rgb(${red},${green},${blue})`;
  }

  /**
   * Return a percentage value matching the position of the given entropy compared to the full value possible.
   * @returns {number}
   */
  getRelativeEntropyPosition() {
    // Power curve with an asymptote at 100%. It will never reach 100% but will get infinitely closer.
    return (100 - (99 / (1 + Math.pow(this.props.entropy / 90, 10))));
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="password-complexity">
        <span className="complexity-text">
          <Tooltip message={this.tooltipMessage}>
            {this.passwordStrengthLabel} <Icon name="info-circle"/>
          </Tooltip>
        </span>
        <span className="progress">
          <span className="progress-bar background"/>
          <span className={`progress-bar foreground ${this.hasError() ? "error" : ""}`} style={this.hasEntropy() ? this.getProgresseBarStyle(this.props.entropy) : null}/>
        </span>
      </div>
    );
  }
}

PasswordComplexity.defaultProps = {
  entropy: null
};

PasswordComplexity.propTypes = {
  entropy: PropTypes.number, // The entropy
  error: PropTypes.bool, // The error
};

export default withTranslation("common")(PasswordComplexity);
