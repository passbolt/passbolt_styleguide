
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
import Logo from "../../../../react/components/Common/Navigation/Header/Logo";
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
import SearchBar from "../../../../react/components/Common/Navigation/Search/SearchBar";
import TransferToMobile from "../TransferToMobile/TransferToMobile";

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
   * Can the user access the mobile transfer capability.
   * @returns {bool}
   */
  get canIUseMobileTransferCapability() {
    return this.context.siteSettings && this.context.siteSettings.canIUse('mobile');
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
            <Route path={`${path}/profile`} component={DisplayUserProfile}></Route>
            {this.canIUseThemeCapability &&
            <Route path={`${path}/theme`} component={DisplayUserTheme}></Route>
            }
            {this.canIUseMobileTransferCapability &&
            <Route path={`${path}/mobile`} component={TransferToMobile}></Route>
            }
            <Route path={`${path}/keys`} component={DisplayUserGpgInformation}></Route>
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
