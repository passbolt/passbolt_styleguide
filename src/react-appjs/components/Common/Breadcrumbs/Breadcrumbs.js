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
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  Link,
} from "react-router-dom";

class Breadcrumbs extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();

    this.itemNumber = 0;
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {

    }
  }

  Item(item) {
    return (
      <li key={this.itemNumber++}>
        <div className="main-cell">
          {item}
        </div>
      </li>
      );
  }

  render() {
    return (
      <div className="breadcrumbs">
        <ul className="menu">
          {(this.props.items && (this.props.items).map((item) => {
            return this.Item(item);
          }))}
        </ul>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  items: PropTypes.array,
};


export default Breadcrumbs;

