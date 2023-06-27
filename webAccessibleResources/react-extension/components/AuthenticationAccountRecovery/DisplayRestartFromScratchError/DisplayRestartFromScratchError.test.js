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
 * Unit tests on DisplayRestartFromScratchError in regard of specifications
 */

import DisplayRestartFromScratchPage from "./DisplayRestartFromScratchError.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("As AN I should see the account recovery restart from scratch", () => {
  let page; // The page to test against

  describe('As AN I should see a restart from scratch feedback if my request is valid but I\'m not completing the process on the right browser', () => {
    beforeEach(() => {
      page = new DisplayRestartFromScratchPage();
    });

    it('As AN I should see a restart from scratch feedback if my request is valid but I\'m not completing the process on the right browser', () => {
      expect(page.exists()).toBeTruthy();
      // title
      expect(page.title).toBe("Sorry, wrong computer or browser...");
      // message
      expect(page.message).toBe('You need to finalize the account recovery process with the same computer you used for the account recovery request.If you changed systems, or reinstalled passbolt web extension in the meantime, you will need to start the account recovery process from scratch.');
      // download
      expect(page.linkToRestartFromScratch).toBe('Restart from scratch');
    });
  });
});
