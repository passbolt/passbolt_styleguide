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
import AppContext from "../../../contexts/AppContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import DisplayUserDetailsInformation from "../DisplayUserDetailsInformation/DisplayUserDetailsInformation";
import DisplayUserDetailsGroups from "../DisplayUserDetailsGroups/DisplayUserDetailsGroups";

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
   * Handle when the user copies the permalink.
   */
  async handlePermalinkClick() {
    // TODO
  }

  /**
   * Handle close sidebar click
   */
  handleCloseClick() {
    this.props.userWorkspaceContext.onDetailsLocked();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="panel aside ready">
        <div className="sidebar resource">
          <div className="sidebar-header">
            <div className="logo">
              <Icon name="key"/>
            </div>
            <h3>
              <div className="title-wrapper">
                <span className="name">{`${this.user.profile.first_name} ${this.user.profile.last_name}`}</span>
                <a className="title-link" title="Copy the link to this user" onClick={this.handlePermalinkClick}>
                  <Icon name="link"/>
                  <span className="visuallyhidden">Copy the link to this user</span>
                </a>
              </div>
              <span className="type">{this.user.username}</span>
            </h3>
            <a className="dialog-close" onClick={this.handleCloseClick}>
              <Icon name="close"/>
              <span className="visuallyhidden">Close</span>
            </a>
          </div>
          <DisplayUserDetailsInformation/>
          {this.user.active && <DisplayUserDetailsGroups/>}
        </div>
      </div>
    );
  }
}

DisplayUserDetails.contextType = AppContext;

DisplayUserDetails.propTypes = {
  actionFeedbackContext: PropTypes.any, // The action feedback context
  userWorkspaceContext: PropTypes.any, // The user workspace context
};

export default withUserWorkspace(withActionFeedback(DisplayUserDetails));
