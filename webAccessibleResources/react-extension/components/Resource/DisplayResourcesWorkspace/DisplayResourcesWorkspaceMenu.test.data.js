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
 * @since         2.13.0
 */

import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import {defaultAdministratorRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: {
      canIUse: () => true
    },
    setContext: () => jest.fn()
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsOneResourceOwned() {
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: {
      selectedResources: [resourcesMock[0]],
      lockDisplayDetail: true,
      onLockDetail: jest.fn(),
      onResourcesToExport: () => jest.fn(),
      onResourceCopied: () => jest.fn()
    }
  };
}

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsOneResourceNotOwned() {
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: {
      selectedResources: [resourcesMock[1]],
      lockDisplayDetail: false,
      onLockDetail: jest.fn(),
      onResourcesToExport: () => jest.fn(),
      onResourceCopied: () => jest.fn()
    }
  };
}

/**
 * Default props one selected resource owned
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsNoResource() {
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: {
      selectedResources: [],
      lockDisplayDetail: true,
      onLockDetail: jest.fn(),
      onResourcesToExport: () => jest.fn(),
      onResourceCopied: () => jest.fn()
    }
  };
}

/**
 * Default props multiple selected resource
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsMultipleResource() {
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: {
      selectedResources: resourcesMock,
      lockDisplayDetail: true,
      onLockDetail: jest.fn(),
      onResourcesToExport: () => jest.fn(),
      onResourceCopied: () => jest.fn()
    }
  };
}

/**
 * Default props multiple selected resource can update
 * @returns {{resourceWorkspaceContext}}
 */
export function defaultPropsMultipleResourceUpdateRights() {
  const selectedResources = [resourcesMock[0], resourcesMock[2]];
  return {
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: {
      selectedResources,
      lockDisplayDetail: true,
      onLockDetail: jest.fn(),
      onResourcesToExport: () => jest.fn(),
      onResourceCopied: () => jest.fn()
    }
  };
}

/**
 * Mocked list of resources
 */
export const resourcesMock = [
  {
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
    "personal": false
  }, {
    "id": "daaf057e-7fc3-5537-a8a9-e8c151890878",
    "name": "cakephp",
    "username": "cake",
    "uri": "cakephp.org",
    "description": "The rapid and tasty php development framework",
    "deleted": false,
    "created": "2020-08-27T06:35:19+00:00",
    "modified": "2020-08-27T07:35:19+00:00",
    "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
    "favorite": null,
    "permission": {
      "id": "972bf3fc-0d5b-579c-9097-56d86394c255",
      "aco": "Resource",
      "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878",
      "aro": "User",
      "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
      "type": 7,
      "created": "2020-08-27T08:35:19+00:00",
      "modified": "2020-08-27T08:35:19+00:00"
    },
    "tags": [
      {
        "id": "094e27f0-637c-5397-b16c-f3eee5f7dd6c",
        "slug": "hotel",
        "is_shared": false
      },
      {
        "id": "0507cbbb-eb14-5121-9105-05380dbe64ff",
        "slug": "\u092a\u0930\u0926\u0947\u0936\u0940-\u092a\u0930\u0926\u0947\u0936\u0940",
        "is_shared": false
      }
    ],
    "folder_parent_id": null,
    "personal": false
  }
];
