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
import {ownerFolderPermissionDto} from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";

/**
 * Default props
 * @returns {any}
 */
export function defaultProps() {
  return {
    context: defaultAppContext({folders: foldersMock}),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      filter: {
        type: ResourceWorkspaceFilterTypes.FOLDER,
        payload: {
          folder: foldersMock[0]
        }
      }
    }),
    dragContext: {
      dragging: true,
      draggedItems: {
        folders: [foldersMock[2]],
        resources: []
      },
      onDragStart: jest.fn(),
      onDragEnd: jest.fn(),
    },
    folder: foldersMock[0],
    toggleOpenFolder: jest.fn(),
    toggleCloseFolder: jest.fn(),
    contextualMenuContext: {
      show: jest.fn()
    },
    dialogContext: defaultDialogContext(),
    history: {
      push: jest.fn(),
    },
    match: {
      params: {
        filterByFolderId: foldersMock[0].id
      }
    }
  };
}

/**
 * Mocked list of resources
 */
export const foldersMock = [
  defaultFolderDto({
    id: "3ed65efd-7c41-5906-9c02-71e2d95951da",
    name: "Certificates",
    permission: ownerFolderPermissionDto({
      aco_foreign_key: "3ed65efd-7c41-5906-9c02-71e2d95951da",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
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
  }),
  defaultFolderDto({
    id: "3ed65efd-7c41-5906-9c02-71e2d95951dd",
    name: "ChildCertificates3",
    permission: ownerFolderPermissionDto({
      aco_foreign_key: "3ed65efd-7c41-5906-9c02-71e2d95951dd",
      aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    }),
    folder_parent_id: "3ed65efd-7c41-5906-9c02-71e2d95951dc",
  })
];
