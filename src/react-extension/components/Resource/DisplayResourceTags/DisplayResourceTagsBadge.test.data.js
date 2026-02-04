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
 * @since         5.10.0
 */
import { v4 as uuidv4 } from "uuid";

/**
 * Default props
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    hiddenTags: [
      { id: uuidv4(), slug: "alpha" },
      { id: uuidv4(), slug: "beta" },
      { id: uuidv4(), slug: "gamma" },
    ],
    ...data,
  };
}

/**
 * Props with large amount of tags
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithLargeAmountOfTags(data = {}) {
  const tags = [];
  for (let i = 0; i < 105; i++) {
    tags.push({ id: uuidv4(), slug: `tag-${i}` });
  }
  return {
    hiddenTags: tags,
    ...data,
  };
}

/**
 * Props with no tags
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsWithNoTags(data = {}) {
  return {
    hiddenTags: [],
    ...data,
  };
}
