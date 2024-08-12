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

  it("As a signed-in user creating a password on the quickaccess, I should be able to save resource", async() => {
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
    const resourceTypeId = props.context.resourceTypesSettings.findResourceTypeIdBySlug(props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION);
    const resourceDto = {
      metadata: {
        name: resourceMetaFromTab.name,
        username: resourceMetaFromTab.username,
        uris: [resourceMetaFromTab.uri],
        resource_type_id: resourceTypeId,
      },
      resource_type_id: resourceTypeId,
      expired: props.passwordExpiryContext.getDefaultExpirationDate(),
    };
    const secretDto = {
      password: resourceMetaFromTab.secret_clear,
      description: ""
    };
    // expectations
    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.create", resourceDto, secretDto);
    expect(window.close).toHaveBeenCalled();
  });
});
