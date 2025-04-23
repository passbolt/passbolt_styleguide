
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
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";

/**
 * Returns a default DTO object suitable for the MetadataTrustedKeyEntity
 * @param {object} data
 * @returns {object}
 */
export const defaultMetadataTrustedKeyDto = (data = {}) => ({
  fingerprint: pgpKeys.metadataKey.fingerprint,
  signed:  pgpKeys.metadataKey.created,
  ...data,
});
