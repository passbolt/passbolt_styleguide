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
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import DisplayUserGroupDetailsInformation
  from "../DisplayUserGroupDetailsInformation/DisplayUserGroupDetailsInformation";
import GroupAvatar from "../../Common/Avatar/GroupAvatar";

/**
 * This component displays the details of a users group
 */
class DisplayUserGroupDetails extends React.Component {
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
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Returns the current user
   */
  get group() {
    return this.props.userWorkspaceContext.details.group;
  }

  /**
   * Returns the base url
   */
  get baseUrl() {
    return this.context.userSettings.getTrustedDomain();
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
        <div className="sidebar group">
          <div className="sidebar-header">
            <div className="logo">
              <GroupAvatar
                group={this.group}
                baseUrl={this.baseUrl}/>
            </div>
            <h3>
              <span className="name sidebar-header-title">{this.group.name}</span>
              <span className="type">group</span>
            </h3>
            <a className="dialog-close" onClick={this.handleCloseClick}>
              <Icon name="close"/>
              <span className="visuallyhidden">Close</span>
            </a>
          </div>
        </div>
        <DisplayUserGroupDetailsInformation/>
      </div>
    );
  }
}

DisplayUserGroupDetails.contextType = AppContext;

DisplayUserGroupDetails.propTypes = {
  userWorkspaceContext: PropTypes.any, // The user workspace context
};

export default withUserWorkspace(DisplayUserGroupDetails);
