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
 * @since         4.9.4
 */

import {waitFor} from "@testing-library/dom";
import {defaultResourceDto, resourceWithTotpDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultResourceMetadataDto} from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import {TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION, TEST_RESOURCE_TYPE_PASSWORD_STRING} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import {defaultProps} from "./EditResourceDescription.test.data";
import EditResourceDescriptionPage from "./EditResourceDescription.test.page";
import {waitForTrue} from "../../../../../test/utils/waitFor";
import {defaultTotpViewModelDto} from "../../../../shared/models/totp/TotpDto.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("EditResourceDescription", () => {
  it("should display the description from an encrypted description", () => {
    expect.assertions(1);

    const expectedDescription = "This is an encrypted description";
    const props = defaultProps({
      plaintextSecretDto: {
        description: expectedDescription
      }
    });
    const page = new EditResourceDescriptionPage(props);

    expect(page.description.value).toStrictEqual(expectedDescription);
  });

  it("should display the description from an unencrypted description", () => {
    expect.assertions(1);

    const expectedDescription = "This is an unencrypted description";
    const props = defaultProps({
      resource: defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        metadata: defaultResourceMetadataDto({
          description: expectedDescription
        })
      })
    });
    const page = new EditResourceDescriptionPage(props);

    expect(page.description.value).toStrictEqual(expectedDescription);
  });

  it("should not toggle the description encryption state if the description is already encrypted", async() => {
    expect.assertions(4);

    const expectedDescription = "This is an encrypted description";
    const props = defaultProps({
      plaintextSecretDto: {
        description: expectedDescription
      }
    });
    const page = new EditResourceDescriptionPage(props);

    expect(page.isDescriptionEncrypted).toStrictEqual(true);
    expect(page.description.value).toStrictEqual(expectedDescription);

    await page.clickOnLock();

    expect(page.isDescriptionEncrypted).toStrictEqual(true);
    //the description should not change
    expect(page.description.value).toStrictEqual(expectedDescription);
  });

  it("should not toggle the description encryption state if the description is already encrypted for resource with a TOTP", async() => {
    expect.assertions(4);

    const props = defaultProps({
      plaintextSecretDto: {
        password: "a password",
        description: "This is an encrypted description",
        totp: defaultTotpViewModelDto(),
      },
      resource: resourceWithTotpDto()
    });
    const page = new EditResourceDescriptionPage(props);

    expect(page.isDescriptionEncrypted).toStrictEqual(true);
    expect(page.description.value).toStrictEqual(props.plaintextSecretDto.description);

    await page.clickOnLock();

    expect(page.isDescriptionEncrypted).toStrictEqual(true);
    //the description should not change
    expect(page.description.value).toStrictEqual(props.plaintextSecretDto.description);
  });

  it("should toggle the description encryption state if the description is not already encrypted", async() => {
    expect.assertions(5);

    const expectedDescription = "This is an unencrypted description";
    const props = defaultProps({
      resource: defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        metadata: defaultResourceMetadataDto({
          description: expectedDescription,
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        })
      })
    });
    const page = new EditResourceDescriptionPage(props);

    expect(page.isDescriptionEncrypted).toStrictEqual(false);
    expect(page.description.value).toStrictEqual(expectedDescription);

    await page.clickOnLock();

    expect(page.isDescriptionEncrypted).toStrictEqual(true);

    await page.clickOnLock();

    expect(page.isDescriptionEncrypted).toStrictEqual(false);
    //the description should not change
    expect(page.description.value).toStrictEqual(expectedDescription);
  });

  it("should save the updated description from an encrypted description", async() => {
    expect.assertions(4);

    const plaintextSecretDto = {
      password: "this is my password",
      description: "This is the current description, unchanged"
    };
    const expectedDescription = "This is an encrypted description";
    const props = defaultProps({plaintextSecretDto});

    const expectedResourceDto = {
      id: props.resource.id,
      resource_type_id: props.resource.resource_type_id,
      folder_parent_id: props.resource.folder_parent_id,
      expired: props.resource.expired,
      metadata: {
        name: props.resource.metadata.name,
        uris: props.resource.metadata.uris,
        username: props.resource.metadata.username,
        resource_type_id: props.resource.metadata.resource_type_id,
      },
    };

    props.context.port.addRequestListener("passbolt.resources.update", (resourceDto, secretDto) => {
      expect(resourceDto).toStrictEqual(expectedResourceDto);
      expect(secretDto).toStrictEqual({
        password: plaintextSecretDto.password,
        description: expectedDescription
      });

      return resourceDto;
    });

    const spyOnSecretFind = jest.fn();
    props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", spyOnSecretFind);

    const page = new EditResourceDescriptionPage(props);

    await page.setFormWith({
      description: expectedDescription
    });

    expect(page.description.value).toStrictEqual(expectedDescription);

    page.clickOnSave();
    await waitFor(() => {});

    expect(spyOnSecretFind).not.toHaveBeenCalled();
  });

  it("should save the updated description from an unencrypted description", async() => {
    expect.assertions(4);

    const expectedDescription = "This is an encrypted description";
    const props = defaultProps({
      resource: defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        metadata: defaultResourceMetadataDto({
          description: "This is the current description, unchanged",
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        })
      })
    });

    const expectedResourceDto = {
      id: props.resource.id,
      resource_type_id: props.resource.resource_type_id,
      folder_parent_id: props.resource.folder_parent_id,
      expired: props.resource.expired,
      metadata: {
        name: props.resource.metadata.name,
        uris: props.resource.metadata.uris,
        username: props.resource.metadata.username,
        resource_type_id: props.resource.metadata.resource_type_id,
        description: expectedDescription,
      },
    };

    props.context.port.addRequestListener("passbolt.resources.update", (resourceDto, secretDto) => {
      expect(resourceDto).toStrictEqual(expectedResourceDto);
      expect(secretDto).toBeNull();

      return resourceDto;
    });

    const spyOnSecretFind = jest.fn();
    props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", spyOnSecretFind);

    const page = new EditResourceDescriptionPage(props);

    await page.setFormWith({
      description: expectedDescription
    });

    expect(page.description.value).toStrictEqual(expectedDescription);

    page.clickOnSave();
    await waitForTrue(() => page.isProcessing);
    await waitForTrue(() => !page.isProcessing);

    expect(spyOnSecretFind).not.toHaveBeenCalled();
  });

  it("should save the updated description from an unencrypted description to an encrypted description", async() => {
    expect.assertions(4);

    const expectedDescription = "This is an encrypted description";
    const props = defaultProps({
      resource: defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        metadata: defaultResourceMetadataDto({
          description: "This is the current description, unchanged",
          resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
        })
      })
    });

    const expectedResourceDto = {
      id: props.resource.id,
      resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
      folder_parent_id: props.resource.folder_parent_id,
      expired: props.resource.expired,
      metadata: {
        name: props.resource.metadata.name,
        uris: props.resource.metadata.uris,
        username: props.resource.metadata.username,
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
      },
    };

    const currentPassword = "This is the current password";

    const expectedSecretDto = {
      password: currentPassword,
      description: expectedDescription,
      resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
    };

    props.context.port.addRequestListener("passbolt.resources.update", (resourceDto, secretDto) => {
      expect(resourceDto).toStrictEqual(expectedResourceDto);
      expect(secretDto).toStrictEqual(expectedSecretDto);

      return resourceDto;
    });

    props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", async resourceId => {
      expect(resourceId).toStrictEqual(props.resource.id);
      return {
        password: currentPassword,
      };
    });

    const page = new EditResourceDescriptionPage(props);

    await page.setFormWith({
      description: expectedDescription
    });
    await page.clickOnLock();

    expect(page.description.value).toStrictEqual(expectedDescription);

    page.clickOnSave();
    await waitForTrue(() => page.isProcessing);
    await waitForTrue(() => !page.isProcessing);
  });

  it("should display the error from the saving process if something goes wrong", async() => {
    expect.assertions(1);

    const props = defaultProps();

    const expectedErrorMessage = "Something went wrong there!";
    props.context.port.addRequestListener("passbolt.resources.update", async() => { throw new Error(expectedErrorMessage); });

    const page = new EditResourceDescriptionPage(props);

    page.clickOnSave();
    await waitForTrue(() => page.isProcessing);
    await waitForTrue(() => !page.isProcessing);

    expect(page.errorMessage.textContent).toStrictEqual(expectedErrorMessage);
  });

  it("should do nothing if the user aborted the operation", async() => {
    expect.assertions(1);

    const props = defaultProps();

    const error = new Error();
    error.name = "UserAbortsOperationError";
    props.context.port.addRequestListener("passbolt.resources.update", async() => { throw error; });

    const page = new EditResourceDescriptionPage(props);

    page.clickOnSave();
    await waitForTrue(() => page.isProcessing);
    await waitForTrue(() => !page.isProcessing);

    expect(page.errorMessage).toBeNull();
  });
});
