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
 * @since         5.0.0
 */

/**
 * Unit tests on OrchestrateResourceForm in regard of specifications
 */

import AddResourcePasswordPage from './AddResourcePassword.test.page';
import {defaultProps} from './AddResourcePassword.test.data';
import {SecretGenerator} from '../../../../shared/lib/SecretGenerator/SecretGenerator';

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourcePassword", () => {
  let page; // The page to test against

  describe('As LU I can see the password form.', () => {
    it('As LU I can see the resource password form.', () => {
      expect.assertions(5);

      const props = defaultProps();
      page = new AddResourcePasswordPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("Password");
      expect(page.uri.value).toEqual("");
      expect(page.username.value).toEqual("");
      expect(page.password.value).toEqual("");
    });
  });

  describe('Fill form password', () => {
    it('generates password when clicking on the generate button should call callback function.', async() => {
      expect.assertions(2);

      const props = defaultProps();
      jest.spyOn(props, "onChange");
      page = new AddResourcePasswordPage(props);
      jest.spyOn(SecretGenerator, "generate").mockImplementation(() => "generate-password");
      await page.click(page.passwordGenerateButton);

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith({"target": {"name": "secret.password", "value": "generate-password"}});
    });

    it('Enter password should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourcePasswordPage(props);
      await page.fillInput(page.password, "secret");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("secret.password");
      expect(value).toEqual("secret");
    });

    it('Enter username should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourcePasswordPage(props);
      await page.fillInput(page.username, "username");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.username");
      expect(value).toEqual("username");
    });

    it('Enter uri should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourcePasswordPage(props);
      await page.fillInput(page.uri, "uri");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.uris.0");
      expect(value).toEqual("uri");
    });
  });

  describe('View password', () => {
    it('views password when clicking on the view button.', async() => {
      expect.assertions(6);

      const props = defaultProps();
      page = new AddResourcePasswordPage(props);

      const passwordValue = "secret-decrypted";
      await page.fillInput(page.password, passwordValue);

      // View password
      await page.click(page.passwordViewButton);

      let passwordInputType = page.password.getAttribute("type");
      expect(passwordInputType).toBe("text");
      expect(page.passwordViewButton.classList.contains("eye-open")).toBe(false);
      expect(page.passwordViewButton.classList.contains("eye-close")).toBe(true);

      // Hide password
      await page.click(page.passwordViewButton);

      passwordInputType = page.password.getAttribute("type");
      expect(passwordInputType).toBe("password");
      expect(page.passwordViewButton.classList.contains("eye-open")).toBe(true);
      expect(page.passwordViewButton.classList.contains("eye-close")).toBe(false);
    });
  });

  describe('should focus on password field', () => {
    it('should focus on password field if the entropy is too low.', async() => {
      expect.assertions(1);

      const props = defaultProps({
        consumePasswordEntropyError: jest.fn(() => true),
      });
      page = new AddResourcePasswordPage(props);

      expect(document.activeElement).toBe(page.password);
    });
  });

  describe('As LU I should see the password disabled.', () => {
    it('As LU I can see the password form disabled.', async() => {
      expect.assertions(3);

      const props = defaultProps({disabled: true});
      page = new AddResourcePasswordPage(props);

      expect(page.password.hasAttribute("disabled")).toBeTruthy();
      expect(page.uri.hasAttribute("disabled")).toBeTruthy();
      expect(page.username.hasAttribute("disabled")).toBeTruthy();
    });
  });
});
