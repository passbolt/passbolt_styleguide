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
 * @since         5.3.0
 */

import {defaultCustomFieldsCollection} from "../customField/customFieldsCollection.test.data";
import {SECRET_DATA_OBJECT_TYPE} from "./secretDataEntity";

/**
 * Returns a minimum DTO object suitable for the SecretDataV5StandaloneCustomFieldsCollection
 * @param {object} data
 * @returns {object}
 */
export const minimalSecretDataV5StandaloneCustomFieldsCollectionDtos = (data = {}) => ({
  object_type: SECRET_DATA_OBJECT_TYPE,
  custom_fields: [],
  ...data,
});

/**
 * Returns a default DTO object suitable for the SecretDataV5StandaloneCustomFieldsCollection
 * @param {object} data
 * @returns {object}
 */
export const defaultSecretDataV5StandaloneCustomFieldsCollectionDtos = (data = {}) => ({
  object_type: SECRET_DATA_OBJECT_TYPE,
  ...data,
  custom_fields: defaultCustomFieldsCollection(data?.custom_fields),
});
