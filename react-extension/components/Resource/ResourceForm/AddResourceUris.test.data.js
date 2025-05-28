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
 * @since         5.2.0
 */


import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultResourceFormDto} from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import {
  TEST_RESOURCE_TYPE_V5_DEFAULT
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import {
  defaultResourceMetadataDto
} from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";

/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    context: defaultAppContext(),
    onChange: jest.fn(),
    resource: defaultResourceFormDto({
      metadata: defaultResourceMetadataDto({
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        uris: ["https://www.passbolt.com", "https://www.passbolt.com/docs"]
      }),
    })
  };
  return Object.assign(defaultData, data);
}
