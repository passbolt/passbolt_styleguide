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
  return [
    {
      "id": TEST_ROLE_USER_ID,
      "name": "user",
      "description": "Logged in user",
      "created": "2012-07-04T13:39:25+00:00",
      "modified": "2012-07-04T13:39:25+00:00"
    }, {
      "id": TEST_ROLE_ADMIN_ID,
      "name": "admin",
      "description": "Logged in admin",
      "created": "2012-07-04T13:39:25+00:00",
      "modified": "2012-07-04T13:39:25+00:00"
    }
  ]
};