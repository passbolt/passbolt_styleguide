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

import {v4 as uuidv4} from 'uuid';

/**
 * Minimal profile dto.
 * @param {object} data The data to override
 * @returns {object}
 */
export const minimalAvatarDto = (data = {}) => ({
  "url": {
    "medium": "img\/avatar\/user_medium.png",
    "small": "img\/avatar\/user.png"
  },
  ...data
});

/**
 * Default avatar dto.
 * @param {object} data The data to override
 * @returns {object}
 */
export const defaultAvatarDto = (data = {}) => minimalAvatarDto({
  "id": uuidv4(),
  "url": {
    "medium": "/avatars/view/e6927385-195c-4c7f-a107-a202ea86de40/medium.jpg",
    "small": "/avatars/view/e6927385-195c-4c7f-a107-a202ea86de40/small.jpg"
  },
  "created": "2023-06-03T12:03:46+00:00",
  "modified": "2023-06-03T12:03:46+00:00",
  ...data
});
