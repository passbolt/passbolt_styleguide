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
import DisplayResourcesWorkspace from "./DisplayResourcesWorkspace";
import ManageContextualMenu from "../../Common/ContextualMenu/ManageContextualMenu";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import ResourceWorkspaceContextProvider from "../../../contexts/ResourceWorkspaceContext";
import ResourcePasswordGeneratorContextProvider from "../../../contexts/ResourcePasswordGeneratorContext";
import DragContextProvider from "../../../contexts/DragContext";
import ContextualMenuContextProvider from "../../../contexts/ContextualMenuContext";
import ExtAppContextProvider from "../../../contexts/ExtAppContext";
import NavigationContextProvider from "../../../contexts/NavigationContext";
import DialogContextProvider from "../../../contexts/DialogContext";
import mockPort from "../../../../../test/mocks/mockPort";
import mockStorage from "../../../../../test/mocks/mockStorage";
import {siteSettingsCe} from "../../../test/fixture/Settings/siteSettings";
import RbacContextProvider from "../../../../shared/context/Rbac/RbacContext";
import MetadataTypesSettingsLocalStorageContextProvider from "../../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import ResourceTypesLocalStorageContextProvider from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import WorkflowContextProvider from "../../../contexts/WorkflowContext";
import ManageWorkflows from "../../Common/Workflow/ManageWorkflows/ManageWorkflows";
import PasswordExpirySettingsContextProvider from "../../../contexts/PasswordExpirySettingsContext";
import {ResizableSidebarContextProvider} from "../../../contexts/ResizeSidebar/ResizeSidebarContext";
import SecretRevisionsSettingsContextProvider from "../../../../shared/context/SecretRevisionSettingsContext/SecretRevisionsSettingsContext";

/**
 * DisplayResourcesWorkspace stories
 */
export default {
  title: 'Workspaces/Resource',
  component: DisplayResourcesWorkspace
};

const ExtApp = ({...args}) =>
  <MemoryRouter initialEntries={['/app/passwords']}>
    <ExtAppContextProvider storage={args.storage} port={args.port}>
      <RbacContextProvider>
        <WorkflowContextProvider>
          <DialogContextProvider>
            <ResizableSidebarContextProvider>
              <NavigationContextProvider>
                <ContextualMenuContextProvider>
                  <Route path={[
                    "/app/folders/view/:filterByFolderId",
                    "/app/passwords/view/:selectedResourceId",
                    "/app/passwords/filter/:filterType",
                    "/app/passwords",
                  ]}>
                    <PasswordExpirySettingsContextProvider>
                      <ResourceWorkspaceContextProvider>
                        <MetadataTypesSettingsLocalStorageContextProvider>
                          <ResourceTypesLocalStorageContextProvider>
                            <SecretRevisionsSettingsContextProvider>
                              <ResourcePasswordGeneratorContextProvider>
                                <ManageContextualMenu/>
                                <ManageDialogs/>
                                <ManageWorkflows/>
                                <DragContextProvider>
                                  <div id="container" className="page password">
                                    <div id="app" className="app ready" tabIndex="1000" style={{margin: "-1rem"}}>
                                      <DisplayResourcesWorkspace {...args}/>
                                    </div>
                                  </div>
                                </DragContextProvider>
                              </ResourcePasswordGeneratorContextProvider>
                            </SecretRevisionsSettingsContextProvider>
                          </ResourceTypesLocalStorageContextProvider>
                        </MetadataTypesSettingsLocalStorageContextProvider>
                      </ResourceWorkspaceContextProvider>
                    </PasswordExpirySettingsContextProvider>
                  </Route>
                </ContextualMenuContextProvider>
              </NavigationContextProvider>
            </ResizableSidebarContextProvider>
          </DialogContextProvider>
        </WorkflowContextProvider>
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
