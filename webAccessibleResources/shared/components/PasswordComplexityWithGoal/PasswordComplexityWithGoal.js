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
import Tooltip from "../../../react-extension/components/Common/Tooltip/Tooltip";

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
    return 100 - (99 / (1 + Math.pow(entropyValue / 90, 3)));
  }

  /**
   * Get a formatted entropy value to display.
   * @param {number} entropy
   * @returns {number}
   */
  formatEntropy(entropy) {
    entropy = entropy || 0.0;
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
  get relativeTargetEntropyRatio() {
    return PasswordComplexityWithGoal.getRelativeEntropyPosition(this.props.targetEntropy);
  }

  /**
   * Get the CSS style of the size of the progress-bar
   * @param {number} entropy
   * @return {{width: string}}
   */
  getComplexityBarSize(entropy) {
    const width = entropy
      ? `${this.relativeCurrentEntropyRatio}%`
      : '0';

    return {width};
  }

  /**
   * Get the dynamic style of the target entropy cursors.
   * @return {Object}
   */
  get targetEntropyPositionStyle() {
    const leftPosition = this.relativeTargetEntropyRatio;
    const halfArrowCssSize = "0.6rem";
    return {left: `calc(${leftPosition}% - ${halfArrowCssSize}`};
  }

  /**
   * Get the class to set on the different markers.
   * @returns {'reached' | 'required' | 'recommended' | ''}
   */
  get colorClassName() {
    if (!this.hasEntropy()) {
      return "";
    }

    const isEntropyReached = this.props.entropy >= this.props.targetEntropy;
    if (isEntropyReached) {
      return "reached";
    }

    return this.props.isMinimumEntropyRequired
      ? "required"
      : "recommended";
  }

  get tooltipMessage() {
    return this.props.isMinimumEntropyRequired
      ? this.props.t("Minimal requirement")
      : this.props.t("Minimal recommendation");
  }

  getProgresseBarStyle(entropy) {
    const relativePositionForEntropy = PasswordComplexityWithGoal.getRelativeEntropyPosition(entropy);
    return  {width: `${relativePositionForEntropy}%`};
  }

  /**
   * Has entropy
   * @returns {boolean}
   */
  hasEntropy() {
    return this.props.entropy !== null && typeof this.props.entropy !== "undefined";
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
      <div className="password-complexity with-goal">
        <span className="complexity-text">
          {shouldDisplayEntropyLabel &&
            <>{strength.label} (<Trans>entropy: {this.formatEntropy(this.props.entropy)} / {this.formatEntropy(this.props.targetEntropy)} bits</Trans>)</>
          }
          {!shouldDisplayEntropyLabel &&
            <Trans>Quality</Trans>
          }
        </span>
        <span className="progress">
          <span className="progress-bar background"/>
          <span className={`progress-bar target ${this.props.isMinimumEntropyRequired ? "required" : ""}`} style={this.hasEntropy() ? this.getProgresseBarStyle(this.props.targetEntropy) : null}/>
          <span className={`progress-bar foreground ${this.colorClassName}`} style={this.hasEntropy() ? this.getProgresseBarStyle(this.props.entropy) : null}/>
          <span className={`target-entropy ${this.colorClassName}`} style={this.targetEntropyPositionStyle}>
            <Tooltip message={this.tooltipMessage}><span className="tooltip-anchor"></span></Tooltip>
          </span>
        </span>
      </div>
    );
  }
}

PasswordComplexityWithGoal.defaultProps = {
  isMinimumEntropyRequired: true
};

PasswordComplexityWithGoal.propTypes = {
  targetEntropy: PropTypes.number.isRequired, // the entropy value to reach
  isMinimumEntropyRequired: PropTypes.bool.isRequired, // is the minimum entropy to reach required
  entropy: PropTypes.number, // The entropy
  error: PropTypes.bool, // The error
  t: PropTypes.func, // the translation function
};

export default withTranslation("common")(PasswordComplexityWithGoal);
