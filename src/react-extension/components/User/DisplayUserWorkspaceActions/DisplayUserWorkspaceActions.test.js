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
  propsGroupSelected,
  propsSoleManagerSelected,
  propsSoleMemberSelected,
  propsUserRole,
  propsUserRoleGroupSelectedNotManager,
  propsWithMyselfAsSelectedUser,
  propsWithSelectedActiveUser,
  propsWithSelectedMFADisabledUser,
  propsWithSelectedUser
} from "./DisplayUserWorkspaceActions.test.data";
import {waitFor} from "@testing-library/dom";
import DisplayUserWorkspaceActionsPage from "./DisplayUserWorkspaceActions.test.page";
import "../../../../../test/mocks/mockClipboard";
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import ConfirmDisableUserMFA from "../ConfirmDisableUserMFA/ConfirmDisableUserMFA";
import HandleReviewAccountRecoveryRequestWorkflow from "../../AccountRecovery/HandleReviewAccountRecoveryRequestWorkflow/HandleReviewAccountRecoveryRequestWorkflow";
import ConfirmShareMissingMetadataKeys from "../ConfirmShareMissingMetadataKeys/ConfirmShareMissingMetadataKeys";
import RemoveUserFromGroup from "../../UserGroup/RemoveUserFromGroup/RemoveUserFromGroup";

beforeEach(() => {
  jest.resetModules();
});

describe("Display User Workspace Actions", () => {
  let page; // The page to test against

  it('As AD I should edit a selected user', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    expect(page.canEdit).toBeTruthy();
  });

  it('As LU I should not edit an user with user role', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsUserRole());
    await waitFor(() => {});
    expect(page.canEdit).toBeFalsy();
  });

  it('As AD I should delete a selected user', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    expect(await page.canDelete()).toBeTruthy();
  });

  it('As LU I should not delete an user with user role', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsUserRole());
    await waitFor(() => {});
    expect(await page.canDelete()).toBeFalsy();
  });

  it('As AD I should not delete a selected user if this user is myself', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithMyselfAsSelectedUser());
    await waitFor(() => {});
    expect(await page.canDelete()).toBeFalsy();
  });

  it('As AD I should copy a selected user permalink', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    await page.copyActions();
    expect(page.canCopyPermalink).toBeTruthy();
  });

  it('As LU I can click to copy a selected user permalink', async() => {
    expect.assertions(1);
    const props = propsUserRole();
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});
    await page.copyActions();
    await page.copyPermalink();

    expect(props.clipboardContext.copy).toHaveBeenCalledWith(`${props.context.userSettings.getTrustedDomain()}/app/users/view/${props.userWorkspaceContext.selectedUsers[0].id}`, "The permalink has been copied to clipboard.");
  });

  it('As AD I should copy a selected user email', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    await page.copyActions();
    expect(page.canCopyUserEmail).toBeTruthy();
  });

  it('As LU I can click to copy a selected user email', async() => {
    expect.assertions(1);
    const props = propsUserRole();
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});
    await page.copyActions();
    await page.copyEmailAddress();

    expect(props.clipboardContext.copy).toHaveBeenCalledWith(props.userWorkspaceContext.selectedUsers[0].username, "The email address has been copied to clipboard.");
  });

  it('As AD I should copy a selected user public key', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedActiveUser());
    await waitFor(() => {});
    await page.copyActions();
    expect(page.canCopyUserPublicKey).toBeTruthy();
  });

  it('As AD I should not copy an inactive selected user public key', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    await page.copyActions();
    expect(page.canCopyUserPublicKey).toBeFalsy();
  });

  it('As AD I can click to copy a selected user public key', async() => {
    expect.assertions(2);
    const props = propsWithSelectedActiveUser();
    const publicKey = pgpKeys.ada.public;
    jest.spyOn(props.context.port, 'request').mockImplementation(() => ({armored_key: publicKey}));
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});
    await page.copyActions();
    await page.copyPublicKey();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", props.userWorkspaceContext.selectedUsers[0].id);
    expect(props.clipboardContext.copy).toHaveBeenCalledWith(publicKey, "The public key has been copied to clipboard.");
  });

  it('As LU I should copy an user information with user role', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsUserRole());
    await waitFor(() => {});
    expect(page.canCopy).toBeTruthy();
  });

  it('As AD I should resend an invite to an inactive selected user', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    expect(page.canResendInvite).toBeTruthy();
  });

  it('As LU I should not resend an invite to an user with user role', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsUserRole());
    await waitFor(() => {});
    expect(page.canResendInvite).toBeFalsy();
  });

  it('As AD I can click to resend an invite to an inactive selected user', async() => {
    expect.assertions(2);
    const props = propsWithSelectedUser();
    jest.spyOn(props.context.port, 'request').mockImplementation(() => new Promise(resolve => resolve()));
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});
    await page.resendInvite();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.users.resend-invite", props.userWorkspaceContext.selectedUsers[0].username);
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The invite has been resent successfully");
  });

  it('As AD I can click to resend an invite to an inactive selected user and throw an error', async() => {
    expect.assertions(2);
    const props = propsWithSelectedUser();
    jest.spyOn(props.context.port, 'request').mockImplementation(() => new Promise(((resolve, reject) => reject("ERROR"))));
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});
    await page.resendInvite();

    expect(props.context.port.request).toHaveBeenCalledWith("passbolt.users.resend-invite", props.userWorkspaceContext.selectedUsers[0].username);
    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: "ERROR"});
  });

  it('As AD I should not resend an invite to an active selected user', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedActiveUser());
    await waitFor(() => {});
    expect(page.canResendInvite).toBeFalsy();
  });

  it('As AD I should disable an enabled user MFA ', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    expect(await page.canDisableMFA()).toBeTruthy();
  });

  it('As AD I can click to disable an enabled user MFA', async() => {
    expect.assertions(1);
    const props = propsWithSelectedUser();
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});
    await page.disableMfa();

    expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmDisableUserMFA);
  });

  it('As LU I should not disable an user MFA with user role', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsUserRole());
    await waitFor(() => {});
    expect(await page.canDisableMFA()).toBeFalsy();
  });

  it('As AD I should not disable an already disabled user MFA', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedMFADisabledUser());
    await waitFor(() => {});
    expect(await page.canDisableMFA()).toBeFalsy();
  });

  it('As AD I should not disable a review account recovery request if a user is selected', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    expect(page.canReviewAccountRecovery).toBeTruthy();
  });

  it('As AD I can click to review account recovery request if a user is selected', async() => {
    expect.assertions(1);
    const props = propsWithSelectedUser();
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});
    await page.reviewAccountRecovery();

    expect(props.workflowContext.start).toHaveBeenCalledWith(HandleReviewAccountRecoveryRequestWorkflow, {accountRecoveryRequestId: props.userWorkspaceContext.selectedUsers[0].pending_account_recovery_request.id});
  });

  it('As LU I should not disable a review account recovery request with user role', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsUserRole());
    await waitFor(() => {});
    expect(page.canReviewAccountRecovery).toBeFalsy();
  });

  it('As AD I should be able to share missing metadata keys if a user is selected', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    expect(page.canShareMissingMetadataKeys).toBeTruthy();
  });

  it('As AD I can click to share missing metadata keys if a user is selected', async() => {
    expect.assertions(1);
    const props = propsWithSelectedUser();
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});
    await page.shareMetadataKeys();

    expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmShareMissingMetadataKeys, {"user": props.userWorkspaceContext.selectedUsers[0]});
  });

  it('As LU I should not be able to share missing metadata key with user role', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsUserRole());
    await waitFor(() => {});
    expect(page.canShareMissingMetadataKeys).toBeFalsy();
  });

  it('As AD with missing keys I should not be able to share missing metadata key myself', async() => {
    expect.assertions(1);
    const props = propsWithMyselfAsSelectedUser();
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});

    expect(page.canShareMissingMetadataKeys).toBeFalsy();
  });

  it('As AD without any selected group I cannot see the remove from group button', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsWithSelectedUser());
    await waitFor(() => {});
    expect(page.canRemoveFromGroup).toBeFalsy();
  });

  it('As AD with a selected user from a group I can see the remove from group button', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsGroupSelected());
    await waitFor(() => {});
    expect(page.canRemoveFromGroup).toBeTruthy();
  });

  it('As AD with a sole member selected I cannot see the remove from group button', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsSoleMemberSelected());
    await waitFor(() => {});
    expect(page.canRemoveFromGroup).toBeFalsy();
  });

  it('As AD with the last group manager selected I cannot see the remove from group button', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsSoleManagerSelected());
    await waitFor(() => {});
    expect(page.canRemoveFromGroup).toBeFalsy();
  });

  it('As AD I can click to remove user from group', async() => {
    expect.assertions(2);
    const props = propsGroupSelected();
    page = new DisplayUserWorkspaceActionsPage(props);
    await waitFor(() => {});
    await page.removeFromGroup();

    expect(props.context.setContext).toHaveBeenCalledWith({
      removeUserFromGroupDialogProps: {
        user: props.userWorkspaceContext.selectedUsers[0],
        group: props.userWorkspaceContext.filter.payload.group
      }
    });
    expect(props.dialogContext.open).toHaveBeenCalledWith(RemoveUserFromGroup);
  });

  it('As LU who is not a group manager I cannot see the remove from group button', async() => {
    expect.assertions(1);
    page = new DisplayUserWorkspaceActionsPage(propsUserRoleGroupSelectedNotManager());
    await waitFor(() => {});
    expect(page.canRemoveFromGroup).toBeFalsy();
  });
});
