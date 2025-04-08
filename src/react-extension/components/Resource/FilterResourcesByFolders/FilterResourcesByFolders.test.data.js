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
 * @since         3.3.3
 */

import {defaultFolderDto} from "../../../../shared/models/entity/folder/folderEntity.test.data";
import {ownerFolderPermissionDto, readFolderPermissionDto} from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import MockPort from "../../../test/mock/MockPort";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    folders: foldersMock
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      filter: {
        type: ResourceWorkspaceFilterTypes.FOLDER,
        payload: {
          folder: foldersMock[0]
        }
      },
    }),
    dragContext: {
      dragging: true,
      draggedItems: {
        folders: [foldersMock[3]],
        resources: []
      },
      onDragStart: jest.fn(),
      onDragEnd: jest.fn(),
    },
    history: {
      push: jest.fn()
    },
    contextualMenuContext: {
      show: jest.fn()
    }
  };
}

/**
 * Mocked list of resources
 */
export const foldersMock = [
  defaultFolderDto({
    id: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    name: "Accounting",
    permission: readFolderPermissionDto({
      aco_foreign_key: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
  }),
  defaultFolderDto({
    id: "299f613b-0706-570a-8636-956186384e0a",
    name: "ParentCertificates",
    permission: ownerFolderPermissionDto({
      aco_foreign_key: "299f613b-0706-570a-8636-956186384e0a",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
  }),
  defaultFolderDto({
    id: "3ed65efd-7c41-5906-9c02-71e2d95951da",
    name: "Certificates",
    permission: ownerFolderPermissionDto({
      aco_foreign_key: "3ed65efd-7c41-5906-9c02-71e2d95951da",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
    folder_parent_id: "299f613b-0706-570a-8636-956186384e0a",
  }),
  defaultFolderDto({
    id: "3ed65efd-7c41-5906-9c02-71e2d95951db",
    name: "ChildCertificates2",
    permission: ownerFolderPermissionDto({
      aco_foreign_key: "3ed65efd-7c41-5906-9c02-71e2d95951db",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
    folder_parent_id: "3ed65efd-7c41-5906-9c02-71e2d95951da",
  }),
  defaultFolderDto({
    id: "3ed65efd-7c41-5906-9c02-71e2d95951dc",
    name: "ChildCertificates1",
    permission: ownerFolderPermissionDto({
      aco_foreign_key: "3ed65efd-7c41-5906-9c02-71e2d95951dc",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
    folder_parent_id: "3ed65efd-7c41-5906-9c02-71e2d95951da",
  })
];
