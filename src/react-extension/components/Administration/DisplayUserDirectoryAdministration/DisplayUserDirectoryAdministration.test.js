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
  defaultProps, mockResult,
  mockUserDirectorySettings, mockUsers
} from "./DisplayUserDirectoryAdministration.test.data";
import DisplayUserDirectoryAdministrationPage from "./DisplayUserDirectoryAdministration.test.page";
import {waitFor} from "@testing-library/react";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import DisplayTestUserDirectoryAdministration
  from "../DisplayTestUserDirectoryAdministration/DisplayTestUserDirectoryAdministration";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I should see the user directory settings", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe('As AD I should see the user directory activation state on the administration settings page', () => {
    /**
     * I should see the User Directory activation state on the administration settings page
     */
    beforeEach(() => {
      page = new DisplayUserDirectoryAdministrationPage(context, props);
    });

    it('As AD I should see if the User Directory is enabled on my Passbolt instance', async() => {
      expect(page.exists()).toBeTruthy();
      // check fields in the form
      expect(page.userDirectory.checked).toBeTruthy();

      expect(page.activeDirectory.checked).toBeTruthy();
      expect(page.connectionType).toBe("ldap://");
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
      await page.click(page.directoryConfigurationTitle);
      expect(props.administrationWorkspaceContext.onTestEnabled).toHaveBeenCalled();
      const propsUpdated = {
        administrationWorkspaceContext: {
          must: {
            save: false,
            test: true
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: false
          },
          onSaveEnabled: jest.fn(),
          onTestEnabled: jest.fn(),
          onSynchronizeEnabled: jest.fn(),
          onGetUsersDirectoryRequested: () => mockUserDirectorySettings,
          onGetUsersRequested: () => mockUsers,
          onTestUsersDirectoryRequested: jest.fn(),
        },
        dialogContext: {
          open: jest.fn()
        }
      };

      jest.spyOn(propsUpdated.administrationWorkspaceContext, 'onTestUsersDirectoryRequested').mockImplementation(() => mockUserDirectorySettings);

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.administrationWorkspaceContext.onTestUsersDirectoryRequested).toHaveBeenCalledWith(mockResult);
      expect(propsUpdated.dialogContext.open).toHaveBeenCalledWith(DisplayTestUserDirectoryAdministration);
    });

    it('As AD I should save the user directory on the administration settings page', async() => {
      await waitFor(() => {});
      await page.click(page.directoryConfigurationTitle);
      expect(props.administrationWorkspaceContext.onTestEnabled).toHaveBeenCalled();
      const propsUpdated = {
        administrationWorkspaceContext: {
          must: {
            save: true,
            test: false
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: true
          },
          onSaveEnabled: jest.fn(),
          onTestEnabled: jest.fn(),
          onSynchronizeEnabled: jest.fn(),
          onUpdateUsersDirectoryRequested: jest.fn(),
        }
      };
      jest.spyOn(propsUpdated.administrationWorkspaceContext, 'onUpdateUsersDirectoryRequested').mockImplementation(() => mockUserDirectorySettings);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.administrationWorkspaceContext.onUpdateUsersDirectoryRequested).toHaveBeenCalledWith(mockResult);
      expect(propsUpdated.administrationWorkspaceContext.onSynchronizeEnabled).toHaveBeenCalledWith(true);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The user directory settings for the organization were updated.");
    });

    it('As AD I should delete the user directory on the administration settings page', async() => {
      await waitFor(() => {});
      await page.click(page.userDirectory);

      const propsUpdated = {
        administrationWorkspaceContext: {
          must: {
            save: true,
            test: false
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: true
          },
          onSaveEnabled: jest.fn(),
          onTestEnabled: jest.fn(),
          onSynchronizeEnabled: jest.fn(),
          onDeleteUsersDirectoryRequested: jest.fn(),
        },
      };
      jest.spyOn(propsUpdated.administrationWorkspaceContext, 'onDeleteUsersDirectoryRequested').mockImplementation(() => mockUserDirectorySettings);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      page.rerender(context, propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.administrationWorkspaceContext.onDeleteUsersDirectoryRequested).toHaveBeenCalled();
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
          must: {
            save: true,
            test: false
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: true
          },
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
          must: {
            save: true,
            test: false
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: true
          },
          onSaveEnabled: jest.fn(),
          onTestEnabled: jest.fn(),
          onSynchronizeEnabled: jest.fn(),
          onUpdateUsersDirectoryRequested: jest.fn(),
        },
      };
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      jest.spyOn(propsUpdated.administrationWorkspaceContext, 'onUpdateUsersDirectoryRequested').mockImplementation(requestMockImpl);

      page.rerender(context, propsUpdated);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.userDirectory.getAttribute("disabled")).not.toBeNull();
        expect(page.activeDirectory.getAttribute("disabled")).not.toBeNull();
        expect(page.connectionTypeSelect.className).toBe("selected-value disabled");
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
          must: {
            save: true,
            test: false
          },
          onResetActionsSettings: jest.fn(),
          can: {
            save: true
          },
          onSaveEnabled: jest.fn(),
          onUpdateUsersDirectoryRequested: jest.fn()
        }
      };

      // Mock the request function to make it return an error.
      const error = {message: "The service is unavailable"};
      jest.spyOn(propsUpdated.administrationWorkspaceContext, 'onUpdateUsersDirectoryRequested').mockImplementation(() => Promise.reject(error));
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
     * Given the users directory setting
     * And the users directory are not loaded yet
     */

    it('As AD I should see all fields disabled”', () => {
      page = new DisplayUserDirectoryAdministrationPage(context, props);
      expect(page.userDirectory.getAttribute("disabled")).not.toBeNull();
    });
  });
});
