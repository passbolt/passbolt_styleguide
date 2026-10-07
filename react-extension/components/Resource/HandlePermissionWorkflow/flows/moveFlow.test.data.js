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

import { waitFor } from "@testing-library/react";
import { act } from "react";
import { v4 as uuidv4 } from "uuid";
import PermissionEntity from "../../../../../shared/models/entity/permission/permissionEntity";

/**
 * A permission DTO on a folder (ACO_FOLDER) for a given ARO.
 * @param {string} aroForeignKey The ARO the permission is granted to.
 * @param {string} folderId The folder the permission applies to.
 * @param {number} [type] The permission type.
 * @returns {object}
 */
export function folderPermissionDto(aroForeignKey, folderId, type = PermissionEntity.PERMISSION_OWNER) {
  return {
    id: uuidv4(),
    aco: "Folder",
    aco_foreign_key: folderId,
    aro: "User",
    aro_foreign_key: aroForeignKey,
    type,
  };
}

/**
 * A permission DTO on a folder (ACO_FOLDER) granted to a GROUP.
 * @param {string} aroForeignKey The group the permission is granted to.
 * @param {string} folderId The folder the permission applies to.
 * @param {number} [type] The permission type.
 * @returns {object}
 */
export function folderGroupPermissionDto(aroForeignKey, folderId, type = PermissionEntity.PERMISSION_OWNER) {
  return {
    id: uuidv4(),
    aco: "Folder",
    aco_foreign_key: folderId,
    aro: "Group",
    aro_foreign_key: aroForeignKey,
    type,
  };
}

/**
 * A permission DTO on a resource (ACO_RESOURCE) for a given ARO.
 * @param {string} aroForeignKey The ARO the permission is granted to.
 * @param {string} resourceId The resource the permission applies to.
 * @param {number} [type] The permission type.
 * @returns {object}
 */
export function resourcePermissionDto(aroForeignKey, resourceId, type = PermissionEntity.PERMISSION_OWNER) {
  return {
    id: uuidv4(),
    aco: "Resource",
    aco_foreign_key: resourceId,
    aro: "User",
    aro_foreign_key: aroForeignKey,
    type,
  };
}

/**
 * Pull the props the workflow passed to a given dispatched dialog (by component identity).
 * @param {object} dialogContext The mocked dialog context.
 * @param {Function} DialogComponent The dialog the props are wanted for.
 * @returns {object|undefined}
 */
export function dialogPropsFor(dialogContext, DialogComponent) {
  const call = dialogContext.open.mock.calls.find(([Dialog]) => Dialog === DialogComponent);
  return call?.[1];
}

/**
 * Capture the arguments of a given port request by event name.
 * @param {object} port The mocked port, with a spied `request`.
 * @param {string} eventName The port event name.
 * @returns {Array<*>|undefined}
 */
export function portRequestArgs(port, eventName) {
  const call = port.request.mock.calls.find(([event]) => event === eventName);
  return call?.slice(1);
}

/**
 * Mount a move flow and wait until it reaches the given status.
 * @param {Function} TestPage The flow's test page class.
 * @param {object} props The flow props.
 * @param {string} status The awaited flow status.
 * @returns {Promise<object>} The mounted test page.
 */
export async function mountUntilStatus(TestPage, props, status) {
  let page;
  await act(() => (page = new TestPage(props)));
  await waitFor(() => {
    if (page._instance.state.status !== status) {
      throw new Error(`The flow did not reach the "${status}" status`);
    }
  });
  return page;
}

/**
 * Mount a move flow and wait until it has terminated (onStop called).
 * @param {Function} TestPage The flow's test page class.
 * @param {object} props The flow props.
 * @returns {Promise<object>} The mounted test page.
 */
export async function mountUntilFlowStopped(TestPage, props) {
  let page;
  await act(() => (page = new TestPage(props)));
  await waitFor(() => {
    if (!props.onStop.mock.calls.length) {
      throw new Error("Workflow not yet terminated");
    }
  });
  return page;
}
