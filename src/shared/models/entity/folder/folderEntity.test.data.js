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
 * @since         4.1.0
 */
import {v4 as uuidv4} from "uuid";
import {ownerPermissionDto, readPermissionDto, updatePermissionDto} from "../permission/permissionEntity.test.data";

export const minimalFolderDto = (data = {}) => ({
  name: 'Folder name',
  ...data
});

export const defaultFolderDto = (data = {}) => {
  const id = data?.id || uuidv4();

  return {
    id: id,
    name: "Accounting",
    created: "2020-02-01T00:00:00+00:00",
    modified: "2020-02-01T00:00:00+00:00",
    created_by: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    modified_by: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    permission: ownerPermissionDto({
      aco: 'Folder',
      aco_foreign_key: id
    }),
    permissions: [ownerPermissionDto({
      aco: 'Folder',
      aco_foreign_key: id
    })],
    folder_parent_id: null,
    personal: false,
    ...data
  };
};

export const folderWithReadPermissionDto = (data = {}) => {
  const id = data?.id || uuidv4();

  return defaultFolderDto({
    id: id,
    permission: readPermissionDto({aco_foreign_key: id, aco: 'Folder'}),
    ...data
  });
};

export const folderWithUpdatePermissionDto = (data = {}) => {
  const id = data?.id || uuidv4();

  return defaultFolderDto({
    id: id,
    permission: updatePermissionDto({aco_foreign_key: id, aco: 'Folder'}),
    ...data
  });
};
