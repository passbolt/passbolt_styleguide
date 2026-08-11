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

/**
 * Prefix for identifiers issued for scraped fields (e.g. `field_0`).
 * @type {string}
 */
export const FIELD_ID_PREFIX = "field";

/**
 * Prefix for identifiers issued for scraped form containers (e.g. `form_1`).
 * @type {string}
 */
export const FORM_ID_PREFIX = "form";

/**
 * In-memory, zero-pollution registry binding live DOM elements to stable string identifiers, so a
 * scraped field can be mapped back to its exact DOM node across the (string-only) extension message
 * boundary without ever mutating the host page. A forward WeakMap and a reverse id → WeakRef Map
 * both stay weak, so removed nodes can be garbage collected; {@link elementFor} lazily purges stale
 * entries to avoid leaks on long-lived SPAs.
 */
class ScrapingIdentityService {
  /**
   * Forward Element → id registry. Weak so tracking never blocks garbage collection of a node the
   * host page has removed.
   * @private
   * @type {WeakMap<Element, string>}
   */
  static _idByElement = new WeakMap();

  /**
   * Reverse id → WeakRef<Element> registry, used to resolve a serialized id back to its node during
   * the fill phase. Stale entries are purged lazily by {@link elementFor}.
   * @private
   * @type {Map<string, WeakRef<Element>>}
   */
  static _elementById = new Map();

  /**
   * Monotonic counter guaranteeing unique ids across the whole registry, regardless of prefix.
   * @private
   * @type {number}
   */
  static _seq = 0;

  /**
   * Read-or-create: return the id already bound to `element`, or issue a new `${prefix}_${seq}` one
   * and register it in both directions. Rescanning the same element returns its existing id, so an
   * element keeps a single stable identity across re-scrapes. Never mutates the element.
   *
   * @param {?Node} element The element to identify. Non-element nodes resolve to `null` (no throw).
   * @param {string} prefix The contextual prefix for a freshly issued id (see {@link fieldId} /
   *   {@link formId}). Ignored when `element` already has an id.
   * @returns {?string} The stable id, or `null` when `element` is not an element node.
   */
  static idFor(element, prefix) {
    // Non-element nodes cannot be reliably tracked (and are never scraped as fields/forms).
    // `nodeType` is realm-agnostic, unlike `instanceof Element`; optional chaining covers null.
    if (element?.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const existing = ScrapingIdentityService._idByElement.get(element);
    if (existing !== undefined) {
      return existing;
    }

    const id = `${prefix}_${ScrapingIdentityService._seq++}`;
    ScrapingIdentityService._idByElement.set(element, id);
    ScrapingIdentityService._elementById.set(id, new WeakRef(element));

    return id;
  }

  /**
   * Resolve a serialized id back to its live element for the fill phase.
   *
   * Strict on staleness: an entry is valid only if its WeakRef target is still alive (`deref()` is
   * not `undefined`) and still attached to the active DOM (`isConnected`). On either failure the
   * entry is deleted from `_elementById` and `null` is returned, so a detached/collected node — a
   * common SPA occurrence — neither resolves nor lingers in the map.
   *
   * @param {string} id The identifier previously issued by {@link idFor}.
   * @returns {?Element} The live, connected element, or `null` when unknown, collected or detached.
   */
  static elementFor(id) {
    const ref = ScrapingIdentityService._elementById.get(id);
    if (ref === undefined) {
      return null;
    }

    const element = ref.deref();
    if (element === undefined || !element.isConnected) {
      ScrapingIdentityService._elementById.delete(id);
      return null;
    }

    return element;
  }

  /**
   * Issue (or return the cached) identifier for a scraped field, prefixed `field_`.
   * @param {?Node} element The field element.
   * @returns {?string} The field id, or `null` when `element` is not an element node.
   */
  static fieldId(element) {
    return ScrapingIdentityService.idFor(element, FIELD_ID_PREFIX);
  }

  /**
   * Issue (or return the cached) identifier for a scraped form container, prefixed `form_`.
   * @param {?Node} element The form container element.
   * @returns {?string} The form id, or `null` when `element` is not an element node.
   */
  static formId(element) {
    return ScrapingIdentityService.idFor(element, FORM_ID_PREFIX);
  }
}

export default ScrapingIdentityService;
