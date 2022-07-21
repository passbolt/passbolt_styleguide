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
import {
  autocompleteResult,
  defaultAppContext,
  defaultProps, folders,
  mockResultsFolders,
  mockResultsResources, mockResultsResourcesAndFolders, resources
} from "./ShareDialog.test.data";
import {ActionFeedbackContext} from "../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import NotifyError from "../Common/Error/NotifyError/NotifyError";

beforeAll(() => {
  global.scrollTo = jest.fn();
});

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
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
      const requestResourcesMockImpl = path => mockResultsResources[path];
      mockContextRequest(requestResourcesMockImpl);
      context.setContext({shareDialogProps});
      page = new ShareDialogPage(context, props);
    });

    it('As LU I see a success toaster message after sharing resources to users and groups with success', async() => {
      expect.assertions(18);
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.get-resources', shareDialogProps.resourcesIds);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Share 3 resources');
      expect(page.count).toBe(11);

      const requestKeyInfoMockImpl = () => ({
        fingerprint: "079D6F4FDA3BFDC2D8E562D8AA44B1DA4BFB36B6"
      });

      mockContextRequest(requestKeyInfoMockImpl);
      await page.searchName("adm");
      jest.runOnlyPendingTimers();
      await waitFor(() => {
        if (!page.userOrGroupAutocomplete(1)) {
          throw new Error("Page is not ready yet.");
        }
      });
      await page.selectUserOrGroup(1);

      expect(page.warningMessage).toBe('Click save to apply your pending changes.');

      expect(page.count).toBe(12);
      expect(page.aroName(1)).toBe('Ada Lovelace');
      expect(page.aroDetails(1)).toBe('ada@passbolt.com');
      expect(page.aroName(2)).toBe('Betty Holberton');
      expect(page.aroDetails(2)).toBe('betty@passbolt.com');
      expect(page.aroName(3)).toBe('Board');
      expect(page.aroDetails(3)).toBe('Group');
      expect(page.aroName(12)).toBe('Admin User');
      expect(page.aroDetails(12)).toBe('admin@passbolt.com');
      expect(page.selectRights(12).textContent).toBe('can read');

      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.savePermissions();

      const permissionDto = [{"aco": "Resource", "aco_foreign_key": shareDialogProps.resourcesIds[0], "aro": "User", "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": shareDialogProps.resourcesIds[1], "aro": "User", "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc", "aro": "User", "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313", "aro": "User", "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856", "is_new": true, "type": 1}];

      expect(context.port.request).toHaveBeenCalledWith("passbolt.share.resources.save", resources, permissionDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith('The permissions have been changed successfully.');
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can remove a permission', async() => {
      expect.assertions(2);
      expect(page.count).toBe(11);
      await page.selectRemovePermission(1);
      expect(page.count).toBe(10);
    });

    it('As LU I should see a processing feedback while submitting the form', async() => {
      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      jest.runOnlyPendingTimers();
      await waitFor(() => {
        if (!page.userOrGroupAutocomplete(1)) {
          throw new Error("Page is not ready yet.");
        }
      });
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
        expect(page.selectRights(1).className).toBe("selected-value disabled");
        expect(page.removeAro(1).className).toBe('remove-item button button-transparent disabled');
        expect(page.cancelButton.className).toBe('cancel disabled');
        expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.className).toBe("button primary disabled processing");
        updateResolve();
      });
    });

    it('As LU I shouldn’t be able to submit the form if there is no owner', async() => {
      expect.assertions(2);
      await page.selectFirstItemRights(1);
      expect(page.errorMessage).toBe('Please make sure there is at least one owner.');
      expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
    });

    it('As LU I can stop sharing resources by clicking on the cancel button', async() => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.click(page.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop sharing resources by closing the dialog', async() => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.click(page.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop sharing resources with the keyboard (escape)', async() => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.escapeKey(page.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      expect.assertions(1);
      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      jest.runOnlyPendingTimers();
      await waitFor(() => {
        if (!page.userOrGroupAutocomplete(1)) {
          throw new Error("Page is not ready yet.");
        }
      });
      await page.selectUserOrGroup(1);

      // Mock the request function to make it return an error.
      const error = new PassboltApiFetchError("Jest simulate API error.");
      jest.spyOn(context.port, 'request').mockImplementationOnce(() => {
        throw error;
      });

      await page.savePermissions();

      // Throw general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
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
      const requestResourcesMockImpl = path => mockResultsResources[path];
      mockContextRequest(requestResourcesMockImpl);
      context.setContext({shareDialogProps});
      page = new ShareDialogPage(context, props);
    });

    it('As LU I see a success toaster message after sharing one resource to users and groups with success', async() => {
      expect.assertions(12);
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.get-resources', shareDialogProps.resourcesIds);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Share resource');
      expect(page.subtitle).toBe('apache');
      expect(page.count).toBe(11);

      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      jest.runOnlyPendingTimers();
      await waitFor(() => {
        if (!page.userOrGroupAutocomplete(1)) {
          throw new Error("Page is not ready yet.");
        }
      });
      await page.selectUserOrGroup(1);

      expect(page.count).toBe(12);
      expect(page.aroName(12)).toBe('Admin User');
      expect(page.aroDetails(12)).toBe('admin@passbolt.com');
      expect(page.selectRights(12).textContent).toBe('can read');

      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.savePermissions();

      const permissionDto = [{"aco": "Resource", "aco_foreign_key": shareDialogProps.resourcesIds[0], "aro": "User", "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "daaf057e-7fc3-5537-a8a9-e8c151890878", "aro": "User", "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "690b6e40-f371-579c-b0c6-86e8ef383adc", "aro": "User", "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856", "is_new": true, "type": 1},
        {"aco": "Resource", "aco_foreign_key": "ecf0ed85-3bfc-5f45-b11d-74e9a86aa313", "aro": "User", "aro_foreign_key": "d57c10f5-639d-5160-9c81-8a0c6c4ec856", "is_new": true, "type": 1}];

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
      const requestResourcesMockImpl = path => mockResultsFolders[path];
      mockContextRequest(requestResourcesMockImpl);
      context.setContext({shareDialogProps});
      page = new ShareDialogPage(context, props);
    });

    it('As LU I see a success toaster message after sharing one folder to users and groups with success', async() => {
      expect.assertions(12);
      expect(context.port.request).toHaveBeenCalledWith('passbolt.share.get-folders', shareDialogProps.foldersIds);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Share folder');
      expect(page.subtitle).toBe('apache');
      expect(page.count).toBe(2);

      const requestKeyInfoMockImpl = () => ({
        fingerprint: "079D6F4FDA3BFDC2D8E562D8AA44B1DA4BFB36B6"
      });
      mockContextRequest(requestKeyInfoMockImpl);

      await page.searchName("ad");
      jest.runOnlyPendingTimers();
      await waitFor(() => {
        if (!page.userOrGroupAutocomplete(2)) {
          throw new Error("Page is not ready yet.");
        }
      });
      await page.selectUserOrGroup(2);

      expect(page.count).toBe(3);
      expect(page.aroName(3)).toBe('Adele Goldstine');
      expect(page.aroDetails(3)).toBe('adele@passbolt.com');
      expect(page.selectRights(3).textContent).toBe('can read');

      const requestMockImpl = jest.fn();
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.savePermissions();

      const permissionDto = [{"aco": "Folder", "aco_foreign_key": shareDialogProps.foldersIds[0], "aro": "User", "aro_foreign_key": "af5e1f70-a0ee-5b76-935b-c846f8a6a190", "is_new": true, "type": 1}];

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
      const requestResourcesMockImpl = path => mockResultsResourcesAndFolders[path];
      mockContextRequest(requestResourcesMockImpl);
      context.setContext({shareDialogProps});
      page = new ShareDialogPage(context, props);
    });

    it('As LU I see a error dialog message after try to sharing folders and resources at the same time', async() => {
      expect.assertions(3);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Share 2 items');

      const requestAutocompleteResultMockImpl = jest.fn(() => autocompleteResult);
      mockContextRequest(requestAutocompleteResultMockImpl);
      await page.searchName("adm");
      jest.runOnlyPendingTimers();
      await waitFor(() => {
        if (!page.userOrGroupAutocomplete(1)) {
          throw new Error("Page is not ready yet.");
        }
      });
      await page.selectUserOrGroup(1);

      await page.savePermissions();
      // Throw general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: new Error("Multi resource and folder share is not implemented.")});
    });
  });
});
