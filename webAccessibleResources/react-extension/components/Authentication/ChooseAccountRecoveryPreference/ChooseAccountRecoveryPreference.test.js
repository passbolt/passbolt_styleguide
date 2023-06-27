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
 * Unit tests on ChooseAccountRecoveryPreference in regard of specifications
 */
import {
  defaultProps, optInPolicyProps, optOutPolicyProps,
} from "./ChooseAccountRecoveryPreference.test.data";
import ChooseAccountRecoveryPreferencePage from "./ChooseAccountRecoveryPreference.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Choose Account Recovery Preference page", () => {
  let page; // The page to test again

  describe('As user in the setup process, I can see the account recovery setup page', () => {
    /**
     * I should see the account recovery setup page
     */
    it('As user in the setup process who generated an OpenPGP key, I can see the Mandatory account recovery setup page', async() => {
      expect.assertions(5);
      const props = defaultProps(); // The props to pass
      page = new ChooseAccountRecoveryPreferencePage(props);

      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Account recovery (Mandatory)");

      // input radio
      expect(page.acceptRadioButton.isChecked).toBeTruthy();

      // next button exists
      expect(page.nextButton.textContent).toBe("Next");

      // generate new key button exists
      expect(page.generateNewKeyButton.textContent).toBe('Generate new key instead');
    });

    it('As user in the setup process who generated an OpenPGP key, I can see the Opt-out account recovery setup page', async() => {
      expect.assertions(4);
      const props = optOutPolicyProps(); // The props to pass
      page = new ChooseAccountRecoveryPreferencePage(props);

      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Account recovery (Recommended)");

      // input radio
      expect(page.acceptRadioButton.isChecked).toBeTruthy();
      expect(page.rejectRadioButton.isChecked).toBeFalsy();
    });

    it('As user in the setup process who generated an OpenPGP key, I can see the Opt-in account recovery setup page', async() => {
      expect.assertions(4);
      const props = optInPolicyProps(); // The props to pass
      page = new ChooseAccountRecoveryPreferencePage(props);

      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Account recovery (Optional)");

      // input radio
      expect(page.acceptRadioButton.isChecked).toBeFalsy();
      expect(page.rejectRadioButton.isChecked).toBeTruthy();
    });

    it('As user I can go generate a new key', async() => {
      const onGenerateNewKeyInstead = jest.fn(() => Promise.resolve());
      const props = defaultProps({onGenerateNewKeyInstead}); // The props to pass
      page = new ChooseAccountRecoveryPreferencePage(props);

      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.goToGenerateNewKey();
      expect(onGenerateNewKeyInstead).toHaveBeenCalled();
    });
  });
});
