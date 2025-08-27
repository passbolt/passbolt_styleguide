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
import FileTextSVG from "../../../../img/svg/file_text.svg";
import RedCheck from "../../../../img/svg/red_check.svg";

/**
 * This component displays the SSO administration settings for CE
 */
class ManageSsoSettingsTeasing extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="row">
        <div className="third-party-provider-settings-teasing sso-settings main-column">
          <div className="main-content">
            <h3 className="title" id="third-party-provider-settings-title"><Trans>Single Sign-On</Trans></h3>
            <p><Trans>Simplify secure access through integration with identity providers.</Trans></p>
            <div className="third-party-provider-settings-info">
              <ul className="third-party-provider-settings-description">
                <li><RedCheck/><Trans>Reduce password fatigue and simplify login.</Trans></li>
                <li><RedCheck/><Trans>Centralise user authentication management.</Trans></li>
                <li><RedCheck/><Trans>Support major identity providers like Google and Microsoft.</Trans></li>
              </ul>
              <div>
                <a className="button primary" href="https://www.passbolt.com/contact/pro/enterprise" target="_blank" rel="noopener noreferrer"><Trans>Upgrade to Passbolt Pro</Trans></a>
              </div>
            </div>
          </div>
        </div>
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>For more information about SSO, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://passbolt.com/docs/admin/authentication/sso/" target="_blank" rel="noopener noreferrer">
              <FileTextSVG/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )}
      </div>
    );
  }
}

ManageSsoSettingsTeasing.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(ManageSsoSettingsTeasing));
