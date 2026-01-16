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
 * Unit tests on DisplayUserWorkspace in regard of specifications
 */
import React from "react";
import {
  propsWithGroupDetails,
  propsWithoutLock,
  propsWithSelecteUser,
  propsWithUserDetails,
} from "./DisplayUserWorkspace.test.data";
import DisplayUserWorkspacePage from "./DisplayUserWorkspace.test.page";
import { waitFor } from "@testing-library/dom";

jest.mock("../FilterUsersByGroups/FilterUsersByGroup", () => () => <></>);
jest.mock("../FilterUsersByShortcut/FilterUsersByShortcut", () => () => <></>);
jest.mock("../FilterUsersByText/FilterUsersByText", () => () => <></>);
jest.mock("../../UserGroup/DisplayUserGroupDetails/DisplayUserGroupDetails", () => () => (
  <span className="user-group-details"></span>
));
jest.mock("../DisplayUserWorkspaceMainActions/DisplayUserWorkspaceMainActions", () => () => <></>);
jest.mock("../FilterUsersByBreadcrumb/FilterUsersByBreadcrumb", () => () => <></>);
jest.mock("../DisplayUsers/DisplayUsers", () => () => <span className="tableview"></span>);
jest.mock("../../UserDetails/DisplayUserDetails/DisplayUserDetails", () => () => (
  <span className="user-details"></span>
));
jest.mock("../DisplayUserWorkspaceActions/DisplayUserWorkspaceActions", () => () => <></>);
jest.mock("../../Common/Navigation/Header/Logo");
jest.mock("../DisplayUserBadgeMenu/DisplayUserBadgeMenu", () => () => <></>);
jest.mock("../../Common/Footer/Footer", () => () => <span className="footer"></span>);

beforeEach(() => {
  jest.resetModules();
});

describe("Display User Workspace", () => {
  let page; // The page to test against

  it("As LU, I should see the user details area if the area is locked and the details is on an user", async () => {
    expect.assertions(2);
    page = new DisplayUserWorkspacePage(propsWithUserDetails());
    await waitFor(() => {});
    expect(page.isGridDisplayed).toBeTruthy();
    expect(page.hasUserDetails).toBeTruthy();
  });

  it("As LU, I should see the user group details area if the area is locked and the details is on an user group", async () => {
    expect.assertions(2);
    page = new DisplayUserWorkspacePage(propsWithGroupDetails());
    await waitFor(() => {});
    expect(page.isGridDisplayed).toBeTruthy();
    expect(page.hasUserGroupDetails).toBeTruthy();
  });

  it("As LU, I should not see any details area if the area is not locked", async () => {
    expect.assertions(3);
    page = new DisplayUserWorkspacePage(propsWithoutLock());
    await waitFor(() => {});
    expect(page.isGridDisplayed).toBeTruthy();
    expect(page.hasUserDetails).toBeFalsy();
    expect(page.hasUserGroupDetails).toBeFalsy();
  });

  it("As LU, I should not see the workspace if I'm not allowed to", async () => {
    expect.assertions(1);
    const props = propsWithUserDetails();
    props.userWorkspaceContext.isAccessAllowed = () => false;
    page = new DisplayUserWorkspacePage(props);
    await waitFor(() => {});
    expect(page.isGridDisplayed).toBeFalsy();
  });

  it("As LU, I should go back on the resource workspace", async () => {
    expect.assertions(1);
    const props = propsWithUserDetails();
    page = new DisplayUserWorkspacePage(props);
    await waitFor(() => {});
    await page.goBack();
    expect(props.navigationContext.onGoToPasswordsRequested).toHaveBeenCalled();
  });

  it("AS LU I should lock / unlock the display of the details area", async () => {
    expect.assertions(1);
    const props = propsWithUserDetails();
    page = new DisplayUserWorkspacePage(props);
    await waitFor(() => {});

    await page.lockDetails();
    expect(props.userWorkspaceContext.onDetailsLocked).toHaveBeenCalled();
  });

  it("AS LU I should see the filters bar if no user is selected", async () => {
    expect.assertions(1);
    page = new DisplayUserWorkspacePage(propsWithoutLock());
    await waitFor(() => {});
    expect(page.hasFilterBar).toBeTruthy();
  });

  it("AS LU I should not see the filters bar if a user is selected", async () => {
    expect.assertions(1);
    page = new DisplayUserWorkspacePage(propsWithSelecteUser());
    await waitFor(() => {});
    expect(page.hasFilterBar).toBeFalsy();
  });
});
