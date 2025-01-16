/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import AdministrationWorkspace from "./AdministrationWorkspace";
import ExtAppContextProvider from "../../contexts/ExtAppContext";
import RbacContextProvider from "../../../shared/context/Rbac/RbacContext";
import WorkflowContextProvider from "../../contexts/WorkflowContext";
import DialogContextProvider from "../../contexts/DialogContext";
import ContextualMenuContextProvider from "../../contexts/ContextualMenuContext";
import ManageDialogs from "../Common/Dialog/ManageDialogs/ManageDialogs";
import ManageWorkflows from "../Common/Workflow/ManageWorkflows/ManageWorkflows";
import AdminAccountRecoveryContextProvider from "../../contexts/AdminAccountRecoveryContext";
import AdminSubscriptionContextProvider from "../../contexts/Administration/AdministrationSubscription/AdministrationSubscription";
import AdminSsoContextProvider from "../../contexts/AdminSsoContext";
import AdminPasswordPoliciesContextProvider from "../../contexts/Administration/AdministrationPasswordPoliciesContext/AdministrationPasswordPoliciesContext";
import AdministrationUserPassphrasePoliciesContextProvider from "../../contexts/Administration/AdministrationUserPassphrasePoliciesContext/AdministrationUserPassphrasePoliciesContext";
import AdministrationPasswordExpiryContextProvider from "../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPaswordExpiryContext";
import AdministrationWorkspaceContextProvider, {AdministrationWorkspaceMenuTypes} from "../../contexts/AdministrationWorkspaceContext";
import MfaContextProvider from "../../contexts/MFAContext";
import PasswordPoliciesContext from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import AccountRecoveryUserContextProvider from "../../contexts/AccountRecoveryUserContext";
import LoadingContextProvider from "../../contexts/LoadingContext";
import DisplayActionFeedbacks from "../Common/ActionFeedback/DisplayActionFeedbacks";
import ProgressContextProvider from "../../contexts/ProgressContext";
import AnnouncementContextProvider from "../../contexts/AnnouncementContext";
import ActionFeedbackContextProvider from "../../contexts/ActionFeedbackContext";
import TranslationProvider from "../Common/Internationalisation/TranslationProvider";
import ExtAppAccountRecoveryUserService from "../../../shared/services/api/accountRecovery/ExtAppAccountRecoveryUserService";
import mockStorage from "../../../../test/mocks/mockStorage";
import mockPort from "../../../../test/mocks/mockPort";
import {siteSettingsCe} from "../../test/fixture/Settings/siteSettings";
import {defaultAdministrationWorkspaceContext} from "../../contexts/AdministrationWorkspaceContext.test.data";

/**
 * AdministrationWorkspace stories
 */
export default {
  title: 'Workspaces/Administration',
  component: AdministrationWorkspace,
  decorators: [(Story, {args}) =>
    <MemoryRouter initialEntries={['/app/administration']}>
      <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json">
        <ExtAppContextProvider storage={args.storage} port={args.port}>
          <RbacContextProvider>
            <AccountRecoveryUserContextProvider accountRecoveryUserService={new ExtAppAccountRecoveryUserService(args.port)}>
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
                                <Route path={[
                                  "/app/administration",
                                  "/app/administration/account-recovery",
                                  "/app/administration/email-notification",
                                  "/app/administration/healthcheck",
                                  "/app/administration/mfa",
                                  "/app/administration/password-expiry",
                                  "/app/administration/password-policies",
                                  "/app/administration/smtp-settings",
                                  "/app/administration/sso",
                                  "/app/administration/subscription",
                                  "/app/administration/user-passphrase-policies",
                                  "/app/administration/users-directory",
                                ]}>
                                  <AdministrationWorkspaceContextProvider>
                                    <AdminAccountRecoveryContextProvider>
                                      <AdminSubscriptionContextProvider>
                                        <AdminSsoContextProvider>
                                          <AdminPasswordPoliciesContextProvider>
                                            <AdministrationUserPassphrasePoliciesContextProvider>
                                              <AdministrationPasswordExpiryContextProvider>
                                                <ManageDialogs/>
                                                <ManageWorkflows/>
                                                <Story {...args}/>
                                              </AdministrationPasswordExpiryContextProvider>
                                            </AdministrationUserPassphrasePoliciesContextProvider>
                                          </AdminPasswordPoliciesContextProvider>
                                        </AdminSsoContextProvider>
                                      </AdminSubscriptionContextProvider>
                                    </AdminAccountRecoveryContextProvider>
                                  </AdministrationWorkspaceContextProvider>
                                </Route>
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
        </ExtAppContextProvider>
      </TranslationProvider>
    </MemoryRouter>
  ],
};

const storage = mockStorage();
const port = mockPort(storage);

export const proVersion = {
  args: {
    port: port,
    storage: storage
  },
};

const ceStorage = mockStorage();
const cePort = mockPort(ceStorage);
cePort.addRequestListener("passbolt.organization-settings.get", () => siteSettingsCe);
export const ceVersion = {
  args: {
    port: cePort,
    storage: ceStorage
  },
};

export const error403 = {
  args: {
    port: port,
    storage: storage,
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.HTTP_403_ACCESS_DENIED
    })
  },
};

export const error404 = {
  args: {
    port: port,
    storage: storage,
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.HTTP_404_NOT_FOUND
    })
  },
};
