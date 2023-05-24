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
import {MemoryRouter} from "react-router-dom";
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
import mockPort from "../../../../../demo/ext-app/mock/mockPort";
import mockStorage from "../../../../../demo/ext-app/mock/mockStorage";
import {siteSettingsCe} from "../../../test/fixture/Settings/siteSettings";
import DisplayMainMenu from "../../Common/Menu/DisplayMainMenu";

/**
 * DisplayUserWorkspace stories
 */
export default {
  title: 'Workspaces/User',
  component: DisplayUserWorkspace
};

const Template = ({...args}) =>
  <MemoryRouter initialEntries={['/app/users']}>
    <ExtAppContextProvider storage={args.storage} port={args.port}>
      <DialogContextProvider>
        <NavigationContextProvider>
          <ContextualMenuContextProvider>
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
          </ContextualMenuContextProvider>
        </NavigationContextProvider>
      </DialogContextProvider>
    </ExtAppContextProvider>
  </MemoryRouter>;

const storage = new mockStorage();
const port = new mockPort(storage);

export const proVersion = Template.bind({});
proVersion.args = {
  port: port,
  storage: storage
};

const ceStorage = new mockStorage();
const cePort = new mockPort(ceStorage);
cePort.addRequestListener("passbolt.organization-settings.get", () => siteSettingsCe);
export const ceVersion = Template.bind({});
ceVersion.args = {
  port: cePort,
  storage: ceStorage
};
