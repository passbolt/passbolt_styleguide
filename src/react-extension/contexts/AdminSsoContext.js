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
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "./AppContext";
import SsoSettingsService from "../../shared/services/api/sso/SsoSettingsService";
import SsoProviders from "../components/Administration/ManageSsoSettings/SsoProviders.data";
import {withDialog} from "./DialogContext";
import NotifyError from "../components/Common/Error/NotifyError/NotifyError";

export const AdminSsoContext = React.createContext({
  ssoConfig: null, // The current sso configuration
  loadSsoConfiguration: () => {}, // Load the current sso configuration and store it in the state
  getSsoConfiguration: () => {}, // Return the current sso configuration from the context state
  isSsoConfigActivated: () => {}, // Returns true if the sso settings are set to active
  isDataReady: () => {}, // Returns true if the data has been loaded from the API already
  save: () => {}, // Save the sso configuration changes
  disableSso: () => {}, // Disable the SSO configuration
  getProviderList: () => {}, // Returns the list of providers that the API supports
});

/**
 * The related context provider
 */
export class AdminSsoContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    const apiClientOptions = props.context.getApiClientOptions();
    this.ssoSettingsService = new SsoSettingsService(apiClientOptions);
    this.providerList = [];
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      ssoConfig: null, // The current sso configuration
      isLoaded: false, // is the SSO settings data loading from the server finished
      isDataReady: this.isDataReady.bind(this), // returns true if the data has been loaded from the API already
      loadSsoConfiguration: this.loadSsoConfiguration.bind(this), // Load the current sso configuration and store it in the state
      getSsoConfiguration: this.getSsoConfiguration.bind(this), // Return the current sso configuration from the context state
      isSsoConfigActivated: this.isSsoConfigActivated.bind(this), // Returns true if the sso settings are set to active
      save: this.save.bind(this), // Save the sso configuration changes
      changeProvider: this.changeProvider.bind(this), // change the provider
      disableSso: this.disableSso.bind(this), // Disable the SSO configuration
      setValue: this.setValue.bind(this), // Set an SSO settings value to the current config
      getProviderList: this.getProviderList.bind(this), // Returns the list of providers that the API supports
    };
  }

  /**
   * Find the sso configuration
   * @return {Promise<void>}
   */
  async loadSsoConfiguration() {
    let ssoConfig = null;
    try {
      ssoConfig = await this.ssoSettingsService.find();
      this.setProviderList(ssoConfig.providers);
      if (ssoConfig?.provider) {
        const providerData = SsoProviders.find(provider => provider.id === ssoConfig.provider);
        ssoConfig.data.redirect_url = providerData.defaultConfig.redirect_url;
      }
    } catch (error) {
      this.setProviderListFromBext();
      this.props.dialogContext.open(NotifyError, {error});
    }

    this.setState({
      ssoConfig: {
        provider: ssoConfig?.provider,
        data: ssoConfig?.data
      },
      isLoaded: true
    });
  }

  /**
   * Sets the list of provider compatible with the API and the browser extension.
   *
   * @param {Array<string>} providerIdList
   * @private
   */
  setProviderList(providerIdList) {
    /*
     * providers must be known on both side (API / Bext) in order to work.
     * Obviously, the API can't work with an unknown provider.
     * On Bext side, we can't provide a third-party SSO provider specific form if it's is unknown
     */
    providerIdList.forEach(providerId => {
      const provider = SsoProviders.find(provider => provider.id === providerId);
      if (provider && !provider.disabled) {
        this.providerList.push(provider);
      }
    });
  }

  /**
   * Sets the list of provider from the data known by the browser extension only.
   *
   * @private
   */
  setProviderListFromBext() {
    SsoProviders.forEach(provider => {
      if (!provider.disabled) {
        this.providerList.push(provider);
      }
    });
  }

  /**
   * Get the current sso config from the context's state.
   * @returns {Object}
   */
  getSsoConfiguration() {
    return this.state.ssoConfig;
  }

  /**
   * Get the current list of third party sso provider compatible with the API.
   * @returns {Object}
   */
  getProviderList() {
    return this.providerList;
  }

  /**
   * Returns true if the sso settings are set to active.
   * @returns {boolean}
   */
  isSsoConfigActivated() {
    return Boolean(this.state.ssoConfig?.provider);
  }

  /**
   * Set an SSO settings value to the current config
   * @param {string} key
   * @param {string} value
   */
  setValue(key, value) {
    const ssoConfig = this.getSsoConfiguration();
    ssoConfig.data[key] = value;
    this.setState({ssoConfig});
  }

  /**
   * Whenever the save has been requested
   * @param {Object} ssoConfig The current sso configuration
   */
  async save(ssoConfig) {
    //@todo @mock
    this.setState({ssoConfig});
    console.log("Saved sso config:", ssoConfig);
  }

  /**
   * Disable the Sso configuration.
   */
  disableSso() {
    this.setState({
      ssoConfig: {
        provider: null,
        data: {}
      }
    });
  }

  /**
   * Returns true if the data has finished to be loaded from the server.
   * @returns {boolean}
   */
  isDataReady() {
    return this.state.isLoaded;
  }

  /**
   * Change the currently selected provider.
   */
  changeProvider(provider) {
    if (provider.disabled) {
      return;
    }

    const selectedProvider = this.providerList.find(p => p.id === provider.id);

    this.setState({
      ssoConfig: {
        provider: selectedProvider.id,
        data: {
          ...selectedProvider?.defaultConfig,
        }
      }
    });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AdminSsoContext.Provider value={this.state}>
        {this.props.children}
      </AdminSsoContext.Provider>
    );
  }
}

AdminSsoContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  children: PropTypes.any, // The children components
  accountRecoveryContext: PropTypes.object, // The account recovery context
  dialogContext: PropTypes.object, // The dialog context
};
export default withAppContext(withDialog(AdminSsoContextProvider));

/**
 * Resource Workspace Context Consumer HOC
 * @param WrappedComponent
 */
export function withAdminSso(WrappedComponent) {
  return class WithAdminSso extends React.Component {
    render() {
      return (
        <AdminSsoContext.Consumer>
          {
            adminSsoContext => <WrappedComponent adminSsoContext={adminSsoContext} {...this.props} />
          }
        </AdminSsoContext.Consumer>
      );
    }
  };
}
