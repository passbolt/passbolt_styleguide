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

import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import PropTypes from "prop-types";
import {MfaSettingsWorkflowStates, Providers, withMfa} from "../../../contexts/MFAContext";
import MfaProviders from "./MfaProviders.data";

/**
 * This component will display the Mfa provider enabled/disabled and allowed
 */
class DisplayProviderList extends Component {
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
    this.handleProviderClick = this.handleProviderClick.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.getMfaSettings();
  }

  /**
   * retrieve the mfa policies and settings
   */
  async getMfaSettings() {
    await this.props.mfaContext.findMfaSettings();
  }

  /**
   * Returns true if the current URL is using the protocol HTTPS
   * @returns {boolean}
   */
  get isRunningUnderHttps() {
    const trustedDomain = this.props.context.userSettings?.getTrustedDomain();
    const url = new URL(trustedDomain);
    return url.protocol === "https:";
  }

  /**
   * Return the allowed providers by organization
   */
  get organisationMfaProviders() {
    return this.props.mfaContext.getMfaOrganisationSettings();
  }

  /**
   * Return the mfa settings from the user
   */
  get userMfaSettings() {
    return this.props.mfaContext.getMfaUserSettings();
  }

  /**
   * Return the provider
   * @param {string} provider
   */
  getProvider(provider) {
    return MfaProviders.find(mfaProvider => mfaProvider.id === provider);
  }

  /**
   * handle provider click
   * @param {string} provider
   */
  handleProviderClick(provider) {
    const mfaUserSettings = this.props.mfaContext.getMfaUserSettings();
    this.props.mfaContext.setProvider(provider);
    if (mfaUserSettings[provider]) {
      this.props.mfaContext.navigate(MfaSettingsWorkflowStates.VIEWCONFIGURATION);
    } else {
      switch (provider) {
        case Providers.TOTP:
          this.props.mfaContext.navigate(MfaSettingsWorkflowStates.TOTPOVERVIEW);
          break;
        case Providers.DUO:
          //Todo
          break;
        case Providers.YUBIKEY:
          //Todo
          break;
      }
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="grid grid-responsive-12">
        <div className="row mfa-provider-list">
          <div className="mfa-setup col8 main-column">
            <h3><Trans>Multi factor authentication</Trans></h3>
            {!this.isRunningUnderHttps &&
             <p className="description"><Trans>Sorry the multi factor authentication feature is only available in a secure context (HTTPS).</Trans></p>
            }
            {
              this.isRunningUnderHttps && !this.props.mfaContext.hasMfaOrganisationSettings() && <>
                <h4 className="no-border"><Trans>Sorry no multi factor authentication is enabled for this organization.</Trans></h4>
                <p className="description"><Trans>Please contact your administrator to enable multi-factor authentication.</Trans></p>
              </>
            }
            {
              this.isRunningUnderHttps && this.props.mfaContext.hasMfaOrganisationSettings() && <>
                <h4 className="no-border"><Trans>Please select a provider</Trans></h4>
                <ul className="mfa-providers">
                  {
                    Object.entries(this.organisationMfaProviders).map(([key, value]) => (
                      value && <li key={key} id={key}>
                        <a href="#" onClick={() => this.handleProviderClick(key)}>
                          <div className="provider-img">
                            {this.getProvider(key).icon}
                          </div>
                          <span className="provider-name">{this.getProvider(key).name}</span>
                        </a>
                        <div className={`mfa-provider-status ${this.userMfaSettings[key]}`}>
                          {this.userMfaSettings[key] ? <Trans>Enabled</Trans> : <Trans>Disabled</Trans>}
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </>
            }
          </div>
          <div className="col4 last">
            <div className="sidebar-help">
              <h3><Trans>What is multi-factor authentication?</Trans></h3>
              <p className="description"><Trans>Multi-factor authentication (MFA) is a method of confirming a user&apos;s identity that requires presenting two or more pieces of evidence (or factor).</Trans></p>
              <a className="button" href="https://help.passbolt.com/start" target="_blank" rel="noopener noreferrer">
                <Icon name="document" />
                <span><Trans>Read the documentation</Trans></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayProviderList.propTypes = {
  context: PropTypes.object, // the app context
  t: PropTypes.func, // The translation function
  mfaContext: PropTypes.object, // The mfa context
};

export default withAppContext(withMfa(withTranslation("common")(DisplayProviderList)));
