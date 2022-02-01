
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
import DisplayUserBadgeMenu from "../../User/DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import {withAppContext} from "../../../contexts/AppContext";
import NavigateIntoUserSettingsWorkspace from "../NavigateIntoUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace";
import DisplayUserProfile from "../DisplayUserProfile/DisplayUserProfile";
import DisplayUserTheme from "../DisplayUserTheme/DisplayUserTheme";
import DisplayUserSettingsWorkspaceBreadcrumb
  from "../DisplayUserSettingsWorkspaceBreadcrumb/DisplayUserSettingsWorkspaceBreadcrumb";
import DisplayUserSettingsWorkspaceActions
  from "../DisplayUserSettingWorkspaceActions/DisplayUserSettingWorkspaceActions";
import DisplayUserGpgInformation from "../DisplayUserGpgInformation/DisplayUserGpgInformation";
import SearchBar from "../../Common/Navigation/Search/SearchBar";
import DisplayUserPassphrase from "../ChangeUserPassphrase/ChangeUserPassphrase";
import DisplayUserChooseSecurityToken from "../ChangeUserSecurityToken/ChangeUserSecurityToken";
import TransferToMobile from "../TransferToMobile/TransferToMobile";
import DisplayAccountRecoveryUserSettings from '../DisplayUserAccountRecovery/DisplayAccountRecoveryUserSettings';
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";

/**
 * This component is a container for all the user settings workspace features
 */
class DisplayUserSettingsWorkspace extends React.Component {
  /**
   * Can the user access the theme capability.
   * @returns {bool}
   */
  get canIUseThemeCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('accountSettings');
  }

  /**
   * Can the user access the mobile transfer capability.
   * @returns {bool}
   */
  get canIUseMobileTransferCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('mobile');
  }

  /**
   * Can the user access the account recovery capability.
   * @returns {bool}
   */
  get canIUseAccountRecoveryCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('accountRecovery');
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
          <DisplayUserBadgeMenu baseUrl={this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
        </div>
        <div className="header third">
          <DisplayUserSettingsWorkspaceActions/>
        </div>
        <div className="panel main">
          <div className="panel left">
            <NavigateIntoUserSettingsWorkspace hasPendingAccountRecoveryChoice={this.props.accountRecoveryContext.isAccountRecoveryChoiceRequired()}/>
          </div>
          <div className="panel middle">
            <DisplayUserSettingsWorkspaceBreadcrumb/>
            <Route path={`${path}/profile`} component={DisplayUserProfile}/>
            <Route path={`${path}/passphrase`} component={DisplayUserPassphrase}/>
            <Route path={`${path}/security-token`} component={DisplayUserChooseSecurityToken}></Route>
            {this.canIUseThemeCapability &&
            <Route path={`${path}/theme`} component={DisplayUserTheme}/>
            }
            {this.canIUseMobileTransferCapability &&
            <Route path={`${path}/mobile`} component={TransferToMobile}></Route>
            }
            {this.canIUseAccountRecoveryCapability &&
            <Route path={`${path}/account-recovery`} component={DisplayAccountRecoveryUserSettings}></Route>
            }
            <Route path={`${path}/keys`} component={DisplayUserGpgInformation}></Route>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserSettingsWorkspace.propTypes = {
  context: PropTypes.any, // The application context
  match: PropTypes.any,
  accountRecoveryContext: PropTypes.object, // The account recovery context
};

export default withAppContext(withAccountRecovery(withRouter(DisplayUserSettingsWorkspace)));
