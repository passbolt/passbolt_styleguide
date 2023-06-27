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
 * @since         3.3.0
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * Display of the Tab component
 */
class Tab extends React.Component {
  /**
   * Default constructor
   * @param props Component props
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
   * Handle click
   * @param event
   */
  handleClick() {
    this.props.onClick(this.props.name);
  }

  render() {
    return (
      <li className={`tab ${this.props.isActive ? 'active' : ''}`}>
        <button type="button" className="tab-link"  onClick={this.handleClick}>
          {this.props.name}
        </button>
      </li>
    );
  }
}

Tab.propTypes = {
  name: PropTypes.string, // The tab name as label
  type: PropTypes.string, // The tab type
  isActive: PropTypes.bool, // The current tab is active
  onClick: PropTypes.func, // The click event callback
  children: PropTypes.any // The childrent content of the tab
};

export default Tab;
