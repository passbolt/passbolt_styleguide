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
import {
  defaultAppContext,
  propsWithMyselfAsSelectedUser,
  propsWithoutSelectedUser,
  propsWithSelectedActiveUser,
  propsWithSelectedMFADisabledUser,
  propsWithSelectedUser
} from "./DisplayUserWorkspaceActions.test.data";
import {waitFor} from "@testing-library/dom";
import DisplayUserWorkspaceActionsPage from "./DisplayUserWorkspaceActions.test.page";


beforeEach(() => {
  jest.resetModules();
});

describe("Display User Workspace Actions", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  beforeEach(() => {

  });

  it('As AD I should edit a selected user', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithSelectedUser());
    await waitFor(() => {});
    expect(page.canEdit).toBeTruthy();
  });

  it('As AD I should not edit an user if no user is selected', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithoutSelectedUser());
    await waitFor(() => {});
    expect(page.canEdit).toBeFalsy();
  });

  it('As AD I should delete a selected user', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithSelectedUser());
    await waitFor(() => {});
    expect(page.canDelete).toBeTruthy();
  });

  it('As AD I should not delete an user if no user is selected', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithoutSelectedUser());
    await waitFor(() => {});
    expect(page.canDelete).toBeFalsy();
  });

  it('As AD I should not delete a selected user if this user is myself', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithMyselfAsSelectedUser());
    await waitFor(() => {});
    expect(page.canDelete).toBeFalsy();
  });

  it('As AD I should copy an selected user permalink', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithSelectedUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canCopyPermalink).toBeTruthy();
  });

  it('As AD I should not copy an user permalink if no user is selected', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithoutSelectedUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canCopyPermalink).toBeFalsy();
  });

  it('As AD I should resend an invite to an inactive selected user', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithSelectedUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canResendInvite).toBeTruthy();
  });

  it('As AD I should not resend an invite to an user if no user is selected', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithoutSelectedUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canResendInvite).toBeFalsy();
  });
  it('As AD I should not resend an invite to an active selected user', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithSelectedActiveUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canResendInvite).toBeFalsy();
  });

  it('As AD I should disable an enabled user MFA ', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithSelectedUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canDisableMFA).toBeTruthy();
  });

  it('As AD I should not disable an user MFA if no user is selected', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithoutSelectedUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canDisableMFA).toBeFalsy();
  });

  it('As AD I should not disable an already disabled user MFA', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithSelectedMFADisabledUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canDisableMFA).toBeFalsy();
  });

  it('AS LU I should lock / unlock the display of the details area', async() => {
    const props =  propsWithSelectedUser();
    page = new DisplayUserWorkspaceActionsPage(context, props);
    jest.spyOn(props.userWorkspaceContext, 'onDetailsLocked').mockImplementationOnce(() => {});
    await waitFor(() => {});
    await page.lockDetails();
    expect(props.userWorkspaceContext.onDetailsLocked).toHaveBeenCalled();
  });

  it('As AD I should not disable a review account recovery request if a user is selected', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithSelectedUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canReviewAccountRecovery).toBeTruthy();
  });

  it('As AD I should not disable a review account recovery request if no user is selected', async() => {
    page = new DisplayUserWorkspaceActionsPage(context, propsWithoutSelectedUser());
    await waitFor(() => {});
    await page.moreActions();
    expect(page.canReviewAccountRecovery).toBeFalsy();
  });
});


