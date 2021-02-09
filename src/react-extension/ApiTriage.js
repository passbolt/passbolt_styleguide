/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
import React, {Component} from "react";
import AppContext from "./contexts/AppContext";
import {ApiClientOptions} from "./lib/apiClient/apiClientOptions";
import ApiTriageContextProvider from "./contexts/ApiTriageContext";
import OrchestrateApiTriage from "./components/AuthenticationLogin/OrchestrateApiTriage/OrchestrateApiTriage";
import {ApiClient} from "./lib/apiClient/apiClient";
import SiteSettings from "./lib/Settings/SiteSettings";
import Footer from "./components/Footer/Footer";

/**
 * The triage application served by the API.
 */
class ApiTriage extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  /**
   * Returns the component default state
   * @return {object}
   */
  get defaultState() {
    return {
      siteSettings: null, // The site settings
      trustedDomain: this.baseUrl, // The site domain (use trusted domain for compatibility with browser extension applications)
      getApiClientOptions: this.getApiClientOptions.bind(this), // Get the api client options
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.getSiteSettings();
  }

  /**
   * Get the application base url
   * @return {string}
   */
  get baseUrl() {
    const baseElement = document.getElementsByTagName('base') && document.getElementsByTagName('base')[0];
    if (baseElement) {
      return baseElement.attributes.href.value.replace(/\/*$/g, '');
    }
    console.error("Unable to retrieve the page base tag");
    return "";
  }

  /**
   * Get the API client options
   * @returns {ApiClientOptions}
   */
  getApiClientOptions() {
    return new ApiClientOptions()
      .setBaseUrl(this.state.trustedDomain)
      .setCsrfToken(this.getCsrfToken());
  }

  /**
   * Get csrf token
   * @returns {string}
   */
  getCsrfToken() {
    const cookieString = document.cookie;
    if (!cookieString) {
      return undefined;
    }
    const cookieArray = cookieString.split('; ');
    if (!cookieArray) {
      return undefined;
    }
    const csrfCookie = cookieArray.find(row => row.startsWith('csrfToken'));
    if (!csrfCookie) {
      return undefined;
    }
    const csrfToken = csrfCookie.split('=');
    if (csrfToken && csrfToken.length === 2) {
      return csrfToken[1];
    }

    return undefined;
  }

  /**
   * Retrieve the site settings
   * @returns {Promise<SiteSettings>}
   */
  async getSiteSettings() {
    const apiClientOptions = this.getApiClientOptions()
      .setResourceName("settings");
    const apiClient = new ApiClient(apiClientOptions);
    const {body} = await apiClient.findAll();
    const siteSettings = new SiteSettings(body);
    await this.setState({siteSettings});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div id="container" className="container page login">
          <div className="content">
            <div className="header">
              <div className="logo"><span className="visually-hidden">Passbolt</span></div>
            </div>
            <div className="login-form">
              <ApiTriageContextProvider>
                <OrchestrateApiTriage/>
              </ApiTriageContextProvider>
            </div>
          </div>
        </div>
        <Footer siteSettings={this.state.siteSettings}/>
      </AppContext.Provider>
    );
  }
}

export default ApiTriage;
