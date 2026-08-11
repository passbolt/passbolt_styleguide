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
 * @since         6.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { formatDateTimeAgo } from "../../../shared/utils/dateUtils";

/**
 * Footer reflecting the server status whenever offline mode is usable: while in an offline session, or
 * on the server-unavailable screen. When the server is reachable again it offers to go online, otherwise
 * it shows the service is unavailable. It never redirects on its own (the offline session is sticky).
 */
class QuickAccessOfflineFooter extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoOnlineClick = this.handleGoOnlineClick.bind(this);
  }

  /**
   * Go online: run the local logout and route to the online login page to re-authenticate.
   * @returns {Promise<void>}
   */
  async handleGoOnlineClick() {
    await this.props.context.port.request("passbolt.auth.local-logout");
    this.props.history.push("/webAccessibleResources/quickaccess/login");
  }

  /**
   * Should display offline footer
   * - If location is offline login page
   * - If session is offline and authenticated
   * @return {boolean}
   */
  get shouldDisplayOfflineFooter() {
    return (
      this.props.location.pathname === "/webAccessibleResources/quickaccess/login-offline" ||
      (this.props.activeSession.isSessionOffline && this.props.activeSession.isAuthenticated)
    );
  }

  render() {
    if (!this.shouldDisplayOfflineFooter) {
      return null;
    }
    const isServerReachable = this.props.activeSession.isServerReachable;
    const lastSync =
      formatDateTimeAgo(this.props.activeSession.lastSeenOnline, this.props.t, this.props.context.locale) ||
      this.props.t("Not available");
    return (
      <div className={`quickaccess-offline-footer ${isServerReachable ? "server-available" : "server-unavailable"}`}>
        <span className="server-status-indicator" />
        <span className="server-status-label">
          <span className="offline-prefix">
            <Trans>Offline</Trans>:
          </span>{" "}
          <span className="server-status">
            {isServerReachable ? <Trans>service available</Trans> : <Trans>service unavailable</Trans>}
          </span>
        </span>
        {isServerReachable ? (
          <button className="link go-online-link" type="button" onClick={this.handleGoOnlineClick}>
            <Trans>Go back online</Trans>
          </button>
        ) : (
          <span className="last-sync-label">
            <Trans>Last sync: {{ lastSync }}</Trans>
          </span>
        )}
      </div>
    );
  }
}

QuickAccessOfflineFooter.propTypes = {
  context: PropTypes.any, // The application context
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The user active session
  history: PropTypes.object, // The router history
  location: PropTypes.object, // The router location
  t: PropTypes.func, // The translation function
};

export default withActiveSessionLocalStorage(
  withAppContext(withRouter(withTranslation("common")(QuickAccessOfflineFooter))),
);
