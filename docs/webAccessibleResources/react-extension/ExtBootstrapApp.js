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
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import InsertAppIframe from "./components/InsertAppIframe";
import InsertFileIframe from "./components/InsertFileIframe";
import UserSettings from "../shared/lib/Settings/UserSettings";
import HandleLegacyAppjs from "./components/Common/Legacy/HandleLegacyAppjs";
import HandleExtAppBootstrapRouteChangeRequested from "./components/Common/Route/HandleExtAppBootstrapRouteChangeRequested";
import CleanupLegacyAppjs from "./components/Common/Legacy/CleanupLegacyAppjs";

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
   * It returns true if the page is detected as a passbolt app.
   * For that purpose, it simply checks if <html> has a class 'passbolt' set.
   * @returns {boolean}
   */
  isPassboltApp() {
    const rootNode = document.getRootNode();
    const htmlTag = rootNode.lastChild;

    return htmlTag?.tagName === "HTML"
      && htmlTag.classList.contains('passbolt');
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

  /**
   * Return true if the legacy appjs is detected on the page.
   */
  get isLegacyAppjs() {
    // The application is legacy if the page contains the script steal.production.js
    const legacyScripts = document.getElementsByTagName('script');
    if (legacyScripts) {
      for (let i = 0; i < legacyScripts.length; i++) {
        const src = legacyScripts[i].src || "";
        if (src.indexOf("steal.production.js") !== -1) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    if (!this.isPassboltApp()) {
      return null;
    }

    return (
      <>
        {this.isReady &&
        <Router basename={this.basename}>
          <HandleExtAppBootstrapRouteChangeRequested port={this.props.port}/>
          <Switch>
            <Route exact path={[
              "/app/administration",
              "/app/administration/mfa",
              "/app/administration/users-directory",
              "/app/administration/email-notification",
              "/app/administration/smtp-settings",
              "/app/settings/mfa/:provider",
              "/app/settings/mfa",
            ]}>
              <>
                {this.isLegacyAppjs &&
                <HandleLegacyAppjs port={this.props.port}/>
                }
              </>
            </Route>
            <Route exact path={[
              "/app/account-recovery/requests/review/:accountRecoveryRequestId",
              "/app/administration/subscription",
              "/app/administration/account-recovery",
              "/app/administration/sso",
              "/app/folders/view/:filterByFolderId",
              "/app/groups/view/:selectedGroupId",
              "/app/groups/edit/:selectedGroupId",
              "/app/passwords/view/:selectedResourceId",
              "/app/passwords",
              "/app/settings",
              "/app/settings/keys",
              "/app/settings/profile",
              "/app/settings/passphrase",
              "/app/settings/security-token",
              "/app/settings/mobile",
              "/app/settings/account-recovery",
              "/app/settings/account-recovery/edit",
              "/app/settings/theme",
              "/app/users/view/:selectedUserId",
              "/app/users",
              "/app",
              "/",
            ]}>
              {this.isLegacyAppjs &&
              <CleanupLegacyAppjs/>
              }
              <InsertAppIframe port={this.props.port} browserExtensionUrl={this.props.browserExtensionUrl}/>
              <InsertFileIframe port={this.props.port} browserExtensionUrl={this.props.browserExtensionUrl}/>
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
