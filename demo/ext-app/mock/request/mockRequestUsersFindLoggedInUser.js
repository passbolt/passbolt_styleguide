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

import {TEST_ROLE_USER_ID} from "../../../../src/shared/models/entity/role/role.test.data";

export default () => {
  return {
    "id": "f848277c-5398-58f8-a82a-72397af2d450",
    "role_id": TEST_ROLE_USER_ID,
    "role" : {
      "name": "admin"
    },
    "username": "ada@passbolt.com",
    "active": true,
    "deleted": false,
    "created": "2020-08-13T10:10:02+00:00",
    "modified": "2020-09-13T10:10:02+00:00",
    "profile": {
      "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
      "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
      "first_name": "Ada",
      "last_name": "Lovelace",
      "created": "2020-10-13T10:10:02+00:00",
      "modified": "2020-10-13T10:10:02+00:00",
      "avatar": {
        "url": {
          "medium": "img/avatar/user_medium.png",
          "small": "img/avatar/user.png"
        }
      }
    },
    "is_mfa_enabled": false,
    "last_logged_in": null
  };
};
