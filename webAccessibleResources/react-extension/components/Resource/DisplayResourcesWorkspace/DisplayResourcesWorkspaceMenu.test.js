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
  defaultPropsOneResourceNotOwned,
  defaultPropsOneResourceOwned,
  defaultPropsOneResourceV5Private, defaultPropsOneResourceV5Shared,
  defaultPropsOneTotpResourceOwned
} from "./DisplayResourcesWorkspaceMenu.test.data";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {
  plaintextSecretPasswordDescriptionTotpDto, plaintextSecretPasswordStringDto
} from "../../../../shared/models/entity/plaintextSecret/plaintextSecretEntity.test.data";
import PasswordExpiryDialog from "../PasswordExpiryDialog/PasswordExpiryDialog";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";
import MetadataKeysSettingsEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import {
  defaultMetadataKeysSettingsDto
} from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
import {v4 as uuidv4} from "uuid";
import ActionAbortedMissingMetadataKeys
  from "../../Metadata/ActionAbortedMissingMetadataKeys/ActionAbortedMissingMetadataKeys";

beforeEach(() => {
  jest.resetModules();
});

describe("See Workspace Menu", () => {
  let page; // The page to test against

  describe('As LU I can see the workspace menu with one resource selected owned', () => {
    const propsOneResourceOwned = defaultPropsOneResourceOwned(); // The props to pass
    const context = propsOneResourceOwned.context;

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
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.deleteMenu).not.toBeNull();
    });

    it('As LU I can start editing a resource via the workspace main menu', () => {
      expect.assertions(2);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.editMenu).not.toBeNull();
    });

    it('As LU I cannot start to mark as expired a resource if the feature flag password expiry is enabled but the feature is disabled', () => {
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.dropdownMenuMarkAsExpired).toBeNull();
    });

    it('As LU I cannot start to set the expiry date on a resource via the workspace main menu if password expiry is not enabled', () => {
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.dropdownMenuSetExpiryDate).toBeNull();
    });

    it('As LU I can start copying a resource\'s permalink via the workspace main menu', async() => {
      expect.assertions(4);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.copyMenuDropdown).not.toBeNull();
      page.displayMenu.clickOnCopyMenu();
      expect(page.displayMenu.permalinkMenu).not.toBeNull();
      // Mock the notification function
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.displayMenu.clickOnMenu(page.displayMenu.permalinkMenu);

      expect(propsOneResourceOwned.clipboardContext.copy).toHaveBeenCalledWith(`${context.userSettings.getTrustedDomain()}/app/passwords/view/${propsOneResourceOwned.resourceWorkspaceContext.selectedResources[0].id}`, "The permalink has been copied to clipboard.");
    });

    it('As LU I should be able to copy a resource username from the workspace main menu', async() => {
      expect.assertions(5);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.copyMenuDropdown).not.toBeNull();
      page.displayMenu.clickOnCopyMenu();
      expect(page.displayMenu.usernameMenu).not.toBeNull();
      expect(page.displayMenu.hasDropdownMenuUsernameDisabled()).toBeFalsy();
      // Mock the notification function
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.displayMenu.clickOnMenu(page.displayMenu.usernameMenu);

      expect(propsOneResourceOwned.clipboardContext.copy).toHaveBeenCalledWith(propsOneResourceOwned.resourceWorkspaceContext.selectedResources[0].metadata.username, "The username has been copied to clipboard.");
    });

    it('As LU I should be able to copy a resource uri from the workspace main menu', async() => {
      expect.assertions(5);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.copyMenuDropdown).not.toBeNull();
      page.displayMenu.clickOnCopyMenu();
      expect(page.displayMenu.uriMenu).not.toBeNull();
      expect(page.displayMenu.hasDropdownMenuUriDisabled()).toBeFalsy();
      // Mock the notification function
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.displayMenu.clickOnMenu(page.displayMenu.uriMenu);

      expect(propsOneResourceOwned.clipboardContext.copy).toHaveBeenCalledWith(propsOneResourceOwned.resourceWorkspaceContext.selectedResources[0].metadata.uris[0], "The uri has been copied to clipboard.");
    });

    it('As LU I can start sharing a resource via the workspace main menu', () => {
      expect.assertions(2);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.shareMenu).not.toBeNull();
    });

    it('As LU I should be able to copy a resource secret from the copy menu', async() => {
      expect.assertions(5);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.copyMenuDropdown).not.toBeNull();
      page.displayMenu.clickOnCopyMenu();
      expect(page.displayMenu.dropdownMenuSecret).not.toBeNull();
      // Mock the notification function
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => plaintextSecretPasswordStringDto());

      await page.displayMenu.clickOnMenu(page.displayMenu.dropdownMenuSecret);

      expect(context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', propsOneResourceOwned.resourceWorkspaceContext.selectedResources[0].id);
      expect(propsOneResourceOwned.clipboardContext.copyTemporarily).toHaveBeenCalledWith('secret-password', "The secret has been copied to clipboard.");
    });
  });

  describe("As LU I cannot use the password expiry feature if the feature flag is disabled", () => {
    it('As LU when I open the more menu, the password expiry feature is not present', () => {
      expect.assertions(2);
      const context = defaultAppContext(); // The applicative context
      context.siteSettings.settings.passbolt.plugins.passwordExpiry.enabled = false;

      const propsOneResourceOwned = defaultPropsOneResourceOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMenuPage(context, propsOneResourceOwned);

      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.dropdownMenuMarkAsExpired).toBeNull();
      expect(page.displayMenu.dropdownMenuSetExpiryDate).toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with one totp resource selected owned', () => {
    const propsOneResourceOwned = defaultPropsOneTotpResourceOwned(); // The props to pass
    const context = propsOneResourceOwned.context;

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
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.deleteMenu).not.toBeNull();
    });

    it('As LU I can start editing a resource via the workspace main menu', () => {
      expect.assertions(2);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.editMenu).not.toBeNull();
    });

    it('As LU I should be able to copy a resource secret from the copy menu', async() => {
      expect.assertions(5);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.copyMenuDropdown).not.toBeNull();
      page.displayMenu.clickOnCopyMenu();
      expect(page.displayMenu.dropdownMenuSecret).not.toBeNull();
      // Mock the notification function
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => plaintextSecretPasswordDescriptionTotpDto());

      await page.displayMenu.clickOnMenu(page.displayMenu.dropdownMenuTotp);

      expect(context.port.request).toHaveBeenCalledWith('passbolt.secret.find-by-resource-id', propsOneResourceOwned.resourceWorkspaceContext.selectedResources[0].id);
      expect(propsOneResourceOwned.clipboardContext.copyTemporarily).toHaveBeenCalledWith(expect.stringMatching(/^[0-9]{6}/), "The TOTP has been copied to clipboard.");
    });
  });

  describe('As LU I can see the workspace menu with one resource selected not owned', () => {
    const propsOneResourceNotOwned = defaultPropsOneResourceNotOwned(); // The props to pass
    const context = propsOneResourceNotOwned.context;

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
      expect.assertions(3);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.deleteMenuDisabled).not.toBeNull();
    });

    it('As LU I cannot edit a resource I do not have update permission from the workspace main menu', () => {
      expect.assertions(2);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.editMenu).toBeNull();
    });

    it('As LU I cannot share a resource I do not own from the workspace main menu', () => {
      expect.assertions(2);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.shareMenu).toBeNull();
    });
  });

  describe('As LU I can see the workspace menu with multiple resource selected', () => {
    const propsMultipleResource = defaultPropsMultipleResourceUpdateRights(); // The props to pass
    const context = propsMultipleResource.context;

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

    it('As LU I should not see the edit button if multiple resources is selected', () => {
      expect.assertions(2);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.editMenu).toBeNull();
    });

    it('As LU I should not see the copy button if multiple resources is selected', () => {
      expect.assertions(2);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.copyMenuDropdown).toBeNull();
    });

    it('As LU I can start deleting multiple resources via the workspace main menu', async() => {
      expect.assertions(2);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.deleteMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.deleteMenu);
    });

    it('As LU I should be able to mark resources as expired from the more menu', async() => {
      expect.assertions(5);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.dropdownMenuMarkAsExpired).not.toBeNull();
      // Mock the notification function
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => jest.fn());

      await page.displayMenu.clickOnMenu(page.displayMenu.dropdownMenuMarkAsExpired);

      expect(context.port.request).toHaveBeenCalledWith('passbolt.resources.set-expiration-date', propsMultipleResource.resourceWorkspaceContext.selectedResources.map(resource => ({id: resource.id, expired: expect.any(String)})));
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
    });

    it('As LU I should see an error if the resources cannot be mark as expired from the more menu', async() => {
      expect.assertions(5);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.dropdownMenuMarkAsExpired).not.toBeNull();
      // Mock the notification function
      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => { throw new Error('error'); });

      await page.displayMenu.clickOnMenu(page.displayMenu.dropdownMenuMarkAsExpired);

      expect(context.port.request).toHaveBeenCalledWith('passbolt.resources.set-expiration-date', propsMultipleResource.resourceWorkspaceContext.selectedResources.map(resource => ({id: resource.id, expired: expect.any(String)})));
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalled();
    });

    it('As LU I should be able to set expiry date from the more menu', async() => {
      expect.assertions(4);
      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.moreMenu).not.toBeNull();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.dropdownMenuSetExpiryDate).not.toBeNull();

      await page.displayMenu.clickOnMenu(page.displayMenu.dropdownMenuSetExpiryDate);

      expect(propsMultipleResource.dialogContext.open).toHaveBeenCalledWith(PasswordExpiryDialog, {resources: propsMultipleResource.resourceWorkspaceContext.selectedResources});
    });
  });

  describe("As LU I can see the workspace menu with multiple resource selected I don't have update permissions on all the selected resources", () => {
    const propsMultipleResource = defaultPropsMultipleResource(); // The props to pass
    const context = propsMultipleResource.context;

    /**
     * Given multiple selected resource
     * Then I should see the delete menu disable
     */

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMenuPage(context, propsMultipleResource);
    });

    it("As LU I cannot delete multiple resources from the workspace main menu if I don't have update permissions on all the selected resources", () => {
      expect.assertions(2);

      expect(page.displayMenu.exists()).toBeTruthy();
      page.displayMenu.clickOnMoreMenu();
      expect(page.displayMenu.deleteMenu).toBeNull();
    });
  });

  describe("As LU I should be able to deselect all resources from the action bar", () => {
    const propsMultipleResource = defaultPropsMultipleResource(); // The props to pass
    const context = propsMultipleResource.context;

    beforeEach(() => {
      page = new DisplayResourcesWorkspaceMenuPage(context, propsMultipleResource);
    });

    it("As LU if I click on the clear selection button, the current selection should be cleared and the action bar updated accordingly", () => {
      expect.assertions(3);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.clearSelection).not.toBeNull();
      page.displayMenu.clickOnClearSelection();
      expect(propsMultipleResource.resourceWorkspaceContext.onResourceSelected.none).toHaveBeenCalledTimes(1);
    });
  });

  describe("As LU I should see action aborted", () => {
    it('As LU I cannot edit a resource v5 if metadata keys settings enforced metadata shared key and user has missing keys', async() => {
      expect.assertions(2);
      const props = defaultPropsOneResourceV5Private({
        context: defaultUserAppContext({loggedInUser: defaultUserDto({missing_metadata_key_ids: [uuidv4()]}, {withRole: true})}),
        metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto({allow_usage_of_personal_keys: false})),
      }); // The props to pass
      const page = new DisplayResourcesWorkspaceMenuPage(props.context, props);

      expect(page.displayMenu.exists()).toBeTruthy();

      await page.displayMenu.clickOnMenu(page.displayMenu.editMenu);

      expect(props.dialogContext.open).toHaveBeenNthCalledWith(1, ActionAbortedMissingMetadataKeys);
    });

    it('As LU I cannot edit a shared resource v5 if user has missing keys', async() => {
      expect.assertions(2);
      const props = defaultPropsOneResourceV5Shared({
        context: defaultUserAppContext({loggedInUser: defaultUserDto({missing_metadata_key_ids: [uuidv4()]}, {withRole: true})}),
      }); // The props to pass
      const page = new DisplayResourcesWorkspaceMenuPage(props.context, props);

      expect(page.displayMenu.exists()).toBeTruthy();

      await page.displayMenu.clickOnMenu(page.displayMenu.editMenu);

      expect(props.dialogContext.open).toHaveBeenNthCalledWith(1, ActionAbortedMissingMetadataKeys);
    });
  });
});
