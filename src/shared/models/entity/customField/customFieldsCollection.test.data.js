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
import { defaultCustomField } from "./customFieldEntity.test.data";

export const defaultCustomFieldsCollection = () => [
  defaultCustomField({
    metadata_key: "Key 0",
    secret_value: "Value 0",
  }),
  defaultCustomField({
    metadata_key: "Key 1",
    secret_value: "Value 1",
  }),
];

export const customFieldsCollectionDtos = (count = 10, data = {}) => {
  const dtos = [];
  for (let i = 0; i < count; i++) {
    dtos.push(defaultCustomField(data));
  }
  return dtos;
};
