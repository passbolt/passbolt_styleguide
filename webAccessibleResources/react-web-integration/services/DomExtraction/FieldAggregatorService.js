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
import ElementVisibilityService from "./ElementVisibilityService";
import NestedFormExtractionService from "./NestedFormExtractionService";
import { TEXT_FIELDS } from "../../lib/InForm/OrphanDictionary";

/**
 * Populates `fields[]` uniformly for every container — real <form>s and pseudo-forms alike — by
 * re-scanning each one for its fillable fields ({@link TEXT_FIELDS}, visible), annotating nested
 * ownership, then purging empty containers. Keeping this structural (which fields exist) independent
 * from classification (what role each field plays, done downstream) ensures a field is never dropped
 * just because the CTA classifier didn't recognize it.
 *
 * `fields[]` = FILLABLE fields only — never buttons (a button is never an autofill target).
 */
class FieldAggregatorService {
  /**
   * Fillable candidates of a container: TEXT_FIELDS (text-category inputs), shadow-piercing, kept iff
   * an element AND visible. No buttons, no select/textarea, no contenteditable. The element test uses
   * `nodeType` (not `instanceof HTMLElement`) so fields living in a same-origin iframe — a different
   * realm whose HTMLElement is a distinct constructor — are not wrongly dropped.
   * @param {Element} containerElement The container to scan.
   * @returns {Element[]} The visible fillable fields.
   */
  static gatherCandidates(containerElement) {
    return ShadowDomQueryService.querySelectorAllDeep(containerElement, TEXT_FIELDS).filter(
      (element) => ShadowDomQueryService.isElement(element) && ElementVisibilityService.isElementViewable(element),
    );
  }

  /**
   * Populate `fields[]` of every container record with `{ fieldElement, deepestFormContainer }`
   * (replacing whatever seed/skeleton fields it carried), then purge containers left with no field.
   * @param {Array<{containerElement: Element, fields: Array<{ fieldElement: HTMLElement }>}>} formElements The container records.
   * @returns {Array<{containerElement: Element, fields: Array<{ fieldElement: HTMLElement }>}>} The same records, filtered to containers with ≥ 1 fillable visible field.
   */
  static aggregateFields(formElements) {
    for (const form of formElements) {
      const nestedForms = NestedFormExtractionService.captureNestedForms(form.containerElement); // one-shot
      const candidates = FieldAggregatorService.gatherCandidates(form.containerElement);

      form.fields = candidates.reduce((acc, fieldElement) => {
        if (NestedFormExtractionService.isDeepestFormContainer(fieldElement, nestedForms)) {
          acc.push({ fieldElement });
        }

        return acc;
      }, []);
    }

    return formElements.filter((form) => form.fields.length !== 0); // purge empty containers
  }
}

export default FieldAggregatorService;
