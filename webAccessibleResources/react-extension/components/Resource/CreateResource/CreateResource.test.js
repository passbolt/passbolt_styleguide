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
 * Unit tests on CreateResource in regard of specifications
 */
import "../../../test/lib/crypto/cryptoGetRandomvalues";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import {defaultAppContext, defaultProps} from "./CreateResource.test.data";
import CreateResourcePage from "./CreateResource.test.page";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, TEST_RESOURCE_TYPE_PASSWORD_STRING
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";

describe("See the Create Resource", () => {
  let page, props, context;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    context = defaultAppContext(); // The applicative context
    props = defaultProps(); // The props to pass
    props.onClose = jest.fn();
    props.dialogContext.open = jest.fn();
    const resourceCreateDialogProps = {
      folderParentId: null
    };

    context.setContext({resourceCreateDialogProps});
    page = new CreateResourcePage(context, props);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementationOnce(implementation);
  const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";
  describe('As LU I can start adding a password', () => {
    it('matches the styleguide', () => {
      expect.assertions(19);
      // Dialog title exists and correct
      expect(page.passwordCreate.exists()).toBeTruthy();
      expect(page.title.header.textContent).toBe("Create a password");

      // Close button exists
      expect(page.passwordCreate.dialogClose).not.toBeNull();

      // Name input field exists.
      expect(page.passwordCreate.name.value).toBe("");
      // Uri input field exists.
      expect(page.passwordCreate.uri.value).toBe("");
      // Username input field exists.
      expect(page.passwordCreate.username.value).toBe("");
      // Password input field exists
      expect(page.passwordCreate.password).not.toBeNull();
      expect(page.passwordCreate.password.value).toBe("");
      expect(page.passwordCreate.password.getAttribute("type")).toBe("password");
      const passwordInputStyle = window.getComputedStyle(page.passwordCreate.password);
      expect(passwordInputStyle.background).toBe("white");
      expect(passwordInputStyle.color).toBe("");

      // Complexity label exists but is not yet defined.
      expect(page.passwordCreate.complexityText.textContent).toBe("Quality");

      // Password view button exists.
      expect(page.passwordCreate.passwordViewButton).not.toBeNull();
      expect(page.passwordCreate.passwordViewButton.classList.contains("eye-open")).toBe(true);
      expect(page.passwordCreate.passwordViewButton.classList.contains("eye-close")).toBe(false);

      // Password generate button exists.
      expect(page.passwordCreate.passwordGenerateButton).not.toBeNull();

      // Description textarea field exists
      expect(page.passwordCreate.description.value).toBe("");

      // Save button exists
      expect(page.passwordCreate.saveButton.textContent).toBe("Create");

      // Cancel button exists
      expect(page.passwordCreate.cancelButton.textContent).toBe("Cancel");
    });

    it('generates password when clicking on the generate button.', async() => {
      expect.assertions(2);
      page.passwordCreate.focusInput(page.passwordCreate.password);
      await page.passwordCreate.click(page.passwordCreate.passwordGenerateButton);
      expect(page.passwordCreate.complexityText.textContent).not.toBe("Quality");
      expect(page.passwordCreate.progressBar.classList.contains("error")).toBe(false);
    });

    it('views password when clicking on the view button.', async() => {
      expect.assertions(8);
      mockContextRequest(() => Promise(0));
      const passwordValue = "secret-decrypted";
      await page.passwordCreate.fillInputPassword(passwordValue);

      // View password
      await page.passwordCreate.click(page.passwordCreate.passwordViewButton);
      expect(page.passwordCreate.password.value).toBe(passwordValue);
      let passwordInputType = page.passwordCreate.password.getAttribute("type");
      expect(passwordInputType).toBe("text");
      expect(page.passwordCreate.passwordViewButton.classList.contains("eye-open")).toBe(false);
      expect(page.passwordCreate.passwordViewButton.classList.contains("eye-close")).toBe(true);

      // Hide password
      await page.passwordCreate.click(page.passwordCreate.passwordViewButton);
      expect(page.passwordCreate.password.value).toBe(passwordValue);
      passwordInputType = page.passwordCreate.password.getAttribute("type");
      expect(passwordInputType).toBe("password");
      expect(page.passwordCreate.passwordViewButton.classList.contains("eye-open")).toBe(true);
      expect(page.passwordCreate.passwordViewButton.classList.contains("eye-close")).toBe(false);
    });

    it('requests the addon to create a resource with encrypted description when clicking on the submit button.', async() => {
      expect.assertions(7);
      expect(page.passwordCreate.exists()).toBeTruthy();
      const createdResourceId = "f2b4047d-ab6d-4430-a1e2-3ab04a2f4fb9";
      // create password
      const resourceMeta = {
        name: "Password name",
        uri: "https://uri.dev",
        username: "Password username",
        password: "password-value",
        description: "Password description"
      };
      // Fill the form
      page.passwordCreate.fillInput(page.passwordCreate.name, resourceMeta.name);
      page.passwordCreate.fillInput(page.passwordCreate.uri, resourceMeta.uri);
      page.passwordCreate.fillInput(page.passwordCreate.username, resourceMeta.username);
      await page.passwordCreate.fillInputPassword(resourceMeta.password);

      expect(page.passwordCreate.complexityText.textContent).not.toBe("Complexity: n/aEntropy: NaN bits");
      expect(page.passwordCreate.progressBar.classList.contains("not_available")).toBe(false);
      page.passwordCreate.fillInput(page.passwordCreate.description, resourceMeta.description);
      await page.passwordCreate.click(page.passwordCreate.descriptionEncryptedLock);

      const requestMockImpl = jest.fn((message, data) => Object.assign({id: createdResourceId}, data));
      mockContextRequest(requestMockImpl);
      jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const onApiUpdateResourceMeta = {
        folder_parent_id: null,
        name: resourceMeta.name,
        uri: resourceMeta.uri,
        username: resourceMeta.username,
        description: resourceMeta.description,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING
      };

      await page.passwordCreate.click(page.passwordCreate.saveButton);
      await waitFor(() => {});
      expect(context.port.request).toHaveBeenCalledWith("passbolt.resources.create", onApiUpdateResourceMeta, resourceMeta.password);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(context.port.emit).toHaveBeenNthCalledWith(1, "passbolt.resources.select-and-scroll-to", createdResourceId);
      expect(props.onClose).toBeCalled();
    });

    it('requests the addon to create a resource with non encrypted description when clicking on the submit button.', async() => {
      expect.assertions(7);
      expect(page.passwordCreate.exists()).toBeTruthy();
      const createdResourceId = "f2b4047d-ab6d-4430-a1e2-3ab04a2f4fb9";
      // create password
      const resourceMeta = {
        name: "Password name",
        uri: "https://uri.dev",
        username: "Password username",
        password: "password-value",
        description: "Password description"
      };
      // Fill the form
      page.passwordCreate.fillInput(page.passwordCreate.name, resourceMeta.name);
      page.passwordCreate.fillInput(page.passwordCreate.uri, resourceMeta.uri);
      page.passwordCreate.fillInput(page.passwordCreate.username, resourceMeta.username);
      await page.passwordCreate.fillInputPassword(resourceMeta.password);
      expect(page.passwordCreate.complexityText.textContent).not.toBe("Complexity: n/aEntropy: NaN bits");
      expect(page.passwordCreate.progressBar.classList.contains("not_available")).toBe(false);
      page.passwordCreate.fillInput(page.passwordCreate.description, resourceMeta.description);

      const requestMockImpl = jest.fn((message, data) => Object.assign({id: createdResourceId}, data));
      mockContextRequest(requestMockImpl);
      jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const onApiUpdateResourceDto = {
        folder_parent_id: null,
        name: resourceMeta.name,
        uri: resourceMeta.uri,
        username: resourceMeta.username,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
      };
      const onApiUpdateSecretDto = {
        description: resourceMeta.description,
        password: resourceMeta.password
      };

      await page.passwordCreate.click(page.passwordCreate.saveButton);

      expect(context.port.request).toHaveBeenCalledWith("passbolt.resources.create", onApiUpdateResourceDto, onApiUpdateSecretDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(context.port.emit).toHaveBeenNthCalledWith(1, "passbolt.resources.select-and-scroll-to", createdResourceId);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I shouldn’t be able to submit the form if there is an invalid field', async() => {
      expect.assertions(3);
      expect(page.passwordCreate.exists()).toBeTruthy();
      await page.passwordCreate.click(page.passwordCreate.saveButton);

      // Throw error message
      expect(page.passwordCreate.nameErrorMessage.textContent).toBe("A name is required.");
      expect(page.passwordCreate.passwordErrorMessage.textContent).toBe("A password is required.");
    });

    it('As LU I can stop createing a password by clicking on the cancel button', async() => {
      expect.assertions(2);
      expect(page.passwordCreate.exists()).toBeTruthy();
      await page.passwordCreate.click(page.passwordCreate.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      page.passwordCreate.fillInput(page.passwordCreate.name, "name");
      await page.passwordCreate.fillInputPassword("password");

      // Mock the request function to make it the expected result
      mockContextRequest(requestMockImpl);
      page.passwordCreate.clickWithoutWaitFor(page.passwordCreate.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.passwordCreate.name.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordCreate.uri.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordCreate.username.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordCreate.password.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordCreate.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordCreate.saveButton.className).toBe("button primary disabled processing");
        expect(page.passwordCreate.cancelButton.className).toBe("link cancel");
        updateResolve();
      });
    });

    it('As LU I can stop createing a password by closing the dialog', async() => {
      expect.assertions(2);
      expect(page.passwordCreate.exists()).toBeTruthy();
      await page.passwordCreate.click(page.passwordCreate.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop adding a password with the keyboard (escape)', async() => {
      expect.assertions(2);
      expect(page.passwordCreate.exists()).toBeTruthy();
      await page.passwordCreate.escapeKey(page.passwordCreate.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      expect.assertions(1);
      // Mock the request function to make it return an error.
      page.passwordCreate.fillInput(page.passwordCreate.name, "name");
      await page.passwordCreate.fillInputPassword("password");

      const error = new PassboltApiFetchError("Jest simulate API error.");
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw error;
      });
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn);

      await page.passwordCreate.click(page.passwordCreate.saveButton);

      // Throw general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });

    it('As LU I should access to the password generator dialog', async() => {
      expect.assertions(1);
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn);
      await page.passwordCreate.openPasswordGenerator();
      expect(props.dialogContext.open).toBeCalled();
    });

    it('As LU I should access to the password generator dialog', async() => {
      expect.assertions(1);
      await page.passwordCreate.openPasswordGenerator();
      expect(page.passwordCreate.passwordGeneratorDialog).not.toBeNull();
    });

    it("As a user I should see a feedback when the password, descriptions, name, username or uri fields content is truncated by a field limit", async() => {
      expect.assertions(5);
      page.passwordCreate.fillInput(page.passwordCreate.password, 'a'.repeat(4097));
      page.passwordCreate.fillInput(page.passwordCreate.description, 'a'.repeat(10000));
      page.passwordCreate.fillInput(page.passwordCreate.name, 'a'.repeat(256));
      page.passwordCreate.fillInput(page.passwordCreate.username, 'a'.repeat(255));
      page.passwordCreate.fillInput(page.passwordCreate.uri, 'a'.repeat(1025));

      await page.passwordCreate.keyUpInput(page.passwordCreate.password);
      await page.passwordCreate.keyUpInput(page.passwordCreate.description);
      await page.passwordCreate.keyUpInput(page.passwordCreate.username);
      await page.passwordCreate.keyUpInput(page.passwordCreate.name);
      await page.passwordCreate.keyUpInput(page.passwordCreate.uri);

      expect(page.passwordCreate.passwordWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.passwordCreate.descriptionWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.passwordCreate.nameWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.passwordCreate.uriWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.passwordCreate.usernameWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });

    it("As a signed-in user creating a password on the application, I should get warn when I enter a pwned password and not be blocked", async() => {
      expect.assertions(2);

      mockContextRequest(() => Promise.resolve(2));
      await page.passwordCreate.fillInputPassword('hello-world');
      // we expect a warning to inform about powned password
      await waitFor(() => {});
      expect(page.passwordCreate.pwnedWarningMessage.textContent).toEqual("The password is part of an exposed data breach.");
      mockContextRequest(() => Promise.reject());
      await page.passwordCreate.fillInputPassword('another test');
      // we expect a warning to inform about a network issue
      await waitFor(() => {});
      expect(page.passwordCreate.pwnedWarningMessage.textContent).toEqual("The pwnedpasswords service is unavailable, your password might be part of an exposed data breach");
    });

    it("As a signed-in user creating a password on the application, I should see a complexity as Quality if the passphrase is empty", async() => {
      expect.assertions(2);

      page.passwordCreate.fillInput(page.passwordCreate.password, '');
      await page.passwordCreate.keyUpInput(page.passwordCreate.password);

      expect(page.passwordCreate.complexityText.textContent).toBe("Quality");
      expect(page.passwordCreate.pwnedWarningMessage).toBeNull();
    });
  });
});

