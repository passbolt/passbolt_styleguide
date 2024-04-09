
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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
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
import {withMfa} from '../../../contexts/MFAContext';
import ExportAccountToDesktop from '../ExportAccountToDesktop/ExportAccountToDesktop';
import OrchestrateMfaSettings from '../../MFA/OrchestrateMfaSettings/OrchestrateMfaSettings';
import {withRbac} from '../../../../shared/context/Rbac/RbacContext';
import {uiActions} from '../../../../shared/services/rbacs/uiActionEnumeration';

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
    const canViewMobileTransfer = this.props.rbacContext.canIUseUiAction(uiActions.MOBILE_TRANSFER);
    return canViewMobileTransfer && this.props.context.siteSettings && this.props.context.siteSettings.canIUse('mobile');
  }

  /**
   * Can the user access the desktop export capability.
   * @returns {bool}
   */
  get canIUseDesktopExportCapability() {
    const canViewDesktopTransfer = this.props.rbacContext.canIUseUiAction(uiActions.DESKTOP_TRANSFER);
    return canViewDesktopTransfer && this.props.context.siteSettings && this.props.context.siteSettings.canIUse('desktop');
  }

  /**
   * Can the user access the account recovery capability.
   * @returns {bool}
   */
  get canIUseAccountRecoveryCapability() {
    const canViewAccountRecovery = this.props.rbacContext.canIUseUiAction(uiActions.PROFIL_ACCOUNT_RECOVERY);
    return canViewAccountRecovery && this.props.context.siteSettings && this.props.context.siteSettings.canIUse('accountRecovery');
  }

  /**
   * Return if user has to define mfa.
   * @returns {bool}
   */
  get isMfaChoiceRequired() {
    return this.props.mfaContext.isMfaChoiceRequired();
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
            <NavigateIntoUserSettingsWorkspace
              hasPendingMfaChoice={this.isMfaChoiceRequired}
              hasPendingAccountRecoveryChoice={this.props.accountRecoveryContext.isAccountRecoveryChoiceRequired()}/>
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
            {this.canIUseDesktopExportCapability &&
            <Route path={`${path}/desktop`} component={ExportAccountToDesktop}></Route>
            }
            {this.canIUseAccountRecoveryCapability &&
            <Route path={`${path}/account-recovery`} component={DisplayAccountRecoveryUserSettings}></Route>
            }
            <Route path={`${path}/mfa`} component={OrchestrateMfaSettings}></Route>
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
  mfaContext: PropTypes.object,
  rbacContext: PropTypes.any, // The role based access control context
};

export default withAppContext(withRbac(withAccountRecovery(withMfa(withRouter(DisplayUserSettingsWorkspace)))));
