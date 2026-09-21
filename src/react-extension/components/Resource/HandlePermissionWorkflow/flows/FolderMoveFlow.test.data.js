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
 * @since         5.16.0
 */

import { v4 as uuidv4 } from "uuid";
import { defaultDialogContext } from "../../../../contexts/DialogContext.test.data";
import { defaultAppContext } from "../../../../contexts/ExtAppContext.test.data";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";
import { ownerFolderPermissionDto } from "../../../../../shared/models/entity/permission/permissionEntity.test.data";

/**
 * A minimal folder DTO carrying the operator's own permission on the folder.
 * @param {Object} [data] The overrides (e.g. `permission.type`).
 * @returns {object}
 */
export function folderDto(data = {}) {
  const id = data.id ?? uuidv4();
  return {
    id,
    name: "Moved folder",
    ...data,
    permission: ownerFolderPermissionDto({ aco_foreign_key: id, ...data.permission }),
  };
}

/**
 * Default props for the FolderMoveFlow component.
 * @param {Object} [props] The overrides.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const context = defaultAppContext(props?.context);
  const folder = props?.folder ?? folderDto();
  // Bind the operator's permission to the logged-in user, the way the API returns it (not overridable).
  folder.permission = {
    ...folder.permission,
    aro: PermissionEntity.ARO_USER,
    aro_foreign_key: context.loggedInUser.id,
  };
  const _props = {
    folder,
    context,
    dialogContext: defaultDialogContext(props?.dialogContext),
    actionFeedbackContext: { displaySuccess: jest.fn(), displayError: jest.fn() },
    history: { push: jest.fn() },
    onStop: jest.fn(),
    t: (text) => text,
  };
  delete props?.context;
  delete props?.dialogContext;
  delete props?.folder;
  return Object.assign(_props, props);
}
