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
import DialogContextProvider from "./contexts/DialogContext";
import ContextualMenuContextProvider from "./contexts/ContextualMenuContext";
import DisplayActionFeedbacks from "./components/Common/ActionFeedback/DisplayActionFeedbacks";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AdministrationWorkspaceContextProvider from "./contexts/AdministrationWorkspaceContext";
import ManageDialogs from "./components/Common/Dialog/ManageDialogs/ManageDialogs";
import ManageContextualMenu from "./components/Common/ContextualMenu/ManageContextualMenu";
import AdministrationWorkspace from "./components/Administration/AdministrationWorkspace";
import Footer from "./components/Common/Footer/Footer";
import DisplayApiUserSettingsWorkspace
  from "./components/UserSetting/DisplayUserSettingsWorkspace/DisplayApiUserSettingsWorkspace";
import DisplayMainMenu from "./components/Common/Menu/DisplayMainMenu";
import NavigationContextProvider from "./contexts/NavigationContext";
import HandleSessionExpired from "./components/Authentication/HandleSessionExpired/HandleSessionExpired";
import AnnouncementContextProvider from "./contexts/AnnouncementContext";
import HandleSubscriptionAnnouncement
  from "./components/Announcement/HandleSubscriptionAnnouncement/HandleSubscriptionAnnouncement";
import ManageAnnouncements from "./components/Announcement/ManageAnnouncements/ManageAnnouncements";
import ApiAppContextProvider from "./contexts/ApiAppContext";
import TranslationProvider from "./components/Common/Internationalisation/TranslationProvider";
import AppContext from "../shared/context/AppContext/AppContext";
import AccountRecoveryUserContextProvider from "./contexts/AccountRecoveryUserContext";
import ApiAppAccountRecoveryUserService from "../shared/services/api/accountRecovery/ApiAppAccountRecoveryUserService";
import AdminSmtpSettingsContextProvider from "./contexts/AdminSmtpSettingsContext";
import AdminEmailNotificationContextProvider from "./contexts/Administration/AdministrationEmailNotification/AdministrationEmailNotificationContext";
import AdminMfaContextProvider from "./contexts/Administration/AdministrationMfa/AdministrationMfaContext";
import AdminUserDirectoryContextProvider from './contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext';
import AdminInternationalizationContextProvider from "./contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext";
import AdminSelfRegistrationContextProvider from "./contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";
import AdminMfaPolicyContextProvider from "./contexts/Administration/AdministrationMfaPolicy/AdministrationMfaPolicyContext";
import MfaContextProvider from "./contexts/MFAContext";
import RbacContextProvider from "../shared/context/Rbac/RbacContext";
import AdminRbacContextProvider from "./contexts/Administration/AdministrationRbacContext/AdministrationRbacContext";

/**
 * The passbolt application served by the API.
 * Briefly it takes care of:
 * - The passwords workspace
 * - The users workspace
 * - Most of the user settings workspace. The MFA screen is handled by the ApiApp because of duo constraints.
 */
class ApiApp extends Component {
  render() {
    const accountRecoveryUserService = new ApiAppAccountRecoveryUserService();
    return (
      <ApiAppContextProvider>
        <AppContext.Consumer>
          {appContext =>
            <TranslationProvider loadingPath={`${appContext.trustedDomain}/locales/{{lng}}/{{ns}}.json`}>
              <RbacContextProvider>
                <AccountRecoveryUserContextProvider accountRecoveryUserService={accountRecoveryUserService}>
                  <MfaContextProvider>
                    <ActionFeedbackContextProvider>
                      <DialogContextProvider>
                        <AnnouncementContextProvider>
                          <ContextualMenuContextProvider>
                            { /* Action Feedback Management */}
                            <DisplayActionFeedbacks/>
                            { /* Session expired handler */}
                            <HandleSessionExpired/>

                            { /* Announcement Management */}
                            {appContext.loggedInUser && appContext.loggedInUser.role.name === "admin"
                              && appContext.siteSettings.canIUse('ee')
                              && <HandleSubscriptionAnnouncement/>}

                            <Router basename={appContext.basename}>
                              <NavigationContextProvider>
                                <Switch>
                                  { /* The following routes are not handled by the browser extension application. */}
                                  <Route exact path={[
                                    "/app/administration/subscription",
                                    "/app/administration/account-recovery",
                                  ]}/>
                                  <Route path="/app/administration">
                                    <AdministrationWorkspaceContextProvider>
                                      <AdminSmtpSettingsContextProvider>
                                        <ManageContextualMenu/>
                                        <ManageAnnouncements/>
                                        <AdminUserDirectoryContextProvider>
                                          <AdminSelfRegistrationContextProvider>
                                            <ManageDialogs/>
                                            <AdminMfaContextProvider>
                                              <AdminMfaPolicyContextProvider>
                                                <AdminEmailNotificationContextProvider>
                                                  <AdminInternationalizationContextProvider>
                                                    <AdminRbacContextProvider>
                                                      <AdministrationWorkspace/>
                                                    </AdminRbacContextProvider>
                                                  </AdminInternationalizationContextProvider>
                                                </AdminEmailNotificationContextProvider>
                                              </AdminMfaPolicyContextProvider>
                                            </AdminMfaContextProvider>
                                          </AdminSelfRegistrationContextProvider>
                                        </AdminUserDirectoryContextProvider>
                                      </AdminSmtpSettingsContextProvider>
                                    </AdministrationWorkspaceContextProvider>
                                  </Route>
                                  <Route path={["/app/settings/mfa"]}>
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
                  </MfaContextProvider>
                </AccountRecoveryUserContextProvider>
              </RbacContextProvider>
            </TranslationProvider>
          }
        </AppContext.Consumer>
      </ApiAppContextProvider>
    );
  }
}

export default ApiApp;
