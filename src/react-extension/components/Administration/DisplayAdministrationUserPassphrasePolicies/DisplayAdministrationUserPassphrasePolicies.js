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
 * @since         4.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withAdminUserPassphrasePolicies} from "../../../contexts/Administration/AdministrationUserPassphrasePoliciesContext/AdministrationUserPassphrasePoliciesContext";
import DisplayAdministrationUserPassphrasePoliciesActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationUserPassphrasePoliciesActions/DisplayAdministrationUserPassphrasePoliciesActions";
import Range from "../../Common/Range/Range";
import {createSafePortal} from "../../../../shared/utils/portals";
import BuoySVG from "../../../../img/svg/buoy.svg";

const MINIMAL_ADVISED_ENTROPY = 80;

class DisplayAdministrationUserPassphrasePolicies extends React.PureComponent {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
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
    await this.props.adminUserPassphrasePoliciesContext.findSettings();
    this.setState({isReady: true});
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleMinimumEntropyChange = this.handleMinimumEntropyChange.bind(this);
    this.handleCheckboxInputChange = this.handleCheckboxInputChange.bind(this);
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminUserPassphrasePoliciesContext.isProcessing();
  }

  /**
   * Handles the minium entropy value change
   * @param {string} name the settings name to change the value
   * @param {number} val the valud to apply to the settings
   */
  handleMinimumEntropyChange(name, val) {
    const value = parseInt(val, 10) || 0;
    this.props.adminUserPassphrasePoliciesContext.setSettings(name, value);
  }

  /**
   * Handles checkbox check's state change
   */
  handleCheckboxInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = Boolean(target.checked);
    this.props.adminUserPassphrasePoliciesContext.setSettings(name, value);
  }

  /**
   * Returns true if the settings are considered too weak to be safe
   * @returns {boolean}
   */
  isWeakSettings(settings) {
    return settings.entropy_minimum < MINIMAL_ADVISED_ENTROPY;
  }

  /**
   * Returns true if a warning should be displayed
   * @returns {boolean}
   */
  get hasWarnings() {
    const adminContext = this.props.adminUserPassphrasePoliciesContext;
    const settings = adminContext.getSettings();
    return adminContext.hasSettingsChanges()
      || this.isWeakSettings(settings);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    if (!this.state.isReady) {
      return null;
    }
    const allInputDisabled = this.hasAllInputDisabled();
    const adminContext = this.props.adminUserPassphrasePoliciesContext;
    const settings = adminContext.getSettings();
    return (
      <div className="row">
        <div className="password-policies-settings main-column">
          <div className="main-content">
            <h3 id="user-passphrase-policies-title" className="title"><Trans>User Passphrase Policies</Trans></h3>
            <form>
              <h4 id="user-passphrase-policies-entropy-minimum"><Trans>User passphrase minimal entropy</Trans></h4>
              <div className="input range">
                <Range
                  id="entropy_minimum"
                  onChange={this.handleMinimumEntropyChange}
                  value={settings.entropy_minimum}
                  disabled={allInputDisabled}
                />
              </div>
              <div><Trans>You can set the minimal entropy for the users&apos; private key passphrase.</Trans> <Trans>This is the passphrase that is asked during sign in or recover.</Trans></div>
              <h4 id="user-passphrase-policies-external-services-subtitle">
                <span className="input toggle-switch form-element ready">
                  <input
                    id="user-passphrase-policies-external-services-toggle-button"
                    type="checkbox"
                    className="toggle-switch-checkbox checkbox"
                    name="external_dictionary_check"
                    onChange={this.handleCheckboxInputChange}
                    checked={settings?.external_dictionary_check}
                    disabled={allInputDisabled}
                  />
                  <label htmlFor="user-passphrase-policies-external-services-toggle-button"><Trans>External password dictionary check</Trans></label>
                </span>
              </h4>
              <span className="input toggle-switch form-element">
                <Trans>Allow passbolt to access external services to check if the user passphrase has been compromised when the user creates it.</Trans>
              </span>
            </form>
          </div>
          {this.hasWarnings &&
            <div className="warning message">
              {adminContext.hasSettingsChanges() &&
              <div id="user-passphrase-policies-save-banner">
                <p>
                  <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
                </p>
              </div>
              }
              {this.isWeakSettings(settings) &&
                <div id="user-passphrase-policies-weak-settings-banner">
                  <p>
                    <Trans>Passbolt recommends passphrase strength to be at minimum of {{MINIMAL_ADVISED_ENTROPY}} bits to be safe.</Trans>
                  </p>
                </div>
              }
            </div>
          }
        </div>
        <DisplayAdministrationUserPassphrasePoliciesActions/>
        {createSafePortal(
          <div className="sidebar-help-section">
            <h3><Trans>What is user passphrase policies?</Trans></h3>
            <p><Trans>For more information about the user passphrase policies, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://passbolt.com/docs/admin/authentication/user-passphrase-policies/" target="_blank" rel="noopener noreferrer">
              <BuoySVG/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>,
          document.getElementById("administration-help-panel")
        )}
      </div>
    );
  }
}

DisplayAdministrationUserPassphrasePolicies.propTypes = {
  context: PropTypes.object, // Application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminUserPassphrasePoliciesContext: PropTypes.object, // The admin password context context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdministrationWorkspace(withAdminUserPassphrasePolicies(withTranslation('common')(DisplayAdministrationUserPassphrasePolicies))));
