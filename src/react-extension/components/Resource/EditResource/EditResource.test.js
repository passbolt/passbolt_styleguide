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
import EditResourcePage from "./EditResource.test.page";
import {defaultCustomFieldsProps, defaultProps, defaultTotpProps} from "./EditResource.test.data";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_TOTP, TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS, TEST_RESOURCE_TYPE_V5_DEFAULT,
  TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
  TEST_RESOURCE_TYPE_V5_TOTP
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import "../../../../../test/mocks/mockClipboard";
import ConfirmCreateEdit, {ConfirmEditCreateOperationVariations, ConfirmEditCreateRuleVariations} from "../ConfirmCreateEdit/ConfirmCreateEdit";
import {defaultPasswordPoliciesContext} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import PownedService from "../../../../shared/services/api/secrets/pownedService";
import {SECRET_DATA_OBJECT_TYPE} from "../../../../shared/models/entity/secretData/secretDataEntity";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";
import {
  overridenPasswordExpirySettingsEntityDto
} from "../../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";
import {DateTime} from "luxon";
import {formatDateForApi} from "../../../../shared/utils/dateUtils";
import {defaultTotpDto} from "../../../../shared/models/entity/totp/totpDto.test.data";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {
  defaultResourceMetadataDto
} from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import ResourceMetadataEntity from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity";
import {defaultCustomField} from "../../../../shared/models/entity/customField/customFieldEntity.test.data";
import UserAbortsOperationError from "../../../lib/Error/UserAbortsOperationError";

describe("See the Create Resource", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementationOnce(implementation);

  describe('As LU I can start editing a resource', () => {
    describe('Styleguide', () => {
      it('matches the styleguide', async() => {
        expect.assertions(18);
        const props = defaultProps(); // The props to pass
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "RN9n8XuECN3"}));
        const resource = props.resource;
        const page = new EditResourcePage(props);
        await waitFor(() => {});
        // Dialog title exists and correct
        expect(page.exists()).toBeTruthy();
        expect(page.header.textContent).toBe("Edit a resource");

        // Close button exists
        expect(page.dialogClose).not.toBeNull();

        // Name input field exists.
        expect(page.name.value).toBe(resource.metadata.name);
        // Uri input field exists.
        expect(page.uri.value).toBe(resource.metadata.uris[0]);
        // Username input field exists.
        expect(page.username.value).toBe(resource.metadata.username);
        // Password input field exists
        expect(page.password).not.toBeNull();
        expect(page.password.value).toBe("RN9n8XuECN3");
        expect(page.password.getAttribute("type")).toBe("password");
        const passwordInputStyle = window.getComputedStyle(page.password);
        expect(passwordInputStyle.background).toBe("white");
        expect(passwordInputStyle.color).toBe("");

        // Complexity label exists but is not yet defined.
        expect(page.complexityText.textContent).toBe("Weak Entropy: 65.5 bits");

        // Password view button exists.
        expect(page.passwordViewButton).not.toBeNull();
        expect(page.passwordViewButton.classList.contains("eye-open")).toBe(true);
        expect(page.passwordViewButton.classList.contains("eye-close")).toBe(false);

        // Password generate button exists.
        expect(page.passwordGenerateButton).not.toBeNull();

        // Save button exists
        expect(page.saveButton.textContent).toBe("Save");

        // Cancel button exists
        expect(page.cancelButton.textContent).toBe("Cancel");
      });

      it('should display skeleton if secrets is not decrypted', async() => {
        expect.assertions(9);
        const props = defaultProps(); // The props to pass
        const page = new EditResourcePage(props);
        await waitFor(() => {});
        // Dialog title exists and correct
        expect(page.exists()).toBeTruthy();
        expect(page.header.textContent).toBe("Edit a resource");

        // Close button exists
        expect(page.dialogClose).not.toBeNull();

        // resource info skeleton exists.
        expect(page.resourceInfoSkeleton).toBeDefined();
        // edit workspace skeleton exists.
        expect(page.editWorkspaceSkeleton).toBeDefined();

        // Save button exists
        expect(page.saveButton.textContent).toBe("Save");
        // Save button is disabled
        expect(page.saveButton.hasAttribute("disabled")).toBeTruthy();

        // Cancel button exists
        expect(page.cancelButton.textContent).toBe("Cancel");
        // Cancel button is disabled
        expect(page.cancelButton.hasAttribute("disabled")).toBeTruthy();
      });
    });

    describe("should select a resource form", () => {
      it('As a signed-in user I should be able to select description form', async() => {
        expect.assertions(5);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        // select description form
        await page.click(page.menuDescription);
        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Description");
        expect(page.description).toBeDefined();
        expect(page.password).toBeNull();
      });

      it('As a signed-in user I should be able to select uris form', async() => {
        expect.assertions(5);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        // select description form
        await page.click(page.menuUris);
        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("URIs");
        expect(page.mainUri).toBeDefined();
        expect(page.password).toBeNull();
      });
    });

    describe("should add a secret to a resource", () => {
      it('As a signed-in user I should be able to add secret without a resource type mutation', async() => {
        expect.assertions(2);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretNote);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Note");
        expect(page.note).toBeDefined();
      });

      it('As a signed-in user I should be able to add secret with a resource type mutation', async() => {
        expect.assertions(3);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");
        expect(page.note).toBeDefined();
        expect(page.upgradeCard).toBeNull();
      });

      it('As a signed-in user I should be able to add secret with a resource type mutation with a standalone totp', async() => {
        expect.assertions(2);
        const props = defaultTotpProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto()}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretPassword);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();
      });

      it('As a signed-in user I should be able to add secret totp for a resource v4 password string', async() => {
        expect.assertions(3);

        const props = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING})});
        mockContextRequest(props.context, () => ({password: "password"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");
        expect(page.note).toBeDefined();
        expect(page.upgradeCard).toBeDefined();
      });
    });

    describe("should delete a secret to a resource", () => {
      it('As a signed-in user I should be able to delete secret without a resource type mutation', async() => {
        expect.assertions(3);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        // select note form
        await page.click(page.getSectionItem(2));

        expect(page.sectionItemSelected.textContent).toStrictEqual("Note");

        await page.click(page.deleteSecretNote);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();
      });

      it('As a signed-in user I should be able to delete secret custom fields without a resource type mutation', async() => {
        expect.assertions(6);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "RN9n8XuECN3", description: "description", custom_fields: [defaultCustomField()]}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        // select note form
        await page.click(page.getSectionItem(2));

        expect(page.sectionItemSelected.textContent).toStrictEqual("Custom fields");

        await page.click(page.deleteSecretCustomFields);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();

        mockContextRequest(props.context, jest.fn());
        await page.click(page.saveButton);

        const resourceDtoExpected = {
          id: props.resource.id,
          expired: null,
          folder_parent_id: props.resource.folder_parent_id,
          resource_type_id: props.resource.resource_type_id,
          metadata: {
            object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
            name: props.resource.metadata.name,
            username: props.resource.metadata.username,
            resource_type_id: props.resource.resource_type_id,
            uris: props.resource.metadata.uris,
            description: props.resource.metadata.description
          }
        };

        const secretDtoExpected = {
          object_type: SECRET_DATA_OBJECT_TYPE,
          password: "RN9n8XuECN3",
          description: "description"
        };

        // expectations
        expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
        expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
        expect(props.onClose).toBeCalled();
      });

      it('As a signed-in user I should be able to delete secret with a resource type mutation', async() => {
        expect.assertions(3);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");

        await page.click(page.deleteSecretPassword);

        await page.click(page.menuDescription);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Description");
        expect(page.description).toBeDefined();
      });

      it('As a signed-in user I should be able to delete secret totp for a resource v4 password string', async() => {
        expect.assertions(3);

        const props = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING})});
        mockContextRequest(props.context, () => ({password: "password"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        await page.click(page.addSecret);
        await page.click(page.addSecretTotp);

        expect(page.sectionItemSelected.textContent).toStrictEqual("TOTP");

        await page.click(page.deleteSecretTotp);

        // expectations
        expect(page.sectionItemSelected.textContent).toStrictEqual("Passwords");
        expect(page.password).toBeDefined();
      });
    });

    describe("should edit password form", () => {
      it('As a signed-in user I should be able to edit an URI', async() => {
        expect.assertions(2);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.uri, "https://passbolt.com");
        // expectations
        expect(page.uri.value).toBe("https://passbolt.com");
      });

      it('As a signed-in user I should be aware about the URI maxLength', async() => {
        expect.assertions(3);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
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
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
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

      it('As a signed-in user I should be able to edit an username', async() => {
        expect.assertions(2);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.username, "username");
        // expectations
        expect(page.username.value).toBe("username");
      });

      it('As a signed-in user I should be aware about the username maxLength', async() => {
        expect.assertions(3);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
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
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
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

      it('As a signed-in user I should be able to edit a password', async() => {
        expect.assertions(2);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        await page.fillInput(page.password, "secret");
        // expectations
        expect(page.password.value).toBe("secret");
      });

      it('As a signed-in user I should be aware about the password maxLength', async() => {
        expect.assertions(3);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
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
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
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
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        jest.spyOn(SecretGenerator, "generate").mockImplementation(() => "generate-password");
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();
        expect(page.password.value).toBe("password");

        await page.click(page.passwordGenerateButton);
        // expectations
        expect(page.password.value).toBe("generate-password");
        expect(page.complexityText.textContent).not.toBe("Quality Entropy: 0.0 bits");
        expect(page.progressBar.classList.contains("error")).toBe(false);
      });
    });

    describe("should edit a name to resource", () => {
      let props, page;
      beforeEach(async() => {
        props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        page = new EditResourcePage(props);

        await waitFor(() => page.exists);
      });

      it('As a signed-in user I should be able to edit name to a resource', async() => {
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

    describe("should edit description field", () => {
      let props, page;
      beforeEach(async() => {
        props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        page = new EditResourcePage(props);

        await waitFor(() => page.exists);
        await page.click(page.menuDescription);
      });


      it('As a signed-in user I should be able to edit a description', async() => {
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

        const props = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING})});
        mockContextRequest(props.context, () => ({password: "password"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        await page.click(page.menuDescription);
        await page.fillInput(page.description, "description");
        await page.click(page.convertToNote);
        // expectations
        expect(page.sectionItemSelected.textContent).toBe("Note");
        expect(page.note.value).toBe("description");
      });
    });

    describe("should edit totp form", () => {
      let props, page;
      beforeEach(() => {
        props = defaultTotpProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, totp: defaultTotpDto()}));
        page = new EditResourcePage(props);
      });

      it('As a signed-in user I should be able to edit an URI', async() => {
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

      it('As a signed-in user I should be able to edit a resource totp key', async() => {
        expect.assertions(3);

        expect(page.resourceTotpCode.hasAttribute("disabled")).toBeFalsy();

        await page.fillInput(page.resourceTotpKey, "");
        // expectations
        expect(page.resourceTotpKey.value).toBe("");
        expect(page.resourceTotpCode.hasAttribute("disabled")).toBeTruthy();
      });

      it('As a signed-in user I should see an error message when totp key is empty', async() => {
        expect.assertions(1);

        await page.fillInput(page.resourceTotpKey, "");

        await page.click(page.saveButton);
        // expectations
        expect(page.resourceTotpKeyErrorMessage.textContent).toBe("The key is required.");
      });

      it('As a signed-in user I should see an error message when totp key does not respect pattern', async() => {
        expect.assertions(1);

        await page.fillInput(page.resourceTotpKey, "????");

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

      it('As a signed-in user I should be redirected to the totp form if there is an error', async() => {
        expect.assertions(3);

        await page.fillInput(page.resourceTotpKey, "");
        await page.click(page.menuDescription);
        expect(page.sectionItemSelected.textContent).toBe("Description");

        await page.click(page.saveButton);
        // expectations
        expect(page.sectionItemSelected.textContent).toBe("TOTP");
        expect(page.resourceTotpKeyErrorMessage.textContent).toBe("The key is required.");
      });

      it('As a signed-in user I should be able to update a totp length', async() => {
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
      it('As a signed-in user I should be able to edit an algorithm', async() => {
        expect.assertions(1);

        await page.click(page.advancedSettings);
        await page.click(page.algorithm);
        await page.click(page.firstItemOption);
        // expectations
        expect(page.algorithm.textContent).toBe("SHA256");
      });

      it('As a signed-in user I should be able to copy a resource totp from totp code', async() => {
        expect.assertions(1);

        await page.click(page.resourceTotpCode);
        // expectations
        expect(props.clipboardContext.copyTemporarily).toHaveBeenCalledTimes(1);
      });

      it('As a signed-in user I should be able to copy a resource totp from totp button', async() => {
        expect.assertions(2);

        expect(page.exists()).toBeTruthy();
        await page.click(page.copyTotpButton);

        // expectations
        expect(props.clipboardContext.copyTemporarily).toHaveBeenCalledTimes(1);
      });
    });

    describe("should edit custom fields form", () => {
      let props, page;
      beforeEach(() => {
        props = defaultCustomFieldsProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, custom_fields: [{id: props.resource.metadata.custom_fields[0].id,
          type: "text",
          secret_value: "secret-0"
        }]}));
        page = new EditResourcePage(props);
      });

      it('As a signed-in user I should be able to add and delete a custom field', async() => {
        expect.assertions(7);
        expect(page.exists()).toBeTruthy();
        expect(page.getDeleteCustomField(0)).toBeNull();

        await page.click(page.addCustomField);
        // expectations
        expect(page.getDeleteCustomField(0)).toBeDefined();
        expect(page.getDeleteCustomField(1)).toBeDefined();

        await page.click(page.getDeleteCustomField(0));

        expect(page.getDeleteCustomField(0)).toBeNull();
        expect(page.getDeleteCustomField(1)).toBeNull();
        expect(page.customFieldsLength).toBe(1);
      });

      it('As a signed-in user I should not be able to add a custom field after 32 rows', async() => {
        expect.assertions(3);
        expect(page.exists()).toBeTruthy();

        for (let i = 0; i < 31; i++) {
          await page.click(page.addCustomField);
        }

        // expectations
        expect(page.customFieldsLength).toBe(32);
        expect(page.addCustomField.hasAttribute("disabled")).toBeTruthy();
      });

      it('As a signed-in user I should not be able to add a custom field after 50_000 characters', async() => {
        expect.assertions(4);
        expect(page.exists()).toBeTruthy();

        for (let i = 0; i < 9; i++) {
          await page.fillInput(page.getCustomFieldValue(i), "a".repeat(5000));
          await page.click(page.addCustomField);
        }

        await page.fillInput(page.getCustomFieldValue(9), "a".repeat(2500));
        await page.click(page.addCustomField);
        await page.fillInput(page.getCustomFieldValue(10), "a".repeat(2500));

        // expectations
        expect(page.customFieldsLength).toBe(11);
        expect(page.customFieldValueMaxCharactersWarningMessage).toStrictEqual("You have reached the maximum content size limit.");
        expect(page.addCustomField.hasAttribute("disabled")).toBeTruthy();
      });

      it('As a signed-in user I should be aware about the key and value maxLength', async() => {
        expect.assertions(3);

        await page.fillInput(page.getCustomFieldKey(0), "a".repeat(255));
        await page.fillInput(page.getCustomFieldValue(0), "a".repeat(20000));

        // expectations
        expect(page.getCustomFieldKey(0).value).toEqual("a".repeat(255));
        expect(page.getCustomFieldValue(0).value).toEqual("a".repeat(20000));
        expect(page.getCustomFieldKeyAndValueWarningMessage(0).textContent).toEqual("The key and the value reach the character limit, make sure your data won’t be truncated.");
      });

      it('As a signed-in user I should be aware if the key name is already used', async() => {
        expect.assertions(1);

        await page.fillInput(page.getCustomFieldKey(0), "key");
        await page.click(page.addCustomField);
        await page.fillInput(page.getCustomFieldKey(1), "key");

        // expectations
        expect(page.getCustomFieldKeyWarningMessage(1).textContent).toEqual("The key name is already used.");
      });

      it('As a signed-in user I should be aware about the key maxLength', async() => {
        expect.assertions(2);

        await page.fillInput(page.getCustomFieldKey(0), "a".repeat(255));

        // expectations
        expect(page.getCustomFieldKey(0).value).toEqual("a".repeat(255));
        expect(page.getCustomFieldKeyWarningMessage(0).textContent).toEqual("The key reaches the character limit, make sure your data won’t be truncated.");
      });

      it('As a signed-in user I should be aware about the value maxLength', async() => {
        expect.assertions(2);

        await page.fillInput(page.getCustomFieldValue(0), "a".repeat(20000));

        // expectations
        expect(page.getCustomFieldValue(0).value).toEqual("a".repeat(20000));
        expect(page.getCustomFieldValueWarningMessage(0).textContent).toEqual("The value reaches the character limit, make sure your data won’t be truncated.");
      });
    });

    describe("should edit note form", () => {
      let props, page;
      beforeEach(async() => {
        props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        page = new EditResourcePage(props);

        await waitFor(() => page.exists);
        await page.click(page.getSectionItem(2));
      });

      it('As a signed-in user I should be able to edit a note', async() => {
        expect.assertions(1);

        await page.fillInput(page.note, "note");
        // expectations
        expect(page.note.value).toBe("note");
      });


      it('As a signed-in user I should be aware about the note maxLength', async() => {
        expect.assertions(3);

        await page.fillInput(page.note, "a".repeat(50000));

        // expectations
        expect(page.note.value).toEqual("a".repeat(50000));
        expect(page.noteWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.noteErrorMessage).toBeNull();
      });

      it('As a signed-in user I should be blocked if I exceed the note maxLength', async() => {
        expect.assertions(5);

        await page.fillInput(page.note, "a".repeat(50001));

        // expectations
        expect(page.note.value).toEqual("a".repeat(50001));
        expect(page.noteWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.noteErrorMessage).toBeNull();

        await page.click(page.saveButton);

        expect(page.noteWarningMessage).toBeNull();
        expect(page.noteErrorMessage.textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
      });

      it('As a signed-in user I should be able to convert a note to a description for a v4 default', async() => {
        expect.assertions(2);

        const props = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION})});
        mockContextRequest(props.context, () => ({password: "RN9n8XuECN3", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        await page.click(page.getSectionItem(2));
        await page.fillInput(page.note, "note");

        // expectations
        expect(page.convertToDescription).toBeNull();
        expect(page.upgradeCard).toBeDefined();
      });
    });

    describe("As LU I can start editing uri field", () => {
      it('As a signed-in user I should be able to see a main uri filled and editing it', async() => {
        expect.assertions(2);
        const props = defaultProps();
        mockContextRequest(props.context, () => ({password: "RN9n8XuECN3", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => page.exists);

        await page.click(page.menuUris);
        expect(page.mainUri.value).toBe("https://passbolt.com");

        await page.fillInput(page.mainUri, "https://www.passbolt.com/docs");
        // expectations
        expect(page.mainUri.value).toBe("https://www.passbolt.com/docs");
      });

      it('As a signed-in user I should be able to add additional and delte some', async() => {
        expect.assertions(3);
        const props = defaultProps();
        mockContextRequest(props.context, () => ({password: "RN9n8XuECN3", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => page.exists);

        await page.click(page.menuUris);

        expect(page.addUri.hasAttribute("disabled")).toBeFalsy();

        await page.click(page.addUri);
        await page.fillInput(page.getAdditionalUri(1), "https://www.passbolt.com/blog");
        await page.click(page.addUri);
        await page.fillInput(page.getAdditionalUri(2), "https://www.passbolt.com/docs");
        await page.click(page.getDeleteAdditionalUri(1));

        // expectations
        expect(page.mainUri.value).toBe("https://passbolt.com");
        expect(page.getAdditionalUri(1).value).toBe("https://www.passbolt.com/docs");
      });

      it('As a signed-in user I should be aware about the URI maxLength', async() => {
        expect.assertions(6);
        const props = defaultProps();
        mockContextRequest(props.context, () => ({password: "RN9n8XuECN3", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => page.exists);

        await page.click(page.menuUris);

        page.fillInput(page.mainUri, "a".repeat(1024));

        await page.click(page.addUri);
        page.fillInput(page.getAdditionalUri(1), "a".repeat(1024));

        // expectations
        expect(page.mainUri.value).toEqual("a".repeat(1024));
        expect(page.mainUriWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.mainUriErrorMessage).toBeNull();
        expect(page.getAdditionalUri(1).value).toEqual("a".repeat(1024));
        expect(page.getAdditionalUriWarningMessage(1).textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.getAdditionalUriErrorMessage(1)).toBeNull();
      });

      it('As a signed-in user I should be blocked if I exceed the URI maxLength', async() => {
        expect.assertions(9);
        const props = defaultProps();
        mockContextRequest(props.context, () => ({password: "RN9n8XuECN3", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => page.exists);

        await page.click(page.menuUris);

        page.fillInput(page.mainUri, "a".repeat(1025));

        await page.click(page.addUri);
        page.fillInput(page.getAdditionalUri(1), "a".repeat(1025));

        // expectations
        expect(page.mainUri.value).toEqual("a".repeat(1025));
        expect(page.mainUriWarningMessage.textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.mainUriErrorMessage).toBeNull();
        expect(page.getAdditionalUri(1).value).toEqual("a".repeat(1025));
        expect(page.getAdditionalUriWarningMessage(1).textContent).toEqual("Warning: this is the maximum size for this field, make sure your data was not truncated.");
        expect(page.getAdditionalUriErrorMessage(1)).toBeNull();

        await page.click(page.saveButton);

        expect(page.mainUriWarningMessage).toBeNull();
        expect(page.mainUriErrorMessage.textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
        expect(page.getAdditionalUriErrorMessage(1).textContent).toEqual("This is the maximum size for this field, make sure your data was not truncated.");
      });
    });

    describe("should send the form", () => {
      it('should open the creation confirmation dialog if the entropy of the password is too low', async() => {
        expect.assertions(3);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        page.fillInput(page.password, "test");
        await waitFor(() => {});

        page.click(page.saveButton);
        await waitFor(() => {});

        const confirmDialogProps = {
          resourceName: "Passbolt",
          operation: ConfirmEditCreateOperationVariations.CREATE,
          rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
          onConfirm: expect.any(Function),
          onReject: expect.any(Function),
        };

        expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
        expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmCreateEdit, confirmDialogProps);
      });

      it('should open the creation confirmation dialog if the entropy of the password is too low and throw an UserAbortsOperationError on confirmation', async() => {
        expect.assertions(3);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        page.fillInput(page.password, "test");
        await waitFor(() => {});

        const error = new UserAbortsOperationError();
        jest.spyOn(props.dialogContext, "open").mockImplementationOnce((component, props) => props.onConfirm());
        jest.spyOn(props.context.port, 'request').mockImplementation(() => { throw error; });

        page.click(page.saveButton);
        await waitFor(() => {});

        const confirmDialogProps = {
          resourceName: "Passbolt",
          operation: ConfirmEditCreateOperationVariations.CREATE,
          rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
          onConfirm: expect.any(Function),
          onReject: expect.any(Function),
        };

        expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
        expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmCreateEdit, confirmDialogProps);
      });

      it('should open the creation confirmation dialog if the entropy of the password is too low and throw an unexpected error on confirmation', async() => {
        expect.assertions(4);

        const props = defaultProps();
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        page.fillInput(page.password, "test");
        await waitFor(() => {});

        const error = new Error("unexpected error");
        jest.spyOn(props.dialogContext, "open").mockImplementationOnce((component, props) => props.onConfirm());
        jest.spyOn(props.context.port, 'request').mockImplementation(() => { throw error; });

        page.click(page.saveButton);
        await waitFor(() => {});

        const confirmDialogProps = {
          resourceName: "Passbolt",
          operation: ConfirmEditCreateOperationVariations.CREATE,
          rule: ConfirmEditCreateRuleVariations.MINIMUM_ENTROPY,
          onConfirm: expect.any(Function),
          onReject: expect.any(Function),
        };

        expect(props.dialogContext.open).toHaveBeenCalledTimes(2);
        expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmCreateEdit, confirmDialogProps);
        expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
      });

      it('should open the creation confirmation dialog if the password is found in a data breach', async() => {
        expect.assertions(3);

        jest.spyOn(PownedService.prototype, "checkIfPasswordPowned").mockImplementation(async() => true);

        const props = defaultProps({
          passwordPoliciesContext: defaultPasswordPoliciesContext(),
        });
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        page.fillInput(page.password, "Az12./RTY2346");
        await waitFor(() => {});

        page.click(page.saveButton);
        await waitFor(() => {});

        const confirmDialogProps = {
          resourceName: "Passbolt",
          operation: ConfirmEditCreateOperationVariations.CREATE,
          rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
          onConfirm: expect.any(Function),
          onReject: expect.any(Function),
        };

        expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
        expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmCreateEdit, confirmDialogProps);
      });

      it('should open the creation confirmation dialog if the password is found in a data breach and throw an UserAbortsOperationError error on confirmation', async() => {
        expect.assertions(3);

        jest.spyOn(PownedService.prototype, "checkIfPasswordPowned").mockImplementation(async() => true);

        const props = defaultProps({
          passwordPoliciesContext: defaultPasswordPoliciesContext(),
        });
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        page.fillInput(page.password, "Az12./RTY2346");
        await waitFor(() => {});

        const error = new UserAbortsOperationError();
        jest.spyOn(props.dialogContext, "open").mockImplementationOnce((component, props) => props.onConfirm());
        jest.spyOn(props.context.port, 'request').mockImplementation(() => { throw error; });

        page.click(page.saveButton);
        await waitFor(() => {});

        const confirmDialogProps = {
          resourceName: "Passbolt",
          operation: ConfirmEditCreateOperationVariations.CREATE,
          rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
          onConfirm: expect.any(Function),
          onReject: expect.any(Function),
        };

        expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
        expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmCreateEdit, confirmDialogProps);
      });

      it('should open the creation confirmation dialog if the password is found in a data breach and throw an unexpected error on confirmation', async() => {
        expect.assertions(4);

        jest.spyOn(PownedService.prototype, "checkIfPasswordPowned").mockImplementation(async() => true);

        const props = defaultProps({
          passwordPoliciesContext: defaultPasswordPoliciesContext(),
        });
        mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
        const page = new EditResourcePage(props);
        await waitFor(() => {});

        expect(page.exists()).toBeTruthy();

        page.fillInput(page.password, "Az12./RTY2346");
        await waitFor(() => {});

        const error = new Error("unexpected error");
        jest.spyOn(props.dialogContext, "open").mockImplementationOnce((component, props) => props.onConfirm());
        jest.spyOn(props.context.port, 'request').mockImplementation(() => { throw error; });

        page.click(page.saveButton);
        await waitFor(() => {});

        const confirmDialogProps = {
          resourceName: "Passbolt",
          operation: ConfirmEditCreateOperationVariations.CREATE,
          rule: ConfirmEditCreateRuleVariations.IN_DICTIONARY,
          onConfirm: expect.any(Function),
          onReject: expect.any(Function),
        };

        expect(props.dialogContext.open).toHaveBeenCalledTimes(2);
        expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmCreateEdit, confirmDialogProps);
        expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
      });
    });
  });

  describe("Close dialog", () => {
    it('As LU I can stop editing a resource by clicking on the cancel button', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.click(page.cancelButton);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('As LU I can stop editing a resource by closing the dialog', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.click(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('As LU I can stop editing a resource with the keyboard (escape)', async() => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.escapeKey(page.dialogClose);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('As LU I cannot editing a resource if secret request throw error', async() => {
      expect.assertions(3);
      const props = defaultProps(); // The props to pass
      const error = new Error("Unexpected Error");
      mockContextRequest(props.context, () => { throw error; });
      const page = new EditResourcePage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error});
      expect(props.onClose).toHaveBeenCalled();
    });
  });

  describe("should save a secret to a resource", () => {
    it('As a signed-in user I should be able to save a resource v5 default', async() => {
      expect.assertions(3);
      const expirationPeriod = 15;
      const passwordExpirySettings = overridenPasswordExpirySettingsEntityDto({
        default_expiry_period: expirationPeriod
      });

      const fakeNow = new Date('2023-01-01T00:00:00.000Z');

      jest.useFakeTimers().setSystemTime(fakeNow);

      const expectedExpiryDate = DateTime.utc().plus({days: expirationPeriod});

      const props = defaultProps({
        passwordExpiryContext: defaultPasswordExpirySettingsContext({
          getSettings: () => passwordExpirySettings,
        })
      });
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));

      const page = new EditResourcePage(props);
      await waitFor(() => {});

      page.fillInput(page.password, "RN9n8XuECN312345");
      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const expirationDate = formatDateForApi(expectedExpiryDate);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: expirationDate,
        folder_parent_id: null,
        resource_type_id: props.resource.resource_type_id,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: props.resource.metadata.name,
          username: props.resource.metadata.username,
          resource_type_id: props.resource.resource_type_id,
          uris: props.resource.metadata.uris,
          description: props.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        password: "RN9n8XuECN312345",
        description: "description"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v5 default with no expiry update', async() => {
      expect.assertions(3);
      const expirationPeriod = 15;
      const passwordExpirySettings = overridenPasswordExpirySettingsEntityDto({
        default_expiry_period: expirationPeriod
      });

      const fakeNow = new Date('2023-01-01T00:00:00.000Z');

      jest.useFakeTimers().setSystemTime(fakeNow);

      const expectedExpiryDate = DateTime.utc().plus({days: (expirationPeriod - 1)});
      const expirationDate = formatDateForApi(expectedExpiryDate);

      const props = defaultProps({
        passwordExpiryContext: defaultPasswordExpirySettingsContext({
          getSettings: () => passwordExpirySettings,
        }),
        resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT, expired: expirationDate})
      });
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "RN9n8XuECN312345", description: "description"}));

      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.click(page.getSectionItem(2));
      page.fillInput(page.note, "Expiry date not updated");
      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: props.resource.expired,
        folder_parent_id: null,
        resource_type_id: props.resource.resource_type_id,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: props.resource.metadata.name,
          username: props.resource.metadata.username,
          resource_type_id: props.resource.resource_type_id,
          uris: props.resource.metadata.uris,
          description: props.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        password: "RN9n8XuECN312345",
        description: "Expiry date not updated"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v5 default with totp empty', async() => {
      expect.assertions(3);
      const props = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT, folder_parent_id: "f2b4047d-ab6d-4430-a1e2-3ab04a2f4fb9"})});
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.fillInput(page.password, "RN9n8XuECN3");

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      await page.fillInput(page.name, "v5 default");

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: props.resource.folder_parent_id,
        resource_type_id: props.resource.resource_type_id,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v5 default",
          username: props.resource.metadata.username,
          resource_type_id: props.resource.resource_type_id,
          uris: props.resource.metadata.uris,
          description: props.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        password: "RN9n8XuECN3",
        description: "description"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v5 default with totp and custom fields', async() => {
      expect.assertions(3);
      const props = defaultProps();
      mockContextRequest(props.context, () => ({password: "password"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.fillInput(page.password, "RN9n8XuECN3");

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      await page.fillInput(page.resourceTotpKey, "   jbsWY3dpeHPK3PXP   ");

      await page.click(page.addSecret);
      await page.click(page.addSecretNote);

      await page.fillInput(page.note, "note");

      await page.click(page.addSecret);
      await page.click(page.addSecretCustomFields);

      await page.fillInput(page.getCustomFieldKey(0), "PASSBOLT");
      await page.fillInput(page.getCustomFieldValue(0), "This is a secret");

      await page.click(page.addCustomField);
      await page.fillInput(page.getCustomFieldKey(1), "PASSBOLT COMMUNITY");
      await page.fillInput(page.getCustomFieldValue(1), "This is a secret too");

      await page.fillInput(page.name, "v5 default totp");

      await page.click(page.menuUris);
      await page.click(page.addUri);
      await page.fillInput(page.getAdditionalUri(1), "https://www.passbolt.com/docs");

      const customFields = {};
      mockContextRequest(props.context, jest.fn(async(message, arg1) => Object.assign(customFields, arg1.metadata.custom_fields)));
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v5 default totp",
          username: props.resource.metadata.username,
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
          uris: [...props.resource.metadata.uris, "https://www.passbolt.com/docs"],
          description: props.resource.metadata.description,
          custom_fields: [{
            id: customFields[0].id,
            metadata_key: "PASSBOLT",
            type: "text"
          }, {
            id: customFields[1].id,
            metadata_key: "PASSBOLT COMMUNITY",
            type: "text"
          }]
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        password: "RN9n8XuECN3",
        totp: defaultTotpDto({secret_key: "JBSWY3DPEHPK3PXP"}),
        description: "note",
        custom_fields: [{
          id: customFields[0].id,
          secret_value: "This is a secret",
          type: "text"
        }, {
          id: customFields[1].id,
          secret_value: "This is a secret too",
          type: "text"
        }]
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v5 default with totp with password null', async() => {
      expect.assertions(3);
      const props = defaultProps();
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.fillInput(page.password, "RN9n8XuECN3");

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      await page.fillInput(page.resourceTotpKey, "   jbsWY3dpeHPK3PXP   ");

      await page.click(page.addSecret);
      await page.click(page.addSecretNote);

      await page.fillInput(page.note, "note");

      await page.fillInput(page.name, "v5 default totp");

      await page.click(page.deleteSecretPassword);

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v5 default totp",
          username: props.resource.metadata.username,
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
          uris: props.resource.metadata.uris,
          description: props.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        password: null,
        totp: defaultTotpDto({secret_key: "JBSWY3DPEHPK3PXP"}),
        description: "note"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v5 totp after password, custom fields and note deleted', async() => {
      expect.assertions(3);
      const props = defaultProps();
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "password", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.fillInput(page.password, "RN9n8XuECN3");

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      await page.fillInput(page.resourceTotpKey, "   jbsWY3dpeHPK3PXP   ");

      await page.click(page.addSecret);
      await page.click(page.addSecretCustomFields);

      await page.fillInput(page.name, "v5 totp");

      await page.click(page.deleteSecretPassword);
      await page.click(page.deleteSecretNote);
      await page.click(page.deleteSecretCustomFields);

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v5 totp",
          username: null,
          resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP,
          uris: props.resource.metadata.uris,
          description: props.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        totp: defaultTotpDto({secret_key: "JBSWY3DPEHPK3PXP"})
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v5 standalone custom fields', async() => {
      expect.assertions(4);
      const props = defaultCustomFieldsProps();
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, custom_fields: [{id: props.resource.metadata.custom_fields[0].id, type: "text", secret_value: "secret-0"}]}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      expect(page.customFieldsLength).toStrictEqual(1);

      await page.fillInput(page.getCustomFieldKey(0), "PASSBOLT");
      await page.fillInput(page.getCustomFieldValue(0), "This is a secret");

      await page.click(page.addCustomField);
      await page.fillInput(page.getCustomFieldKey(1), "PASSBOLT COMMUNITY");
      await page.fillInput(page.getCustomFieldValue(1), "This is a secret too");

      await page.fillInput(page.name, "v5 standalone custom fields");

      const customFields = {};
      mockContextRequest(props.context, jest.fn(async(message, arg1) => Object.assign(customFields, arg1.metadata.custom_fields)));
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v5 standalone custom fields",
          resource_type_id: TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
          uris: props.resource.metadata.uris,
          description: props.resource.metadata.description,
          username: "",
          custom_fields: [{
            id: customFields[0].id,
            metadata_key: "PASSBOLT",
            type: "text"
          }, {
            id: customFields[1].id,
            metadata_key: "PASSBOLT COMMUNITY",
            type: "text"
          }]
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        custom_fields: [{
          id: customFields[0].id,
          secret_value: "This is a secret",
          type: "text"
        }, {
          id: customFields[1].id,
          secret_value: "This is a secret too",
          type: "text"
        }]
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v4 default with password deleted', async() => {
      expect.assertions(3);
      const props = defaultProps({resource: defaultResourceDto({metadata: defaultResourceMetadataDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, description: null})})});
      mockContextRequest(props.context, () => ({password: "password", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.fillInput(page.password, "RN9n8XuECN3");

      await page.click(page.getSectionItem(2));

      await page.fillInput(page.note, "note");

      await page.fillInput(page.name, "v4 default");

      await page.click(page.deleteSecretPassword);

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: props.resource.resource_type_id,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v4 default",
          username: props.resource.metadata.username,
          resource_type_id: props.resource.metadata.resource_type_id,
          uris: props.resource.metadata.uris,
          description: props.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        password: "",
        description: "note"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v4 default totp with password deleted', async() => {
      expect.assertions(3);
      const props = defaultProps({resource: defaultResourceDto({metadata: defaultResourceMetadataDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, description: null})})});
      mockContextRequest(props.context, () => ({password: "password", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.fillInput(page.password, "RN9n8XuECN3");

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      await page.fillInput(page.resourceTotpKey, "   jbsWY3dpeHPK3PXP   ");

      await page.click(page.getSectionItem(3));

      await page.fillInput(page.note, "note");

      await page.fillInput(page.name, "v4 default totp");

      await page.click(page.deleteSecretPassword);

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v4 default totp",
          username: props.resource.metadata.username,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
          uris: props.resource.metadata.uris,
          description: props.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        password: "",
        totp: defaultTotpDto({secret_key: "JBSWY3DPEHPK3PXP"}),
        description: "note"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v4 default totp', async() => {
      expect.assertions(3);
      const props = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING})});
      mockContextRequest(props.context, () => ({password: "password"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.fillInput(page.password, "RN9n8XuECN3");

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      await page.fillInput(page.resourceTotpKey, "   jbsWY3dpeHPK3PXP   ");

      await page.fillInput(page.name, "v4 default totp");

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v4 default totp",
          username: props.resource.metadata.username,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
          uris: props.resource.metadata.uris,
          description: null
        }
      };

      const secretDtoExpected = {
        password: "RN9n8XuECN3",
        totp: defaultTotpDto({secret_key: "JBSWY3DPEHPK3PXP"}),
        description: props.resource.metadata.description
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to upgrade and save a resource v4 default to v5 default', async() => {
      expect.assertions(3);
      const props = defaultProps({resource: defaultResourceDto({metadata: defaultResourceMetadataDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, description: null})})});
      mockContextRequest(props.context, () => ({password: "RN9n8XuECN3", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.click(page.upgradeButton);

      await page.fillInput(page.name, "v4 default upgraded");

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v4 default upgraded",
          username: props.resource.metadata.username,
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
          uris: props.resource.metadata.uris,
          description: props.resource.metadata.description
        }
      };

      const secretDtoExpected = {
        object_type: SECRET_DATA_OBJECT_TYPE,
        password: "RN9n8XuECN3",
        description: "description"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v4 default without changing secret, only resource type', async() => {
      expect.assertions(3);
      const props = defaultProps({resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING})});
      mockContextRequest(props.context, () => ({password: "RN9n8XuECN3"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.click(page.getSectionItem(2));

      await page.click(page.convertToNote);

      await page.fillInput(page.name, "v4 default");

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v4 default",
          username: props.resource.metadata.username,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
          uris: props.resource.metadata.uris,
          description: null
        }
      };

      const secretDtoExpected = {
        password: "RN9n8XuECN3",
        description: props.resource.metadata.description
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v4 totp after password and note deleted', async() => {
      expect.assertions(3);
      const props = defaultProps({resource: defaultResourceDto({metadata: defaultResourceMetadataDto({resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, description: null})})});
      mockContextRequest(props.context, () => ({password: "password", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretTotp);

      await page.fillInput(page.resourceTotpKey, "   jbsWY3dpeHPK3PXP   ");

      await page.fillInput(page.name, "v4 totp");

      await page.click(page.deleteSecretPassword);
      await page.click(page.deleteSecretNote);

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_TOTP,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v4 totp",
          username: null,
          resource_type_id: TEST_RESOURCE_TYPE_TOTP,
          uris: props.resource.metadata.uris,
          description: null
        }
      };

      const secretDtoExpected = {
        totp: defaultTotpDto({secret_key: "JBSWY3DPEHPK3PXP"}),
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As a signed-in user I should be able to save a resource v4 password and note after standalone totp deleted', async() => {
      expect.assertions(4);
      const props = defaultProps({resource: defaultResourceDto({metadata: defaultResourceMetadataDto({resource_type_id: TEST_RESOURCE_TYPE_TOTP, description: null})})});
      mockContextRequest(props.context, () => ({totp: defaultTotpDto()}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      await page.click(page.addSecret);
      await page.click(page.addSecretPassword);

      await page.fillInput(page.password, "RN9n8XuECN3");

      await page.click(page.addSecret);
      await page.click(page.addSecretNote);

      await page.fillInput(page.note, "note");

      await page.click(page.deleteSecretTotp);

      expect(page.convertToDescription).toBeNull();

      await page.fillInput(page.name, "v4 password and note");

      mockContextRequest(props.context, jest.fn());
      await page.click(page.saveButton);

      const resourceDtoExpected = {
        id: props.resource.id,
        expired: null,
        folder_parent_id: null,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        metadata: {
          object_type: ResourceMetadataEntity.METADATA_OBJECT_TYPE,
          name: "v4 password and note",
          username: props.resource.metadata.username,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
          uris: props.resource.metadata.uris,
          description: null
        }
      };

      const secretDtoExpected = {
        password: "RN9n8XuECN3",
        description: "note"
      };

      // expectations
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.update", resourceDtoExpected, secretDtoExpected);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The resource has been updated successfully");
      expect(props.onClose).toBeCalled();
    });

    it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      expect.assertions(1);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({object_type: SECRET_DATA_OBJECT_TYPE, password: "RN9n8XuECN3", description: "description"}));
      const page = new EditResourcePage(props);
      await waitFor(() => {});

      const error = new PassboltApiFetchError("Jest simulate API error.");
      jest.spyOn(props.context.port, 'request').mockImplementation(() => { throw error; });
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn);


      await page.click(page.saveButton);

      // Throw general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });
  });
});

