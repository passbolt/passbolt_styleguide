/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import MockPort from "../../../test/mock/MockPort";
import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/role.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort(),
    users: mockUsers
  };
  return Object.assign(defaultAppContext, appContext || {});
}


/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      details: {
        folder:  {
          "id": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
          "name": "Accounting",
          "created": "2020-02-01T00:00:00+00:00",
          "modified": "2020-02-01T00:00:00+00:00",
          "created_by": "f848277c-5398-58f8-a82a-72397af2d450",
          "modified_by": "f848277c-5398-58f8-a82a-72397af2d450",
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
        }
      }
    })
  };
}

/**
 * Mocked a user
 */
export const mockUsers = [{
  "id": "8e3874ae-4b40-590b-968a-418f704b9d9a",
  "role_id": TEST_ROLE_USER_ID,
  "username": "carol@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-05-11T09:32:49+00:00",
  "modified": "2020-05-12T09:32:49+00:00",
  "profile": {
    "id": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
    "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
    "first_name": "Carol",
    "last_name": "Shaw",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {
      "id": "0f769127-3053-45e4-bd8e-75e766bb4d52",
      "user_id": "640ebc06-5ec1-5322-a1ae-6120ed2f3a74",
      "foreign_key": "48bcd9ac-a520-53e0-b3a4-9da7e57b91aa",
      "model": "Avatar",
      "filename": "carol.png",
      "filesize": 733439,
      "mime_type": "image\/png",
      "extension": "png",
      "hash": "7445a736df60a1ac1bfdab8fc5b842a95c495aec",
      "path": "Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.png",
      "adapter": "Local",
      "created": "2020-05-13T09:32:51+00:00",
      "modified": "2020-05-13T09:32:51+00:00",
      "url": {
        "medium": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.a99472d5.png",
        "small": "img\/public\/Avatar\/73\/09\/19\/0f769127305345e4bd8e75e766bb4d52\/0f769127305345e4bd8e75e766bb4d52.65a0ba70.png"
      }
    }
  },
  "__placeholder_last_logged_in__": "",
  "last_logged_in": ""
}, {
  "id": "f848277c-5398-58f8-a82a-72397af2d450",
  "role_id": TEST_ROLE_USER_ID,
  "role": {
    "created": "2012-07-04T13:39:25+00:00",
    "description": "Logged in user",
    "id": TEST_ROLE_USER_ID,
    "modified": "2012-07-04T13:39:25+00:00",
    "name": "user"
  },
  "username": "ada@passbolt.com",
  "active": true,
  "deleted": false,
  "created": "2020-03-13T09:32:49+00:00",
  "modified": "2020-04-13T09:32:49+00:00",
  "profile": {
    "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
    "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
    "first_name": "Ada",
    "last_name": "Lovelace",
    "created": "2020-05-13T09:32:49+00:00",
    "modified": "2020-05-13T09:32:49+00:00",
    "avatar": {
      "id": "b5e7a332-595f-4e52-9591-79df27f8a978",
      "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
      "foreign_key": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
      "model": "Avatar",
      "filename": "ada.png",
      "filesize": 170049,
      "mime_type": "image\/png",
      "extension": "png",
      "hash": "97e36ab6528e26e3b9f988444ef490f125f49a39",
      "path": "Avatar\/ef\/71\/ed\/b5e7a332595f4e52959179df27f8a978\/b5e7a332595f4e52959179df27f8a978.png",
      "adapter": "Local",
      "created": "2020-05-13T09:32:52+00:00",
      "modified": "2020-05-13T09:32:52+00:00",
      "url": {
        "medium": "img\/public\/Avatar\/ef\/71\/ed\/b5e7a332595f4e52959179df27f8a978\/b5e7a332595f4e52959179df27f8a978.a99472d5.png",
        "small": "img\/public\/Avatar\/ef\/71\/ed\/b5e7a332595f4e52959179df27f8a978\/b5e7a332595f4e52959179df27f8a978.65a0ba70.png"
      }
    },
  },
  "__placeholder_last_logged_in__": "2020-05-12T15:56:49+00:00",
  "last_logged_in": "2020-08-12T15:56:49+00:00"
}];
