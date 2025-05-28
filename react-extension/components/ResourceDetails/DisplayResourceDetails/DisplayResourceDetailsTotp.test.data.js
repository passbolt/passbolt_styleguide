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
import {
  resourceStandaloneTotpDto,
  resourceWithTotpDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultUserDto} from "../../../../shared/models/entity/user/userEntity.test.data";
import {
  defaultResourceMetadataDto
} from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import {TEST_RESOURCE_TYPE_TOTP} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";

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
    isStandaloneTotp: false,
    ...data
  };
}

/**
 * Standalone totp component props with resource having owner permission
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function standaloneTotpProps(data = {}) {
  const resourceOwner = defaultUserDto();

  return {
    context: defaultUserAppContext({
      users: [resourceOwner]
    }),
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      details: {
        resource: resourceStandaloneTotpDto({
          metadata: defaultResourceMetadataDto({
            resource_type_id: TEST_RESOURCE_TYPE_TOTP,
            uris: ["https://passbolt.com", "https://passbolt.com/doc"],
            username: null,
          }),
          created_by: resourceOwner.id,
          modified_by: resourceOwner.id,
        }),
      }
    }),
    isStandaloneTotp: true,
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
