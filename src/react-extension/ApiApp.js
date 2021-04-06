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
import ActionFeedbackContextProvider from "./contexts/ActionFeedbackContext";
import DialogContextProvider from "../react/contexts/Common/DialogContext";
import ContextualMenuContextProvider from "../react/contexts/Common/ContextualMenuContext";
import ShareActionFeedbacks from "./components/Share/ShareActionFeedbacks";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AdministrationWorkspaceContextProvider from "./contexts/AdministrationWorkspaceContext";
import ManageDialogs from "../react/components/Common/Dialog/ManageDialogs/ManageDialogs";
import ManageContextualMenu from "./components/ManageContextualMenu";
import AdministrationWorkspace from "./components/Administration/AdministrationWorkspace";
import Footer from "./components/Footer/Footer";
import DisplayApiUserSettingsWorkspace
  from "./components/UserSetting/DisplayUserSettingsWorkspace/DisplayApiUserSettingsWorkspace";
import DisplayMainMenu from "./components/navigation/DisplayMainMenu";
import NavigationContextProvider from "./contexts/NavigationContext";
import HandleSessionExpired from "./components/Auth/HandleSessionExpired/HandleSessionExpired";
import AnnouncementContextProvider from "./contexts/AnnouncementContext";
import HandleSubscriptionAnnouncement
  from "./components/Announcement/HandleSubscriptionAnnouncement/HandleSubscriptionAnnouncement";
import ManageAnnouncements from "./components/Announcement/ManageAnnouncements/ManageAnnouncements";
import ApiAppContextProvider from "./contexts/ApiAppContext";
import TranslationProvider from "./components/Internationalisation/TranslationProvider";
import AppContext from "./contexts/AppContext";

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
    this.state = this.defaultState;
  }

  get defaultState() {
    return {
      trustedDomain: this.baseUrl, // The site domain (use trusted domain for compatibility with browser extension applications)
      basename: (new URL(this.baseUrl)).pathname, // Base path to be used for routing if needed ex. /workspace
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

  render() {
    return (
      <TranslationProvider loadingPath={`${this.state.trustedDomain}/locales/{{lng}}/{{ns}}.json`}>
        <ApiAppContextProvider trustedDomain={this.state.trustedDomain} basename={this.state.basename}>
          <AppContext.Consumer>
            {appContext =>
              <ActionFeedbackContextProvider>
                <DialogContextProvider>
                  <AnnouncementContextProvider>
                    <ContextualMenuContextProvider>
                      { /* Action Feedback Management */}
                      <ShareActionFeedbacks/>
                      { /* Session expired handler */}
                      <HandleSessionExpired/>
                      { /* Announcement Management */}
                      {appContext.loggedInUser && appContext.loggedInUser.role.name === "admin"
                      && appContext.siteSettings.canIUse('ee')
                      && <HandleSubscriptionAnnouncement/>}

                      <Router basename={this.state.basename}>
                        <NavigationContextProvider>
                          <Switch>
                            { /* The following routes are not handled by the browser extension application. */}
                            <Route exact path={[
                              "/app/administration/subscription"
                            ]}/>
                            <Route path="/app/administration">
                              <AdministrationWorkspaceContextProvider>
                                <ManageDialogs/>
                                <ManageContextualMenu/>
                                <ManageAnnouncements/>
                                <AdministrationWorkspace/>
                              </AdministrationWorkspaceContextProvider>
                            </Route>
                            <Route path="/app/settings/mfa">
                              <ManageDialogs/>
                              <ManageContextualMenu/>
                              <ManageAnnouncements/>
                              <div id="container" className="page settings">
                                <div id="app" className="app" tabIndex="1000">
                                  <div className="header first">
                                    <DisplayMainMenu/>
                                  </div>
                                  <DisplayApiUserSettingsWorkspace/>
                                </div>
                              </div>
                            </Route>
                          </Switch>
                        </NavigationContextProvider>
                      </Router>
                      <Footer/>
                    </ContextualMenuContextProvider>
                  </AnnouncementContextProvider>
                </DialogContextProvider>
              </ActionFeedbackContextProvider>
            }
          </AppContext.Consumer>
        </ApiAppContextProvider>
      </TranslationProvider>
    );
  }
}

export default ApiApp;
