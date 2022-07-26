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

/**
 * This component represents a password complexity with the strength, an entropy and a bar
 */
class PasswordComplexity extends Component {
  /**
   * Get the rgb color at a specific position in percentage
   * @param {number} fadeFraction The fade fraction
   * @param {string} color1 The first color in hexadecimal
   * @param {string} color2 The second color in hexadecimal
   * @param {string} color3 The third color in hexadecimal
   * @returns {string} the color in rgb(0,0,0)
   */
  colorGradient(fadeFraction, color1, color2, color3) {
    let rgbColor1, rgbColor2;
    let fade = fadeFraction / 100 * 2;

    // Find which interval to use and adjust the fade percentage
    if (fade >= 1) {
      fade -= 1;
      rgbColor1 = this.hexToRgb(color2);
      rgbColor2 = this.hexToRgb(color3);
    } else {
      rgbColor1 = this.hexToRgb(color1);
      rgbColor2 = this.hexToRgb(color2);
    }

    const red = Math.floor(rgbColor1.red + (rgbColor2.red - rgbColor1.red) * fade);
    const green = Math.floor(rgbColor1.green + (rgbColor2.green - rgbColor1.green) * fade);
    const blue = Math.floor(rgbColor1.blue + (rgbColor2.blue - rgbColor1.blue) * fade);

    return `rgb(${red},${green},${blue})`;
  }

  /**
   * Hex color to rgb color object
   * @param hex
   * @returns {null|{red: number, green: number, blue: number}}
   */
  hexToRgb(hex) {
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
   * Get the complexity bar style.
   * @return {Object}
   */
  get complexityBarStyle() {
    // Power curve with an asymptote at 100%. It will never reach 100% but will get infinitely closer.
    const fade = (100 - (99 / (1 + Math.pow(this.props.entropy / 90, 10))));
    return {background: `linear-gradient(to right, ${this.colorGradient(fade, "#A40000", "#FFA724", "#0EAA00")} ${fade}%, var(--complexity-bar-background-default) ${fade}%`};
  }

  /**
   * Get the entropy value to display.
   * @returns {Number}
   */
  get entropy() {
    const entropy = this.props.entropy || 0.0;
    return entropy.toFixed(1);
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
   * Render the component
   * @return {JSX}
   */
  render() {
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
    return (
      <div className="password-complexity">
        <span className="complexity-text">
          {(this.hasEntropy() || this.hasError()) &&
            <>{strength.label} (<Trans>entropy:</Trans> {this.entropy} bits)</>
          }
          {!this.hasEntropy() && !this.hasError() &&
            <Trans>Quality</Trans>
          }
        </span>
        <span className="progress">
          <span className={`progress-bar ${this.hasError() ? "error" : ""}`} style={this.hasEntropy() ? this.complexityBarStyle : undefined}/>
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
