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
 * @since         5.0.0
 */

import React from "react";
import PropTypes from "prop-types";


/**
 * This component acts as a dropdown item.
 */
class DropdownItem extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.bindCallback();
  }

  /**
   * Bind class methods callback
   */
  bindCallback() {
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handle click item
   */
  handleClick() {
    if (this.props.keepOpenOnClick) {
      return;
    }
    this.props.onClose();
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <li onClick={this.handleClick} className={`${this.props.separator ? "separator-after" : ""}`}>
        <div className="row">
          <div className="main-cell-wrapper">
            <div className="main-cell">
              {this.props.children}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

DropdownItem.defaultProps = {
  keepOpenOnClick: false,
};

DropdownItem.propTypes = {
  onClose: PropTypes.func,
  separator: PropTypes.bool,
  keepOpenOnClick: PropTypes.bool,
  children: PropTypes.any
};

export default DropdownItem;
