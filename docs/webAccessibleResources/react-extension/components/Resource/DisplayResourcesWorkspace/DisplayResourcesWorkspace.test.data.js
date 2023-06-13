import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default resourceWorkspaceContext one folder owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsWithNoResourceAndNoFolder() {
  return {
    resourceWorkspaceContext: {
      details: {
        folder: null,
        resource: null
      },
      lockDisplayDetail: true,
    }
  };
}

/**
 * Default resourceWorkspaceContext one folder not owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsFolderAndResourceLocked() {
  return {
    resourceWorkspaceContext: {
      details: {
        folder: null,
        resource: null
      },
      lockDisplayDetail: false,
    }
  };
}

/**
 * Default resourceWorkspaceContext one folder not owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsWithFolderAndResource() {
  return {
    resourceWorkspaceContext: {
      details: {
        folder: folderMock,
        resource: resourceMock
      },
      lockDisplayDetail: true,
    }
  };
}

/**
 * Mocked a folder
 */
export const folderMock = {
  "id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
  "name": "Accounting",
  "created": "2020-02-01T00:00:00+00:00",
  "modified": "2020-02-01T00:00:00+00:00",
  "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  "permission": {
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
    "aco": "Folder",
    "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 1,
    "created": "2020-05-11T10:11:13+00:00",
    "modified": "2020-05-11T10:11:13+00:00"
  },
  "folder_parent_id": null,
  "personal": false
};

/**
 * Mocked a resources
 */
export const resourceMock = {
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
  "personal": false
};
