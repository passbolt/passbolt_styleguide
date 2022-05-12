/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on DisplayError in regard of specifications
 */

import DisplayBrowserNotSupportedPage from "./DisplayBrowserNotSupported.test.page";


beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should see not supported browser page", () => {
  let page; // The page to test against

  describe('As AN I should be able to be requested to download a compatible browser during the setup of my account', () => {
    /**
     * Given a AN
     * Then I should see that my browser is not supported
     */

    beforeEach(() => {
      page = new DisplayBrowserNotSupportedPage();
    });

    it('As AN I should see that my browser is not supported', () => {
      expect(page.exists()).toBeTruthy();
      // title
      expect(page.title).toBe("Sorry, your browser is not supported.");
      // message
      expect(page.message).toBe('Please download chrome or firefox to get started with passbolt.');
      // download
      expect(page.downloadFirefox).toBe('Download Firefox');
      expect(page.downloadChrome).toBe('Download Chrome');
      /*
       * link
       * expect(page.link).toBe('Why is my browser not supported?');
       */
    });
  });
});
