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
 * @since         4.9.3
 */
import { v4 as uuidv4 } from "uuid";
import { defaultUserDto } from "../user/userEntity.test.data";

/**
 * Build the minimum comment Dto needed
 * @param {Object} [data]
 * @returns {Object}
 */
export const minimumCommentDto = (data = {}) => ({
  user_id: "f848277c-5398-58f8-a82a-72397af2d450",
  foreign_key: "5fe06fae-4fa0-4a7e-82dd-46d96c63733a",
  foreign_model: "Resource",
  content: "minimum content",
  ...data,
});

/**
 * Build default comment dto.
 * @param {object} data The data to override the default dto.
 * @param {Object} [options]
 * @param {boolean} [options.withModifier=false] Add modifier default dto.
 * @param {boolean} [options.withCreator=false] Add creator default dto.
 * @returns {object}
 */
export const defaultCommentDto = (data = {}, options = {}) => {
  const id = data?.id || uuidv4();

  const defaultData = {
    id: id,
    parent_id: null,
    foreign_key: "5fe06fae-4fa0-4a7e-82dd-46d96c63733a",
    foreign_model: "Resource",
    content: "comment2",
    created: "2020-09-03T09:54:10+00:00",
    modified: "2020-09-03T09:54:10+00:00",
    created_by: "f848277c-5398-58f8-a82a-72397af2d450",
    modified_by: "f848277c-5398-58f8-a82a-72397af2d450",
    user_id: "f848277c-5398-58f8-a82a-72397af2d450",
    ...data,
  };

  if (!data.creator && options?.withCreator) {
    defaultData.creator = defaultUserDto();
  }

  if (!data.modifier && options?.withModifier) {
    defaultData.modifier = defaultUserDto();
  }

  return defaultData;
};
