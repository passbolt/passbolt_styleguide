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
import CreateResourceV5 from "../CreateResource/CreateResourceV5";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_TOTP_SLUG, RESOURCE_TYPE_V5_DEFAULT_SLUG, RESOURCE_TYPE_V5_TOTP_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesV4CollectionDto,
  resourceTypesV5CollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV50FreshDto, defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto
} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import DisplayResourceCreationMenu from "../CreateResource/DisplayResourceCreationMenu";

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

    it('As LU I can see the workspace create button with password and totp disabled if metadataTypesSettings is not loaded', async() => {
      expect.assertions(4);
      const props = defaultProps({metadataTypeSettings: null}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu.hasAttribute("disabled")).toBeTruthy();
      expect(page.displayMenu.newTotpMenu.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe('As LU I can create resource', () => {
    it('As LU I can create a resource if I have not selected any folder', async() => {
      expect.assertions(5);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);
      const resourceTypeExpected = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newPasswordMenu);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceV5, {folderParentId: null, resourceType: resourceTypeExpected});
    });

    it('As LU I can create a resource v5', async() => {
      expect.assertions(5);
      const props = defaultProps({metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto())}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);
      const resourceTypeExpected = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newPasswordMenu);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceV5, {folderParentId: null, resourceType: resourceTypeExpected});
    });

    it('As LU I can create resource if I have selected a folder I am allowed to create in', async() => {
      expect.assertions(5);
      const props = defaultPropsFolderOwned(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);
      const resourceTypeExpected = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newPasswordMenu);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceV5, {folderParentId: props.resourceWorkspaceContext.filter.payload.folder.id, resourceType: resourceTypeExpected});
    });

    it('As LU I cannot create a resource with password if metadata type settings default is V4 and resource types is only v5', async() => {
      expect.assertions(4);
      const props = defaultProps({resourceTypes: new ResourceTypesCollection(resourceTypesV5CollectionDto())}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu).toBeNull();
    });

    it('As LU I cannot create a resource with password if metadata type settings default is V5 and resource types is only v4', async() => {
      expect.assertions(4);
      const props = defaultProps({metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto()), resourceTypes: new ResourceTypesCollection(resourceTypesV4CollectionDto())}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newPasswordMenu).toBeNull();
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
      const resourceTypeExpected = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_TOTP_SLUG);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceV5, {folderParentId: null, resourceType: resourceTypeExpected});
    });

    it('As LU I can create a standalone totp v5', async() => {
      expect.assertions(5);
      const props = defaultProps({metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto())}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newTotpMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newTotpMenu);
      const resourceTypeExpected = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_TOTP_SLUG);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceV5, {folderParentId: null, resourceType: resourceTypeExpected});
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
      const resourceTypeExpected = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_TOTP_SLUG);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResourceV5, {folderParentId: props.resourceWorkspaceContext.filter.payload.folder.id, resourceType: resourceTypeExpected});
    });

    it('As LU I cannot create a standalone totp if metadata type settings default is V4 and resource types is only v5', async() => {
      expect.assertions(4);
      const props = defaultProps({resourceTypes: new ResourceTypesCollection(resourceTypesV5CollectionDto())}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newTotpMenu).toBeNull();
    });

    it('As LU I cannot create a standalone totp if metadata type settings default is V5 and resource types is only v4', async() => {
      expect.assertions(4);
      const props = defaultProps({metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto()), resourceTypes: new ResourceTypesCollection(resourceTypesV4CollectionDto())}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newTotpMenu).toBeNull();
    });
  });

  describe('As LU I can open the creation menu', () => {
    it('As LU I can open the creation menu', async() => {
      expect.assertions(5);
      const props = defaultProps({metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto())}); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newOtherMenu).not.toBeNull();
      await page.displayMenu.clickOnMenu(page.displayMenu.newOtherMenu);
      expect(props.dialogContext.open).toHaveBeenCalledWith(DisplayResourceCreationMenu, {folderParentId: null});
    });

    it('As LU I cannot see other menu if I have not resource type v5 and v4 allowed', async() => {
      expect.assertions(4);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      expect(page.displayMenu.createMenu).not.toBeNull();
      expect(page.displayMenu.hasCreateMenuDisabled()).toBeFalsy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
      expect(page.displayMenu.newOtherMenu).toBeNull();
    });
  });

  describe('As LU I can import resources', () => {
    it('As LU I can import resources', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourcesWorkspaceMainMenuPage(props);

      expect(page.displayMenu.exists()).toBeTruthy();
      await page.displayMenu.clickOnMenu(page.displayMenu.createMenu);
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
