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
 * Create a `<div>` host with an open shadow root and append it to `parent`.
 * @param {Node} parent The node the host is appended to. `document.body` by default.
 * @returns {{ host: HTMLDivElement, shadowRoot: ShadowRoot }} The host and its shadow root.
 */
export function appendShadowHost(parent = document.body) {
  const host = document.createElement("div");
  const shadowRoot = host.attachShadow({ mode: "open" });
  parent.appendChild(host);
  return { host, shadowRoot };
}
