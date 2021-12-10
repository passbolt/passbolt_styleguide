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
 * @since         3.4.0
 */

/**
 * Unit tests on ConfirmSaveAccountRecoverySettings in regard of specifications
 */
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import {waitFor} from "@testing-library/react";
import {
  defaultProps, formatDateTimeAgo,
  mockAccountRecoveryMandatoryWithOrganisationKey, mockAccountRecoveryOptInWithOrganisationKey
} from "./ConfirmSaveAccountRecoverySettings.test.data";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import ConfirmSaveAccountRecoverySettingsPage from "./ConfirmSaveAccountRecoverySettings.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Confirm Save Account Recovery Settings", () => {
  let page; // The page to test agains

  describe('As a logged in administrator in the administration workspace, I can preview the changes the Account recovery settings prior to enabling my new policy', () => {
    /**
     * I should see the account recovery settings dialog
     */
    it('As a logged in administrator in the administration workspace, I can preview only policy', async() => {
      const props = defaultProps(); // The props to pass
      page = new ConfirmSaveAccountRecoverySettingsPage(props);
      await waitFor(() => {});
      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Save Settings Summary");

      // Close button exists
      expect(page.closeButton).not.toBeNull();

      // Policy label
      expect(page.accountRecoveryPolicy).toBe('Disable');
      expect(page.accountRecoveryPolicyInfo).toBe(props.accountRecovery.policy.info);

      // organisation recovery key
      expect(page.recoveryKeyDetailsExists()).toBeFalsy();

      // Save button exists
      expect(page.saveButton.value).toBe("Save");

      // Cancel button exists
      expect(page.cancelButton.textContent).toBe("Cancel");
    });

    it('As a logged in administrator in the administration workspace, I can preview policy and organisation recovery key', async() => {
      const props = defaultProps(mockAccountRecoveryMandatoryWithOrganisationKey);
      page = new ConfirmSaveAccountRecoverySettingsPage(props);
      await waitFor(() => {});
      // Policy label
      expect(page.accountRecoveryPolicy).toBe('Mandatory');
      expect(page.accountRecoveryPolicyInfo).toBe(props.accountRecovery.policy.info);

      // organisation recovery key
      expect(page.recoveryKeyDetailsExists()).toBeTruthy();
      expect(page.recoveryKeyDetailsFingerprint).toBe("848E 95CC 7493 129A D8625831 29B8 1CA8 9360 23DD ");
      expect(page.recoveryKeyDetailsAlgorithm).toBe(props.accountRecovery.organisationRecoveryKey.value.algorithm);
      expect(page.recoveryKeyDetailsKeyLength).toBe("4096");
      expect(page.recoveryKeyDetailsCreated).toBe(formatDateTimeAgo(props.accountRecovery.organisationRecoveryKey.value.created));
      expect(page.recoveryKeyDetailsExpires).toBe(formatDateTimeAgo(props.accountRecovery.organisationRecoveryKey.value.expires));
    });

    it('As a logged in administrator in the administration workspace, if the previous Account recovery settings state was "Disabled" I can save the Account recovery settings to enable my policy without entering the Organisation recovery key', async() => {
      const props = defaultProps(mockAccountRecoveryOptInWithOrganisationKey); // The props to pass
      page = new ConfirmSaveAccountRecoverySettingsPage(props);
      await waitFor(() => {});

      const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementation(implementation);
      const requestMockImpl = jest.fn((message, data) => data);
      mockContextRequest(requestMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      const accountRecoveryOrganisationPolicyDto = {
        policy: props.accountRecovery.policy.value,
        account_recovery_organization_key: props.accountRecovery.organisationRecoveryKey.value
      };

      await page.save();

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.account-recovery.organization.save-settings", accountRecoveryOrganisationPolicyDto);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalled();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop saving an account recovery settings by clicking on the cancel button', async() => {
      const props = defaultProps(); // The props to pass
      page = new ConfirmSaveAccountRecoverySettingsPage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.cancel();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop creating a password by closing the dialog', async() => {
      const props = defaultProps(); // The props to pass
      page = new ConfirmSaveAccountRecoverySettingsPage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.close();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      const props = defaultProps(); // The props to pass
      page = new ConfirmSaveAccountRecoverySettingsPage(props);
      await waitFor(() => {});

      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Jest simulate API error.");
      });
      jest.spyOn(props.dialogContext, 'open').mockImplementationOnce(jest.fn);
      await page.save();

      // Throw general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError);
    });
  });
});
