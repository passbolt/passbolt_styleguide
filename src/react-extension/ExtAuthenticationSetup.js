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
import AuthenticationSetupContextProvider from "./contexts/Authentication/AuthenticationSetupContext";
import SiteSettings from "../shared/lib/Settings/SiteSettings";
import SetupAuthentication from "./components/AuthenticationSetup/SetupAuthentication/SetupAuthentication";
import Footer from "./components/Common/Footer/Footer";
import ChangeLocale from "./components/Internationalisation/ChangeLocale/ChangeLocale";

/**
 * The setup application served by the browser extension.
 */
class ExtAuthenticationSetup extends Component {
  /**
   * Default constructor
   * @param props Component props
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
    };
  }

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    this.removeSkeleton();
    await this.getSiteSettings();
    await this.getExtensionVersion();
    this.initLocale();
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
    this.setState({siteSettings});
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
    const {locale} = await this.props.port.request("passbolt.setup.get-and-init-locale");
    this.setState({locale});
  }

  /**
   * Whenever the update of the locale is requested
   * @param {string} locale The locale identifier
   */
  async onUpdateLocaleRequested(locale) {
    const localeDto = {locale};
    await this.props.port.request("passbolt.setup.update-locale", localeDto);
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
          <AuthenticationSetupContextProvider>
            <div id="container" className="container page login">
              <div className="content">
                <div className="header">
                  <div className="logo"><span className="visually-hidden">Passbolt</span></div>
                </div>
                <div className="login-form">
                  <SetupAuthentication/>
                </div>
                <ChangeLocale/>
              </div>
            </div>
            <Footer/>
          </AuthenticationSetupContextProvider>
        </TranslationProvider>
        }
      </AppContext.Provider>
    );
  }
}

ExtAuthenticationSetup.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};
export default ExtAuthenticationSetup;
