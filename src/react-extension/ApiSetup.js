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
import ApiSetupContextProvider from "./contexts/ApiSetupContext";
import {ApiClientOptions} from "./lib/apiClient/apiClientOptions";
import OrchestrateApiSetup from "./components/AuthenticationSetup/OrchestrateApiSetup/OrchestrateApiSetup";
import Footer from "./components/Footer/Footer";
import {ApiClient} from "./lib/apiClient/apiClient";
import SiteSettings from "./lib/Settings/SiteSettings";
import TranslationProvider from "./components/Internationalisation/TranslationProvider";

/**
 * The setup application served by the API.
 */
class ApiSetup extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.userId = null; // The setup user id
    this.token = null; // The setup token
    this.initializeProperties();
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
      locale: null, // The locale
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.getSiteSettings();
    this.getLocale();
  }

  /**
   * Initialize properties
   */
  initializeProperties() {
    const uuidRegex = "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}";
    const setupBootstrapRegex = `setup\/install\/(${uuidRegex})\/(${uuidRegex})$`;
    const regex = new RegExp(setupBootstrapRegex);
    const match = window.location.pathname.match(regex);
    if (!match) {
      console.error("Unable to retrieve the user id and token from the url");
      return;
    }
    this.userId = match[1];
    this.token = match[2];
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
      .setBaseUrl(this.state.trustedDomain);
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
   * Get the locale to use to translate the application
   * @returns {string|string}
   */
  getLocale() {
    this.setState({locale: this.guessLocale()});
  }

  /**
   * Guess the locale to use to translate the application
   * @returns {string|string}
   */
  guessLocale() {
    const locale = navigator.language;
    const supportedLocales = Object.keys(this.state.siteSettings.supportedLocales);
    if (supportedLocales.includes(locale)) {
      return locale;
    }

    const nonExplicitLanguage = locale.split('-')[0];
    const similarLanguage = supportedLocales.find(supportedLanguage => nonExplicitLanguage === supportedLanguage.split('-')[0]);
    if (similarLanguage) {
      return similarLanguage;
    }

    return this.state.siteSettings.locale;
  }

  isReady() {
    return this.state.siteSettings !== null && this.state.locale !== null;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.isReady() &&
        <TranslationProvider loadingPath={`${this.state.trustedDomain}/locales/{{lng}}/{{ns}}.json`}>
          <div id="container" className="container page login">
            <div className="content">
              <div className="header">
                <div className="logo"><span className="visually-hidden">Passbolt</span></div>
              </div>
              <div className="login-form">
                <ApiSetupContextProvider value={{userId: this.userId, token: this.token}}>
                  <OrchestrateApiSetup/>
                </ApiSetupContextProvider>
              </div>
            </div>
          </div>
          <Footer/>
        </TranslationProvider>
        }
      </AppContext.Provider>
    );
  }
}

export default ApiSetup;
