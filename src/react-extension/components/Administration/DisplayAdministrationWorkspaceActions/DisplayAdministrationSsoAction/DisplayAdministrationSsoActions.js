/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.7.3
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {withAdminSso} from "../../../../contexts/AdminSsoContext";

/**
 * This component is a container of multiple actions applicable on setting
 */
class DisplayAdministrationWorkspaceActions extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleTestConfigurationClick = this.handleTestConfigurationClick.bind(this);
  }

  /**
   * Handle save settings
   */
  handleSaveClick() {
    //@todo @mock
    const ssoConfig = this.props.adminSsoContext.getSsoConfiguration();
    console.log("click saved sso config", ssoConfig);
    this.props.adminSsoContext.save(ssoConfig);
  }

  /**
   * Handle reset account recovery policy settings
   */
  handleTestConfigurationClick() {
    //@todo @mock
    console.log("test configuration");
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isSaveEnabled() {
    const ssoConfig = this.props.adminSsoContext.getSsoConfiguration();
    return ssoConfig?.provider
      && ssoConfig?.data?.url
      && ssoConfig?.data?.app_id
      && ssoConfig?.data?.directory_id
      && ssoConfig?.data?.secret;
  }

  /**
   * Is save button enable
   * @returns {boolean}
   */
  isTestConfigurationEnabled() {
    return this.isSaveEnabled();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="col2_3 actions-wrapper">
        <div className="actions">
          <div>
            <li>
              <a className={`button ${this.isSaveEnabled() ? "" : "disabled"}`} onClick={this.handleSaveClick}>
                <Icon name="save"/>
                <span><Trans>Save settings</Trans></span>
              </a>
            </li>
          </div>
          <div>
            <li>
              <a className={`button ${this.isTestConfigurationEnabled() ? "" : "disabled"}`} onClick={this.handleTestConfigurationClick}>
                <Icon name="edit"/>
                <span><Trans>Test your configuration</Trans></span>
              </a>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

DisplayAdministrationWorkspaceActions.propTypes = {
  adminSsoContext: PropTypes.object, // The admin sso context
};

export default withAdminSso(withTranslation("common")(DisplayAdministrationWorkspaceActions));
