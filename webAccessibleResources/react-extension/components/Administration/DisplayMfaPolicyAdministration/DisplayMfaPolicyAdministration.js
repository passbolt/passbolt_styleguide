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
 * @since         3.10.0
 */

import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withAdministrationWorkspace} from "../../../contexts/AdministrationWorkspaceContext";
import {withAdminMfaPolicy} from "../../../contexts/Administration/AdministrationMfaPolicy/AdministrationMfaPolicyContext";
import DisplayAdministrationMfaPolicyActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationMfaPolicyActions/DisplayAdministrationMfaPolicyActions";

class DisplayMfaPolicyAdministration extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * On the component did mount, set the workspace action component and get the account recovery policy
   *
   */
  async componentDidMount() {
    this.props.administrationWorkspaceContext.setDisplayAdministrationWorkspaceAction(DisplayAdministrationMfaPolicyActions);
    await this.findSettings();
  }

  /**
   * On the component will unmount.
   */
  componentWillUnmount() {
    this.props.administrationWorkspaceContext.resetDisplayAdministrationWorkspaceAction();
    this.props.adminMfaPolicyContext.clearContext();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  /**
   * Bind callbacks methods
   */
  async findSettings() {
    await this.props.adminMfaPolicyContext.findSettings();
  }

  /**
   * Handle policy input change.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  async handleInputChange(event) {
    const field = event.target.name;
    let value = event.target.value;

    if (field === "rememberMeForAMonth") {
      value = event.target.checked;
    }

    this.props.adminMfaPolicyContext.setSettings(field, value);
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminMfaPolicyContext.isProcessing();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const settings = this.props.adminMfaPolicyContext.getSettings();
    return (
      <div className="row">
        <div className="mfa-policy-settings col8 main-column">
          <h3 id="mfa-policy-settings-title"><Trans>MFA Policy</Trans></h3>
          {this.props.adminMfaPolicyContext.hasSettingsChanges() &&
            <div className="warning message" id="mfa-policy-setting-banner">
              <p>
                <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
              </p>
            </div>
          }
          <form className="form">
            <h4 className="no-border" id="mfa-policy-subtitle"><Trans>Default users multi factor authentication policy</Trans></h4>
            <p id="mfa-policy-description">
              <Trans>You can choose the default behaviour of multi factor authentication for all users.</Trans>
            </p>
            <div className="radiolist-alt">
              <div className={`input radio ${settings?.policy === "mandatory" ? 'checked' : ''}`} id="mfa-policy-mandatory">
                <input type="radio"
                  value="mandatory"
                  onChange={this.handleInputChange}
                  name="policy"
                  checked={settings?.policy === "mandatory"}
                  id="mfa-policy-mandatory-radio"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="mfa-policy-mandatory-radio">
                  <span className="name"><Trans>Mandatory</Trans></span>
                  <span className="info">
                    <Trans>Users have to enable multi factor authentication. If they don&apos;t, they will be reminded every time they log in.</Trans>
                  </span>
                </label>
              </div>
              <div className={`input radio ${settings?.policy === "opt-in" ? 'checked' : ''}`} id="mfa-policy-opt-in">
                <input type="radio"
                  value="opt-in"
                  onChange={this.handleInputChange}
                  name="policy"
                  checked={settings?.policy === "opt-in"}
                  id="mfa-policy-opt-in-radio"
                  disabled={this.hasAllInputDisabled()}/>
                <label htmlFor="mfa-policy-opt-in-radio">
                  <span className="name"><Trans>Opt-in (default)</Trans></span>
                  <span className="info">
                    <Trans>Users have the choice to enable multi factor authentication in their profile workspace.</Trans>
                  </span>
                </label>
              </div>
            </div>
            <h4 id="mfa-policy-remember-subtitle">
                Remember a device for a month
            </h4>
            <span className="input toggle-switch form-element ">
              <input type="checkbox" className="toggle-switch-checkbox checkbox" name="rememberMeForAMonth" onChange={this.handleInputChange}  disabled={this.hasAllInputDisabled()} checked={settings?.rememberMeForAMonth} id="remember-toggle-button" />
              <label htmlFor="remember-toggle-button"><Trans>Allow &ldquo;Remember this device for a month.&ldquo; option during MFA.</Trans></label>
            </span>
          </form>
        </div>
        <div className="col4 last">
          <div className="sidebar-help">
            <h3><Trans>Need some help?</Trans></h3>
            <p><Trans>For more information about MFA policy settings, checkout the dedicated page on the help website.</Trans></p>
            <a className="button" href="https://help.passbolt.com/configure/mfa-policy" target="_blank" rel="noopener noreferrer">
              <Icon name="life-ring"/>
              <span><Trans>Read the documentation</Trans></span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

DisplayMfaPolicyAdministration.propTypes = {
  context: PropTypes.object, // Application context
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminMfaPolicyContext: PropTypes.object, // The admin mfa context context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withAdministrationWorkspace(withAdminMfaPolicy(withTranslation('common')(DisplayMfaPolicyAdministration))));
