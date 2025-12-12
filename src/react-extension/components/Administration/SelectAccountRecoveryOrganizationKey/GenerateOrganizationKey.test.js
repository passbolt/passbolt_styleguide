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

import {waitFor} from "@testing-library/react";
import SelectAccountRecoveryOrganizationKeyPage from "./SelectAccountRecoveryOrganizationKey.test.page";
import {defaultProps} from "./GenerateOrganizationKey.test.data";

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('As AD I can generate an ORK', () => {
  /**
   * Given  that I am a logged in administrator in the administration workspace
   * And    I am on Account recovery settings page
   * And    the “Organization recovery key” dialog is open
   * When   I click on the “Generate” tab
   * Then   I see the generate tab is selected
   * And    I see a “Name” and an “Email” mandatory text fields
   * And    I see “Algorithm” and “Key Size” select lists with default values set
   * And    I see an “Organization key passphrase” text field
   * And    I see a show icon next to the passphrase field
   * And    I see my security token next to the eye icon
   * And    I see the passphrase strength indicators below the field
   * And    I see a warning bar with a description telling to import instead
   * And    I see a “Cancel” button to go back to the Account recovery settings page
   * And    I see an “Generate & Apply” button
   */
  it("As a logged in administrator on the account recovery settings in the administration workspace, I can open a dialog to generate an Organization Recovery Key", async() => {
    expect.assertions(13);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());
    await waitFor(() => { });
    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();

    await page.clickOnGenerateTab();

    expect(page.isFieldRequired(page.nameField)).toBe(true);
    expect(page.isFieldRequired(page.emailField)).toBe(true);
    expect(page.algorithmField.value).toBe("RSA");
    expect(page.keySizeField.value).toBe("4096");
    expect(page.passphraseField).not.toBeNull();
    expect(page.passphraseConfirmationField).not.toBeNull();
    expect(page.showPassphraseButton).not.toBeNull();
    expect(page.securityToken).not.toBeNull();
    expect(page.passphraseStrength).not.toBeNull();
    expect(page.warningImportInstead).not.toBeNull();
    expect(page.cancelButton).not.toBeNull();
    expect(page.generateButton).not.toBeNull();
  });

  /**
   * As a logged in administrator in the administration workspace, I can not select the algorithm type of the Organization Recovery Key generator
   * Given  that I am a logged in administrator in the administration workspace
   * And    I am on the generate tab of the “Organization Recovery Key” dialog
   * When   I click on the “Algorithm” select list
   * Then   I do not see a list of available algorithms
   * And    I see a tooltip telling me that this setting is disable and safe
   *
   * As a logged in administrator in the administration workspace, I cannot select the key size type of the Organization Recovery Key generator
   * Given  that I am a logged in administrator in the administration workspace
   * And    I am on the generate tab of the “Organization Recovery Key” dialog
   * When   I click on the “Key size” select list
   * Then   I do not see a list of available key sizes
   * And    I see a tooltip telling me that this setting is disable and safe
   */
  it("As a logged in administrator in the administration workspace, I can not select the algorithm type of the Organization Recovery Key generator", async() => {
    expect.assertions(5);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());
    await waitFor(() => { });
    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();

    await page.clickOnGenerateTab();

    const tooltipText = "Algorithm and key size cannot be changed at the moment. These are secure default";
    expect(page.algorithmTooltip).not.toBeNull();
    expect(page.algorithmTooltip.innerHTML).toBe(tooltipText);

    expect(page.keySizeTooltip).not.toBeNull();
    expect(page.keySizeTooltip.innerHTML).toBe(tooltipText);
  });

  /**
   * Given  that I am a logged in administrator in the administration workspace
   * And    I am on the generate tab of the “Organization Recovery Key” dialog
   * When   I type at least one character in the “Organization key passphrase” field
   * Then   I see the characters are replaced with symbols
   * When   I click on show icon
   * Then   the show icon is replaced by a hide icon
   * Then   the symbols are replaced with the characters I typed
   * When   I click on the hide icon
   * Then   the characters are replaced with symbols
   */
  it("As a logged in administrator in the administration workspace, I can show or hide the content of the “Organization key passphrase” text field in the Organization Recovery Key dialog", async() => {
    expect.assertions(4);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());

    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();

    await page.clickOnGenerateTab();

    page.passphraseField.value = "dummy-passphrase";
    expect(page.passphraseField.getAttribute("type")).toBe("password");

    await page.toggleShowPassword();
    expect(page.passphraseField.getAttribute("type")).toBe("text");

    await page.toggleShowPassword();
    expect(page.passphraseField.getAttribute("type")).toBe("password");
  });

  it("As a logged in administrator in the administration workspace, I can show or hide the content of the “Organization key passphrase confirmation” text field in the Organization Recovery Key dialog", async() => {
    expect.assertions(4);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());

    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();

    await page.clickOnGenerateTab();

    page.passphraseConfirmationField.value = "dummy-passphrase";
    expect(page.passphraseConfirmationField.getAttribute("type")).toBe("password");

    await page.toggleShowPasswordConfirmation();
    expect(page.passphraseConfirmationField.getAttribute("type")).toBe("text");

    await page.toggleShowPasswordConfirmation();
    expect(page.passphraseConfirmationField.getAttribute("type")).toBe("password");
  });

  /**
   * Given  that I am a logged in administrator in the administration workspace
   * And    I am on the generate tab of the “Organization Recovery Key” dialog
   * And    I do not fill out all mandatory fields
   * When   I click on the “Generate & Apply” button
   * Then   I see several error message in @red below the mandatory fields
   * And    I see the empty mandatory field label in @red
   */
  it("As a logged in administrator in the administration workspace, I cannot generate OpenPGP Public key in the Organization Recovery Key settings without a valid email and name", async() => {
    expect.assertions(4);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());
    await waitFor(() => { });
    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();
    await page.clickOnGenerateTab();

    await page.clickOnGenerateButton(() => {
      if (page.nameError === null) {
        throw new Error("Changes are not available yet");
      }
    });

    expect(page.nameFieldError).not.toBeNull();
    expect(page.emailFieldError).not.toBeNull();
    expect(page.passwordFieldError).not.toBeNull();
  });

  /**
   * Given  that I am a logged in administrator in the administration workspace
   * And    I am on the generate tab of the “Organization Recovery Key” dialog
   * And    I fill out all mandatory fields
   * And    I use a weak passphrase
   * When   I click on the “Generate & Apply” button
   * Then   I see an error message below the passphrase telling me to use a strong passphrase instead
   */
  it("As a logged in administrator in the administration workspace, I cannot generate OpenPGP Public key in the Organization Recovery Key settings without a strong passphrase", async() => {
    expect.assertions(5);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());

    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();
    await page.clickOnGenerateTab();

    await page.type("test", page.nameField);
    await page.type("test@passbolt.com", page.emailField);
    await page.type("almost fair", page.passphraseField);

    await page.clickOnGenerateButton(() => {
      if (page.passphraseFieldError === null) {
        throw new Error("Changes are not available yet");
      }
    });

    expect(page.passphraseFieldError).not.toBeNull();
    expect(page.passphraseFieldError.textContent).toBe(`A strong passphrase is required. The minimum complexity must be 'fair'.`);
    expect(page.passphraseConfirmationFieldError).not.toBeNull();
    expect(page.passphraseConfirmationFieldError.textContent).toBe(`The passphrase confirmation is required.`);
  });

  it("As a logged in administrator in the administration workspace, I can generate OpenPGP Public key when the form validates", async() => {
    expect.assertions(6);
    const props = defaultProps();

    const expectedDto = {
      name: "test",
      email: "test@test.com",
      algorithm: "RSA",
      keySize: 4096,
      passphrase: "Kinda fair passphrase",
    };

    props.context.port.addRequestListener('passbolt.account-recovery.generate-organization-key', generateKeyDto => {
      expect(generateKeyDto).toStrictEqual(expectedDto);
      return "FAKE ARMORED KEY";
    });

    const page = new SelectAccountRecoveryOrganizationKeyPage(props);

    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();
    await page.clickOnGenerateTab();

    await page.type(expectedDto.name, page.nameField);
    await page.type(expectedDto.email, page.emailField);
    await page.type(expectedDto.passphrase, page.passphraseField);
    await page.type(expectedDto.passphrase, page.passphraseConfirmationField);

    await page.clickOnGenerateButton(() => {});

    expect(page.nameFieldError).toBeNull();
    expect(page.emailFieldError).toBeNull();
    expect(page.passphraseFieldError.textContent).toStrictEqual("");
    expect(page.passphraseConfirmationFieldError.textContent).toStrictEqual("");
  });

  it('As AD I should not be blocked if the powned password service is unavailable', async() => {
    expect.assertions(1);
    const props = defaultProps();
    jest.spyOn(props.context.port, "request").mockImplementationOnce(() => Promise.reject());
    const page = new SelectAccountRecoveryOrganizationKeyPage(props);

    await page.clickOnGenerateTab();

    await page.type("passbolt", page.nameField);
    await page.type("admin@passbolt.com",  page.emailField);
    await page.type("This a strong passphrase to test a service not working", page.passphraseField);
    await page.type("This a strong passphrase to test a service not working", page.passphraseConfirmationField);

    await waitFor(() => {});

    await page.clickOnGenerateButton(() => {});

    expect(page.passphraseFieldError.textContent).toBe("");
  });

  it("As an administrator I want to know if the weak passphrase I am entering to generate an organization recovery key has been pwned when submit", async() => {
    expect.assertions(5);
    const props = defaultProps();

    props.context.port.addRequestListener('passbolt.secrets.powned-password', () => 2); ;

    const page = new SelectAccountRecoveryOrganizationKeyPage(props);

    await page.clickOnGenerateTab();

    await page.type("azerty", page.nameField);
    await page.type("admin@passbolt.com",  page.emailField);
    await page.type("azertyazertyazerty", page.passphraseField);
    await page.type("azertyazertyazerty", page.passphraseConfirmationField);

    expect(page.passphraseFieldError).toBeNull();

    await page.clickOnGenerateButton(() => {});

    expect(page.passwordWarningMessage === null).toBeTruthy();
    expect(page.passphraseFieldError).not.toBeNull();
    expect(page.passphraseFieldError.textContent).toBe("The passphrase should not be part of an exposed data breach.");

    //Typing new password should remove the powned service error
    await page.type("new password", page.passphraseField);
    expect(page.passphraseFieldError.textContent).toBe("A strong passphrase is required. The minimum complexity must be 'fair'.");
  });

  it("As an administrator generating an account recovery organization key, I should see the warning banner after submiting the form", async() => {
    expect.assertions(1);
    const props = defaultProps();
    const page = new SelectAccountRecoveryOrganizationKeyPage(props);


    await page.clickOnGenerateTab();

    expect(page.warningImportInstead.textContent).toBe("Warning, we encourage you to generate your OpenPGP Organization Recovery Key separately. Make sure you keep a backup in a safe place.");
  });

  it("As an administrator generating an account recovery organization key, I should see a complexity as Quality if the passphrase is empty", async() => {
    expect.assertions(3);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());

    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();
    await page.clickOnGenerateTab();

    await page.type("", page.passphraseField);

    expect(page.passphraseStrength.textContent).toBe("Quality Entropy: 0.0 / 80.0 bits");
    expect(page.passphraseFieldError).toBeNull();
  });
});
