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
 * Unit tests on DisplayUsersContextualMenu in regard of specifications
 */

import "../../../../../test/mocks/mockClipboard";
import {
  contextWithoutDelete,
  contextWithoutDisableMFA,
  contextWithoutEdit,
  defaultAppContext,
  defaultProps,
  propsWithUserMissingMetadataKeys,
  propsWithUserTemporaryHasPendingAccountRecovery
} from "./DisplayUsersContextualMenu.test.data";
import DisplayUsersContextualMenuPage from "./DisplayUsersContextualMenu.test.page";
import {waitFor} from "@testing-library/dom";
import EditUser from "../EditUser/EditUser";
import ConfirmDisableUserMFA from "../ConfirmDisableUserMFA/ConfirmDisableUserMFA";
import DeleteUser from "../DeleteUser/DeleteUser";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import HandleReviewAccountRecoveryWorkflow from "../../AccountRecovery/HandleReviewAccountRecoveryRequestWorkflow/HandleReviewAccountRecoveryRequestWorkflow";
import ConfirmShareMissingMetadataKeys from "../ConfirmShareMissingMetadataKeys/ConfirmShareMissingMetadataKeys";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("Display Users Contextual Menu", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const contextualUserId = props.user.id;
  props.hide = jest.fn();

  it("As LU I should copy an user permalink", async() => {
    expect.assertions(3);
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(() => {});
    jest.spyOn(props, 'hide').mockImplementationOnce(() => {});
    await page.copyPermalink();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`${context.userSettings.getTrustedDomain()}/app/users/view/${contextualUserId}`);
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    expect(props.hide).toHaveBeenCalled();
  });

  it("As LU I should copy an user public key", async() => {
    expect.assertions(3);
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    const gpgKey = "some key";
    jest.spyOn(context.port, 'request').mockImplementation(() => ({armored_key: gpgKey}));
    jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(() => {});
    jest.spyOn(props, 'hide').mockImplementationOnce(() => {});
    await page.copyPublicKey();
    expect(navigator.clipboard.writeText).toHaveBeenLastCalledWith(gpgKey);
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    expect(props.hide).toHaveBeenCalled();
  });

  it("As LU I should copy an user email address", async() => {
    expect.assertions(3);
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    jest.spyOn(props.actionFeedbackContext, 'displaySuccess').mockImplementationOnce(() => {});
    jest.spyOn(props, 'hide').mockImplementationOnce(() => {});
    await page.copyEmail();
    expect(navigator.clipboard.writeText).toHaveBeenLastCalledWith("ada@passbolt.com");
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
    expect(props.hide).toHaveBeenCalled();
  });

  it("As LU I should not edit an user if I don't have the capability to do it", async() => {
    expect.assertions(1);
    page = new DisplayUsersContextualMenuPage(contextWithoutEdit(), props);
    await waitFor(() => {});
    expect(page.canEdit).toBeFalsy();
  });

  it("As LU I should edit an user if I have the capability to do it", async() => {
    expect.assertions(4);
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    // The logged user is admin
    expect(page.canEdit).toBeTruthy();

    jest.spyOn(context, 'setContext').mockImplementationOnce(() => {});
    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(() => {});
    jest.spyOn(props, 'hide').mockImplementationOnce(() => {});

    await page.edit();

    expect(context.setContext).toHaveBeenLastCalledWith({editUserDialogProps: {id: contextualUserId}});
    expect(props.dialogContext.open).toHaveBeenCalledWith(EditUser);
    expect(props.hide).toHaveBeenCalled();
  });

  it("As LU I should not resend an invite to an user if I don't have the capability to do it", async() => {
    expect.assertions(1);
    page = new DisplayUsersContextualMenuPage(contextWithoutEdit(), props);
    await waitFor(() => {});
    expect(page.canResendInvite).toBeFalsy();
  });

  it("As LU I should resend an invite to an user if I have the capability to do it", async() => {
    expect.assertions(2);
    const propsUserInactive = Object.assign(props, {});
    propsUserInactive.user.active = false;
    page = new DisplayUsersContextualMenuPage(context, propsUserInactive);
    await waitFor(() => {});

    // The logged user is admin
    expect(page.canResendInvite).toBeTruthy();
    jest.spyOn(context.port, 'request').mockImplementationOnce(() => Promise.resolve());

    await page.resendInvite();

    expect(context.port.request).toHaveBeenLastCalledWith("passbolt.users.resend-invite", "ada@passbolt.com");
  });

  it("As LU I should not disable an user MFA if I don't have the capability to do it", async() => {
    expect.assertions(1);
    page = new DisplayUsersContextualMenuPage(contextWithoutDisableMFA(), props);
    await waitFor(() => {});

    expect(page.canDisableMFA).toBeFalsy();
  });

  it("As LU I should disable an user MFA if I have the capability to do it", async() => {
    expect.assertions(3);
    const propsUserMfaActive = Object.assign(props, {});
    propsUserMfaActive.user.is_mfa_enabled = true;
    page = new DisplayUsersContextualMenuPage(context, propsUserMfaActive);
    await waitFor(() => {});

    expect(page.canDisableMFA).toBeTruthy();

    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(() => {});
    jest.spyOn(props, 'hide').mockImplementationOnce(() => {});

    await page.disableMFA();

    expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmDisableUserMFA);
    expect(props.hide).toHaveBeenCalled();
  });

  it("As LU I should not  delete an user if I don't have the capability to do it", async() => {
    expect.assertions(1);
    page = new DisplayUsersContextualMenuPage(contextWithoutDelete(), props);
    await waitFor(() => {});
    expect(page.canDelete).toBeFalsy();
  });

  it("As LU I should delete an user if I have the capability to do it", async() => {
    expect.assertions(5);
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    expect(page.canDelete).toBeTruthy();

    jest.spyOn(context.port, 'request').mockImplementationOnce(() => {});
    jest.spyOn(context, 'setContext').mockImplementationOnce(() => {});
    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(() => {});
    jest.spyOn(props, 'hide').mockImplementationOnce(() => {});

    await page.delete();

    expect(context.port.request).toHaveBeenLastCalledWith("passbolt.users.delete-dry-run", contextualUserId);
    expect(context.setContext).toHaveBeenLastCalledWith({deleteUserDialogProps: {user: props.user}});
    expect(props.dialogContext.open).toHaveBeenCalledWith(DeleteUser);
    expect(props.hide).toHaveBeenCalled();
  });

  it('As LU I should see an error message if the delete went wrong', async() => {
    expect.assertions(2);
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    const error = {message: 'some error'};
    const errorDialogProps = {error: error};
    jest.spyOn(context.port, 'request').mockImplementationOnce(() => Promise.reject({message: error.message}));

    await page.delete();

    expect(context.port.request).toHaveBeenLastCalledWith("passbolt.users.delete-dry-run", contextualUserId);
    expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, errorDialogProps);
  });

  it('As LU I should see an delete dry error message if the delete request has a delete dry error', async() => {
    expect.assertions(2);
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    const error = {name: 'DeleteDryRunError', errors: ['some errors']};
    jest.spyOn(context.port, 'request').mockImplementationOnce(() => Promise.reject({message: error.message}));

    await page.delete();

    expect(context.port.request).toHaveBeenLastCalledWith("passbolt.users.delete-dry-run", contextualUserId);
    expect(props.dialogContext.open).toHaveBeenCalled();
  });

  it("As LU I should review an account recovery of a user if I have the capability to do it", async() => {
    expect.assertions(3);
    const props = propsWithUserTemporaryHasPendingAccountRecovery();
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    // The logged user is admin
    expect(page.canEdit).toBeTruthy();

    jest.spyOn(context, 'setContext').mockImplementationOnce(() => {});
    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(() => {});
    jest.spyOn(props, 'hide').mockImplementationOnce(() => {});

    await page.reviewRecovery();

    const accountRecoveryRequestId = props.user.pending_account_recovery_request.id;
    expect(props.workflowContext.start).toHaveBeenCalledWith(HandleReviewAccountRecoveryWorkflow, {accountRecoveryRequestId});
    expect(props.hide).toHaveBeenCalled();
  });

  it("As AD I should share missing metadata keys with a user if I have the capability to do it", async() => {
    expect.assertions(3);
    const props = propsWithUserMissingMetadataKeys();
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    // The logged user is admin
    expect(page.canEdit).toBeTruthy();

    jest.spyOn(context, 'setContext').mockImplementationOnce(() => {});
    jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(() => {});
    jest.spyOn(props, 'hide').mockImplementationOnce(() => {});

    await page.shareMissingMetadataKeys();

    expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmShareMissingMetadataKeys, {"user": {"missing_metadata_key_ids": ["54c6278e-f824-5fda-91ff-3e946b18d997"]}});
    expect(props.hide).toHaveBeenCalled();
  });

  it('As AD I should not be able to share missing metadata key with user role', async() => {
    expect.assertions(1);
    const props = propsWithUserMissingMetadataKeys();
    page = new DisplayUsersContextualMenuPage(defaultUserAppContext(), props);
    await waitFor(() => {});

    expect(page.canShareMissingMetadataKeys).toBeFalsy();
  });

  it('As AD with missing keys I should not be able to share missing metadata key myself', async() => {
    expect.assertions(1);
    const props = propsWithUserMissingMetadataKeys({
      id: context.loggedInUser.id
    });
    page = new DisplayUsersContextualMenuPage(context, props);
    await waitFor(() => {});

    expect(page.canShareMissingMetadataKeys).toBeFalsy();
  });
});
