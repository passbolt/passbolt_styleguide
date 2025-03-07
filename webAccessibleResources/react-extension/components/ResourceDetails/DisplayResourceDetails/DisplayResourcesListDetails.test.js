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
 * Unit tests on PasswordSidebar in regard of specifications
 */

import {waitFor} from "@testing-library/dom";
import {defaultProps} from "./DisplayResourcesListDetails.test.data";
import DisplayResourcesListDetailsPage from "./DisplayResourcesListDetails.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayResourcesListDetails", () => {
  let props, page;

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new DisplayResourcesListDetailsPage(props);
  });

  it('I should see a list of resources in the sidebar', () => {
    expect.assertions(1);
    expect(page.exists()).toBeTruthy();
  });

  it('I can see a sumed up information of the resources', async() => {
    expect.assertions(9);
    expect(page.resourceName(0)).toStrictEqual("Passbolt");
    expect(page.resourceType(0)).toStrictEqual("Password");
    expect(page.resourcePermission(0)).toStrictEqual("Is owner");

    expect(page.resourceName(1)).toStrictEqual("Passbolt");
    expect(page.resourceType(1)).toStrictEqual("Password and Encrypted description");
    expect(page.resourcePermission(1)).toStrictEqual("Can edit");

    expect(page.resourceName(2)).toStrictEqual("Passbolt");
    expect(page.resourceType(2)).toStrictEqual("Password, Encrypted description and TOTP");
    expect(page.resourcePermission(2)).toStrictEqual("Can read");
  });

  it('I can remove an element from the list', async() => {
    expect.assertions(2);
    const resourceIndex = 1;
    const expectedResource = props.resourceWorkspaceContext.selectedResources[resourceIndex];

    await page.clickOn(page.resourceUnselectButton(resourceIndex));
    await waitFor(() => {});

    expect(props.resourceWorkspaceContext.onResourceSelected.multiple).toHaveBeenCalledTimes(1);
    expect(props.resourceWorkspaceContext.onResourceSelected.multiple).toHaveBeenCalledWith(expectedResource);
  });
});
