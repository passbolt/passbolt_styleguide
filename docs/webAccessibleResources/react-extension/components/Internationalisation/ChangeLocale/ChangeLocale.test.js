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
 * @since         3.2.0
 */

/**
 * Unit tests on ChangeLocale in regard of specifications
 */


import {defaultProps} from "./ChangeLocale.test.data";
import ChangeLocalePage from "./ChangeLocale.test.page";

beforeEach(() => {
  jest.resetModules();
});


describe("As AN I should see the current locale", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe('As AD I can see the default locale', () => {
    /**
     * When I go to the internationalisation page
     * Then I should see the language
     */
    beforeEach(() => {
      page = new ChangeLocalePage(props);
    });

    it('As a AD I should be able to see my default language in the administration internationalisation page', async() => {
      expect(page.changeLocale.exists()).toBeTruthy();
      expect(page.localeSelected).toBe("English");
    });

    it('As AN I should be able to change the locale', async() => {
      await page.selectLanguageFr();
      expect(props.context.onUpdateLocaleRequested).toHaveBeenCalledWith("fr-FR");
    });
  });
});
