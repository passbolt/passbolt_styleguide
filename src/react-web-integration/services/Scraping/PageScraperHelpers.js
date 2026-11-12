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

import { FORM_CONTROL_SELECTOR, LABEL_TEXT_STRIP_SELECTOR } from "../../lib/InForm/ScrapingDictionary";
import ShadowDomQueryService from "../ShadowDom/ShadowDomQueryService";

class PageScraperHelpers {
  /**
   * Counts the form controls inside the element, shadow DOM included.
   *
   * @param {Element} element The element to search.
   * @returns {number} The number of form controls found, the element itself excluded.
   */
  static fieldCount(element) {
    return ShadowDomQueryService.querySelectorAllDeep(element, FORM_CONTROL_SELECTOR).length;
  }

  /**
   * Returns the text content of the element (without the text of its form controls and buttons).
   * NOTE: It reads the live DOM through a range and never clones it: a clone owned by the page document
   * may load its resources (e.g. an `<img>` re-requesting a CAPTCHA) and upgrades its custom elements.
   *
   * @param {Element} element The candidate label element.
   * @returns {string} The text without form controls and buttons.
   */
  static textWithoutFields(element) {
    const fields = element.querySelectorAll(LABEL_TEXT_STRIP_SELECTOR);
    if (fields.length === 0) {
      return element.textContent;
    }

    // Concatenate the text found between the stripped controls.
    const range = element.ownerDocument.createRange();
    range.setStart(element, 0);
    let text = "";
    let previous = null;
    for (const field of fields) {
      // Fields are in document order: a control nested in an already stripped one is skipped with it.
      if (previous?.contains(field)) {
        continue;
      }
      range.setEndBefore(field);
      text += range.toString();
      range.setStartAfter(field);
      previous = field;
    }
    range.setEnd(element, element.childNodes.length);

    return text + range.toString();
  }
}

export default PageScraperHelpers;
