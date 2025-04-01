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
 * @since         4.1.0
 */
import {waitForTrue} from "../../../../test/utils/waitFor";
import {defaultResourceDto} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultAppContext} from "../../contexts/AppContext.test.data";
import {defaultProps, denyUiActionProps} from "./HomePage.test.data";
import HomePagePage from "./HomePage.test.page";
import {createMemoryHistory} from "history";
import {
  defaultResourceMetadataDto
} from "../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import expect from "expect";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV50FreshDto, defaultMetadataTypesSettingsV6Dto
} from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesV4CollectionDto, resourceTypesV5CollectionDto
} from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("HomePage", () => {
  describe("As LU I can see an updated version of the resources", () => {
    /**
     * This test should be executed first as it's changing a static props we don't have control on
     */
    it("should ask for resource initialisation only once", async() => {
      expect.assertions(3);
      const props = defaultProps();
      expect(props.resourcesLocalStorageContext.updateLocalStorage).toHaveBeenCalledTimes(0);

      new HomePagePage(props);
      expect(props.resourcesLocalStorageContext.updateLocalStorage).toHaveBeenCalledTimes(1);

      new HomePagePage(props);
      expect(props.resourcesLocalStorageContext.updateLocalStorage).toHaveBeenCalledTimes(1);
    });
  });

  describe('As LU I can see the quickaccess homepage sections', () => {
    it('As LU I can see the quickaccess filters and groups sections', () => {
      expect.assertions(3);
      const page = new HomePagePage(defaultProps());

      expect(page.browseListTitle).toStrictEqual("Browse");
      expect(page.filtersSection?.textContent).toStrictEqual('Filters');
      expect(page.groupsSection?.textContent).toStrictEqual('Groups');
    });

    it('As LU I can see the quickaccess tag section if enabled by API flags', () => {
      expect.assertions(3);
      const page = new HomePagePage(defaultProps());

      expect(page.browseListTitle).toStrictEqual("Browse");
      expect(page.hasTagFilterEntry).toBeTruthy();
      expect(page.tagsSection?.textContent).toStrictEqual('Tags');
    });

    it('As LU I cannot see the quickaccess tag section if disabled by API flags', () => {
      expect.assertions(2);
      const data = {
        siteSettings: {
          getServerTimezone: () => '',
          canIUse: () => false,
        }
      };
      const context = defaultAppContext(data);
      const page = new HomePagePage(defaultProps({context}));

      expect(page.browseListTitle).toStrictEqual("Browse");
      expect(page.hasTagFilterEntry).toBeFalsy();
    });

    it('As LU I cannot see the quickaccess tag section if I am not allowed to', () => {
      expect.assertions(2);
      const page = new HomePagePage(denyUiActionProps());

      expect(page.browseListTitle).toStrictEqual("Browse");
      expect(page.hasTagFilterEntry).toBeFalsy();
    });
  });

  describe("As LU I can see filtered resources on the quickaccess homepage", () => {
    it("it should show suggested resources for the currently active URL", async() => {
      expect.assertions(2);
      const props = defaultProps({
        resources: [
          defaultResourceDto({metadata: defaultResourceMetadataDto({name: "apache", uris: ["http://www.apache.org"]})}),
          defaultResourceDto(),
        ]
      });
      props.context.getOpenerTabId = () => 1;
      props.context.port.addRequestListener("passbolt.active-tab.get-url", async() => "http://www.apache.org/");
      const page = new HomePagePage(props);

      await waitForTrue(() => page.suggestedResourcesEntries?.length > 0);

      const suggestedResource = props.resources[0];

      expect(page.suggestedResourcesEntries.length).toStrictEqual(1);
      expect(page.getSuggestedResourceItem(0).textContent).toStrictEqual(`${suggestedResource.metadata.name} (${suggestedResource.metadata.username})${suggestedResource.metadata.uris[0]}`);
    });

    it("it should show a message telling there is no suggested resources for the currently active URL", async() => {
      expect.assertions(2);
      const props = defaultProps({
        resources: [defaultResourceDto(), defaultResourceDto()]
      });
      props.context.getOpenerTabId = () => 1;
      props.context.port.addRequestListener("passbolt.active-tab.get-url", async() => "about:blank");
      const page = new HomePagePage(props);

      expect(page.suggestedResourcesEntries.length).toStrictEqual(0);
      expect(page.suggestedResourcesContent.textContent).toStrictEqual("No passwords found for the current page. You can use the search.");
    });

    it("it should filter resources by the search search", async() => {
      expect.assertions(2);
      const props = defaultProps({
        resources: [
          defaultResourceDto({metadata: defaultResourceMetadataDto({name: "test"})}),
          defaultResourceDto({metadata: defaultResourceMetadataDto({name: "other"})})
        ],
      });
      props.context.getOpenerTabId = () => 1;
      props.context.port.addRequestListener("passbolt.active-tab.get-url", async() => "about:blank");

      //triggers a search on the available resources
      props.context.search = "test";

      const page = new HomePagePage(props);

      const expectedResource = props.resources[0];

      expect(page.browsedResources.length).toStrictEqual(1);
      expect(page.browsedResources[0].textContent).toStrictEqual(`${expectedResource.metadata.name} (${expectedResource.metadata.username})${expectedResource.metadata.uris[0]}`);
    });

    it("it should show a message if the search does not give any results", () => {
      expect.assertions(2);
      const props = defaultProps({
        resources: [defaultResourceDto(), defaultResourceDto()],
      });
      props.context.getOpenerTabId = () => 1;
      props.context.port.addRequestListener("passbolt.active-tab.get-url", async() => "about:blank");

      //triggers a search on the available resources
      props.context.search = "test";

      const page = new HomePagePage(props);

      expect(page.browsedResources.length).toStrictEqual(0);
      expect(page.browsedResourcesContent.textContent).toStrictEqual("No result match your search. Try with another search term.");
    });
  });

  describe("As LU I can use resource to auto-fill the current page", () => {
    it("I can click on a suggested resource to use it on the current tab then the quickaccess closes", async() => {
      expect.assertions(3);
      const originalWindowClose = window.close;
      window.close = jest.fn();

      const expectedOpenerTabId = 1;
      const suggestedResource = defaultResourceDto({metadata: {name: "apache", uris: ["http://www.apache.org"]}});

      const props = defaultProps({resources: [suggestedResource]});
      props.context.getOpenerTabId = () => expectedOpenerTabId;
      props.context.port.addRequestListener("passbolt.active-tab.get-url", async() => suggestedResource.metadata.uris[0]);
      props.context.port.addRequestListener("passbolt.quickaccess.use-resource-on-current-tab", async(resourceId, openerTabId) => {
        expect(resourceId).toStrictEqual(suggestedResource.id);
        expect(openerTabId).toStrictEqual(expectedOpenerTabId);
      });

      const page = new HomePagePage(props);

      await waitForTrue(() => page.suggestedResourcesEntries?.length > 0);

      await page.clickOnSuggestedResource(0);
      await waitForTrue(() => window.close.mock.calls.length > 0);

      expect(window.close).toHaveBeenCalledTimes(1);

      window.close = originalWindowClose;
    });

    it("I can click on a searched resource to use it on the current tab then the quickaccess closes", async() => {
      expect.assertions(1);

      const expectedOpenerTabId = 1;
      const searchedResource = defaultResourceDto({metadata: {name: "apache", uris: ["http://www.apache.org"]}});

      const props = defaultProps({resources: [searchedResource]});
      props.context.getOpenerTabId = () => expectedOpenerTabId;
      props.context.search = "apache";
      props.context.port.addRequestListener("passbolt.active-tab.get-url", async() => "about:blank");
      props.history = createMemoryHistory();
      const initialPath = props.history.location.pathname;

      const page = new HomePagePage(props);
      await waitForTrue(() => page.browsedResources.length > 0);

      await page.clickOnBrowsedResource(0);
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual(`/webAccessibleResources/quickaccess/resources/view/${searchedResource.id}`);
    });

    it("If I cannot use a resource on the current tab, I should see an error message and the quickaccess should not close", async() => {
      expect.assertions(2);
      const originalWindowClose = window.close;
      window.close = jest.fn();

      const expectedOpenerTabId = 1;
      const suggestedResource = defaultResourceDto({metadata: {name: "apache", uris: ["http://www.apache.org"]}});

      const props = defaultProps({resources: [suggestedResource]});
      props.context.getOpenerTabId = () => expectedOpenerTabId;
      props.context.port.addRequestListener("passbolt.active-tab.get-url", async() => suggestedResource.metadata.uris[0]);
      props.context.port.addRequestListener("passbolt.quickaccess.use-resource-on-current-tab", async() => { throw new Error(); });

      const page = new HomePagePage(props);

      await waitForTrue(() => page.suggestedResourcesEntries?.length > 0);

      await page.clickOnSuggestedResource(0);
      await waitForTrue(() => page.useOnThisTabError);

      expect(page.useOnThisTabError.textContent).toStrictEqual("Unable to use the password on this page. Copy and paste the information instead.");
      expect(window.close).not.toHaveBeenCalled();

      window.close = originalWindowClose;
    });

    it("should not close the quickacess and not show the error message if the user aborted the operation", async() => {
      expect.assertions(2);
      const originalWindowClose = window.close;
      window.close = jest.fn();

      const expectedOpenerTabId = 1;
      const suggestedResource = defaultResourceDto({metadata: {name: "apache", uris: ["http://www.apache.org"]}});

      const expectedError = new Error();
      expectedError.name = "UserAbortsOperationError";

      const props = defaultProps({resources: [suggestedResource]});
      props.context.getOpenerTabId = () => expectedOpenerTabId;
      props.context.port.addRequestListener("passbolt.active-tab.get-url", async() => suggestedResource.metadata.uris[0]);

      let requestDone = false;
      props.context.port.addRequestListener("passbolt.quickaccess.use-resource-on-current-tab", async() => { requestDone = true; throw expectedError; });

      const page = new HomePagePage(props);

      await waitForTrue(() => page.suggestedResourcesEntries?.length > 0);

      await page.clickOnSuggestedResource(0);
      await waitForTrue(() => requestDone);

      expect(page.useOnThisTabError).toBeNull();
      expect(window.close).not.toHaveBeenCalled();

      window.close = originalWindowClose;
    });
  });

  describe("As LU I can create resource from the button", () => {
    it("should display the button if metadata type settings and resource types are loaded", () => {
      const props = defaultProps();
      const page = new HomePagePage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should display the button if metadata type settings and resource types are loaded for v5", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
      const props = defaultProps({metadataTypeSettings: metadataTypeSettingEntity});
      const page = new HomePagePage(props);
      expect(page.createButton).toBeDefined();
    });

    it("should not display the button if metadata type settings are not loaded", () => {
      const props = defaultProps({metadataTypeSettings: null});
      const page = new HomePagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if resource types are not loaded", () => {
      const props = defaultProps({resourceTypes: null});
      const page = new HomePagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v5 and only v4 resource types is available", () => {
      const metadataTypeSettingEntity = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto());
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV4CollectionDto());
      const props = defaultProps({metadataTypeSettings: metadataTypeSettingEntity, resourceTypes: resourceTypesCollection});
      const page = new HomePagePage(props);
      expect(page.createButton).toBeNull();
    });

    it("should not display the button if metadata type settings default is v4 and only v5 resource types is available", () => {
      const resourceTypesCollection = new ResourceTypesCollection(resourceTypesV5CollectionDto());
      const props = defaultProps({resourceTypes: resourceTypesCollection});
      const page = new HomePagePage(props);
      expect(page.createButton).toBeNull();
    });
  });
});
