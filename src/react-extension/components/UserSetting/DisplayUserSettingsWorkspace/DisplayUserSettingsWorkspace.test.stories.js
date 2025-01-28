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
import DisplayUserSettingsWorkspace from "./DisplayUserSettingsWorkspace";
import UserSettingsContextProvider from "../../../contexts/UserSettingsContext";
import UserPassphrasePoliciesContextProvider from "../../../contexts/UserPassphrasePoliciesContext";
import ManageAnnouncements from "../../Announcement/ManageAnnouncements/ManageAnnouncements";
import TranslationProvider from "../../Common/Internationalisation/TranslationProvider";
import ExtAppContextProvider from "../../../contexts/ExtAppContext";
import RbacContextProvider from "../../../../shared/context/Rbac/RbacContext";
import AccountRecoveryUserContextProvider from "../../../contexts/AccountRecoveryUserContext";
import ExtAppAccountRecoveryUserService
  from "../../../../shared/services/api/accountRecovery/ExtAppAccountRecoveryUserService";
import PasswordPoliciesContext from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import MfaContextProvider from "../../../contexts/MFAContext";
import WorkflowContextProvider from "../../../contexts/WorkflowContext";
import ActionFeedbackContextProvider from "../../../contexts/ActionFeedbackContext";
import DialogContextProvider from "../../../contexts/DialogContext";
import AnnouncementContextProvider from "../../../contexts/AnnouncementContext";
import ContextualMenuContextProvider from "../../../contexts/ContextualMenuContext";
import LoadingContextProvider from "../../../contexts/LoadingContext";
import ProgressContextProvider from "../../../contexts/ProgressContext";
import DisplayActionFeedbacks from "../../Common/ActionFeedback/DisplayActionFeedbacks";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import mockStorage from "../../../../../test/mocks/mockStorage";
import mockPort from "../../../../../test/mocks/mockPort";
import {siteSettingsCe} from "../../../test/fixture/Settings/siteSettings";

/**
 * UserSettingsWorkspace stories
 */
export default {
  title: 'Workspaces/Profile',
  component: DisplayUserSettingsWorkspace,
  decorators: [(Story, {args}) =>
    <MemoryRouter initialEntries={[args.initialEntries || '/app/settings']}>
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
                                <Route path={"/app/settings"}>
                                  <UserSettingsContextProvider>
                                    <UserPassphrasePoliciesContextProvider>
                                      <ManageDialogs/>
                                      <ManageAnnouncements/>
                                      <div id="container" className="page settings">
                                        <div id="app" className="app ready" tabIndex="1000" style={{margin: "-1rem"}}>
                                          <Story {...args}/>
                                        </div>
                                      </div>
                                    </UserPassphrasePoliciesContextProvider>
                                  </UserSettingsContextProvider>
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

export const UserProfile = {
  args: {
    port: port,
    storage: storage,
    initialEntries: "/app/settings/profile"
  },
};

export const gpgKeyInformation = {
  args: {
    port: port,
    storage: storage,
    initialEntries: "/app/settings/keys"
  },
};

export const changePassphrase = {
  args: {
    port: port,
    storage: storage,
    initialEntries: "/app/settings/passphrase"
  },
};

export const accountRecovery = {
  args: {
    port: port,
    storage: storage,
    initialEntries: "/app/settings/account-recovery"
  }
};

export const securityToken = {
  args: {
    port: port,
    storage: storage,
    initialEntries: "/app/settings/security-token"
  },
};
