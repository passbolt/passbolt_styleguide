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
 * @since         5.13.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import InfoSVG from "../../../../img/svg/info.svg";

/**
 * This component displays the help section for Offline mode Administration
 */
class DisplayOfflineAdministrationHelp extends Component {
  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <>
        {this.props.shouldDisplayWarning && (
          <div className="sidebar-help-section warning message">
            <div className="form-banner">
              <p>
                <b>
                  <Trans>Warning:</Trans>
                </b>{" "}
                <Trans>
                  Enabling offline mode allows encrypted data to be cached on user devices. Make sure your retention and
                  session policies align with your organisation security requirements.
                </Trans>
              </p>
            </div>
          </div>
        )}
        <div className="sidebar-help-section">
          <h3>
            <Trans>Need help?</Trans>
          </h3>
          <p>
            <Trans>Check out the offline mode documentation.</Trans>
          </p>
          {/* TODO: update with the correct documentation url */}
          <a className="button" target="_blank" rel="noopener noreferrer" href="https://www.passbolt.com/docs/admin">
            <InfoSVG />
            <span>
              <Trans>Read the documentation</Trans>
            </span>
          </a>
        </div>
      </>
    );
  }
}

DisplayOfflineAdministrationHelp.propTypes = {
  shouldDisplayWarning: PropTypes.bool, // Whether to display the warning banner
};

export default DisplayOfflineAdministrationHelp;
