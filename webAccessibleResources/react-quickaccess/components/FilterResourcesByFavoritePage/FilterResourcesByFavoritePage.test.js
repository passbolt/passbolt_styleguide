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
import { defaultResourceDto } from "../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import { defaultProps } from "./FilterResourcesByFavoritePage.test.data";
import FilterResourcesByFavoritePagePage from "./FilterResourcesByFavoritePage.test.page";
import { createMemoryHistory } from "history";
import { waitForTrue } from "../../../../test/utils/waitFor";
import { noResourcesProps } from "./FilterResourcesByFavoritePage.test.data";
import { defaultResourceMetadataDto } from "../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import expect from "expect";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV50FreshDto,
  defaultMetadataTypesSettingsV6Dto,
} from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesV4CollectionDto,
  resourceTypesV5CollectionDto,
} from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import { defaultUserDto } from "../../../shared/models/entity/user/userEntity.test.data";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { defaultMetadataKeysSettingsDto } from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
import { v4 as uuidv4 } from "uuid";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("FilterResourcesByFavoritePage", () => {
  describe("As LU I should see my favourite resources", () => {
    it("should display a loading message", () => {
      expect.assertions(1);

      const page = new FilterResourcesByFavoritePagePage(defaultProps());
      expect(page.displayedMainMessage).toStrictEqual("Retrieving your passwords");
    });

    it("should display all the favourite resources if there is no search", () => {
      expect.assertions(3);
      const resource1 = defaultResourceDto({}, { withFavorite: true });
      const resource2 = defaultResourceDto({}, { withFavorite: false });
      const resource3 = defaultResourceDto({}, { withFavorite: true });
      const resource4 = defaultResourceDto({}, { withFavorite: false });
      const resources = [resource1, resource2, resource3, resource4];

      const page = new FilterResourcesByFavoritePagePage(defaultProps({ resources }));

      expect(page.resources?.length).toStrictEqual(2);
      expect(page.getResource(0).textContent).toStrictEqual(
        `${resource1.metadata.name} (${resource1.metadata.username})${resource1.metadata.uris[0]}`,
      );
      expect(page.getResource(0).textContent).toStrictEqual(
        `${resource2.metadata.name} (${resource2.metadata.username})${resource2.metadata.uris[0]}`,
      );
    });

    it("should display a message saying that there is no favourite resources yet", () => {
      expect.assertions(1);

      const page = new FilterResourcesByFavoritePagePage(noResourcesProps());
      expect(page.displayedMainMessage).toStrictEqual(
        "None of your passwords are yet marked as favorite. Add stars to passwords you want to easily find later.",
      );
    });

    it("should display favourite resources filtered by the search", () => {
      expect.assertions(1);
      const resource1 = defaultResourceDto(
        { metadata: defaultResourceMetadataDto({ name: "Match search" }) },
        { withFavorite: true },
      );
      const resource2 = defaultResourceDto(
        { metadata: defaultResourceMetadataDto({ name: "No match" }) },
        { withFavorite: false },
      );
      const resource3 = defaultResourceDto(
        { metadata: defaultResourceMetadataDto({ name: "No match " }) },
        { withFavorite: true },
      );
      const resource4 = defaultResourceDto(
        { metadata: defaultResourceMetadataDto({ name: "Match search" }) },
        { withFavorite: false },
      );
      const resources = [resource1, resource2, resource3, resource4];

      const props = defaultProps({
        context: defaultAppContext({
          search: "Match search",
        }),
        resources: resources,
      });
      const page = new FilterResourcesByFavoritePagePage(props);

      expect(page.getResource(0).textContent).toStrictEqual(
        `${resource1.metadata.name} (${resource1.metadata.username})${resource1.metadata.uris[0]}`,
      );
    });

    it("should display a message saying that the search leads to an empty result", () => {
      expect.assertions(1);
      const resource1 = defaultResourceDto({ metadata: { name: "No match" } }, { withFavorite: true });
      const resource2 = defaultResourceDto({ metadata: { name: "No match " } }, { withFavorite: true });
      const resources = [resource1, resource2];

      const props = defaultProps({
        context: defaultAppContext({
          search: "Match search",
        }),
        resources: resources,
      });
      const page = new FilterResourcesByFavoritePagePage(props);

      expect(page.displayedMainMessage).toStrictEqual("No result match your search. Try with another search term.");
    });
  });

  describe("As LU I can navigate from the favourite page", () => {
    it("should allow to go back on the previous page", async () => {
      expect.assertions(3);

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
        }),
      });

      props.history = createMemoryHistory({
        initialEntries: ["/home", "/test"],
        initialIndex: 1,
      });

      const initialPath = props.history.location.pathname.toString();
      props.history.goBack();

      const page = new FilterResourcesByFavoritePagePage(props);
      await page.clickOnBackButton();
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual("/home");
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
    });

    it("should allow to navigate to a selected resource page", async () => {
      expect.assertions(4);

      const resource = defaultResourceDto({}, { withFavorite: true });
      const resources = [resource];

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
          searchHistory: {},
          search: "Passbolt",
        }),
        resources: resources,
      });
      props.history = createMemoryHistory();

      const initialPath = props.history.location.pathname;

      const page = new FilterResourcesByFavoritePagePage(props);
      await page.clickOnResource(0);
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual(
        `/webAccessibleResources/quickaccess/resources/view/${resource.id}`,
      );
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
      expect(props.context.searchHistory).toStrictEqual({ "/": "Passbolt" });
    });

    it("should initialised search from history", async () => {
      expect.assertions(2);

      const props = defaultProps({
        context: defaultAppContext({
          updateSearch: jest.fn(),
          searchHistory: {
            "/webAccessibleResources/quickaccess/resources/favorite": "test",
          },
        }),
      });

      props.history = createMemoryHistory({
        initialEntries: ["/webAccessibleResources/quickaccess/resources/favorite"],
      });

      props.history.goBack();

      const page = new FilterResourcesByFavoritePagePage(props);
      await page.clickOnBackButton();

      expect(props.context.updateSearch).toHaveBeenCalledTimes(2);
      expect(props.context.updateSearch).toHaveBeenCalledWith("test");
    });
  });

  describe("As LU I can create resource from the button", () => {
    it("should display the button if metadata type settings and resource types are loaded", () => {
      const props = defaultProps();
      const page = new FilterResourcesByFavoritePagePage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should display the button if metadata type settings and resource types are loaded for v5", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
      const props = defaultProps({ metadataTypeSettings: metadataTypeSettingEntity });
      const page = new FilterResourcesByFavoritePagePage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should display action aborted missing metadata keys if share metadata key is enforced and user has missing keys", async () => {
      expect.assertions(2);

      const props = defaultProps({
        context: defaultAppContext({
          loggedInUser: defaultUserDto({ missing_metadata_key_ids: [uuidv4()] }, { withRole: true }),
        }),
        metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto()),
        metadataKeysSettings: new MetadataKeysSettingsEntity(
          defaultMetadataKeysSettingsDto({ allow_usage_of_personal_keys: false }),
        ),
      });
      props.history = createMemoryHistory();

      const initialPath = props.history.location.pathname;
      const page = new FilterResourcesByFavoritePagePage(props);

      expect(page.createButton).toBeDefined();

      await page.clickOnCreateButton();
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual(
        `/webAccessibleResources/quickaccess/resources/action-aborted-missing-metadata-keys`,
      );
    });

    it("should not display the button if metadata type settings are not loaded", () => {
      const props = defaultProps({ metadataTypeSettings: null });
      const page = new FilterResourcesByFavoritePagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if resource types are not loaded", () => {
      const props = defaultProps({ resourceTypes: null });
      const page = new FilterResourcesByFavoritePagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v5 and only v4 resource types is available", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const props = defaultProps({
        metadataTypeSettings: metadataTypeSettingEntity,
        resourceTypes: resourceTypesCollection,
      });
      const page = new FilterResourcesByFavoritePagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v4 and only v5 resource types is available", () => {
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      const props = defaultProps({ resourceTypes: resourceTypesCollection });
      const page = new FilterResourcesByFavoritePagePage(props);
      expect(page.createButton).toBeNull();
    });
  });
});
