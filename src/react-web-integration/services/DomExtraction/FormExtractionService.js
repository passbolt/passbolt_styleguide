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

import {
  FORM_LIKE_CONTAINERS,
  CUSTOM_FORM_CONTAINERS,
  TEXT_FIELDS,
  MAX_FIELDS_PER_CONTAINER,
} from "../../lib/InForm/OrphanDictionary";
import ShadowDomQueryService from "../ShadowDom/ShadowDomQueryService";
import ElementVisibilityService from "./ElementVisibilityService";

class FormExtractionService {
  /**
   * Link a container to its fields/
   * @param {Element} containerElement The container.
   * @param {Array<{ element: Element, isViewable: boolean }>} [fields] The container's text fields.
   * @returns {{ containerElement: Element, fields: Array<{ element: Element, isViewable: boolean }>, isPseudoForm: boolean }} The record.
   */
  static _toSkeleton(containerElement, fields = []) {
    return { containerElement, fields, isPseudoForm: false };
  }

  /**
   * Find form containers and their fields across the whole DOM, including shadow DOM.
   * @returns {Array<{ containerElement: Element, fields: Array<{ element: Element, isViewable: boolean }>, isPseudoForm: boolean }>} The found form containers.
   */
  static aggregateForms() {
    const formElements = [];
    const candidates = ShadowDomQueryService.querySelectorAllDeep(document, FORM_LIKE_CONTAINERS);

    for (const candidate of candidates) {
      if (!ShadowDomQueryService.hasAncestorMatchingDeep(candidate, CUSTOM_FORM_CONTAINERS)) {
        const fields = ShadowDomQueryService.querySelectorAllDeep(candidate, TEXT_FIELDS).map((element) => ({
          element,
          isViewable: ElementVisibilityService.isElementViewable(element),
        }));

        const hasViewableFields = fields.some((field) => field.isViewable);
        if (hasViewableFields && fields.length < MAX_FIELDS_PER_CONTAINER) {
          formElements.push(FormExtractionService._toSkeleton(candidate, fields));
        }
      }
    }

    return formElements;
  }
}

export default FormExtractionService;
