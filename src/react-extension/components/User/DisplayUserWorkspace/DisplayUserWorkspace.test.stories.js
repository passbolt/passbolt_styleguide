/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.7.0
 */

import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import DisplayUserWorkspace from "./DisplayUserWorkspace";
import ManageContextualMenu from "../../Common/ContextualMenu/ManageContextualMenu";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import ManageWorkflows from "../../Common/Workflow/ManageWorkflows/ManageWorkflows";
import ManageAnnouncements from "../../Announcement/ManageAnnouncements/ManageAnnouncements";
import UserWorkspaceContextProvider from "../../../contexts/UserWorkspaceContext";
import ContextualMenuContextProvider from "../../../contexts/ContextualMenuContext";
import ExtAppContextProvider from "../../../contexts/ExtAppContext";
import NavigationContextProvider from "../../../contexts/NavigationContext";
import DialogContextProvider from "../../../contexts/DialogContext";
import mockPort from "../../../../../test/mocks/mockPort";
import mockStorage from "../../../../../test/mocks/mockStorage";
import {siteSettingsCe} from "../../../test/fixture/Settings/siteSettings";
import RbacContextProvider from "../../../../shared/context/Rbac/RbacContext";

/**
 * DisplayUserWorkspace stories
 */
export default {
  title: 'Workspaces/User',
  component: DisplayUserWorkspace
};

const ExtApp = ({...args}) =>
  <MemoryRouter initialEntries={['/app/users']}>
    <ExtAppContextProvider storage={args.storage} port={args.port}>
      <RbacContextProvider>
        <DialogContextProvider>
          <NavigationContextProvider>
            <ContextualMenuContextProvider>
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
                    <div id="app" className="app ready" tabIndex="1000" style={{margin: "-1rem"}}>
                      <DisplayUserWorkspace/>
                    </div>
                  </div>
                </UserWorkspaceContextProvider>
              </Route>
            </ContextualMenuContextProvider>
          </NavigationContextProvider>
        </DialogContextProvider>
      </RbacContextProvider>
    </ExtAppContextProvider>
  </MemoryRouter>;

const storage = mockStorage();
const port = mockPort(storage);

export const proVersion = {
  args: {
    port: port,
    storage: storage
  },
  render: ExtApp
};

const ceStorage = mockStorage();
const cePort = mockPort(ceStorage);
cePort.addRequestListener("passbolt.organization-settings.get", () => siteSettingsCe);
export const ceVersion = {
  args: {
    port: cePort,
    storage: ceStorage
  },
  render: ExtApp
};
