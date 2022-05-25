/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

/**
 * Some DOM utils
 */
class DomUtils {
  static getAccessibleAndSameDomainIframes() {
    return Array.prototype.filter.call(document.querySelectorAll("iframe"), iframe => {
      const contentDocument = DomUtils.getAccessedIframeContentDocument(iframe);
      return contentDocument && DomUtils.isRequestInitiatedFromSameOrigin(window.location.href, contentDocument.location.href);
    });
  }

  /**
   * Returns an accessible iframe document in the page
   * @param {DomElement} iframe found on the page
   * @return {DomElement} iframe document
   */
  static getAccessedIframeContentDocument(iframe) {
    let iframeContentDocument = null;
    try {
      iframeContentDocument = iframe.contentDocument;
    } catch (error) {
      console.error(error);
    }
    return iframeContentDocument;
  }


  /**
   * Check the requested document, top document and an iframe form is initiated from same domain.
   *
   * @param {string} requestedUrl The requested document url
   * @param {string} documentUrl The current active document url
   * @return {Boolean} true
   */
  static isRequestInitiatedFromSameOrigin(requestedUrl, documentUrl) {
    // requestedUrl - from quickaccess
    const parsedRequestedUrl = new URL(requestedUrl);
    // Request initiated document origin
    const requestedOrigin = parsedRequestedUrl.origin;
    // documentUrl - from current active page
    const parsedDocumentUrl = new URL(documentUrl);
    // Top level document/an iframe document origin
    const documentOrigin = parsedDocumentUrl.origin;

    // Requested document and top/iframe document origin is same
    return requestedOrigin === documentOrigin;
  }

  /**
   * Returns the first scrollable parent of the given node
   * @param node A Dom node
   */
  static getScrollParent(node) {
    const regex = /(auto|scroll)/;

    const style = (node, prop) =>
      getComputedStyle(node, null).getPropertyValue(prop);

    const isScrollable = node =>
      regex.test(
        style(node, "overflow") +
        style(node, "overflow-y") +
        style(node, "overflow-x"));

    const scrollParent = node => {
      // if node or node = document.body or node type is element node (ex: for iframe node type = document)
      if (!node || node === document.body || node.nodeType !== Node.ELEMENT_NODE) {
        return window;
      } else if (isScrollable(node)) {
        return node;
      } else {
        return scrollParent(node.parentNode);
      }
    };
    return scrollParent(node);
  }

  /**
   * Get the inFormCalToActionField with the lowest common ancestor of the callToActionClickedField
   * @param {HTMLElement} callToActionClickedField
   * @param {Array<InFormCallToActionField>} fields
   * @returns {null|InFormCallToActionField}
   */
  static getFieldWithLowestCommonAncestor(callToActionClickedField, fields) {
    if (fields.length === 0) {
      return null;
    } else if (fields.length === 1) {
      return fields[0];
    } else {
      let parent = callToActionClickedField;
      let field = null;
      // We loop to find the field with the lowest common ancestors
      while (parent && field === null) {
        parent = parent.offsetParent || parent.parentElement;
        field = fields.find(callToActionField => parent.contains(callToActionField.field));
      }
      return field;
    }
  }
}

export default DomUtils;
