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
 * @since         4.9.4
 */
import {defaultResourceDto} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultAppContext} from "../../contexts/AppContext.test.data";
import {defaultProps, noFilteredResourcesProps} from "./FilterResourcesByItemsIOwnPage.test.data";
import FilterResourcesByItemsIOwnPagePage from "./FilterResourcesByItemsIOwnPage.test.page";
import {createMemoryHistory} from "history";
import {waitForTrue} from "../../../../test/utils/waitFor";
import {updatePermissionDto} from "../../../shared/models/entity/permission/permissionEntity.test.data";
import {
  defaultResourceMetadataDto
} from "../../../shared/models/entity/resourceMetadata/resourceMetadataEntity.test.data";
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

describe("FilterResourcesByItemsIOwnPage", () => {
  describe("As LU I should see resources I own", () => {
    it("should display a loading message", () => {
      expect.assertions(1);

      const page = new FilterResourcesByItemsIOwnPagePage(defaultProps());
      expect(page.displayedMainMessage).toStrictEqual("Retrieving your passwords");
    });

    it("should display all the owned resources if there is no search", () => {
      expect.assertions(3);
      const resource1 = defaultResourceDto();
      const resource2 = defaultResourceDto({permission: updatePermissionDto()});
      const resource3 = defaultResourceDto();
      const resource4 = defaultResourceDto({permission: updatePermissionDto()});
      const resources = [resource1, resource2, resource3, resource4];

      const page = new FilterResourcesByItemsIOwnPagePage(defaultProps({resources}));

      expect(page.resources?.length).toStrictEqual(2);
      expect(page.getResource(0).textContent).toStrictEqual(`${resource1.metadata.name} (${resource1.metadata.username})${resource1.metadata.uris[0]}`);
      expect(page.getResource(0).textContent).toStrictEqual(`${resource2.metadata.name} (${resource2.metadata.username})${resource2.metadata.uris[0]}`);
    });

    it("should display a message saying that there is no owned resources yet", () => {
      expect.assertions(1);

      const page = new FilterResourcesByItemsIOwnPagePage(noFilteredResourcesProps());
      expect(page.displayedMainMessage).toStrictEqual("You do not own any passwords yet. It does feel a bit empty here, create your first password.");
    });

    it("should display owned resources filtered by the search", () => {
      expect.assertions(1);
      const resource1 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "Match search"})});
      const resource2 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "No match"}), permission: updatePermissionDto()});
      const resource3 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "No match"})});
      const resource4 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "Match search"}), permission: updatePermissionDto()});
      const resources = [resource1, resource2, resource3, resource4];

      const props = defaultProps({
        context: defaultAppContext({
          search: "Match search",
        }),
        resources: resources,
      });
      const page = new FilterResourcesByItemsIOwnPagePage(props);
      expect(page.getResource(0).textContent).toStrictEqual(`${resource1.metadata.name} (${resource1.metadata.username})${resource1.metadata.uris[0]}`);
    });

    it("should display a message saying that the search leads to an empty result", () => {
      expect.assertions(1);
      const resource1 = defaultResourceDto({metadata: {name: "No match"}});
      const resource2 = defaultResourceDto({metadata: {name: "No match "}});
      const resources = [resource1, resource2];

      const props = defaultProps({
        context: defaultAppContext({
          search: "Match search",
        }),
        resources: resources,
      });
      const page = new FilterResourcesByItemsIOwnPagePage(props);
      expect(page.displayedMainMessage).toStrictEqual("No result match your search. Try with another search term.");
    });
  });

  describe("As LU I can navigate from the 'resources I own' page", () => {
    it("should allow to go back on the previous page", async() => {
      expect.assertions(3);

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
        }),
      });

      props.history = createMemoryHistory({
        initialEntries: [
          "/home",
          "/test"
        ],
        initialIndex: 1,
      });

      const initialPath = props.history.location.pathname.toString();
      props.history.goBack();

      const page = new FilterResourcesByItemsIOwnPagePage(props);

      await page.clickOnBackButton();
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual("/home");
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
    });

    it("should allow to navigate to a selected resource page", async() => {
      expect.assertions(4);

      const resource = defaultResourceDto();
      const resources = [resource];

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
          searchHistory: {},
          search: "Passbolt",
        }),
        resources: resources
      });
      props.history = createMemoryHistory();

      const initialPath = props.history.location.pathname;

      const page = new FilterResourcesByItemsIOwnPagePage(props);

      await page.clickOnResource(0);
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual(`/webAccessibleResources/quickaccess/resources/view/${resource.id}`);
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
      expect(props.context.searchHistory).toStrictEqual({'/': "Passbolt"});
    });

    it("should initialised search from history", async() => {
      expect.assertions(2);

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
          searchHistory: {
            "/webAccessibleResources/quickaccess/resources/owned-by-me": "test",
          }
        }),
      });

      props.history = createMemoryHistory({
        initialEntries: [
          "/webAccessibleResources/quickaccess/resources/owned-by-me",
        ],
      });

      props.history.goBack();

      const page = new FilterResourcesByItemsIOwnPagePage(props);
      await page.clickOnBackButton();

      expect(props.context.updateSearch).toHaveBeenCalledTimes(2);
      expect(props.context.updateSearch).toHaveBeenCalledWith("test");
    });
  });

  describe("As LU I can create resource from the button", () => {
    it("should display the button if metadata type settings and resource types are loaded", () => {
      const props = defaultProps();
      const page = new FilterResourcesByItemsIOwnPagePage(props);
      expect(page.createButton).toBeDefined();
      expect(page.createButton).toBeFalsy();
    });

    it("should display the button if metadata type settings and resource types are loaded for v5", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
      const props = defaultProps({metadataTypeSettings: metadataTypeSettingEntity});
      const page = new FilterResourcesByItemsIOwnPagePage(props);
      expect(page.createButton).toBeDefined();
      expect(page.createButton).toBeFalsy();
    });

    it("should not display the button if metadata type settings are not loaded", () => {
      const props = defaultProps({metadataTypeSettings: null});
      const page = new FilterResourcesByItemsIOwnPagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if resource types are not loaded", () => {
      const props = defaultProps({resourceTypes: null});
      const page = new FilterResourcesByItemsIOwnPagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v5 and only v4 resource types is available", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const props = defaultProps({metadataTypeSettings: metadataTypeSettingEntity, resourceTypes: resourceTypesCollection});
      const page = new FilterResourcesByItemsIOwnPagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v4 and only v5 resource types is available", () => {
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      const props = defaultProps({resourceTypes: resourceTypesCollection});
      const page = new FilterResourcesByItemsIOwnPagePage(props);
      expect(page.createButton).toBeNull();
    });
  });
});
