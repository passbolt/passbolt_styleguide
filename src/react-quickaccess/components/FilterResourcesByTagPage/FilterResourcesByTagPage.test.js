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
import {defaultProps, noTagsProps, noResourcesProps} from "./FilterResourcesByTagPage.test.data";
import FilterResourcesByTagPage from "./FilterResourcesByTagPage.test.page";
import {createMemoryHistory} from "history";
import {waitForTrue} from "../../../../test/utils/waitFor";
import {defaultTagDto} from "../../../shared/models/entity/tag/tagEntity.test.data";
import {
  defaultResourceMetadataDto
} from "../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
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

describe("FilterResourcesByTagPage", () => {
  describe("As LU I should see tags", () => {
    it("should display a loading message", () => {
      expect.assertions(1);

      const page = new FilterResourcesByTagPage(noResourcesProps());
      expect(page.displayedMainMessage).toStrictEqual("Retrieving your tags");
    });

    it("should display all the tags if there is no search", () => {
      const props = defaultProps();
      const tagList = props.resources[0].tags;

      expect.assertions(tagList.length + 1);

      const page = new FilterResourcesByTagPage(props);

      expect(page.tags?.length).toStrictEqual(tagList.length);
      for (let i = 0; i < tagList.length; i++) {
        expect(page.getTag(i).textContent).toStrictEqual(tagList[i].slug);
      }
    });

    it("should display a message saying that there is no tag", () => {
      expect.assertions(1);
      const page = new FilterResourcesByTagPage(noTagsProps());

      expect(page.displayedMainMessage).toStrictEqual("No passwords are yet tagged. It does feel a bit empty here, tag your first password.");
    });

    it("should display tags filtered by the search", () => {
      expect.assertions(2);

      const props = defaultProps({
        context: defaultAppContext({
          search: "tag 4"
        }),
      });
      const page = new FilterResourcesByTagPage(props);

      expect(page.tags.length).toStrictEqual(1);
      expect(page.getTag(0).textContent).toStrictEqual(props.resources[0].tags[4].slug);
    });

    it("should display a message saying that the search leads to an empty result", () => {
      expect.assertions(1);

      const props = defaultProps({
        context: defaultAppContext({
          search: "test-test"
        }),
      });
      const page = new FilterResourcesByTagPage(props);
      expect(page.displayedMainMessage).toStrictEqual("No result match your search. Try with another search term.");
    });
  });

  describe("As LU I should see resources filtered by tag", () => {
    it("should display the selected tag slug", () => {
      expect.assertions(1);

      const props = defaultProps();
      const expectedTag = props.resources[0].tags[4];
      props.history = createMemoryHistory();
      props.location = props.history.location;
      props.location.state = {
        selectedTag: expectedTag
      };

      const page = new FilterResourcesByTagPage(props);

      expect(page.displayedTitle).toStrictEqual(expectedTag.slug);
    });

    it("should display all the resources associated to the selected tag", () => {
      expect.assertions(2);

      const tag1 = defaultTagDto({slug: "tag 1"});
      const tag2 = defaultTagDto({slug: "tag 2"});
      const resource1 = defaultResourceDto({tags: [tag1]});
      const resource2 = defaultResourceDto({tags: [tag2]});

      const props = defaultProps({
        resources: [resource1, resource2],
      });

      const expectedTag = tag2;
      props.history = createMemoryHistory();
      props.location = props.history.location;
      props.location.state = {
        selectedTag: expectedTag
      };

      const page = new FilterResourcesByTagPage(props);

      expect(page.resources.length).toStrictEqual(1);
      expect(page.getResource(0).textContent).toStrictEqual(`${resource2.metadata.name} (${resource2.metadata.username})${resource2.metadata.uris[0]}`);
    });

    it("should display resources filtered by the search", () => {
      expect.assertions(3);

      const tag = defaultTagDto({slug: "tag 1"});
      const resource1 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "Expected"}), tags: [tag]});
      const resource2 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "No Match"}), tags: [tag]});
      const resource3 = defaultResourceDto({metadata: defaultResourceMetadataDto({name: "Expected"}), tags: [tag]});

      const props = defaultProps({
        context: defaultAppContext({
          search: "expected"
        }),
        resources: [resource1, resource2, resource3],
      });

      props.history = createMemoryHistory();
      props.location = props.history.location;
      props.location.state = {selectedTag: tag};

      const page = new FilterResourcesByTagPage(props);

      expect(page.resources.length).toStrictEqual(2);
      expect(page.getResource(0).textContent).toStrictEqual(`${resource1.metadata.name} (${resource1.metadata.username})${resource1.metadata.uris[0]}`);
      expect(page.getResource(1).textContent).toStrictEqual(`${resource3.metadata.name} (${resource3.metadata.username})${resource3.metadata.uris[0]}`);
    });

    it("should display a message saying that the search leads to an empty result", () => {
      expect.assertions(1);

      const tag = defaultTagDto({slug: "tag 1"});
      const resource = defaultResourceDto({metadata: {name: "No Match"}, tags: [tag]});

      const props = defaultProps({
        context: defaultAppContext({
          search: "expected"
        }),
        resources: [resource]
      });

      props.history = createMemoryHistory();
      props.location = props.history.location;
      props.location.state = {selectedTag: tag};

      const page = new FilterResourcesByTagPage(props);
      expect(page.displayedMainMessage).toStrictEqual("No result match your search. Try with another search term.");
    });
  });

  describe("As LU I can navigate from the 'Filter by tag' page", () => {
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

      const page = new FilterResourcesByTagPage(props);

      await page.clickOnBackButton();
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual("/home");
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
    });

    it("should allow to navigate to a selected tag page", async() => {
      expect.assertions(4);

      const tag = defaultTagDto();
      const resources = [defaultResourceDto({tags: [tag]})];

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
          searchHistory: {},
          search: "tag",
        }),
        resources: resources
      });
      props.history = createMemoryHistory();

      const initialPath = props.history.location.pathname;

      const page = new FilterResourcesByTagPage(props);

      await page.clickOnTag(0);
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual(`/webAccessibleResources/quickaccess/resources/tag/${tag.id}`);
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
      expect(props.context.searchHistory).toStrictEqual({'/': "tag"});
    });

    it("should allow to navigate to a resource", async() => {
      expect.assertions(4);

      const tag = defaultTagDto();
      const resource = defaultResourceDto({tags: [tag]});

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
          searchHistory: {},
          search: "Passbolt",
        }),
        resources: [resource]
      });
      props.history = createMemoryHistory();
      props.location = props.history.location;
      props.location.state = {
        selectedTag: tag
      };
      const initialPath = props.history.location.pathname;

      const page = new FilterResourcesByTagPage(props);

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
            "/webAccessibleResources/quickaccess/resources/tag": "tag",
          }
        }),
      });

      props.history = createMemoryHistory({
        initialEntries: [
          "/webAccessibleResources/quickaccess/resources/tag",
        ],
      });

      props.history.goBack();

      const page = new FilterResourcesByTagPage(props);
      await page.clickOnBackButton();

      expect(props.context.updateSearch).toHaveBeenCalledTimes(2);
      expect(props.context.updateSearch).toHaveBeenCalledWith("tag");
    });
  });

  describe("As LU I can create resource from the button", () => {
    it("should display the button if metadata type settings and resource types are loaded", () => {
      const props = defaultProps();
      const page = new FilterResourcesByTagPage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should display the button if metadata type settings and resource types are loaded for v5", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
      const props = defaultProps({metadataTypeSettings: metadataTypeSettingEntity});
      const page = new FilterResourcesByTagPage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should not display the button if metadata type settings are not loaded", () => {
      const props = defaultProps({metadataTypeSettings: null});
      const page = new FilterResourcesByTagPage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if resource types are not loaded", () => {
      const props = defaultProps({resourceTypes: null});
      const page = new FilterResourcesByTagPage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v5 and only v4 resource types is available", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const props = defaultProps({metadataTypeSettings: metadataTypeSettingEntity, resourceTypes: resourceTypesCollection});
      const page = new FilterResourcesByTagPage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v4 and only v5 resource types is available", () => {
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      const props = defaultProps({resourceTypes: resourceTypesCollection});
      const page = new FilterResourcesByTagPage(props);
      expect(page.createButton).toBeNull();
    });
  });
});
