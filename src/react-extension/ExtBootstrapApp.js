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
 * @since        3.0.0
 */
import React, {Component} from "react";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import InsertAppIframe from "./components/InsertAppIframe";
import InsertFileIframe from "./components/InsertFileIframe";
import InsertClipboardIframe from "./components/InsertClipboardIframe";
import UserSettings from "./lib/Settings/UserSettings";
import HandleLegacyAdministrationAppjs from "./components/Legacy/HandleLegacyAdministrationAppjs";

/**
 * The bootstrap of the passbolt application served by the browser extension.
 * This application is inserted in the page served by the API and inject the iframe that will contain the passbolt application.
 */
class ExtBootstrapApp extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
  }

  /**
   * Component default state
   * @param props
   * @returns {object}
   */
  getDefaultState(props) {
    return {
      port: props.port,
      storage: props.storage,
      userSettings: null
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.getUserSettings();
  }

  /**
   * Get the list of user settings from local storage and set it in the state
   * Using UserSettings
   */
  async getUserSettings() {
    const storageData = await this.props.storage.local.get(["_passbolt_data"]);
    const userSettings = new UserSettings(storageData._passbolt_data.config);
    this.setState({userSettings});
  }

  /**
   * Is the component ready
   * @returns {boolean}
   */
  get isReady() {
    return this.state.userSettings !== null;
  }

  /**
   * Get the application pathname.
   * @returns {string}
   */
  get basename() {
    const trustedDomain = this.state.userSettings.getTrustedDomain();
    const urlTrustedDomain = new URL(trustedDomain);
    return urlTrustedDomain.pathname;
  }

  render() {
    return (
      <>
        {this.isReady &&
        <Router basename={this.basename}>
          <Switch>
            <Route exact path={[
              "/app/administration",
              "/app/settings/mfa"
            ]}>
              <HandleLegacyAdministrationAppjs port={this.props.port}/>
            </Route>
            <Route exact path={[
              "/app/folders/view/:filterByFolderId",
              "/app/groups/view/:selectedGroupId",
              "/app/passwords/view/:selectedResourceId",
              "/app/passwords",
              "/app/settings",
              "/app/settings/keys",
              "/app/settings/profile",
              "/app/settings/theme",
              "/app/users/view/:selectedUserId",
              "/app/users",
              "/app",
              "/",
            ]}>
              <InsertAppIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
              <InsertClipboardIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
              <InsertFileIframe browserExtensionUrl={this.props.browserExtensionUrl}/>
            </Route>
          </Switch>
        </Router>
        }
      </>
    );
  }
}

ExtBootstrapApp.propTypes = {
  browserExtensionUrl: PropTypes.string, // The browser extension url
  port: PropTypes.object, // The browser extension communication port
  storage: PropTypes.object, // The extension local storage
};

export default ExtBootstrapApp;
