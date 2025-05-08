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

import {v4 as uuidv4} from "uuid";
import {defaultMetadataKeyDto} from "../../../shared/models/entity/metadata/metadataKeyEntity.test.data";
import {defaultMetadataTrustedKeyDto} from "../../../shared/models/entity/metadata/metadataTrustedKeyEntity.test.data";
import {defaultAppContext} from "../../contexts/AppContext.test.data";
import MetadataTrustedKeyEntity from "../../../shared/models/entity/metadata/metadataTrustedKeyEntity";
import MetadataKeyEntity from "../../../shared/models/entity/metadata/metadataKeyEntity";


/**
 * Default props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const metadataKeyDto = defaultMetadataKeyDto({}, {withMetadataPrivateKeys: true});
  delete metadataKeyDto.metadata_private_keys[0].data;
  metadataKeyDto.metadata_private_keys[0].data_signed_by_current_user = "2025-04-24T10:39.000Z";
  return {
    context: defaultAppContext(),
    requestId: uuidv4(),
    metadataTrustedKey: new MetadataTrustedKeyEntity(defaultMetadataTrustedKeyDto()),
    metadataKey: new MetadataKeyEntity(metadataKeyDto, {validate: false}),
    onComplete: jest.fn(),
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
    context: defaultAppContext(),
    requestId: uuidv4(),
    metadataTrustedKey: new MetadataTrustedKeyEntity(defaultMetadataTrustedKeyDto()),
    metadataKey: new MetadataKeyEntity(defaultMetadataKeyDto(), {validate: false}),
    onComplete: jest.fn(),
    ...data
  };
}
