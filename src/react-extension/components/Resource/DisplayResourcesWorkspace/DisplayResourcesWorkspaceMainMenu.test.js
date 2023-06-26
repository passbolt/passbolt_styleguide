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

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayResourcesWorkspaceMainMenu", () => {
  describe('As LU I can use the workspace create button', () => {
    it('As LU I can use the workspace create button if no folder is selected', async() => {
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
    });

    it('As LU I can use the workspace create button if I have the permission to create in the selected folder', async() => {
      const props = defaultPropsFolderOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
    });

    it('As LU I cannot use the workspace create button if I do not have the permission to create in the selected folder', async() => {
      const props = defaultPropsFolderNotOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeTruthy();
    });
  });

  describe('As LU I can create resource', () => {
    it('As LU I can create a resource if I have not selected any folder', async() => {
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu).not.toBeNull();
    });

    it('As LU I can create resource if I have selected a folder I am allowed to create in', async() => {
      const props = defaultPropsFolderOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu).not.toBeNull();
    });
  });

  describe('As LU I can create folder', () => {
    it('As LU I can create folder if I have not selected any folder', async() => {
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newFolderMenu).not.toBeNull();
    });

    it('As LU I can create folder if I have selected a folder I am allowed to create in', async() => {
      const props = defaultPropsFolderOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newFolderMenu).not.toBeNull();
    });

    it('As LU I cannot use the create folder button if disabled by API flag', async() => {
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
      const props = propsWithDenyUiAction(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newFolderMenu).toBeNull();
    });
  });

  describe('As LU I can import resources', () => {
    it('As LU I can import resources', async() => {
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.importMenu).not.toBeNull();
    });

    it('As LU I cannot use the workspace import button if disabled by API flag', async() => {
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
      const props = propsWithDenyUiAction(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.importMenu).toBeNull();
    });
  });
});
