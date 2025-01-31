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

import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import PropTypes from "prop-types";
import {MfaSettingsWorkflowStates, Providers, withMfa} from "../../../contexts/MFAContext";
import MfaProviders from "./MfaProviders.data";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";
import {withNavigationContext} from "../../../contexts/NavigationContext";

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
    const trustedDomain = this.props.context.userSettings.getTrustedDomain();
    const url = new URL(trustedDomain);
    return url.protocol === "https:";
  }

  /**
   * Return the allowed providers by organization
   */
  get organisationMfaProviders() {
    const providers = this.props.mfaContext.getMfaOrganisationSettings();
    if (!this.canUseDuoProvider) {
      delete providers.duo;
    }
    return providers;
  }

  /**
   * Return the mfa settings from the user
   */
  get userMfaSettings() {
    const settings = this.props.mfaContext.getMfaUserSettings();
    if (!this.canUseDuoProvider) {
      delete settings.duo;
    }
    return settings;
  }

  /**
   * Return the provider
   * @param {string} provider
   */
  getProvider(provider) {
    return MfaProviders.find(mfaProvider => mfaProvider.id === provider);
  }

  /**
   * Returns true if the component must be in a processing mode
   */
  get isProcessing() {
    return this.props.mfaContext.isProcessing();
  }

  /**
   * Can the user confige a dup provider.
   * @returns {bool}
   */
  get canUseDuoProvider() {
    return this.props.rbacContext.canIUseUiAction(uiActions.DUO_CONFIGURATION);
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
          this.props.mfaContext.navigate(MfaSettingsWorkflowStates.SETUPDUO);
          break;
        case Providers.YUBIKEY:
          this.props.mfaContext.navigate(MfaSettingsWorkflowStates.SETUPYUBIKEY);
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
            {
              !this.isProcessing && <>
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
                      {this.organisationMfaProviders["totp"] && <li id="totp">
                        <a href="#" onClick={() => this.handleProviderClick("totp")}>
                          <div className="provider-img">
                            {this.getProvider("totp").icon}
                          </div>
                          <span className="provider-name">{this.getProvider("totp").name}</span>
                        </a>
                        <div className={`mfa-provider-status ${this.userMfaSettings["totp"]}`}>
                          {this.userMfaSettings["totp"] ? <Trans>Enabled</Trans> : <Trans>Disabled</Trans>}
                        </div>
                      </li>}
                      {this.organisationMfaProviders["duo"] && <li id="duo">
                        <a href="#" onClick={() => this.handleProviderClick("duo")}>
                          <div className="provider-img">
                            {this.getProvider("duo").icon}
                          </div>
                          <span className="provider-name">{this.getProvider("duo").name}</span>
                        </a>
                        <div className={`mfa-provider-status ${this.userMfaSettings["duo"]}`}>
                          {this.userMfaSettings["duo"] ? <Trans>Enabled</Trans> : <Trans>Disabled</Trans>}
                        </div>
                      </li>}
                      {this.organisationMfaProviders["yubikey"] && <li id="yubikey">
                        <a href="#" onClick={() => this.handleProviderClick("yubikey")}>
                          <div className="provider-img">
                            {this.getProvider("yubikey").icon}
                          </div>
                          <span className="provider-name">{this.getProvider("yubikey").name}</span>
                        </a>
                        <div className={`mfa-provider-status ${this.userMfaSettings["yubikey"]}`}>
                          {this.userMfaSettings["yubikey"] ? <Trans>Enabled</Trans> : <Trans>Disabled</Trans>}
                        </div>
                      </li>}
                    </ul>
                  </>
                }</>
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
  rbacContext: PropTypes.any, // The role based access control context
  navigationContext: PropTypes.any, // The application navigation context
};

export default withAppContext(withMfa(withRbac(withNavigationContext(withTranslation("common")(DisplayProviderList)))));
