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
 * @since         3.0.0
 */

import {TEST_ROLE_ADMIN_ID, TEST_ROLE_USER_ID} from "../../../../src/shared/models/entity/role/role.test.data";

export default () => {
  return [{
    "id": "6aada140-fe8b-5e69-a90f-ae0cec6d3dcf",
    "aco": "Folder",
    "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "aro": "User",
    "aro_foreign_key": "f848277c-5398-58f8-a82a-72397af2d450",
    "type": 1,
    "created": "2020-05-13T09:33:17+00:00",
    "modified": "2020-05-13T09:33:17+00:00",
    "group": null,
    "user": {
      "id": "f848277c-5398-58f8-a82a-72397af2d450",
      "role_id": TEST_ROLE_USER_ID,
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
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "17336097-cd30-57ab-bc40-89b31bcc513f",
    "aco": "Folder",
    "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "aro": "User",
    "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "type": 15,
    "created": "2020-05-13T09:33:17+00:00",
    "modified": "2020-05-13T09:33:17+00:00",
    "group": null,
    "user": {
      "id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "role_id": TEST_ROLE_ADMIN_ID,
      "username": "admin@passbolt.com",
      "active": true,
      "deleted": false,
      "created": "2020-05-13T09:32:49+00:00",
      "modified": "2020-05-13T09:32:49+00:00",
      "profile": {
        "id": "92ccfd1b-6eb8-5e1c-a022-cf22463e8361",
        "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
        "first_name": "Admin",
        "last_name": "User",
        "created": "2020-05-13T09:32:49+00:00",
        "modified": "2020-05-13T09:32:49+00:00",
        "avatar": {"url": {"medium": "img\/avatar\/user_medium.png", "small": "img\/avatar\/user.png"}}
      },
      "last_logged_in": ""
    }
  }, {
    "id": "b05cdb85-43fc-4255-b933-6d91c8da6d37",
    "aco": "Folder",
    "aco_foreign_key": "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    "aro": "Group",
    "aro_foreign_key": "428ed4cd-81b1-56af-aa7f-a7cbdbe227e4",
    "type": 7,
    "created": "2020-05-13T17:07:10+00:00",
    "modified": "2020-05-13T17:07:10+00:00",
    "group": {
      "id": "428ed4cd-81b1-56af-aa7f-a7cbdbe227e4",
      "name": "Marketing",
      "deleted": false,
      "created": "2016-01-29T13:39:25+00:00",
      "modified": "2016-01-29T13:39:25+00:00",
      "created_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "modified_by": "d57c10f5-639d-5160-9c81-8a0c6c4ec856"
    },
    "user": null
  }];
};
