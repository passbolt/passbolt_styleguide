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
 * Unit tests on EditResource in regard of specifications
 */
import "../../../test/lib/crypto/cryptoGetRandomvalues";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import {defaultProps} from "./EditResource.test.data";
import EditResourcePage from "./EditResource.test.page";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";

describe("See the Edit Resource", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  const resource = props.context.resources[0];

  const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";

  describe('As LU I can start adding a password', () => {
    const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
    /**
     * I should see the edit password dialog
     */
    beforeEach(() => {
      jest.useFakeTimers();
      jest.resetModules();
      page = new EditResourcePage(props);
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('matches the styleguide', () => {
      // Dialog title exists and correct
      expect(page.passwordEdit.exists()).toBeTruthy();
      expect(page.title.header.textContent).toBe("Edit resource");
      expect(page.title.subtitle.textContent).toBe(resource.name);

      // Close button exists
      expect(page.passwordEdit.dialogClose).not.toBeNull();

      // Name input field exists.
      expect(page.passwordEdit.name.value).toBe(resource.name);
      // Uri input field exists.
      expect(page.passwordEdit.uri.value).toBe(resource.uri);
      // Username input field exists.
      expect(page.passwordEdit.username.value).toBe(resource.username);
      // Password input field exists
      expect(page.passwordEdit.password).not.toBeNull();
      expect(page.passwordEdit.password.value).toBe("");
      expect(page.passwordEdit.password.getAttribute("type")).toBe("password");
      const passwordInputStyle = window.getComputedStyle(page.passwordEdit.password);
      expect(passwordInputStyle.background).toBe("white");
      expect(passwordInputStyle.color).toBe("");

      // Complexity label exists but is not yet defined.
      expect(page.passwordEdit.complexityText.textContent).toBe("Quality");

      // Password view button exists.
      expect(page.passwordEdit.passwordViewButton).not.toBeNull();
      expect(page.passwordEdit.passwordViewButton.classList.contains("eye-open")).toBe(true);
      expect(page.passwordEdit.passwordViewButton.classList.contains("eye-close")).toBe(false);

      // Password generate button exists.
      expect(page.passwordEdit.passwordGenerateButton).not.toBeNull();

      // Description textarea field exists
      expect(page.passwordEdit.description.value).toBe(resource.description);

      // Save button exists
      expect(page.passwordEdit.saveButton.textContent).toBe("Save");

      // Cancel button exists
      expect(page.passwordEdit.cancelButton.textContent).toBe("Cancel");
    });

    it('generates password when clicking on the generate button.', async() => {
      page.passwordEdit.focusInput(page.passwordEdit.password);
      await waitFor(() => {
        expect(page.passwordEdit.password.disabled).toBeFalsy();
      });

      await page.passwordEdit.click(page.passwordEdit.passwordGenerateButton);
      await waitFor(() => {
        expect(page.passwordEdit.complexityText.textContent).not.toBe("n/a (entropy: 0.0 bits)");
      });

      expect(page.passwordEdit.progressBar.classList.contains("not_available")).toBe(false);
    });

    it('views password when clicking on the view button.', async() => {
      const passwordValue = "secret-decrypted";
      // View password
      await waitFor(() => {
        expect(page.passwordEdit.password.disabled).toBeFalsy();
      });
      await page.passwordEdit.click(page.passwordEdit.passwordViewButton);
      expect(page.passwordEdit.password.value).toBe(passwordValue);
      let passwordInputType = page.passwordEdit.password.getAttribute("type");
      expect(passwordInputType).toBe("text");
      expect(page.passwordEdit.passwordViewButton.classList.contains("eye-open")).toBe(false);
      expect(page.passwordEdit.passwordViewButton.classList.contains("eye-close")).toBe(true);

      // Hide password
      await page.passwordEdit.click(page.passwordEdit.passwordViewButton);
      expect(page.passwordEdit.password.value).toBe(passwordValue);
      passwordInputType = page.passwordEdit.password.getAttribute("type");
      expect(passwordInputType).toBe("password");
      expect(page.passwordEdit.passwordViewButton.classList.contains("eye-open")).toBe(true);
      expect(page.passwordEdit.passwordViewButton.classList.contains("eye-close")).toBe(false);
    });

    it('requests the addon to edit a resource with encrypted description when clicking on the submit button.', async() => {
      //Avoid to block with the beforeMount when checking current password
      jest.runAllTimers();
      // edit password
      const resourceMeta = {
        name: "Password name",
        uri: "https://uri.dev",
        username: "Password username",
        password: "password-value12345",
        description: "Password description"
      };
      // Fill the form
      page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);
      page.passwordEdit.fillInput(page.passwordEdit.uri, resourceMeta.uri);
      page.passwordEdit.fillInput(page.passwordEdit.username, resourceMeta.username);
      page.passwordEdit.focusInput(page.passwordEdit.password);
      await waitFor(() => {
        expect(page.passwordEdit.password.disabled).toBeTruthy();
      });
      await page.passwordEdit.fillInputPassword(resourceMeta.password);
      await page.passwordEdit.blurInput(page.passwordEdit.password);

      expect(page.passwordEdit.complexityText.textContent).not.toBe("Quality");
      expect(page.passwordEdit.progressBar.classList.contains("error")).toBe(false);

      page.passwordEdit.fillInput(page.passwordEdit.description, resourceMeta.description);

      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      jest.spyOn(props.context.port, 'emit').mockImplementation(jest.fn());
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const onApiUpdateResourceMeta = {
        id: resource.id,
        name: resourceMeta.name,
        uri: resourceMeta.uri,
        username: resourceMeta.username,
        description: "",
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
      };
      const onApiUpdateSecretDto = {
        password: resourceMeta.password,
        description: resourceMeta.description
      };

      await page.passwordEdit.click(page.passwordEdit.saveButton);
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, onApiUpdateSecretDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.context.port.emit).toHaveBeenNthCalledWith(1, "passbolt.resources.select-and-scroll-to", resource.id);
      expect(props.onClose).toBeCalled();
    });

    xit('requests the addon to edit a resource with non encrypted description when clicking on the submit button.', async() => {
      expect(page.passwordEdit.exists()).toBeTruthy();
      // edit password
      const resourceMeta = {
        name: "Password name",
        uri: "https://uri.dev",
        username: "Password username",
        password: "password-value",
        description: "Password description"
      };
      // Fill the form
      page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);
      page.passwordEdit.fillInput(page.passwordEdit.uri, resourceMeta.uri);
      page.passwordEdit.fillInput(page.passwordEdit.username, resourceMeta.username);
      page.passwordEdit.focusInput(page.passwordEdit.password);
      await waitFor(() => {
        expect(page.passwordEdit.password.classList).toContain("decrypted");
      });
      page.passwordEdit.fillInput(page.passwordEdit.password, resourceMeta.password);
      page.passwordEdit.blurInput(page.passwordEdit.password);
      expect(page.passwordEdit.complexityText.textContent).not.toBe("Complexity: n/aEntropy: NaN bits");
      expect(page.passwordEdit.progressBar.classList.contains("not_available")).toBe(false);
      page.passwordEdit.fillInput(page.passwordEdit.description, resourceMeta.description);
      await page.passwordEdit.click(page.passwordEdit.descriptionEncryptedLock);

      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      jest.spyOn(props.context.port, 'emit').mockImplementation(jest.fn());
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const onApiUpdateResourceDto = {
        id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
        name: resourceMeta.name,
        uri: resourceMeta.uri,
        username: resourceMeta.username,
        description: '',
        resource_type_id: "a28a04cd-6f53-518a-967c-9963bf9cec51"
      };
      const onApiUpdateSecretDto = {
        description: resourceMeta.description,
        password: resourceMeta.password
      };

      await page.passwordEdit.click(page.passwordEdit.saveButton);

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceDto, onApiUpdateSecretDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.context.port.emit).toHaveBeenNthCalledWith(1, "passbolt.resources.select-and-scroll-to", "8e3874ae-4b40-590b-968a-418f704b9d9a");
      expect(props.onClose).toBeCalled();
    });

    xit("As LU I shouldn't be able to submit the form if there is an invalid field", async() => {
      expect(page.passwordEdit.exists()).toBeTruthy();
      // empty the form
      page.passwordEdit.fillInput(page.passwordEdit.name, "");
      page.passwordEdit.focusInput(page.passwordEdit.password);
      await waitFor(() => {
        expect(page.passwordEdit.password.classList).toContain("decrypted");
      });
      await page.passwordEdit.fillInputPassword("");
      page.passwordEdit.blurInput(page.passwordEdit.password);
      await page.passwordEdit.click(page.passwordEdit.saveButton);

      // Throw error message
      expect(page.passwordEdit.nameErrorMessage.textContent).toBe("A name is required.");
      expect(page.passwordEdit.passwordErrorMessage.textContent).toBe("A password is required.");
    });

    it('As LU I can stop editing a password by clicking on the cancel button', async() => {
      expect(page.passwordEdit.exists()).toBeTruthy();
      await page.passwordEdit.click(page.passwordEdit.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop editing a password by closing the dialog', async() => {
      expect(page.passwordEdit.exists()).toBeTruthy();
      await page.passwordEdit.click(page.passwordEdit.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop adding a password with the keyboard (escape)', async() => {
      expect(page.passwordEdit.exists()).toBeTruthy();
      await page.passwordEdit.escapeKey(page.passwordEdit.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    xit('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      // Mock the request function to make it return an error.
      page.passwordEdit.focusInput(page.passwordEdit.password);
      await waitFor(() => {
        expect(page.passwordEdit.password.classList).toContain("decrypted");
      });
      await page.passwordEdit.fillInputPassword("password");
      page.passwordEdit.blurInput(page.passwordEdit.password);

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.passwordEdit.click(page.passwordEdit.saveButton);

      // Throw general error message
      expect(page.passwordEdit.errorDialog).not.toBeNull();
      expect(page.passwordEdit.errorDialogMessage).not.toBeNull();
    });

    xit('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      page.passwordEdit.focusInput(page.passwordEdit.password);
      await waitFor(() => {
        expect(page.passwordEdit.password.classList).toContain("decrypted");
      });
      await page.passwordEdit.fillInputPassword("password");
      page.passwordEdit.blurInput(page.passwordEdit.password);

      // Mock the request function to make it the expected result
      mockContextRequest(requestMockImpl);
      page.passwordEdit.clickWithoutWaitFor(page.passwordEdit.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.passwordEdit.name.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.uri.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.username.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.password.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.saveButton.className).toBe("button primary disabled processing");
        expect(page.passwordEdit.cancelButton.className).toBe("cancel disabled");
        updateResolve();
      });
    });

    it('As LU I should access to the password generator dialog', async() => {
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn);
      await page.passwordEdit.openPasswordGenerator();
      expect(props.dialogContext.open).toBeCalled();
    });

    it("As a user I should see a feedback when the password, descriptions, name, username or uri fields content is truncated by a field limit", async() => {
      expect.assertions(5);
      await page.passwordEdit.fillInputPassword('a'.repeat(4097));
      page.passwordEdit.fillInput(page.passwordEdit.description, 'a'.repeat(10000));
      page.passwordEdit.fillInput(page.passwordEdit.name, 'a'.repeat(256));
      page.passwordEdit.fillInput(page.passwordEdit.username, 'a'.repeat(255));
      page.passwordEdit.fillInput(page.passwordEdit.uri, 'a'.repeat(1025));

      await page.passwordEdit.keyUpInput(page.passwordEdit.password);
      await page.passwordEdit.keyUpInput(page.passwordEdit.description);
      await page.passwordEdit.keyUpInput(page.passwordEdit.username);
      await page.passwordEdit.keyUpInput(page.passwordEdit.name);
      await page.passwordEdit.keyUpInput(page.passwordEdit.uri);

      expect(page.passwordEdit.passwordWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.passwordEdit.descriptionWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.passwordEdit.nameWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.passwordEdit.uriWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.passwordEdit.usernameWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });

    it("As a signed-in user editing a password on the application, I should get warn when I enter a pwned password and not be blocked", async() => {
      expect.assertions(2);

      const props = defaultProps();
      props.context.setContext({
        passwordEditDialogProps: {
          id: "8e3874ae-4b40-590b-968a-418f704b9d9a"
        }
      });

      const waitForTrue = async callback => waitFor(() => {
        if (!callback()) {
          throw new Error("Page is not ready yet!");
        }
      });

      props.context.port.addRequestListener("passbolt.secrets.powned-password", () => Promise.resolve(2));

      const page = new EditResourcePage(props);
      await waitForTrue(() => page.passwordEdit.password.disabled);

      // we expect a warning to inform about powned password
      await page.passwordEdit.fillInputPassword('hello-world');
      await waitForTrue(() => page.passwordEdit.pwnedWarningMessage);
      const exposedPasswordMessage = "The password is part of an exposed data breach.";
      expect(page.passwordEdit.pwnedWarningMessage.textContent).toEqual(exposedPasswordMessage);

      // we expect a warning to inform about a network issue
      props.context.port.addRequestListener("passbolt.secrets.powned-password", () => Promise.reject());
      await page.passwordEdit.fillInputPassword('another test');
      await waitForTrue(() => page.passwordEdit.pwnedWarningMessage !== exposedPasswordMessage);
      expect(page.passwordEdit.pwnedWarningMessage.textContent).toEqual("The pwnedpasswords service is unavailable, your password might be part of an exposed data breach");
    });

    it("As a signed-in user editing a password on the application, I should see a complexity as Quality if the passphrase is empty", async() => {
      expect.assertions(2);

      await page.passwordEdit.fillInputPassword("");
      await waitFor(() => {});
      expect(page.passwordEdit.pwnedWarningMessage).toBeNull();
      expect(page.passwordEdit.complexityText.textContent).toBe("Quality");
    });
  });
});
