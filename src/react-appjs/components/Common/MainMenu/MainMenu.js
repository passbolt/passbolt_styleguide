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
import Menu from "../Menu/Menu";

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
      logoutItem: {
        "id": "logout",
        "name": "Logout",
        "className": "logout",
        "url": "/logout",
      },
    }
  }

  render() {
    return (
      <nav>
        <div className="primary navigation top">
          <Menu className="left" menuItems={this.state.menuItems} onClick={this.props.onClick} />
          <Menu className="right" menuItems={[this.state.logoutItem]}/>
        </div>
      </nav>
    );
  }
}

MainMenu.propTypes = {
  onClick: PropTypes.func
};

export default MainMenu;

