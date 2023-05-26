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

import MockStorage from "../../../src/react-extension/test/mock/MockStorage";
import resourceTypes from "../fixture/resourceTypes";
import {TEST_ROLE_ADMIN_ID, TEST_ROLE_USER_ID} from "../../../src/shared/models/entity/role/role.test.data";

const _passbolt_data = {
  "config": {
    "user.settings.trustedDomain": "http://localhost:3000",
    "user.firstname": "Ada",
    "user.id": "f848277c-5398-58f8-a82a-72397af2d450",
    "user.lastname": "Lovelace",
    "user.settings.securityToken.code": "III",
    "user.settings.securityToken.color": "#4DB397",
    "user.settings.securityToken.textColor": "#000",
    "user.settings.theme": {
      "id": "9a5ecc88-f4df-5cc2-b152-6ca310127a67",
      "name": "default",
      "preview": "http:\/\/localhost:3000\/img\/themes\/default.png"
    },
    "user.username": "ada@passbolt.com",
  }
};

const roles = [{
  "id": TEST_ROLE_ADMIN_ID,
  "name": "admin",
  "description": "Organization administrator",
  "created": "2012-07-04T13:39:25+00:00",
  "modified": "2012-07-04T13:39:25+00:00"
}, {
  "id": "6f02b8d2-e24c-51fe-a452-5a027c26dbef",
  "name": "guest",
  "description": "Non logged in user",
  "created": "2012-07-04T13:39:25+00:00",
  "modified": "2012-07-04T13:39:25+00:00"
}, {
  "id": TEST_ROLE_USER_ID,
  "name": "user",
  "description": "Logged in user",
  "created": "2012-07-04T13:39:25+00:00",
  "modified": "2012-07-04T13:39:25+00:00"
}, {
  "id": "eeda6af2-38dc-5e34-b86d-7687878bc38a",
  "name": "root",
  "description": "Super Administrator",
  "created": "2012-07-04T13:39:25+00:00",
  "modified": "2012-07-04T13:39:25+00:00"
}];

export default () => {
  const storage = new MockStorage();
  storage.local.set({_passbolt_data});
  storage.local.set({resourceTypes});
  storage.local.set({roles});

  return storage;
};
