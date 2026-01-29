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
import React, { Component } from "react";
import AppContext from "../shared/context/AppContext/AppContext";
import ApiRecoverContextProvider from "./contexts/ApiRecoverContext";
import OrchestrateApiRecover from "./components/AuthenticationRecover/OrchestrateApiRecover/OrchestrateApiRecover";
import { ApiClientOptions } from "../shared/lib/apiClient/apiClientOptions";
import Footer from "./components/Common/Footer/Footer";
import { ApiClient } from "../shared/lib/apiClient/apiClient";
import SiteSettings from "../shared/lib/Settings/SiteSettings";
import TranslationProvider from "./components/Common/Internationalisation/TranslationProvider";
import ChangeApiRecoverLocale from "./components/Internationalisation/ChangeLocale/ChangeApiRecoverLocale";
import LogoSVG from "../img/svg/logo.svg";

/**
 * The recover application served by the API.
 */
class ApiRecover extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.userId = null; // The recover user id
    this.token = null; // The recover token
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

      // Locale
      onUpdateLocaleRequested: this.onUpdateLocaleRequested.bind(this),
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    const siteSettings = await this.getSiteSettings();
    this.initLocale(siteSettings);
  }

  /**
   * Initialize properties
   */
  initializeProperties() {
    const uuidRegex = "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}";
    const recoverBootstrapRegex = `(setup\/recover|setup\/recover\/start)\/(${uuidRegex})\/(${uuidRegex})$`;
    const regex = new RegExp(recoverBootstrapRegex);
    const match = window.location.pathname.match(regex);
    if (!match) {
      console.error("Unable to retrieve the user id and token from the url");
      return;
    }
    this.userId = match[2];
    this.token = match[3];
  }

  /**
   * Get the application base url
   * @return {string}
   */
  get baseUrl() {
    const baseElement = document.getElementsByTagName("base") && document.getElementsByTagName("base")[0];
    if (baseElement) {
      return baseElement.attributes.href.value.replace(/\/*$/g, "");
    }
    console.error("Unable to retrieve the page base tag");
    return "";
  }

  /**
   * Get the API client options
   * @returns {ApiClientOptions}
   */
  getApiClientOptions() {
    return new ApiClientOptions().setBaseUrl(this.state.trustedDomain);
  }

  /**
   * Retrieve the site settings
   * @returns {Promise<SiteSettings>}
   */
  async getSiteSettings() {
    const apiClientOptions = this.getApiClientOptions().setResourceName("settings");
    const apiClient = new ApiClient(apiClientOptions);
    const { body } = await apiClient.findAll();
    const siteSettings = new SiteSettings(body);
    this.setState({ siteSettings });
    return siteSettings;
  }

  /**
   * Init the locale following this priority:
   * 1. The browser url locale if passed in argument;
   *    It allows us to offer a consistent experience when the browser page is reloaded to detect the browser extension
   *    but this one is not yet installed.
   * 2. The browser locale if supported;
   * 3. The browser similar locale;
   * 4. The organization locale;
   * @param {SiteSettings} siteSettings The site settings
   * @warning Require the site settings to be fetch to work.
   */
  initLocale(siteSettings) {
    const locale =
      this.getUrlLocale(siteSettings) ||
      this.getBrowserLocale(siteSettings) ||
      this.getBrowserSimilarLocale(siteSettings) ||
      siteSettings.locale;
    this.setState({ locale });
  }

  /**
   * Get the locale from the url i.e. ?locale=en-UK
   * @param {SiteSettings} siteSettings The site settings
   * @returns {string}
   */
  getUrlLocale(siteSettings) {
    const url = new URL(window.location.href);
    const locale = url.searchParams.get("locale");
    if (locale) {
      const urlLocale = siteSettings.supportedLocales.find((supportedLocale) => locale === supportedLocale.locale);
      if (urlLocale) {
        return urlLocale.locale;
      }
    }
  }

  /**
   * Get the browser locale if supported.
   * @param {SiteSettings} siteSettings The site settings
   * @returns {string}
   */
  getBrowserLocale(siteSettings) {
    const browserSupportedLocale = siteSettings.supportedLocales.find(
      (supportedLocale) => navigator.language === supportedLocale.locale,
    );
    if (browserSupportedLocale) {
      return browserSupportedLocale.locale;
    }
  }

  /**
   * Get the browser similar locale if supported.
   * @param {SiteSettings} siteSettings The site settings
   * @returns {string}
   */
  getBrowserSimilarLocale(siteSettings) {
    const nonExplicitLanguage = navigator.language.split("-")[0];
    const similarSupportedLocale = siteSettings.supportedLocales.find(
      (supportedLocale) => nonExplicitLanguage === supportedLocale.locale.split("-")[0],
    );
    if (similarSupportedLocale) {
      return similarSupportedLocale.locale;
    }
  }

  /**
   * Whenever the update of the locale is requested
   * @param {string} locale The locale identifier
   */
  async onUpdateLocaleRequested(locale) {
    await this.setState({ locale });
    this.setUrlLocale(locale);
  }

  /**
   * Update the locale url parameter.
   * @param locale
   */
  setUrlLocale(locale) {
    const url = new URL(window.location.href);
    url.searchParams.set("locale", locale);
    window.history.replaceState(null, null, url);
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
        {this.isReady() && (
          <TranslationProvider loadingPath={`${this.state.trustedDomain}/locales/{{lng}}/{{ns}}.json`}>
            <ApiRecoverContextProvider value={{ userId: this.userId, token: this.token }}>
              <div id="container" className="container page login">
                <div className="content">
                  <div className="header">
                    <div className="logo-svg">
                      <LogoSVG role="img" width="20rem" height="3.5rem" />
                    </div>
                  </div>
                  <div className="login-form">
                    <OrchestrateApiRecover />
                  </div>
                  <ChangeApiRecoverLocale />
                </div>
                <Footer />
              </div>
            </ApiRecoverContextProvider>
          </TranslationProvider>
        )}
      </AppContext.Provider>
    );
  }
}

export default ApiRecover;
