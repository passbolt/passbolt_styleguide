/**
 * Passbolt ~ Open source PasswordComplexity manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */
import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {SecretGeneratorComplexity} from "../../lib/SecretGenerator/SecretGeneratorComplexity";

const Colors = {
  RED: "hsl(0, 100%, 32%)",
  ORANGE: "hsl(36, 100%, 57%)",
  GREEN: "hsl(115, 100%, 33.5%)",
  LIGHT_RED: "hsl(0, 100%, 85%)",
  LIGHT_ORANGE: "hsl(36, 100%, 85%)",
  LIGHT_GREEN: "hsl(115, 100%, 85%)",
};

/**
 * This component represents a password complexity with the strength and a goal, an entropy and a bar
 */
class PasswordComplexityWithGoal extends React.PureComponent {
  /**
   * Return a percentage value matching the position of the given entropy compared to the full value possible.
   * @param {number} entropyValue
   * @returns {number}
   */
  static getRelativeEntropyPosition(entropyValue) {
    // Power curve with an asymptote at 100%. It will never reach 100% but will get infinitely closer.
    return 100 - (99 / (1 + Math.pow(entropyValue / 90, 10)));
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
   * Get the representative percentage of the current entropy compared to the full available entropy
   * @returns {number}
   */
  get relativeCurrentEntropyRatio() {
    return PasswordComplexityWithGoal.getRelativeEntropyPosition(this.props.entropy);
  }

  /**
   * Get the representative percentage of the targetted entropy compared to the full available entropy
   * @returns {number}
   */
  get relativeTargettedEntropyRatio() {
    return PasswordComplexityWithGoal.getRelativeEntropyPosition(this.props.targettedEntropy);
  }

  /**
   * Get the background style of the complexity bar.
   * The background is a gradient color that varies based on the targetted entropy and the current entropy.
   * The gradient is done in a way that there is a background with light colors and a foreground with "solid" colors.
   *
   * Color of the filled bar is:
   *  - red when entropy < halfTargettedEntropy
   *  - oragnge when entropy >= halfTargettedEntropy && entropy < targettedEntropy
   *  - green when entropy >= targettedEntropy
   *
   * Color of the background color is:
   *  - light red from 0% to targettedEntropy
   *  - light green from targettedEntropy to 100%
   *
   * @return {{background: string}}
   */
  get complexityBarStyle() {
    let colorKeyPoints;
    const isEntropyReached = this.props.entropy >= this.props.targettedEntropy;

    if (isEntropyReached) {
      colorKeyPoints = [
        `${Colors.GREEN} ${this.relativeCurrentEntropyRatio}%`,
        `${Colors.LIGHT_GREEN} ${this.relativeCurrentEntropyRatio}%`,
      ];
    } else {
      const isHalfEntropyReached = this.relativeCurrentEntropyRatio >= (this.relativeTargettedEntropyRatio / 2);
      const barColor = isHalfEntropyReached ? Colors.ORANGE : Colors.RED;

      colorKeyPoints = [
        `${barColor} ${this.relativeCurrentEntropyRatio}%`,
        `${Colors.LIGHT_RED} ${this.relativeCurrentEntropyRatio}%`,
        `${Colors.LIGHT_RED} ${this.relativeTargettedEntropyRatio}%`,
        `${Colors.LIGHT_GREEN} ${this.relativeTargettedEntropyRatio}%`,
      ];
    }
    return {background: `linear-gradient(to right, ${colorKeyPoints.join(', ')})`};
  }

  /**
   * Get the dynamic style of the target entropy cursors.
   * @return {Object}
   */
  get targetEntropyPositionStyle() {
    const leftPosition = this.relativeTargettedEntropyRatio;
    return {left: `${leftPosition}%`};
  }

  /**
   * Get the class to set on the target entropy marker.
   * @returns {'reached' | 'required' | ''}
   */
  get targetEntropyClass() {
    const isEntropyReached = this.props.entropy >= this.props.targettedEntropy;
    if (isEntropyReached) {
      return "reached";
    }

    return this.props.isMinimumEntropyRequired
      ? "required"
      : "";
  }

  /**
   * Has entropy
   * @returns {boolean}
   */
  hasEntropy() {
    return Boolean(this.props.entropy);
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
    const shouldDisplayEntropyLabel = this.hasEntropy() || this.hasError();
    const strength = SecretGeneratorComplexity.strength(this.props.entropy);
    return (
      <div className="password-complexity">
        <span className="complexity-text">
          {shouldDisplayEntropyLabel &&
            <>{strength.label} (<Trans>entropy:</Trans> {this.entropy} bits)</>
          }
          {!shouldDisplayEntropyLabel &&
            <Trans>Quality</Trans>
          }
        </span>
        <span className="progress">
          <span className={`progress-bar ${this.hasError() ? "error" : ""}`} style={this.hasEntropy() ? this.complexityBarStyle : undefined}/>
          <span className={`target-entropy ${this.targetEntropyClass}`} style={this.targetEntropyPositionStyle}/>
        </span>
      </div>
    );
  }
}

PasswordComplexityWithGoal.defaultProps = {
  isMinimumEntropyRequired: true
};

PasswordComplexityWithGoal.propTypes = {
  targettedEntropy: PropTypes.number.isRequired, // the entropy value to reach
  isMinimumEntropyRequired: PropTypes.bool.isRequired, // is the minimum entropy to reach required
  entropy: PropTypes.number, // The entropy
  error: PropTypes.bool, // The error
};

export default withTranslation("common")(PasswordComplexityWithGoal);
