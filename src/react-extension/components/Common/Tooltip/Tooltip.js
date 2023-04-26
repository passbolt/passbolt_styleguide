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
import React, {Component} from "react";
import PropTypes from "prop-types";

class Tooltip extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="tooltip" tabIndex="0">
        {this.props.children}
        <span className={`tooltip-text ${this.props.direction}`}>
          {this.props.message}
        </span>
      </div>
    );
  }
}


Tooltip.defaultProps = {
  direction: 'right'
};

Tooltip.propTypes = {
  children: PropTypes.any,
  message: PropTypes.any.isRequired,
  direction: PropTypes.string
};

export default Tooltip;
