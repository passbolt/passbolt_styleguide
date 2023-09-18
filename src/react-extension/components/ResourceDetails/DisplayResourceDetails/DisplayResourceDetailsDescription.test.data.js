import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import ResourceTypesSettings from "../../../../shared/lib/Settings/ResourceTypesSettings";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const resourceTypesSettings = new ResourceTypesSettings(siteSettings, resourceTypesCollectionDto());
  const defaultAppContext = {
    userSettings,
    siteSettings,
    resourceTypesSettings,
    port: new MockPort()
  };
  return Object.assign(defaultAppContext, appContext || {});
}


/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
  };
}

/**
 * Mocked a resource
 */
export const resourceWithDescriptionMock = {
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "description": "Apache is the world's most used web server software.",
  "permission": {
    "type": 7
  }
};

/**
 * Mocked a resource with the last shared tag
 */
export const resourceOwnedWithNoDescriptionMock = {
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "name": "apache",
  "username": "www-data",
  "uri": "http://www.apache.org/",
  "description": "",
  "deleted": false,
  "created": "2019-12-05T13:38:43+00:00",
  "modified": "2019-12-06T13:38:43+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "permission": {
    type: 15
  }
};

/**
 * Mocked a resource
 */
export const resourceOnlyReadWithNoDescriptionMock = {
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "description": "",
  "permission": {
    "type": 1
  }
};
