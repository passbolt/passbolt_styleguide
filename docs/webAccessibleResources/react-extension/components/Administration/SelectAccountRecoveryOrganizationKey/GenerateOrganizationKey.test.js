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
 * Unit tests on ConfirmSaveAccountRecoverySettings in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import SelectAccountRecoveryOrganizationKeyPage from "./SelectAccountRecoveryOrganizationKey.test.page";

import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";

function defaultProps() {
  return {
    context: {
      port: {
        request: () => Promise.resolve(0)
      },
      userSettings: new UserSettings(userSettingsFixture)
    },
    dialogContext: {
      open: jest.fn()
    },
    onClose: jest.fn(),
  };
}

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
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
    expect.assertions(12);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());
    await waitFor(() => { });
    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();

    await page.clickOnGenerateTab(() => {
      if (!page.isGenerateTabSeletect()) {
        throw new Error("Changes are not available yet");
      }
    });

    expect(page.isFieldRequired(page.nameField)).toBe(true);
    expect(page.isFieldRequired(page.emailField)).toBe(true);
    expect(page.algorithmField.value).toBe("RSA");
    expect(page.keySizeField.value).toBe("4096");
    expect(page.passphraseField).not.toBeNull();
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

    await page.clickOnGenerateTab(() => {
      if (!page.isGenerateTabSeletect()) {
        throw new Error("Changes are not available yet");
      }
    });

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
    await waitFor(() => {});
    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();

    await page.clickOnGenerateTab(() => {
      if (!page.isGenerateTabSeletect()) {
        throw new Error("Changes are not available yet");
      }
    });

    page.passphraseField.value = "dummy-passphrase";
    expect(page.passphraseField.getAttribute("type")).toBe("password");

    await page.toggleShowPassword(() => {
      if (page.passphraseField.getAttribute("type") !== "text") {
        throw new Error("Changes are not available yet");
      }
    });
    expect(page.passphraseField.getAttribute("type")).toBe("text");

    await page.toggleShowPassword(() => {
      if (page.passphraseField.getAttribute("type") !== "password") {
        throw new Error("Changes are not available yet");
      }
    });
    expect(page.passphraseField.getAttribute("type")).toBe("password");
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
    await page.clickOnGenerateTab(() => {
      if (!page.isGenerateTabSeletect()) {
        throw new Error("Changes are not available yet");
      }
    });

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
    expect.assertions(3);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());
    await waitFor(() => {});
    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();
    await page.clickOnGenerateTab(() => {
      if (!page.isGenerateTabSeletect()) {
        throw new Error("Changes are not available yet");
      }
    });

    await page.type("test", page.nameField);
    await page.type("test@passbolt.com", page.emailField);
    await page.type("almost fair passw", page.passphraseField);

    await page.clickOnGenerateButton(() => {
      if (page.passphraseFieldError === null) {
        throw new Error("Changes are not available yet");
      }
    });

    expect(page.passphraseFieldError).not.toBeNull();
    expect(page.passphraseFieldError.textContent).toBe(`A strong passphrase is required. The minimum complexity must be 'fair'.`);
  });

  it('As AD I should be inform about ExternalServiceUnavailableError for powned password service', async() => {
    expect.assertions(1);
    const props = defaultProps();
    jest.spyOn(props.context.port, "request").mockImplementationOnce(() => Promise.reject());
    const page = new SelectAccountRecoveryOrganizationKeyPage(props);
    await waitFor(() => {});

    await page.clickOnGenerateTab(() => {
      if (!page.isGenerateTabSeletect()) {
        throw new Error("Changes are not available yet");
      }
    });
    await page.type("This a strong passphrase to test a service not working", page.passphraseField);
    await waitFor(() => {});

    expect(page.passwordWarningMessage.textContent).toBe("The pwnedpasswords service is unavailable, your passphrase might be part of an exposed data breach.");
  });

  it("As an administrator I want to know if the weak passphrase I am entering to generate an organization recovery key has been pwned", async() => {
    expect.assertions(4);
    const props = defaultProps();
    jest.spyOn(props.context.port, "request").mockImplementation(() => 2);
    const page = new SelectAccountRecoveryOrganizationKeyPage(props);
    await waitFor(() => {});

    await page.clickOnGenerateTab(() => {
      if (!page.isGenerateTabSeletect()) {
        throw new Error("Changes are not available yet");
      }
    });
    await page.type("Testtestest", page.passphraseField);
    await waitFor(() => {});

    expect(page.passwordWarningMessage.textContent).toBe("The passphrase is part of an exposed data breach.");
    await page.clickOnGenerateButton(() => {
      if (page.passphraseFieldError === null) {
        throw new Error("Changes are not available yet");
      }
    });
    expect(page.passwordWarningMessage === null).toBeTruthy();
    expect(page.passphraseFieldError).not.toBeNull();
    expect(page.passphraseFieldError.textContent).toBe(`The passphrase should not be part of an exposed data breach.`);
  });

  it("As an administrator generating an account recovery organization key, I should see the warning banner after submiting the form", async() => {
    expect.assertions(1);
    const props = defaultProps();
    const page = new SelectAccountRecoveryOrganizationKeyPage(props);
    await waitFor(() => {});

    await page.clickOnGenerateTab(() => {
      if (!page.isGenerateTabSeletect()) {
        throw new Error("Changes are not available yet");
      }
    });

    expect(page.warningImportInstead.textContent).toBe("Warning, we encourage you to generate your OpenPGP Organization Recovery Key separately. Make sure you keep a backup in a safe place.");
  });

  it("As an administrator generating an account recovery organization key, I should see a complexity as Quality if the passphrase is empty", async() => {
    expect.assertions(3);
    const page = new SelectAccountRecoveryOrganizationKeyPage(defaultProps());
    await waitFor(() => {});
    // Dialog title exists and correct
    expect(page.exists()).toBeTruthy();
    await page.clickOnGenerateTab(() => {
      if (!page.isGenerateTabSeletect()) {
        throw new Error("Changes are not available yet");
      }
    });

    await page.type("", page.passphraseField);

    expect(page.passphraseStrength.textContent).toBe("Quality");
    expect(page.passphraseFieldError).toBeNull();
  });
});

