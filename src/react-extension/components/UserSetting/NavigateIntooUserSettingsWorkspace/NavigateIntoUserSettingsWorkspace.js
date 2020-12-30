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
import {NavLink, withRouter} from "react-router-dom";
import AppContext from "../../../contexts/AppContext";

/**
 * This component allows to navigate throught the differents sections of the user settings workspace
 */
class NavigateIntoUserSettingsWorkspace extends React.Component {
  /**
   * Returns true if the use has the MFA capability
   */
  get isMfaEnabled() {
    return this.context.siteSettings.canIUse("multiFactorAuthentication");
  }

  /**
   * Render the component
   */
  render() {
    const isSelected = pathSuffix => this.props.location.pathname.endsWith(pathSuffix);
    return (
      <div className="navigation first shortcuts">
        <ul >
          <li>
            <div
              className={`row ${isSelected('profile') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <NavLink
                    to={"/app/settings/profile"}>
                    <span>Profile</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div
              className={`row ${isSelected('theme') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <NavLink
                    to={"/app/settings/theme"}>
                    <span>Theme</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </li>
          {this.isMfaEnabled &&
            <li>
              <div
                className={`row ${isSelected('mfa') ? 'selected' : ''}`}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <NavLink
                      to={"/app/settings/mfa"}>
                      <span>Multi Factor Authentication</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </li>
          }
          <li>
            <div
              className={`row ${isSelected('keys') ? 'selected' : ''}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <NavLink
                    to={"/app/settings/keys"}>
                    <span>Keys inspector</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

NavigateIntoUserSettingsWorkspace.contextType = AppContext;
NavigateIntoUserSettingsWorkspace.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(NavigateIntoUserSettingsWorkspace);
