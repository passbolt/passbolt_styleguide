
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
import DisplayUserBadgeMenu from "../../User/DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import NavigateIntoUserSettingsWorkspace from "../NavigateIntoUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace";
import DisplayUserProfile from "../DisplayUserProfile/DisplayUserProfile";
import DisplayUserTheme from "../DisplayUserTheme/DisplayUserTheme";
import DisplayUserSettingsWorkspaceBreadcrumb
  from "../DisplayUserSettingsWorkspaceBreadcrumb/DisplayUserSettingsWorkspaceBreadcrumb";
import DisplayUserGpgInformation from "../DisplayUserGpgInformation/DisplayUserGpgInformation";
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
import ArrowLeftSVG from "../../../../img/svg/arrow_left.svg";
import {Trans} from "react-i18next";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import DisplayUserProfileHelp from "../DisplayUserProfile/DisplayUserProfileHelp";
import Footer from "../../Common/Footer/Footer";

/**
 * This component is a container for all the user settings workspace features
 */
class DisplayUserSettingsWorkspace extends React.Component {
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
   * @return {void}
   */
  bindCallbacks() {
    this.handleGoBack = this.handleGoBack.bind(this);
  }

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
   * Handle go back to resource workspace
   */
  handleGoBack() {
    this.props.navigationContext.onGoToPasswordsRequested();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const {path} = this.props.match;
    return (
      <div className="panel main">
        <div className="panel left">
          <div className="sidebar-content">
            <div className="top-bar-left-navigation">
              <div className="navigation">
                <button type="button" className="button-transparent back" onClick={this.handleGoBack}>
                  <ArrowLeftSVG/>
                </button>
                <span className="title my-profile"><Trans>My Profile</Trans></span>
              </div>
            </div>
            <div className="sidebar-content-left">
              <NavigateIntoUserSettingsWorkspace
                hasPendingMfaChoice={this.isMfaChoiceRequired}
                hasPendingAccountRecoveryChoice={this.props.accountRecoveryContext.isAccountRecoveryChoiceRequired()}/>
            </div>
          </div>
        </div>
        <div className="panel middle">
          <div className="header">
            <DisplayUserBadgeMenu baseUrl={this.props.context.userSettings.getTrustedDomain()} user={this.props.context.loggedInUser}/>
          </div>
          <div className="middle-right">
            <div className="breadcrumbs-and-grid">
              <div className="top-bar">
                <DisplayUserSettingsWorkspaceBreadcrumb/>
              </div>
              <div className="main-page">
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
              {/* TODO will be moved directly in specific administration menu item component <DisplayUserSettingsWorkspaceActions/> */}
            </div>
            <div className="help-panel">
              <div className="sidebar-help">
                <Route path={`${path}/profile`} component={DisplayUserProfileHelp}/>
              </div>
              <Footer/>
            </div>
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
  navigationContext: PropTypes.any, // The application navigation context
};

export default withRouter(withAppContext(withRbac(withAccountRecovery(withMfa(withNavigationContext(DisplayUserSettingsWorkspace))))));
