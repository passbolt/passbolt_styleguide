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
 * @since         3.0.0
 */
import {v4 as uuidv4} from "uuid";

const createFolder = (index, data = {}) => ({
  id: uuidv4(),
  name: `Folder-${index}`,
  created: "2020-02-01T00:00:00+00:00",
  modified: "2020-02-01T00:00:00+00:00",
  created_by: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  modified_by: "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
  permission: {
    id: uuidv4(),
    aco: "Folder",
    aco_foreign_key: "9e03fd73-04c0-5514-95fa-1a6cf2c7c093",
    aro: "User",
    aro_foreign_key: "f848277c-5398-58f8-a82a-72397af2d450",
    type: 1,
    created: "2020-05-11T10:11:13+00:00",
    modified: "2020-05-11T10:11:13+00:00"
  },
  folder_parent_id: null,
  personal: false,
  ...data
});

export default (() => {
  const folders = [];
  for (let i = 0; i < 10; i++) {
    folders.push(createFolder(i.toString()));
  }

  for (let i = 0; i < 5; i++) {
    folders.push(createFolder((i + 10).toString(), {folder_parent_id: folders[i].id}));
  }
  return folders;
})();
