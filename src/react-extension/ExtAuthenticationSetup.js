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
import ManageDialogs from "./components/Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../react/contexts/Common/DialogContext";
import {BrowserRouter as Router} from "react-router-dom";
import SetupAuthentication from "./components/AuthenticationSetup/SetupAuthentication/SetupAuthentication";
import SiteSettings from "./lib/Settings/SiteSettings";
import ExtFooter from "./components/Footer/ExtFooter";

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
      extensionVersion: null // The extension version
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

  /**
   * Whenever the component is mounted
   */
  async componentDidMount() {
    await this.getSiteSettings();
    await this.getExtensionVersion();
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
    const extensionVersion = await this.props.port.request('passbolt.addon.get-version');
    this.setState({extensionVersion});
  }

  /**
   * Renders the component
   */
  render() {
    return (
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
                  <SetupAuthentication/>
                </div>
              </div>
            </div>
            <ExtFooter
              siteSettings={this.state.siteSettings}
              extensionVersion={this.state.extensionVersion}/>
          </DialogContextProvider>
        </AuthenticationContextProvider>
      </Router>
    );
  }
}

ExtAuthenticationSetup.contextType = AuthenticationContext;
ExtAuthenticationSetup.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default ExtAuthenticationSetup;

