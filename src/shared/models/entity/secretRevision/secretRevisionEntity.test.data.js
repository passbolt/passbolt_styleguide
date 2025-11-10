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
 * @since         5.7.0
 */

import {v4 as uuidv4} from "uuid";
import {defaultUserDto} from "../user/userEntity.test.data";
import {readSecret} from "../secret/secretEntity.test.data";
import {TEST_RESOURCE_TYPE_V5_DEFAULT} from "../resourceType/resourceTypeEntity.test.data";

/**
 * Build default secret revisions settings.
 * @param {object} [data={}] Data to override
 * @param {object} options
 * @param {object} [options.withSecrets = false] if true, set the secrets with `readSecret()`
 * @param {object} [options.withCreator = false] if true, set the creator field with a user dto
 * @returns {object}
 */
export const defaultSecretRevisionDto = (data = {}, options) => {
  const defaultData = {
    id: uuidv4(),
    resource_id: uuidv4(),
    resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
    created: "2025-03-04T13:59:11+00:00",
    created_by: uuidv4(),
    modified: "2025-08-04T18:59:11+00:00",
    modified_by: uuidv4(),
    deleted: null
  };

  if (!defaultData.creator && options?.withCreator) {
    defaultData.creator = defaultUserDto();
    //todo: put back when UserEntity is fully migrated
    delete defaultData.creator.is_mfa_enabled;
    delete defaultData.creator.last_logged_in;
  }

  if (!defaultData.secrets && options?.withSecrets) {
    defaultData.secrets = [readSecret({secret_revision_id: defaultData.id})];
  }

  return Object.assign(defaultData, data);
};
