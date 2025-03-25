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
 * @since         4.9.4
 */
import {defaultFolderDto} from "./folderEntity.test.data";

/**
 * Build dtos.
 * @param {number} [foldersCount=10] The number of dtos.
 * @param {object} [data]
 * @returns {object}
 */
export const defaultFoldersCollectionDto = (foldersCount = 10, data = {}) => {
  const dtos = [];
  for (let i = 0; i < foldersCount; i++) {
    const dto = defaultFolderDto({name: `folder ${i}`, ...data});
    dtos.push(dto);
  }
  return dtos;
};

/**
 * Build a nested folder dtos.
 * @param {object} [data]
 * @param {object} options
 * @param {integer} [options.depth=3] The depth of folders
 * @returns {object}
 */
export const nestedFoldersCollectionDto = (data = {}, options = {}) => {
  const depth = options?.depth || 3;
  const dtos = [];
  let dto;
  for (let i = 0; i < depth; i++) {
    dto = defaultFolderDto({
      name: `folder ${i}`,
      folder_parent_id: i === 0 ? null : dto.id,
      ...data
    });
    dtos.push(dto);
  }

  return dtos;
};
