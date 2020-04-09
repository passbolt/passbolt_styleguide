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

class MainMenu extends Component {
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
      // Used for keyboard navigation.
      // Each new menu item displayed will increment it by 1.
      tabIndex: 1,
      // menu items list
      menuItems: [
        {
          "id": "passwords",
          "name": "Passwords",
          "className": "passwords",
          "url": "/test/test1.html",
        },
        {
          "id": "users",
          "name": "Users",
          "className": "users",
          "url": "/test/test1.html",
        },
        {
          "id": "reports",
          "name": "Reports",
          "className": "reports",
          "url": "/test/test1.html",
          "selected": true
        },
        {
          "id": "administration",
          "name": "Administration",
          "className": "administration",
          "url": "/test/test1.html",
        },
        {
          "id": "help",
          "name": "Help",
          "className": "administration",
          "url": "/test/test1.html",
        },
      ],

      // logoutItem
      logoutItem: {
        "id": "logout",
        "name": "Logout",
        "className": "logout",
        "url": "/logout",
      },
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
              <a href={menuItem.url} role="button" tabIndex={this.state.tabIndex++} onClick={(e) => this.handleClick(e, menuItem)}>
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
      <nav>
        <div className="primary navigation top">
          <ul className="left">
            {(this.state.menuItems && (this.state.menuItems).map((menuItem) => {
              return this.MenuItem(menuItem);
            }))}
          </ul>
          <ul className="right">
            {this.MenuItem(this.state.logoutItem)}
          </ul>
        </div>
      </nav>
    );
  }
}

MainMenu.propTypes = {
  onClick: PropTypes.func
};

export default MainMenu;

