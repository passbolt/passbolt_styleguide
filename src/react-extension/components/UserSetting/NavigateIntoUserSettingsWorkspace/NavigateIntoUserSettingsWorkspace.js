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
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import {Trans, withTranslation} from "react-i18next";
import Icon from "../../../../shared/components/Icons/Icon";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";

/**
 * This component allows to navigate throught the differents sections of the user settings workspace
 */
class NavigateIntoUserSettingsWorkspace extends React.Component {
  /**
   * Returns true if the use has the MFA capability
   */
  get isMfaEnabled() {
    return this.props.context.siteSettings.canIUse("multiFactorAuthentication");
  }

  /**
   * Can the user access the theme capability.
   * @returns {bool}
   */
  get canIUseThemeCapability() {
    return this.props.context.siteSettings && this.props.context.siteSettings.canIUse('accountSettings');
  }

  /**
   * Can the user access the mobile capability.
   * @returns {bool}
   */
  get canIUseMobileCapability() {
    const canViewMobileTransfer = this.props.rbacContext.canIUseUiAction(uiActions.MOBILE_TRANSFER);
    return canViewMobileTransfer && this.props.context.siteSettings && this.props.context.siteSettings.canIUse('mobile');
  }

  /**
   * Can the user access the desktop capability.
   * @returns {bool}
   */
  get canIUseDesktopCapability() {
    const canViewDesktopTransfer = this.props.rbacContext.canIUseUiAction(uiActions.DESKTOP_TRANSFER);
    return canViewDesktopTransfer && this.props.context.siteSettings && this.props.context.siteSettings.canIUse('desktop');
  }

  /**
   * Can the user access the account recovery feature.
   * @return {bool} true if the plugin is enabled and if an admin enabled the feature.
   */
  get canIUseAccountRecoveryCapability() {
    const canViewAccountRecovery = this.props.rbacContext.canIUseUiAction(uiActions.PROFIL_ACCOUNT_RECOVERY);
    return canViewAccountRecovery && this.props.context.siteSettings && this.props.context.siteSettings.canIUse('accountRecovery');
  }

  /**
   * Render the component
   */
  render() {
    const isSelected = pathSuffix => this.props.location.pathname.endsWith(pathSuffix);
    return (
      <div className="navigation-secondary navigation-shortcuts">
        <ul >
          <li>
            <div
              className={`row ${isSelected('profile') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button className="link no-border" type="button" onClick={this.props.navigationContext.onGoToUserSettingsProfileRequested}>
                    <span><Trans>Profile</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div
              className={`row ${isSelected('keys') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button className="link no-border" type="button" onClick={this.props.navigationContext.onGoToUserSettingsKeysRequested}>
                    <span><Trans>Keys inspector</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div
              className={`row ${isSelected('passphrase') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button className="link no-border" type="button" onClick={this.props.navigationContext.onGoToUserSettingsPassphraseRequested}>
                    <span><Trans>Passphrase</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div
              className={`row ${isSelected('security-token') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button className="link no-border" type="button" onClick={this.props.navigationContext.onGoToUserSettingsSecurityTokenRequested}>
                    <span><Trans>Security token</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          {this.canIUseThemeCapability &&
          <li>
            <div
              className={`row ${isSelected('theme') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button className="link no-border" type="button" onClick={this.props.navigationContext.onGoToUserSettingsThemeRequested}>
                    <span><Trans>Theme</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          }
          {this.isMfaEnabled &&
            <li>
              <div
                className={`row ${isSelected('mfa') ? 'selected' : ''}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <button className="link no-border" type="button" onClick={this.props.navigationContext.onGoToUserSettingsMfaRequested}>
                      <span><Trans>Multi Factor Authentication</Trans></span>
                      {this.props.hasPendingMfaChoice &&
                      <Icon name="exclamation" baseline={true}/>
                      }
                    </button>
                  </div>
                </div>
              </div>
            </li>
          }
          {this.canIUseAccountRecoveryCapability &&
          <li>
            <div
              className={`row ${isSelected('account-recovery') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button className="link no-border" type="button" onClick={this.props.navigationContext.onGoToUserSettingsAccountRecoveryRequested}>
                    <span>
                      <Trans>Account Recovery</Trans>
                    </span>
                    {this.props.hasPendingAccountRecoveryChoice &&
                      <Icon name="exclamation" baseline={true}/>
                    }
                  </button>
                </div>
              </div>
            </div>
          </li>
          }
          {this.canIUseMobileCapability &&
          <li id="navigation-item-mobile-setup">
            <div
              className={`row ${isSelected('mobile') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button className="link no-border" type="button" onClick={this.props.navigationContext.onGoToUserSettingsMobileRequested}>
                    <span><Trans>Mobile setup</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          }
          {this.canIUseDesktopCapability &&
          <li id="navigation-item-desktop-setup">
            <div
              className={`row ${isSelected('desktop') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button className="link no-border" type="button" onClick={this.props.navigationContext.onGoToUserSettingsDesktopRequested}>
                    <span><Trans>Desktop app setup</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
          }
        </ul>
      </div>
    );
  }
}

NavigateIntoUserSettingsWorkspace.propTypes = {
  context: PropTypes.any, // The application context
  navigationContext: PropTypes.any, // The application navigation context
  history: PropTypes.object,
  location: PropTypes.object,
  hasPendingAccountRecoveryChoice: PropTypes.bool,
  hasPendingMfaChoice: PropTypes.bool,
  rbacContext: PropTypes.any, // The role based access control context
};

export default withAppContext(withRbac(withRouter(withNavigationContext(withTranslation("common")(NavigateIntoUserSettingsWorkspace)))));
