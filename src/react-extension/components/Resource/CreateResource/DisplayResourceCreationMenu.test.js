
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */
import DisplayResourceCreationMenuPage from "./DisplayResourceCreationMenu.test.page";
import CreateResource from "./CreateResource";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import {waitFor} from "@testing-library/dom";
import {resourceTypeTotpDto, resourceTypeV5PasswordStringDto} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_TOTP_SLUG, RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import {
  defaultProps,
  fullV5AndPartialV4ContentTypes,
  onlyPasswordV5ContentTypes,
  onlyTotpV5ContentTypes,
  onlyV4ContentTypesProps,
  onlyV5ContentTypesProps
} from "./DisplayResourceCreationMenu.test.data";
import {defaultFolderDto} from "../../../../shared/models/entity/folder/folderEntity.test.data";

/**
 * Unit tests on Display Resource Creation Menu in regard of specifications
 */
describe("See the Display Resource Creation Menu", () => {
  describe('Styleguide specifications', () => {
    it('should display the component matches the styleguide', async() => {
      expect.assertions(11);

      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceCreationMenuPage(props);

      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Create a resource");

      // Close button exists
      expect(page.dialogClose).not.toBeNull();

      // tabs should be displayed
      expect(page.tabs).not.toBeNull();
      expect(page.encryptedMetadataTab).not.toBeNull();
      expect(page.legacyCleartextMetadataTab).not.toBeNull();
      expect(page.encryptedMetadataTab.textContent).toBe("Resources with encrypted metadata");
      expect(page.legacyCleartextMetadataTab.textContent).toBe("Legacy resources");

      // first content type available
      expect(page.getContentTypeName(1).textContent).toStrictEqual("Password");

      // second content type available
      expect(page.getContentTypeName(2).textContent).toStrictEqual("TOTP");

      // third content type available
      expect(page.getContentTypeName(3).textContent).toStrictEqual("Custom fields");
    });

    it("should close the dialog when pressing escape", async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceCreationMenuPage(props);

      expect(page.exists()).toBeTruthy();
      page.pressEscapeKey();

      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it("should display only encrypted metadata content types without tabs", () => {
      expect.assertions(5);

      const props = onlyV5ContentTypesProps(); // The props to pass
      const page = new DisplayResourceCreationMenuPage(props);

      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Create a resource");

      // tabs should not be displayed
      expect(page.tabs).toBeNull();

      // first content type available
      expect(page.getContentTypeName(1).textContent).toStrictEqual("Password");

      // second content type available
      expect(page.getContentTypeName(2).textContent).toStrictEqual("TOTP");
    });

    it("should display only legacy cleartext metadata content types without tabs", () => {
      expect.assertions(7);

      const props = onlyV4ContentTypesProps(); // The props to pass
      const page = new DisplayResourceCreationMenuPage(props);

      // is dialog ready
      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toBe("Create a resource");

      // tabs should not be displayed
      expect(page.tabs).toBeNull();

      // first content type available
      expect(page.getContentTypeName(1).textContent).toStrictEqual("Password (legacy)");
      expect(page.getContentTypeDescription(1).textContent).toStrictEqual("with cleartext metadata");

      // second content type available
      expect(page.getContentTypeName(2).textContent).toStrictEqual("TOTP (legacy)");
      expect(page.getContentTypeDescription(2).textContent).toStrictEqual("with cleartext metadata");
    });

    it("should switch tab when clicking on legacy cleartext metadata tab", async() => {
      expect.assertions(8);

      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceCreationMenuPage(props);

      // is dialog ready
      expect(page.exists()).toBeTruthy();

      // tabs should not be displayed
      expect(page.tabs).not.toBeNull();
      expect(page.activeTab.textContent).toStrictEqual("Resources with encrypted metadata");

      page.clickOn(page.legacyCleartextMetadataTab);
      expect(page.activeTab.textContent).toBe("Legacy resources");

      // first content type available
      expect(page.getContentTypeName(1).textContent).toStrictEqual("Password (legacy)");
      expect(page.getContentTypeDescription(1).textContent).toStrictEqual("with cleartext metadata");

      // second content type available
      expect(page.getContentTypeName(2).textContent).toStrictEqual("TOTP (legacy)");
      expect(page.getContentTypeDescription(2).textContent).toStrictEqual("with cleartext metadata");
    });

    it("should not display Password V5 button if no password content type is available", () => {
      expect.assertions(3);

      const props = onlyTotpV5ContentTypes(); // The props to pass
      const page = new DisplayResourceCreationMenuPage(props);

      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();

      // first content type available
      expect(page.getContentTypeName(1).textContent).toStrictEqual("TOTP");

      // second content type availability
      expect(page.getContentTypeName(2)).toBeUndefined();
    });

    it("should not display TOTP V5 button if no totp content type is available", () => {
      expect.assertions(3);

      const props = onlyPasswordV5ContentTypes(); // The props to pass
      const page = new DisplayResourceCreationMenuPage(props);

      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();

      // first content type available
      expect(page.getContentTypeName(1).textContent).toStrictEqual("Password");

      // second content type availability
      expect(page.getContentTypeName(2)).toBeUndefined();
    });

    it("should not display Password V4 button if no password content type is available", () => {
      expect.assertions(4);

      const props = fullV5AndPartialV4ContentTypes(); // The props to pass
      const page = new DisplayResourceCreationMenuPage(props);

      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      page.clickOn(page.legacyCleartextMetadataTab);

      // first content type available
      expect(page.getContentTypeName(1).textContent).toStrictEqual("Password (legacy)");
      expect(page.getContentTypeDescription(1).textContent).toStrictEqual("with cleartext metadata");

      // second content type availability
      expect(page.getContentTypeName(2)).toBeUndefined();
    });

    it("should not display TOTP V4 button if no totp content type is available", () => {
      expect.assertions(4);

      const props = onlyPasswordV5ContentTypes({
        resourceTypes: new ResourceTypesCollection([
          resourceTypeV5PasswordStringDto(),
          resourceTypeTotpDto(),
        ]),
      });
      const page = new DisplayResourceCreationMenuPage(props);

      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      page.clickOn(page.legacyCleartextMetadataTab);

      // first content type available
      expect(page.getContentTypeName(1).textContent).toStrictEqual("TOTP (legacy)");
      expect(page.getContentTypeDescription(1).textContent).toStrictEqual("with cleartext metadata");

      // second content type availability
      expect(page.getContentTypeName(2)).toBeUndefined();
    });
  });

  describe("should open the resource creation dialog with the right parameters", () => {
    it("should open the dialog with the right resource type", async() => {
      expect.assertions(7);

      const props = defaultProps(); // The props to pass
      const page = new DisplayResourceCreationMenuPage(props);

      const folderParentId = null;

      //click on password v5
      page.clickOn(page.displayedContentTypes[0]);
      await waitFor(() => {});
      let resourceType = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResource, {resourceType, folderParentId});

      //click on totp v5
      page.clickOn(page.displayedContentTypes[1]);
      await waitFor(() => {});
      resourceType = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_TOTP_SLUG);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResource, {resourceType, folderParentId});

      //click on custom fields v5
      page.clickOn(page.displayedContentTypes[2]);
      await waitFor(() => {});
      resourceType = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResource, {resourceType, folderParentId});

      //switch tab
      page.clickOn(page.legacyCleartextMetadataTab);
      await waitFor(() => {});

      //click on password v4
      page.clickOn(page.displayedContentTypes[0]);
      await waitFor(() => {});
      resourceType = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResource, {resourceType, folderParentId});

      //click on totp v4
      page.clickOn(page.displayedContentTypes[1]);
      await waitFor(() => {});
      resourceType = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_TOTP_SLUG);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResource, {resourceType, folderParentId});

      expect(props.dialogContext.open).toHaveBeenCalledTimes(5);
      expect(props.onClose).toHaveBeenCalledTimes(5);
    });

    it("should open the dialog with the right folder parent id set", async() => {
      expect.assertions(3);

      const folder = defaultFolderDto();

      const props = defaultProps(); // The props to pass
      props.resourceWorkspaceContext.filter = {
        type: ResourceWorkspaceFilterTypes.FOLDER,
        payload: {
          folder: folder,
        }
      };
      const page = new DisplayResourceCreationMenuPage(props);

      //click on password v5
      page.clickOn(page.displayedContentTypes[0]);
      await waitFor(() => {});
      const resourceType = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
      expect(props.dialogContext.open).toHaveBeenCalledWith(CreateResource, {resourceType: resourceType, folderParentId: folder.id});

      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });
});
