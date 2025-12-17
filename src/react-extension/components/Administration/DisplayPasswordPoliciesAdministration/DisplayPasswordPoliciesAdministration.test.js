/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.2.0
 */

import "../../../../../test/mocks/mockPortal";
import { defaultAppContext } from "../../../contexts/ApiAppContext.test.data";
import { defaultProps } from "./DisplayPasswordPoliciesAdministration.test.data";
import DisplayPasswordPoliciesAdministrationPage from "./DisplayPasswordPoliciesAdministration.test.page";
import { waitFor } from "@testing-library/dom";
import { defaultPasswordPoliciesDto } from "../../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import { screen } from "@testing-library/react";

async function waitForTrue(callback) {
  return waitFor(() => {
    if (!callback()) {
      throw new Error("state has not changed yet");
    }
  });
}

/**
 * Unit tests on DisplayPasswordPoliciesAdministration in regard of specifications
 */
describe("DisplayPasswordPoliciesAdministration", () => {
  let page, props;
  const context = defaultAppContext();
  const settingsDto = defaultPasswordPoliciesDto();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    props = defaultProps();
    props.context.port.addRequestListener("passbolt.password-policies.get-admin-settings", () => settingsDto);
    page = new DisplayPasswordPoliciesAdministrationPage(context, props);
  });

  describe("As an administrator I can read password policies settings of my organization", () => {
    it('As a logged in administrator I can see the "password policy" settings in the administration workspace ', async () => {
      expect.assertions(4);

      expect(page.exists()).toBeTruthy();
      expect(page.saveSettingsButton).not.toBeNull();
      expect(page.title.textContent).toBe("Password Policy");
      expect(page.passphrasePolicyTitle.textContent).toBe("Password generator default settings");
    });

    it("As a logged in administrator I can see an help box in the password policy administration screen ", async () => {
      expect.assertions(5);

      expect(page.helpBox).not.toBeNull();
      expect(page.helpBoxTitle.textContent).toBe("What is password policy?");
      expect(page.helpBoxDescription.textContent).toBe(
        "For more information about the password policy settings, checkout the dedicated page on the help website.",
      );
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute("href")).toEqual(
        "https://passbolt.com/docs/admin/password-configuration/password-policy/",
      );
    });
  });

  describe("As an administrator I can update the password policies settings of my organization", () => {
    it("As a logged in administrator I can see the don't forget to save banner", async () => {
      expect.assertions(2);

      expect(page.settingsChangedBanner).toBeNull();
      await page.togglePasswordPanel();

      await page.setFormWith({
        passwordLengthInput: 20,
      });

      expect(page.settingsChangedBanner).not.toBeNull();
    });

    it("As a logged in administrator I can save the current configuration", async () => {
      expect.assertions(5);

      const newPasswordLength = "20";
      const newPassphraseWordCount = "20";

      context.port.addRequestListener("passbolt.password-policies.save", (passwordSettingsDto) => {
        const expectedPasswordGeneratorSettings = Object.assign({}, settingsDto.password_generator_settings, {
          length: newPasswordLength,
        });
        const expectedPassphraseGeneratorSettings = Object.assign({}, settingsDto.passphrase_generator_settings, {
          words: newPassphraseWordCount,
        });
        const expectedRequest = Object.assign({}, settingsDto, {
          password_generator_settings: expectedPasswordGeneratorSettings,
          passphrase_generator_settings: expectedPassphraseGeneratorSettings,
        });

        expect(passwordSettingsDto).toStrictEqual(expectedRequest);
        return passwordSettingsDto;
      });

      const spyOnFeedback = jest.spyOn(props.actionFeedbackContext, "displaySuccess");

      expect(page.settingsChangedBanner).toBeNull();
      await page.togglePasswordPanel();
      await page.togglePassphrasePanel();

      await page.setFormWith({
        passwordLengthInput: newPasswordLength,
        passphraseWordCountInput: newPassphraseWordCount,
      });

      expect(page.settingsChangedBanner).not.toBeNull();

      await page.clickOnSave();
      await waitForTrue(() => spyOnFeedback.mock.calls.length > 0);

      expect(spyOnFeedback).toHaveBeenCalledWith("The password policy settings were updated.");
      expect(spyOnFeedback).toHaveBeenCalledTimes(1);
      expect(page.settingsChangedBanner).toBeNull();
    });

    it("As a logged in administrator I should see an error notification if the configuration could not be saved", async () => {
      expect.assertions(1);

      const expectedErrorMessage = "Something wrong happened";
      props.context.port.addRequestListener("passbolt.password-policies.save", () => {
        throw new Error(expectedErrorMessage);
      });

      const spyOnFeddback = jest.spyOn(props.actionFeedbackContext, "displayError");

      await page.togglePasswordPanel();
      await page.setFormWith({
        passwordLengthInput: 20,
      });

      await page.clickOnSave();
      await waitForTrue(() => spyOnFeddback.mock.calls.length > 0);

      expect(spyOnFeddback).toHaveBeenCalledWith(expectedErrorMessage);
    });

    it("As a logged in administrator I should see the expected entropy of the password configurator change based on the current configuration", async () => {
      expect.assertions(2);

      const defaultConfigurationEntropy = "116.0 bits";
      const passwordEntropyWith20Chars = "128.9 bits";

      await page.togglePasswordPanel();

      expect(page.passwordEntropyValue).toContain(defaultConfigurationEntropy);

      await page.setFormWith({
        passwordLengthInput: "20",
      });

      expect(page.passwordEntropyValue).toContain(passwordEntropyWith20Chars);
    });

    it("As a logged in administrator I should see the expected entropy of the passphrase configurator change based on the current configuration", async () => {
      expect.assertions(2);

      const passphraseEntropyWith9Words = "130.6 bits";
      const passphraseEntropyWith20Words = "290.2 bits";

      await page.togglePassphrasePanel();

      expect(page.passphraseEntropyValue).toContain(passphraseEntropyWith9Words);

      await page.setFormWith({
        passphraseWordCountInput: "20",
      });

      expect(page.passphraseEntropyValue).toContain(passphraseEntropyWith20Words);
    });

    it("As a logged in administrator I should see a warning message if the passphrase entropy is not high enough to be considered strong", async () => {
      expect.assertions(1);

      await page.togglePasswordPanel();
      await page.togglePassphrasePanel();
      await page.setFormWith({
        passwordLengthInput: "20",
        passphraseWordCountInput: "4",
      });

      expect(page.minimalPassphraseEntropyAdvisedWarning).not.toBeNull();
    });

    it("As a logged in administrator I should see a warning message if the password entropy is not high enough to be considered strong", async () => {
      expect.assertions(1);

      await page.togglePasswordPanel();
      await page.togglePassphrasePanel();
      await page.setFormWith({
        passwordLengthInput: "8",
        passphraseWordCountInput: "40",
      });

      expect(page.minimalPasswordEntropyAdvisedWarning).not.toBeNull();
    });

    it("As a logged in administrator I should see an error message if I try to save passphrase generator settings that leads to have entropies that are under the minimum Passbolt's requirement", async () => {
      expect.assertions(1);

      await page.togglePasswordPanel();
      await page.togglePassphrasePanel();
      await page.setFormWith({
        passwordLengthInput: "20",
        passphraseWordCountInput: "4",
      });

      await page.clickOnSave();

      expect(page.minimalPassphraseEntropyError).not.toBeNull();
    });

    it("As a logged in administrator I should see an error message if I try to save password generator settings that leads to have entropies that are under the minimum Passbolt's requirement", async () => {
      expect.assertions(1);

      await page.togglePasswordPanel();
      await page.togglePassphrasePanel();
      await page.setFormWith({
        passwordLengthInput: "8",
        passphraseWordCountInput: "40",
      });

      await page.clickOnSave();

      expect(page.minimalPasswordEntropyError).not.toBeNull();
    });

    it("As a logged in administrator I should see an error message if the words separator is too long", async () => {
      expect.assertions(1);

      await page.togglePassphrasePanel();
      await page.setFormWith({
        passphraseWordsSeparatorInput: "".padStart(11, " "),
      });

      await page.clickOnSave();

      expect(page.wordsSeparatorErrorMessage).not.toBeNull();
    });

    it("As a logged in administrator I can toggle the external dictionary check", async () => {
      expect.assertions(1);

      await screen.findByRole("checkbox", {
        name: /external services/i,
        checked: true,
      });

      const currentToggleState = page.externalDictionaryCheck.checked;
      await page.clickOnExternalDictionaryCheck();

      expect(page.externalDictionaryCheck.checked).not.toBe(currentToggleState);
    });

    it("As a logged in administrator I can change the password mask to use by default", async () => {
      const maskButtonsLength = 10;
      expect.assertions(maskButtonsLength + 1);

      await page.togglePasswordPanel();
      const maskButtons = page.maskButtons;
      expect(maskButtons.length).toStrictEqual(maskButtonsLength);

      for (let i = 0; i < maskButtonsLength; i++) {
        const isChecked = maskButtons[i].classList.contains("selected");
        await page.clickOnMaskButton(maskButtons[i]);
        expect(page.getMaskButton(i).classList.contains("selected")).not.toBe(isChecked);
      }
    });

    it("As a logged in administrator I should see an error if I unselect all the password mask", async () => {
      expect.assertions(1);

      await page.togglePasswordPanel();

      const maskButtons = page.activeMaskButtons;

      for (let i = 0; i < maskButtons.length; i++) {
        await page.clickOnMaskButton(maskButtons[i]);
      }

      await page.clickOnSave();

      expect(page.maskError).not.toBeNull();
    });

    it("As a logged in administrator I can see the error messages associated to the secret length", async () => {
      expect.assertions(2);

      await page.togglePasswordPanel();
      await page.togglePassphrasePanel();

      await page.setFormWith({
        passwordLengthInput: 1,
        passphraseWordCountInput: 1,
      });

      await page.clickOnSave();

      expect(page.passwordLengthError).not.toBeNull();
      expect(page.passphraseLengthError).not.toBeNull();
    });

    it("As a logged in administrator I can choose passphrase as default generator", async () => {
      expect.assertions(1);

      await page.choosePassphraseAsDefaultGenerator();

      expect(page.defaultGeneratorSelectedValue).toBe("Passphrase");
    });
  });

  describe("As AD I should be warned that the source of the configuration is about to change", () => {
    it("As a logged in administrator I should be warned if the current configuration source is the environment variable and that I'm about to change that.", async () => {
      expect.assertions(1);
      const currentSettings = defaultPasswordPoliciesDto({ source: "env" });

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-policies.get-admin-settings", () => currentSettings);
      const page = new DisplayPasswordPoliciesAdministrationPage(context, props);

      await waitForTrue(() => Boolean(page.sourceChangingBanner));

      expect(page.sourceChangingBanner).not.toBeNull();
    });

    it("As a logged in administrator I should not be warned if the current configuration source the database.", async () => {
      expect.assertions(1);
      const currentSettings = defaultPasswordPoliciesDto({ source: "db" });

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-policies.get-admin-settings", () => currentSettings);
      const page = new DisplayPasswordPoliciesAdministrationPage(context, props);

      expect(page.sourceChangingBanner).toBeNull();
    });

    it("As a logged in administrator I should not be warned if the current configuration source is 'default'.", async () => {
      expect.assertions(1);
      const currentSettings = defaultPasswordPoliciesDto({ source: "default" });

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-policies.get-admin-settings", () => currentSettings);
      const page = new DisplayPasswordPoliciesAdministrationPage(context, props);

      expect(page.sourceChangingBanner).toBeNull();
    });
  });

  describe("As AD I should not be able to see the source of the configuration", () => {
    it("when it's coming from the default configuration", async () => {
      expect.assertions(1);

      const context = defaultAppContext();
      const settingsDto = defaultPasswordPoliciesDto({
        source: null,
      });
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-policies.get-admin-settings", () => settingsDto);
      page = new DisplayPasswordPoliciesAdministrationPage(context, props);
      await waitForTrue(() => Boolean(page.settingsSource));

      expect(page.settingsSource.textContent).toStrictEqual(
        "This current configuration source is: default configuration.",
      );
    });

    it("when it's coming from the database", async () => {
      expect.assertions(1);

      const context = defaultAppContext();
      const settingsDto = defaultPasswordPoliciesDto({
        source: "db",
      });
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-policies.get-admin-settings", () => settingsDto);
      page = new DisplayPasswordPoliciesAdministrationPage(context, props);
      await waitForTrue(() => Boolean(page.settingsSource?.textContent?.includes("database")));

      expect(page.settingsSource.textContent).toStrictEqual("This current configuration source is: database.");
    });

    it("when it's coming from a environment variables", async () => {
      expect.assertions(1);

      const context = defaultAppContext();
      const settingsDto = defaultPasswordPoliciesDto({
        source: "env",
      });
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-policies.get-admin-settings", () => settingsDto);
      page = new DisplayPasswordPoliciesAdministrationPage(context, props);
      await waitForTrue(() => Boolean(page.settingsSource?.textContent?.includes("environment variables")));

      expect(page.settingsSource.textContent).toStrictEqual(
        "This current configuration source is: environment variables.",
      );
    });
  });
});
