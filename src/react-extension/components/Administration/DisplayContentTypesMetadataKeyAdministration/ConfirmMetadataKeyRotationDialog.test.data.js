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
 * @since         5.6.0
 */

import ExternalGpgKeyEntity from "../../../../shared/models/entity/gpgkey/externalGpgKeyEntity";
import { ed25519ExternalPublicGpgKeyEntityDto } from "../../../../shared/models/entity/gpgkey/externalGpgKeyEntity.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    metadataKeyInfo: new ExternalGpgKeyEntity(ed25519ExternalPublicGpgKeyEntityDto()),
    onConfirm: jest.fn(),
    onClose: jest.fn(),
    ...props,
  };
}
