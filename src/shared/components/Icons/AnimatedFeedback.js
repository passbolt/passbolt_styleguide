/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import AnimatedFeedbackSuccessSVG from "../../../img/svg/success.svg";
import AnimatedFeedbackWarningSVG from "../../../img/svg/warning.svg";
import AnimatedFeedbackAttentionSVG from "../../../img/svg/error-exclamation.svg";
import AnimatedFeedbackErrorSVG from "../../../img/svg/fail.svg";

const animatedIconsSVG = {
  success: <AnimatedFeedbackSuccessSVG/>,
  warning: <AnimatedFeedbackWarningSVG/>,
  attention: <AnimatedFeedbackAttentionSVG/>,
  error: <AnimatedFeedbackErrorSVG/>,
};

class AnimatedFeedback extends Component {
  get animatedIconSVG() {
    return animatedIconsSVG[this.props.name];
  }
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="illustration icon-feedback">
        <div className={this.props.name}>
          {this.animatedIconSVG}
        </div>
      </div>
    );
  }
}

AnimatedFeedback.defaultProps = {};

AnimatedFeedback.propTypes = {
  name: PropTypes.string,
};

export default AnimatedFeedback;
