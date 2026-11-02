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

import ShadowDomQueryService from "../../services/ShadowDom/ShadowDomQueryService";
import { BUTTON_LIKE_INPUT_TYPES } from "./OrphanDictionary";

class OrphanFieldPredicates {
  /**
   * Check if an element is a button or something similar, such as an element with a role of button or a submit input.
   * @param {any} element The element to check.
   * @returns {boolean} true if the element is comparable to a button
   */
  static isButtonLike(element) {
    // `nodeType` is realm-agnostic, unlike `instanceof HTMLElement`: elements coming from a
    // same-origin iframe are built by that frame's constructors, not by ours.
    if (ShadowDomQueryService.isElement(element)) {
      if (element.tagName === "BUTTON") {
        return true;
      }

      if (element.getAttribute("role") === "button") {
        return true;
      }

      if (element.tagName === "INPUT" && BUTTON_LIKE_INPUT_TYPES.has(element.type)) {
        return true;
      }
    }

    return false;
  }
}

export default OrphanFieldPredicates;
