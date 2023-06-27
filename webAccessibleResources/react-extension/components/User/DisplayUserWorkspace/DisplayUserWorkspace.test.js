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
import React from 'react';
import {
  defaultContext,
  propsWithGroupDetails,
  propsWithoutLock,
  propsWithUserDetails
} from "./DisplayUserWorkspace.test.data";
import DisplayUserWorkspacePage from "./DisplayUserWorkspace.test.page";
import {waitFor} from "@testing-library/dom";

jest.mock("../FilterUsersByGroups/FilterUsersByGroup", () => () => <></>); // eslint-disable-line no-use-before-define
jest.mock("../FilterUsersByShortcut/FilterUsersByShortcut", () => () => <></>);
jest.mock("../FilterUsersByText/FilterUsersByText", () => () => <></>);
jest.mock("../../UserGroup/DisplayUserGroupDetails/DisplayUserGroupDetails", () => () => <span className="user-group-details"></span>);
jest.mock("../DisplayUserWorkspaceMainActions/DisplayUserWorkspaceMainActions", () => () => <></>);
jest.mock("../FilterUsersByBreadcrumb/FilterUsersByBreadcrumb", () => () => <></>);
jest.mock("../../UserDetails/DisplayUserDetails/DisplayUserDetails", () => () => <span className="user-details"></span>);
jest.mock("../DisplayUserWorkspaceActions/DisplayUserWorkspaceActions", () => () => <></>);
jest.mock("../../Common/Navigation/Header/Logo");
jest.mock("../DisplayUserBadgeMenu/DisplayUserBadgeMenu", () => () => <></>);

beforeEach(() => {
  jest.resetModules();
});

describe("Display User Workspace", () => {
  let page; // The page to test against
  const context = defaultContext(); // The applicative context

  it('As LU, I should see the user details area if the area is locked and the details is on an user', async() => {
    page = new DisplayUserWorkspacePage(context, propsWithUserDetails());
    await waitFor(() => {});
    expect(page.hasUserDetails).toBeTruthy();
  });

  it('As LU, I should see the user group details area if the area is locked and the details is on an user group', async() => {
    page = new DisplayUserWorkspacePage(context, propsWithGroupDetails());
    await waitFor(() => {});
    expect(page.hasUserGroupDetails).toBeTruthy();
  });

  it('As LU, I should not see any details area if the area is not locked', async() => {
    page = new DisplayUserWorkspacePage(context, propsWithoutLock());
    await waitFor(() => {});
    expect(page.hasUserDetails).toBeFalsy();
    expect(page.hasUserGroupDetails).toBeFalsy();
  });
});

