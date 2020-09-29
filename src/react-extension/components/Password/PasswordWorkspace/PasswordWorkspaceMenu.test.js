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



import PasswordWorkspaceMenuPage from "./PasswordWorkspaceMenu.test.page";
import {
  defaultAppContext,
  defaultPropsNoResource, defaultPropsOneResourceNotOwned,
  defaultPropsOneResourceOwned
} from "./PasswordWorkspaceMenu.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Workspace Menu", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const propsOneResourceOwned = defaultPropsOneResourceOwned(); // The props to pass
  const propsOneResourceNotOwned = defaultPropsOneResourceNotOwned(); // The props to pass
  const propsNoResource = defaultPropsNoResource(); // The props to pass

  describe('As LU I can see the workspace menu with one resource selected owned', () => {
    /**
     * Given a selected resource
     * When I open the more menu
     * Then I should see the delete
     */

    beforeEach(() => {
      page = new PasswordWorkspaceMenuPage(context, propsOneResourceOwned);
    });

    it('As LU I can start deleting a resource via the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.dropdownMenuDelete).not.toBeNull();
      expect(page.displayMenu.dropdownMenuDeleteDisabled).toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with one resource selected not owned', () => {
    /**
     * Given a selected resource not owned
     * When I open the more menu
     * Then I should see the delete disable
     */

    beforeEach(() => {
      page = new PasswordWorkspaceMenuPage(context, propsOneResourceNotOwned);
    });

    it('As LU I cannot delete a resource I do not have update permission from the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.dropdownMenuDeleteDisabled).not.toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with no resource selected', () => {
    /**
     * Given no selected resource
     * Then I should see the more menu disable
     */

    beforeEach(() => {
      page = new PasswordWorkspaceMenuPage(context, propsNoResource);
    });

    it('As LU I should see the delete button disable if nothing is selected', () => {
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenuDisabled).not.toBeNull();
    });
  });
});
