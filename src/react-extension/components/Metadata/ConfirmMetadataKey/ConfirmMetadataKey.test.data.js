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
 * @since         5.1.0
 */

import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {v4 as uuidv4} from "uuid";
import {defaultMetadataKeyDto} from "../../../../shared/models/entity/metadata/metadataKeyEntity.test.data";
import {
  defaultMetadataTrustedKeyDto
} from "../../../../shared/models/entity/metadata/metadataTrustedKeyEntity.test.data";

/**
 * Default props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const metadataKey = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true});
  delete metadataKey.metadata_private_keys[0].data;
  metadataKey.metadata_private_keys[0].data_signed_by_current_user = "2025-04-24T10:39.000Z";
  return {
    context: defaultUserAppContext(),
    requestId: uuidv4(),
    confirmMetadataKey: {
      metadataTrustedKey: defaultMetadataTrustedKeyDto(),
      metadataKey: metadataKey
    },
    onClose: jest.fn(),
    ...data
  };
}

/**
 * Default props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultPropsWithRollback(data = {}) {
  return {
    context: defaultUserAppContext(),
    requestId: uuidv4(),
    confirmMetadataKey: {
      metadataTrustedKey: defaultMetadataTrustedKeyDto(),
      metadataKey: defaultMetadataKeyDto()
    },
    onClose: jest.fn(),
    ...data
  };
}
