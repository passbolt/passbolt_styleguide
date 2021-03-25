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
import AuthenticationContextProvider, {AuthenticationContext} from "./contexts/AuthenticationContext";
import ManageDialogs from "../react/components/Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../react/contexts/Common/DialogContext";
import {BrowserRouter as Router} from "react-router-dom";
import OrchestrateLogin from "./components/AuthenticationLogin/OrchestrateLogin/OrchestrateLogin";
import Footer from "./components/Footer/Footer";
import TranslationProvider from "./components/Internationalisation/TranslationProvider";
import SiteSettings from "./lib/Settings/SiteSettings";
import AppContext from "./contexts/AppContext";


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
    this.state = this.defaultState;
  }

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
    };
  }

  isReady() {
    return this.state.siteSettings !== null && this.state.locale !== null;
  }

  /**
   * Get the list of site settings from background page and set it in the state
   * Using SiteSettings
   */
  async getSiteSettings() {
    const settings = await this.props.port.request("passbolt.site.settings");
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
   * Get the locale
   */
  async getLocale() {
    const locale = await this.props.port.request("passbolt.locale.get");
    this.setState({locale});
  }

  /**
   * Whenever the update of the locale is requested
   */
  async onUpdateLocaleRequested(locale) {
    await this.setState({locale});
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
            <AuthenticationContextProvider value={this.defaultContextValue}>
              <DialogContextProvider>
                <div id="container" className="container page login">
                  <ManageDialogs/>
                  <div className="content">
                    <div className="header">
                      <div className="logo"><span className="visually-hidden">Passbolt</span></div>
                    </div>
                    <div className="login-form">
                      <OrchestrateLogin/>
                    </div>
                  </div>
                </div>
                <Footer/>
              </DialogContextProvider>
            </AuthenticationContextProvider>
          </Router>
        </TranslationProvider>
        }
      </AppContext.Provider>
    );
  }
}

ExtAuthenticationLogin.contextType = AuthenticationContext;
ExtAuthenticationLogin.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default ExtAuthenticationLogin;

