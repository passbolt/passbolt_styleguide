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
 * @since         4.10.0
 */
import {defaultProps} from "./MoreFiltersPage.test.data";
import MoreFiltersPage from "./MoreFiltersPage.test.page";
import {createMemoryHistory} from "history";
import {waitForTrue} from "../../../../test/utils/waitFor";
import expect from "expect";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV50FreshDto,
  defaultMetadataTypesSettingsV6Dto
} from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesV4CollectionDto,
  resourceTypesV5CollectionDto
} from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MoreFiltersPage", () => {
  describe("As LU I can navigate from the 'Filter by tag' page", () => {
    it("should allow to go back on the previous page", async() => {
      expect.assertions(1);

      const props = defaultProps();

      props.history = createMemoryHistory({
        initialEntries: [
          "/home",
          "/test"
        ],
        initialIndex: 1,
      });

      const initialPath = props.history.location.pathname.toString();
      props.history.goBack();

      const page = new MoreFiltersPage(props);

      await page.clickOnBackButton();
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual("/home");
    });
  });

  describe("As LU I can create resource from the button", () => {
    it("should display the button if metadata type settings and resource types are loaded", () => {
      const props = defaultProps();
      const page = new MoreFiltersPage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should display the button if metadata type settings and resource types are loaded for v5", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
      const props = defaultProps({metadataTypeSettings: metadataTypeSettingEntity});
      const page = new MoreFiltersPage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should not display the button if metadata type settings are not loaded", () => {
      const props = defaultProps({metadataTypeSettings: null});
      const page = new MoreFiltersPage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if resource types are not loaded", () => {
      const props = defaultProps({resourceTypes: null});
      const page = new MoreFiltersPage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v5 and only v4 resource types is available", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const props = defaultProps({metadataTypeSettings: metadataTypeSettingEntity, resourceTypes: resourceTypesCollection});
      const page = new MoreFiltersPage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v4 and only v5 resource types is available", () => {
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      const props = defaultProps({resourceTypes: resourceTypesCollection});
      const page = new MoreFiltersPage(props);
      expect(page.createButton).toBeNull();
    });
  });
});
