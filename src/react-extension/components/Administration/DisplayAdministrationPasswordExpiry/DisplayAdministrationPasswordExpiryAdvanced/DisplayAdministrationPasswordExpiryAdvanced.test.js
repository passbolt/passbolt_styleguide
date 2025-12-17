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

import { defaultAppContext } from "../../../../contexts/ApiAppContext.test.data";
import { defaultPropsPro } from "../DisplayAdministrationPasswordExpiry.test.data";
import DisplayAdministrationPasswordExpirySettingsAdvancedPage from "./DisplayAdministrationPasswordExpiryAdvanced.test.page.js";
import NotifyError from "../../../Common/Error/NotifyError/NotifyError.js";
import { waitFor } from "@testing-library/dom";
import { waitForTrue } from "../../../../../../test/utils/waitFor.js";
import { overridenPasswordExpirySettingsEntityDto } from "../../../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data.js";
import { defaultAdminPasswordExpiryContext } from "../../../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPasswordExpiryContext.test.data.js";

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

  describe("As an administrator I can set the automatic workflow", () => {
    it("As an administrator I can see the automatic workflow section", async () => {
      expect.assertions(4);

      expect(page.automaticWorkflowTitle.textContent).toEqual("Automatic workflows");
      expect(page.automaticWorkflowDescription.textContent).toEqual(
        "In this section you can choose automatic behaviours.",
      );
      expect(page.automaticExpiryToggle).not.toBeNull();
      expect(page.automaticUpdateToggle).not.toBeNull();
    });

    it("As an administrator I can see the automatic expiry toggle", async () => {
      expect.assertions(3);

      expect(page.automaticExpiryLabel.textContent).toEqual("Automatic Expiry");
      expect(page.automaticExpiryInfo.textContent).toEqual(
        "Password automatically expires when a user or group with a user who has accessed the password is removed from the permission list.",
      );
      expect(page.automaticExpiryToggle.checked).toBeFalsy();
    });

    it("As an administrator I can set the automatic expiry when the toggle is triggered", async () => {
      expect.assertions(1);

      await page.clickOnAutomaticExpiryToggle();

      expect(page.automaticExpiryToggle.checked).toBeTruthy();
    });

    it("As an administrator I can see the automatic expiry toggle", async () => {
      expect.assertions(3);

      expect(page.automaticUpdateLabel.textContent).toEqual("Automatic Update");
      expect(page.automaticUpdateInfo.textContent).toEqual(
        "Password is no longer marked as expired whenever the password is updated.",
      );
      expect(page.automaticUpdateToggle.checked).toBeFalsy();
    });

    it("As an administrator I can set the automatic expiry when the toggle is triggered", async () => {
      expect.assertions(1);

      await page.clickOnAutomaticUpdateToggle();

      expect(page.automaticUpdateToggle.checked).toBeTruthy();
    });
  });

  describe("As an administrator I can set the expiry policies", () => {
    it("As an administrator I can see the expiry policies section", async () => {
      expect.assertions(4);

      expect(page.expiryPoliciesTitle.textContent).toEqual("Expiry Policies");
      expect(page.expiryPoliciesDescription.textContent).toEqual(
        "In this section you can choose the default behaviour of password expiry policy for all users.",
      );
      expect(page.defaultExpiryPeriodToggle).not.toBeNull();
      expect(page.policyOverrideToggle).not.toBeNull();
    });

    it("As an administrator I can see the default period toggle", async () => {
      expect.assertions(3);

      expect(page.defaultExpiryPeriodLabel.textContent).toEqual("Default password expiry period");
      expect(page.defaultExpiryPeriodInfo.textContent).toEqual(
        "When a user creates a resource, a default expiry date is set to days",
      );
      expect(page.defaultExpiryPeriodToggle.checked).toBeFalsy();
    });

    it("As an administrator I can see the default period input disabled if toggle is disabled", async () => {
      expect.assertions(2);

      //Default settings set toggle to false
      expect(page.defaultExpiryPeriodToggle.checked).toBeFalsy();
      expect(page.defaultExpiryPeriodInput.hasAttribute("disabled")).toBeTruthy();
    });

    it("As an administrator I can set the default days from the input", async () => {
      expect.assertions(2);

      // Turn on
      await page.clickOnDefaultExpiryPeriodToggle();
      await page.fillDefaultExpiryPeriod(90);

      expect(page.defaultExpiryPeriodToggle.checked).toBeTruthy();
      expect(page.defaultExpiryPeriodInput.value).toEqual("90");
    });

    it("As an administrator when enabling the defaut expiry, I should see the default value", async () => {
      expect.assertions(2);

      // Turn on
      await page.clickOnDefaultExpiryPeriodToggle();

      expect(page.defaultExpiryPeriodToggle.checked).toBeTruthy();
      expect(page.defaultExpiryPeriodInput.value).toEqual("90");
    });

    it("As an administrator I can see the policy override toggle", async () => {
      expect.assertions(3);

      expect(page.policyOverrideLabel.textContent).toEqual("Policy Override");
      expect(page.policyOverrideInfo.textContent).toEqual("Allow users to override the default policy.");
      expect(page.policyOverrideToggle.checked).toBeFalsy();
    });

    it("As an administrator I can set the policy override when the toggle is triggered", async () => {
      expect.assertions(1);

      await page.clickOnPolicyOverrideToggle();

      expect(page.policyOverrideToggle.checked).toBeTruthy();
    });

    it("As an administrator I can save the policy when hitting `enter`", async () => {
      expect.assertions(2);
      const props = defaultPropsPro({
        adminPasswordExpiryContext: defaultAdminPasswordExpiryContext(),
      });

      props.adminPasswordExpiryContext.isProcessing.mockImplementation(() => false);
      props.adminPasswordExpiryContext.validateData.mockImplementation(() => true);
      props.adminPasswordExpiryContext.getSettings.mockImplementation(() => overridenPasswordExpirySettingsEntityDto());

      const page = new DisplayAdministrationPasswordExpirySettingsAdvancedPage(context, props);
      page.submitForm();

      await waitForTrue(() => props.actionFeedbackContext.displaySuccess.mock.calls.length > 0);

      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(
        "The password expiry settings were updated.",
      );
    });

    it("As an administrator when an unexpected error happened while saving the policy by hitting `enter`", async () => {
      expect.assertions(3);
      const expectedError = new Error("Something wrong happened");
      const context = defaultAppContext();
      const props = defaultPropsPro({
        adminPasswordExpiryContext: defaultAdminPasswordExpiryContext(),
      });
      props.adminPasswordExpiryContext.isProcessing.mockImplementation(() => false);
      props.adminPasswordExpiryContext.validateData.mockImplementation(() => true);
      props.adminPasswordExpiryContext.getSettings.mockImplementation(() => overridenPasswordExpirySettingsEntityDto());
      props.adminPasswordExpiryContext.save.mockImplementation(() => {
        throw expectedError;
      });

      const page = new DisplayAdministrationPasswordExpirySettingsAdvancedPage(context, props);
      page.submitForm();
      await waitFor(() => {});

      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledTimes(1);
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error: expectedError });
    });

    it("As an administrator I should not be able to submit the form if the form is not valide", async () => {
      expect.assertions(5);
      const context = defaultAppContext();
      const props = defaultPropsPro({
        adminPasswordExpiryContext: defaultAdminPasswordExpiryContext(),
      });
      props.adminPasswordExpiryContext.isProcessing.mockImplementation(() => false);
      props.adminPasswordExpiryContext.validateData.mockImplementation(() => false);
      props.adminPasswordExpiryContext.getSettings.mockImplementation(() => overridenPasswordExpirySettingsEntityDto());

      const page = new DisplayAdministrationPasswordExpirySettingsAdvancedPage(context, props);
      const processingCallCountDuringRender = props.adminPasswordExpiryContext.isProcessing.mock.calls.length;
      page.submitForm();
      await waitFor(() => {});

      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
      expect(props.dialogContext.open).not.toHaveBeenCalled();
      expect(props.adminPasswordExpiryContext.save).not.toHaveBeenCalled();

      // to ensure the form submission is calling `isProcessing` we need to know the count of call made before the form submit event and add 1
      expect(props.adminPasswordExpiryContext.isProcessing).toHaveBeenCalledTimes(processingCallCountDuringRender + 1);
      expect(props.adminPasswordExpiryContext.validateData).toHaveBeenCalledTimes(1);
    });

    it("As a system I should not make multiple submission calls to the API when processing", async () => {
      expect.assertions(5);
      const context = defaultAppContext();
      const props = defaultPropsPro({
        adminPasswordExpiryContext: defaultAdminPasswordExpiryContext(),
      });
      props.adminPasswordExpiryContext.isProcessing.mockImplementation(() => true);
      props.adminPasswordExpiryContext.getSettings.mockImplementation(() => overridenPasswordExpirySettingsEntityDto());

      const page = new DisplayAdministrationPasswordExpirySettingsAdvancedPage(context, props);
      const processingCallCountDuringRender = props.adminPasswordExpiryContext.isProcessing.mock.calls.length;
      page.submitForm();
      await waitFor(() => {});

      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
      expect(props.dialogContext.open).not.toHaveBeenCalled();
      expect(props.adminPasswordExpiryContext.save).not.toHaveBeenCalled();
      expect(props.adminPasswordExpiryContext.validateData).not.toHaveBeenCalled();
      // to ensure the form submission is calling `isProcessing` we need to know the count of call made before the form submit event and add 1
      expect(props.adminPasswordExpiryContext.isProcessing).toHaveBeenCalledTimes(processingCallCountDuringRender + 1);
    });
  });
});
