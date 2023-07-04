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

import DisplayRequireInvitationErrorPage from "./DisplayRequireInvitationError.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should see an error page", () => {
  let page; // The page to test against

  describe('As AN I should see an error if my registration cannot be performed', () => {
    /**
     * Given a AN
     * Then I should see an error
     */

    beforeEach(() => {
      page = new DisplayRequireInvitationErrorPage();
    });

    it('As AN following an invalid registration link I should see a feedback notifying me that the registration link is invalid', () => {
      expect(page.exists()).toBeTruthy();
      // title
      expect(page.title).toBe("Access to this service requires an invitation.");
      // message
      expect(page.message).toBe('This email is not associated with any approved users on this domain. Please contact your administrator to request an invitation link.');
      // download
      expect(page.linkToRetrySetup).toBe('Try with another email');
    });
  });
});
