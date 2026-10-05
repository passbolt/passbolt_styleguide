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

import { CUSTOM_FORM_CONTAINERS, FORM_LIKE_CONTAINERS } from "../../lib/InForm/OrphanDictionary";
import ShadowDomQueryService from "../ShadowDom/ShadowDomQueryService";

class NestedFormExtractionService {
  /**
   * Find the 'form-like' containers nested inside the `container`, through shadow dom boundaries.
   * @param {Document|ShadowRoot|Element} container The container to search in.
   * @returns {Array<Element>} The nested 'form-like' containers.
   */
  static captureNestedForms(container) {
    return ShadowDomQueryService.querySelectorAllDeep(container, FORM_LIKE_CONTAINERS);
  }

  /**
   * Check if any nested form (not masked by another element) contains the field.
   * This method is intended to be used to determine if the field is owned by the deepest form container.
   * @param {Element} fieldElement The field to check.
   * @param {Array<Element>} nestedForms The nested forms of the base container.
   * @returns {boolean} false if an unmasked nested form contains the field.
   */
  static isDeepestFormContainer(fieldElement, nestedForms) {
    for (const nestedForm of nestedForms) {
      const contains = ShadowDomQueryService.containsDeep(nestedForm, fieldElement);

      if (contains) {
        const masked = ShadowDomQueryService.hasAncestorMatchingDeep(nestedForm, CUSTOM_FORM_CONTAINERS);

        if (!masked) {
          return false;
        }
      }
    }

    return true;
  }
}

export default NestedFormExtractionService;
