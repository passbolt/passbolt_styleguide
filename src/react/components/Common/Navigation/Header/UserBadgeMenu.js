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
import UserAvatar from "../../../Common/Avatar/UserAvatar"
import Icon from "../../Icons/Icon";
import AppContext from "../../../../../react-appjs/contexts/AppContext";

class UserBadgeMenu extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  componentDidUpdate() {
    if (this.context.user && this.state.loading === true) {
      this.setState({loading: false})
    }
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      // Whether the menu is opened or not.
      open : false,
      loading: true,

      //  profile menu items list
      menuItems: [
        {
          "id": "profile",
          "name": "Profile",
          "className": "profile row",
          "url": "/app/settings/profile",
        },
        {
          "id": "theme",
          "name": "Theme",
          "className": "theme row",
          "url": "/app/settings/theme",
        },
        {
          "id": "logout",
          "name": "Logout",
          "className": "logout row",
          "url": "/logout",
        },
      ],
    }
  }

  getCurrentUser() {
    return this.context.currentUser || {};
  }
  /**
   * Get current user first name and last name
   * @returns {string}
   */
  getCurrentUserName() {
    if (!this.context.currentUser || !this.context.currentUser.profile) {
      return '...';
    }
    return `${this.context.currentUser.profile.first_name} ${this.context.currentUser.profile.last_name}`;
  }

  /**
   * Get current username
   * @returns {string}
   */
  getCurrentUserUsername() {
    if (!this.context.currentUser || !this.context.currentUser.username) {
      return '...';
    }
    return `${this.context.currentUser.username}`;
  }

  /**
   * Handle click on menu (toggle open state)
   * @param {Event} e
   */
  handleToggleMenuClick(e) {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  }

  /**
   * Handle click on menu event
   * @param {Element} menuItem
   */
  handleMenuItemClick(menuItem) {
    this.props.onClick(menuItem);
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="col3 profile-wrapper">
        <div className="user profile dropdown" onClick={(e) => this.handleToggleMenuClick(e)}>
          <div className="center-cell-wrapper">
            <div className="details center-cell">
              <span className="name">{this.getCurrentUserName()}</span>
              <span className="email">{this.getCurrentUserUsername()}</span>
            </div>
          </div>
          <UserAvatar user={this.getCurrentUser()} className="picture left-cell" />
          <div className="more right-cell">
            <a onClick={(e) => this.handleToggleMenuClick(e)}>
              <Icon name="caret-down" />
              <span>more</span>
            </a>
          </div>
          <ul className={"dropdown-content right" + ' ' + ( this.state.open ? 'visible' : 'hidden' )}>
            {(this.state.menuItems && (this.state.menuItems).map((menuItem) => {
              return this.MenuItem(menuItem);
            }))}
          </ul>
        </div>
      </div>
    );
  }

  MenuItem(menuItem) {
    return (
      <li className={menuItem.className + ' ' + ( this.state.hidden ? 'hidden' : 'visible' )} key={menuItem.id}>
        <div className={menuItem.selected ? "row selected" : "row"}>
          <a href={menuItem.url} role="button" tabIndex="2" onClick={this.handleMenuItemClick.bind(this)}>
            <span>{menuItem.name}</span>
          </a>
        </div>
      </li>
    );
  }
}

UserBadgeMenu.contextType = AppContext;

UserBadgeMenu.propTypes = {
  onClick: PropTypes.func
};

export default UserBadgeMenu;
