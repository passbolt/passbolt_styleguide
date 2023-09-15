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
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import DisplayMainMenu from "./components/Common/Menu/DisplayMainMenu";
import ActionFeedbackContextProvider from "./contexts/ActionFeedbackContext";
import DisplayActionFeedbacks from "./components/Common/ActionFeedback/DisplayActionFeedbacks";
import DialogContextProvider from "./contexts/DialogContext";
import ManageDialogs from "./components/Common/Dialog/ManageDialogs/ManageDialogs";
import ResourceWorkspaceContextProvider from "./contexts/ResourceWorkspaceContext";
import ResourcePasswordGeneratorContextProvider from "./contexts/ResourcePasswordGeneratorContext";
import UserWorkspaceContextProvider from "./contexts/UserWorkspaceContext";
import ContextualMenuContextProvider from "./contexts/ContextualMenuContext";
import ManageContextualMenu from "./components/Common/ContextualMenu/ManageContextualMenu";
import ManageLoading from "./components/Common/Loading/ManageLoading/ManageLoading";
import LoadingContextProvider from "./contexts/LoadingContext";
import DisplayUserWorkspace from "./components/User/DisplayUserWorkspace/DisplayUserWorkspace";
import HandleRouteFallback from "./components/Common/Route/HandleRouteFallback";
import DisplayUserSettingsWorkspace
  from "./components/UserSetting/DisplayUserSettingsWorkspace/DisplayUserSettingsWorkspace";
import HandleSessionExpired from "./components/Authentication/HandleSessionExpired/HandleSessionExpired";
import Footer from "./components/Common/Footer/Footer";
import HandleExtAppRouteChanged from "./components/Common/Route/HandleExtAppRouteChanged";
import NavigationContextProvider from "./contexts/NavigationContext";
import AdministrationWorkspaceContextProvider from "./contexts/AdministrationWorkspaceContext";
import ManageAnnouncements from "./components/Announcement/ManageAnnouncements/ManageAnnouncements";
import AnnouncementContextProvider from "./contexts/AnnouncementContext";
import HandleSubscriptionAnnouncement
  from "./components/Announcement/HandleSubscriptionAnnouncement/HandleSubscriptionAnnouncement";
import ExtAppContextProvider from "./contexts/ExtAppContext";

import TranslationProvider from "./components/Common/Internationalisation/TranslationProvider";
import UserSettingsContextProvider from "./contexts/UserSettingsContext";
import AdministrationWorkspace from "./components/Administration/AdministrationWorkspace";
import AppContext from "../shared/context/AppContext/AppContext";
import HandlePassphraseEntryEvents
  from "./components/AuthenticationPassphrase/HandlePassphraseEntryEvents/HandlePassphraseEntryEvents";
import HandleFolderMoveStrategyEvents
  from "./components/ResourceFolder/HandleFolderMoveStrategyEvents/HandleFolderMoveStrategyEvents";
import HandleProgressEvents from "./components/Common/Progress/HandleProgressEvents/HandleProgressEvents";
import DisplayResourcesWorkspace from "./components/Resource/DisplayResourcesWorkspace/DisplayResourcesWorkspace";
import DragContextProvider from "./contexts/DragContext";
import AccountRecoveryUserContextProvider from "./contexts/AccountRecoveryUserContext";
import ExtAppAccountRecoveryUserService from "../shared/services/api/accountRecovery/ExtAppAccountRecoveryUserService";
import WorkflowContextProvider from "./contexts/WorkflowContext";
import ManageWorkflows from "./components/Common/Workflow/ManageWorkflows/ManageWorkflows";
import AdminAccountRecoveryContextProvider from "./contexts/AdminAccountRecoveryContext";
import HandleApplicationFirstLoadRoute from "./components/Common/Route/HandleApplicationFirstLoadRoute";
import AdminSubscriptionContextProvider
  from "./contexts/Administration/AdministrationSubscription/AdministrationSubscription";
import HandleStatusCheck from './components/HandleStatusCheck/HandleStatusCheck';
import MfaContextProvider from "./contexts/MFAContext";
import AdminSsoContextProvider from "./contexts/AdminSsoContext";
import RbacContextProvider from "../shared/context/Rbac/RbacContext";
import PasswordPoliciesContext from "../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import AdminPasswordPoliciesContextProvider
  from "./contexts/Administration/AdministrationPasswordPoliciesContext/AdministrationPasswordPoliciesContext";
import ProgressContextProvider from "./contexts/ProgressContext";
import AdministrationUserPassphrasePoliciesContextProvider from "./contexts/Administration/AdministrationUserPassphrasePoliciesContext/AdministrationUserPassphrasePoliciesContext";
import UserPassphrasePoliciesContextProvider from "./contexts/UserPassphrasePoliciesContext";

/**
 * The passbolt application served by the browser extension.
 * Briefly it takes care of:
 * - The administration workspace
 * - The user workspace
 * - Most of the user settings MFA screen. Because of duo constraints.
 */
class ExtApp extends Component {
  /*
   * =============================================================
   *  View
   * =============================================================
   */
  render() {
    const accountRecoveryUserService = new ExtAppAccountRecoveryUserService(this.props.port);
    return (
      <ExtAppContextProvider port={this.props.port} storage={this.props.storage}>
        <AppContext.Consumer>
          {appContext =>
            <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json">
              <RbacContextProvider>
                <AccountRecoveryUserContextProvider accountRecoveryUserService={accountRecoveryUserService}>
                  <PasswordPoliciesContext>
                    <MfaContextProvider>
                      <WorkflowContextProvider>
                        <ActionFeedbackContextProvider>
                          <DialogContextProvider>
                            <AnnouncementContextProvider>
                              <ContextualMenuContextProvider>
                                <LoadingContextProvider>
                                  <ProgressContextProvider>
                                    { /* Action Feedback Management */}
                                    <DisplayActionFeedbacks/>

                                    { /* Dialogs Management */}
                                    <HandlePassphraseEntryEvents/>
                                    <HandleFolderMoveStrategyEvents/>
                                    <HandleProgressEvents/>
                                    <HandleSessionExpired/>

                                    { /* Announcement Management */}
                                    {appContext.loggedInUser && appContext.loggedInUser.role.name === "admin"
                                      && appContext.siteSettings.canIUse('ee')
                                      && <HandleSubscriptionAnnouncement/>}

                                    <Router>
                                      <NavigationContextProvider>
                                        { /* Account Recovery Management */}
                                        {appContext.loggedInUser && (appContext.siteSettings.canIUse('accountRecovery') || appContext.siteSettings.canIUse('mfaPolicies'))
                                          && <HandleStatusCheck/>}
                                        <HandleExtAppRouteChanged/>
                                        <Switch>
                                          { /* The application first load route points to an html document */ }
                                          <Route path="/webAccessibleResources/passbolt-iframe-app.html" component={HandleApplicationFirstLoadRoute} />
                                          { /* The following routes are not handled by the browser extension application. */}
                                          <Route exact path={[
                                            "/app/administration",
                                            "/app/administration/mfa",
                                            "/app/administration/users-directory",
                                            "/app/administration/email-notification",
                                            "/app/administration/smtp-settings",
                                            "/app/settings/mfa/:provider",
                                            "/app/settings/mfa"
                                          ]}/>
                                          {/* Passwords workspace */}
                                          <Route path={[
                                            "/app/folders/view/:filterByFolderId",
                                            "/app/passwords/view/:selectedResourceId",
                                            "/app/passwords",
                                          ]}>
                                            <ResourceWorkspaceContextProvider>
                                              <ResourcePasswordGeneratorContextProvider>
                                                <ManageDialogs/>
                                                <ManageContextualMenu/>
                                                <ManageAnnouncements/>
                                                <DragContextProvider>
                                                  <div id="container" className="page password">
                                                    <div id="app" className="app ready" tabIndex="1000">
                                                      <div className="header first">
                                                        <DisplayMainMenu/>
                                                      </div>
                                                      <DisplayResourcesWorkspace onMenuItemClick={this.handleWorkspaceSelect}/>
                                                    </div>
                                                  </div>
                                                </DragContextProvider>
                                              </ResourcePasswordGeneratorContextProvider>
                                            </ResourceWorkspaceContextProvider>
                                          </Route>
                                          {/* Users workspace */}
                                          <Route path={[
                                            "/app/account-recovery/requests/review/:accountRecoveryRequestId",
                                            "/app/groups/view/:selectedGroupId",
                                            "/app/groups/edit/:selectedGroupId",
                                            "/app/users/view/:selectedUserId",
                                            "/app/users",
                                          ]}>
                                            <UserWorkspaceContextProvider>
                                              <ManageDialogs/>
                                              <ManageWorkflows/>
                                              <ManageContextualMenu/>
                                              <ManageAnnouncements/>
                                              <div id="container" className="page user">
                                                <div id="app" className="app ready" tabIndex="1000">
                                                  <div className="header first">
                                                    <DisplayMainMenu/>
                                                  </div>
                                                  <DisplayUserWorkspace/>
                                                </div>
                                              </div>
                                            </UserWorkspaceContextProvider>
                                          </Route>
                                          {/* User settings workspace */}
                                          <Route path={"/app/settings"}>
                                            <UserSettingsContextProvider>
                                              <UserPassphrasePoliciesContextProvider>
                                                <ManageDialogs/>
                                                <ManageAnnouncements/>
                                                <div id="container" className="page settings">
                                                  <div id="app" className="app ready" tabIndex="1000">
                                                    <div className="header first">
                                                      <DisplayMainMenu/>
                                                    </div>
                                                    <DisplayUserSettingsWorkspace/>
                                                  </div>
                                                </div>
                                              </UserPassphrasePoliciesContextProvider>
                                            </UserSettingsContextProvider>
                                          </Route>
                                          {/* SSO, Subscription and Account Recovery settings */}
                                          <Route exact path={[
                                            "/app/administration/subscription",
                                            "/app/administration/account-recovery",
                                            "/app/administration/sso",
                                            "/app/administration/password-policies",
                                            "/app/administration/user-passphrase-policies",
                                          ]}>
                                            <AdministrationWorkspaceContextProvider>
                                              <AdminAccountRecoveryContextProvider>
                                                <AdminSubscriptionContextProvider>
                                                  <AdminSsoContextProvider>
                                                    <AdminPasswordPoliciesContextProvider>
                                                      <AdministrationUserPassphrasePoliciesContextProvider>
                                                        <ManageDialogs/>
                                                        <ManageWorkflows/>
                                                        <AdministrationWorkspace/>
                                                      </AdministrationUserPassphrasePoliciesContextProvider>
                                                    </AdminPasswordPoliciesContextProvider>
                                                  </AdminSsoContextProvider>
                                                </AdminSubscriptionContextProvider>
                                              </AdminAccountRecoveryContextProvider>
                                            </AdministrationWorkspaceContextProvider>
                                          </Route>
                                          {/* Fallback */}
                                          <Route path="/">
                                            <HandleRouteFallback/>
                                          </Route>
                                        </Switch>
                                      </NavigationContextProvider>
                                    </Router>
                                    <ManageLoading/>
                                    <Footer/>
                                  </ProgressContextProvider>
                                </LoadingContextProvider>
                              </ContextualMenuContextProvider>
                            </AnnouncementContextProvider>
                          </DialogContextProvider>
                        </ActionFeedbackContextProvider>
                      </WorkflowContextProvider>
                    </MfaContextProvider>
                  </PasswordPoliciesContext>
                </AccountRecoveryUserContextProvider>
              </RbacContextProvider>
            </TranslationProvider>
          }
        </AppContext.Consumer>
      </ExtAppContextProvider>
    );
  }
}

ExtApp.propTypes = {
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default ExtApp;
