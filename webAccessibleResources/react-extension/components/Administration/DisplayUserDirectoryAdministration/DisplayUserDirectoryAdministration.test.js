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
import {defaultProps, mockResult, mockUsers} from "./DisplayUserDirectoryAdministration.test.data";
import DisplayUserDirectoryAdministrationPage from "./DisplayUserDirectoryAdministration.test.page";
import {waitFor} from "@testing-library/react";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import DisplayTestUserDirectoryAdministration from "../DisplayTestUserDirectoryAdministration/DisplayTestUserDirectoryAdministration";
import {enableFetchMocks} from 'jest-fetch-mock';
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {DialogContext} from '../../../contexts/DialogContext';
import DisplaySynchronizeUserDirectoryAdministration from "../DisplaySynchronizeUserDirectoryAdministration/DisplaySynchronizeUserDirectoryAdministration";
import DisplaySimulateSynchronizeUserDirectoryAdministration from "../DisplaySimulateSynchronizeUserDirectoryAdministration/DisplaySimulateSynchronizeUserDirectoryAdministration";

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

const mockApiCalls = (result = mockResult) => {
  fetch.doMockOnceIf(/directorysync\/settings*/, () => mockApiResponse(result));
  fetch.doMockOnceIf(/users*/, () => mockApiResponse(mockUsers));
};

describe("As AD I should see the user directory settings", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe('As AD I should see the user directory activation state on the administration settings page', () => {
    /**
     * I should see the User Directory activation state on the administration settings page
     */
    beforeEach(() => {
      mockApiCalls();
      page = new DisplayUserDirectoryAdministrationPage(context, props);
    });

    it('As AD I should see if the User Directory is enabled on my Passbolt instance', async() => {
      expect.assertions(35);

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
      expect(page.groupCustomFilters.value).toBe("");
      expect(page.userCustomFilters.value).toBe("");
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
      expect(page.updateUsers.checked).toBeTruthy();
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
      //button should be enable has we have data
      expect(page.isTestButtonEnabled()).toBeTruthy();

      //Call to save the settings
      fetch.doMockOnceIf(/directorysync\/settings\/test*/, () => mockApiResponse(mockResult));
      jest.spyOn(DialogContext._currentValue, 'open').mockImplementationOnce(jest.fn);

      // Click on test button
      await page.testSettings();

      expect.assertions(3);

      expect(DialogContext._currentValue.open).toHaveBeenCalledWith(DisplayTestUserDirectoryAdministration);
      expect(context.setContext).toHaveBeenCalledWith({displayTestUserDirectoryDialogProps: {userDirectoryTestResult: mockResult}});
    });


    it('As AD I should save the user directory on the administration settings page', async() => {
      //button should not be enable without changes
      expect(page.isSaveButtonEnabled()).toBeFalsy();

      //Call to save the settings
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse({}));
      //Call to retrieve the settings and users
      mockApiCalls();

      await page.fillPort("404");

      expect.assertions(6);

      //button should be enable with the changes
      expect(page.isSaveButtonEnabled()).toBeTruthy();

      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      await page.saveSettings();

      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The user directory settings for the organization were updated.");
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      //Simulate buttons and synchronize buttons should be enable
      expect(page.isSynchronizeButtonEnabled()).toBeTruthy();
      expect(page.isSimulateButtonEnabled()).toBeTruthy();
    });


    it('As AD I should delete the user directory on the administration settings page', async() => {
      //button should not be enable without changes
      expect(page.isSaveButtonEnabled()).toBeFalsy();

      //Call to delete
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse({}));
      mockApiCalls([]);

      await page.click(page.userDirectory);

      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      await page.saveSettings();

      expect(page.userDirectory.checked).toBeFalsy();
      // Expect the values do not exist
      expect(page.activeDirectory).toBeNull();
      expect(page.serverHost).toBeNull();
      expect(page.port).toBeNull();
      expect(page.username).toBeNull();
      expect(page.password).toBeNull();
      expect(page.domainName).toBeNull();
      expect(page.baseDn).toBeNull();
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The user directory settings for the organization were updated.");
      //Simulate buttons and synchronize buttons should not be enable
      expect(page.isSynchronizeButtonEnabled()).toBeFalsy();
      expect(page.isSimulateButtonEnabled()).toBeFalsy();
    });


    it('As AD I shouldn’t be able to submit the form if there is an invalid field', async() => {
      // empty fields
      page.fillHost("");
      page.fillPort("");
      page.fillDomain("");

      await page.saveSettings();

      // Throw error message
      expect(page.serverHostErrorMessage).toBe("A host is required.");
      expect(page.portErrorMessage).toBe("A port is required.");
      expect(page.domainErrorMessage).toBe("A domain name is required.");
    });

    it('As AD I should see an error toaster if the submit operation fails for an unexpected reason', async() => {
      expect.assertions(3);
      //button should not be enable without changes
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      // change field
      await page.fillPort("404");
      //button should be enable with changes
      expect(page.isSaveButtonEnabled()).toBeTruthy();
      // Mock the request function to make it return an error.
      const error = {message: "The service is unavailable"};

      fetch.doMockOnceIf(/directorysync*/, () => Promise.reject(error));

      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});
      await page.saveSettings();

      await waitFor(() => {});
      // Throw general error message
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("The service is unavailable");
    });

    it('As AD I should be able to simulate the synchronization', async() => {
      //button should be enable has we have data
      expect(page.isSimulateButtonEnabled()).toBeTruthy();

      //Call to save the settings
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse(mockResult));
      fetch.doMockOnceIf(/users*/, () => mockApiResponse(mockUsers));
      jest.spyOn(DialogContext._currentValue, 'open').mockImplementationOnce(jest.fn);

      // Click on simulate button
      await page.simulateSettings();

      expect.assertions(2);

      expect(DialogContext._currentValue.open).toHaveBeenCalledWith(DisplaySimulateSynchronizeUserDirectoryAdministration);
    });

    it('As AD I should be able to synchronize the users', async() => {
      //button should be enable has we have data
      expect(page.isSynchronizeButtonEnabled()).toBeTruthy();

      //Call to synchronize the settings
      fetch.doMockOnceIf(/directorysync\/synchronize*/, () => mockApiResponse(mockResult));
      fetch.doMockOnceIf(/users*/, () => mockApiResponse(mockUsers));

      jest.spyOn(DialogContext._currentValue, 'open').mockImplementationOnce(jest.fn);

      // Click on synchronize button
      await page.synchronizeSettings();

      expect.assertions(2);

      expect(DialogContext._currentValue.open).toHaveBeenCalledWith(DisplaySynchronizeUserDirectoryAdministration);
    });

    it('As AD I should see the synchronize popup when requested by simulate', async() => {
      //Call to simulate the settings
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse(mockResult));
      fetch.doMockOnceIf(/users*/, () => mockApiResponse(mockUsers));

      //Call to synchronize the settings
      fetch.doMockOnceIf(/directorysync\/synchronize*/, () => mockApiResponse(mockResult));
      fetch.doMockOnceIf(/users*/, () => mockApiResponse(mockUsers));

      jest.spyOn(DialogContext._currentValue, 'open').mockImplementationOnce(jest.fn);

      // Click on synchronize button
      await page.simulateSettings();

      DialogContext._currentValue.close();

      expect(DialogContext._currentValue.open).toHaveBeenCalledWith(DisplaySynchronizeUserDirectoryAdministration);
    });
  });
});

