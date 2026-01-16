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
 * @since         3.9.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withActionFeedback } from "../../../contexts/ActionFeedbackContext";
import { withAdministrationWorkspace } from "../../../contexts/AdministrationWorkspaceContext";
import { Trans, withTranslation } from "react-i18next";
import Select from "../../Common/Select/Select";
import DisplayAdministrationSsoActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSsoActions/DisplayAdministrationSsoActions";
import { withAdminSso } from "../../../contexts/AdminSsoContext";
import SsoProviders from "./SsoProviders.data";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import AzureSsoProviderForm from "./SsoProviderForm/AzureSsoProviderForm";
import GoogleSsoProviderForm from "./SsoProviderForm/GoogleSsoProviderForm";
import OAuth2SsoProviderForm from "./SsoProviderForm/OAuth2SsoProviderForm";
import AdfsSsoProviderForm from "./SsoProviderForm/AdfsSsoProviderForm";
import AzureSsoSettingsEntity from "../../../../shared/models/entity/ssoSettings/AzureSsoSettingsEntity";
import GoogleSsoSettingsEntity from "../../../../shared/models/entity/ssoSettings/GoogleSsoSettingsEntity";
import OAuth2SsoSettingsEntity from "../../../../shared/models/entity/ssoSettings/OAuth2SsoSettingsEntity";
import AdfsSsoSettingsEntity from "../../../../shared/models/entity/ssoSettings/AdfsSsoSettingsEntity";
import { createSafePortal } from "../../../../shared/utils/portals";
import FileTextSVG from "../../../../img/svg/file_text.svg";
import GoSVG from "../../../../img/svg/go.svg";

/**
 * This component displays the SSO administration settings
 */
class ManageSsoSettings extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      loading: true,
      providers: [],
    };
  }

  async componentDidMount() {
    await this.props.adminSsoContext.loadSsoConfiguration();
    this.setState({
      loading: false,
      providers: this.props.adminSsoContext.getProviderList() || [],
    });
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleProviderInputChange = this.handleProviderInputChange.bind(this);
    this.handleSsoSettingToggle = this.handleSsoSettingToggle.bind(this);
  }

  /**
   * Handle provider input change.
   */
  handleProviderInputChange(event) {
    this.props.adminSsoContext.changeProvider({
      id: event.target.value,
    });
  }

  /**
   * Handle the SSO settings toggle
   */
  handleSsoSettingToggle() {
    const isToggleEnabled = this.props.adminSsoContext.isSsoConfigActivated();
    if (isToggleEnabled) {
      this.props.adminSsoContext.disableSso();
    }
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.props.adminSsoContext.isProcessing() || this.state.loading;
  }

  /**
   * Get all the SSO providers the browser extension knows.
   * Also, sets the `disabled` flag to the provider that are not known/activated on the API.
   * @returns {Array<object>}
   */
  get allSsoProviders() {
    const apiSupportedProvider = this.state.providers;
    return (
      SsoProviders.map((bextKnownProvider) => {
        const newProvider = { ...bextKnownProvider };
        newProvider.disabled = Boolean(newProvider.disabled) || !apiSupportedProvider.includes(newProvider.id);
        return newProvider;
      })
        // make sure to hide the providers we want to hide if their are not available on the API
        .filter((provider) => !provider.disabled || (provider.disabled && !provider?.hiddenIfDisabled))
    );
  }

  /**
   * Get the supported SSO providers.
   * @returns {Array<{value: string, label: string}}
   */
  get supportedSsoProviders() {
    const providerIdList = this.state.providers;
    /*
     * providers must be known on both side (API / Bext) in order to work.
     * Obviously, the API can't work with an unknown provider.
     * On Bext side, we can't provide a third-party SSO provider specific form if it's is unknown
     */
    const providerDataList = [];
    providerIdList.forEach((providerId) => {
      const providerData = SsoProviders.find((provider) => provider.id === providerId);
      if (providerData && !providerData.disabled) {
        providerDataList.push({
          value: providerData.id,
          label: providerData.name,
        });
      }
    });
    return providerDataList;
  }

  /**
   * Returns true if the data is loaded.
   * Useful to avoid UI blinking during data loading.
   * @returns {boolean}
   */
  isReady() {
    return this.props.adminSsoContext.isDataReady();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const ssoContext = this.props.adminSsoContext;
    const ssoConfig = ssoContext.getSsoConfiguration();
    const isSsoActivated = ssoContext.isSsoConfigActivated();
    return (
      <div className="row">
        <div className="third-party-provider-settings sso-settings main-column">
          <div className="main-content">
            <h3 className="title">
              <span className="input toggle-switch form-element">
                <input
                  type="checkbox"
                  className="toggle-switch-checkbox checkbox"
                  name="ssoToggle"
                  onChange={this.handleSsoSettingToggle}
                  checked={isSsoActivated}
                  disabled={this.hasAllInputDisabled()}
                  id="ssoToggle"
                />
                <label htmlFor="ssoToggle">
                  <Trans>Single Sign-On</Trans>
                </label>
              </span>
            </h3>
            {this.isReady() && !isSsoActivated && (
              <>
                <h4 className="no-border">
                  <Trans>Select a provider</Trans>
                </h4>
                <div className="provider-list">
                  {this.allSsoProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className={`provider button ${provider.disabled ? "disabled" : ""}`}
                      id={provider.id}
                      onClick={() => this.props.adminSsoContext.changeProvider(provider)}
                    >
                      <div className="provider-logo">{provider.icon}</div>
                      <p className="provider-name">
                        {provider.name}
                        <br />
                        {provider.disabled && <Trans>(not yet available)</Trans>}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
            {this.isReady() && isSsoActivated && (
              <form className="form">
                <div className="select-wrapper input">
                  <label htmlFor="sso-provider-input">
                    <Trans>Single Sign-On provider</Trans>
                  </label>
                  <Select
                    id="sso-provider-input"
                    name="provider"
                    items={this.supportedSsoProviders}
                    value={ssoConfig?.provider}
                    onChange={this.handleProviderInputChange}
                  />
                </div>
                {ssoConfig?.provider === AzureSsoSettingsEntity.PROVIDER_ID && <AzureSsoProviderForm />}
                {ssoConfig?.provider === GoogleSsoSettingsEntity.PROVIDER_ID && <GoogleSsoProviderForm />}
                {ssoConfig?.provider === OAuth2SsoSettingsEntity.PROVIDER_ID && <OAuth2SsoProviderForm />}
                {ssoConfig?.provider === AdfsSsoSettingsEntity.PROVIDER_ID && <AdfsSsoProviderForm />}
              </form>
            )}
          </div>
          {this.props.adminSsoContext.hasFormChanged() && (
            <div className="warning message" id="sso-setting-overridden-banner">
              <div>
                <p>
                  <Trans>Don&apos;t forget to save your settings to apply your modification.</Trans>
                </p>
              </div>
            </div>
          )}
        </div>
        <DisplayAdministrationSsoActions />
        {createSafePortal(
          <>
            <div className="sidebar-help-section warning message" id="sso-setting-security-warning-banner">
              <h3>
                <Trans>Important notice:</Trans>
              </h3>
              <p>
                <Trans>Enabling SSO changes the security risks.</Trans>{" "}
                <Trans>
                  For example an attacker with a local machine access maybe be able to access secrets, if the user is
                  still logged in with the Identity provider.
                </Trans>{" "}
                <Trans>Make sure users follow screen lock best practices.</Trans>
                &nbsp;
                <a href="https://passbolt.com/docs/admin/authentication/sso/" target="_blank" rel="noopener noreferrer">
                  <Trans>Learn more</Trans>
                </a>
              </p>
            </div>
            <div className="sidebar-help-section">
              <h3>
                <Trans>Need some help?</Trans>
              </h3>
              <p>
                <Trans>For more information about SSO, checkout the dedicated page on the help website.</Trans>
              </p>
              <a
                className="button"
                href="https://passbolt.com/docs/admin/authentication/sso/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileTextSVG />
                <span>
                  <Trans>Read the documentation</Trans>
                </span>
              </a>
            </div>
            {ssoConfig?.provider === AzureSsoSettingsEntity.PROVIDER_ID && (
              <div className="sidebar-help-section">
                <h3>
                  <Trans>How do I configure a AzureAD SSO?</Trans>
                </h3>
                <a
                  className="button"
                  href="https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-setup-sso"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoSVG />
                  <span>
                    <Trans>Read the documentation</Trans>
                  </span>
                </a>
              </div>
            )}
            {ssoConfig?.provider === GoogleSsoSettingsEntity.PROVIDER_ID && (
              <div className="sidebar-help-section">
                <h3>
                  <Trans>How do I configure a Google SSO?</Trans>
                </h3>
                <a
                  className="button"
                  href="https://developers.google.com/identity/openid-connect/openid-connect"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoSVG />
                  <span>
                    <Trans>Read the documentation</Trans>
                  </span>
                </a>
              </div>
            )}
            {ssoConfig?.provider === AdfsSsoSettingsEntity.PROVIDER_ID && (
              <div className="sidebar-help-section">
                <h3>
                  <Trans>How do I configure an AD FS SSO?</Trans>
                </h3>
                <a
                  className="button"
                  href="https://learn.microsoft.com/en-gb/microsoft-365/troubleshoot/active-directory/set-up-adfs-for-single-sign-on"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoSVG />
                  <span>
                    <Trans>Read the documentation</Trans>
                  </span>
                </a>
              </div>
            )}
          </>,
          document.getElementById("administration-help-panel"),
        )}
      </div>
    );
  }
}

ManageSsoSettings.propTypes = {
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
  adminSsoContext: PropTypes.object, // The administration sso configuration context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  context: PropTypes.any, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withActionFeedback(withAdministrationWorkspace(withAdminSso(withTranslation("common")(ManageSsoSettings)))),
);
