/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

/**
 * Unit tests on AskInFormMenuDisplay in regard of specifications
 */

import AskInFormMenuDisplayTestPage from "./AskInFormMenuDisplay.test.page";
import {contextWithAuthenticatedUser, contextWithUnauthenticatedUser} from "./AskInFormMenuDisplay.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Create Resource", () => {
  let page; // The page to test against

  describe('As a logged out user on a webpage with a form', () => {
    beforeEach(() => {
      page = new AskInFormMenuDisplayTestPage(contextWithUnauthenticatedUser);
    });

    it('I should see a grey Passbolt icon when I mouseover or focus on a username or password fields', async() => {
      expect(page.isActive).toBeFalsy();
    });
  });

  describe('As a logged in user on a webpage with a form', () => {
    beforeEach(() => {
      page = new AskInFormMenuDisplayTestPage(contextWithAuthenticatedUser);
    });

    it('I should see a grey Passbolt icon when I mouseover or focus on a username or password fields', async() => {
      expect(page.isActive).toBeTruthy();
    });
  });
});
