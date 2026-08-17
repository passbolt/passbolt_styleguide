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

import { SCRAPED_ATTRS } from "../../lib/InForm/ScrapingDictionary";

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

/**
 * Attributes to watch for changes in the DOM.
 *
 * Derived from `SCRAPED_ATTRS` (the single source of truth for what the scraper reads) so it stays a
 * superset by construction: a `MutationObserver` only emits attribute records for names in this
 * `attributeFilter`, so any scraped attribute missing here would silently leave a stale cache (see
 * `PageScraperService._onMutation`). `hidden` and `style` are the only extra visibility-only signals, watched
 * for `InFormManager` and never scraped.
 */
const FIELD_ATTRIBUTES_TO_WATCH = [...SCRAPED_ATTRS, "hidden", "style"];

/**
 * MutationObserver options.
 * @type {MutationObserverInit}
 */
export const OBSERVE_OPTIONS = {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: FIELD_ATTRIBUTES_TO_WATCH,
  attributeOldValue: false,
  // Watched so an in-place text rewrite of a label / heading / button (which re-elects the label of the
  // fields it describes) still emits a record; `PageScraperService._onMutation` scopes the resulting
  // invalidation to the enclosing form, so unrelated page text does not trigger needless re-scrapes.
  characterData: true,
};
