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
 * This component displays the User Directory for CE adminstrators
 */
class DisplayUserDirectoryAdministrationTeasing extends React.Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="row">
        <div className="ldap-settings-teasing main-column">
          <div className="main-content">
            <h3 className="title" id="ldap-settings-title"><Trans>Users Directory</Trans></h3>
            <p><Trans>Simplify user management provisioning through integration with existing directories.</Trans></p>
            <div className="ldap-settings-info">
              <ul className="ldap-settings-description">
                <li><RedCheck/><Trans>Automate user onboarding and offboarding.</Trans></li>
                <li><RedCheck/><Trans>Sync user attributes efficiently.</Trans></li>
                <li><RedCheck/><Trans>Ensure data consistency and security compliance.</Trans></li>
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
            <p><Trans>Check out our ldap configuration guide.</Trans></p>
            <a className="button" href="https://www.passbolt.com/docs/admin/user-provisioning/users-directory/" target="_blank" rel="noopener noreferrer">
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

DisplayUserDirectoryAdministrationTeasing.propTypes = {
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(DisplayUserDirectoryAdministrationTeasing));
