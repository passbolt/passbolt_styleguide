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
 * @since         2.12.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import AppContext from "./contexts/AppContext";
import TranslationProvider from "./components/Common/Internationalisation/TranslationProvider";
import AuthenticationRecoverContextProvider from "./contexts/Authentication/AuthenticationRecoverContext";
import RecoverAuthentication from "./components/AuthenticationRecover/RecoverAuthentication/RecoverAuthentication";
import SiteSettings from "../shared/lib/Settings/SiteSettings";
import Footer from "./components/Common/Footer/Footer";
import ChangeLocale from "./components/Internationalisation/ChangeLocale/ChangeLocale";

/**
 * The recover application served by the browser extension.
 */
class ExtAuthenticationRecover extends Component {
  /**
   * Default constructor
   * @param {object} props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState(props);
  }

  /**
   * Returns the component default state
   * @param {object} props The component props
   */
  defaultState(props) {
    return {
      port: props.port, // The background page communication port.
      siteSettings: null, // The site settings
      extensionVersion: null, // The extension version

      // Locale
      locale: null, // The locale
      onUpdateLocaleRequested: this.onUpdateLocaleRequested.bind(this),
      initLocale: this.initLocale.bind(this), // Recover require to re-init the locale after the recover start retrieved the user locale.
    };
  }

  /**
   * Returns the component default state
   */
  get defaultContextValue() {
    return {
      port: this.props.port,
      storage: this.props.storage,
      trustedDomain: null, // The site domain (use trusted domain for compatibility with browser extension applications)
    };
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    this.removeSkeleton();
    await this.getSiteSettings();
    await this.getExtensionVersion();
    await this.initLocale();
  }

  /**
   * Remove skeleton preloaded in html if any
   */
  removeSkeleton() {
    const skeleton = document.getElementById("temporary-skeleton");
    if (skeleton) {
      skeleton.remove();
    }
  }

  isReady() {
    return this.state.siteSettings !== null && this.state.locale !== null;
  }

  /**
   * Get the list of site settings from background page and set it in the state
   * Using SiteSettings
   */
  async getSiteSettings() {
    const settings = await this.props.port.request("passbolt.organization-settings.get");
    const siteSettings = new SiteSettings(settings);
    const trustedDomain = siteSettings.url;
    this.setState({siteSettings, trustedDomain});
  }

  /**
   * Get extension version
   */
  async getExtensionVersion() {
    const extensionVersion = await this.props.port.request('passbolt.addon.get-version');
    this.setState({extensionVersion});
  }

  /**
   * Init the locale
   */
  async initLocale() {
    const {locale} = await this.props.port.request("passbolt.locale.get");
    this.setState({locale});
  }

  /**
   * Whenever the update of the locale is requested
   * @param {string} locale The locale identifier
   */
  async onUpdateLocaleRequested(locale) {
    const localeDto = {locale};
    await this.props.port.request("passbolt.locale.update-user-locale", localeDto);
    this.setState({locale});
  }

  /**
   * Renders the component
   */
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.isReady() &&
        <TranslationProvider loadingPath="/data/locales/{{lng}}/{{ns}}.json">
          <AuthenticationRecoverContextProvider>
            <div id="container" className="container page login">
              <div className="content">
                <div className="header">
                  <div className="logo"><span className="visually-hidden">Passbolt</span></div>
                </div>
                <div className="login-form">
                  <RecoverAuthentication/>
                </div>
                <ChangeLocale/>
              </div>
            </div>
            <Footer/>
          </AuthenticationRecoverContextProvider>
        </TranslationProvider>
        }
      </AppContext.Provider>
    );
  }
}

ExtAuthenticationRecover.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};
export default ExtAuthenticationRecover;
