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
 * @since         5.0.0
 */
import React from "react";
import { createPortal } from "react-dom";

/**
 * Create a portal in a "safe" mode.
 * "Safe" mode only means that if the given HTML element doesn't exist, the method doesn't crash.
 * It will simply ignore the rendering if it happens.
 * @param {ReactNode} children the elements to render in the portal
 * @param {Element | DocumentFragment} domNode the target where to render the children.
 * @param {null | string} [key] a React compatible key to be passed to `createPortal` if any
 * @returns {JSX}
 */
export function createSafePortal(children, domNode, key) {
  return <>{domNode && createPortal(children, domNode, key)}</>;
}
