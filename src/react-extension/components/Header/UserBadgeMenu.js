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
import UserAvatar from "../../../react/components/Common/Avatar/UserAvatar";
import Icon from "../../../react/components/Common/Icons/Icon";
import {Link} from "react-router-dom";
import {withAppContext} from "../../contexts/AppContext";

class UserBadgeMenu extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {Object}
   */
  getDefaultState() {
    return {
      open: false,
      loading: true,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleToggleMenuClick = this.handleToggleMenuClick.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  /**
   * Get the user full name
   * @returns {string}
   */
  getUserFullName() {
    if (!this.props.user || !this.props.user.profile) {
      return '...';
    }
    return `${this.props.user.profile.first_name} ${this.props.user.profile.last_name}`;
  }

  /**
   * Get the user username
   * @returns {string}
   */
  getUserUsername() {
    if (!this.props.user || !this.props.user.username) {
      return '...';
    }
    return `${this.props.user.username}`;
  }

  /**
   * Handle click on menu (toggle open state)
   * @param {Event} e
   * @return {void}
   */
  handleToggleMenuClick(e) {
    e.preventDefault();
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Handle click on menu event
   * @return {void}
   */
  handleMenuItemClick() {
    const open = false;
    this.setState({open});
  }

  /**
   * Handle logout click
   * @return {void}
   */
  handleLogoutClick() {
    this.props.context.onLogoutRequested();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="col3 profile-wrapper">
        <div className="user profile dropdown">
          <div onClick={this.handleToggleMenuClick}>
            <div className="center-cell-wrapper">
              <div className="details center-cell">
                <span className="name">{this.getUserFullName()}</span>
                <span className="email">{this.getUserUsername()}</span>
              </div>
            </div>
            <UserAvatar user={this.props.user} className="picture left-cell" baseUrl={this.props.baseUrl}/>
            <div className="more right-cell">
              <a>
                <Icon name="caret-down"/>
                <span>more</span>
              </a>
            </div>
          </div>
          {this.state.open &&
          <ul className="dropdown-content right visible">
            <li key="profile">
              <div className="row">
                <Link to="/app/settings/profile" role="button" tabIndex="1" onClick={this.handleMenuItemClick}>
                  <span>Profile</span>
                </Link>
              </div>
            </li>
            <li key="theme">
              <div className="row">
                <Link to="/app/settings/theme" role="button" tabIndex="2" onClick={this.handleMenuItemClick}>
                  <span>Theme</span>
                </Link>
              </div>
            </li>
            <li key="logout">
              <div className="row">
                <a role="button" tabIndex="3" onClick={this.handleLogoutClick}>
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
          }
        </div>
      </div>
    );
  }
}

UserBadgeMenu.propTypes = {
  context: PropTypes.object, // The application context
  baseUrl: PropTypes.string,
  user: PropTypes.object,
};

export default withAppContext(UserBadgeMenu);
