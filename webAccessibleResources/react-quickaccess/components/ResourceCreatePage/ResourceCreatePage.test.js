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
 * @since         3.2.0
 */

import {cleanup} from '@testing-library/react';
import "../../../shared/lib/Secret/SecretComplexity";
import {waitFor} from "@testing-library/dom";
import "../../../react-extension/test/lib/crypto/cryptoGetRandomvalues";
import {defaultProps} from "./ResourceCreatePage.test.data";
import {ConfirmCreatePageRuleVariations} from "../ConfirmCreatePage/ConfirmCreatePage";
import {
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_V5_DEFAULT
} from "../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceCreatePagePage from "./ResourceCreatePage.test.page";
import {waitForTrue} from "../../../../test/utils/waitFor";
import {defaultResourceDto} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import {DateTime} from "luxon";
import {createMemoryHistory} from "history";
import {defaultPasswordExpirySettingsContext} from '../../../react-extension/contexts/PasswordExpirySettingsContext.test.data';
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV6Dto
} from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";

// Reset the modules before each test.
beforeEach(() => {
  jest.useFakeTimers();
  jest.resetModules();
});

// Cleanup after each test.
afterEach(() => {
  cleanup();
  delete window.passbolt;
  jest.clearAllTimers();
});

describe("ResourceCreatePage", () => {
  describe("Form initialization", () => {
    it("should intialize the name and uri input fields with the active tab metadata", async() => {
      expect.assertions(4);

      const expectedData = {
        name: "Passbolt Browser Extension Test",
        uri: "https://passbolt-browser-extension/test",
        secret_clear: "AAAAAAAAAAAAAAAAAA",
      };

      const props = defaultProps();
      props.prepareResourceContext.consumeLastGeneratedPassword.mockImplementation(() => null);
      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", async() => expectedData);

      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => Boolean(page.name.value));

      // Assert the form.
      expect(page.name.value).toStrictEqual(expectedData.name);
      expect(page.uri.value).toStrictEqual(expectedData.uri);
      expect(page.username.value).toStrictEqual(props.context.userSettings.username);
      expect(page.password.value).toStrictEqual(expectedData.secret_clear);
    });

    it("should not initialize with chrome new tab metadata", async() => {
      expect.assertions(2);

      const expectedData = {
        name: "newtab",
        uri: "chrome://newtab/"
      };

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", async() => expectedData);
      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => page.name.value === "");

      // Assert the form.
      expect(page.name.value).toStrictEqual("");
      expect(page.uri.value).toStrictEqual("");
    });

    it("should not initialize with firefox new tab metadata", async() => {
      const expectedData = {
        name: "",
        uri: "about:newtab"
      };

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", async() => expectedData);
      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => page.name.value === "");

      // Assert the form.
      expect(page.name.value).toStrictEqual("");
      expect(page.uri.value).toStrictEqual("");
    });
  });

  describe("Form submission", () => {
    it("should create a new password v4 on submit", async() => {
      expect.assertions(2);

      const fakeNow = DateTime.fromISO("2023-11-24T00:00:00.000Z");
      jest.setSystemTime(fakeNow.toMillis());

      const expectedResourceDto = {
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        folder_parent_id: null,
        metadata: {
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
          name: "Passbolt Browser Extension Test",
          uris: ["https://passbolt-browser-extension/test"],
          username: "test@passbolt.com",
        },
        expired: fakeNow.plus({days: 30}).plus({milliseconds: 150}).toJSDate().toISOString(),
      };

      const expectedSecretDto = {
        password: "P4ssb0ltP4ssb0lt",
        description: "",
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
      };

      const props = defaultProps();
      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => true);

      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", () => ({
        name: expectedResourceDto.metadata.name,
        uri: expectedResourceDto.metadata.uris[0],
      }));

      props.context.port.addRequestListener("passbolt.secrets.powned-password", () => 0);

      let resourceCreated = false;
      props.context.port.addRequestListener("passbolt.resources.create", (resourceDto, secretDto) => {
        expect(resourceDto).toStrictEqual(expectedResourceDto);
        expect(secretDto).toStrictEqual(expectedSecretDto);
        resourceCreated = true;
        return defaultResourceDto();
      });

      const page = new ResourceCreatePagePage(props);
      jest.setSystemTime(fakeNow.toMillis());
      await waitForTrue(() => page.name.value === expectedResourceDto.metadata.name);

      // Fill the form empty fields"
      await page.setFormWith({
        username: "test@passbolt.com",
        password: "P4ssb0ltP4ssb0lt",
      });

      // Submit the form.
      await page.submitForm();
      await waitForTrue(() => resourceCreated);
    });

    it("should create a new password v5 on submit", async() => {
      expect.assertions(2);

      const fakeNow = DateTime.fromISO("2023-11-24T00:00:00.000Z");
      jest.setSystemTime(fakeNow.toMillis());

      const expectedResourceDto = {
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        folder_parent_id: null,
        metadata: {
          object_type: "PASSBOLT_RESOURCE_METADATA",
          resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
          name: "Passbolt Browser Extension Test",
          uris: ["https://passbolt-browser-extension/test"],
          username: "test@passbolt.com",
        },
        expired: fakeNow.plus({days: 30}).plus({milliseconds: 150}).toJSDate().toISOString(),
      };

      const expectedSecretDto = {
        password: "P4ssb0ltP4ssb0lt",
        description: "",
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
      };
      const metadataTypeSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
      const props = defaultProps({metadataTypeSettings});
      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => true);

      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", () => ({
        name: expectedResourceDto.metadata.name,
        uri: expectedResourceDto.metadata.uris[0],
      }));

      props.context.port.addRequestListener("passbolt.secrets.powned-password", () => 0);

      let resourceCreated = false;
      props.context.port.addRequestListener("passbolt.resources.create", (resourceDto, secretDto) => {
        expect(resourceDto).toStrictEqual(expectedResourceDto);
        expect(secretDto).toStrictEqual(expectedSecretDto);
        resourceCreated = true;
        return defaultResourceDto();
      });

      const page = new ResourceCreatePagePage(props);
      jest.setSystemTime(fakeNow.toMillis());
      await waitForTrue(() => page.name.value === expectedResourceDto.metadata.name);

      // Fill the form empty fields"
      await page.setFormWith({
        username: "test@passbolt.com",
        password: "P4ssb0ltP4ssb0lt",
      });

      // Submit the form.
      await page.submitForm();
      await waitForTrue(() => resourceCreated);
    });

    it("should ask for password creation confirmation if the entropy is too low", async() => {
      expect.assertions(4);

      const props = defaultProps({history: createMemoryHistory()});

      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => true);

      const preparedResource = {
        name: "Passbolt Browser Extension Test",
        uri: "https://passbolt-browser-extension/test",
      };

      props.prepareResourceContext.consumeLastGeneratedPassword.mockImplementation(() => null);
      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", async() => preparedResource);
      props.context.port.addRequestListener("passbolt.secrets.powned-password", async() => 0);

      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => page.name.value === preparedResource.name);

      expect(page.complexityText).toBe("Quality Entropy: 0.0 bits");

      await page.setFormWith({
        password: "test",
        username: "test@passbolt.com",
      });

      expect(page.complexityText).toBe("Very weak Entropy: 18.8 bits");

      await page.submitForm();
      await waitFor(() => {});
      await waitForTrue(() => props.history.location.pathname.toString() !== "/");

      const expectedPageProps = {
        resourceName: "Passbolt Browser Extension Test",
        rule: ConfirmCreatePageRuleVariations.MINIMUM_ENTROPY
      };
      expect(props.history.location.pathname.toString()).toStrictEqual('/webAccessibleResources/quickaccess/resources/confirm-create');
      expect(props.history.location.state).toStrictEqual(expectedPageProps);
    });

    it("should ask for password creation confirmation if the passphrase is found in a data breach", async() => {
      expect.assertions(4);

      const props = defaultProps({history: createMemoryHistory()});

      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => true);

      const preparedResource = {
        name: "Passbolt Browser Extension Test",
        uri: "https://passbolt-browser-extension/test",
      };

      props.prepareResourceContext.consumeLastGeneratedPassword.mockImplementation(() => null);
      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", async() => preparedResource);
      props.context.port.addRequestListener("passbolt.secrets.powned-password", async() => 3);

      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => page.name.value === preparedResource.name);

      expect(page.complexityText).toBe("Quality Entropy: 0.0 bits");

      await page.setFormWith({
        password: "hello-world/hello-world",
        username: "test@passbolt.com",
      });

      expect(page.complexityText).toBe("Strong Entropy: 112.9 bits");

      await page.submitForm();
      await waitFor(() => {});
      await waitForTrue(() => props.history.location.pathname.toString() !== "/");

      const expectedPageProps = {
        resourceName: "Passbolt Browser Extension Test",
        rule: ConfirmCreatePageRuleVariations.IN_DICTIONARY
      };
      expect(props.history.location.pathname.toString()).toStrictEqual('/webAccessibleResources/quickaccess/resources/confirm-create');
      expect(props.history.location.state).toStrictEqual(expectedPageProps);
    });

    it("should create a new password on submit when the dictionary service is unreachable", async() => {
      expect.assertions(3);

      const fakeNow = DateTime.fromISO("2023-11-24T00:00:00.000Z");
      jest.setSystemTime(fakeNow.toMillis());

      // Assert the request to create a password has been called and contain the expected parameters.
      const expectedResourceDto = {
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
        folder_parent_id: null,
        metadata: {
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
          name: "Passbolt Browser Extension Test",
          uris: ["https://passbolt-browser-extension/test"],
          username: "test@passbolt.com",
        },
        expired: fakeNow.plus({days: 30}).plus({milliseconds: 150}).toJSDate().toISOString(),
      };

      const expectedSecretDto = {
        password: "P4ssb0ltP4ssb0lt",
        description: "",
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
      };

      const props = defaultProps();
      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => true);

      let isPreparedResourceSet = false;
      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", async() => {
        isPreparedResourceSet = true;
        return {
          name: expectedResourceDto.metadata.name,
          uri: expectedResourceDto.metadata.uris[0],
        };
      });

      props.context.port.addRequestListener("passbolt.secrets.powned-password", async password => {
        expect(password).toStrictEqual(expectedSecretDto.password);
        throw new Error();
      });

      props.context.port.addRequestListener("passbolt.resources.create", async(resourceDto, secretDto) => {
        expect(resourceDto).toStrictEqual(expectedResourceDto);
        expect(secretDto).toStrictEqual(expectedSecretDto);
        return defaultResourceDto();
      });

      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => page.name.value === expectedResourceDto.metadata.name);

      await waitForTrue(() => isPreparedResourceSet);

      // Fill the form empty fields
      await page.setFormWith({
        username: "test@passbolt.com",
        password: "P4ssb0ltP4ssb0lt",
      });

      // Submit the form.
      await page.submitForm();
    });
  });

  describe("Form validation", () => {
    it("should not submit the form if there is an error", async() => {
      expect.assertions(2);

      const resourceData = {
        name: "",
        uri: 42,
        username: 42
      };

      const props = defaultProps({
        passwordExpiryContext: defaultPasswordExpirySettingsContext({automatic_update: false}),
      });

      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => false);
      props.prepareResourceContext.consumePreparedResource.mockImplementation(() => resourceData);

      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => page.name.value === resourceData.name);

      // Fill the form empty fields
      await page.setFormWith({
        password: "",
      });

      await page.submitForm();

      expect(page.nameError.textContent).toStrictEqual('A name is required.');
      expect(page.passwordError.textContent).toStrictEqual('A password is required.');
    });

    it("should display the error from the API", async() => {
      expect.assertions(4);

      const apiError = new Error();
      apiError.name = "PassboltApiFetchError";
      apiError.data = {
        code: 400,
        body: {
          name: ["The name is invalid"],
          uri: ["The uri is invalid", "The uri contains a forbidden scheme"],
          username: ["The username is invalid"],
          password: ["The password is too weak"],
        }
      };

      const props = defaultProps({
        passwordExpiryContext: defaultPasswordExpirySettingsContext({automatic_update: false}),
      });
      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => false);
      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", () => null);
      props.context.port.addRequestListener("passbolt.resources.create", () => { throw apiError; });
      props.prepareResourceContext.consumePreparedResource.mockImplementation(() => ({
        name: "Resource name",
        uri: "resource uri",
        username: "resource username",
      }));

      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => page.name.value === "Resource name");

      // Fill the form empty fields
      await page.setFormWith({
        password: "Here's a password!",
      });

      await page.submitForm();

      await waitForTrue(() => Boolean(page.nameError?.textContent));

      expect(page.nameError.textContent).toStrictEqual('The name is invalid');
      expect(page.uriError.textContent).toStrictEqual('The uri is invalid, The uri contains a forbidden scheme');
      expect(page.usernameError.textContent).toStrictEqual('The username is invalid');
      expect(page.passwordError.textContent).toStrictEqual('The password is too weak');
    });

    it("should do nothing if user aborted the operation", async() => {
      expect.assertions(5);

      const error = new Error();
      error.name = "UserAbortsOperationError";

      const props = defaultProps({
        passwordExpiryContext: defaultPasswordExpirySettingsContext({automatic_update: false}),
      });
      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => false);
      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", () => null);

      let promiseRejecter;
      props.context.port.addRequestListener("passbolt.resources.create", () => {
        const promise = new Promise((_, reject) => {
          promiseRejecter = reject;
        });
        return promise;
      });

      const expectedValues = {
        name: "Resource name",
        uri: "resource uri",
        username: "resource username",
        password: "Here's a password!"
      };
      props.prepareResourceContext.consumePreparedResource.mockImplementation(() => expectedValues);
      props.prepareResourceContext.lastGeneratedPassword = expectedValues.password;

      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => page.name.value === expectedValues.name);
      await waitFor(() => {});

      await page.submitForm();
      await waitFor(() => {});

      expect(page.isSubmitting).toStrictEqual(true);

      await promiseRejecter(error);
      await waitForTrue(() => !page.isSubmitting);

      expect(page.name.value).toStrictEqual(expectedValues.name);
      expect(page.uri.value).toStrictEqual(expectedValues.uri);
      expect(page.username.value).toStrictEqual(expectedValues.username);
      expect(page.password.value).toStrictEqual(expectedValues.password);
    });

    it("should display the unexpected error after submitting", async() => {
      expect.assertions(6);

      const errorMessage = "This is an unexpected error";
      const error = new Error(errorMessage);
      error.name = "UnexpectedError";

      const props = defaultProps({
        passwordExpiryContext: defaultPasswordExpirySettingsContext({automatic_update: false}),
      });
      props.passwordPoliciesContext.shouldRunDictionaryCheck.mockImplementation(() => false);
      props.context.port.addRequestListener("passbolt.quickaccess.prepare-resource", () => null);

      let promiseRejecter;
      props.context.port.addRequestListener("passbolt.resources.create", () => {
        const promise = new Promise((_, reject) => {
          promiseRejecter = reject;
        });
        return promise;
      });

      const expectedValues = {
        name: "Resource name",
        uri: "resource uri",
        username: "resource username",
        password: "Here's a password!"
      };
      props.prepareResourceContext.consumePreparedResource.mockImplementation(() => expectedValues);
      props.prepareResourceContext.lastGeneratedPassword = expectedValues.password;

      const page = new ResourceCreatePagePage(props);
      await waitForTrue(() => page.name.value === expectedValues.name);
      await waitFor(() => {});

      await page.submitForm();
      await waitFor(() => {});

      expect(page.isSubmitting).toStrictEqual(true);

      await promiseRejecter(error);
      await waitForTrue(() => !page.isSubmitting);

      expect(page.name.value).toStrictEqual(expectedValues.name);
      expect(page.uri.value).toStrictEqual(expectedValues.uri);
      expect(page.username.value).toStrictEqual(expectedValues.username);
      expect(page.password.value).toStrictEqual(expectedValues.password);
      expect(page.unexpectedError).toStrictEqual(errorMessage);
    });
  });

  describe("As LU I can navigate from the 'Resource Create' page", () => {
    it("should allow to go back on the previous page", async() => {
      expect.assertions(1);

      const props = defaultProps();
      props.history = createMemoryHistory({
        initialEntries: [
          "/home",
          "/test"
        ],
        initialIndex: 1,
      });

      const initialPath = props.history.location.pathname.toString();
      props.history.goBack();

      const page = new ResourceCreatePagePage(props);
      await waitFor(() => {});

      await page.clickOnBackButton();
      await waitForTrue(() => props.history.location.pathname !== initialPath);

      expect(props.history.location.pathname).toStrictEqual("/home");
    });
  });
});


