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

const _passbolt_data = {
  "config": {
    "user.settings.trustedDomain": "http://localhost:3001",
    "user.firstname": "Ada",
    "user.id": "f848277c-5398-58f8-a82a-72397af2d450",
    "user.lastname": "Lovelace",
    "user.settings.securityToken.code": "XgJ",
    "user.settings.securityToken.color": "#4DB397",
    "user.settings.securityToken.textColor": "#000",
    "user.username": "ada@passbolt.com",
  }
};

export default () => {
  const storage = new MockStorage();
  storage.local.set({_passbolt_data});
  storage.local.set({resourceTypes});

  return storage;
};