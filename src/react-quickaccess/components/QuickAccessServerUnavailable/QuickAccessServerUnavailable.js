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
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";

class QuickAccessServerUnavailable extends Component {
  constructor(props) {
    super(props);
    this.handleSignOutLocallyClick = this.handleSignOutLocallyClick.bind(this);
    this.handleUseOfflineModeClick = this.handleUseOfflineModeClick.bind(this);
  }

  /**
   * Sign out locally: run the local logout (no server call) and close the quickaccess.
   * @returns {Promise<void>}
   */
  async handleSignOutLocallyClick() {
    await await this.props.context.port.request("passbolt.auth.local-logout");
    await this.props.context.closeWindow();
  }

  /**
   * Switch to offline mode: go to the offline login page.
   */
  handleUseOfflineModeClick() {
    this.props.history.push("/webAccessibleResources/quickaccess/login-offline");
  }

  render() {
    /*
     * Only a signed-in user has anything to do here. A signed-out user who can use the offline mode is
     * routed to the offline sign-in page by the triage route and never reaches this screen; one who cannot
     * has no action left to offer only the message is rendered.
     */
    const isAuthenticated = this.props.activeSession.isAuthenticated;
    const canUseOfflineMode = this.props.context.canUseOfflineMode;
    return (
      <div className="quickaccess-server-unavailable">
        <div className="form-container">
          <p>
            <Trans>Unable to reach the server, you are not connected to the network.</Trans>
          </p>
        </div>
        {isAuthenticated && this.renderAuthenticatedActions(canUseOfflineMode)}
      </div>
    );
  }

  /**
   * Render the actions for an authenticated user whose session went offline.
   * @param {boolean} canUseOfflineMode Whether the user can use the offline mode.
   * @returns {JSX.Element}
   */
  renderAuthenticatedActions(canUseOfflineMode) {
    if (canUseOfflineMode) {
      return (
        <div className="submit-wrapper">
          <button type="button" className="button primary big full-width" onClick={this.handleUseOfflineModeClick}>
            <Trans>Use offline mode</Trans>
          </button>
          <a className="sign-out-locally-link" role="button" onClick={this.handleSignOutLocallyClick}>
            <Trans>Sign out locally</Trans>
          </a>
        </div>
      );
    }
    return (
      <div className="submit-wrapper">
        <button type="button" className="button primary big full-width" onClick={this.handleSignOutLocallyClick}>
          <Trans>Sign out locally</Trans>
        </button>
      </div>
    );
  }
}
QuickAccessServerUnavailable.propTypes = {
  history: PropTypes.any, // The router history
  location: PropTypes.any, // The router location
  context: PropTypes.any, // The application context
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The user active session
  t: PropTypes.func, // The translation function
};
export default withActiveSessionLocalStorage(
  withAppContext(withRouter(withTranslation("common")(QuickAccessServerUnavailable))),
);
