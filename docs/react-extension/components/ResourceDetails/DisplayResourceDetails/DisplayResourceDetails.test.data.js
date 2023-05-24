import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import ResourceTypesSettings from "../../../../shared/lib/Settings/ResourceTypesSettings";
import resourceTypesFixture from "../../../test/fixture/ResourceTypes/resourceTypes";
import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const defaultAppContext = {
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: siteSettings,
    resourceTypesSettings: new ResourceTypesSettings(siteSettings, resourceTypesFixture),
    port: new MockPort()
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    resourceWorkspaceContext: {
      details: {
        resource:  {
          "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
          "name": "apache",
          "username": "www-data",
          "uri": "http://www.apache.org/",
          "description": "Apache is the world's most used web server software.",
          "deleted": false,
          "created": "2019-12-05T13:38:43+00:00",
          "modified": "2019-12-06T13:38:43+00:00",
          "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
          "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
          "folder_parent_id": null,
          "permission": {
            type: 15
          },
          "tags": []
        }
      },
      onLockDetail: jest.fn()
    }
  };
}
