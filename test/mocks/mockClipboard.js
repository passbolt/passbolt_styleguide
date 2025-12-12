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
 * @since         4.6.0
 */

/**
 * Mock for clipboard.
 * It is made to be used only under JEST processes
 */
class MockedClipboard {
  constructor() {
    this.writeText = jest.fn().mockImplementation(this.writeText.bind(this));
    this.readText = jest.fn().mockImplementation(this.readText.bind(this));
    this.data = '';
  }

  writeText(data) {
    this.data = data;
  }

  readText() {
    document.activeElement.value = this.data;
  }
}

let originalClipboard;

beforeEach(() => {
  originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

  // Replace clipboard with mock
  Object.defineProperty(navigator, 'clipboard', {
    value: new MockedClipboard(),
    configurable: true,
  });
});

afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', originalClipboard || { configurable: true, value: undefined});
});
