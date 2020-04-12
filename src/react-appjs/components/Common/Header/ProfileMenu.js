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
import UserAvatar from "../../Common/UserAvatar/UserAvatar"

import AppContext from "../../../contexts/AppContext";

class ProfileMenu extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.Profile = this.Profile.bind(this);
  }

  componentDidUpdate() {
    this.handleLoadingState();
  }

  handleLoadingState() {
    if (Object.getOwnPropertyNames(this.context.currentUser).length !== 0 && this.state.loading === true) {
      this.setState({loading: false, user: this.context.currentUser})
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

      user: {},

      appContext: this.context,


      //  profile menu items list
      menuItems: [
        {
          "id": "profile",
          "name": "Profile",
          "className": "profile row",
          "url": "demo/legacy/LU_users_profile",
        },
        {
          "id": "theme",
          "name": "Theme",
          "className": "theme row",
          "url": "demo/legacy/LU_users_profile",
        },
        {
          "id": "logout",
          "name": "Logout",
          "className": "logout row",
          "url": "demo/legacy/LU_users_profile",
        },
      ],
    }
  }

  UserCard() {
    if (this.state.loading) {
      return (
        <div>
          <div className="center-cell-wrapper">
            <div className="details center-cell">
              <span className="name">...</span>
              <span className="email">...</span>
            </div>
          </div>
          <div className="picture left-cell">
            <img src="img/avatar/user.png" alt="your picture"/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="center-cell-wrapper">
            <div className="details center-cell">
              <span className="name">{this.state.user.profile.first_name} {this.state.user.profile.last_name}</span>
              <span className="email">{this.state.user.username}</span>
            </div>
          </div>
          <UserAvatar user={this.state.user} className="picture left-cell" />
        </div>
      );
    }
  }

  MoreIcon() {
    return(
      <div className="more right-cell">
        <a onClick={(e) => this.handleToggleMenuClick(e)}>
          <span className="svg-icon caret-down">
            <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
            </svg>
          </span>
          <span>more</span>
        </a>
      </div>
    );
  }

  MenuItem(menuItem) {
    return (
      <li className={menuItem.className + ' ' + ( this.state.hidden ? 'hidden' : 'visible' )} key={menuItem.id}>
        <div className={menuItem.selected ? "row selected" : "row"}>
          <div className="main-cell-wrapper">
            <div className="main-cell">
              <a href={menuItem.url} role="button" tabIndex="2" onClick={this.handleMenuItemClick.bind(this)}>
                <span>{menuItem.name}</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  }

  handleToggleMenuClick(e) {
    e.preventDefault();
    this.setState({ open: this.state.open ? false : true });
  }

  handleMenuItemClick(menuItem) {
    this.props.onClick(menuItem);
    this.setState({ open: false });
  }

  Profile() {
    return (
      <div className="user profile dropdown" onClick={(e) => this.handleToggleMenuClick(e)}>
        {this.UserCard()}
        {this.MoreIcon()}
        <ul className={"dropdown-content right" + ' ' + ( this.state.open ? 'visible' : 'hidden' )}>
          {(this.state.menuItems && (this.state.menuItems).map((menuItem) => {
            return this.MenuItem(menuItem);
          }))}
        </ul>
      </div>
    );
  }

  render() {
    return (
        <div className="col3 profile-wrapper">
            <this.Profile />
        </div>
    );
  }
}

ProfileMenu.contextType = AppContext;
ProfileMenu.propTypes = {
  onClick: PropTypes.func
};

export default ProfileMenu;

