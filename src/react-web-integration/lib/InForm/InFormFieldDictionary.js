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
 * CSS selector for HTML elements that will trigger a shadow dom rescan.
 * @type {string}
 */
export const SHADOW_RESCAN_FIELD_SELECTOR = "input, form, [autocomplete]";

/**
 * Attributes to watch for mutation.
 * @type {Array<string>}
 */
export const FIELD_ATTRIBUTES_TO_WATCH = [
  "type",
  "name",
  "id",
  "autocomplete",
  "hidden",
  "disabled",
  "readonly",
  "placeholder",
  "aria-hidden",
  "role",
  "style",
  "class",
];
