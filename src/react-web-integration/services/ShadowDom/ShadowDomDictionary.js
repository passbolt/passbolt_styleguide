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
 * @since         5.15.0
 */

/**
 * HTML elements that may host a shadow root according to the HTML specs.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to
 * @type {Set<string>}
 */
export const SHADOW_ROOT_CANDIDATE_NODE_NAMES = new Set([
  "ARTICLE",
  "ASIDE",
  "BLOCKQUOTE",
  "BODY",
  "DIV",
  "FOOTER",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "HEADER",
  "MAIN",
  "NAV",
  "P",
  "SECTION",
  "SPAN",
]);

/**
 * HTML elements in this list (and their descendants) can't host a shadow root.
 * NOTE: svg and math are lowercase
 * @type {ReadonlySet<string>}
 */
export const IGNORED_SUBTREES = new Set(["svg", "math", "SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]);

/**
 * Maximum depth for shadow dom piercing.
 * @type {number}
 */
export const MAX_PIERCE_DEPTH = 100;
