
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
import {Route, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import DisplayUserDetails from "../../UserDetails/DisplayUserDetails/DisplayUserDetails";
import DisplayUserWorkspaceActions from "../DisplayUserWorkspaceActions/DisplayUserWorkspaceActions";
import Logo from "../../Common/Navigation/Header/Logo";
import DisplayUserBadgeMenu from "../DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import DisplayGroups from "../FilterUsersByGroups/FilterUsersByGroup";
import FilterUsersByShortcut from "../FilterUsersByShortcut/FilterUsersByShortcut";
import FilterUsersByText from "../FilterUsersByText/FilterUsersByText";
import DisplayUserGroupDetails from "../../UserGroup/DisplayUserGroupDetails/DisplayUserGroupDetails";
import DisplayUserWorkspaceMainActions from "../DisplayUserWorkspaceMainActions/DisplayUserWorkspaceMainActions";
import FilterUsersByBreadcrumb from "../FilterUsersByBreadcrumb/FilterUsersByBreadcrumb";
import HandleReviewAccountRecoveryRequestRoute from "../HandleReviewAccountRecoveryRequestRoute/HandleReviewAccountRecoveryRequestRoute";

/**
 * This component is a container for all the user workspace features
 */
class DisplayUserWorkspace extends React.Component {
  /**
   * Returns true if the user details must be displayed
   */
  get mustDisplayUserDetails() {
    const {details} = this.props.userWorkspaceContext;
    return details.user && details.locked;
  }

  /**
   * Returns true if the group details must be displayed
   */
  get mustDisplayGroupDetails() {
    const {details} = this.props.userWorkspaceContext;
    return details.group && details.locked;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div>
        {this.props.context.users &&
        <Route path="/app/account-recovery/requests/review/:accountRecoveryRequestId" component={HandleReviewAccountRecoveryRequestRoute}/>
        }
        <div className="header second">
          <Logo/>
          <FilterUsersByText/>
          <DisplayUserBadgeMenu baseUrl={this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
        </div>
        <div className="header third">
          <DisplayUserWorkspaceMainActions/>
          <DisplayUserWorkspaceActions/>
        </div>
        <div className="panel main">
          <div className="panel left">
            <FilterUsersByShortcut/>
            <DisplayGroups/>
          </div>
          <div className="panel middle">
            <FilterUsersByBreadcrumb/>
            <DisplayUsers/>
            {this.mustDisplayUserDetails && <DisplayUserDetails/>}
            {this.mustDisplayGroupDetails && <DisplayUserGroupDetails/>}
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserWorkspace.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.any,
  userWorkspaceContext: PropTypes.any
};

export default withAppContext(withRouter(withUserWorkspace(DisplayUserWorkspace)));
