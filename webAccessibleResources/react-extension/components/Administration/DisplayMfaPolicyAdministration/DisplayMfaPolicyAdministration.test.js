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
 * @since         3.10.O
 */

import {enableFetchMocks} from 'jest-fetch-mock';
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {ActionFeedbackContext} from '../../../contexts/ActionFeedbackContext';
import {defaultAppContext} from '../../../contexts/ApiAppContext.test.data';
import {defaultProps, settingDto} from './DisplayMfaPolicyAdministration.test.data';
import DisplayMfaPolicyAdministrationPage from './DisplayMfaPolicyAdministration.test.page';

jest.mock('uuid');

/**
 * Unit tests on DisplaySelfRegistrationAdministration in regard of specifications
 */

describe("DisplayMfaPolicyAdministration", () => {
  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
  });

  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  const context = defaultAppContext();

  describe("As an administrator I can read MFA policies settings of my organization", () => {
    beforeEach(() => {
      fetch.doMockOnceIf(/mfa-policies\/settings*/, () => mockApiResponse(settingDto));
      page = new DisplayMfaPolicyAdministrationPage(context, props);
    });

    it('As a logged in administrator I can see the “MFA policy” settings in the administration workspace ', async() => {
      expect.assertions(14);

      expect(page.exists()).toBeTruthy();
      expect(page.saveSettingsButton).not.toBeNull();
      expect(page.title.textContent).toBe("MFA Policy");
      expect(page.subtitle.textContent).toBe("Default users multi factor authentication policy");
      expect(page.description.textContent).toBe("You can choose the default behaviour of multi factor authentication for all users.");
      //Remember toggle
      expect(page.subtitleRemember.textContent).toBe("Remember a device for a month");
      expect(page.toggleRemember.checked).toBeTruthy();
      expect(page.toggleRememberLabel.textContent).toBe('Allow “Remember this device for a month.“ option during MFA.');
      // mandatory policy
      expect(page.mandatoryPolicy.checked).toBeFalsy();
      expect(page.mandatoryPolicyName.textContent).toEqual("Mandatory");
      expect(page.mandatoryPolicyInfo.textContent).toEqual("Users have to enable multi factor authentication. If they don't, they will be reminded every time they log in.");
      // opt-in policy
      expect(page.optInPolicy.value).toBeTruthy();
      expect(page.optInPolicyName.textContent).toEqual("Opt-in (default)");
      expect(page.optInPolicyInfo.textContent).toEqual("Users have the choice to enable multi factor authentication in their profile workspace.");
    });

    it('As a logged in administrator I can see an help box in the MFA policy administration screen ', async() => {
      expect.assertions(5);

      expect(page.helpBox).not.toBeNull();
      expect(page.helpBoxTitle.textContent).toBe("Need some help?");
      expect(page.helpBoxDescription.textContent).toBe("For more information about MFA policy settings, checkout the dedicated page on the help website.");
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute('href')).toEqual('https://help.passbolt.com/configure/mfa-policy');
    });
  });

  describe("As a logged in administrator I can update the MFA policy of my organization", () => {
    beforeEach(() => {
      fetch.doMockOnceIf(/mfa-policies\/settings*/, () => mockApiResponse(settingDto));
      page = new DisplayMfaPolicyAdministrationPage(context, props);
    });

    it('As a logged in administrator I should see a change banner when I change a setting of the MFA policy', async() => {
      expect.assertions(3);

      expect(page.settingsChangedBanner).toBeNull();
      await page.selectMandatory();
      expect(page.settingsChangedBanner).not.toBeNull();
      //put back the value should not show a banner again
      await page.selectOptin();
      expect(page.settingsChangedBanner).toBeNull();
    });
    it('As a logged in administrator I can update the “MFA policy” setting <<Success>', async() => {
      expect.assertions(3);
      //save mock
      fetch.doMockOnceIf(/mfa-policies\/settings*/, () => mockApiResponse({}));
      //get settings
      fetch.doMockOnceIf(/mfa-policies\/settings*/, () => mockApiResponse(settingDto));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      await page.selectMandatory();
      expect(page.settingsChangedBanner).not.toBeNull();

      await page.clickOnSave();
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The MFA policy settings were updated.");
      expect(page.settingsChangedBanner).toBeNull();
    });

    it('As a logged in administrator I can update the “MFA policy” setting <<Error>', async() => {
      expect.assertions(3);
      //save mock
      const error = {message: "The service is unavailable"};
      fetch.doMockOnceIf(/mfa-policies\/settings*/, () => Promise.reject(error));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});

      await page.selectMandatory();
      expect(page.settingsChangedBanner).not.toBeNull();

      await page.clickOnSave();
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith(error.message);
      expect(page.settingsChangedBanner).not.toBeNull();
    });
  });
});


