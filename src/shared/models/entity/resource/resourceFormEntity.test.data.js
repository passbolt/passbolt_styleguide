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
 * @since         4.1.0
 */
import { v4 as uuidv4 } from "uuid";
import { TEST_RESOURCE_TYPE_V5_DEFAULT } from "../resourceType/resourceTypeEntity.test.data";
import { defaultResourceMetadataDto } from "./metadata/resourceMetadataEntity.test.data";
import { minimalDefaultSecretDataV5DefaultDto } from "../secretData/secretDataV5DefaultEntity.test.data";

/**
 * Build default resource dto.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const defaultResourceFormDto = (data = {}) => {
  const id = data?.id || uuidv4();
  return {
    id: id,
    resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
    folder_parent_id: null,
    metadata: defaultResourceMetadataDto({
      resource_type_id: data?.metadata?.resource_type_id || data?.resource_type_id || TEST_RESOURCE_TYPE_V5_DEFAULT,
    }),
    secret: minimalDefaultSecretDataV5DefaultDto(),
    ...data,
  };
};
