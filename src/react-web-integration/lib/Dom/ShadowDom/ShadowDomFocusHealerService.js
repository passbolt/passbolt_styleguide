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

class ShadowDomFocusHealerService {
  /**
   * The registered handler, if any.
   * @private
   * @type {Function|null}
   */
  static _focusinHandler = null;

  /**
   * Install a global 'focusin' listener to detect focus events on elements inside potential undetected shadow roots.
   * If the listener is already installed, nothing happens.
   */
  static installFocusinHealer() {
    if (ShadowDomFocusHealerService._focusinHandler) {
      return;
    }

    ShadowDomFocusHealerService._focusinHandler = (event) => {
      const path = event.composedPath();
      if (path[0].tagName === "INPUT") {
        let invalidated = false;

        for (const node of path) {
          if (node instanceof ShadowRoot) {
            ShadowRootCacheService.invalidate(node);
            invalidated = true;
          }
        }

        if (invalidated) {
          ShadowRootCacheService.invalidate(document);
        }
      }
    };

    document.addEventListener("focusin", ShadowDomFocusHealerService._focusinHandler, { capture: true });
  }
}

export default ShadowDomFocusHealerService;
