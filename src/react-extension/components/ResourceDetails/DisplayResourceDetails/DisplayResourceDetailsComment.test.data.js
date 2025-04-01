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

import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps() {
  return {
    context: defaultUserAppContext({loggedInUser: defaultUserDto({id: "5247399c-6c8a-47f0-8880-aa854e01e554"}, {withRole: true}),}),
    resourceWorkspaceContext: {
      details: {
        resource: {
          id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
          permission: {
            type: 15
          }
        }
      },
      refresh: {
        permissions: false
      }
    }
  };
}
