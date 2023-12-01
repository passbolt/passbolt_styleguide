/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */

import {defaultAppContext} from '../../../../contexts/ApiAppContext.test.data';
import {defaultPropsPro} from '../DisplayAdministrationPasswordExpiry.test.data';
import DisplayAdministrationPasswordExpirySettingsAdvancedPage from './DisplayAdministrationPasswordExpiryAdvanced.test.page.js';

/**
 * Unit tests on DisplayAdministrationPasswordExpirySettingsAdvancedPage in regard of specifications
 */
describe("DisplayAdministrationPasswordExpiryAdvanced", () => {
  const props = defaultPropsPro();
  const context = defaultAppContext();
  let page;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    page = new DisplayAdministrationPasswordExpirySettingsAdvancedPage(context, props);
  });

  describe('As an administrator I can set the automatic workflow', () => {
    it('As an administrator I can see the automatic workflow section', async() => {
      expect.assertions(4);

      expect(page.automaticWorkflowTitle.textContent).toEqual("Automatic workflows");
      expect(page.automaticWorkflowDescription.textContent).toEqual("In this section you can choose automatic behaviours.");
      expect(page.automaticExpiryToggle).not.toBeNull();
      expect(page.automaticUpdateToggle).not.toBeNull();
    });

    it('As an administrator I can see the automatic expiry toggle', async() => {
      expect.assertions(3);

      expect(page.automaticExpiryLabel.textContent).toEqual("Automatic Expiry");
      expect(page.automaticExpiryInfo.textContent).toEqual("Password automatically expires when a user or a group is removed from the permission list.");
      expect(page.automaticExpiryToggle.checked).toBeFalsy();
    });

    it('As an administrator I can set the automatic expiry when the toggle is triggered', async() => {
      expect.assertions(1);

      await page.clickOnAutomaticExpiryToggle();

      expect(page.automaticExpiryToggle.checked).toBeTruthy();
    });

    it('As an administrator I can see the automatic expiry toggle', async() => {
      expect.assertions(3);

      expect(page.automaticUpdateLabel.textContent).toEqual("Automatic Update");
      expect(page.automaticUpdateInfo.textContent).toEqual("When users change their passwords, the expiry date is increased by number of days set in the default password expiry period.");
      expect(page.automaticUpdateToggle.checked).toBeFalsy();
    });

    it('As an administrator I can set the automatic expiry when the toggle is triggered', async() => {
      expect.assertions(1);

      await page.clickOnAutomaticUpdateToggle();

      expect(page.automaticUpdateToggle.checked).toBeTruthy();
    });
  });

  describe('As an administrator I can set the expiry policies', () => {
    it('As an administrator I can see the expiry policies section', async() => {
      expect.assertions(4);

      expect(page.expiryPoliciesTitle.textContent).toEqual("Expiry Policies");
      expect(page.expiryPoliciesDescription.textContent).toEqual("In this section you can choose the default behaviour of password expiry policy for all users.");
      expect(page.defaultExpiryPeriodToggle).not.toBeNull();
      expect(page.policyOverrideToggle).not.toBeNull();
    });

    it('As an administrator I can see the default period toggle', async() => {
      expect.assertions(3);

      expect(page.defaultExpiryPeriodLabel.textContent).toEqual("Default password expiry period");
      expect(page.defaultExpiryPeriodInfo.textContent).toEqual("When a user creates a resource, a default expiry date is set for days");
      expect(page.defaultExpiryPeriodToggle.checked).toBeFalsy();
    });

    it('As an administrator I can see the default period input disabled if toggle is disabled', async() => {
      expect.assertions(2);

      //Default settings set toggle to false
      expect(page.defaultExpiryPeriodToggle.checked).toBeFalsy();
      expect(page.defaultExpiryPeriodInput.hasAttribute("disabled")).toBeTruthy();
    });

    it('As an administrator I can set the default days from the input', async() => {
      expect.assertions(2);

      // Turn on
      await page.clickOnDefaultExpiryPeriodToggle();
      await page.fillDefaultExpiryPeriod(90);

      expect(page.defaultExpiryPeriodToggle.checked).toBeTruthy();
      expect(page.defaultExpiryPeriodInput.value).toEqual("90");
    });

    it('As an administrator when enabling the defaut expiry, I should see the default value', async() => {
      expect.assertions(2);

      // Turn on
      await page.clickOnDefaultExpiryPeriodToggle();

      expect(page.defaultExpiryPeriodToggle.checked).toBeTruthy();
      expect(page.defaultExpiryPeriodInput.value).toEqual("90");
    });

    it('As an administrator I can see the policy override toggle', async() => {
      expect.assertions(3);

      expect(page.policyOverrideLabel.textContent).toEqual("Policy Override");
      expect(page.policyOverrideInfo.textContent).toEqual("Allow users to override the default policy.");
      expect(page.policyOverrideToggle.checked).toBeFalsy();
    });

    it('As an administrator I can set the policy override when the toggle is triggered', async() => {
      expect.assertions(1);

      await page.clickOnPolicyOverrideToggle();

      expect(page.policyOverrideToggle.checked).toBeTruthy();
    });
  });

  describe('As an administrator I can set the expiry notification', () => {
    it('As an administrator I can see the expiry notification section', async() => {
      expect.assertions(3);

      expect(page.expiryNotificationTitle.textContent).toEqual("Expiry notifications");
      expect(page.expiryNotificationDescription.textContent).toEqual("In this section you can choose when a notification is sent before an expiry date.");
      expect(page.expiryNotificationToggle).not.toBeNull();
    });

    it('As an administrator I can see the expiry notification input', async() => {
      expect.assertions(2);

      expect(page.expiryNotificationInfo.textContent).toEqual("A notification sentdays before the expiry date");
      expect(page.expiryNotificationInput).not.toBeNull();
    });

    it('As an administrator I can set the automatic expiry when the toggle is triggered', async() => {
      expect.assertions(1);

      await page.fillExpiryNotification(90);

      expect(page.expiryNotificationInput.value).toEqual("90");
    });
  });
});
