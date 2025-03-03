/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 */
import SaveResourcePage from "./SaveResource.test.page";
import {defaultProps} from "./SaveResource.test.data";
import {waitFor} from "@testing-library/react";
import {waitForTrue} from "../../../../test/utils/waitFor";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG, RESOURCE_TYPE_V5_DEFAULT_SLUG
} from "../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV6Dto
} from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Create Resource - save resource", () => {
  it("As a signed-in user creating a password on the quickaccess, I should fill the form with meta received", async() => {
    expect.assertions(4);
    // data mocked
    const props = defaultProps(); // The props to pass
    const resourceMetaFromTab = {
      name: "Passbolt",
      uri: "https://passbolt.com",
      username: "username",
      secret_clear: "secret"
    };
    // functions mocked
    jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => resourceMetaFromTab);
    // process
    const page = new SaveResourcePage(props);
    await waitFor(() => {});
    // expectations
    expect(page.name.value).toBe(resourceMetaFromTab.name);
    expect(page.username.value).toBe(resourceMetaFromTab.username);
    expect(page.uri.value).toBe(resourceMetaFromTab.uri);
    expect(page.password.value).toBe(resourceMetaFromTab.secret_clear);
  });

  it("As a signed-in user creating a password on the quickaccess, I should be able to save resource v4", async() => {
    expect.assertions(2);
    // data mocked
    const props = defaultProps(); // The props to pass
    const resourceMetaFromTab = {
      name: "Passbolt",
      uri: "https://passbolt.com",
      username: "username",
      secret_clear: "secret"
    };
    // functions mocked
    jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => resourceMetaFromTab);
    jest.spyOn(window, 'close').mockImplementation(jest.fn());
    // process
    const page = new SaveResourcePage(props);
    await waitFor(() => {});
    await page.save();
    // expected data
    const resourceTypeId = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG).id;
    const resourceDto = {
      metadata: {
        name: resourceMetaFromTab.name,
        username: resourceMetaFromTab.username,
        uris: [resourceMetaFromTab.uri],
        resource_type_id: resourceTypeId,
      },
      resource_type_id: resourceTypeId,
      folder_parent_id: null,
      expired: props.passwordExpiryContext.getDefaultExpirationDate(),
    };
    const secretDto = {
      password: resourceMetaFromTab.secret_clear,
      description: "",
      resource_type_id: resourceTypeId,
    };
    // expectations
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.create", resourceDto, secretDto);
    expect(window.close).toHaveBeenCalled();
  });

  it("As a signed-in user creating a password on the quickaccess, I should be able to save resource v5", async() => {
    expect.assertions(2);
    // data mocked
    const metadataTypeSettings = new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto());
    const props = defaultProps({metadataTypeSettings}); // The props to pass
    const resourceMetaFromTab = {
      name: "Passbolt",
      uri: "https://passbolt.com",
      username: "username",
      secret_clear: "secret"
    };
    // functions mocked
    jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => resourceMetaFromTab);
    jest.spyOn(window, 'close').mockImplementation(jest.fn());
    // process
    const page = new SaveResourcePage(props);
    await waitFor(() => {});
    await page.save();
    // expected data
    const resourceTypeId = props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG).id;
    const resourceDto = {
      metadata: {
        object_type: "PASSBOLT_RESOURCE_METADATA",
        name: resourceMetaFromTab.name,
        username: resourceMetaFromTab.username,
        uris: [resourceMetaFromTab.uri],
        resource_type_id: resourceTypeId,
      },
      resource_type_id: resourceTypeId,
      folder_parent_id: null,
      expired: props.passwordExpiryContext.getDefaultExpirationDate(),
    };
    const secretDto = {
      password: resourceMetaFromTab.secret_clear,
      description: "",
      resource_type_id: resourceTypeId,
    };
    // expectations
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.create", resourceDto, secretDto);
    expect(window.close).toHaveBeenCalled();
  });

  it("As a signed-in user, I can change the content of the form", async() => {
    expect.assertions(4);
    // data mocked
    const props = defaultProps(); // The props to pass
    const resourceMetaFromTab = {
      name: "",
      uri: "",
      username: "",
      secret_clear: ""
    };
    // functions mocked
    jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => resourceMetaFromTab);
    // process
    const page = new SaveResourcePage(props);
    await waitFor(() => {});

    const expectedData = {
      name: "Test input",
      uri: "https://another.uri.com",
      username: "ada@passbolt.com",
      password: "test",
    };

    await page.setFormWith(expectedData);

    expect(page.name.value).toStrictEqual(expectedData.name);
    expect(page.uri.value).toStrictEqual(expectedData.uri);
    expect(page.username.value).toStrictEqual(expectedData.username);
    expect(page.password.value).toStrictEqual(expectedData.password);
  });

  it("As a signed-in user, I can see error messages if the data is invalid", async() => {
    expect.assertions(2);
    // data mocked
    const props = defaultProps(); // The props to pass

    const resourceMetaFromTab = {
      name: "",
      uri: "test",
      username: "",
      secret_clear: ""
    };
    // functions mocked
    props.context.port.addRequestListener("passbolt.quickaccess.prepare-autosave", () => resourceMetaFromTab);
    // process
    const page = new SaveResourcePage(props);
    await waitForTrue(() => page.uri.value === resourceMetaFromTab.uri);

    await page.save();

    expect(page.nameError.textContent).toStrictEqual("A name is required.");
    expect(page.passwordError.textContent).toStrictEqual("A password is required.");
  });

  it("As a signed-in user, I can see error messages from the API", async() => {
    expect.assertions(4);
    // data mocked
    const props = defaultProps(); // The props to pass
    const resourceMetaFromTab = {
      name: "Test",
      secret_clear: "password"
    };

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

    // functions mocked
    props.context.port.addRequestListener("passbolt.quickaccess.prepare-autosave", () => resourceMetaFromTab);
    props.context.port.addRequestListener("passbolt.resources.create", () => { throw apiError; });

    // process
    const page = new SaveResourcePage(props);
    await waitForTrue(() => page.name.value === resourceMetaFromTab.name);

    await page.save();

    expect(page.nameError.textContent).toStrictEqual("The name is invalid");
    expect(page.uriError.textContent).toStrictEqual("The uri is invalid, The uri contains a forbidden scheme");
    expect(page.usernameError.textContent).toStrictEqual("The username is invalid");
    expect(page.passwordError.textContent).toStrictEqual("The password is too weak");
  });
});
