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

import {
  defaultProps,
  noGroupsProps,
  withFilteredResourcesProps,
  withGroupsProps,
  withSelectedGroupProps,
} from "./FilterResourcesByGroupPage.test.data";
import FilterResourcesByGroupPagePage from "./FilterResourcesByGroupPage.test.page";
import { waitForTrue } from "../../../../test/utils/waitFor";
import { createMemoryHistory } from "history";
import { defaultGroupDto } from "../../../shared/models/entity/group/groupEntity.test.data";
import { defaultResourceDto } from "../../../shared/models/entity/resource/resourceEntity.test.data";
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

describe("FilterResourcesByGroupPage", () => {
  describe("As LU I should see my groups", () => {
    it("should display a loading message", () => {
      expect.assertions(1);

      const page = new FilterResourcesByGroupPagePage(defaultProps());
      expect(page.displayedMainMessage).toStrictEqual("Retrieving your groups");
    });

    it("should display all groups if there is no search", async () => {
      expect.assertions(5);

      const page = new FilterResourcesByGroupPagePage(withGroupsProps());
      await waitForTrue(() => page.isReady());

      expect(page.groups?.length).toStrictEqual(4);
      expect(page.getGroup(0).textContent).toStrictEqual("group1");
      expect(page.getGroup(1).textContent).toStrictEqual("group2");
      expect(page.getGroup(2).textContent).toStrictEqual("group3");
      expect(page.getGroup(3).textContent).toStrictEqual("group4");
    });

    it("should display a message saying that the search leads to an empty result", async () => {
      expect.assertions(2);

      const page = new FilterResourcesByGroupPagePage(
        withGroupsProps({
          context: {
            search: "group5",
          },
        }),
      );
      await waitForTrue(() => page.isReady());

      expect(page.groups?.length).toStrictEqual(0);
      expect(page.displayedMainMessage).toStrictEqual("No result match your search. Try with another search term.");
    });

    it("should display groups filtered by the search", async () => {
      expect.assertions(2);

      const page = new FilterResourcesByGroupPagePage(
        withGroupsProps({
          context: {
            search: "group4",
          },
        }),
      );
      await waitForTrue(() => page.isReady());

      expect(page.groups?.length).toStrictEqual(1);
      expect(page.getGroup(0).textContent).toStrictEqual("group4");
    });

    it("should display a message saying that the user is not part of a group", async () => {
      expect.assertions(1);

      const page = new FilterResourcesByGroupPagePage(noGroupsProps());
      await waitForTrue(() => page.isReady());
      expect(page.displayedMainMessage).toStrictEqual(
        "You are not member of any group. Wait for a group manager to add you in a group.",
      );
    });
  });

  describe("As LU I should see the resources from a group", () => {
    it("should display a loading message", () => {
      expect.assertions(1);

      const page = new FilterResourcesByGroupPagePage(withSelectedGroupProps());

      expect(page.displayedMainMessage).toStrictEqual("Retrieving your passwords");
    });

    it("should display all resources from a groups if there is no search", async () => {
      expect.assertions(3);

      const props = withFilteredResourcesProps();

      const page = new FilterResourcesByGroupPagePage(props);
      await waitForTrue(() => page.isReady());

      const expectedResource = props.resources[0];
      const expectedResource2 = props.resources[1];

      expect(page.resources.length).toEqual(2);
      expect(page.getResource(0).textContent).toStrictEqual(
        `${expectedResource.metadata.name} (${expectedResource.metadata.username})${expectedResource.metadata.uris[0]}+1`,
      );
      expect(page.getResource(1).textContent).toStrictEqual(
        `${expectedResource2.metadata.name} (${expectedResource2.metadata.username})${expectedResource2.metadata.uris[0]}`,
      );
    });

    it("should display groups filtered by the search", async () => {
      expect.assertions(2);

      const props = withFilteredResourcesProps({
        context: {
          search: "apache",
        },
      });

      const page = new FilterResourcesByGroupPagePage(props);
      await waitForTrue(() => page.isReady());

      const expectedResource = props.resources[0];
      expect(page.resources?.length).toStrictEqual(1);
      expect(page.getResource(0).textContent).toStrictEqual(
        `${expectedResource.metadata.name} (${expectedResource.metadata.username})${expectedResource.metadata.uris[0]}+1`,
      );
    });

    it("should display a message saying that the search leads to an empty result", async () => {
      expect.assertions(2);

      const page = new FilterResourcesByGroupPagePage(
        withFilteredResourcesProps({
          context: {
            search: "resource",
          },
        }),
      );
      await waitForTrue(() => page.isReady());

      expect(page.resources?.length).toStrictEqual(0);
      expect(page.displayedMainMessage).toStrictEqual("No result match your search. Try with another search term.");
    });
  });
  describe("As LU I can navigate from the 'Filter by group' page", () => {
    it("should allow to go back on the previous page", async () => {
      expect.assertions(3);

      const props = defaultProps({
        context: {
          updateSearch: jest.fn(),
        },
      });

      props.history = createMemoryHistory({
        initialEntries: ["/home", "/test"],
        initialIndex: 1,
      });

      const initialPath = props.history.location.pathname.toString();
      props.history.goBack();

      const page = new FilterResourcesByGroupPagePage(props);

      await page.clickOnBackButton();
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual("/home");
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
    });

    it("should allow to navigate to a selected group page", async () => {
      expect.assertions(4);

      const group = defaultGroupDto();

      const props = withGroupsProps({
        context: {
          updateSearch: jest.fn(),
          searchHistory: {},
          search: "group",
        },
        groups: [group],
      });
      props.history = createMemoryHistory();

      const initialPath = props.history.location.pathname;

      const page = new FilterResourcesByGroupPagePage(props);
      await waitForTrue(() => page.isReady());

      await page.clickOnGroup(0);
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual(
        `/webAccessibleResources/quickaccess/resources/group/${group.id}`,
      );
      expect(props.context.updateSearch).toHaveBeenCalledTimes(1);
      expect(props.context.updateSearch).toHaveBeenCalledWith("");
      expect(props.context.searchHistory).toStrictEqual({ "/": "group" });
    });

    it("should allow to navigate to a resource", async () => {
      expect.assertions(4);

      const group = defaultGroupDto();
      const resource = defaultResourceDto({ groups: [group] });

      const props = withFilteredResourcesProps({
        context: {
          updateSearch: jest.fn(),
          searchHistory: {},
          search: "Passbolt",
        },
        resources: [resource],
      });
      props.history = createMemoryHistory();
      props.location = props.history.location;
      props.location.state = {
        selectedGroup: group,
      };
      const initialPath = props.history.location.pathname;

      const page = new FilterResourcesByGroupPagePage(props);
      await waitForTrue(() => page.isReady());

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

      const props = withGroupsProps({
        context: {
          updateSearch: jest.fn(),
          searchHistory: {
            "/webAccessibleResources/quickaccess/resources/group": "group",
          },
        },
      });

      props.history = createMemoryHistory({
        initialEntries: ["/webAccessibleResources/quickaccess/resources/group"],
      });

      props.history.goBack();

      const page = new FilterResourcesByGroupPagePage(props);
      await waitForTrue(() => page.isReady());

      await page.clickOnBackButton();

      expect(props.context.updateSearch).toHaveBeenCalledTimes(2);
      expect(props.context.updateSearch).toHaveBeenCalledWith("group");
    });
  });

  describe("As LU I can create resource from the button", () => {
    it("should display the button if metadata type settings and resource types are loaded", () => {
      const props = defaultProps();
      const page = new FilterResourcesByGroupPagePage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should display the button if metadata type settings and resource types are loaded for v5", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
      const props = defaultProps({ metadataTypeSettings: metadataTypeSettingEntity });
      const page = new FilterResourcesByGroupPagePage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should display action aborted missing metadata keys if share metadata key is enforced and user has missing keys", async () => {
      expect.assertions(2);

      const props = defaultProps({
        context: { loggedInUser: defaultUserDto({ missing_metadata_key_ids: [uuidv4()] }, { withRole: true }) },
        metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto()),
        metadataKeysSettings: new MetadataKeysSettingsEntity(
          defaultMetadataKeysSettingsDto({ allow_usage_of_personal_keys: false }),
        ),
      });
      props.history = createMemoryHistory();

      const initialPath = props.history.location.pathname;
      const page = new FilterResourcesByGroupPagePage(props);

      expect(page.createButton).toBeDefined();

      await page.clickOnCreateButton();
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual(
        `/webAccessibleResources/quickaccess/resources/action-aborted-missing-metadata-keys`,
      );
    });

    it("should not display the button if metadata type settings are not loaded", () => {
      const props = defaultProps({ metadataTypeSettings: null });
      const page = new FilterResourcesByGroupPagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if resource types are not loaded", () => {
      const props = defaultProps({ resourceTypes: null });
      const page = new FilterResourcesByGroupPagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v5 and only v4 resource types is available", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const props = defaultProps({
        metadataTypeSettings: metadataTypeSettingEntity,
        resourceTypes: resourceTypesCollection,
      });
      const page = new FilterResourcesByGroupPagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v4 and only v5 resource types is available", () => {
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      const props = defaultProps({ resourceTypes: resourceTypesCollection });
      const page = new FilterResourcesByGroupPagePage(props);
      expect(page.createButton).toBeNull();
    });
  });
});
