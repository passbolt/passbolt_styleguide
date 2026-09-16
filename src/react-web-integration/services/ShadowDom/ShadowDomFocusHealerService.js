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

import ShadowRootCacheService from "./ShadowRootCacheService";
import ShadowMutationObserverService from "./ShadowMutationObserverService";
import ShadowDomQueryService from "./ShadowDomQueryService";

/**
 * The handler triggered when an element is focused to detect focus events on elements inside potentially undetected shadow roots.
 * @param {FocusEvent} event
 */
const focusHandler = (event) => {
  const path = event.composedPath();
  const [target] = path;

  if (target.tagName !== "INPUT") {
    return;
  }

  let invalidated = false;

  for (const node of path) {
    if (ShadowDomQueryService.isShadowRoot(node)) {
      const parentScope = ShadowDomQueryService.scopeRoot(node.host);
      const cachedParentRoots = ShadowRootCacheService.peekCache(parentScope);
      const isKnown = cachedParentRoots?.includes(node) ?? false;
      if (!isKnown) {
        ShadowRootCacheService.invalidate(parentScope);
        invalidated = true;
      }
    }
  }

  if (invalidated) {
    ShadowMutationObserverService.notifyShadowMutationSubscribers(document, [], true);
    return;
  }

  // Re-scan the DOM once for a focused input with no CTA yet
  const isFieldTracked = ShadowDomFocusHealerService._isFieldTracked;
  if (
    typeof isFieldTracked === "function" &&
    !isFieldTracked(target) &&
    !ShadowDomFocusHealerService._healAttempted.has(target)
  ) {
    ShadowDomFocusHealerService._healAttempted.add(target);
    ShadowMutationObserverService.notifyShadowMutationSubscribers(document, [], true);
  }
};

class ShadowDomFocusHealerService {
  /**
   * The registered handler, if any.
   * @private
   * @type {Function|null}
   */
  static _focusinHandler = null;

  /**
   * Function telling whether a focused input already has a CTA.
   * Null when no manager wired it, in which case the DOM heal will be disabled.
   * @private
   * @type {function(HTMLElement): boolean}
   */
  static _isFieldTracked = null;

  /**
   * DOM inputs we did re-scan from since the last field-affecting DOM change.
   * We use a WeakMap so entries drop when the input are removed from the DOM.
   * @private
   * @type {WeakSet<HTMLElement>}
   */
  static _healAttempted = new WeakSet();

  /**
   * Install a global 'focusin' listener to elements focused inside undetected shadow roots or fields injected after the last scan.
   * @param {function(HTMLElement): boolean} [isFieldTracked] Function telling whether an input already has a CTA
   * @see https://github.com/WICG/webcomponents/issues/390
   */
  static installFocusinHealer(isFieldTracked = null) {
    ShadowDomFocusHealerService._isFieldTracked = isFieldTracked;

    if (ShadowDomFocusHealerService._focusinHandler) {
      return;
    }

    ShadowDomFocusHealerService._focusinHandler = focusHandler;
    document.addEventListener("focusin", focusHandler, { capture: true });
  }

  /**
   * Removes the focusin listener and forgets the tracked-field callback.
   */
  static uninstallFocusinHealer() {
    if (ShadowDomFocusHealerService._focusinHandler) {
      document.removeEventListener("focusin", ShadowDomFocusHealerService._focusinHandler, { capture: true });
    }
    ShadowDomFocusHealerService._focusinHandler = null;
    ShadowDomFocusHealerService._isFieldTracked = null;
  }

  /**
   * Reset re-scanned inputs.
   * Inputs that were not credentials when last focused get another chance once the DOM changes around them.
   */
  static resetHealAttempts() {
    ShadowDomFocusHealerService._healAttempted = new WeakSet();
  }
}

export default ShadowDomFocusHealerService;
