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

import {defaultAdministratorRbacContext, denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {
  defaultFolderDto,
  folderWithReadPermissionDto, folderWithUpdatePermissionDto
} from "../../../../shared/models/entity/folder/folderEntity.test.data";

/**
 * Default component props with folder having owner permission
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultUserAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
    dialogContext: defaultDialogContext(),
    folder: defaultFolderDto(),
    hide: jest.fn(),
    left: 0,
    top: 0,
    ...data
  };
}

/**
 * Props with folder having read permission
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithFolderPermissionRead(data = {}) {
  return defaultProps({
    folder: folderWithReadPermissionDto(),
    ...data
  });
}

/**
 * Props with folder having read permission
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithFolderPermissionUpdate(data = {}) {
  return defaultProps({
    folder: folderWithUpdatePermissionDto(),
    ...data
  });
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
