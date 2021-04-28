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
 * @since         3.2.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";

class AnimatedFeedback extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="illustration icon-feedback">
        {this.props.name === 'success' &&
        <svg id="icon-feedback-success" className="animated" xmlns="http://www.w3.org/2000/svg" width="170" height="170" viewBox="0 0 70 70">
          <circle className="success-animation-circle" cx="35" cy="35" r="24" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="transparent"/>
          <polyline className="success-animation-line" stroke="#000" strokeWidth="3" points="23 34 34 43 47 27" linecap="round" fill="transparent"/>
        </svg>
        }
        {this.props.name === 'warning' &&
        <svg id="icon-feedback-warning" className="animated"  width="160" height="160" xmlns="http://www.w3.org/2000/svg" viewBox="-16 -16 100 100">
          <g transform="translate(1.285714 1.857143)" fill="none" fillRule="evenodd">
            <path className="warning-animation-line" d="M.71428571 70.1428571H70.7142857c-23.3333333-46.6666666-35-69.99999996-35-69.99999996L.71428571 70.1428571z" stroke="#000" strokeWidth="4" strokeLinejoin="round"/>
            <path className="warning-animation-line" stroke="#000" strokeWidth="5" fill="#000" fillRule="nonzero" strokeLinecap="round" d="M36.3214286 28.2244898v19.4285714"/>
            <circle className="warning-animation-circle" fill="#000" cx="36.2142857" cy="57.6428571" r="3.5"/>
          </g>
        </svg>
        }
        {this.props.name === 'error' &&
        <svg id="icon-feedback-error" className="animated" xmlns="http://www.w3.org/2000/svg" width="170" height="170" viewBox="0 0 70 70">
          <circle className="error-animation-circle" cx="35" cy="35" r="24" stroke="#000000" strokeWidth="3" strokeLinecap="round" fill="transparent"/>
          <polyline className="error-animation-line" stroke="#000" strokeWidth="3" points="26 26 44 44" linecap="round" fill="transparent"/>
          <polyline className="error-animation-line" stroke="#000" strokeWidth="3" points="44 26 26 44" linecap="round" fill="transparent"/>
        </svg>
        }
      </div>
    );
  }
}

AnimatedFeedback.defaultProps = {};

AnimatedFeedback.propTypes = {
  name: PropTypes.string,
};

export default AnimatedFeedback;
