/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

import {TEST_ROLE_USER_ID} from "../../../../shared/models/entity/role/roleEntity.test.data";
import {defaultAppContext as defaultExtAppContext} from "../../../contexts/ExtAppContext.test.data";
import {v4 as uuidv4} from "uuid";
import RolesCollection from "../../../../shared/models/entity/role/rolesCollection";
import {rolesCollectionDto} from "../../../../shared/models/entity/role/rolesCollection.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = defaultExtAppContext({
    users: [
      {
        id: uuidv4(),
        profile: {
          first_name: "firstname",
          last_name: "lastname",
        },
        username: "firstname@passbolt.com",
        role_id: TEST_ROLE_USER_ID
      }
    ],
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  });
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    roles: new RolesCollection(rolesCollectionDto),
    onClose: jest.fn()
  };
}
