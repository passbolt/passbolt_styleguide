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

class Menu extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      hidden: this.props.hidden
    }
  }

  handleClick (e, menuItem) {
    e.preventDefault();
    this.props.onClick(menuItem);
  }

  MenuItem(menuItem) {
    return (
      <li className={menuItem.className + ' ' + ( this.state.hidden ? 'hidden' : 'visible' )} key={menuItem.id}>
        <div className={menuItem.selected ? "row selected" : "row"}>
          <div className="main-cell-wrapper">
            <div className="main-cell">
              <a href={menuItem.url} role="button" tabIndex="2" onClick={(e) => this.handleClick(e, menuItem)}>
                <span>{menuItem.name}</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  }

  render() {
    return (
      <ul className={this.props.className}>
        {(this.props.menuItems && (this.props.menuItems).map((menuItem) => {
          return this.MenuItem(menuItem);
        }))}
      </ul>
    );
  }
}

Menu.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  menuItems: PropTypes.array,
  hidden: PropTypes.bool,
};

export default Menu;

