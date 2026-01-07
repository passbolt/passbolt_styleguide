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

import {
  defaultAdministratorRbacContext,
  denyRbacContext,
} from "../../../../shared/context/Rbac/RbacContext.test.data";
import { defaultUserAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultResourceWorkspaceContext } from "../../../contexts/ResourceWorkspaceContext.test.data";
import { resourceWithTotpDto } from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultUserDto } from "../../../../shared/models/entity/user/userEntity.test.data";
import { defaultPasswordExpirySettingsContext } from "../../../contexts/PasswordExpirySettingsContext.test.data";
import { nestedFoldersCollectionDto } from "../../../../shared/models/entity/folder/foldersCollection.test.data";

/**
 * Default component props with folder having owner permission
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const resourceOwner = defaultUserDto();

  const passwordExpiryContext = defaultPasswordExpirySettingsContext(data?.passwordExpiryContext);

  delete data?.passwordExpiryContext;

  return {
    context: defaultUserAppContext({
      users: [resourceOwner],
    }),
    rbacContext: defaultAdministratorRbacContext(),
    passwordExpiryContext: passwordExpiryContext,
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      details: {
        resource: resourceWithTotpDto({
          created_by: resourceOwner.id,
          modified_by: resourceOwner.id,
        }),
      },
    }),
    ...data,
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
    ...data,
  });
}

/**
 * With resource in a nested folder.
 * @param {object} data Override the default props.
 * @return {object}
 */
export function withNestedFoldersProps(data = {}) {
  const resourceOwner = defaultUserDto();
  const folders = nestedFoldersCollectionDto();

  return defaultProps({
    context: defaultUserAppContext({
      users: [resourceOwner],
      getHierarchyFolderCache: () => folders,
    }),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      details: {
        resource: resourceWithTotpDto({
          folder_parent_id: folders[2].id,
          created_by: resourceOwner.id,
          modified_by: resourceOwner.id,
        }),
      },
    }),
    ...data,
  });
}
