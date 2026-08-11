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
   * Count the form controls nested inside a candidate element, piercing shadow DOM.
   *
   * Used as a structural gatekeeper while inferring a field's label: an ancestor that wraps more than
   * one control is too broad to name a single field, so the scraping cascade can reject it and enforce
   * a 1:1 label-to-field mapping. Read-only.
   *
   * @param {Element} element The candidate element whose form-control descendants are counted.
   * @returns {number} The number of {@link FORM_CONTROL_SELECTOR} descendants (self excluded).
   */
  static fieldCount(element) {
    return ShadowDomQueryService.querySelectorAllDeep(element, FORM_CONTROL_SELECTOR).length;
  }

  /**
   * Read a candidate label element's text with the text/values of its nested form controls and buttons
   * stripped out.
   *
   * Reading a wrapper's raw `textContent` echoes the field's own value back as its label (e.g. the typed
   * email instead of "Email"). This isolates the surrounding label text by deep-cloning the element's
   * light DOM and removing the controls from the detached copy, so the live page is never mutated.
   *
   * Operates on the light DOM only: `cloneNode(true)` does not clone shadow roots, so controls slotted
   * from a shadow tree are out of scope here.
   *
   * @param {Element} element The candidate label element to read.
   * @returns {string} The element's text without its form-control and button descendants.
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
