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
import RbacContextProvider from "../../../shared/context/Rbac/RbacContext";
import DialogContextProvider from "../../contexts/DialogContext";
import ContextualMenuContextProvider from "../../contexts/ContextualMenuContext";
import ManageDialogs from "../Common/Dialog/ManageDialogs/ManageDialogs";
import AdministrationWorkspaceContextProvider, {AdministrationWorkspaceMenuTypes} from "../../contexts/AdministrationWorkspaceContext";
import MfaContextProvider from "../../contexts/MFAContext";
import DisplayActionFeedbacks from "../Common/ActionFeedback/DisplayActionFeedbacks";
import AnnouncementContextProvider from "../../contexts/AnnouncementContext";
import ActionFeedbackContextProvider from "../../contexts/ActionFeedbackContext";
import TranslationProvider from "../Common/Internationalisation/TranslationProvider";
import NavigationContextProvider from "../../contexts/NavigationContext";
import ManageAnnouncements from "../Announcement/ManageAnnouncements/ManageAnnouncements";
import ManageContextualMenu from "../Common/ContextualMenu/ManageContextualMenu";
import {defaultAdministrationWorkspaceContext} from "../../contexts/AdministrationWorkspaceContext.test.data";
import {defaultAppContext} from "../../contexts/ApiAppContext.test.data";
import MockApiAppContextProvider from "../../test/mock/MockApiAppContextProvider";
import MockFetch from "../../test/mock/MockFetch";
import {mockApiResponse} from "../../../../test/mocks/mockApiResponse";
import {
  mockResult as userDirectoryMockResult,
  mockUsers as userDirectoryMockUsers
} from "./DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data";
import AdminUserDirectoryContextProvider from "../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";
import siteSettingsPro from "../../test/fixture/Settings/siteSettings";


const currentAdminUser = userDirectoryMockUsers.find(user => user.username === "admin@passbolt.com");
const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/directorysync\/settings/, async() => mockApiResponse(userDirectoryMockResult));
mockFetch.addGetFetchRequest(/account\/settings/, async() => mockApiResponse([]));
mockFetch.addGetFetchRequest(/users\/me/, async() => mockApiResponse(currentAdminUser));
mockFetch.addGetFetchRequest(/users*/, async() => mockApiResponse(userDirectoryMockUsers));
mockFetch.addGetFetchRequest(/settings\.json/, async() => mockApiResponse(siteSettingsPro));

/**
 * Api served page for AdministrationWorkspace stories
 */
export default {
  title: 'Workspaces/ApiAdministration',
  component: AdministrationWorkspace,
  parameters: {
    css: "api_main"
  },
  decorators: [(Story, {args}) =>
    <MemoryRouter initialEntries={[args.routerInitialEntry]}>
      <TranslationProvider loadingPath="/webAccessibleResources/locales/{{lng}}/{{ns}}.json">
        <MockApiAppContextProvider>
          <RbacContextProvider>
            <MfaContextProvider>
              <ActionFeedbackContextProvider>
                <DialogContextProvider>
                  <AnnouncementContextProvider>
                    <ContextualMenuContextProvider>
                      { /* Action Feedback Management */}
                      <DisplayActionFeedbacks/>
                      <NavigationContextProvider>
                        { /* The following routes are handled by the browser extension application. */}
                        <Route path={[
                          "/app/administration/users-directory",
                          "/app/administration/mfa-policy",
                          "/app/administration/password-policies",
                          "/app/administration/user-passphrase-policies"
                        ]}>
                          <AdministrationWorkspaceContextProvider value={args.administrationWorkspaceContext}>
                            <AdminUserDirectoryContextProvider>
                              <ManageContextualMenu/>
                              <ManageAnnouncements/>
                              <ManageDialogs/>
                              <Story {...args}/>
                            </AdminUserDirectoryContextProvider>
                          </AdministrationWorkspaceContextProvider>
                        </Route>
                      </NavigationContextProvider>
                    </ContextualMenuContextProvider>
                  </AnnouncementContextProvider>
                </DialogContextProvider>
              </ActionFeedbackContextProvider>
            </MfaContextProvider>
          </RbacContextProvider>
        </MockApiAppContextProvider>
      </TranslationProvider>
    </MemoryRouter>,
  ],
};

export const UserDirectoryPage = {
  args: defaultAppContext({
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.USER_DIRECTORY
    }),
    routerInitialEntry: "/app/administration/users-directory",
  }),
};

export const MfaPolicyPage = {
  args: {
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.MFA_POLICY
    }),
    routerInitialEntry: "/app/administration/mfa-policy"
  },
};
