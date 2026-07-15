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
    // Directly get the shadowRoot if we have access to it
    // `openOrClosedShadowRoot` is only available on Firefox
    // @see Refer to compatibility table here: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/dom/openOrClosedShadowRoot#browser_compatibility
    let shadowRoot = element.shadowRoot ?? element.openOrClosedShadowRoot;

    // If the shadow root is not accessible directly, we try to use the extension API to get it (chromium browsers)
    if (!shadowRoot) {
      const tag = element.nodeName;

      // We only consider elements that are likely to have a shadow root
      if (SHADOW_ROOT_CANDIDATE_NODE_NAMES.has(tag) || tag.includes("-")) {
        try {
          if (browser?.dom?.openOrClosedShadowRoot) {
            shadowRoot = browser.dom.openOrClosedShadowRoot(element);
          }
        } catch (error) {
          console.warn("ShadowRootResolverService.resolveShadowRoot threw on element", element, error);
        }
      }
    }

    return shadowRoot ?? null;
  }
}

export default ShadowRootResolverService;
