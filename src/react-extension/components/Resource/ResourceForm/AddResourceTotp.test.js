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

import {defaultProps} from './AddResourceTotp.test.data';
import AddResourceTotpPage from './AddResourceTotp.test.page';
import {
  defaultSecretDataV5DefaultTotpEntityDto
} from "../../../../shared/models/entity/secretData/secretDataV5DefaultTotpEntity.test.data";
import {defaultResourceFormDto} from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourceTotp", () => {
  let page; // The page to test against

  describe('As LU I can see the totp form.', () => {
    it('As LU I can see the resource totp form.', () => {
      expect.assertions(5);

      const props = defaultProps();
      page = new AddResourceTotpPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("TOTP");
      expect(page.uri.value).toEqual("");
      expect(page.resourceTotpKey.value).toEqual("");
      expect(page.advancedSettings).not.toEqual(null);
    });
  });

  describe('Fill totp password', () => {
    it('Enter uri should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceTotpPage(props);
      await page.fillInput(page.uri, "https://passbolt.com");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.uris.0");
      expect(value).toEqual("https://passbolt.com");
    });

    it('Enter totp key should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceTotpPage(props);
      await page.fillInput(page.resourceTotpKey, "key");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("secret.totp.secret_key");
      expect(value).toEqual("key");
    });

    it('Enter totp expiry should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceTotpPage(props);

      await page.click(page.advancedSettings);
      await page.fillInput(page.period, "60");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("secret.totp.period");
      expect(value).toEqual("60");
    });

    it('Enter totp length should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceTotpPage(props);

      await page.click(page.advancedSettings);
      await page.fillInput(page.digits, "8");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("secret.totp.digits");
      expect(value).toEqual("8");
    });

    it('Enter totp algorithm should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceTotpPage(props);

      await page.click(page.advancedSettings);
      await page.click(page.algorithm);
      await page.click(page.firstItemOption);

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("secret.totp.algorithm");
      expect(value).toEqual("SHA1");
    });
  });

  describe('As LU I cannot see the totp uri input form.', () => {
    it('As LU I cannot see the uri if the resource has a secret password.', () => {
      expect.assertions(3);

      const props = defaultProps({resource: defaultResourceFormDto({secret: defaultSecretDataV5DefaultTotpEntityDto()})});
      page = new AddResourceTotpPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("TOTP");
      expect(page.uri).toBeNull();
    });
  });
});
