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

class ManageAccountRecoveryAdministrationSettingsTeasing extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="row">
        <div className="recover-account-settings-teasing main-column">
          <div className="main-content">
            <h3 className="title"id="recover-account-settings-title"><Trans>Account Recovery</Trans><FrameSVG className="pro-teasing-icon"/></h3>
            <p><Trans>Recover lost user accounts.</Trans></p>
            <div className="recover-account-info">
              <ul className="recover-account-description">
                <li><RedCheck/><Trans>In case of passphrase loss.</Trans></li>
                <li><RedCheck/><Trans>In case of private key loss.</Trans></li>
                <li><RedCheck/><Trans>Configurable with an Organisation Recovery Key.</Trans></li>
              </ul>
              <div>
                <a className="button primary" href="https://www.passbolt.com/contact/sales?utm_campaign=21060976-CE%20to%20Pro&utm_source=product" target="_blank" rel="noopener noreferrer"><Trans>Upgrade to Passbolt Pro</Trans></a>
              </div>
            </div>
          </div>
        </div>
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>For more information about account recovery, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://passbolt.com/docs/admin/authentication/account-recovery/" target="_blank" rel="noopener noreferrer">
              <BuoySVG />
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )}
      </div>
    );
  }
}

ManageAccountRecoveryAdministrationSettingsTeasing.propTypes = {
  context: PropTypes.object, // Application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(ManageAccountRecoveryAdministrationSettingsTeasing));
