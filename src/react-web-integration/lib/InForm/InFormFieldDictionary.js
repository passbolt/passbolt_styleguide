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

import { SCRAPED_ATTRS } from "./ScrapingDictionary";

/**
 * CSS selector of the elements which triggers a shadow DOM re-scan.
 * @type {string}
 */
export const SHADOW_RESCAN_FIELD_SELECTOR = "input, form, [autocomplete]";

/**
 * Attributes which trigger a shadow DOM re-scan when they change.
 * @type {ReadonlyArray<string>}
 */
export const FIELD_ATTRIBUTES_TO_WATCH = Object.freeze([...new Set([...SCRAPED_ATTRS, "hidden", "style"])]);

/**
 * Attributes which can show or hide a whole subtree, so their change on a container also triggers a shadow DOM re-scan.
 * @type {ReadonlyArray<string>}
 */
export const CONTAINER_VISIBILITY_ATTRIBUTES = Object.freeze(["style", "class", "hidden", "aria-hidden"]);
