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
 * @since         2.13.0
 */
import React from "react";
import Icon from "../../Common/Icons/Icon";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import DisplayUserDetailsInformation from "../DisplayUserDetailsInformation/DisplayUserDetailsInformation";
import DisplayUserDetailsGroups from "../DisplayUserDetailsGroups/DisplayUserDetailsGroups";
import DisplayUserDetailsPublicKey from "../DisplayUserDetailsPublicKey/DisplayUserDetailsPublicKey";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {withTranslation} from "react-i18next";

class DisplayUserDetails extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handlePermalinkClick = this.handlePermalinkClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Returns the current user
   */
  get user() {
    return this.props.userWorkspaceContext.details.user;
  }

  /**
   * Returns the base url
   */
  get baseUrl() {
    return this.props.context.userSettings.getTrustedDomain();
  }

  /**
   * Handle when the user copies the permalink.
   */
  async handlePermalinkClick() {
    const baseUrl = this.props.context.userSettings.getTrustedDomain();
    const permalink = `${baseUrl}/app/users/view/${this.user.id}`;
    await this.props.context.port.request("passbolt.clipboard.copy", permalink);
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The permalink has been copied to clipboard"));
  }

  /**
   * Handle close sidebar click
   */
  handleCloseClick() {
    this.props.userWorkspaceContext.onDetailsLocked();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="panel aside ready">
        <div className="sidebar user">
          <div className="sidebar-header">
            <div className="teaser-image">
              <UserAvatar
                user={this.user}
                baseUrl={this.baseUrl}/>
            </div>
            <h3>
              <div className="title-wrapper">
                <span className="name">{`${this.user.profile.first_name} ${this.user.profile.last_name}`}</span>
                <a className="title-link" title={this.translate("Copy the link to this user")} onClick={this.handlePermalinkClick}>
                  <Icon name="link"/>
                  <span className="visuallyhidden">Copy the link to this user</span>
                </a>
              </div>
              <span className="subtitle">{this.user.username}</span>
            </h3>
            <a className="dialog-close" onClick={this.handleCloseClick}>
              <Icon name="close"/>
              <span className="visuallyhidden">Close</span>
            </a>
          </div>
          <DisplayUserDetailsInformation/>
          {this.user.active && <DisplayUserDetailsGroups/>}
          {this.user.active && <DisplayUserDetailsPublicKey/>}
        </div>
      </div>
    );
  }
}

DisplayUserDetails.propTypes = {
  context: PropTypes.any, // The application context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  userWorkspaceContext: PropTypes.any, // The user workspace context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withUserWorkspace(withActionFeedback(withTranslation('common')(DisplayUserDetails))));
