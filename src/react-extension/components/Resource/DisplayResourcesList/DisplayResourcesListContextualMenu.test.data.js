/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import MockPort from "../../../test/mock/MockPort";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    userSettings: new UserSettings(userSettingsFixture),
    port: new MockPort(),
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
    resource: resourcesMock[0],
    hide: jest.fn(),
    left: 0,
    top: 0,
    dialogContext: {
      open: jest.fn()
    },
    resourceWorkspaceContext: {
      onGoToResourceUriRequested: jest.fn()
    }
  };
}

/**
 * Default props
 * @returns {any}
 */
export function propsResourceOnlyRead() {
  return {
    resource: resourcesMock[1],
    hide: jest.fn(),
    left: 0,
    top: 0,
    dialogContext: {
      open: jest.fn()
    }
  };
}

/**
 * Mocked list of resources
 */
export const resourcesMock = [{
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "name": "apache",
  "username": "www-data",
  "uri": "http:\/\/www.apache.org\/",
  "description": "Apache is the world\u0027s most used web server software.",
  "deleted": false,
  "created": "2020-08-25T08:35:19+00:00",
  "modified": "2020-08-26T08:35:19+00:00",
  "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
  "favorite": {
    "id": "56216dba-b6da-592b-87cb-fb5cbbd0a424",
    "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
    "foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "foreign_model": "Resource",
    "created": "2020-08-27T08:35:21+00:00",
    "modified": "2020-08-27T08:35:21+00:00"
  },
  "permission": {
    "id": "8dfd59a7-852d-5c57-bd45-75c28bbb3f6c",
    "aco": "Resource",
    "aco_foreign_key": "8e3874ae-4b40-590b-968a-418f704b9d9a",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 15,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00"
  },
  "tags": [
    {
      "id": "1c8afebc-7e23-51bd-a0b6-2e695afeb32f",
      "slug": "#charlie",
      "is_shared": true
    },
    {
      "id": "ecd059e8-4cb3-574b-a063-6083e272ef27",
      "slug": "#golf",
      "is_shared": true
    }
  ],
  "folder_parent_id": null,
  "personal": false,
  "resource_type_id": "669f8c64-242a-59fb-92fc-81f660975fd3"
}, {
  "id": "09c790c0-c003-53c8-a640-25d33cfebc22",
  "name": "bower",
  "username": "bower",
  "uri": "bower.io",
  "description": "A package manager for the web!",
  "deleted": false,
  "created": "2018-08-27T08:35:19+00:00",
  "modified": "2019-08-27T08:35:19+00:00",
  "created_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
  "modified_by": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
  "favorite": null,
  "permission": {
    "id": "672728ac-c3f2-52a5-a21c-07dfe84b7ad9",
    "aco": "Resource",
    "aco_foreign_key": "09c790c0-c003-53c8-a640-25d33cfebc22",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 1,
    "created": "2020-08-27T08:35:19+00:00",
    "modified": "2020-08-27T08:35:19+00:00"
  },
  "tags": [],
  "folder_parent_id": null,
  "personal": false,
  "resource_type_id": "669f8c64-242a-59fb-92fc-81f660975fd3"
}];
