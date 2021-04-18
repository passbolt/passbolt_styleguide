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
import AuthenticationContextProvider from "./contexts/AuthenticationContext";
import ManageDialogs from "./components/Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "./contexts/DialogContext";
import SetupAuthentication from "./components/AuthenticationSetup/SetupAuthentication/SetupAuthentication";
import SiteSettings from "./lib/Settings/SiteSettings";
import Footer from "./components/Common/Footer/Footer";
import AppContext from "./contexts/AppContext";
import TranslationProvider from "./components/Common/Internationalisation/TranslationProvider";

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
    this.state = this.defaultState;
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      siteSettings: null, // The site settings
      extensionVersion: null, // The extension version
      locale: null, // The locale

      // Locale
      onUpdateLocaleRequested: this.onUpdateLocaleRequested.bind(this),
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
    this.getLocale();
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
   * Get the locale
   */
  async getLocale() {
    const {locale} = await this.props.port.request("passbolt.locale.get");
    this.setState({locale});
  }

  /**
   * Whenever the update of the locale is requested
   */
  async onUpdateLocaleRequested() {
    const {locale} = await this.props.port.request("passbolt.locale.get");
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
          <AuthenticationContextProvider value={this.defaultContextValue}>
            <DialogContextProvider>
              <div id="container" className="container page login">
                <ManageDialogs/>
                <div className="content">
                  <div className="header">
                    <div className="logo"><span className="visually-hidden">Passbolt</span></div>
                  </div>
                  <div className="login-form">
                    <SetupAuthentication siteSettings={this.state.siteSettings}/>
                  </div>
                </div>
              </div>
              <Footer/>
            </DialogContextProvider>
          </AuthenticationContextProvider>
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
