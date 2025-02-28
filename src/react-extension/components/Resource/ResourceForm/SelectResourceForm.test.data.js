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
 * @since         5.0.0
 */

import {defaultResourceFormDto} from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import {
  ResourceEditCreateFormEnumerationTypes
} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";

/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    resourceFormSelected: ResourceEditCreateFormEnumerationTypes.PASSWORD,
    resource: defaultResourceFormDto({secret: {password: ""}})
  };
  return Object.assign(defaultData, data);
}
