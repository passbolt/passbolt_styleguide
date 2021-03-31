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
 * Unit tests on ShareDialog in regard of specifications
 */
import ShareDialogPage from "./ShareDialog.test.page";
import {autocompleteResult, defaultAppContext, defaultProps, folders, resources} from "./ShareDialog.test.data";
import {ActionFeedbackContext} from "../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import ErrorDialog from "../Common/Dialog/ErrorDialog/ErrorDialog";

beforeEach(() => {
  jest.resetModules();
});

describe("As Lu I should see the share dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  describe('As LU I can start sharing resources', () => {
    const shareDialogProps = {
      resourcesIds: ["8e3874ae-4b40-590b-968a-418f704b9d9a", "daaf057e-7fc3-5537-a8a9-e8c151890878", "c8b93000-56b3-5a16-8048-c579d1babbd7"],
    };
    /**
     * I should see the share dialog
     */
    beforeEach(async() => {
      const requestResourcesMockImpl = jest.fn(() => resources);
      mockContextRequest(requestResourcesMockImpl);
      context.setContext({shareDialogProps});
      page = new ShareDialogPage(context, props);
    });

    it('As LU I see a success toaster message after sharing resources to users and groups with success', async() => {
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.get-resources', shareDialogProps.resourcesIds);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Share 3 resources');
      expect(page.count).toBe(11);

      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.search-aros', 'adm', shareDialogProps.resourcesIds);
      await page.selectUserOrGroup(1);

      expect(page.warningMessage).toBe('Click save to apply your pending changes.');

      expect(page.count).toBe(12);
      expect(page.aroName(1)).toBe('Ada Lovelace');
      expect(page.aroDetails(1)).toBe('ada@passbolt.com');
      expect(page.aroName(2)).toBe('Betty Holberton');
      expect(page.aroDetails(2)).toBe('betty@passbolt.com');
      expect(page.aroName(3)).toBe('Board');
      expect(page.aroDetails(3)).toBe('Group');
      expect(page.aroName(12)).toBe('Administrator');
      expect(page.aroDetails(12)).toBe('Group');
      expect(page.selectRights(12).value).toBe('1');

      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.savePermissions();

      const permissionDto = [{"aco": "Resource", "aco_foreign_key": shareDialogProps.resourcesIds[0], "aro": "Group", "aro_foreign_key": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": shareDialogProps.resourcesIds[1], "aro": "Group", "aro_foreign_key": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc", "aro": "Group", "aro_foreign_key": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313", "aro": "Group", "aro_foreign_key": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "is_new": true, "type": 1}];

      expect(context.port.request).toHaveBeenCalledWith("passbolt.share.resources.save", resources, permissionDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith('The permissions have been changed successfully.');
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can remove a permission', async() => {
      expect(page.count).toBe(11);
      await page.selectRemovePermission(1);
      expect(page.count).toBe(10);
    });

    it('As LU I should see a processing feedback while submitting the form', async() => {
      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.search-aros', 'adm', shareDialogProps.resourcesIds);
      await page.selectUserOrGroup(1);

      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      // Mock the request function to make it the expected result
      mockContextRequest(requestMockImpl);
      page.savePermissionsWithoutWait();
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.shareNameInput.getAttribute("disabled")).not.toBeNull();
        expect(page.selectRights(1).getAttribute("disabled")).not.toBeNull();
        expect(page.removeAro(1).className).toBe('remove-item disabled');
        expect(page.cancelButton.className).toBe('cancel disabled');
        expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.className).toBe("button primary disabled processing");
        updateResolve();
      });
    });

    it('As LU I shouldn’t be able to submit the form if there is no owner', async() => {
      await page.selectCanReadRights(1);
      expect(page.errorMessage).toBe('Please make sure there is at least one owner.');
      expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
    });

    it('As LU I can stop sharing resources by clicking on the cancel button', async() => {
      expect(page.exists()).toBeTruthy();
      await page.click(page.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop sharing resources by closing the dialog', async() => {
      expect(page.exists()).toBeTruthy();
      await page.click(page.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop sharing resources with the keyboard (escape)', async() => {
      expect(page.exists()).toBeTruthy();
      await page.escapeKey(page.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.search-aros', 'adm', shareDialogProps.resourcesIds);
      await page.selectUserOrGroup(1);

      // Mock the request function to make it return an error.
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });

      await page.savePermissions();

      // Throw general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(ErrorDialog);
    });
  });

  describe('As LU I can start sharing one resources', () => {
    const shareDialogProps = {
      resourcesIds: ["8e3874ae-4b40-590b-968a-418f704b9d9a"],
    };
    /**
     * I should see the share dialog
     */
    beforeEach(async() => {
      const requestResourcesMockImpl = jest.fn(() => resources);
      mockContextRequest(requestResourcesMockImpl);
      context.setContext({shareDialogProps});
      page = new ShareDialogPage(context, props);
    });

    it('As LU I see a success toaster message after sharing one resource to users and groups with success', async() => {
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.get-resources', shareDialogProps.resourcesIds);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Share resource apache');
      expect(page.count).toBe(11);

      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.search-aros', 'adm', shareDialogProps.resourcesIds);
      await page.selectUserOrGroup(1);

      expect(page.count).toBe(12);
      expect(page.aroName(12)).toBe('Administrator');
      expect(page.aroDetails(12)).toBe('Group');
      expect(page.selectRights(12).value).toBe('1');

      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.savePermissions();

      const permissionDto = [{"aco": "Resource", "aco_foreign_key": shareDialogProps.resourcesIds[0], "aro": "Group", "aro_foreign_key": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878", "aro": "Group", "aro_foreign_key": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc", "aro": "Group", "aro_foreign_key": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313", "aro": "Group", "aro_foreign_key": "469edf9d-ca1e-5003-91d6-3a46755d5a50", "is_new": true, "type": 1}];

      expect(context.port.request).toHaveBeenCalledWith("passbolt.share.resources.save", resources, permissionDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith('The permissions have been changed successfully.');
      expect(props.onClose).toBeCalled();
    });
  });

  describe('As LU I can start sharing one folder', () => {
    const shareDialogProps = {
      foldersIds: ["8e3874ae-4b40-590b-968a-418f704b9d9a"],
    };
    /**
     * I should see the share dialog
     */
    beforeEach(async() => {
      const requestResourcesMockImpl = jest.fn(() => folders);
      mockContextRequest(requestResourcesMockImpl);
      context.setContext({shareDialogProps});
      page = new ShareDialogPage(context, props);
    });

    it('As LU I see a success toaster message after sharing one folder to users and groups with success', async() => {
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.get-folders', shareDialogProps.foldersIds);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Share folder apache');
      expect(page.count).toBe(2);

      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.search-aros', 'adm', shareDialogProps.foldersIds);
      await page.selectUserOrGroup(2);

      expect(page.count).toBe(3);
      expect(page.aroName(3)).toBe('Admin User');
      expect(page.aroDetails(3)).toBe('admin@passbolt.com');
      expect(page.selectRights(3).value).toBe('1');

      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.savePermissions();

      const permissionDto = [{"aco": "Folder", "aco_foreign_key": shareDialogProps.foldersIds[0], "aro": "User", "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856", "is_new": true, "type": 1}];

      expect(context.port.request).toHaveBeenCalledWith("passbolt.share.folders.save", folders, permissionDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith('The permissions have been changed successfully.');
      expect(props.onClose).toBeCalled();
    });
  });

  describe('As LU I can\'t start sharing folders and resources at the same time', () => {
    const shareDialogProps = {
      resourcesIds: ["8e3874ae-4b40-590b-968a-418f704b9d9a"],
      foldersIds: ["8e3874ae-4b40-590b-968a-418f704b9d9a"],
    };
    /**
     * I should see the share dialog
     */
    beforeEach(async() => {
      const requestResourcesMockImpl = jest.fn(() => folders);
      mockContextRequest(requestResourcesMockImpl);
      context.setContext({shareDialogProps});
      page = new ShareDialogPage(context, props);
    });

    it('As LU I see a error dialog message after try to sharing folders and resources at the same time', async() => {
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Share 2 items');

      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.search-aros', 'adm', shareDialogProps.resourcesIds);
      await page.selectUserOrGroup(1);

      await page.savePermissions();
      // Throw general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(ErrorDialog);
    });
  });
});
