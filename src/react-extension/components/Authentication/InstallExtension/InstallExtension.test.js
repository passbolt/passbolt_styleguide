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
 * Unit tests on  InstallExtension in regard of specifications
 */

import InstallExtensionPage from "./InstallExtensionPage";
import {defaultProps} from "./InstallExtension.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should see install extension page", () => {
  let page; // The page to test against
  const props = defaultProps();

  describe('As AN I should be able to be requested to download the extension during the setup of my account', () => {
    /**
     * Given a AN
     * Then I should see an install extension page
     */
    it('As AN I should see the install extension for an unsupported browser', () => {
      page = new InstallExtensionPage(props);
      // browser image
      expect(page.browser.className).toBe("browser-webstore unknown");
    });

    it('As AN I should see the install extension for firefox', () => {
      Object.defineProperty(window, "navigator", {
        value: {userAgent: "Firefox"},
        writable: true
      });
      page = new InstallExtensionPage();
      // browser image
      expect(page.browser.className).toBe("browser-webstore firefox");
    });

    it('As AN I should see the install extension for chrome', () => {
      Object.defineProperty(window, "navigator", {
        value: {userAgent: "Chrome"},
        writable: true
      });
      window.chrome = {runtime: "true"};
      page = new InstallExtensionPage();
      expect(page.exists()).toBeTruthy();
      // title
      expect(page.title).toBe("Please install the browser extension.");
      // browser image
      expect(page.browser.className).toBe("browser-webstore chrome");
      // message
      expect(page.message).toBe('Please download the browser extension and refresh this page to continue.');
      // download
      expect(page.download).toBe('Download extension');
      // link
      expect(page.linkContent).toBe('Refresh to detect extension');
    });

    it('As AN I should be able to refresh the page', async() => {
      Object.defineProperty(window, "location", {
        value: {reload: jest.fn()},
      });
      page = new InstallExtensionPage();
      await page.refresh();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
