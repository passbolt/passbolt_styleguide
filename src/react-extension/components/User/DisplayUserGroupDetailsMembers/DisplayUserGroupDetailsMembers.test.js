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
 * Unit tests on DisplayUserGroupDetailsInformation in regard of specifications
 */

import {defaultAppContext, defaultProps} from "./DisplayUserGroupDetailsMembers.test.data";
import DisplayUserGroupDetailsMembersPage from "./DisplayUserGroupDetailsMembers.test.page";
import EditUserGroup from "../EditUserGroup/EditUserGroup";

beforeEach(() => {
  jest.resetModules();
});

describe("Display User Group Details Information", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new DisplayUserGroupDetailsMembersPage(context, props);
  });

  it('As LU I should initially see the information area as expanded', () => {
    expect(page.isCollapsed).toBeTruthy();
  });

  it('As LU I should not see the information area when I collapse the area', async() => {
    await page.toggleCollapse();
    expect(page.isCollapsed).toBeFalsy();

    await page.toggleCollapse();
    expect(page.isCollapsed).toBeTruthy();
  });

  it("As LU I should have access to the edit of the group", async() => {
    jest.spyOn(props.dialogContext, "open").mockImplementationOnce(() => {});
    jest.spyOn(props.userWorkspaceContext, "onGroupToEdit").mockImplementationOnce(() => {});
    await page.editGroup();
    expect(props.dialogContext.open).toHaveBeenCalledWith(EditUserGroup);
    expect(props.userWorkspaceContext.onGroupToEdit).toHaveBeenCalledWith(props.userWorkspaceContext.details.group);
  });

  it("As LU I should see the appropriate members of the group", async() => {
    await page.toggleCollapse();
    expect(page.membersCount).toBe(2);
    expect(page.member(1).name).toBe('Lynne Jolitz');
    expect(page.member(1).role).toBe('Group manager');
    expect(page.member(2).name).toBe('javascript:document.write(\'xss2\') javascript:document.write(\'xss2\')');
    expect(page.member(2).role).toBe('Group manager');
  });
});

