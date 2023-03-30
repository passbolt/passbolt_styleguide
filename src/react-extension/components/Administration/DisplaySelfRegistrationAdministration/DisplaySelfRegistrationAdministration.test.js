/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.3
 */

import {enableFetchMocks} from 'jest-fetch-mock';
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {defaultAppContext} from '../../../contexts/ApiAppContext.test.data';
import DisplaySelfRegistrationAdministrationPage from './DisplaySelfRegistrationAdministration.test.page';
import {defaultProps, domains, mockResult} from './DisplaySelfRegistrationAdministration.test.data';
import {waitFor} from '@testing-library/react';
import * as uuid from 'uuid';
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import ConfirmSaveSelfRegistrationSettings from './ConfirmSaveSelfRegistrationSettings/ConfirmSaveSelfRegistrationSettings';
import ConfirmDeletionSelfRegistrationSettings from './ConfirmDeletionSelfRegistrationSettings/ConfirmDeletionSelfRegistrationSettings';

jest.mock('uuid');

/**
 * Unit tests on DisplaySelfRegistrationAdministration in regard of specifications
 */

describe("DisplaySelfRegistrationAdministration", () => {
  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
    jest.restoreAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  const context = defaultAppContext();
  const gmailDomain = "gmail.com";
  const requiredDomain = "A domain is required.";


  describe("As a logged in administrator I can enable the User self registration", () => {
    it('As a logged in administrator when the User self registration is not configured, I can access the User self registration settings page', async() => {
      fetch.doMockOnceIf(/self-registration\/settings*/, () => mockApiResponse(mockResult(null, false)));
      page = new DisplaySelfRegistrationAdministrationPage(context, props);
      await waitFor(() => {});
      expect.assertions(7);

      expect(page.exists()).toBeTruthy();
      expect(page.toggle.checked).toBeFalsy();
      expect(page.disabledDescription).toBeDefined();
      expect(page.helpBox).toBeDefined();
      expect(page.helpBoxButton).toBeDefined();
      expect(page.saveSettingsButton).toBeDefined();
      // We expect to have the button disable for the first usage
      expect(page.saveSettingsButton.hasAttribute("disabled")).toBeTruthy();
    });

    it('As a logged in administrator I can enable the User self registration setting', async() => {
      fetch.doMockOnceIf(/self-registration\/settings*/, () => mockApiResponse(mockResult([])));
      page = new DisplaySelfRegistrationAdministrationPage(context, props);
      await waitFor(() => {});
      expect.assertions(3);

      expect(page.helpBoxButton).toBeDefined();
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute('href')).toEqual('https://help.passbolt.com/configure/self-registration');
    });

    it('As a logged in administrator I can enable the User self registration setting', async() => {
      fetch.doMockOnceIf(/self-registration\/settings*/, () => mockApiResponse(mockResult([])));
      page = new DisplaySelfRegistrationAdministrationPage(context, props);
      await waitFor(() => {});
      expect.assertions(5);

      await page.clickOnToggle();

      expect(page.toggle.checked).toBeTruthy();
      expect(page.enabledLabel).toBeDefined();
      expect(page.enabledDescription).toBeDefined();
      // We should pre-populate with profesional domain
      expect(page.firstInputRow.value).toEqual("passbolt.com");
      expect(page.firstDeleteButton.hasAttribute("disabled")).toBeTruthy();
    });

    it('As a logged in administrator I can enable the User self registration setting', async() => {
      expect.assertions(5);

      const contextWithPublicDomain = defaultAppContext({
        loggedInUser: {
          username: "user@gmail.com"
        }
      });
      fetch.doMockOnceIf(/self-registration\/settings*/, () => mockApiResponse(mockResult([])));
      page = new DisplaySelfRegistrationAdministrationPage(context, defaultProps({
        context: contextWithPublicDomain
      }));

      await waitFor(() => {});
      await page.clickOnToggle();
      expect(page.toggle.checked).toBeTruthy();
      expect(page.enabledLabel).toBeDefined();
      expect(page.enabledDescription).toBeDefined();
      // We should not pre-populate with public domain
      expect(page.firstInputRow.value).toEqual("");
      expect(page.firstDeleteButton.hasAttribute("disabled")).toBeTruthy();
    });
  });
  describe("As a logged administrator I can add domains to the User self registration list", () => {
    beforeEach(() => {
      fetch.doMockOnceIf(/self-registration\/settings*/, () => mockApiResponse(mockResult()));
      page = new DisplaySelfRegistrationAdministrationPage(context, props);
      let index = 0;
      jest.spyOn(uuid, 'v4').mockImplementation(() => (index++).toString());
    });

    it('As a logged in administrator I can add a new input field to the User self registration list', async() => {
      expect.assertions(7);
      // We expect to not have 4 items
      expect(page.inputByIndex(0).value).toBe('passbolt.com');
      expect(page.inputByIndex(1).value).toBe('passbolt.io');
      expect(page.inputByIndex(2).value).toBe('passbolt.lu');
      expect(page.inputByIndex(3)).toBeNull();

      await page.addDomain();

      expect(page.inputByIndex(3)).toBeDefined();
      expect(page.inputByIndex(3).value).toBe('');
      //We expected to have a delete button closed to the input
      expect(page.deleteButtonByIndex(3)).toBeDefined();
    });

    it("As an administrator on the self registration admin settings form, I want to see the new row having focus when I click on the add a new row button", async() => {
      expect.assertions(1);
      await page.addDomain();

      expect(page.hasFocus(page.inputByIndex(3))).toBeTruthy();
    });


    it('As a logged in administrator I can add a new non-professional domain to the User self registration but I should see a warning message', async() => {
      expect.assertions(7);

      //Mock API calls
      fetch.doMockIf(/self-registration\/settings*/, () => mockApiResponse(mockResult([gmailDomain])));

      expect(page.warningMessage).toBeNull();

      await page.addDomain();
      await page.fillInput(page.inputByIndex(3), gmailDomain);

      expect(page.warningMessage).toBeDefined();
      expect(page.warningMessage.textContent).toBe("This is not a safe professional domain");
      expect(page.subtitle.classList.contains('warning')).toBeTruthy();

      //Warning should not block the save
      await page.clickOnSave();
      expect(page.warningMessage).toBeDefined();
      expect(page.warningMessage.textContent).toBe("This is not a safe professional domain");
      expect(page.subtitle.classList.contains('warning')).toBeTruthy();
    });
  });

  describe("As a logged administrator I can save a list of domains", () => {
    beforeEach(() => {
      mockUuidGeneration();
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
    });

    it('As a logged in administrator I can save a list of domains when there is no error and one domain field filled in', async() => {
      expect.assertions(2);
      //Mock API calls
      fetch.doMockIf(/self-registration\/settings*/, () => mockApiResponse(mockResult([])));

      page = new DisplaySelfRegistrationAdministrationPage(context, props);

      await waitFor(() => {});
      await page.clickOnToggle();
      await page.clickOnSave();

      // We expect to have a banner when settings changes are not saved
      expect(page.settingsChangedBanner).not.toBeNull();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmSaveSelfRegistrationSettings, expect.objectContaining({"domains": new Map(Object.entries(domains))}));
    });

    it('As a logged in administrator I can save a list of domains when there is no error and at least one domain filled in ', async() => {
      expect.assertions(2);
      //Mock get all
      fetch.doMockIf(/self-registration\/settings*/, () => mockApiResponse(mockResult()));

      page = new DisplaySelfRegistrationAdministrationPage(context, props);

      await waitFor(() => {});
      await page.addDomain();
      // fill with non profession domain
      await page.fillInput(page.inputByIndex(3), gmailDomain);
      // We expect to have a banner when settings changes are not saved
      expect(page.settingsChangedBanner).not.toBeNull();
      await page.clickOnSave();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmSaveSelfRegistrationSettings, expect.objectContaining({"domains": new Map(Object.entries(domains))}));
    });

    it('As a logged in administrator I cannot save the User self registration list when the format is not valid', async() => {
      expect.assertions(7);
      //Mock API calls
      fetch.doMockIf(/self-registration\/settings*/, () => mockApiResponse(mockResult()));

      page = new DisplaySelfRegistrationAdministrationPage(context, props);

      await waitFor(() => {});
      jest.spyOn(page.inputByIndex(1), 'focus');

      // fill with non profession domain
      await page.fillInput(page.inputByIndex(1), "");
      await page.clickOnSave();

      expect(page.errorMessage.textContent).toBe(requiredDomain);
      expect(page.subtitle.classList.contains('error')).toBeTruthy();
      // Check if input is focus
      expect(page.inputByIndex(1).focus).toHaveBeenCalled();

      await page.fillInput(page.inputByIndex(1), "127.0.0.1");

      expect(page.errorMessage.textContent).toBe("This should be a valid domain");
      expect(page.subtitle.classList.contains('error')).toBeTruthy();

      await page.fillInput(page.inputByIndex(1), "passbolt.com");
      await page.fillInput(page.inputByIndex(2), "passbolt.com");
      //Check duplication
      expect(page.errorMessage.textContent).toBe("This domain already exist");
      expect(page.subtitle.classList.contains('error')).toBeTruthy();
    });

    it('As an administrator on the self registration admin settings form, I want to see the warning message on a row domain even when there are errors on other domains rows', async() => {
      expect.assertions(4);
      //Mock API calls
      fetch.doMockIf(/self-registration\/settings*/, () => mockApiResponse(mockResult()));

      page = new DisplaySelfRegistrationAdministrationPage(context, props);

      await waitFor(() => {});
      jest.spyOn(page.inputByIndex(1), 'focus');

      // fill with non profession domain
      await page.fillInput(page.inputByIndex(1), "");
      await page.clickOnSave();

      expect(page.errorMessage.textContent).toBe("A domain is required.");

      // Lets add a new domain
      await page.addDomain();
      await page.fillInput(page.inputByIndex(2), gmailDomain);
      await page.focusOut(page.inputByIndex(2));

      expect(page.warningMessage).toBeDefined();
      expect(page.warningMessage.textContent).toBe("This is not a safe professional domain");
      expect(page.subtitle.classList.contains('warning')).toBeTruthy();
    });
  });
  describe("As a logged administrator I can remove a domain from the list", () => {
    beforeEach(() => {
      mockUuidGeneration();
      fetch.doMockOnceIf(/self-registration\/settings*/, () => mockApiResponse(mockResult()));
      page = new DisplaySelfRegistrationAdministrationPage(context, props);
    });
    it('As a logged in administrator I can remove a domain from an existing list of domains', async() => {
      expect.assertions(2);

      expect(page.inputByIndex(1).value).toBe("passbolt.io");
      await page.removeDomain(1);
      expect(page.inputByIndex(1)).toBeNull();
    });

    it('As a logged in administrator I can not remove the domain when there’s only one item in the list of domains allowed to self register', async() => {
      expect.assertions(4);

      expect(page.inputByIndex(1).value).toBe("passbolt.io");
      await page.removeDomain(1);
      await page.removeDomain(2);
      expect(page.inputByIndex(1)).toBeNull();
      expect(page.inputByIndex(2)).toBeNull();

      expect(page.deleteButtonByIndex(0).hasAttribute("disabled")).toBeTruthy();
    });

    it('As a logged in administrator I can reset the “User self registration” settings when I disable and enable the setting', async() => {
      expect.assertions(5);
      //Disable settings
      await page.clickOnToggle();
      await page.clickOnSave();

      //Test to check that data are not anymore present on the UI
      await page.clickOnToggle();

      expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmDeletionSelfRegistrationSettings, expect.objectContaining({onClose: expect.any(Function), onSubmit: expect.any(Function)}));
      //As index are generated by the function, a new input should have an incremented index
      expect(page.inputByIndex(0)).toBeNull();
      expect(page.inputByIndex(2)).toBeNull();
      expect(page.inputByIndex(3)).not.toBeNull();
      //New input should be prepopulate with the domain of the organization
      expect(page.firstInputRow.value).toEqual("passbolt.com");
    });

    it("As an administrator on the self registration admin settings form, I should not see an error when I enable the settings which previously were containing error", async() => {
      expect.assertions(4);

      //We generate an error
      await page.fillInput(page.inputByIndex(1), "");
      await page.clickOnSave();

      expect(page.errorMessage.textContent).toBe(requiredDomain);
      expect(page.subtitle.classList.contains('error')).toBeTruthy();

      // We disable self registration
      await page.clickOnToggle();
      // We enable it agzain
      await page.clickOnToggle();
      expect(page.errorMessage).toBeNull();
      expect(page.subtitle.classList.contains('error')).toBeFalsy();
    });
  });
});

function mockUuidGeneration() {
  let index = 0;
  jest.spyOn(uuid, 'v4').mockImplementation(() => (index++).toString());
}
