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

import ShadowDomQueryService from "../Dom/ShadowDom/ShadowDomQueryService";

class InFormFieldGeometryService {
  /**
   * Find the InFormCallToActionField that shares the lowest common ancestor with `field`.
   * @param {HTMLElement} element
   * @param {Array<InFormCallToActionField>} ctaFields
   * @returns {InFormCallToActionField|null}
   */
  static getFieldWithLowestCommonAncestor(element, ctaFields) {
    if (ctaFields.length === 0) {
      return null;
    }
    if (ctaFields.length === 1) {
      return ctaFields[0];
    }

    // Build a map of the depth of each ancestor of `element`
    const depthByAncestor = ShadowDomQueryService.piercingAncestors(element).reduce((acc, node, index) => {
      acc.set(node, index);
      return acc;
    }, new Map());

    // Find the `ctaField` that shares the lowest common ancestor with `element`
    let foundField = null;
    let foundFieldDepth = Infinity;
    for (const ctaField of ctaFields) {
      const commonAncestor = ShadowDomQueryService.piercingAncestors(ctaField.field).find((ancestor) =>
        depthByAncestor.has(ancestor),
      );

      if (commonAncestor) {
        const depth = depthByAncestor.get(commonAncestor);
        if (depth < foundFieldDepth) {
          foundField = ctaField;
          foundFieldDepth = depth;
        }
      }
    }

    return foundField;
  }

  /**
   * Returns the first scrollable parent of the given node.
   * @param {Node} node A DOM node
   * @return {Element|Window} The first scrollable parent of the given node
   */
  static getScrollParent(node) {
    let scrollParent = window;

    if (node?.nodeType === Node.ELEMENT_NODE) {
      // Here we know that `node` _is_ an element
      // So we get its computed style to find out if it is scrollable (ie. overflow: auto|scroll [auto|scroll])
      const style = getComputedStyle(node).getPropertyValue("overflow");
      const isScrollable = style.split(" ").every((overflow) => overflow === "auto" || overflow === "scroll");
      if (isScrollable) {
        scrollParent = node;
      } else {
        scrollParent = InFormFieldGeometryService.getScrollParent(
          ShadowDomQueryService.shadowPiercingParentElement(node),
        );
      }
    }

    return scrollParent;
  }

  /**
   * Calculate the top/left position for the CTA.
   * @param {HTMLElement} field The field on which the CTA is attached.
   * @param {ShadowRoot} shadowRoot The shadow root hosting the CTA.
   * @return {{ top: number, left: number }} The top/left position of the CTA.
   */
  static calculateFieldPosition(field, shadowRoot) {
    const { top, left, height, width } = field.getBoundingClientRect();

    // Position the CTA at the right of the field, vertically centered
    let x = left + width - 25;
    let y = top + Math.floor(height / 2) - 9;

    // If we are in an iframe, add the iframe element's own position
    const isInIframe = field.ownerDocument !== document;
    if (isInIframe) {
      const { top: frameTop, left: frameLeft } = field.ownerDocument.defaultView.frameElement.getBoundingClientRect();
      x += frameLeft;
      y += frameTop;
    }

    // If we are inside a shadow root, subtract the host element's own position
    if (shadowRoot) {
      const { top: hostTop, left: hostLeft } = shadowRoot.host.getBoundingClientRect();
      x -= hostLeft;
      y -= hostTop;
    }

    return { top: y, left: x };
  }
}

export default InFormFieldGeometryService;
