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
 * @since         3.3.0
 */

/**
 * Unit tests on  InstallExtension in regard of specifications
 */

import IntroduceSetupExtensionTestPage from "./IntroduceSetupExtension.test.page";
import {defaultProps} from "./IntroduceSetupExtension.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should see setup extension page", () => {
  let page; // The page to test against
  const props = defaultProps();

  describe('As AN I should be able to see setup extension for supported browser', () => {
    /**
     * Given a AN
     * Then I should see a setup extension page
     */
    it('As AN I should see the setup extension for chrome', () => {
      Object.defineProperty(window, "navigator", {
        value: {userAgent: "Chrome"},
        writable: true
      });
      window.chrome = {runtime: "true"};
      page = new IntroduceSetupExtensionTestPage(props);
      expect(page.exists()).toBeTruthy();
      // title
      expect(page.title).toBe("Congratulation! Passbolt extension has been installed.");
      // browser image
      expect(page.browser.className).toBe("animated-setup-introduction chrome");
    });

    it('As AN I should see the setup extension for firefox', () => {
      Object.defineProperty(window, "navigator", {
        value: {userAgent: "Firefox"},
        writable: true
      });
      page = new IntroduceSetupExtensionTestPage(props);
      // browser image
      expect(page.browser.className).toBe("animated-setup-introduction firefox");
    });

    it('As AN I should be able to click next on the page', async() => {
      page = new IntroduceSetupExtensionTestPage(props);
      await page.next();
      expect(props.authenticationContext.onCompleteIntroduceSetupExtension).toHaveBeenCalled();
    });
  });
});
