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

import browser from "webextension-polyfill";
import { SHADOW_ROOT_CANDIDATE_NODE_NAMES } from "./ShadowDomDictionary";

class ShadowRootResolverService {
  /**
   * Resolve the shadow root of the given element.
   * @param {Element} element The element to resolve the shadow root from.
   * @return {ShadowRoot?} The shadow root of the given element, or null if it doesn't have one.
   */
  static resolveShadowRoot(element) {
    // Author-attached *open* shadow root
    if (element.shadowRoot) {
      return element.shadowRoot;
    }

    // We only consider elements that are likely to host a shadow root: either elements allowed to attach one,
    // or custom elements (including a dash [`-`] character).
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#elements_you_can_attach_a_shadow_to
    const tag = element.nodeName;
    const canHostShadowRoot =
      SHADOW_ROOT_CANDIDATE_NODE_NAMES.has(tag) || (element instanceof HTMLElement && tag.includes("-"));
    if (!canHostShadowRoot) {
      return null;
    }

    // `openOrClosedShadowRoot` property is only available on Firefox.
    // @see Refer to compatibility table here: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/dom/openOrClosedShadowRoot#browser_compatibility
    if (element.openOrClosedShadowRoot) {
      return element.openOrClosedShadowRoot;
    }

    // Otherwise fall back to the extension API to get the closed shadow root (chromium browsers).
    try {
      if (browser?.dom?.openOrClosedShadowRoot) {
        return browser.dom.openOrClosedShadowRoot(element);
      }
    } catch (error) {
      console.warn("ShadowRootResolverService.resolveShadowRoot threw on element", element, error);
    }

    return null;
  }
}

export default ShadowRootResolverService;
