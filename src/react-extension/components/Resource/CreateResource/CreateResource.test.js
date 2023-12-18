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
import {defaultAppContext, defaultProps, defaultResourceMeta} from "./CreateResource.test.data";
import CreateResourcePage from "./CreateResource.test.page";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, TEST_RESOURCE_TYPE_PASSWORD_STRING
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import {TotpWorkflowMode} from "../HandleTotpWorkflow/HandleTotpWorkflowMode";
import HandleTotpWorkflow from "../HandleTotpWorkflow/HandleTotpWorkflow";
import TotpViewModel from "../../../../shared/models/totp/TotpViewModel";
import {defaultTotpViewModelDto} from "../../../../shared/models/totp/TotpDto.test.data";
import {formatDateForApi} from "../../../../shared/utils/dateUtils";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";
import {defaultPasswordExpirySettingsEntityDto, overridenPasswordExpirySettingsEntityDto} from "../../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";
import {DateTime} from "luxon";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import {defaultProSiteSettings} from "../../../test/fixture/Settings/siteSettings.test.data";

describe("See the Create Resource", () => {
  let page, props, context;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    context = defaultAppContext(); // The applicative context
    props = defaultProps(); // The props to pass
    props.onClose = jest.fn();
    props.dialogContext.open = jest.fn();

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

    it('Add, edit and delete a totp.', async() => {
      expect.assertions(9);

      const totp = new TotpViewModel(defaultTotpViewModelDto());
      jest.spyOn(props.workflowContext, "start").mockImplementationOnce((component, props) => props.onApply(totp));

      expect(page.passwordCreate.editTotpButton).toBeNull();
      expect(page.passwordCreate.deleteTotpButton).toBeNull();

      await page.passwordCreate.click(page.passwordCreate.addTotpButton);

      expect(props.workflowContext.start).toHaveBeenCalledWith(HandleTotpWorkflow, {mode: TotpWorkflowMode.ADD_TOTP, onApply: expect.any(Function)});
      expect(page.passwordCreate.editTotpButton).not.toBeNull();
      expect(page.passwordCreate.deleteTotpButton).not.toBeNull();

      await page.passwordCreate.click(page.passwordCreate.editTotpButton);
      expect(props.workflowContext.start).toHaveBeenCalledWith(HandleTotpWorkflow, {mode: TotpWorkflowMode.EDIT_TOTP, totp: totp, onApply: expect.any(Function)});

      await page.passwordCreate.click(page.passwordCreate.deleteTotpButton);
      expect(page.passwordCreate.addTotpButton).not.toBeNull();
      expect(page.passwordCreate.editTotpButton).toBeNull();
      expect(page.passwordCreate.deleteTotpButton).toBeNull();
    });

    it('requests the addon to create a resource with encrypted description when clicking on the submit button.', async() => {
      expect.assertions(6);
      expect(page.passwordCreate.exists()).toBeTruthy();
      const createdResourceId = "f2b4047d-ab6d-4430-a1e2-3ab04a2f4fb9";
      // create password
      const resourceMeta = defaultResourceMeta();
      const resourcePassword = "password-value";

      // Fill the form
      page.passwordCreate.fillInput(page.passwordCreate.name, resourceMeta.name);
      page.passwordCreate.fillInput(page.passwordCreate.uri, resourceMeta.uri);
      page.passwordCreate.fillInput(page.passwordCreate.username, resourceMeta.username);
      page.passwordCreate.fillInput(page.passwordCreate.description, resourceMeta.description);
      await page.passwordCreate.click(page.passwordCreate.descriptionEncryptedLock);

      await page.passwordCreate.fillInputPassword(resourcePassword);
      expect(page.passwordCreate.complexityText.textContent).not.toBe("Complexity: n/aEntropy: NaN bits");
      expect(page.passwordCreate.progressBar.classList.contains("not_available")).toBe(false);

      const requestMockImpl = jest.fn((message, data) => Object.assign({id: createdResourceId}, data));
      mockContextRequest(requestMockImpl);
      jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const onApiUpdateResourceMeta = defaultResourceMeta({
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        expired: null,
        ...resourceMeta
      });

      await page.passwordCreate.click(page.passwordCreate.saveButton);
      await waitFor(() => {});
      expect(context.port.request).toHaveBeenCalledWith("passbolt.resources.create", onApiUpdateResourceMeta, resourcePassword);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toBeCalled();
    });

    it('requests the addon to create a resource with non encrypted description when clicking on the submit button.', async() => {
      expect.assertions(6);
      expect(page.passwordCreate.exists()).toBeTruthy();
      const createdResourceId = "f2b4047d-ab6d-4430-a1e2-3ab04a2f4fb9";

      // create password
      const resourceMeta = defaultResourceMeta();
      const resourcePassword = "password-value";

      // Fill the form
      page.passwordCreate.fillInput(page.passwordCreate.name, resourceMeta.name);
      page.passwordCreate.fillInput(page.passwordCreate.uri, resourceMeta.uri);
      page.passwordCreate.fillInput(page.passwordCreate.username, resourceMeta.username);
      page.passwordCreate.fillInput(page.passwordCreate.description, resourceMeta.description);

      await page.passwordCreate.fillInputPassword(resourcePassword);
      expect(page.passwordCreate.complexityText.textContent).not.toBe("Complexity: n/aEntropy: NaN bits");
      expect(page.passwordCreate.progressBar.classList.contains("not_available")).toBe(false);

      const requestMockImpl = jest.fn((message, data) => Object.assign({id: createdResourceId}, data));
      mockContextRequest(requestMockImpl);
      jest.spyOn(context.port, 'emit').mockImplementation(jest.fn());
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const onApiUpdateResourceDto = {
        ...resourceMeta,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        expired: null,
      };
      delete onApiUpdateResourceDto.description;

      const onApiUpdateSecretDto = {
        description: resourceMeta.description,
        password: resourcePassword
      };

      await page.passwordCreate.click(page.passwordCreate.saveButton);

      expect(context.port.request).toHaveBeenCalledWith("passbolt.resources.create", onApiUpdateResourceDto, onApiUpdateSecretDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toBeCalled();
    });

    describe("should set an expiry date on the created resource based on the password expiry configuration", () => {
      it('with feature flag enabled and an existing password expiry configuration', async() => {
        expect.assertions(3);

        const expirationPeriod = 15;
        const passwordExpirySettings = overridenPasswordExpirySettingsEntityDto({
          default_expiry_period: expirationPeriod
        });

        const fakeNow = new Date('2023-01-01T00:00:00.000Z');

        jest
          .useFakeTimers()
          .setSystemTime(fakeNow);

        const expectedExpiryDate = DateTime.utc().plus({days: expirationPeriod});

        const props = defaultProps({
          passwordExpiryContext: defaultPasswordExpirySettingsContext({
            getSettings: () => passwordExpirySettings,
          })
        });
        const context = defaultAppContext();
        context.port.addRequestListener('passbolt.secrets.powned-password', () => 0);

        const page = new CreateResourcePage(context, props);
        await waitFor(() => {});

        expect(page.passwordCreate.exists()).toBeTruthy();
        // create password
        const resourceMeta = {
          name: "Password name",
          uri: "",
          username: "",
          password: "password-value",
          description: "",
          expired: formatDateForApi(expectedExpiryDate)
        };

        // Fill the form
        page.passwordCreate.fillInput(page.passwordCreate.name, resourceMeta.name);
        await page.passwordCreate.fillInputPassword(resourceMeta.password);

        //Reset the system time at the desired one as filling input runs some jest timers.
        jest.setSystemTime(fakeNow);

        const onApiUpdateResourceMeta = {
          folder_parent_id: null,
          name: resourceMeta.name,
          uri: resourceMeta.uri,
          username: resourceMeta.username,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
          expired: resourceMeta.expired,
        };

        const createResourceSecretDto = {
          description: '',
          password: resourceMeta.password
        };

        context.port.addRequestListener('passbolt.resources.create', (resourceMetaDto, resourceSecretDto) => {
          expect(resourceMetaDto).toStrictEqual(onApiUpdateResourceMeta);
          expect(resourceSecretDto).toStrictEqual(createResourceSecretDto);
        });

        await page.passwordCreate.click(page.passwordCreate.saveButton);
      });

      it('with feature flag enabled and default_expiry_period disabled', async() => {
        expect.assertions(3);

        const props = defaultProps({
          passwordExpiryContext: defaultPasswordExpirySettingsContext({
            getSettings: () => defaultPasswordExpirySettingsEntityDto({
              default_expiry_period: null,
            }),
          }),
        });

        const context = defaultAppContext();

        context.port.addRequestListener('passbolt.secrets.powned-password', () => 0);

        const page = new CreateResourcePage(context, props);
        await waitFor(() => {});

        expect(page.passwordCreate.exists()).toBeTruthy();
        // create password
        const resourceMeta = defaultResourceMeta({
          uri: "",
          username: "",
          description: "",
          expired: null
        });

        const resourcePassword = "password-value";

        // Fill the form
        page.passwordCreate.fillInput(page.passwordCreate.name, resourceMeta.name);
        await page.passwordCreate.fillInputPassword(resourcePassword);

        const onApiUpdateResourceMeta = {
          ...resourceMeta,
          folder_parent_id: null,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        };
        delete onApiUpdateResourceMeta.description;

        const createResourceSecretDto = {
          description: resourceMeta.description,
          password: resourcePassword
        };

        context.port.addRequestListener('passbolt.resources.create', (resourceMetaDto, resourceSecretDto) => {
          expect(resourceMetaDto).toStrictEqual(onApiUpdateResourceMeta);
          expect(resourceSecretDto).toStrictEqual(createResourceSecretDto);
        });

        await page.passwordCreate.click(page.passwordCreate.saveButton);
      });

      it('with a feature flag enabled but the password expiry disabled', async() => {
        expect.assertions(3);

        const props = defaultProps({
          passwordExpiryContext: defaultPasswordExpirySettingsContext({
            getSettings: () => null,
          })
        });
        const context = defaultAppContext();
        context.port.addRequestListener('passbolt.secrets.powned-password', () => 0);

        const page = new CreateResourcePage(context, props);
        await waitFor(() => {});

        expect(page.passwordCreate.exists()).toBeTruthy();
        // create password
        const resourceMeta = {
          name: "Password name",
          uri: "",
          username: "",
          password: "password-value",
          description: "",
        };

        // Fill the form
        page.passwordCreate.fillInput(page.passwordCreate.name, resourceMeta.name);
        await page.passwordCreate.fillInputPassword(resourceMeta.password);

        const onApiUpdateResourceMeta = {
          folder_parent_id: null,
          name: resourceMeta.name,
          uri: resourceMeta.uri,
          username: resourceMeta.username,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        };

        const createResourceSecretDto = {
          description: '',
          password: resourceMeta.password
        };

        context.port.addRequestListener('passbolt.resources.create', (resourceMetaDto, resourceSecretDto) => {
          expect(resourceMetaDto).toStrictEqual(onApiUpdateResourceMeta);
          expect(resourceSecretDto).toStrictEqual(createResourceSecretDto);
        });

        await page.passwordCreate.click(page.passwordCreate.saveButton);
      });

      it('with feature flag disabled', async() => {
        expect.assertions(3);

        const props = defaultProps({
          passwordExpiryContext: defaultPasswordExpirySettingsContext({
            isFeatureEnabled: () => false,
          })
        });

        const context = defaultAppContext();

        context.port.addRequestListener('passbolt.secrets.powned-password', () => 0);

        const page = new CreateResourcePage(context, props);
        await waitFor(() => {});

        expect(page.passwordCreate.exists()).toBeTruthy();
        // create password
        const resourceMeta = {
          name: "Password name",
          uri: "",
          username: "",
          password: "password-value",
          description: "",
        };

        // Fill the form
        page.passwordCreate.fillInput(page.passwordCreate.name, resourceMeta.name);
        await page.passwordCreate.fillInputPassword(resourceMeta.password);

        const onApiUpdateResourceMeta = {
          folder_parent_id: null,
          name: resourceMeta.name,
          uri: resourceMeta.uri,
          username: resourceMeta.username,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        };

        const createResourceSecretDto = {
          description: '',
          password: resourceMeta.password
        };

        context.port.addRequestListener('passbolt.resources.create', (resourceMetaDto, resourceSecretDto) => {
          expect(resourceMetaDto).toStrictEqual(onApiUpdateResourceMeta);
          expect(resourceSecretDto).toStrictEqual(createResourceSecretDto);
        });

        await page.passwordCreate.click(page.passwordCreate.saveButton);
      });
    });

    it('should ask for a resource to be created without expiry date if password expiry feature flag is deactivated.', async() => {
      expect.assertions(3);

      const props = defaultProps();
      const proSettings = defaultProSiteSettings();
      proSettings.passbolt.plugins.passwordPolicies.enabled = false;
      const siteSettings = new SiteSettings(proSettings);
      const context = defaultAppContext({siteSettings});

      context.port.addRequestListener('passbolt.secrets.powned-password', () => 0);

      const page = new CreateResourcePage(context, props);
      await waitFor(() => {});

      expect(page.passwordCreate.exists()).toBeTruthy();
      // create password
      const resourceMeta = defaultResourceMeta({
        uri: "",
        username: "",
        description: "",
        expired: null
      });
      const resourcePassword = "password-value";

      // Fill the form
      page.passwordCreate.fillInput(page.passwordCreate.name, resourceMeta.name);
      await page.passwordCreate.fillInputPassword(resourcePassword);

      const onApiUpdateResourceMeta = {
        ...resourceMeta,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        expired: resourceMeta.expired,
      };
      delete onApiUpdateResourceMeta.description;

      const createResourceSecretDto = {
        description: '',
        password: resourcePassword
      };

      context.port.addRequestListener('passbolt.resources.create', (resourceMetaDto, resourceSecretDto) => {
        expect(resourceMetaDto).toStrictEqual(onApiUpdateResourceMeta);
        expect(resourceSecretDto).toStrictEqual(createResourceSecretDto);
      });

      await page.passwordCreate.click(page.passwordCreate.saveButton);
    });

    it("As LU I shouldn't be able to submit the form if there is an invalid field", async() => {
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

