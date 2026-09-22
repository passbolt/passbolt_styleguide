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
import { Link, withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import WifiOffSVG from "../../../img/svg/wifi_off.svg";
import WifiOnSVG from "../../../img/svg/wifi_on.svg";
import CaretRightSVG from "../../../img/svg/caret_right.svg";

/**
 * Footer reflecting the server status whenever offline mode is usable: while in an offline session, or
 * on the server-unavailable screen. When the server is reachable again it offers to switch to online mode,
 * otherwise it only states the offline mode. It never redirects on its own (the offline session is sticky).
 * Its caret expands the offline mode details.
 */
class QuickAccessOfflineFooter extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoOnlineClick = this.handleGoOnlineClick.bind(this);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Switch to online mode: there is no server session to destroy, so the sign-out is local, then route to
   * the online login page to re-authenticate.
   * @returns {Promise<void>}
   */
  async handleGoOnlineClick() {
    await this.props.context.port.request("passbolt.auth.offline-logout");
    this.props.history.push("/webAccessibleResources/quickaccess/login");
  }

  /**
   * Should display offline footer
   * - If location is offline login page
   * - If session is offline and authenticated
   * - Unless the offline mode details, i.e. the expanded footer, are already displayed
   * @return {boolean}
   */
  get shouldDisplayOfflineFooter() {
    if (this.props.location.pathname === "/webAccessibleResources/quickaccess/offline-footer-details") {
      return false;
    }
    return this.props.activeSession.isSessionOffline && this.props.activeSession.isAuthenticated;
  }

  render() {
    if (!this.shouldDisplayOfflineFooter) {
      return null;
    }
    const isServerReachable = this.props.activeSession.isServerReachable;
    return (
      <div className={`quickaccess-offline-footer ${isServerReachable ? "server-available" : "server-unavailable"}`}>
        {isServerReachable ? (
          <>
            <WifiOnSVG className="online-mode-icon" />
            <button className="link go-online-link" type="button" onClick={this.handleGoOnlineClick}>
              <Trans>Switch to online mode</Trans>
            </button>
          </>
        ) : (
          <>
            <WifiOffSVG className="offline-mode-icon" />
            <span className="offline-mode-label">
              <Trans>Offline mode</Trans>
            </span>
          </>
        )}
        <Link
          to="/webAccessibleResources/quickaccess/offline-footer-details"
          className="offline-mode-details-link"
          title={this.translate("Offline mode details")}
        >
          <CaretRightSVG />
          <span className="visually-hidden">
            <Trans>Offline mode details</Trans>
          </span>
        </Link>
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
