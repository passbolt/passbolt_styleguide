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
import InfoSVG from "../../../img/svg/info.svg";

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
   * Get the representative percentage of the targetted entropy compared to the full available entropy
   * @returns {number}
   */
  get relativeTargetEntropyRatio() {
    return PasswordComplexityWithGoal.getRelativeEntropyPosition(this.props.targetEntropy);
  }

  /**
   * Get the dynamic style of the target entropy cursors.
   * @return {Object}
   */
  get targetEntropyPositionStyle() {
    const leftPosition = this.relativeTargetEntropyRatio;
    const halfArrowCssSize = "0.6rem";
    return {left: `calc(${leftPosition}% - ${halfArrowCssSize})`};
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

  /**
   * Get the translated message for the target tooltip
   * @returns {string}
   */
  get targetTooltipMessage() {
    return this.props.isMinimumEntropyRequired
      ? this.props.t("Minimal requirement")
      : this.props.t("Minimal recommendation");
  }

  /**
   * Get the message for the current entropy tooltip
   * @returns {JSX}
   */
  get currentEntropyTooltipMessage() {
    const currentEntropy = this.formatEntropy(this.props.entropy);
    const targettedEntropy = this.formatEntropy(this.props.targetEntropy);
    return <Trans>Entropy: {{currentEntropy}} / {{targettedEntropy}} bits</Trans>;
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
   * Get the dynamic part style of the entropy progression bar.
   * @param {number} entropy
   * @returns {object}
   */
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
    return (
      <div className="password-complexity with-goal">
        <span className="complexity-text">
          <Tooltip message={this.currentEntropyTooltipMessage}>
            {this.passwordStrengthLabel} <InfoSVG/>
          </Tooltip>
        </span>
        <span className="progress">
          <span className="progress-bar background"/>
          <span className={`progress-bar target ${this.colorClassName}`} style={this.hasEntropy() ? this.getProgresseBarStyle(this.props.targetEntropy) : null}/>
          <span className={`progress-bar foreground ${this.colorClassName}`} style={this.hasEntropy() ? this.getProgresseBarStyle(this.props.entropy) : null}/>
          <span className={`target-entropy ${this.colorClassName}`} style={this.targetEntropyPositionStyle}>
            <Tooltip message={this.targetTooltipMessage}><span className="tooltip-anchor"></span></Tooltip>
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
