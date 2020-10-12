
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

import React from 'react';
import DisplayUsers from "../DisplayUsers/DisplayUsers";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import DisplayUserDetails from "../DisplayUserDetails/DisplayUserDetails";
import DisplayUserWorkspaceActions from "../DisplayUserWorkspaceActions/DisplayUserWorkspaceActions";
import Logo from "../../../../react/components/Common/Navigation/Header/Logo";
import UserBadgeMenu from "../../../../react/components/Common/Navigation/Header/UserBadgeMenu";
import AppContext from "../../../contexts/AppContext";
import DisplayGroups from "../FilterUsersByGroups/FilterUsersByGroup";
import FilterUsersByShortcut from "../FilterUsersByShortcut/FilterUserByShortcut";
import FilterUsersByText from "../FilterUsersByText/FilterUsersByText";
import DisplayUserGroupDetails from "../DisplayUserGroupDetails/DisplayUserGroupDetails";

/**
 * This component is a container for all the user workspace features
 */
class DisplayUserWorkspace extends React.Component {
  /**
   * Returns true if the user details must be displayed
   */
  get mustDisplayUserDetails() {
    const {details} =  this.props.userWorkspaceContext;
    return details.user && details.locked;
  }

  /**
   * Returns true if the group details must be displayed
   */
  get mustDisplayGroupDetails() {
    const {details} =  this.props.userWorkspaceContext;
    return details.group && details.locked;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div>
        <div className="header second">
          <Logo/>
          <FilterUsersByText/>
          <UserBadgeMenu baseUrl={this.context.userSettings.getTrustedDomain()} user={this.context.currentUser}/>
        </div>
        <div className="header third">
          <div className="col1 main-action-wrapper">
            <DisplayUserWorkspaceActions/>
          </div>
          <div className="col2_3 actions-wrapper">

          </div>
        </div>
        <div className="panel main">
          <div className="tabs-content">
            <div className="tab-content selected">
              <div className="reports-workspace">
                <div className="panel left">
                  <FilterUsersByShortcut/>
                  <DisplayGroups/>
                </div>
                <div className="panel middle">
                  <DisplayUsers/>
                  {this.mustDisplayUserDetails && <DisplayUserDetails/>}
                  {this.mustDisplayGroupDetails && <DisplayUserGroupDetails/>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserWorkspace.contextType = AppContext;
DisplayUserWorkspace.propTypes = {
  history: PropTypes.any,
  userWorkspaceContext: PropTypes.any
};

export default withRouter(withUserWorkspace(DisplayUserWorkspace));
