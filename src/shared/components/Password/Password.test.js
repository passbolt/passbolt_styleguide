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
 * Unit tests on Password in regard of specifications
 */
import PasswordPage from "./Password.test.page";
import {defaultProps} from "./Password.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the user confirm passphrase page", () => {
  let page; // The page to test against
  const props = defaultProps();

  describe('As LU I can start enter a password', () => {
    /**
     * Given the user settings passphrase
     * Matches the styleguide
     * I should be able to enter my new password
     * I should initially see the passphrase I typed as obfuscated
     * I should be able to see the non-obfuscated passphrase I typed
     */
    beforeEach(() => {
      page = new PasswordPage(props);
    });

    it('Matches the styleguide', () => {
      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();

      // Password input field exists
      expect(page.passwordInput).not.toBeNull();
      expect(page.password).toBe("");
      expect(page.passwordInput.getAttribute("type")).toBe("password");
      const passwordInputStyle = window.getComputedStyle(page.passwordInput);
      expect(passwordInputStyle.background).toBe("white");
      expect(passwordInputStyle.color).toBe("");

      // Password view button exists.
      expect(page.eyeButton).not.toBeNull();
      expect(page.eyeButton.classList.contains("eye-open")).toBe(true);
      expect(page.eyeButton.classList.contains("eye-close")).toBe(false);

      // Security token exists.
      expect(page.securityToken).not.toBeNull();
      const securityTokenInputStyle = window.getComputedStyle(page.securityToken);
      expect(securityTokenInputStyle.background).toBe("rgb(255, 170, 71)");
      expect(securityTokenInputStyle.color).toBe("rgb(0, 0, 0)");
    });

    it('As LU I should be able to enter my new password', async() => {
      const expectedPassphrase = 'La belle vie';
      await page.insertPassword(expectedPassphrase);
      expect(page.password).toBe(expectedPassphrase);
      expect(page.securityToken.textContent).toBe('PAS');
      expect(props.onChange).toHaveBeenCalled();
    });

    it('As LU I should initially see the passphrase I typed as obfuscated', async() => {
      const passphrase = 'La belle vie';
      await page.insertPassword(passphrase);
      expect(page.isObfuscated).toBeTruthy();
    });

    it('As LU I should be able to see the non-obfuscate passphrase I typed', async() => {
      const passphrase = 'La belle vie';
      await page.insertPassword(passphrase);
      await page.toggleObfuscate();
      expect(page.isObfuscated).toBeFalsy();
    });
  });
});
