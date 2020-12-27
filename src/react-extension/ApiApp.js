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
import DisplayApiUserSettingsWorkspace
  from "./components/UserSetting/DisplayUserSettingsWorkspace/DisplayApiUserSettingsWorkspace";
import DisplayMainMenu from "./components/navigation/DisplayMainMenu";

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
      trustedDomain: this.baseUrl, // The site domain (use trusted domain for compatibility with browser extension applications)
      getApiClientOptions: this.getApiClientOptions.bind(this), // Get the api client options

      displayTestUserDirectoryDialogProps: {
        userDirectoryTestResult: null, // The result of the test user directory
      },

      setContext: context => {
        this.setState(context);
      },

      // Navigation
      onLogoutRequested: () => this.onLogoutRequested()
    };
  }

  /**
   * Get the application base url
   * @return {string}
   */
  get baseUrl() {
    const baseElement = document.getElementsByTagName('base') && document.getElementsByTagName('base')[0];
    if (baseElement) {
      return baseElement.attributes.href.value.replace(/\/*$/g, '');
    }
    console.error("Unable to retrieve the page base tag");
    return "";
  }

  /**
   * Get the API client options
   * @returns {ApiClientOptions}
   */
  getApiClientOptions() {
    return new ApiClientOptions()
      .setBaseUrl(this.state.trustedDomain)
      .setCsrfToken(this.getCsrfToken());
  }

  /**
   * Get csrf token
   * @returns {string}
   */
  getCsrfToken() {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('csrfToken'))
      .split('=')[1];
  }

  /**
   * Retrieve the logged in user.
   * @returns {Promise<object>}
   */
  async getLoggedInUser() {
    const apiClientOptions = this.getApiClientOptions().setResourceName("users");
    const apiClient = new ApiClient(apiClientOptions);
    const result = await apiClient.get("me");
    const loggedInUser = result.body;
    this.setState({loggedInUser});
  }

  /**
   * Fetch the site settings
   */
  async getSiteSettings() {
    const apiClientOptions = this.getApiClientOptions().setResourceName("settings");
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
                  <Route path="/app/settings/mfa">
                    <ManageDialogs/>
                    <ManageContextualMenu/>
                    <div id="container" className="page settings">
                      <div id="app" className="app" tabIndex="1000">
                        <div className="header first">
                          <DisplayMainMenu/>
                        </div>
                        <DisplayApiUserSettingsWorkspace/>
                      </div>
                    </div>
                  </Route>
                  { /* All others /app routes are handled by the browser extension */}
                  <Route path="/app" render={() => {
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
