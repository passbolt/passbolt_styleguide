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
import {createSafePortal} from "../../../../shared/utils/portals";
import BuoySVG from "../../../../img/svg/buoy.svg";
import RedCheck from "../../../../img/svg/red_check.svg";
import FrameSVG from "../../../../img/svg/Frame.svg";

class DisplayAdministrationUserPassphrasePoliciesTeasing extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="row">
        <div className="user-passphrase-policies-settings-teasing main-column">
          <div className="main-content">
            <h3 id="user-passphrase-policies-title" className="title"><Trans>User Passphrase Policies</Trans><FrameSVG className="pro-teasing-icon"/></h3>
            <p><Trans>Enforce secure user passphrases to protect account access.</Trans></p>
            <div className="user-passphrase-policies-info">
              <ul className="user-passphrase-policies-description">
                <li><RedCheck/><Trans>Mitigate risks associated with weak passphrases.</Trans></li>
                <li><RedCheck/><Trans>Customise minimum length and complexity.</Trans></li>
                <li><RedCheck/><Trans>Improve overall user account security.</Trans></li>
              </ul>
              <div>
                <a className="button primary" href="https://www.passbolt.com/contact/sales?utm_campaign=21060976-CE%20to%20Pro&utm_source=product" target="_blank" rel="noopener noreferrer"><Trans>Upgrade to Passbolt Pro</Trans></a>
              </div>
            </div>
          </div>
        </div>
        {createSafePortal(
          <>
            <div className="sidebar-help-section">
              <h3><Trans>Need some help?</Trans></h3>
              <p><Trans>For more information about the user passphrase policies, checkout the dedicated page on the help website.</Trans></p>
              <a className="button" href="https://www.passbolt.com/docs/admin/authentication/user-passphrase-policies/" target="_blank" rel="noopener noreferrer">
                <BuoySVG/>
                <span><Trans>Read the documentation</Trans></span>
              </a>
            </div>
          </>,
          document.getElementById("administration-help-panel")
        )}
      </div>
    );
  }
}

DisplayAdministrationUserPassphrasePoliciesTeasing.propTypes = {
  context: PropTypes.object, // Application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(DisplayAdministrationUserPassphrasePoliciesTeasing));
