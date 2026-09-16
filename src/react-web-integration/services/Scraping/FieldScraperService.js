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

import ScrapingIdentityService from "./ScrapingIdentityService";
import ScrapingCacheService from "./ScrapingCacheService";
import LabelScraperService from "./LabelScraperService";
import { MAX_SCRAPED_STRING_LENGTH, AUTOCOMPLETE_ATTRS, OPT_OUT_ATTRS } from "../../lib/InForm/ScrapingDictionary";

/**
 * Builds the `FieldScraping` record of a field without ever reading its value.
 */
class FieldScraperService {
  /**
   * Builds the `FieldScraping` record of a field, then enriches it with its label and ARIA state.
   *
   * @param {Element} element The field element.
   * @param {string} formId The id of the container.
   * @returns {FieldScraping} The record, without the element.
   */
  static build(element, formId) {
    const tagName = element.nodeName.toUpperCase();
    // Only `input` has a type
    const type = tagName === "INPUT" ? (element.type || "text").toLowerCase() : "";

    const record = {
      // The element is only kept for LabelScraperService.enrich and removed below.
      element,
      fieldId: ScrapingIdentityService.fieldId(element),
      formId,
      tagName,
      type,
      attributes: {
        id: FieldScraperService._clip(element.id),
        name: FieldScraperService._clip(element.getAttribute("name")),
        class: FieldScraperService._clip(element.getAttribute("class")),
        autocomplete: FieldScraperService._clip(element.getAttribute("autocomplete")),
        pattern: FieldScraperService._clip(element.getAttribute("pattern")),
        maxLength: element.maxLength > 0 ? element.maxLength : null,
        inputMode: FieldScraperService._clip(element.getAttribute("inputmode")),
        role: FieldScraperService._clip(element.getAttribute("role")),
        required: element.hasAttribute("required"),
        readonly: element.hasAttribute("readonly"),
        disabled: element.disabled === true || element.hasAttribute("disabled"),
        tabIndex: element.tabIndex,
      },
      inputDescription: {
        placeholder: FieldScraperService._clip(element.getAttribute("placeholder")),
        ariaLabel: FieldScraperService._clip(element.getAttribute("aria-label")),
        ariaLabelledby: FieldScraperService._clip(element.getAttribute("aria-labelledby")),
        ariaDescribedby: FieldScraperService._clip(element.getAttribute("aria-describedby")),
        ariaDetails: FieldScraperService._clip(element.getAttribute("aria-details")),
        title: FieldScraperService._clip(element.getAttribute("title")),
        alt: FieldScraperService._clip(element.getAttribute("alt")),
        innerText: FieldScraperService._clip(element.textContent),
      },
      dataFormType: FieldScraperService._clip(element.getAttribute("data-form-type")).toLowerCase(),
      // First autocomplete attribute found, lowercased.
      autoComplete: FieldScraperService._autoComplete(element),
      // Vendor "do not autofill" markers; autocomplete=off is ignored.
      optOut: FieldScraperService._optOut(element),
    };

    LabelScraperService.enrich(record);

    // Remove the element so the cache does not keep the node alive.
    delete record.element;

    return record;
  }

  /**
   * Returns the record from the cache, or builds and caches it when the field is new or has moved to another form.
   *
   * @param {Element} element The field element.
   * @param {string} formId The id of the container the field is in.
   * @returns {FieldScraping} The record.
   */
  static scrape(element, formId) {
    const cached = ScrapingCacheService.getField(element);
    if (cached && cached.formId === formId) {
      return cached;
    }

    return ScrapingCacheService.setField(element, FieldScraperService.build(element, formId));
  }

  /**
   * Casts the value to a string and cuts it at `MAX_SCRAPED_STRING_LENGTH`.
   * @private
   * @param {*} value The raw value (null-safe).
   * @returns {string} The clipped string, or "" when null.
   */
  static _clip(value) {
    return value == null ? "" : String(value).slice(0, MAX_SCRAPED_STRING_LENGTH);
  }

  /**
   * Returns the first autocomplete attribute found, trimmed and lowercased.
   * @private
   * @param {Element} element The field element.
   * @returns {string} The autocomplete value, or "".
   */
  static _autoComplete(element) {
    const raw = AUTOCOMPLETE_ATTRS.map((attr) => element.getAttribute(attr)).find(Boolean);
    return (raw || "").trim().toLowerCase();
  }

  /**
   * Returns true when the field has a vendor attribute asking password managers not to autofill it.
   * @private
   * @param {Element} element The field element.
   * @returns {boolean} true when at least one opt-out attribute is present.
   */
  static _optOut(element) {
    return OPT_OUT_ATTRS.some((attr) => element.hasAttribute(attr));
  }
}

export default FieldScraperService;
