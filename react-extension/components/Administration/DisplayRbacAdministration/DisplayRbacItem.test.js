/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */

import DisplayRbacItemPage from "./DisplayRbacItem.test.page";
import {defaultProps} from "./DisplayRbacItem.test.data";
import {waitFor} from "@testing-library/dom";
import {controlFunctions} from "../../../../shared/services/rbacs/controlFunctionEnumeration";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";

describe("DisplayRbacItem", () => {
  it("displays the select input for each role", async() => {
    expect.assertions(3);

    const props = defaultProps();
    const page = new DisplayRbacItemPage(props);
    await waitFor(() => {});

    expect(page.label.textContent).toEqual(props.label);
    expect(page.selectAdmin).not.toBeNull();
    expect(page.selectRole("user")).not.toBeNull();
  });

  it("should disable admin select by default", async() => {
    expect.assertions(1);

    const props = defaultProps();
    const page = new DisplayRbacItemPage(props);
    await waitFor(() => {});

    expect(page.selectedRoleOption("admin").classList.contains('disabled')).toBeTruthy();
  });

  it("should disable all select if not rbacs are defined", async() => {
    expect.assertions(2);

    const props = defaultProps({
      rbacs: null
    });
    const page = new DisplayRbacItemPage(props);
    await waitFor(() => {});

    expect(page.selectedRoleOption("user").classList.contains('disabled')).toBeTruthy();
    expect(page.selectedRoleOption("admin").classList.contains('disabled')).toBeTruthy();
  });

  it("should display the default value for role other than admin", async() => {
    expect.assertions(2);

    const props = defaultProps();
    const page = new DisplayRbacItemPage(props);
    await waitFor(() => {});
    //Click on select to open dropdown
    await page.clickOnSelect("user");

    expect(page.selectedRoleOption("user").classList.contains('disabled')).toBeFalsy();
    expect(page.getRoleOption("user", controlFunctions.DENY)).not.toBeNull();
    /*
     * Remove ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP for version 4.5.0
     *  expect(page.getRoleOption("user", controlFunctions.ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP)).toBeNull();
     */
  });

  it("should display the an extra option for group manager when ", async() => {
    expect.assertions(2);

    const props = defaultProps({
      actionName: uiActions.USERS_VIEW_WORKSPACE,
    });
    const page = new DisplayRbacItemPage(props);
    await waitFor(() => {});
    //Click on select to open dropdown
    await page.clickOnSelect("user");

    expect(page.selectedRoleOption("user").classList.contains('disabled')).toBeFalsy();
    expect(page.getRoleOption("user", controlFunctions.ALLOW)).not.toBeNull();
    /*
     * Remove ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP for version 4.5.0
     * expect(page.getRoleOption("user", controlFunctions.ALLOW_IF_GROUP_MANAGER_IN_ONE_GROUP)).not.toBeNull();
     */
  });
});
