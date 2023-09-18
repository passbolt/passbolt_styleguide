/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import {plaintextSecretPasswordDescriptionTotpDto} from "../../models/entity/plaintextSecret/plaintextSecretEntity.test.data";

/**
 * Returns the default component props
 * @param {object} props Props to override
 * @returns {any}
 */
export function defaultProps(props = {}) {
  return {
    totp: plaintextSecretPasswordDescriptionTotpDto().totp,
    canClick: jest.fn(),
    onClick: jest.fn(),
    ...props
  };
}
