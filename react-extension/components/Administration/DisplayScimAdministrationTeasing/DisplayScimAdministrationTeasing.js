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
 * @since         5.5.0
 */
import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import RedCheck from "../../../../img/svg/red_check.svg";

class DisplayScimAdministrationTeasing extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="row">
        <div className="scim-teasing main-column">
          <div className="main-content">
            <h3 className="title" id="scim-title"><Trans>SCIM</Trans></h3>
            <p><Trans>Automate user identity management and provisioning via standardised SCIM integration.</Trans></p>
            <div className="scim-info">
              <ul className="scim-description">
                <li><RedCheck/><Trans>Efficiently manage user identities in the cloud.</Trans></li>
                <li><RedCheck/><Trans>Simplify onboarding and offboarding processes.</Trans></li>
                <li><RedCheck/><Trans>Reduce manual administrative overhead and errors.</Trans></li>
              </ul>
              <div>
                <a className="button primary" href="https://www.passbolt.com/contact/sales?utm_campaign=21060976-CE%20to%20Pro&utm_source=product" target="_blank" rel="noopener noreferrer"><Trans>Upgrade to Passbolt Pro</Trans></a>
              </div>
            </div>
          </div>
        </div>
        {/* TODO: Uncomment when we have the documentation ready, until then the help-panel will be hidden for SCIM*/}
        {/* {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>For more information about SCIM, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://www.passbolt.com/docs/" target="_blank" rel="noopener noreferrer">
              <FileSVG />
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )} */}
      </div>
    );
  }
}

DisplayScimAdministrationTeasing.propTypes = {
  context: PropTypes.object, // Application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(DisplayScimAdministrationTeasing));
