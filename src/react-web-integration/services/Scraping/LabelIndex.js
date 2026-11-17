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
 * @since         5.18.0
 */

/**
 * Index of the `<label for>` of each root, built once per scrape.
 * Replaces the per-field `querySelector` and `element.labels`, which both scan the whole root.
 */
class LabelIndex {
  /**
   * Default constructor
   */
  constructor() {
    /**
     * The labels by `for` value, by root.
     * @type {WeakMap<Node, Map<string, Element[]>>}
     */
    this.indexes = new WeakMap();
  }

  /**
   * Returns the first label whose `for` attribute equals the value.
   * Same result as `root.querySelector('label[for="value"]')`, without walking the whole root on each call.
   * @param {Document|ShadowRoot|Element|DocumentFragment} root The root to search in.
   * @param {string} value The `for` value.
   * @returns {Element|null} The label, or null.
   */
  labelFor(root, value) {
    return this._indexOf(root).get(value)?.[0] ?? null;
  }

  /**
   * Returns the labels of the element in tree order.
   * Same result as `element.labels`, which walks the whole tree for each element.
   * @param {Element} element The labelable element.
   * @returns {Element[]} The labels.
   */
  labelsOf(element) {
    const labels = [];
    const id = element.getAttribute("id");
    if (id) {
      const forLabels = this._indexOf(element.getRootNode()).get(id) ?? [];
      labels.push(...forLabels.filter((label) => label.control === element));
    }
    for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
      if (ancestor.nodeName === "LABEL" && !ancestor.hasAttribute("for") && ancestor.control === element) {
        labels.push(ancestor);
      }
    }
    return labels.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
  }

  /**
   * Returns the index of the root, building it on first use.
   * @private
   * @param {Document|ShadowRoot|Element|DocumentFragment} root The root.
   * @returns {Map<string, Element[]>} The labels by `for` value, in tree order.
   */
  _indexOf(root) {
    let index = this.indexes.get(root);
    if (!index) {
      index = new Map();
      for (const label of root.querySelectorAll("label[for]")) {
        const value = label.getAttribute("for");
        if (!index.has(value)) {
          index.set(value, []);
        }
        index.get(value).push(label);
      }
      this.indexes.set(root, index);
    }
    return index;
  }
}

export default LabelIndex;
