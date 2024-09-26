import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import ResourceTypesSettings from "../../../../shared/lib/Settings/ResourceTypesSettings";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {ownerPermissionDto, readPermissionDto, updatePermissionDto} from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import {TEST_RESOURCE_TYPE_PASSWORD_STRING} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";

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
 * Mocked a resource
 */
export const resourceWithDescriptionMock = defaultResourceDto({
  resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
  metadata: {
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
    description: "Apache is the world's most used web server software.",
    uris: ["http://www.apache.org/"],
  },
  permission: updatePermissionDto()
});

/**
 * Mocked a resource with the last shared tag
 */
export const resourceOwnedWithNoDescriptionMock = defaultResourceDto({
  resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
  metadata: {
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
    name: "apache",
    username: "www-data",
    uris: ["http://www.apache.org/"],
    description: "",
  },
  permission: ownerPermissionDto()
});

/**
 * Mocked a resource
 */
export const resourceOnlyReadWithNoDescriptionMock = {
  resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
  metadata: {
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
    description: "",
    uris: ["http://www.apache.org/"],
  },
  permission: readPermissionDto()
};
