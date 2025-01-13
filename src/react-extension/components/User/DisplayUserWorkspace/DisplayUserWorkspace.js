
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
import DisplayHttpError from '../../Common/Error/DisplayHttpError/DisplayHttpError';

/**
 * This component is a container for all the user workspace features
 */
class DisplayUserWorkspace extends React.Component {
  /**
   * Returns true if the user details must be displayed
   * @returns {boolean}
   */
  get mustDisplayUserDetails() {
    const {details} = this.props.userWorkspaceContext;
    return details.user && details.locked;
  }

  /**
   * Returns true if the group details must be displayed
   * @returns {boolean}
   */
  get mustDisplayGroupDetails() {
    const {details} = this.props.userWorkspaceContext;
    return details.group && details.locked;
  }

  /**
   * Returns true if current user is allowed to access the user workspace
   * @returns {boolean}
   */
  get isAccessAllowed() {
    return this.props.userWorkspaceContext.isAccessAllowed();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <>
        {this.props.context.users &&
        <Route path="/app/account-recovery/requests/review/:accountRecoveryRequestId" component={HandleReviewAccountRecoveryRequestRoute}/>
        }
        <div className="panel main">
          {this.isAccessAllowed ? (
            <>
              <div className="panel left">
                <div className="sidebar-content">
                  <Logo/>
                  <DisplayUserWorkspaceMainActions/>
                  <div className="sidebar-content-left">
                    <FilterUsersByShortcut/>
                    <DisplayGroups/>
                  </div>
                </div>
              </div>
              <div className="panel middle">
                <div className="header">
                  <div className="header-left">
                    <FilterUsersByText/>
                  </div>
                  <div className="header-right">
                    <DisplayUserBadgeMenu baseUrl={this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
                  </div>
                </div>
                <div className="middle-right">
                  <div className="breadcrumbs-and-grid">
                    <div className="top-bar">
                      <FilterUsersByBreadcrumb/>
                      <div className="action-bar">
                        <DisplayUserWorkspaceActions/>
                      </div>
                    </div>
                    <DisplayUsers/>
                  </div>
                  {this.mustDisplayUserDetails && <DisplayUserDetails/>}
                  {this.mustDisplayGroupDetails && <DisplayUserGroupDetails/>}
                </div>
              </div>
            </>
          ) : (
            <DisplayHttpError errorCode={403}/>
          )}
        </div>
      </>
    );
  }
}

DisplayUserWorkspace.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.any,
  userWorkspaceContext: PropTypes.any
};

export default withAppContext(withRouter(withUserWorkspace(DisplayUserWorkspace)));
