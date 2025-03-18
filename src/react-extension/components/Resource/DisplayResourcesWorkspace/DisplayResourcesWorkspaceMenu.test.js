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

import "../../../../../test/mocks/mockClipboard";
import DisplayResourcesWorkspaceMenuPage from "./DisplayResourcesWorkspaceMenu.test.page";
import {
  defaultAppContext,
  defaultPropsMultipleResource,
  defaultPropsMultipleResourceUpdateRights,
  defaultPropsNoResource,
  defaultPropsOneResourceNotOwned,
  defaultPropsOneResourceOwned, defaultPropsOneTotpResourceOwned
} from "./DisplayResourcesWorkspaceMenu.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Workspace Menu", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  describe('As LU I can see the workspace menu with one resource selected owned', () => {
    const propsOneResourceOwned = defaultPropsOneResourceOwned(); // The props to pass

    /**
     * Given a selected resource
     * When I open the more menu
     * Then I should see the delete
     * Then I should see the edit menu
     * Then I should see the permalink menu
     * Then I should see the copy menu
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMenuPage(context, propsOneResourceOwned);
    });

    it('As LU I can start deleting a resource via the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuDelete).toBeNull();
    });

    it('As LU I can start editing a resource via the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.editMenu).toBeNull();
    });

    it('As LU I cannot start to mark as expired a resource if the feature flag password expiry is enabled but the feature is disabled', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuMarkAsExpired).toBeNull();
    });

    it('As LU I cannot start to set the expiry date on a resource via the workspace main menu if password expiry is not enabled', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuSetExpiryDate).toBeNull();
    });

    it('As LU I can start copying a resource\'s permalink via the workspace main menu', async() => {
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuPermalink).toBeNull();
    });

    it('As LU I should be able to copy a resource username from the workspace main menu', async() => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuUsername).toBeNull();
    });

    it('As LU I can start sharing a resource via the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.shareMenu).toBeNull();
    });

    it('As LU I should be able to copy a resource secret from the workspace main menu', async() => {
      expect.assertions(1);
      expect(page.displayMenu.copyMenu).toBeNull();
    });

    it('As LU I should be able to copy a resource secret from the more menu', async() => {
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuSecret).toBeNull();
    });

    it('As LU I can toggle the resource sidebar', async() => {
      expect.assertions(1);
      expect(page.displayMenu.menuDetailInformationSelected).toBeNull();
    });

    it('As LU I can unselect and select a column resource', async() => {
      expect.assertions(1);
      expect(page.displayMenu.menuColumnView).toBeNull();
    });

    it('As LU I can unselect a column resource', async() => {
      expect.assertions(1);
      expect(page.displayMenu.menuDetailInformationSelected).toBeNull();
    });
  });

  describe("As LU I cannot use the password expiry feature if the feature flag is disabled", () => {
    it('As LU when I open the more menu, the password expiry feature is not present', () => {
      expect.assertions(2);
      const context = defaultAppContext(); // The applicative context
      context.siteSettings.settings.passbolt.plugins.passwordExpiry.enabled = false;

      const propsOneResourceOwned = defaultPropsOneResourceOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMenuPage(context, propsOneResourceOwned);

      expect(page.displayMenu.dropdownMenuMarkAsExpired).toBeNull();
      expect(page.displayMenu.dropdownMenuSetExpiryDate).toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with one totp resource selected owned', () => {
    const propsOneResourceOwned = defaultPropsOneTotpResourceOwned(); // The props to pass

    /**
     * Given a selected resource
     * When I open the more menu
     * Then I should see the delete
     * Then I should see the edit menu
     * Then I should see the copy totp menu
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMenuPage(context, propsOneResourceOwned);
    });

    it('As LU I can start deleting a resource via the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuDelete).toBeNull();
    });

    it('As LU I can start editing a resource via the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.editMenu).toBeNull();
    });

    it('As LU I should be able to copy a resource secret from the more menu', async() => {
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuSecret).toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with one resource selected not owned', () => {
    const propsOneResourceNotOwned = defaultPropsOneResourceNotOwned(); // The props to pass

    /**
     * Given a selected resource not owned
     * When I open the more menu
     * Then I should see the delete disable
     * Then I should see the edit menu disable
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMenuPage(context, propsOneResourceNotOwned);
    });

    it('As LU I cannot delete a resource I do not have update permission from the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
    });

    it('As LU I cannot edit a resource I do not have update permission from the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
    });

    it('As LU I cannot share a resource I do not own from the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
    });

    it('As LU I can see the toggle button for the detail resource sidebar unselected', () => {
      expect(page.displayMenu.menuDetailInformationSelected).toBeNull();
      expect(page.displayMenu.menuDetailInformation).toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with no resource selected', () => {
    const propsNoResource = defaultPropsNoResource(); // The props to pass

    /**
     * Given no selected resource
     * Then I should see the more menu disable
     * Then I should see the edit menu disable
     * Then I should see the copy menu disable
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMenuPage(context, propsNoResource);
    });

    it('As LU I should see the delete button disable if nothing is selected', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
    });

    it('As LU I should see the edit button disable if nothing is selected', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
    });

    it('As LU I should see the share button disable if nothing is selected', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
    });

    it('As LU I should see the copy button disable if nothing is selected', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with multiple resource selected', () => {
    const propsMultipleResource = defaultPropsMultipleResourceUpdateRights(); // The props to pass

    /**
     * Given multiple selected resource
     * Then I should see the edit menu disable
     * Then I should see the permalink menu disable
     * Then I should see the copy menu disable
     * Then I should see the delete menu
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMenuPage(context, propsMultipleResource);
    });

    it('As LU I should see the edit button disable if multiple resources is selected', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
    });

    it('As LU I should see the copy permalink disable if multiple resources is selected', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
    });

    it('As LU I should see the copy username disable if multiple resources is selected', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
    });

    it('As LU I should see the copy button disable if multiple resources is selected', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
    });

    it('As LU I can start deleting multiple resources via the workspace main menu', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuDelete).toBeNull();
    });

    it('As LU I should be able to mark resources as expired from the more menu', async() => {
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuMarkAsExpired).toBeNull();
    });

    it('As LU I should see an error if the resources cannot be mark as expired from the more menu', async() => {
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuMarkAsExpired).toBeNull();
    });

    it('As LU I should be able to set expiry date from the more menu', async() => {
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
      expect(page.displayMenu.dropdownMenuSetExpiryDate).toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with multiple resource selected I don’t have update permissions on all the selected resources', () => {
    const propsMultipleResource = defaultPropsMultipleResource(); // The props to pass

    /**
     * Given multiple selected resource
     * Then I should see the delete menu disable
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMenuPage(context, propsMultipleResource);
    });

    it('As LU I cannot delete multiple resources from the workspace main menu if I don’t have update permissions on all the selected resources', () => {
      expect(page.displayMenu.exists()).toBeFalsy();
      expect(page.displayMenu.moreMenu).toBeNull();
    });
  });
});
