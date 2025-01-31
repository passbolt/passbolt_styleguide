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

import {defaultAdministratorRbacContext, denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {resourceWithTotpDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";

/**
 * Default component props with resource having owner permission
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const resourceOwner = defaultUserDto();

  return {
    context: defaultUserAppContext({
      users: [resourceOwner]
    }),
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      details: {
        resource: resourceWithTotpDto({
          created_by: resourceOwner.id,
          modified_by: resourceOwner.id,
        }),
      }
    }),
    ...data
  };
}

/**
 * Props with denied UI action.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithDenyUiAction(data = {}) {
  return defaultProps({
    rbacContext: denyRbacContext(),
    ...data
  });
}
