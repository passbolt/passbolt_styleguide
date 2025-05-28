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
import resourcesFixtures from "../../fixture/resources";
import {defaultTotpDto} from "../../../src/shared/models/entity/totp/totpDto.test.data";
import {
  TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP
} from "../../../src/shared/models/entity/resourceType/resourceTypeEntity.test.data";

export default resourceId => {
  const resource = resourcesFixtures.find(resource => resource.id === resourceId);
  if (resource.resource_type_id === TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP) {
    return {
      password: "fa2fN\"y!Pk0=f2Vi<n",
      description: "this is an encrypted description",
      totp: defaultTotpDto()
    };
  } else {
    return "fa2fN\"y!Pk0=f2Vi<n";
  }
};
