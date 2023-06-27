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
 * Unit tests on CheckMailBox in regard of specifications
 */

import CheckMailBoxTestPage from "./CheckMailBox.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should see the check mail box", () => {
  let page; // The page to test against

  describe("As AN I should be notified that an email has been sent to me with a new registration link", () => {
    /**
     * Given a AN
     * Then I should see the check mail box message
     */

    beforeEach(() => {
      page = new CheckMailBoxTestPage();
    });

    it("As AN I should see that an email has been sent", () => {
      expect(page.exists()).toBeTruthy();
      // title
      expect(page.title).toBe("Check your mailbox!");
      // message
      expect(page.message).toBe("We sent you a link to verify your email.Check your spam folder if you do not hear from us after a while.");
    });
  });
});
