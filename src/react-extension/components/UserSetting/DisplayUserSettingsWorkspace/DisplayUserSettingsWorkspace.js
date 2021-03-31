
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
import {Route, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../Common/Navigation/Header/Logo";
import UserBadgeMenu from "../../Header/UserBadgeMenu";
import AppContext from "../../../contexts/AppContext";
import NavigateIntoUserSettingsWorkspace from "../NavigateIntooUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace";
import DisplayUserProfile from "../DisplayUserProfile/DisplayUserProfile";
import DisplayUserTheme from "../DisplayUserTheme/DisplayUserTheme";
import DisplayUserSettingsWorkspaceBreadcrumb
  from "../DisplayUserSettingsWorkspaceBreadcrumb/DisplayUserSettingsWorkspaceBreadcrumb";
import DisplayUserSettingsWorkspaceActions
  from "../DisplayUserSettingWorkspaceActions/DisplayUserSettingWorkspaceActions";
import DisplayUserGpgInformation from "../DisplayUserGpgInformation/DisplayUserGpgInformation";
import SearchBar from "../../Common/Navigation/Search/SearchBar";
import DisplayUserPassphrase from "../ChangeUserPassphrase/ChangeUserPassphrase";
import UserSettingsContextProvider from "../../../contexts/UserSettingsContext";
import DisplayUserChooseSecurityToken from "../ChangeUserSecurityToken/ChangeUserSecurityToken";

/**
 * This component is a container for all the user settings workspace features
 */
class DisplayUserSettingsWorkspace extends React.Component {
  /**
   * Can the user access the theme capability.
   * @returns {bool}
   */
  get canIUseThemeCapability() {
    return this.context.siteSettings && this.context.siteSettings.canIUse('accountSettings');
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const {path} = this.props.match;
    return (
      <div>
        <div className="header second">
          <Logo/>
          <SearchBar disabled={true}/>
          <UserBadgeMenu baseUrl={this.context.userSettings.getTrustedDomain()} user={this.context.loggedInUser}/>
        </div>
        <div className="header third">
          <DisplayUserSettingsWorkspaceActions/>
        </div>
        <div className="panel main">
          <div className="panel left">
            <NavigateIntoUserSettingsWorkspace/>
          </div>
          <div className="panel middle">
            <DisplayUserSettingsWorkspaceBreadcrumb/>
            <UserSettingsContextProvider>
              <Route path={`${path}/profile`} component={DisplayUserProfile}/>
              <Route path={`${path}/passphrase`} component={DisplayUserPassphrase}/>
              <Route path={`${path}/security-token`} component={DisplayUserChooseSecurityToken}></Route>
              {this.canIUseThemeCapability &&
              <Route path={`${path}/theme`} component={DisplayUserTheme}/>
              }
              <Route path={`${path}/keys`} component={DisplayUserGpgInformation}/>
            </UserSettingsContextProvider>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserSettingsWorkspace.contextType = AppContext;
DisplayUserSettingsWorkspace.propTypes = {
  match: PropTypes.any,
};

export default withRouter(DisplayUserSettingsWorkspace);
