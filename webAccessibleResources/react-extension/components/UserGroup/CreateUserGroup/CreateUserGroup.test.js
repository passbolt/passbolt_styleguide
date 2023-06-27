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
 * Unit tests on CreateGroupDialog in regard of specifications
 */
import CreateUserGroupPage from "./CreateUserGroup.test.page";
import {defaultAppContext, defaultProps, mockGpgKey, mockUsers} from "./CreateUserGroup.test.data";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";

const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";

describe("See the Create Dialog Group", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start adding a group', () => {
    /**
     * I should see the create group dialog
     */
    beforeEach(async() => {
      const requestGpgMockImpl = jest.fn(() => mockGpgKey);
      mockContextRequest(context, requestGpgMockImpl);
      page = new CreateUserGroupPage(context, props);
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('As AD I see a success toaster message after adding a group with success', async() => {
      expect(page.createGroup.exists()).toBeTruthy();

      // create group
      const groupMeta = {
        name: "test",
      };
      expect(page.createGroup.warningMessage).toBe('You need to click save for the changes to take place.');
      // Fill the form
      page.createGroup.fillInput(page.createGroup.name, groupMeta.name);
      // mock gpg key to get it for the user in autocomplete
      const requestGpgMockImpl = jest.fn(() => mockGpgKey);
      mockContextRequest(context, requestGpgMockImpl);
      page.createGroup.fillInput(page.createGroup.usernameInput, "ada");
      jest.runOnlyPendingTimers();

      expect(context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", mockUsers[1].id);
      await waitFor(() => {});
      await page.createGroup.click(page.createGroup.userAutocomplete);

      await page.createGroup.selectFirstItem(2);
      expect(page.createGroup.warningMessage).toBe('You need to click save for the changes to take place.');

      expect(page.createGroup.count()).toBe(2);
      expect(page.createGroup.userFirstNameLastName(2)).toBe('Ada Lovelace');
      expect(page.createGroup.userEmail(2)).toBe('ada@passbolt.com');
      expect(page.createGroup.userFingerprint(2)).toBe('03F6 0E95 8F4C B297 23ACDF76 1353 B5B1 5D9B 054F ');

      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(context, requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const groupDto = {
        name: "test",
        groups_users: [{user_id: mockUsers[0].id, is_admin: true}, {user_id: mockUsers[1].id, is_admin: true}]
      };
      await page.createGroup.click(page.createGroup.saveButton);

      expect(context.port.request).toHaveBeenCalledWith("passbolt.groups.create", groupDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should see a processing feedback while submitting the form', async() => {
      // Fill the form
      page.createGroup.fillInput(page.createGroup.name, "test");
      // mock gpg key to get it for the user in autocomplete
      const requestGpgMockImpl = jest.fn(() => mockGpgKey);
      mockContextRequest(context, requestGpgMockImpl);
      page.createGroup.fillInput(page.createGroup.usernameInput, "ada");
      jest.runOnlyPendingTimers();

      expect(context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", mockUsers[1].id);
      await waitFor(() => {});
      await page.createGroup.click(page.createGroup.userAutocomplete);

      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      // Mock the request function to make it the expected result
      mockContextRequest(context, requestMockImpl);
      page.createGroup.clickWithoutWaitFor(page.createGroup.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.createGroup.name.getAttribute("disabled")).not.toBeNull();
        expect(page.createGroup.usernameInput.getAttribute("disabled")).not.toBeNull();
        expect(page.createGroup.selectRights(1).className).toBe('selected-value disabled');
        expect(page.createGroup.hasRemoveUserDisabled(1)).toBeTruthy();
        expect(page.createGroup.cancelButtonDisabled).not.toBeNull();
        expect(page.createGroup.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.createGroup.saveButtonProcessing).not.toBeNull();
        updateResolve();
      });
    });

    it('As AD I shouldn’t be able to submit the form if there is an invalid field', async() => {
      expect(page.createGroup.exists()).toBeTruthy();
      // mock gpg key to get it for the user in autocomplete
      const requestGpgMockImpl = jest.fn(() => mockGpgKey);
      mockContextRequest(context, requestGpgMockImpl);
      page.createGroup.fillInput(page.createGroup.usernameInput, "ada");
      jest.runOnlyPendingTimers();

      expect(context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", mockUsers[1].id);
      await waitFor(() => {});

      await page.createGroup.click(page.createGroup.userAutocomplete);
      await page.createGroup.click(page.createGroup.saveButton);

      // Throw error message
      expect(page.createGroup.nameErrorMessage.textContent).toBe("A name is required.");
    });

    it('As AD I can stop adding a group by clicking on the cancel button', async() => {
      expect(page.createGroup.exists()).toBeTruthy();
      await page.createGroup.click(page.createGroup.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I can stop adding a group by closing the dialog', async() => {
      expect(page.createGroup.exists()).toBeTruthy();
      await page.createGroup.click(page.createGroup.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I can stop adding a group with the keyboard (escape)', async() => {
      expect(page.createGroup.exists()).toBeTruthy();
      await page.createGroup.escapeKey(page.createGroup.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      // Fill the form
      page.createGroup.fillInput(page.createGroup.name, "test");
      // mock gpg key to get it for the user in autocomplete
      const requestGpgMockImpl = jest.fn(() => mockGpgKey);
      mockContextRequest(context, requestGpgMockImpl);
      page.createGroup.fillInput(page.createGroup.usernameInput, "ada");
      jest.runOnlyPendingTimers();

      expect(context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", mockUsers[1].id);
      await waitFor(() => {});
      await page.createGroup.click(page.createGroup.userAutocomplete);

      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.createGroup.click(page.createGroup.saveButton);

      // Throw general error message
      expect(page.createGroup.errorDialog).not.toBeNull();
      expect(page.createGroup.errorDialogMessage).not.toBeNull();
    });

    it('As AD I should see an error message if the groupname already exists', async() => {
      // Fill the form
      page.createGroup.fillInput(page.createGroup.name, "test");
      // mock gpg key to get it for the user in autocomplete
      const requestGpgMockImpl = jest.fn(() => mockGpgKey);
      mockContextRequest(context, requestGpgMockImpl);
      page.createGroup.fillInput(page.createGroup.usernameInput, "ada");
      jest.runOnlyPendingTimers();

      expect(context.port.request).toHaveBeenCalledWith("passbolt.keyring.get-public-key-info-by-user", mockUsers[1].id);
      await waitFor(() => {});
      await page.createGroup.click(page.createGroup.userAutocomplete);

      const data = {
        body: {
          name: {
            group_unique: "The group name test already exists."
          }
        }
      };

      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Could not validate group data.", data);
      });

      await page.createGroup.click(page.createGroup.saveButton);

      // display groupname error message
      expect(page.createGroup.nameErrorMessage.textContent).toBe("The group name test already exists.");
    });

    it("As an user I should see a feedback when name field content is truncated by a field limit", async() => {
      expect.assertions(1);
      page.createGroup.fillInput(page.createGroup.name, 'a'.repeat(255));
      await page.createGroup.keyUpInput(page.createGroup.name);
      expect(page.createGroup.nameWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });
  });
});
