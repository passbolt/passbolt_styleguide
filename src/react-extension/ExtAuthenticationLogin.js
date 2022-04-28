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
import {BrowserRouter as Router} from "react-router-dom";
import AppContext from "./contexts/AppContext";
import TranslationProvider from "./components/Common/Internationalisation/TranslationProvider";
import AuthenticationLoginContextProvider from "./contexts/Authentication/AuthenticationLoginContext";
import SiteSettings from "../shared/lib/Settings/SiteSettings";
import UserSettings from "../shared/lib/Settings/UserSettings";
import OrchestrateLoginBoxMain from "./components/AuthenticationLogin/OrchestrateLogin/OrchestrateLoginBoxMain";
import Footer from "./components/Common/Footer/Footer";
import OrchestrateLoginBoxFooter from "./components/AuthenticationLogin/OrchestrateLogin/OrchestrateLoginBoxFooter";

/**
 * The login application served by the browser extension.
 */
class ExtAuthenticationLogin extends Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState(props);
  }

  async componentDidMount() {
    this.removeSkeleton();
    await this.initializeUserSettings();
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

  /**
   * Returns the component default state
   */
  defaultState(props) {
    return {
      port: props.port, // The background page communication port
      storage: props.storage, // The storage
      siteSettings: null, // The site settings
      extensionVersion: null, // The extension version
      locale: null, // The locale

      // Locale
      onUpdateLocaleRequested: this.onUpdateLocaleRequested.bind(this),
    };
  }

  isReady() {
    return this.state.siteSettings !== null && this.state.locale !== null;
  }

  /**
   * Initialize the user settings.
   * @returns {Promise<void>}
   */
  async initializeUserSettings() {
    const storageData = await this.props.storage.local.get(["_passbolt_data"]);
    const userSettings = new UserSettings(storageData._passbolt_data.config);
    await this.setState({userSettings});
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
    const extensionVersion = await this.props.port.request("passbolt.addon.get-version");
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
          <Router>
            <AuthenticationLoginContextProvider>
              <div id="container" className="container page login">
                <div className="content">
                  <div className="header">
                    <div className="logo"><span className="visually-hidden">Passbolt</span></div>
                  </div>
                  <div className="login-form">
                    <OrchestrateLoginBoxMain/>
                  </div>
                  <div className="login-box-footer">
                    <OrchestrateLoginBoxFooter/>
                  </div>
                </div>
              </div>
              <Footer/>
            </AuthenticationLoginContextProvider>
          </Router>
        </TranslationProvider>
        }
      </AppContext.Provider>
    );
  }
}

ExtAuthenticationLogin.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default ExtAuthenticationLogin;

