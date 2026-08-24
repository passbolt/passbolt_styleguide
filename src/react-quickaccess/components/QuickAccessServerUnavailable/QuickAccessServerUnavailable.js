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
 * @since        5.13.0
 */
import React, { Component } from "react";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { withOfflineSettingsLocalStorage } from "../../../shared/context/offline/OfflineSettingsLocalStorageContext";
import OfflineSettingsEntity from "../../../shared/models/entity/offline/offlineSettingsEntity";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import CanUse from "../../../shared/services/rbacs/canUseService";
import { actions } from "../../../shared/services/rbacs/actionEnumeration";
import WifiOffSVG from "../../../img/svg/wifi_off.svg";

class QuickAccessServerUnavailable extends Component {
  constructor(props) {
    super(props);
    this.handleUseOfflineModeClick = this.handleUseOfflineModeClick.bind(this);
  }

  /**
   * Is an online authenticated session already present, i.e. a signed-in user which just lost the server.
   * @returns {boolean}
   */
  get hasOnlineSession() {
    const activeSession = this.props.activeSession;

    return Boolean(activeSession?.isAuthenticated && activeSession?.isSessionOnline);
  }

  get canIUseOfflineMode() {
    const { siteSettings, loggedInUser, rbacs } = this.props.context;

    return (
      // plugin enabled
      siteSettings?.canIUse("offlineMode") &&
      // user has a role (required for rbac)
      Boolean(loggedInUser?.role) &&
      // RBAC permission is allowed
      CanUse.canRoleUseAction(loggedInUser, rbacs, actions.OFFLINE_ITEMS_VIEW) &&
      // Offline settings is set
      this.props.offlineSettings != null
    );
  }

  /**
   * Switch to offline mode: go to the offline login page.
   */
  handleUseOfflineModeClick() {
    this.props.history.push("/webAccessibleResources/quickaccess/login-offline");
  }

  render() {
    return (
      <div className="quickaccess-server-unavailable">
        <div className="form-container">
          <p className="server-unavailable-message">
            <WifiOffSVG className="svg-icon" />
            <span>
              <Trans>
                <strong>Unable to reach the server</strong>, you are not connected to the network.
              </Trans>
            </span>
          </p>
        </div>
        {this.canIUseOfflineMode && (
          <div className="submit-wrapper">
            <button type="button" className="button primary big full-width" onClick={this.handleUseOfflineModeClick}>
              {this.hasOnlineSession ? <Trans>Switch to offline mode</Trans> : <Trans>Use offline mode</Trans>}
            </button>
          </div>
        )}
      </div>
    );
  }
}
QuickAccessServerUnavailable.propTypes = {
  history: PropTypes.any, // The router history
  location: PropTypes.any, // The router location
  context: PropTypes.any, // The application context
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The user active session
  offlineSettings: PropTypes.instanceOf(OfflineSettingsEntity), // The organisation offline settings
  t: PropTypes.func, // The translation function
};
export default withAppContext(
  withRouter(
    withActiveSessionLocalStorage(
      withOfflineSettingsLocalStorage(withTranslation("common")(QuickAccessServerUnavailable)),
    ),
  ),
);
