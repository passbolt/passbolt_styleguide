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
import ArrowLeftSVG from "../../../img/svg/arrow_left.svg";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import { withOfflineSettingsLocalStorage } from "../../../shared/context/offline/OfflineSettingsLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { formatDateTimeAgo, formatSecondsDuration } from "../../../shared/utils/dateUtils";
import { DateTime } from "luxon";

const SECONDS_PER_DAY = 24 * 60 * 60;

/**
 * The offline mode footer details sums up the state of the offline mode:
 * when the data was last synchronised with the server, and the organisation offline settings the session
 * lives by.
 */
class OfflineFooterDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.initEventHandlers();
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
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
   * Handle the click on the back button.
   * @param {ReactEvent} event The react event
   */
  handleGoBackClick(event) {
    event.preventDefault();
    this.props.history.goBack();
  }

  /**
   * Switch to online mode: there is no server session to destroy, so the sign-out is local, then route to
   * the online login page to re-authenticate.
   * @returns {Promise<void>}
   */
  async handleGoOnlineClick() {
    await this.props.context.port.request("passbolt.auth.local-logout");
    this.props.history.push("/webAccessibleResources/quickaccess/login");
  }

  /**
   * The date the data was last synchronised with the server, in time ago.
   * @returns {string}
   */
  get lastSync() {
    return (
      formatDateTimeAgo(this.props.activeSession?.lastSeenOnline, this.translate, this.props.context.locale) ||
      this.translate("Not available")
    );
  }

  /**
   * The time left before the offline session expires and the user has to sign in again.
   * @returns {string}
   */
  get sessionDurationLeft() {
    return this.formatTimeLeft(this.props.activeSession?.lastLoggedIn, this.props.offlineSettings?.sessionDuration);
  }

  /**
   * The time left before the offline data is flushed, i.e. the organisation retention period counted
   * from the last synchronisation with the server.
   * @returns {string}
   */
  get dataRetentionLeft() {
    const retentionPeriodInSeconds = this.props.offlineSettings?.maximumRetentionPeriod * SECONDS_PER_DAY;
    return this.formatTimeLeft(this.props.activeSession?.lastSeenOnline, retentionPeriodInSeconds);
  }

  /**
   * Format the time left of a period started at the given date.
   * @param {string} [startDate] The date the period started
   * @param {number} [periodInSeconds] The length of the period in seconds
   * @returns {string}
   */
  formatTimeLeft(startDate, periodInSeconds) {
    if (!startDate || !periodInSeconds) {
      return this.translate("Not available");
    }
    const secondsLeft = DateTime.fromISO(startDate).plus({ seconds: periodInSeconds }).diffNow().as("seconds");
    const duration = formatSecondsDuration(secondsLeft, this.props.context.locale);
    return duration ? this.translate("{{duration}} remaining", { duration }) : this.translate("Expired");
  }

  render() {
    return (
      <div className="quickaccess-offline-details">
        <div className="back-link">
          <a href="#" className="primary-action" title={this.translate("Go back")} onClick={this.handleGoBackClick}>
            <ArrowLeftSVG />
            <span className="primary-action-title">
              <Trans>Offline mode</Trans>
            </span>
          </a>
        </div>
        <ul className="properties">
          <li className="property last-sync">
            <span className="property-name">
              <Trans>Last sync</Trans>
            </span>
            <span className="property-value">{this.lastSync}</span>
          </li>
          <li className="property session-duration">
            <span className="property-name">
              <Trans>Session duration</Trans>
            </span>
            <span className="property-value">{this.sessionDurationLeft}</span>
          </li>
          <li className="property data-retention">
            <span className="property-name">
              <Trans>Data retention</Trans>
            </span>
            <span className="property-value">{this.dataRetentionLeft}</span>
          </li>
        </ul>
        {this.props.activeSession?.isServerReachable && (
          <div className="submit-wrapper">
            <button
              type="button"
              className="button primary big full-width go-online-button"
              onClick={this.handleGoOnlineClick}
            >
              <Trans>Switch to online mode</Trans>
            </button>
          </div>
        )}
      </div>
    );
  }
}

OfflineFooterDetailsPage.propTypes = {
  context: PropTypes.any, // The application context
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The user active session
  offlineSettings: PropTypes.object, // The organisation offline settings (null when not cached locally)
  history: PropTypes.object, // The router history
  t: PropTypes.func, // The translation function
};

export default withActiveSessionLocalStorage(
  withOfflineSettingsLocalStorage(withAppContext(withRouter(withTranslation("common")(OfflineFooterDetailsPage)))),
);
