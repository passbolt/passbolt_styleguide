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
import {
  defaultMetadataKeyDto,
  metadataKeyWithSignedMetadataPrivateKeyDataDto
} from "../../../../shared/models/entity/metadata/metadataKeyEntity.test.data";
import {
  defaultMetadataTrustedKeyDto
} from "../../../../shared/models/entity/metadata/metadataTrustedKeyEntity.test.data";
import MetadataKeyEntity from "../../../../shared/models/entity/metadata/metadataKeyEntity";
import MetadataTrustedKeyEntity from "../../../../shared/models/entity/metadata/metadataTrustedKeyEntity";

/**
 * Default props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const metadataKeyDto = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true, withCreator: true});
  delete metadataKeyDto.metadata_private_keys[0].data; // Service worker does not return the data.
  return {
    context: defaultUserAppContext(),
    requestId: uuidv4(),
    metadataTrustedKey: new MetadataTrustedKeyEntity(defaultMetadataTrustedKeyDto()),
    metadataKey: new MetadataKeyEntity(metadataKeyDto, {validate: false}),
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
  const metadataKeyDto = metadataKeyWithSignedMetadataPrivateKeyDataDto({}, {withMetadataPrivateKeys: true, withCreator: true});
  delete metadataKeyDto.metadata_private_keys[0].data; // Service worker does not return the data.
  return {
    context: defaultUserAppContext(),
    requestId: uuidv4(),
    metadataTrustedKey: new MetadataTrustedKeyEntity(defaultMetadataTrustedKeyDto()),
    metadataKey: new MetadataKeyEntity(metadataKeyDto, {validate: false}),
    onClose: jest.fn(),
    ...data
  };
}
