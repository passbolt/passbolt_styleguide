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
 * @since         5.14.0
 */

import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";

export function defaultProps(props = {}) {
  const context = defaultAppContext();
  const routes = { "passbolt.fido2-pin.is-set": props.pinSet || false, ...(props.routes || {}) };
  jest.spyOn(context.port, "request").mockImplementation((event, ...args) => {
    const route = routes[event];
    return Promise.resolve(typeof route === "function" ? route(...args) : route);
  });
  return { context };
}
