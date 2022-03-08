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
 * @since         3.6.0
 */

/**
 * Unit tests on ConfirmSaveAccountRecoverySettings in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import {
  defaultProps,
  formatDateTimeAgo,
  formatDate,
  hasChangedPolicyProps
} from "./ConfirmSaveAccountRecoverySettings.test.data";
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
      expect(page.accountRecoveryPolicy).toBe('Optional, Opt-in');
      expect(page.accountRecoveryPolicyInfo).toBe("Every user can decide to provide a copy of their private key and passphrase by default during the setup, but they can opt in.");

      // organization recovery key
      expect(page.recoveryKeyDetailsExists()).toBeFalsy();

      // Save button exists
      expect(page.saveButton.textContent).toBe("Save");

      // Cancel button exists
      expect(page.cancelButton.textContent).toBe("Cancel");
    });

    it('As a logged in administrator in the administration workspace, I can preview policy and organization recovery key', async() => {
      const props = hasChangedPolicyProps();
      page = new ConfirmSaveAccountRecoverySettingsPage(props);

      // Policy label
      expect(page.accountRecoveryPolicy).toBe('Mandatory');
      expect(page.accountRecoveryPolicyInfo).toBe("Every user is required to provide a copy of their private key and passphrase during setup.Warning: You should inform your users not to store personal passwords.");

      // organization recovery key
      expect(page.recoveryKeyDetailsExists()).toBeTruthy();
      expect(page.recoveryKeyDetailsFingerprint).toBe("0C1D 1761 110D 1E33 C9006D1A 5B1B 332E D064 26D3 ");
      expect(page.recoveryKeyDetailsAlgorithm).toBe(props.keyInfo.algorithm);
      expect(page.recoveryKeyDetailsKeyLength).toBe("4096");
      expect(page.recoveryKeyDetailsUserIds).toBe("ada<ada@passbolt.com>betty<betty@passbolt.com>");
      expect(page.recoveryKeyDetailsCreated).toBe(formatDate(props.keyInfo.created));
      expect(page.recoveryKeyDetailsExpires).toBe(formatDateTimeAgo(props.keyInfo.expires));
    });

    it('As a logged in administrator in the administration workspace, if the previous Account recovery settings state was "Disabled" I can save the Account recovery settings to enable my policy without entering the Organization recovery key', async() => {
      const props = defaultProps(); // The props to pass
      page = new ConfirmSaveAccountRecoverySettingsPage(props);
      await waitFor(() => {});

      await page.save();

      expect(props.onSubmit).toHaveBeenCalled();
    });

    it('As LU I can stop saving an account recovery settings by clicking on the cancel button', async() => {
      const props = defaultProps(); // The props to pass
      page = new ConfirmSaveAccountRecoverySettingsPage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.cancel();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop saving an account recovery settings by closing the dialog', async() => {
      const props = defaultProps(); // The props to pass
      page = new ConfirmSaveAccountRecoverySettingsPage(props);
      await waitFor(() => {});
      expect(page.exists()).toBeTruthy();
      await page.close();
      expect(props.onClose).toBeCalled();
    });
  });
});
