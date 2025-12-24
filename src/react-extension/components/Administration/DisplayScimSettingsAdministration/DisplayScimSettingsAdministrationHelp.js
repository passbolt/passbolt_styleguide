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
 * @since         5.7.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import InfoSVG from "../../../../img/svg/info.svg";

/**
 * This component displays the help section for SCIM Settings Administration
 */
class DisplayScimSettingsAdministrationHelp extends Component {
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
                  if you think the secret has been compromised please regenerate and update it in your provider
                  settings.
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
            <Trans>For more information about SCIM, checkout the dedicated page on the official website.</Trans>
          </p>
          <a
            className="button"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.passbolt.com/docs/admin/user-provisioning/scim"
          >
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

DisplayScimSettingsAdministrationHelp.propTypes = {
  shouldDisplayWarning: PropTypes.bool.isRequired, // Whether to display the warning banner
};

export default DisplayScimSettingsAdministrationHelp;
