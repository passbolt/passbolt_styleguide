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
 * @since         2.11.0
 */

import {
  defaultPropsFolderNotOwned,
  defaultPropsFolderOwned,
  defaultProps, propsWithDenyUiAction
} from "./DisplayResourcesWorkspaceMainMenu.test.data";
import DisplayResourcesWorkspaceMainMenuPage from "./DisplayResourcesWorkspaceMainMenu.test.page";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import CreateResource from "../CreateResource/CreateResource";
import HandleTotpWorkflow from "../HandleTotpWorkflow/HandleTotpWorkflow";
import {TotpWorkflowMode} from "../HandleTotpWorkflow/HandleTotpWorkflowMode";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayResourcesWorkspaceMainMenu", () => {
  describe('As LU I can use the workspace create button', () => {
    it('As LU I can use the workspace create button if no folder is selected', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
    });

    it('As LU I can use the workspace create button if I have the permission to create in the selected folder', async() => {
      expect.assertions(2);
      const props = defaultPropsFolderOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
    });

    it('As LU I cannot use the workspace create button if I do not have the permission to create in the selected folder', async() => {
      expect.assertions(2);
      const props = defaultPropsFolderNotOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeTruthy();
    });
  });

  describe('As LU I can create resource', () => {
    it('As LU I can create a resource if I have not selected any folder', async() => {
      expect.assertions(5);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newFolderMenu);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceFolder, {folderParentId: null});
    });

    it('As LU I can create resource if I have selected a folder I am allowed to create in', async() => {
      expect.assertions(5);
      const props = defaultPropsFolderOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newPasswordMenu);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResource, {folderParentId: props.resourceWorkspaceContext.filter.payload.folder.id});
    });
  });

  describe('As LU I can create folder', () => {
    it('As LU I can create folder if I have not selected any folder', async() => {
      expect.assertions(5);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newFolderMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newFolderMenu);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceFolder, {folderParentId: null});
    });

    it('As LU I can create folder if I have selected a folder I am allowed to create in', async() => {
      expect.assertions(5);
      const props = defaultPropsFolderOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newFolderMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newFolderMenu);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceFolder, {folderParentId: props.resourceWorkspaceContext.filter.payload.folder.id});
    });

    it('As LU I cannot use the create folder button if disabled by API flag', async() => {
      expect.assertions(4);
      const appContext = {
        siteSettings: {
          getServerTimezone: () => '',
          canIUse: () => false,
        }
      };
      const context = defaultUserAppContext(appContext);
      const props = defaultProps({context}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newFolderMenu).toBeNull();
    });

    it('As LU I cannot use the create folder button if denied by RBAC', async() => {
      expect.assertions(4);
      const props = propsWithDenyUiAction(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newFolderMenu).toBeNull();
    });
  });

  describe('As LU I can create standalone totp', () => {
    it('As LU I can create a standalone totp if I have not selected any folder', async() => {
      expect.assertions(5);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newTotpMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newTotpMenu);
      expect(props.workflowContext.start).toHaveBeenCalledWith(HandleTotpWorkflow, {mode: TotpWorkflowMode.CREATE_STANDALONE_TOTP, folderParentId: null});
    });

    it('As LU I can create standalone totp if I have selected a folder I am allowed to create in', async() => {
      expect.assertions(5);
      const props = defaultPropsFolderOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newTotpMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newTotpMenu);
      expect(props.workflowContext.start).toHaveBeenCalledWith(HandleTotpWorkflow, {mode: TotpWorkflowMode.CREATE_STANDALONE_TOTP, folderParentId: props.resourceWorkspaceContext.filter.payload.folder.id});
    });
  });

  describe('As LU I can import resources', () => {
    it('As LU I can import resources', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.importMenu).not.toBeNull();
    });

    it('As LU I cannot use the workspace import button if disabled by API flag', async() => {
      expect.assertions(2);
      const appContext = {
        siteSettings: {
          getServerTimezone: () => '',
          canIUse: () => false,
        }
      };
      const context = defaultUserAppContext(appContext);
      const props = defaultProps({context}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.importMenu).toBeNull();
    });

    it('As LU I cannot use the workspace import button if denied by RBAC', async() => {
      expect.assertions(2);
      const props = propsWithDenyUiAction(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.importMenu).toBeNull();
    });
  });
});
