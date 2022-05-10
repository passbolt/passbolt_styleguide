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
 * @since         3.6.0
 */
import {defaultProps} from "./DisplayAlreadyLoggedInError.test.data";
import DisplayAlreadyLoggedInErrorPage from "./DisplayAlreadyLoggedInError.test.page";
import {DisplayAlreadyLoggedInErrorVariations} from './DisplayAlreadyLoggedInError';
import each from "jest-each";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayAlreadyLoggedInError", () => {
  each([
    {displayAs: DisplayAlreadyLoggedInErrorVariations.SETUP}, // Login
    {displayAs: DisplayAlreadyLoggedInErrorVariations.RECOVER}, // recover account
    {displayAs: DisplayAlreadyLoggedInErrorVariations.ACCOUNT_RECOVERY}, // account recovery
  ]).describe("Common behavior to all context", _props => {
    it(`As LU I should be able to log out. Scenario: ${_props.displayAs}`, async() => {
      const props = defaultProps(_props);
      const page = new DisplayAlreadyLoggedInErrorPage(props);

      expect.assertions(3);
      expect(page.title).toBe("Cannot perform the action while being logged in");
      expect(page.description).not.toBeNull();
      await page.logout();
      expect(props.onLogoutButtonClick).toHaveBeenCalledTimes(1);
    });
  });
});
