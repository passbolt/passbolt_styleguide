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
 * Unit tests on TransferToMobile in regard of specifications
 */
import TransferToMobilePage from "./TransferToMobile.test.page";
import {defaultProps} from "./TransferToMobile.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should be able to configure my account on my mobile phone", () => {
  let page; // The page to test against
  const context = defaultAppContext({
    userSettings: {
      getTrustedDomain: () => "https://localhost:6006"
    }
  }); // The applicative context
  const props = defaultProps(); // The props to pass

  describe('As LU I can start the mobile phone account transfer', () => {
    /**
     * Prerequisite:
     * Given I am a logged in user
     * And I am on the transfer to mobile page
     */
    beforeEach(() => {
      page = new TransferToMobilePage(context, props);
    });

    it('As LU I should be able to start the transfer to mobile', async() => {
      expect.assertions(3);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toContain('mobile');
      expect(page.isStep('start')).toBe(true);

      /*
       * await page.clickStart();
       *
       * let expectedData = context.user.id;
       * let expectedParameters =  ['passbolt.keyring.get-public-key-info-by-user', expectedData];
       * expect(context.port.request).toHaveBeenCalledWith(...expectedParameters);
       */

      /*
       * expectedData = {folder_parent_id: "some folder parent id", name: "My super folder"};
       * expectedParameters =  ['passbolt.mobile.transfer.create', expectedData];
       * expect(context.port.request).toHaveBeenCalledWith(...expectedParameters);
       */
    });
  });

  describe('Ensure the feature is running only under HTTPS', () => {
    it('As LU I should see a message telling me the feature needs Passbolt to run under HTTPS', async() => {
      expect.assertions(2);
      const context = defaultAppContext({
        userSettings: {
          getTrustedDomain: () => "http://localhost"
        }
      }); // The applicative context
      const props = defaultProps(); // The props to pass
      const page = new TransferToMobilePage(context, props);
      expect(page.exists()).toBeTruthy();
      expect(page.isStep('https required')).toBe(true);
    });
  });
});
