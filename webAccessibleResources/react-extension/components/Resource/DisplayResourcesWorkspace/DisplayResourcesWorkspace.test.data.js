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
 * @since         2.11.0
 */

import {defaultAdministratorRbacContext, denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {resourceWithFavoriteDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultFolderDto} from "../../../../shared/models/entity/folder/folderEntity.test.data";
import {propsWithFilteredResources} from "../DisplayResourcesList/DisplayResourcesList.test.data";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultUserAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
    ...data
  };
}

/**
 * Props with no folder and resource and details not locked.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultPropsFolderAndResourceLocked(data = {}) {
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      details: {
        folder: null,
        resource: null
      },
      lockDisplayDetail: false,
    }),
    ...data
  });
}

/**
 * Props with folder and resource selected.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultPropsWithFolderAndResource(data = {}) {
  return defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      details: {
        folder: defaultFolderDto(),
        resource: resourceWithFavoriteDto()
      },
      lockDisplayDetail: true,
    }),
    ...data
  });
}

/**
 * Props with denied UI action.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithDenyUiAction(data = {}) {
  return propsWithFilteredResources({
    rbacContext: denyRbacContext(),
    ...data
  });
}
