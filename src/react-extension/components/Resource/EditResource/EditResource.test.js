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
import {defaultProps, defaultPropsLegacyResource} from "./EditResource.test.data";
import EditResourcePage from "./EditResource.test.page";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_V5_DEFAULT,
  TEST_RESOURCE_TYPE_V5_PASSWORD_STRING
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import {waitForTrue} from "../../../../../test/utils/waitFor";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {
  defaultResourceDto,
  resourceWithTotpDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultTotpViewModelDto} from "../../../../shared/models/totp/TotpDto.test.data";
import {TotpWorkflowMode} from "../HandleTotpWorkflow/HandleTotpWorkflowMode";
import HandleTotpWorkflow from "../HandleTotpWorkflow/HandleTotpWorkflow";
import TotpViewModel from "../../../../shared/models/totp/TotpViewModel";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";
import {
  disabledPasswordExpirySettingsViewModelDto
} from "../../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";
import {DateTime} from "luxon";
import ConfirmCreateEdit, {
  ConfirmEditCreateOperationVariations,
  ConfirmEditCreateRuleVariations
} from "../ConfirmCreateEdit/ConfirmCreateEdit";

describe("See the Edit Resource", () => {
  const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";

  describe('As LU I can start editing a password', () => {
    const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementationOnce(implementation);
    /**
     * I should see the edit password dialog
     */
    beforeEach(() => {
      jest.useFakeTimers();
      jest.resetModules();
      jest.clearAllMocks();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
    describe('Styleguide', () => {
      it('matches the styleguide', async() => {
        expect.assertions(20);
        const props = defaultProps(); // The props to pass
        props.resource.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_STRING;
        mockContextRequest(props.context, () => "");
        const resource = props.resource;
        const page = new EditResourcePage(props);

        await waitForTrue(() => page.passwordEdit.exists());

        // Dialog title exists and correct
        expect(page.title.header.textContent).toBe("Edit resource");
        expect(page.title.subtitle.textContent).toBe(resource.metadata.name);

        // Close button exists
        expect(page.passwordEdit.dialogClose).not.toBeNull();

        // Name input field exists.
        expect(page.passwordEdit.name.value).toBe(resource.metadata.name);
        // Uri input field exists.
        expect(page.passwordEdit.uri.value).toBe(resource.metadata.uris[0]);
        // Username input field exists.
        expect(page.passwordEdit.username.value).toBe(resource.metadata.username);
        // Password input field exists
        expect(page.passwordEdit.password).not.toBeNull();
        expect(page.passwordEdit.password.value).toBe("");
        expect(page.passwordEdit.password.getAttribute("type")).toBe("password");
        const passwordInputStyle = window.getComputedStyle(page.passwordEdit.password);
        expect(passwordInputStyle.background).toBe("white");
        expect(passwordInputStyle.color).toBe("");

        expect(page.passwordEdit.complexityText.textContent).toBe("n/a Entropy: 0.0 bits");

        // Password view button exists.
        expect(page.passwordEdit.passwordViewButton).not.toBeNull();
        expect(page.passwordEdit.passwordViewButton.classList.contains("eye-open")).toBe(true);
        expect(page.passwordEdit.passwordViewButton.classList.contains("eye-close")).toBe(false);

        // Password generate button exists.
        expect(page.passwordEdit.passwordGenerateButton).not.toBeNull();

        // Description textarea field exists
        expect(page.passwordEdit.description.value).toBe(resource.metadata.description);

        // Add totp button exists
        expect(page.passwordEdit.addTotpButton).not.toBeNull();

        // Save button exists
        expect(page.passwordEdit.saveButton.textContent).toBe("Save");

        // Cancel button exists
        expect(page.passwordEdit.cancelButton.textContent).toBe("Cancel");
      });
    });

    describe('Generates password', () => {
      it('generates password when clicking on the generate button.', async() => {
        expect.assertions(2);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => page.passwordEdit.exists());

        page.passwordEdit.focusInput(page.passwordEdit.password);
        await waitForTrue(() => !page.passwordEdit.password.disabled);

        await page.passwordEdit.click(page.passwordEdit.passwordGenerateButton);
        await waitFor(() => {
          expect(page.passwordEdit.complexityText.textContent).not.toBe("n/a (entropy: 0.0 bits)");
        });

        expect(page.passwordEdit.progressBar.classList.contains("not_available")).toBe(false);
      });

      it('As LU I should access to the password generator dialog', async() => {
        expect.assertions(1);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});
        jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn);
        await page.passwordEdit.openPasswordGenerator();
        expect(props.dialogContext.open).toBeCalled();
      });
    });

    describe('View password', () => {
      it('views password when clicking on the view button.', async() => {
        expect.assertions(9);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => page.passwordEdit.exists());

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
    });

    describe('Handle totp', () => {
      it('Add totp when clicking on the add totp button.', async() => {
        expect.assertions(4);
        const props = defaultProps(); // The props to pass
        const secretDto = {password: "secret-decrypted", description: "description"};
        mockContextRequest(props.context, () => secretDto);
        const page = new EditResourcePage(props);

        await waitForTrue(() => page.passwordEdit.exists());

        const totp = new TotpViewModel(defaultTotpViewModelDto());
        jest.spyOn(props.workflowContext, "start").mockImplementationOnce((component, props) => props.onApply(totp));

        expect(page.passwordEdit.editTotpButton).toBeNull();
        expect(page.passwordEdit.deleteTotpButton).toBeNull();

        await page.passwordEdit.click(page.passwordEdit.addTotpButton);
        expect(props.workflowContext.start).toHaveBeenCalledWith(HandleTotpWorkflow, {mode: TotpWorkflowMode.ADD_TOTP, onApply: expect.any(Function)});

        await page.passwordEdit.click(page.passwordEdit.editTotpButton);
        expect(props.workflowContext.start).toHaveBeenCalledWith(HandleTotpWorkflow, {mode: TotpWorkflowMode.EDIT_TOTP, totp: totp, onApply: expect.any(Function)});
      });

      it('Edit totp when clicking on the edit totp button.', async() => {
        expect.assertions(2);
        const resource = resourceWithTotpDto();
        const context = defaultUserAppContext({resources: [resource]});
        const props = defaultProps({context, resource}); // The props to pass
        const secretDto = {
          password: "secret-decrypted",
          description: "description",
          totp: defaultTotpViewModelDto()
        };
        mockContextRequest(props.context, () => secretDto);
        const page = new EditResourcePage(props);

        await waitForTrue(() => page.passwordEdit.exists());

        await page.passwordEdit.click(page.passwordEdit.editTotpButton);
        expect(page.passwordEdit.addTotpButton).toBeNull();
        expect(props.workflowContext.start).toHaveBeenCalledWith(HandleTotpWorkflow, {mode: TotpWorkflowMode.EDIT_TOTP, totp: new TotpViewModel(secretDto.totp), onApply: expect.any(Function)});
      });

      it('Delete totp when clicking on the delete totp button.', async() => {
        const resource = resourceWithTotpDto();
        const context = defaultUserAppContext({resources: [resource]});
        const props = defaultProps({context, resource}); // The props to pass
        const secretDto = {
          password: "secret-decrypted",
          description: "description",
          totp: defaultTotpViewModelDto()
        };
        mockContextRequest(props.context, () => secretDto);
        const page = new EditResourcePage(props);

        await waitForTrue(() => page.passwordEdit.exists());

        await page.passwordEdit.click(page.passwordEdit.deleteTotpButton);

        expect(page.passwordEdit.addTotpButton).not.toBeNull();
        expect(page.passwordEdit.editTotpButton).toBeNull();
        expect(page.passwordEdit.deleteTotpButton).toBeNull();
      });
    });

    describe('Edit and save resource v4', () => {
      it('requests the addon to edit a resource with encrypted description when clicking on the submit button.', async() => {
        expect.assertions(5);
        const passwordExpiryContext = defaultPasswordExpirySettingsContext({default_expiry_period: 365});
        const props = defaultProps({passwordExpiryContext}); // The props to pass
        const resource = props.resource;
        mockContextRequest(props.context, () => ({password: "secret-decrypted"}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => page.passwordEdit.exists());

        //Avoid to block with the beforeMount when checking current password
        jest.runAllTimers();
        // edit password
        const resourceMeta = {
          name: "Password name",
          uri: "https://uri.dev",
          username: "Password username",
          password: "RN9n8XuECN312345",
          description: "Password description"
        };
        // Fill the form
        page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);
        page.passwordEdit.fillInput(page.passwordEdit.uri, resourceMeta.uri);
        page.passwordEdit.fillInput(page.passwordEdit.username, resourceMeta.username);
        page.passwordEdit.focusInput(page.passwordEdit.password);

        await page.passwordEdit.fillInputPassword(resourceMeta.password);
        await page.passwordEdit.blurInput(page.passwordEdit.password);

        expect(page.passwordEdit.complexityText.textContent).not.toBe("Quality Entropy: 0.0 bits");
        expect(page.passwordEdit.progressBar.classList.contains("error")).toBe(false);

        page.passwordEdit.fillInput(page.passwordEdit.description, resourceMeta.description);

        jest.spyOn(props.context.port, 'request').mockImplementation(jest.fn());
        jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

        const totp = new TotpViewModel(defaultTotpViewModelDto());
        jest.spyOn(props.workflowContext, "start").mockImplementationOnce((_, props) => props.onApply(totp));

        const date = DateTime.utc().plus({days: props.passwordExpiryContext.default_expiry_period});

        const onApiUpdateResourceMeta = {
          id: resource.id,
          folder_parent_id: null,
          metadata: {
            resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
            name: resourceMeta.name,
            uris: [resourceMeta.uri],
            username: resourceMeta.username,
          },
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
          expired: date.toISO(),
        };
        const onApiUpdateSecretDto = {
          password: resourceMeta.password,
          description: resourceMeta.description,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        };

        await page.passwordEdit.click(page.passwordEdit.addTotpButton);

        await page.passwordEdit.click(page.passwordEdit.deleteTotpButton);

        await page.passwordEdit.click(page.passwordEdit.saveButton);

        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, onApiUpdateSecretDto);
        expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
        expect(props.onClose).toBeCalled();
      });

      it("should requests the addon without the secret if it hasn't changed (with resource type PASSWORD_AND_DECRYPTION).", async() => {
        expect.assertions(1);
        const props = defaultProps(); // The props to pass
        const resource = props.resource;
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: ""}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => !page.passwordEdit.password.disabled);

        //Avoid to block with the beforeMount when checking current password
        jest.runAllTimers();
        // edit password
        const resourceMeta = {
          name: "Password name",
        };
        // Fill the form
        page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);

        jest.spyOn(props.context.port, 'request').mockImplementation(jest.fn());
        jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

        const totp = new TotpViewModel(defaultTotpViewModelDto());
        jest.spyOn(props.workflowContext, "start").mockImplementationOnce((_, props) => props.onApply(totp));

        const onApiUpdateResourceMeta = {
          id: resource.id,
          folder_parent_id: null,
          expired: null,
          metadata: {
            resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
            name: resourceMeta.name,
            uris: resource.metadata.uris,
            username: resource.metadata.username,
          },
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
        };

        await page.passwordEdit.click(page.passwordEdit.addTotpButton);

        await page.passwordEdit.click(page.passwordEdit.deleteTotpButton);

        await page.passwordEdit.click(page.passwordEdit.saveButton);

        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, null);
      });

      it('should requests the addon without the secret if it hasn"t changed (with resource type PASSWORD_STRING).', async() => {
        expect.assertions(1);
        const props = defaultProps(); // The props to pass
        const resource = props.resource;
        resource.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_STRING;
        mockContextRequest(props.context, () => ({password: "secret-decrypted"}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => !page.passwordEdit.password.disabled);

        //Avoid to block with the beforeMount when checking current password
        jest.runAllTimers();
        // edit password
        const resourceMeta = {
          name: "Password name",
          description: "Password description"
        };
        // Fill the form
        page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);
        page.passwordEdit.fillInput(page.passwordEdit.description, resourceMeta.description);

        jest.spyOn(props.context.port, 'request').mockImplementation(jest.fn());

        const onApiUpdateResourceMeta = {
          id: resource.id,
          folder_parent_id: null,
          expired: null,
          metadata: {
            name: resourceMeta.name,
            uris: resource.metadata.uris,
            username: resource.metadata.username,
            description: resourceMeta.description,
            resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING
          },
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING
        };

        await page.passwordEdit.click(page.passwordEdit.saveButton);
        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, null);
      });

      it('should requests the addon without the secret if it hasn"t changed (with resource type PASSWORD_DESCRIPTION_TOTP).', async() => {
        expect.assertions(1);
        const props = defaultProps(); // The props to pass
        props.context.port.addRequestListener('passbolt.secrets.powned-password', () => 0);
        jest.spyOn(props.context.port, 'request');
        const resource = props.resource;
        resource.resource_type_id = TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP;

        const defaultTotp = {
          secret_key: "2F2SA73OFJERVNBL",
          period: 60,
          digits: 7,
          algorithm: "SHA256"
        };
        props.context.port.addRequestListener('passbolt.secret.find-by-resource-id', () => ({
          password: "secret-decrypted",
          description: "",
          totp: defaultTotp
        }));
        const page = new EditResourcePage(props);

        await waitForTrue(() => !page.passwordEdit.password.disabled);

        // edit password
        const resourceMeta = {
          name: "Password name",
        };
        // Fill the form
        page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);

        jest.spyOn(props.context.port, 'request').mockImplementation(jest.fn());

        const onApiUpdateResourceMeta = {
          id: resource.id,
          folder_parent_id: null,
          expired: null,
          metadata: {
            name: resourceMeta.name,
            uris: resource.metadata.uris,
            username: resource.metadata.username,
            resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP
          },
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP
        };

        await waitForTrue(() => !page.passwordEdit.saveButton.disabled);
        await page.passwordEdit.click(page.passwordEdit.saveButton);
        await waitForTrue(() => page.passwordEdit.saveButton.disabled);
        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, null);
      });

      it('requests the addon to edit a resource with non encrypted description when clicking on the submit button.', async() => {
        expect.assertions(6);
        const passwordExpiryContext = defaultPasswordExpirySettingsContext(disabledPasswordExpirySettingsViewModelDto());
        const props = defaultPropsLegacyResource({passwordExpiryContext}); // The props to pass
        const resource = props.resource;
        mockContextRequest(props.context, () => "secret-decrypted");
        const page = new EditResourcePage(props);

        await waitForTrue(() => page.passwordEdit.exists());

        expect(page.passwordEdit.exists()).toBeTruthy();
        // edit password
        const resourceMeta = {
          name: "Password name",
          uri: "https://uri.dev",
          username: "Password username",
          password: "RN9n8XuECN3",
          description: "Password description",
        };
        // Fill the form
        page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);
        page.passwordEdit.fillInput(page.passwordEdit.uri, resourceMeta.uri);
        page.passwordEdit.fillInput(page.passwordEdit.username, resourceMeta.username);
        page.passwordEdit.focusInput(page.passwordEdit.password);

        page.passwordEdit.fillInput(page.passwordEdit.password, resourceMeta.password);
        page.passwordEdit.blurInput(page.passwordEdit.password);
        expect(page.passwordEdit.complexityText.textContent).not.toBe("Complexity: n/aEntropy: NaN bits");
        expect(page.passwordEdit.progressBar.classList.contains("not_available")).toBe(false);
        page.passwordEdit.fillInput(page.passwordEdit.description, resourceMeta.description);
        await page.passwordEdit.click(page.passwordEdit.descriptionEncryptedLock);

        jest.spyOn(props.context.port, 'request').mockImplementation(jest.fn());
        jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

        const onApiUpdateResourceDto = {
          id: resource.id,
          folder_parent_id: null,
          expired: null,
          metadata: {
            name: resourceMeta.name,
            uris: [resourceMeta.uri],
            username: resourceMeta.username,
            resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
          },
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
        };
        const onApiUpdateSecretDto = {
          description: resourceMeta.description,
          password: resourceMeta.password,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
        };

        await page.passwordEdit.click(page.passwordEdit.saveButton);

        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceDto, onApiUpdateSecretDto);
        expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
        expect(props.onClose).toBeCalled();
      });
    });

    describe('Edit and save resource v5', () => {
      it('Edit resource v5 default', async() => {
        expect.assertions(1);
        const resource = defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT});
        const context = defaultUserAppContext({resources: [resource]});
        const props = defaultProps({context, resource}); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: ""}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => !page.passwordEdit.password.disabled);

        //Avoid to block with the beforeMount when checking current password
        jest.runAllTimers();
        // edit password
        const resourceMeta = {
          name: "Password name",
        };
        // Fill the form
        page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);

        jest.spyOn(props.context.port, 'request').mockImplementation(jest.fn());
        jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

        const totp = new TotpViewModel(defaultTotpViewModelDto());
        jest.spyOn(props.workflowContext, "start").mockImplementationOnce((_, props) => props.onApply(totp));

        const onApiUpdateResourceMeta = {
          id: resource.id,
          folder_parent_id: null,
          expired: null,
          metadata: {
            resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
            name: resourceMeta.name,
            uris: resource.metadata.uris,
            username: resource.metadata.username,
          },
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT
        };

        await page.passwordEdit.click(page.passwordEdit.addTotpButton);

        await page.passwordEdit.click(page.passwordEdit.deleteTotpButton);

        await page.passwordEdit.click(page.passwordEdit.saveButton);

        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, null);
      });

      it('Edit resource v5 default with totp', async() => {
        expect.assertions(1);
        const resource = defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT});
        const context = defaultUserAppContext({resources: [resource]});
        const props = defaultProps({context, resource}); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: ""}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => !page.passwordEdit.password.disabled);

        //Avoid to block with the beforeMount when checking current password
        jest.runAllTimers();
        // edit password
        const resourceMeta = {
          name: "Password name",
        };
        // Fill the form
        page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);

        jest.spyOn(props.context.port, 'request').mockImplementation(jest.fn());
        jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

        const totp = new TotpViewModel(defaultTotpViewModelDto());
        jest.spyOn(props.workflowContext, "start").mockImplementationOnce((_, props) => props.onApply(totp));

        const onApiUpdateResourceMeta = {
          id: resource.id,
          folder_parent_id: null,
          expired: null,
          metadata: {
            resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
            name: resourceMeta.name,
            uris: resource.metadata.uris,
            username: resource.metadata.username,
          },
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT
        };

        await page.passwordEdit.click(page.passwordEdit.addTotpButton);

        await page.passwordEdit.click(page.passwordEdit.deleteTotpButton);

        await page.passwordEdit.click(page.passwordEdit.saveButton);

        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, null);
      });

      it('Edit resource v5 password string', async() => {
        expect.assertions(1);
        const resource = defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING});
        const context = defaultUserAppContext({resources: [resource]});
        const props = defaultProps({context, resource}); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted"}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => !page.passwordEdit.password.disabled);

        //Avoid to block with the beforeMount when checking current password
        jest.runAllTimers();
        // edit password
        const resourceMeta = {
          name: "Password name",
          description: "Password description"
        };
        // Fill the form
        page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);
        page.passwordEdit.fillInput(page.passwordEdit.description, resourceMeta.description);

        jest.spyOn(props.context.port, 'request').mockImplementation(jest.fn());

        const onApiUpdateResourceMeta = {
          id: resource.id,
          folder_parent_id: null,
          expired: null,
          metadata: {
            name: resourceMeta.name,
            uris: resource.metadata.uris,
            username: resource.metadata.username,
            description: resourceMeta.description,
            resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING
          },
          resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING
        };

        await page.passwordEdit.click(page.passwordEdit.saveButton);
        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, null);
      });

      it('Edit resource v5 password string to become a resource v5 default', async() => {
        expect.assertions(1);
        const resource = defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING});
        const context = defaultUserAppContext({resources: [resource]});
        const props = defaultProps({context, resource}); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted"}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => !page.passwordEdit.password.disabled);

        //Avoid to block with the beforeMount when checking current password
        jest.runAllTimers();
        // edit password
        const resourceMeta = {
          name: "Password name",
          description: "Password description"
        };
        // Fill the form
        page.passwordEdit.fillInput(page.passwordEdit.name, resourceMeta.name);
        page.passwordEdit.fillInput(page.passwordEdit.description, resourceMeta.description);
        // Become a v5 default
        page.passwordEdit.click(page.passwordEdit.descriptionEncryptedLock);

        jest.spyOn(props.context.port, 'request').mockImplementation(jest.fn());

        const onApiUpdateResourceMeta = {
          id: resource.id,
          folder_parent_id: null,
          expired: null,
          metadata: {
            name: resourceMeta.name,
            uris: resource.metadata.uris,
            username: resource.metadata.username,
            resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT
          },
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT
        };
        const onApiUpdateSecretDto = {
          password: "secret-decrypted",
          description: resourceMeta.description,
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        };

        await page.passwordEdit.click(page.passwordEdit.saveButton);
        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", onApiUpdateResourceMeta, onApiUpdateSecretDto);
      });
    });

    describe("Display error message", () => {
      it("As LU I shouldn't be able to submit the form if there is an invalid field", async() => {
        expect.assertions(3);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);

        await waitForTrue(() => page.passwordEdit.exists());

        expect(page.passwordEdit.exists()).toBeTruthy();
        // empty the form
        page.passwordEdit.fillInput(page.passwordEdit.name, "");
        page.passwordEdit.focusInput(page.passwordEdit.password);

        await page.passwordEdit.fillInputPassword("");
        page.passwordEdit.blurInput(page.passwordEdit.password);
        await page.passwordEdit.click(page.passwordEdit.saveButton);

        // Throw error message
        expect(page.passwordEdit.nameErrorMessage.textContent).toBe("A name is required.");
        expect(page.passwordEdit.passwordErrorMessage.textContent).toBe("A password is required.");
      });

      it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
        expect.assertions(1);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});
        // Mock the request function to make it return an error.
        page.passwordEdit.focusInput(page.passwordEdit.password);

        await page.passwordEdit.fillInputPassword("RN9n8XuECN3");
        page.passwordEdit.blurInput(page.passwordEdit.password);

        const error = new PassboltApiFetchError("Jest simulate API error.");
        const mockRequests = jest.fn(message => {
          switch (message) {
            case "passbolt.resources.update": throw error;
            case "passbolt.secrets.powned-password": return false;
          }
        });
        jest.spyOn(props.context.port, 'request').mockImplementation(mockRequests);

        await page.passwordEdit.click(page.passwordEdit.saveButton);

        // Throw general error message
        expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
      });
    });

    describe("Close dialog", () => {
      it('As LU I can stop editing a password by clicking on the cancel button', async() => {
        expect.assertions(2);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});
        expect(page.passwordEdit.exists()).toBeTruthy();
        await page.passwordEdit.click(page.passwordEdit.cancelButton);
        expect(props.onClose).toBeCalled();
      });

      it('As LU I can stop editing a password by closing the dialog', async() => {
        expect.assertions(2);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});
        expect(page.passwordEdit.exists()).toBeTruthy();
        await page.passwordEdit.click(page.passwordEdit.dialogClose);
        expect(props.onClose).toBeCalled();
      });

      it('As LU I can stop editing a password with the keyboard (escape)', async() => {
        expect.assertions(2);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});
        expect(page.passwordEdit.exists()).toBeTruthy();
        await page.passwordEdit.escapeKey(page.passwordEdit.dialogClose);
        expect(props.onClose).toBeCalled();
      });
    });

    describe("Processing while submitting the form", () => {
      it('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
        expect.assertions(7);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});
        // Mock the request function to make it the expected result
        let updateResolve;
        const requestMockImpl = jest.fn(() => new Promise(resolve => {
          updateResolve = resolve;
        }));

        page.passwordEdit.focusInput(page.passwordEdit.password);

        await page.passwordEdit.fillInputPassword("RN9n8XuECN3");
        page.passwordEdit.blurInput(page.passwordEdit.password);

        // Mock the request function to make it the expected result
        mockContextRequest(props.context, requestMockImpl);
        page.passwordEdit.clickWithoutWaitFor(page.passwordEdit.saveButton);
        // API calls are made on submit, wait they are resolved.
        expect(page.passwordEdit.name.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.uri.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.username.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.password.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.cancelButton.getAttribute("disabled")).not.toBeNull();
        expect(page.passwordEdit.saveButton.className).toBe("button primary disabled processing");

        await waitFor(() => {});
        updateResolve();
      });
    });

    describe("Warning message", () => {
      it("As a user I should see a feedback when the password, descriptions, name, username or uri fields content is truncated by a field limit", async() => {
        expect.assertions(5);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});
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
    });

    describe("Confirm weak or leak password", () => {
      it("As a signed-in user editing a password which is part of a dictionary on the application, I should confirm the password edition in a separate dialog", async() => {
        expect.assertions(3);

        const props = defaultProps();
        const resource = props.resource;

        const mockRequests = jest.fn(async message => ({
          "passbolt.secret.find-by-resource-id": {password: "secret-decrypted", description: "description"},
          "passbolt.secrets.powned-password": 2
        }[message]));
        jest.spyOn(props.context.port, 'request').mockImplementation(mockRequests);
        jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn);

        const page = new EditResourcePage(props);
        await waitFor(() => {});
        await waitForTrue(() => !page.passwordEdit.password.disabled);
        await page.passwordEdit.click(page.passwordEdit.saveButton);
        await waitFor(() => {});

        expect(props.context.port.request).toHaveBeenNthCalledWith(1, "passbolt.secret.find-by-resource-id", resource.id);
        expect(props.context.port.request).toHaveBeenNthCalledWith(2, "passbolt.secrets.powned-password", "secret-decrypted");
        const confirmDialogProps = {
          resourceName: resource.metadata.name,
          operation: ConfirmEditCreateOperationVariations.EDIT,
          rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
          onConfirm: expect.any(Function),
          onReject: expect.any(Function),
        };
        expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmCreateEdit, confirmDialogProps);
      });

      it("As a signed-in user editing a password which part of a dictionary on the application, I should confirm the password edition in a separate dialog", async() => {
        expect.assertions(2);

        const props = defaultProps();
        const resource = props.resource;

        const mockRequests = jest.fn(async message => ({
          "passbolt.secret.find-by-resource-id": {password: "azerty", description: "description"},
          "passbolt.secrets.powned-password": 2
        }[message]));
        jest.spyOn(props.context.port, 'request').mockImplementation(mockRequests);
        jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn);

        const page = new EditResourcePage(props);
        await waitFor(() => {});
        await waitForTrue(() => !page.passwordEdit.password.disabled);
        await page.passwordEdit.click(page.passwordEdit.saveButton);
        await waitFor(() => {});

        expect(props.context.port.request).toHaveBeenNthCalledWith(1, "passbolt.secret.find-by-resource-id", resource.id);
        const confirmDialogProps = {
          resourceName: resource.metadata.name,
          operation: ConfirmEditCreateOperationVariations.EDIT,
          rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
          onConfirm: expect.any(Function),
          onReject: expect.any(Function),
        };
        expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmCreateEdit, confirmDialogProps);
      });
    });

    describe("Complexity of a password", () => {
      it("As a signed-in user editing a password on the application, I should see a complexity as Quality if the passphrase is empty", async() => {
        expect.assertions(2);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({password: "secret-decrypted", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});
        await page.passwordEdit.fillInputPassword("");
        await waitFor(() => {});
        expect(page.passwordEdit.pwnedWarningMessage).toBeNull();
        expect(page.passwordEdit.complexityText.textContent).toBe("Quality Entropy: 0.0 bits");
      });
    });
  });
});
