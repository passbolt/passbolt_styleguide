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

import ShadowDomQueryService from "../ShadowDom/ShadowDomQueryService";
import TextNormalizer from "../../lib/InForm/TextNormalizer";
import {
  MAX_FORM_ATTR_LENGTH,
  HEADING_TAGS,
  SECTION_TAGS,
  MAX_HEADING_ANCESTOR_HOPS,
} from "../../lib/InForm/ScrapingDictionary";
import { PSEUDO_FORM_ACTION_SELECTOR } from "../../lib/InForm/OrphanDictionary";

/**
 * Builds a {@link FormScraping} record for a container (real `<form>` or pseudo-form LCA container),
 * capturing the form-level signals that disambiguate a field: attributes, resolved action URL,
 * surrounding section headings and action-button text. Read-only and shadow-aware. `fieldTypes` is left
 * empty for the PageScraperService to fill.
 */
class FormScraper {
  /**
   * @param {Element} formElement The container element.
   * @param {string} formId The container identifier.
   * @returns {FormScraping} The assembled record.
   */
  static scrape(formElement, formId) {
    return {
      formId,
      type: formElement.nodeName.toUpperCase(),
      attributes: {
        id: FormScraper._clip(formElement.getAttribute("id")),
        name: FormScraper._clip(formElement.getAttribute("name")),
        class: FormScraper._clip(formElement.getAttribute("class")),
        action: FormScraper._actionUrl(formElement.getAttribute("action")),
        method: FormScraper._clip(formElement.getAttribute("method")).toLowerCase(),
      },
      dataFormType: FormScraper._clip(formElement.getAttribute("data-form-type")).toLowerCase(),
      ancestorHeadings: FormScraper._ancestorHeadings(formElement),
      fieldTypes: {},
      buttonText: FormScraper._buttonText(formElement),
    };
  }

  /**
   * Clip an attribute to {@link MAX_FORM_ATTR_LENGTH}. Slices on code points so an astral character at
   * the limit is not split into a lone surrogate.
   * @private
   * @param {?string} value The raw attribute value.
   * @returns {string} The clipped value, or "".
   */
  static _clip(value) {
    return Array.from(value || "")
      .slice(0, MAX_FORM_ATTR_LENGTH)
      .join("");
  }

  /**
   * Resolve `action` to a full absolute URL (keeps the cross-origin signal), or "" when missing/invalid.
   * @private
   * @param {?string} action The raw `action` attribute value.
   * @returns {string} The absolute URL, or "".
   */
  static _actionUrl(action) {
    if (!action) {
      return "";
    }
    try {
      return new URL(action, location.href).href;
    } catch {
      return "";
    }
  }

  /**
   * Section titles up the composed tree (shadow-piercing, capped at {@link MAX_HEADING_ANCESTOR_HOPS}),
   * closest first: a `<fieldset>`'s own `<legend>`, or a heading inside a {@link SECTION_TAGS} section.
   * @private
   * @param {Element} formElement The container element.
   * @returns {string[]} The normalized titles, closest ancestor first.
   */
  static _ancestorHeadings(formElement) {
    const headings = [];
    const headingSelector = HEADING_TAGS.join(",").toLowerCase();

    let current = ShadowDomQueryService.shadowPiercingParentElement(formElement);
    for (
      let hops = 0;
      ShadowDomQueryService.isElement(current) && hops < MAX_HEADING_ANCESTOR_HOPS;
      hops++, current = ShadowDomQueryService.shadowPiercingParentElement(current)
    ) {
      if (current.nodeName === "FIELDSET") {
        // Direct child only, so a nested fieldset's legend never leaks up.
        const legend = Array.from(current.children).find((child) => child.nodeName === "LEGEND");
        const text = legend && TextNormalizer.normalize(legend.textContent);
        if (text) {
          headings.push(text);
        }
      } else if (SECTION_TAGS.includes(current.nodeName)) {
        const heading = current.querySelector(headingSelector);
        const text = heading && TextNormalizer.normalize(heading.textContent);
        if (text) {
          headings.push(text);
        }
      }
    }

    return headings;
  }

  /**
   * Tokenized text of the container's action buttons (login/registration signal), shadow-piercing.
   * @private
   * @param {Element} formElement The container element.
   * @returns {string} The space-joined tokenized button text, or "".
   */
  static _buttonText(formElement) {
    const buttons = ShadowDomQueryService.querySelectorAllDeep(formElement, PSEUDO_FORM_ACTION_SELECTOR);
    const parts = [];

    for (const button of buttons) {
      const tokens = TextNormalizer.tokenize(`${button.getAttribute("value") || ""} ${button.textContent || ""}`);
      if (tokens) {
        parts.push(tokens);
      }
    }

    return parts.join(" ");
  }
}

export default FormScraper;
