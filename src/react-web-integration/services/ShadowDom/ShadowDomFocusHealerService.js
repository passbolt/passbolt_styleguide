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

  // Light-DOM heal: re-scan once for a focused input with no call-to-action yet (e.g. a field revealed in a non-<dialog> modal).
  const isFieldTracked = ShadowDomFocusHealerService._isFieldTracked;
  if (isFieldTracked && !isFieldTracked(target) && !ShadowDomFocusHealerService._healAttempted.has(target)) {
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
   * Predicate telling whether a focused input is already backed by a call-to-action, provided by the
   * in-form manager. Null when no manager wired it, in which case the light-DOM heal stays off.
   * @private
   * @type {?function(HTMLElement): boolean}
   */
  static _isFieldTracked = null;

  /**
   * Light-DOM inputs already offered a heal re-scan since the last field-affecting DOM change. Weak
   * so entries drop when the input leaves the DOM; reset wholesale by resetHealAttempts.
   * @private
   * @type {WeakSet<HTMLElement>}
   */
  static _healAttempted = new WeakSet();

  /**
   * Install a global 'focusin' listener to detect focus events on elements inside potentially undetected shadow roots,
   * and to heal light-DOM fields injected after the last scan (e.g. login forms in non-<dialog> modals).
   * If the listener is already installed, only the tracked-field predicate is refreshed.
   * Shadow roots can be undetected if they are created after the page load.
   * @param {?function(HTMLElement): boolean} [isFieldTracked] Predicate telling whether an input already has a call-to-action.
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
   * Reset the per-input light-DOM heal attempts. Call on a field-affecting DOM change so inputs that
   * were not credentials at their last focus get another chance once the DOM changes around them.
   */
  static resetHealAttempts() {
    ShadowDomFocusHealerService._healAttempted = new WeakSet();
  }
}

export default ShadowDomFocusHealerService;
