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

import SecretRevisionEntity from "../../../shared/models/entity/secretRevision/secretRevisionEntity";
import { defaultSecretRevisionDto } from "../../../shared/models/entity/secretRevision/secretRevisionEntity.test.data";
import { defaultAppContext } from "../../contexts/ExtAppContext.test.data";

/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    context: defaultAppContext(),
    secretRevision: new SecretRevisionEntity(defaultSecretRevisionDto({}, { withCreator: true })),
    disabled: false,
    onSelectSecretRevision: jest.fn(),
  };
  return Object.assign(defaultData, data);
}
