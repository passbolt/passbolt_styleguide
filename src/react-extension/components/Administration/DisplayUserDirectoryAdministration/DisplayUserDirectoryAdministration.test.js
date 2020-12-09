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
 * Unit tests on DisplayUserDirectoryAdministration in regard of specifications
 */
import {
  defaultAppContext,
  defaultProps,
  mockUserDirectorySettings, mockUsers
} from "./DisplayUserDirectoryAdministration.test.data";
import fetchMock from "fetch-mock-jest";
import DisplayUserDirectoryAdministrationPage from "./DisplayUserDirectoryAdministration.test.page";
import {waitFor} from "@testing-library/react";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import DisplayTestUserDirectoryAdministrationDialog
  from "../DisplayTestUserDirectoryAdministration/DisplayTestUserDirectoryAdministrationDialog";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I should see the user directory settings", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockFetch = (url, data) => fetchMock.mock(url, data);

  describe('As AD I should see the user directory activation state on the administration settings page', () => {
    /**
     * I should see the User Directory activation state on the administration settings page
     */
    beforeEach(() => {
      fetchMock.reset();
      mockFetch("http://localhost:3000/directorysync/settings.json?api-version=v2", mockUserDirectorySettings);
      mockFetch("http://localhost:3000/users.json?api-version=v2", mockUsers);
      page = new DisplayUserDirectoryAdministrationPage(context, props);
    });

    it('As AD I should see if the User Directory is enabled on my Passbolt instance', async() => {
      await waitFor(() => {
      });
      expect(page.exists()).toBeTruthy();
      // check fields in the form
      expect(page.userDirectory.checked).toBeTruthy();

      expect(page.activeDirectory.checked).toBeTruthy();
      expect(page.connectionType.value).toBe("plain");
      expect(page.serverHost.value).toBe("127.0.0.1");
      expect(page.port.value).toBe("389");
      expect(page.username.value).toBe("username");
      expect(page.password.value).toBe("password");
      expect(page.domainName.value).toBe("passbolt.local");
      expect(page.baseDn.value).toBe("DC=passbolt,DC=local");

      await page.click(page.directoryConfigurationTitle);
      expect(page.groupPath.value).toBe("");
      expect(page.userPath.value).toBe("");
      expect(page.groupObjectClass).toBeNull();
      expect(page.userObjectClass).toBeNull();
      expect(page.useEmailPrefix).toBeNull();
      await page.click(page.synchronizationOptionsTitle);
      expect(page.defaultUser.textContent).toBe("Admin User (admin@passbolt.com)");
      expect(page.defaultGroupAdminUser.textContent).toBe("Admin User (admin@passbolt.com)");
      expect(page.groupsParentGroup.value).toBe("");
      expect(page.usersParentGroup.value).toBe("");
      expect(page.enabledUsersOnly.checked).toBe(false);
      expect(page.createUsers.checked).toBeTruthy();
      expect(page.deleteUsers.checked).toBeTruthy();
      expect(page.createGroups.checked).toBeTruthy();
      expect(page.deleteGroups.checked).toBeTruthy();
      expect(page.updateGroups.checked).toBeTruthy();

      // click on OPEN LDAP
      await page.click(page.openLdap);
      expect(page.groupObjectClass.value).toBe("");
      expect(page.userObjectClass.value).toBe("");
      expect(page.enabledUsersOnly).toBeNull();
      expect(page.useEmailPrefix.checked).toBe(false);
      await page.click(page.useEmailPrefix);
      expect(page.useEmailPrefix.checked).toBeTruthy();
      expect(page.emailPrefix.value).toBe("");
      expect(page.emailSuffix.value).toBe("");
    });

    it('As AD I should test the user directory on the administration settings page', async() => {
      await waitFor(() => {});
      await page.click(page.directoryConfigurationTitle);
      expect(props.administrationWorkspaceContext.onTestEnabled).toHaveBeenCalled();
      const propsUpdated = {
        administrationWorkspaceContext: {
          mustSaveSettings: false,
          mustTestSettings: true,
          onResetActionsSettings: jest.fn(),
          isSaveEnabled: false,
          onSaveEnabled: jest.fn(),
          onTestEnabled: jest.fn(),
          onSynchronizeEnabled: jest.fn(),
        },
        dialogContext: {
          open: jest.fn()
        }
      };
      mockFetch("http://localhost:3000/directorysync/settings/test.json?api-version=v2", {});

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.dialogContext.open).toHaveBeenCalledWith(DisplayTestUserDirectoryAdministrationDialog);
    });

    it('As AD I should save the user directory on the administration settings page', async() => {
      await waitFor(() => {});
      await page.click(page.directoryConfigurationTitle);
      expect(props.administrationWorkspaceContext.onTestEnabled).toHaveBeenCalled();
      const propsUpdated = {
        administrationWorkspaceContext: {
          mustSaveSettings: true,
          mustTestSettings: false,
          onResetActionsSettings: jest.fn(),
          isSaveEnabled: true,
          onSaveEnabled: jest.fn(),
          onTestEnabled: jest.fn(),
          onSynchronizeEnabled: jest.fn(),
        },
      };
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.administrationWorkspaceContext.onSynchronizeEnabled).toHaveBeenCalledWith(true);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The user directory settings for the organization were updated.");
    });

    it('As AD I should delete the user directory on the administration settings page', async() => {
      await waitFor(() => {});
      await page.click(page.userDirectory);

      const propsUpdated = {
        administrationWorkspaceContext: {
          mustSaveSettings: true,
          mustTestSettings: false,
          onResetActionsSettings: jest.fn(),
          isSaveEnabled: true,
          onSaveEnabled: jest.fn(),
          onTestEnabled: jest.fn(),
          onSynchronizeEnabled: jest.fn(),
        },
      };
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.administrationWorkspaceContext.onSynchronizeEnabled).toHaveBeenCalledWith(false);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The user directory settings for the organization were updated.");
    });

    it('As AD I shouldn’t be able to submit the form if there is an invalid field', async() => {
      await waitFor(() => {});
      // empty fields
      page.fillHost("");
      page.fillPort("");
      page.fillDomain("");

      const propsUpdated = {
        administrationWorkspaceContext: {
          mustSaveSettings: true,
          mustTestSettings: false,
          onResetActionsSettings: jest.fn(),
          isSaveEnabled: true,
          onSaveEnabled: jest.fn(),
          onTestEnabled: jest.fn(),
          onSynchronizeEnabled: jest.fn(),
        },
      };

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      // Throw error message
      expect(page.serverHostErrorMessage).toBe("A host is required.");
      expect(page.portErrorMessage).toBe("A port is required.");
      expect(page.domainErrorMessage).toBe("A domain name is required.");
    });

    it('As AD I should see a processing feedback while submitting the form', async() => {
      await waitFor(() => {});

      const propsUpdated = {
        administrationWorkspaceContext: {
          mustSaveSettings: true,
          mustTestSettings: false,
          onResetActionsSettings: jest.fn(),
          isSaveEnabled: true,
          onSaveEnabled: jest.fn(),
          onTestEnabled: jest.fn(),
          onSynchronizeEnabled: jest.fn(),
        },
      };
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      fetchMock.reset();
      mockFetch("http://localhost:3000/directorysync/settings.json?api-version=v2", requestMockImpl);

      page.rerender(context, propsUpdated);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.userDirectory.getAttribute("disabled")).not.toBeNull();
        expect(page.activeDirectory.getAttribute("disabled")).not.toBeNull();
        expect(page.connectionType.getAttribute("disabled")).not.toBeNull();
        expect(page.serverHost.getAttribute("disabled")).not.toBeNull();
        expect(page.port.getAttribute("disabled")).not.toBeNull();
        expect(page.username.getAttribute("disabled")).not.toBeNull();
        expect(page.password.getAttribute("disabled")).not.toBeNull();
        expect(page.domainName.getAttribute("disabled")).not.toBeNull();
        expect(page.baseDn.getAttribute("disabled")).not.toBeNull();
        updateResolve();
      });
    });

    it('As AD I should see an error toaster if the submit operation fails for an unexpected reason', async() => {
      await waitFor(() => {});
      await page.click(page.directoryConfigurationTitle);
      const propsUpdated = {
        administrationWorkspaceContext: {
          mustSaveSettings: true,
          onResetActionsSettings: jest.fn(),
          isSaveEnabled: true,
          onSaveEnabled: jest.fn()
        }
      };

      // Mock the request function to make it return an error.
      const error = {
        status: 500
      };
      fetchMock.reset();
      mockFetch("http://localhost:3000/directorysync/settings.json?api-version=v2", Promise.reject(error));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      // Throw general error message
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("The service is unavailable");
    });
  });

  describe('As AD I see all fields disabled if mfa setting are not yet fetched', () => {
    const context = defaultAppContext(); // The applicative context
    /**
     * Given the groups section
     * And the groups are not loaded yet
     * Then I should see the loading message “Retrieving groups”
     */

    beforeEach(() => {
      fetchMock.reset();
      mockFetch("http://localhost:3000/directorysync/settings.json?api-version=v2", mockUserDirectorySettings);
      mockFetch("http://localhost:3000/users.json?api-version=v2", mockUsers);
      page = new DisplayUserDirectoryAdministrationPage(context, props);
    });

    it('As AD I should see all fields disabled”', () => {
      expect(page.userDirectory.getAttribute("disabled")).not.toBeNull();
    });
  });
});
