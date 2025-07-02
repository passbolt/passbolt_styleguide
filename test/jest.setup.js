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
 * @since         3.0.0
 */
import "./mocks/mockCrypto";
import "./mocks/mockTextEncoder";
import "./matchers/extendExpect";

/*
 * Disable console debug, warning and error while executing the tests.
 * Keep console log as it can be useful for testing.
 */
global.console = {
  ...console,
  debug: jest.fn(),
  error: jest.fn(),
  warning: jest.fn()
};

global.scrollTo = jest.fn();

global.structuredClone = obj => JSON.parse(JSON.stringify(obj));

/*
 * Fix jest-webextension-mock after upgrading webextension-polyfill to 0.9.0
 * @see https://github.com/clarkbw/jest-webextension-mock/issues/149#issuecomment-1116558554
 */
chrome.runtime.id = "test id";

browser.cookies = {
  ...browser.cookies,
  get: jest.fn().mockImplementation(async options => {
    if (options.name === "csrfToken") {
      return "csrfToken";
    }
    return null;
  }),
};
