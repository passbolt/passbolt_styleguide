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
 * @since         5.17.0
 */
import React, { Component } from "react";
import AppContext from "../shared/context/AppContext/AppContext";
import { ApiClientOptions } from "../shared/lib/apiClient/apiClientOptions";
import ApiMfaVerifyContextProvider from "./contexts/ApiMfaVerifyContext";
import OrchestrateApiMfaVerify from "./components/AuthenticationMfa/OrchestrateApiMfaVerify/OrchestrateApiMfaVerify";
import TranslationProvider from "./components/Common/Internationalisation/TranslationProvider";
import LogoSVG from "../img/svg/logo.svg";

/**
 * The MFA verification application served by the API.
 * Site settings are not reachable before the MFA verification: the locale is the one resolved by the server.
 */
class ApiMfaVerify extends Component {
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
      trustedDomain: this.baseUrl, // The site domain (use trusted domain for compatibility with browser extension applications)
      getApiClientOptions: this.getApiClientOptions.bind(this), // Get the api client options
      locale: this.appElement?.dataset.locale || "en-UK", // The locale
    };
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
   * Get the element carrying the data passed by the server
   * @returns {HTMLElement|null}
   */
  get appElement() {
    return document.getElementById("api-mfa-verify");
  }

  /**
   * Get the sanitized redirect passed by the server
   * @returns {string}
   */
  get redirect() {
    return this.appElement?.dataset.redirect || "/";
  }

  /**
   * Get the API client options
   * @returns {ApiClientOptions}
   */
  getApiClientOptions() {
    return new ApiClientOptions().setBaseUrl(this.state.trustedDomain);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <TranslationProvider loadingPath={`${this.state.trustedDomain}/locales/{{lng}}/{{ns}}.json`}>
          <ApiMfaVerifyContextProvider value={{ redirect: this.redirect }}>
            <div id="container" className="container page login">
              <div className="content">
                <div className="header">
                  <div className="logo-svg">
                    <LogoSVG role="img" width="20rem" height="3.5rem" />
                  </div>
                </div>
                <div className="login-form">
                  <OrchestrateApiMfaVerify />
                </div>
              </div>
            </div>
          </ApiMfaVerifyContextProvider>
        </TranslationProvider>
      </AppContext.Provider>
    );
  }
}

export default ApiMfaVerify;
