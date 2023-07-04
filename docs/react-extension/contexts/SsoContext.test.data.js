/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */

import {defaultAppContext} from "./ExtAppContext.test.data";
import MockPort from "../test/mock/MockPort";

function mockedTranslation(string, parameters) {
  let translatedString = string;
  for (const key in parameters) {
    const val = parameters[key];
    translatedString = translatedString.replace(`{{${key}}}`, val);
  }
  return translatedString;
}

/**
 * Default context
 * @param {Object} data The props to override
 * @param {string} providerId the sso provider id configured
 * @returns {object}
 */
export function defaultProps(data = {}, providerId = null) {
  const port = new MockPort();
  port.addRequestListener("passbolt.sso.get-local-configured-provider", jest.fn(() => Promise.resolve(providerId)));
  port.addRequestListener("passbolt.sso.sign-in-with-azure", jest.fn(() => Promise.resolve()));
  port.addRequestListener("passbolt.auth.post-login-redirect", jest.fn(() => Promise.resolve()));

  const defaultAuthenticationLoginAppContext = {
    context: {
      port: port,
    },
    t: mockedTranslation
  };
  return Object.assign(defaultAppContext(defaultAuthenticationLoginAppContext), data);
}
