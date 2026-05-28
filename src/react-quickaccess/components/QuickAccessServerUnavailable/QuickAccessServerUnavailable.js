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

class QuickAccessServerUnavailable extends Component {
  constructor(props) {
    super(props);
    this.handleSignOutLocallyClick = this.handleSignOutLocallyClick.bind(this);
  }

  async handleSignOutLocallyClick() {
    await this.props.context.port.request("passbolt.auth.local-logout");
    this.props.logoutSuccessCallback?.();
  }

  render() {
    const isAuthenticated = Boolean(this.props.context.isAuthenticated);
    return (
      <div className="quickaccess-server-unavailable">
        <div className="form-container">
          <p>
            <Trans>Unable to reach the server, you are not connected to the network.</Trans>
          </p>
        </div>
        {isAuthenticated && (
          <div className="submit-wrapper">
            <button type="button" className="button primary big full-width" onClick={this.handleSignOutLocallyClick}>
              <Trans>Sign out locally</Trans>
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
  logoutSuccessCallback: PropTypes.func, // The callback invoked after a successful local sign out
  t: PropTypes.func, // The translation function
};
export default withAppContext(withRouter(withTranslation("common")(QuickAccessServerUnavailable)));
