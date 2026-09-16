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

import { FORM_CONTROL_SELECTOR } from "../../lib/InForm/ScrapingDictionary";
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
   * NOTE: It is working on a clone so the DOM is not changed.
   *
   * @param {Element} element The candidate label element.
   * @returns {string} The text without form controls and buttons.
   */
  static textWithoutFields(element) {
    const clone = element.cloneNode(true);

    const fields = clone.querySelectorAll(`${FORM_CONTROL_SELECTOR}, button`);
    for (const field of fields) {
      field.remove();
    }

    return clone.textContent;
  }
}

export default PageScraperHelpers;
