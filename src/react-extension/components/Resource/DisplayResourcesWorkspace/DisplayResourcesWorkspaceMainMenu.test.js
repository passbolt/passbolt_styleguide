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

/**
 * Unit tests on DisplayComments in regard of specifications
 */

import {
  defaultAppContext,
  defaultAppContextProEdition,
  defaultPropsFolderNotOwned,
  defaultPropsFolderOwned,
  defaultPropsNoFolder
} from "./DisplayResourcesWorkspaceMainMenu.test.data";
import DisplayResourcesWorkspaceMainMenuPage from "./DisplayResourcesWorkspaceMainMenu.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See Workspace Main Menu", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  describe('As LU I can start adding a resource via the workspace main menu', () => {
    const propsFolderOwned = defaultPropsFolderOwned(); // The props to pass

    /**
     * Given a selected folder
     * Then I should see the create resource menu
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMainMenuPage(context, propsFolderOwned);
    });

    it('As LU I cannot start adding a resource via the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.createMenuDisabled).toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with one folder selected not owned', () => {
    const propsFolderNotOwned = defaultPropsFolderNotOwned(); // The props to pass

    /**
     * Given a selected folder not owned
     * Then I should see the create resource menu disable
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMainMenuPage(context, propsFolderNotOwned);
    });

    it('As LU I cannot start adding a resource via the workspace main menu if the folder selected have no update rights', () => {
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenuDisabled).not.toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with no folder selected', () => {
    const propsNoFolder = defaultPropsNoFolder(); // The props to pass

    /**
     * Given no selected resource
     * Then I should see the create resource menu
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMainMenuPage(context, propsNoFolder);
    });

    it('As LU I can start deleting a resource via the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.createMenuDisabled).toBeNull();
    });
  });

  describe('As LU I can start adding a resource via the workspace main menu PRO edition', () => {
    const contextPro = defaultAppContextProEdition(); // The applicative context
    const propsFolderOwned = defaultPropsFolderOwned(); // The props to pass

    /**
     * Given a selected folder
     * Then I should see the create resource menu
     * Then I should see the new password resource menu
     * Then I should see the new folder resource menu
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMainMenuPage(contextPro, propsFolderOwned);
    });

    it('As LU I cannot start adding a resource or a folder via the workspace main menu', async() => {
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.createMenuDisabled).toBeNull();

      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);

      expect(page.displayMenu.newPasswordMenu).not.toBeNull();
      expect(page.displayMenu.newFolderMenu).not.toBeNull();
    });
  });
});
