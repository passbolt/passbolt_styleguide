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
 * @since         3.3.0
 */

/**
 * Unit tests on GeneratePasswordPage in regard of specifications
 */
import {defaultProps} from "./GeneratePasswordPage.test.data";
import GeneratePasswordTestPage from "./GeneratePasswordPage.test.page";
import "../../../react-extension/test/lib/crypto/cryptoGetRandomvalues";

beforeEach(() => {
  jest.resetModules();
});

describe("Generate password", () => {
  let page; // The page to test against
  let props = null; // The page props

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new GeneratePasswordTestPage(props);
  });

  describe('As LU I should generate a password', () => {
    it('As LU I should apply a generated password', async() => {
      expect(page.title).toBe('Generate password');
      expect(page.complexityText).toBe('Fair (entropy: 103.6 bits)');
      await page.applyGeneratePassword();
      expect(props.prepareResourceContext.onPasswordGenerated).toHaveBeenCalledWith(page.password, props.prepareResourceContext.settings.generators[1]);
      expect(props.history.goBack).toHaveBeenCalled();
    });

    it('As LU I should generate a new password', async() => {
      const password = page.password;
      await page.generatePassword();
      // TODO random value return always the same value
      expect(password === page.password).toBeTruthy();
    });

    it('As LU I should copy a password', async() => {
      const mockClipboard = {
        writeText: jest.fn()
      };
      global.navigator.clipboard = mockClipboard;
      await page.copyPassword();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(page.password);
    });
  });

  describe('As LU I should choose to use password configuration', () => {
    it('AS LU I should be able to use password configuration', async() => {
      await page.usePasswordGenerator();
      expect(page.activeTab).toBe('Password');
    });
  });

  describe('AS LU I should not perform actions during the apply password', () => {
    it('AS LU I should not re-submit during the apply password', async() => {
      const inProgressFn = () => {
        expect(page.canSubmit).toBeFalsy();
      };
      await page.applyGeneratePassword(inProgressFn);
    });
  });
});
