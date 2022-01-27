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

/**
 * Unit tests on CheckAccountRecoveryEmail in regard of specifications
 */

import CheckAccountRecoveryEmailTestPage from "./CheckAccountRecoveryEmail.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("CheckAccountRecoveryEmail", () => {
  let page; // The page to test against

  beforeEach(() => {
    page = new CheckAccountRecoveryEmailTestPage();
  });

  it('As AN I should be notified that an email will be sent to me when an administrator accept my account recovery request', () => {
    expect(page.exists()).toBeTruthy();
    expect(page.title).toBe("Please wait, while your request is processed.");
    expect(page.message).toContain("As soon as an administrator validates your request you will receive an email link to complete the process.");
  });
});
