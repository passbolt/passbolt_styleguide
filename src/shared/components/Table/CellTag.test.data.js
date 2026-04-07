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

import { defaultTagDto } from "../../models/entity/tag/tagEntity.test.data";

/**
 * Returns the default component props with no tags
 * @param {object} props Props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    value: [],
    ...props,
  };
}

/**
 * Returns props with a single tag
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithOneTag(props = {}) {
  return defaultProps({
    value: [defaultTagDto({ slug: "alpha-tag" })],
    ...props,
  });
}

/**
 * Returns props with two tags
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithTwoTags(props = {}) {
  return defaultProps({
    value: [defaultTagDto({ slug: "alpha-tag" }), defaultTagDto({ slug: "beta-tag" })],
    ...props,
  });
}

/**
 * Returns props with three tags
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithThreeTags(props = {}) {
  return defaultProps({
    value: [
      defaultTagDto({ slug: "alpha-tag" }),
      defaultTagDto({ slug: "beta-tag" }),
      defaultTagDto({ slug: "gamma-tag" }),
    ],
    ...props,
  });
}

/**
 * Returns props with more than three tags (should show badge)
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithManyTags(props = {}) {
  return defaultProps({
    value: [
      defaultTagDto({ slug: "alpha-tag" }),
      defaultTagDto({ slug: "beta-tag" }),
      defaultTagDto({ slug: "delta-tag" }),
      defaultTagDto({ slug: "epsilon-tag" }),
      defaultTagDto({ slug: "gamma-tag" }),
    ],
    ...props,
  });
}

/**
 * Returns props with more than 99 hidden tags (should show 99+ badge)
 * @param {object} props Props to override
 * @returns {object}
 */
export function propsWithOver99Tags(props = {}) {
  const tags = [];
  for (let i = 0; i < 105; i++) {
    tags.push(defaultTagDto({ slug: `tag-${String(i).padStart(3, "0")}` }));
  }
  return defaultProps({
    value: tags,
    ...props,
  });
}
