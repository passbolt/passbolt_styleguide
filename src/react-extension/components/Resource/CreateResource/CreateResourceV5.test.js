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
 * @since         5.0.0
 */

/**
 * Unit tests on Create Resource in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import CreateResourcePage from "./CreateResourceV5.test.page";
import {defaultProps, defaultTotpProps} from "./CreateResourceV5.test.data";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {
  resourceTypePasswordAndDescriptionDto,
  resourceTypePasswordStringDto
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import "../../../../../test/mocks/mockClipboard";

describe("See the Create Resource", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('As LU I can start adding a password', () => {
    describe('Styleguide', () => {
      it('matches the styleguide', async() => {
        expect.assertions(18);
        const props = defaultProps(); // The props to pass
        const page = new CreateResourcePage(props);
        await waitFor(() => {});
        // Dialog title exists and correct
        expect(page.exists()).toBeTruthy();
        expect(page.header.textContent).toBe("Create a resource");

        // Close button exists
        expect(page.dialogClose).not.toBeNull();

        // Name input field exists.
        expect(page.name.value).toBe("");
        // Uri input field exists.
        expect(page.uri.value).toBe("");
        // Username input field exists.
        expect(page.username.value).toBe("");
        // Password input field exists
        expect(page.password).not.toBeNull();
        expect(page.password.value).toBe("");
        expect(page.password.getAttribute("type")).toBe("password");
        const passwordInputStyle = window.getComputedStyle(page.password);
        expect(passwordInputStyle.background).toBe("white");
        expect(passwordInputStyle.color).toBe("");

        // Complexity label exists but is not yet defined.
        expect(page.complexityText.textContent).toBe("Quality Entropy: 0.0 bits");

        // Password view button exists.
        expect(page.passwordViewButton).not.toBeNull();
        expect(page.passwordViewButton.classList.contains("eye-open")).toBe(true);
        expect(page.passwordViewButton.classList.contains("eye-close")).toBe(false);

        // Password generate button exists.
        expect(page.passwordGenerateButton).not.toBeNull();

        // Save button exists
        expect(page.saveButton.textContent).toBe("Create");

        // Cancel button exists
        expect(page.cancelButton.textContent).toBe("Cancel");
      });
    });

    describe("should select a resource form", () => {
      it('As a signed-in user I should be able to select description form', async() => {
        expect.assertions(5);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        // select description form
        await page.click(page.getSectionItem(2));
        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Description");
        expect(page.description).toBeDefined();
        expect(page.password).toBeNull();
      });
    });

    describe("should add a secret to a resource", () => {
      it('As a signed-in user I should be able to add secret without a resource type mutation', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretNote);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Note");
        expect(page.note).toBeDefined();
      });

      it('As a signed-in user I should be able to add secret with a resource type mutation', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");
        expect(page.note).toBeDefined();
      });

      it('As a signed-in user I should be able to add secret with a resource type mutation with a standalone totp', async() => {
        expect.assertions(2);

        const props = defaultTotpProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretPassword);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();
      });

      it('As a signed-in user I should be able to add secret totp for a resource v4 password string', async() => {
        expect.assertions(3);

        const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordStringDto()),});
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");
        expect(page.note).toBeDefined();
        expect(page.getSectionItem(4).hasAttribute("disabled")).toBeTruthy();
      });
    });

    describe("should delete a secret to a resource", () => {
      it('As a signed-in user I should be able to delete secret without a resource type mutation', async() => {
        expect.assertions(3);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretNote);

        expect(page.sectionItemSelected.textContent).toStrictEqual("Note");

        await page.click(page.deleteSecretNote);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();
      });

      it('As a signed-in user I should be able to delete secret with a resource type mutation', async() => {
        expect.assertions(3);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");

        await page.click(page.deleteSecretPassword);

        await page.click(page.getSectionItem(2));

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Description");
        expect(page.description).toBeDefined();
      });

      it('As a signed-in user I should be able to delete secret totp for a resource v4 password string', async() => {
        expect.assertions(4);

        const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordStringDto()),});
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");

        await page.click(page.deleteSecretTotp);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();
        expect(page.getSectionItem(3).hasAttribute("disabled")).toBeTruthy();
      });
    });

    describe("should init password form", () => {
      it('As a signed-in user I should be able to add an URI', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.uri, "https://passbolt.com");
        // expectations
        expect(page.uri.value).toBe("https://passbolt.com");
      });

      it('As a signed-in user I should be aware about the URI maxLength', async() => {
        expect.assertions(3);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        page.fillInput(page.uri, "a".repeat(1024));

        // expectations
        expect(page.uri.value).toEqual("a".repeat(1024));
        expect(page.uriWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.uriErrorMessage).toBeNull();
      });

      it('As a signed-in user I should be blocked if I exceed the URI maxLength', async() => {
        expect.assertions(5);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        page.uri.setAttribute("maxLength", 1025);
        page.fillInput(page.uri, "a".repeat(1025));

        // expectations
        expect(page.uri.value).toEqual("a".repeat(1025));
        expect(page.uriWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.uriErrorMessage).toBeNull();

        await page.click(page.saveButton);

        expect(page.uriWarningMessage).toBeNull();
        expect(page.uriErrorMessage.textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
      });

      it('As a signed-in user I should be able to add an username', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.username, "username");
        // expectations
        expect(page.username.value).toBe("username");
      });

      it('As a signed-in user I should be aware about the username maxLength', async() => {
        expect.assertions(3);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        page.fillInput(page.username, "a".repeat(255));

        // expectations
        expect(page.username.value).toEqual("a".repeat(255));
        expect(page.usernameWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.usernameErrorMessage).toBeNull();
      });

      it('As a signed-in user I should be blocked if I exceed the username maxLength', async() => {
        expect.assertions(5);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        page.username.setAttribute("maxLength", 256);
        page.fillInput(page.username, "a".repeat(256));

        // expectations
        expect(page.username.value).toEqual("a".repeat(256));
        expect(page.usernameWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.usernameErrorMessage).toBeNull();

        await page.click(page.saveButton);

        expect(page.usernameWarningMessage).toBeNull();
        expect(page.usernameErrorMessage.textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
      });
      it('As a signed-in user I should be able to add a password', async() => {
        expect.assertions(2);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.password, "secret");
        // expectations
        expect(page.password.value).toBe("secret");
      });

      it('As a signed-in user I should be aware about the password maxLength', async() => {
        expect.assertions(3);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        page.fillInput(page.password, "a".repeat(4096));

        // expectations
        expect(page.password.value).toEqual("a".repeat(4096));
        expect(page.passwordWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.passwordErrorMessage).toBeNull();
      });

      it('As a signed-in user I should be blocked if I exceed the password maxLength', async() => {
        expect.assertions(5);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        page.password.setAttribute("maxLength", 4097);
        page.fillInput(page.password, "a".repeat(4097));

        // expectations
        expect(page.password.value).toEqual("a".repeat(4097));
        expect(page.passwordWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.passwordErrorMessage).toBeNull();

        await page.click(page.saveButton);

        expect(page.passwordWarningMessage).toBeNull();
        expect(page.passwordErrorMessage.textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
      });
      it('As a signed-in user I should be able to generate a password', async() => {
        expect.assertions(5);

        const props = defaultProps();
        const page = new CreateResourcePage(props);
        jest.spyOn(SecretGenerator, "generate").mockImplementation(() => "generate-password");
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();
        expect(page.password.value).toBe("");

        await page.click(page.passwordGenerateButton);
        // expectations
        expect(page.password.value).toBe("generate-password");
        expect(page.complexityText.textContent).not.toBe("Quality Entropy: 0.0 bits");
        expect(page.progressBar.classList.contains("error")).toBe(false);
      });
    });

    describe("should add a name to resource", () => {
      let props, page;
      beforeEach(async() => {
        props = defaultProps();
        page = new CreateResourcePage(props);

        await waitFor(() => page.exists);
      });

      it('As a signed-in user I should be able to add name to a resource', async() => {
        expect.assertions(1);

        await page.fillInput(page.name, "name");

        // expectations
        expect(page.name.value).toEqual("name");
      });

      it('As a signed-in user I should be aware about the name maxLength', async() => {
        expect.assertions(3);
        page.fillInput(page.name, "a".repeat(255));

        // expectations
        expect(page.name.value).toEqual("a".repeat(255));
        expect(page.nameWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.nameErrorMessage).toBeNull();
      });

      it('As a signed-in user I should be blocked if I exceed the name maxLength', async() => {
        expect.assertions(5);

        page.name.setAttribute("maxLength", 256);
        page.fillInput(page.name, "a".repeat(256));

        // expectations
        expect(page.name.value).toEqual("a".repeat(256));
        expect(page.nameWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.nameErrorMessage).toBeNull();

        await page.click(page.saveButton);

        expect(page.nameWarningMessage).toBeNull();
        expect(page.nameErrorMessage.textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
      });
    });

    describe("should init description field", () => {
      let props, page;
      beforeEach(async() => {
        props = defaultProps();
        page = new CreateResourcePage(props);

        await waitFor(() => page.exists);
        await page.click(page.menuDescription);
      });


      it('As a signed-in user I should be able to add a description', async() => {
        expect.assertions(1);

        await page.fillInput(page.description, "description");
        // expectations
        expect(page.description.value).toBe("description");
      });

      it('As a signed-in user I should be aware about the description maxLength', async() => {
        expect.assertions(3);

        page.fillInput(page.description, "a".repeat(10000));

        // expectations
        expect(page.description.value).toEqual("a".repeat(10000));
        expect(page.descriptionWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.descriptionErrorMessage).toBeNull();
      });

      it('As a signed-in user I should be blocked if I exceed the description maxLength', async() => {
        expect.assertions(5);

        page.description.setAttribute("maxLength", 10001);
        page.fillInput(page.description, "a".repeat(10001));

        // expectations
        expect(page.description.value).toEqual("a".repeat(10001));
        expect(page.descriptionWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.descriptionErrorMessage).toBeNull();

        await page.click(page.saveButton);

        expect(page.descriptionWarningMessage).toBeNull();
        expect(page.descriptionErrorMessage.textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
      });

      it('As a signed-in user I should be able to convert a description to a note for a v4 password string', async() => {
        expect.assertions(2);

        const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordStringDto())});

        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.menuDescription);
        await page.fillInput(page.description, "description");
        await page.click(page.convertToNote);
        // expectations
        expect(page.sectionItemSelected.textContent).toBe("Note");
        expect(page.note.value).toBe("description");
      });
    });

    describe("should init totp form", () => {
      let props, page;
      beforeEach(() => {
        props = defaultTotpProps();
        page = new CreateResourcePage(props);
      });

      it('As a signed-in user I should be able to add an URI', async() => {
        expect.assertions(2);
        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.uri, "https://passbolt.com");
        // expectations
        expect(page.uri.value).toBe("https://passbolt.com");
      });

      it('As a signed-in user I should be aware about the URI maxLength', async() => {
        expect.assertions(3);

        page.fillInput(page.uri, "a".repeat(1024));

        // expectations
        expect(page.uri.value).toEqual("a".repeat(1024));
        expect(page.uriWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.uriErrorMessage).toBeNull();
      });

      it('As a signed-in user I should be blocked if I exceed the URI maxLength', async() => {
        expect.assertions(5);

        page.fillInput(page.uri, "a".repeat(1025));

        // expectations
        expect(page.uri.value).toEqual("a".repeat(1025));
        expect(page.uriWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.uriErrorMessage).toBeNull();

        await page.click(page.saveButton);

        expect(page.uriWarningMessage).toBeNull();
        expect(page.uriErrorMessage.textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
      });

      it('As a signed-in user I should be able to add a resource totp key', async() => {
        expect.assertions(3);

        expect(page.resourceTotpCode.hasAttribute("disabled")).toBeTruthy();

        await page.fillInput(page.resourceTotpKey, "JBSWY3DPEHPK3PXP");
        // expectations
        expect(page.resourceTotpKey.value).toBe("JBSWY3DPEHPK3PXP");
        expect(page.resourceTotpCode.hasAttribute("disabled")).toBeFalsy();
      });

      it('As a signed-in user I should see an error message when totp key is empty', async() => {
        expect.assertions(1);

        await page.click(page.saveButton);
        // expectations
        expect(page.resourceTotpKeyErrorMessage.textContent).toBe("The key is required.");
      });

      it('As a signed-in user I should see an error message when totp key does not respect pattern', async() => {
        expect.assertions(1);

        await page.fillInput(page.resourceTotpKey, "key");

        await page.click(page.saveButton);
        // expectations
        expect(page.resourceTotpKeyErrorMessage.textContent).toBe("The key is not valid.");
      });

      it('As a signed-in user I should be able to add a totp expiry', async() => {
        expect.assertions(1);

        await page.click(page.advancedSettings);
        await page.fillInput(page.period, "60");

        // expectations
        expect(page.period.value).toBe("60");
      });

      it('As a signed-in user I should see an error message when period is empty', async() => {
        expect.assertions(1);

        await page.click(page.advancedSettings);
        page.period.setAttribute("type", "string");
        await page.fillInput(page.period, "");
        await page.click(page.saveButton);

        // expectations
        expect(page.resourceTotpPeriodErrorMessage.textContent).toBe("TOTP expiry is required.");
      });

      it('As a signed-in user I should see an error message when period is less than 0', async() => {
        expect.assertions(1);

        await page.click(page.advancedSettings);
        await page.fillInput(page.period, "-1");

        await page.click(page.saveButton);

        // expectations
        expect(page.resourceTotpPeriodErrorMessage.textContent).toBe("TOTP expiry must be greater than 0.");
      });

      it('As a signed-in user I should be able to add a totp length', async() => {
        expect.assertions(1);

        await page.click(page.advancedSettings);
        await page.fillInput(page.digits, "8");

        // expectations
        expect(page.digits.value).toBe("8");
      });
      it('As a signed-in user I should see an error message when length is empty', async() => {
        expect.assertions(1);

        await page.click(page.advancedSettings);
        page.digits.setAttribute("type", "string");
        await page.fillInput(page.digits, "");
        await page.click(page.saveButton);

        // expectations
        expect(page.resourceTotpDigitsErrorMessage.textContent).toBe("TOTP length is required.");
      });
      it('As a signed-in user I should see an error message when length is less than 6', async() => {
        expect.assertions(1);

        await page.click(page.advancedSettings);
        await page.fillInput(page.digits, "5");
        await page.click(page.saveButton);

        // expectations
        expect(page.resourceTotpDigitsErrorMessage.textContent).toBe("TOTP length must be between 6 and 8.");
      });

      it('As a signed-in user I should see an error message when length is more than 8', async() => {
        expect.assertions(1);

        await page.click(page.advancedSettings);
        await page.fillInput(page.digits, "9");
        await page.click(page.saveButton);

        // expectations
        expect(page.resourceTotpDigitsErrorMessage.textContent).toBe("TOTP length must be between 6 and 8.");
      });
      it('As a signed-in user I should be able to select an algorithm', async() => {
        expect.assertions(1);

        await page.click(page.advancedSettings);
        await page.click(page.algorithm);
        await page.click(page.firstItemOption);
        // expectations
        expect(page.algorithm.textContent).toBe("SHA256");
      });

      it('As a signed-in user I should be able to copy a resource totp from totp code', async() => {
        expect.assertions(2);

        await page.fillInput(page.resourceTotpKey, "key");
        await page.click(page.resourceTotpCode);
        // expectations
        expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
        expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
      });

      it('As a signed-in user I should be able to copy a resource totp from totp button', async() => {
        expect.assertions(3);

        const props = defaultTotpProps();
        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.resourceTotpKey, "key");
        await page.click(page.copyTotpButton);

        // expectations
        expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
        expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
      });
    });
    describe("should fill note form", () => {
      let props, page;
      beforeEach(async() => {
        props = defaultProps();
        page = new CreateResourcePage(props);

        await waitFor(() => page.exists);
        await page.click(page.addSecret);
        await page.click(page.addSecretNote);
      });

      it('As a signed-in user I should be able to add a note', async() => {
        expect.assertions(1);

        await page.fillInput(page.note, "note");
        // expectations
        expect(page.note.value).toBe("note");
      });


      it('As a signed-in user I should be aware about the note maxLength', async() => {
        expect.assertions(3);

        await page.fillInput(page.note, "a".repeat(10000));

        // expectations
        expect(page.note.value).toEqual("a".repeat(10000));
        expect(page.noteWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.noteErrorMessage).toBeNull();
      });

      it('As a signed-in user I should be blocked if I exceed the note maxLength', async() => {
        expect.assertions(5);

        await page.fillInput(page.note, "a".repeat(10001));

        // expectations
        expect(page.note.value).toEqual("a".repeat(10001));
        expect(page.noteWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.noteErrorMessage).toBeNull();

        await page.click(page.saveButton);

        expect(page.noteWarningMessage).toBeNull();
        expect(page.noteErrorMessage.textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
      });

      it('As a signed-in user I should be able to convert a note to a description for a v4 default', async() => {
        expect.assertions(2);

        const props = defaultProps({resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto())});

        const page = new CreateResourcePage(props);
        await waitFor(() => {});

        await page.click(page.getSectionItem(2));
        await page.fillInput(page.note, "note");

        await page.click(page.convertToDescription);

        // expectations
        expect(page.sectionItemSelected.textContent).toBe("Description");
        expect(page.description.value).toBe("note");
      });
    });
  });

  describe("Close dialog", () => {
    it('As LU I can stop creating a password by clicking on the cancel button', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new CreateResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.click(page.cancelButton);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('As LU I can stop creating a password by closing the dialog', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new CreateResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.click(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('As LU I can stop adding a password with the keyboard (escape)', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      const page = new CreateResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.escapeKey(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});

