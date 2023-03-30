/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import {enableFetchMocks} from 'jest-fetch-mock';
import {mockApiResponse, mockApiResponseError} from '../../../../../test/mocks/mockApiResponse';
import {defaultAppContext} from '../../../contexts/ApiAppContext.test.data';
import {defaultProps, settingDto} from './DisplayPasswordPolicyAdministration.test.data';
import DisplayPasswordPolicyAdministrationPage from './DisplayPasswordPolicyAdministration.test.page';
import {waitFor} from '@testing-library/dom';

async function waitForTrue(callback) {
  return waitFor(() => {
    if (!callback()) {
      throw new Error("state has not changed yet");
    }
  });
}

/**
 * Unit tests on DisplayPasswordPolicyAdministration in regard of specifications
 */
describe("DisplayPasswordPolicyAdministration", () => {
  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
  });

  let page, props;
  const context = defaultAppContext();

  describe("As an administrator I can read password policies settings of my organization", () => {
    beforeEach(() => {
      fetch.doMockOnceIf(/password-policies\/settings*/, () => mockApiResponse(settingDto));
      props = defaultProps();
      page = new DisplayPasswordPolicyAdministrationPage(context, props);
    });

    it('As a logged in administrator I can see the "password policy" settings in the administration workspace ', async() => {
      expect.assertions(4);

      expect(page.exists()).toBeTruthy();
      expect(page.saveSettingsButton).not.toBeNull();
      expect(page.title.textContent).toBe("Password Policy");
      expect(page.passphrasePolicyTitle.textContent).toBe("Password generator default settings");
    });

    it('As a logged in administrator I can see an help box in the password policy administration screen ', async() => {
      expect.assertions(5);

      expect(page.helpBox).not.toBeNull();
      expect(page.helpBoxTitle.textContent).toBe("What is password policy?");
      expect(page.helpBoxDescription.textContent).toBe("For more information about the password policy settings, checkout the dedicated page on the help website.");
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute('href')).toEqual('https://help.passbolt.com/configure/password-policy');
    });

    it("As a logged in administrator I can see the don't forget to save banner", async() => {
      expect.assertions(2);

      expect(page.settingsChangedBanner).toBeNull();
      await page.togglePasswordPanel();
      await page.setFormWith({
        passwordLengthInput: 20
      });

      expect(page.settingsChangedBanner).not.toBeNull();
    });

    it("As a logged in administrator I can reset the current configuration", async() => {
      expect.assertions(5);

      expect(page.settingsChangedBanner).toBeNull();
      await page.togglePasswordPanel();

      const passwordLength = page.passwordLengthInput.value;
      await page.setFormWith({
        passwordLengthInput: 20
      });
      expect(page.passwordLengthInput.value).toStrictEqual("20");
      expect(page.settingsChangedBanner).not.toBeNull();

      await page.clickOnReset();
      expect(page.passwordLengthInput.value).toStrictEqual(passwordLength);
      expect(page.settingsChangedBanner).toBeNull();
    });

    it("As a logged in administrator I can save the current configuration", async() => {
      expect.assertions(6);

      const newPasswordLength = "20";
      const newPassphraseWordCount = "10";

      let savePoliciesPromise = null;
      let responseToReturn = null;
      fetch.doMockOnceIf(/password-policies\/settings*/, async req => {
        const body = JSON.parse(await req.text());
        const expectedRequest = Object.assign({}, settingDto, {
          generator_passwords_length: newPasswordLength,
          generator_passphrase_words: newPassphraseWordCount,
        });
        expect(body).toStrictEqual(expectedRequest);
        return new Promise(resolve => {
          responseToReturn = mockApiResponse(body);
          savePoliciesPromise = resolve;
        });
      });

      const spyOnFeddback = jest.spyOn(props.actionFeedbackContext, "displaySuccess");

      expect(page.settingsChangedBanner).toBeNull();
      await page.togglePasswordPanel();
      await page.togglePassphrasePanel();
      await page.setFormWith({
        passwordLengthInput: newPasswordLength,
        passphraseWordCountInput: newPassphraseWordCount
      });

      expect(page.settingsChangedBanner).not.toBeNull();

      await page.clickOnSave();
      await waitForTrue(() => page.isProcessing);

      await page.clickOnSave();
      await savePoliciesPromise(responseToReturn);

      await waitForTrue(() => spyOnFeddback.mock.calls.length > 0);

      expect(spyOnFeddback).toHaveBeenCalledWith("The Password policy settings were updated.");
      expect(spyOnFeddback).toHaveBeenCalledTimes(1);
      expect(page.settingsChangedBanner).toBeNull();
    });

    it("As a logged in administrator I should see an error notification if the configuration could not be saved", async() => {
      expect.assertions(4);

      const expectedErrorMessage = "Something wrong happened";
      fetch.doMockOnceIf(/password-policies\/settings*/, () => mockApiResponseError(500, expectedErrorMessage));

      const spyOnFeddback = jest.spyOn(props.actionFeedbackContext, "displayError");

      expect(page.settingsChangedBanner).toBeNull();

      await page.togglePasswordPanel();
      await page.setFormWith({
        passwordLengthInput: 20,
      });

      expect(page.settingsChangedBanner).not.toBeNull();

      await page.clickOnSave();
      await waitForTrue(() => spyOnFeddback.mock.calls.length > 0);

      expect(spyOnFeddback).toHaveBeenCalledWith(expectedErrorMessage);
      expect(page.settingsChangedBanner).not.toBeNull();
    });

    it("As a logged in administrator I should see the expected entropy of the password configurator change based on the current configuration", async() => {
      expect.assertions(2);

      const defaultConfigurationEntropy = "117.7 bits";
      const passwordEntropyWith20Chars = "130.8 bits";

      await page.togglePasswordPanel();

      expect(page.passwordEntropyValue).toContain(defaultConfigurationEntropy);

      await page.setFormWith({
        passwordLengthInput: "20"
      });

      expect(page.passwordEntropyValue).toContain(passwordEntropyWith20Chars);
    });

    it("As a logged in administrator I should see the expected entropy of the passphrase configurator change based on the current configuration", async() => {
      expect.assertions(2);

      const passphraseEntropyWith9Words = "116.5 bits";
      const passphraseEntropyWith20Words = "259.0 bits";

      await page.togglePassphrasePanel();

      expect(page.passphraseEntropyValue).toContain(passphraseEntropyWith9Words);

      await page.setFormWith({
        passphraseWordCountInput: "20"
      });

      expect(page.passphraseEntropyValue).toContain(passphraseEntropyWith20Words);
    });
  });
});


