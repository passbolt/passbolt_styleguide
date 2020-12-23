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
 */
import React, {Component} from "react";
import AppContext from "./contexts/AppContext";
import ActionFeedbackContextProvider from "./contexts/ActionFeedbackContext";
import DialogContextProvider from "../react/contexts/Common/DialogContext";
import ContextualMenuContextProvider from "../react/contexts/Common/ContextualMenuContext";
import ShareActionFeedbacks from "./components/Share/ShareActionFeedbacks";
import {Redirect, BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AdministrationWorkspaceContextProvider from "./contexts/AdministrationWorkspaceContext";
import ManageDialogs from "../react/components/Common/Dialog/ManageDialogs/ManageDialogs";
import ManageContextualMenu from "./components/ManageContextualMenu";
import AdministrationWorkspace from "./components/Administration/AdministrationWorkspace";
import {ApiClientOptions} from "./lib/apiClient/apiClientOptions";
import {ApiClient} from "./lib/apiClient/apiClient";
import SiteSettings from "./lib/Settings/SiteSettings";
import Footer from "./components/Footer/Footer";

/**
 * The passbolt application served by the API.
 * Briefly it takes care of:
 * - The passwords workspace
 * - The users workspace
 * - Most of the user settings workspace. The MFA screen is handled by the ApiApp because of duo constraints.
 */
class ApiApp extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
  }
  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    await this.getLoggedInUser();
    await this.getSiteSettings();
    this.removeSplashScreen();
  }

  /**
   * Default state
   * @returns {object}
   */
  getDefaultState() {
    return {
      loggedInUser: null, // The logged in user
      siteSettings: null, // The site settings
      trustedDomain: window.location.origin,

      displayTestUserDirectoryDialogProps: {
        userDirectoryTestResult: null, // The result of the test user directory
      },

      setContext: context => {
        this.setState(context);
      },
      setLoggedInUser: () => {
      }, // Set the logged in user

      // Navigation
      onLogoutRequested: () => this.onLogoutRequested()
    };
  }

  /**
   * Retrieve the logged in user.
   * @returns {Promise<object>}
   */
  async getLoggedInUser() {
    const apiClientOptions = new ApiClientOptions().setBaseUrl(this.state.trustedDomain).setResourceName("users");
    const apiClient = new ApiClient(apiClientOptions);
    const result = await apiClient.get("me");
    this.setLoggedInUser(result.body);
  }

  /**
   * Fetch the site settings
   */
  async getSiteSettings() {
    const apiClientOptions = new ApiClientOptions()
      .setBaseUrl(this.state.trustedDomain)
      .setResourceName("settings");
    const apiClient = new ApiClient(apiClientOptions);
    const siteSettings = await apiClient.findAll();
    await this.setState({siteSettings: new SiteSettings(siteSettings)});
  }

  /**
   * Remove the splashscreen.
   */
  removeSplashScreen() {
    document.getElementsByTagName("html")[0].classList.remove("launching");
  }

  setLoggedInUser(loggedInUser) {
    this.setState({loggedInUser});
  }

  /**
   * Listen when the user wants to logout.
   */
  onLogoutRequested() {
    document.location.href = `${this.state.trustedDomain}/auth/logout`;
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <ActionFeedbackContextProvider>
          <DialogContextProvider>
            <ContextualMenuContextProvider>
              { /* Action Feedback Management */}
              <ShareActionFeedbacks/>
              <Router>
                <Switch>
                  <Route exact path="/app/administration">
                    <Redirect to="/app/administration/mfa"/>
                  </Route>
                  <Route path="/app/administration">
                    <AdministrationWorkspaceContextProvider>
                      <ManageDialogs/>
                      <ManageContextualMenu/>
                      <AdministrationWorkspace/>
                    </AdministrationWorkspaceContextProvider>
                  </Route>
                  { /* If the ApiApp doesn't match any route, it's then an ExtApp route. Reload the page and let the browser extension app handle this route */}
                  <Route path="/" render={() => {
                    window.location.reload();
                  }}>
                  </Route>
                </Switch>
              </Router>
              <Footer siteSettings={this.state.siteSettings}/>
            </ContextualMenuContextProvider>
          </DialogContextProvider>
        </ActionFeedbackContextProvider>
      </AppContext.Provider>
    );
  }
}

export default ApiApp;
