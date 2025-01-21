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
 * @since         4.4.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withAdminPasswordExpiry} from "../../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPaswordExpiryContext";
import DisplayAdministrationPasswordExpiryActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationPasswordExpiryActions/DisplayAdministrationPasswordExpiryActions";
import DisplayAdministrationPasswordExpiryAdvanced from "./DisplayAdministrationPasswordExpiryAdvanced/DisplayAdministrationPasswordExpiryAdvanced";
import {createSafePortal} from "../../../../shared/utils/portals";
import BuoySVG from '../../../../img/svg/buoy.svg';

class DisplayAdministrationPasswordExpiry extends React.PureComponent {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Get default state
   * @returns {Object}
   */
  get defaultState() {
    return {
      isReady: false,
    };
  }

  /**
   * On the component did mount, set the workspace action component and get the account recovery policy
   *
   */
  async componentDidMount() {
    await this.props.adminPasswordExpiryContext.findSettings();
    this.setState({isReady: true});
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminPasswordExpiryContext.isProcessing();
  }

  /**
   * Check if the user can use the advanced expiry password
   * @returns {boolean}
   */
  get canUseAdvancedSettings() {
    return this.props.context.siteSettings.canIUse('passwordExpiryPolicies');
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    if (!this.state.isReady) {
      return null;
    }
    const adminContext = this.props.adminPasswordExpiryContext;
    const isEnabled = adminContext.isFeatureToggleEnabled();

    return (
      <div className="row">
        <div className="password-expiry-settings main-column">
          <div className={`main-content ${adminContext.hasSettingsChanges() && "with-warning"}`}>
            <h3 id="password-expiry-settings-title" className="title">
              <span className="input toggle-switch form-element">
                <input type="checkbox" className="toggle-switch-checkbox checkbox" name="passwordExpirySettingsToggle"
                  onChange={() => adminContext.setFeatureToggle(!isEnabled)} checked={isEnabled} disabled={this.hasAllInputDisabled()}
                  id="passwordExpirySettingsToggle"/>
                <label htmlFor="passwordExpirySettingsToggle"><Trans>Password Expiry</Trans></label>
              </span>
            </h3>
            {!isEnabled &&
              <p className="description">
                <Trans>No Password Expiry is configured. Enable it to activate automatic password expiration and automatic password expiration reset workflows.</Trans>
              </p>
            }
            {isEnabled && (
              <>
                {this.canUseAdvancedSettings ? (
                  <DisplayAdministrationPasswordExpiryAdvanced/>
                ) : (
                  <div id="password-expiry-settings-form">
                    <h4 id="password-expiry-settings-automatic-workflows" className="title title--required no-border"><Trans>Automatic workflows</Trans></h4>
                    <div className="radiolist-alt">
                      <div className={`input radio`}>
                        <label htmlFor="passwordExpiryAutomaticExpiry">
                          <span className="name"><Trans>Automatic expiry</Trans></span>
                          <span className="info">
                            <Trans>Password automatically expires when a user or group with a user who has accessed the password is removed from the permission list.</Trans>
                          </span>
                        </label>
                      </div>
                      <div className={`input radio`}>
                        <label htmlFor="passwordExpiryAutomatiUpdate">
                          <span className="name"><Trans>Automatic update</Trans></span>
                          <span className="info">
                            <Trans>Password is no longer marked as expired whenever the password is updated.</Trans>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          {adminContext.hasSettingsChanges() &&
            <div className="warning message" id="password-expiry-settings-save-banner">
              <div>
                <p>
                  <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
                </p>
              </div>
            </div>
          }
        </div>
        <DisplayAdministrationPasswordExpiryActions/>
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>About password expiry</Trans></h3>
            <p><Trans>For more information about the password expiry, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://passbolt.com/docs/admin/password-configuration/password-expiry" target="_blank" rel="noopener noreferrer">
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

DisplayAdministrationPasswordExpiry.propTypes = {
  context: PropTypes.object, // Application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminPasswordExpiryContext: PropTypes.object, // The admin password context context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdministrationWorkspace(withAdminPasswordExpiry(withTranslation('common')(DisplayAdministrationPasswordExpiry))));
