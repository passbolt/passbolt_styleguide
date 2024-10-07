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
 * @since         4.10.0
 */
import {v4 as uuidv4} from "uuid";
import {defaultArmoredKey, defaultPgpMessage} from "../../../../../test/assert/assertEntityProperty";

/**
 * Returns a minimal DTO object suitable for the MetadataPrivateKeyEntity
 * @param {object} data
 * @param {object} options
 * @param {object} [options.withData = false] if true, set the data field with `defaultData()`
 * @param {object} [options.withArmoredKey = false] if true, set the armored_key field with `defaultArmoredKey()`
 * @returns {object}
 */
export const minimalMetadataPrivateKeyDto = (data = {}, options = {withData: false, withArmoredKey: false}) => ({
  user_id: uuidv4(),
  data: options.withData ? defaultPgpMessage() : undefined,
  armored_key: options.withArmoredKey ? defaultArmoredKey() : undefined,
  ...data
});

/**
 * Returns a DTO object suitable for the MetadataPrivateKeyEntity
 * @param {object} data
 * @param {object} options
 * @param {object} [options.withData = false] if true, set the data field with `defaultData()`
 * @param {object} [options.withArmoredKey = false] if true, set the armored_key field with `defaultArmoredKey()`
 * @returns {object}
 */
export const defaultMetadataPrivateKeyDto = (data = {}, options = {withData: false, withArmoredKey: false}) => minimalMetadataPrivateKeyDto({
  id: uuidv4(),
  metadata_key_id: uuidv4(),
  modified: "2022-10-11T08:09:00+00:00",
  created_by: uuidv4(),
  created: "2022-10-11T08:09:00+00:00",
  modified_by: uuidv4(),
  ...data,
}, options);
