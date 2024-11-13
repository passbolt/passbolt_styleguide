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
import DisplayMainMenu from "../../Common/Menu/DisplayMainMenu";
import Footer from "../../Common/Footer/Footer";
import RbacContextProvider from "../../../../shared/context/Rbac/RbacContext";
import MetadataTypesSettingsLocalStorageContextProvider from "../../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import ResourceTypesLocalStorageContextProvider from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";

/**
 * DisplayResourcesWorkspace stories
 */
export default {
  title: 'Workspaces/Resource',
  component: DisplayResourcesWorkspace
};

const Template = ({...args}) =>
  <MemoryRouter initialEntries={['/app/passwords']}>
    <ExtAppContextProvider storage={args.storage} port={args.port}>
      <RbacContextProvider>
        <DialogContextProvider>
          <NavigationContextProvider>
            <ContextualMenuContextProvider>
              <ResourceWorkspaceContextProvider>
                <MetadataTypesSettingsLocalStorageContextProvider>
                  <ResourceTypesLocalStorageContextProvider>
                    <ResourcePasswordGeneratorContextProvider>
                      <ManageContextualMenu/>
                      <ManageDialogs/>
                      <DragContextProvider>
                        <div id="container" className="page password">
                          <div id="app" className="app ready" tabIndex="1000">
                            <div className="header first">
                              <DisplayMainMenu/>
                            </div>
                            <DisplayResourcesWorkspace {...args}/>
                          </div>
                          <Footer/>
                        </div>
                      </DragContextProvider>
                    </ResourcePasswordGeneratorContextProvider>
                  </ResourceTypesLocalStorageContextProvider>
                </MetadataTypesSettingsLocalStorageContextProvider>
              </ResourceWorkspaceContextProvider>
            </ContextualMenuContextProvider>
          </NavigationContextProvider>
        </DialogContextProvider>
      </RbacContextProvider>
    </ExtAppContextProvider>
  </MemoryRouter>;

const storage = mockStorage();
const port = mockPort(storage);

export const proVersion = Template.bind({});
proVersion.args = {
  port: port,
  storage: storage
};

const ceStorage = mockStorage();
const cePort = mockPort(ceStorage);
cePort.addRequestListener("passbolt.organization-settings.get", () => siteSettingsCe);
export const ceVersion = Template.bind({});
ceVersion.args = {
  port: cePort,
  storage: ceStorage
};
