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
 * @since         3.0.0
 */

/**
 * Unit tests on CreateGpgKey in regard of specifications
 */
import ImportGpgKeyPage from "./ImportGpgKey.test.page";
import each from "jest-each";
import {ImportGpgKeyVariations} from "./ImportGpgKey";
import {defaultProps} from "./ImportGpgKey.test.data";


beforeEach(() => {
  jest.resetModules();
});

describe("ImportGpgKey", () => {
  each([
    {displayAs: ImportGpgKeyVariations.SETUP}, // Import a gpg key for the setup workflow
    {displayAs: ImportGpgKeyVariations.RECOVER}, // Import a gpg key for the recover workflow
  ]).describe("Common behavior to all context", _props => {
    it(`As AN I should be able to paste my secret key, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new ImportGpgKeyPage(props);

      expect.assertions(1);
      const expectedPrivateKey = 'Some private key';
      await page.fill(expectedPrivateKey);
      expect(page.privateKey).toBe(expectedPrivateKey);
    });

    it(`As AN I cannot update the form fields while submitting the form, scenario: ${JSON.stringify(_props)}`, async() => {
      let verifyResolve = null;
      const onComplete = jest.fn(() => new Promise(resolve => verifyResolve = resolve));
      const props = defaultProps({..._props, onComplete});
      const page = new ImportGpgKeyPage(props);

      expect.assertions(2);
      const inProgressFn = async() => {
        if (page.canChange) {
          throw new Error("The page state didn't change yet.");
        }
        verifyResolve();
      };
      await page.fill("some private key");
      await page.verifyKey(inProgressFn);
      expect(props.onComplete).toHaveBeenCalled();
      expect(verifyResolve).toBeDefined();
    });

    it(`As AN I should see a processing feedback while submitting the form, scenario: ${JSON.stringify(_props)}`, async() => {
      let verifyResolve = null;
      const onComplete = jest.fn(() => new Promise(resolve => verifyResolve = resolve));
      const props = defaultProps({..._props, onComplete});
      const page = new ImportGpgKeyPage(props);

      expect.assertions(2);
      const inProgressFn = () => {
        if (!page.isProcessing) {
          throw new Error("The page is not yet processing");
        }
        verifyResolve();
      };
      await page.fill("some private key");
      await page.verifyKey(inProgressFn);
      expect(props.onComplete).toHaveBeenCalled();
      expect(verifyResolve).toBeDefined();
    });

    it(`As AN I should see an error if the private key is empty after submitting the form (first validation), scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps(_props);
      const page = new ImportGpgKeyPage(props);

      expect.assertions(1);
      const emptyPrivateKey = ' ';
      await page.fill(emptyPrivateKey);
      await page.verifyKey();
      expect(page.hasEmptyPrivateKeyError).toBeTruthy();
    });

    it(`As AN I should see an error if the private key is invalid, scenario: ${JSON.stringify(_props)}`, async() => {
      const gpgKeyError = {name: 'GpgKeyError'};
      const onComplete = jest.fn(() => Promise.reject(gpgKeyError));
      const props = defaultProps({..._props, onComplete});
      const page = new ImportGpgKeyPage(props);

      expect.assertions(1);
      await page.fill('Some private key');
      await page.verifyKey();
      expect(page.hasInvalidPrivateKeyError).toBeTruthy();
    });

    it(`As AN I should see an error if the private key is expired, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps({
        ..._props,
        validatePrivateGpgKey: jest.fn(() => { throw new Error("The private key should not be expired."); })
      });
      props.context.port.request.mockImplementation(() => ({
        expires: "2021-05-25T09:00:00.000",
        revoked: false
      }));
      const page = new ImportGpgKeyPage(props);

      expect.assertions(2);
      await page.fill('Some private key');
      await page.verifyKey();
      expect(page.hasInvalidPrivateKeyError).toBeTruthy();
      expect(page.invalidPrivateKeyErrorMessage).toBe("The private key should not be expired.");
    });

    it(`As AN I should see an error if the private key is revoked, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps({
        ..._props,
        validatePrivateGpgKey: jest.fn(() => { throw new Error("The private key should not be revoked."); })
      });
      props.context.port.request.mockImplementation(() => ({
        expires: "Infinity",
        revoked: true
      }));
      const page = new ImportGpgKeyPage(props);

      expect.assertions(2);
      await page.fill('Some private key');
      await page.verifyKey();
      expect(page.hasInvalidPrivateKeyError).toBeTruthy();
      expect(page.invalidPrivateKeyErrorMessage).toBe("The private key should not be revoked.");
    });

    it(`As AN I should see an error if the private key format is invalid, scenario: ${JSON.stringify(_props)}`, async() => {
      const props = defaultProps({
        ..._props,
        validatePrivateGpgKey: jest.fn(() => { throw new Error("The private key should be a valid armored GPG key."); })
      });
      props.context.port.request.mockImplementation(() => { throw new Error("Invalid Gpg key format."); });
      const page = new ImportGpgKeyPage(props);

      expect.assertions(2);
      await page.fill('Some private key');
      await page.verifyKey();
      expect(page.hasInvalidPrivateKeyError).toBeTruthy();
      expect(page.invalidPrivateKeyErrorMessage).toBe("The private key should be a valid armored GPG key.");
    });
  });

  describe('As AN on the Setup workflow', () => {
    it('As AN on the setup workflow I should be prompted to import my private key', async() => {
      const props = defaultProps({displayAs: ImportGpgKeyVariations.SETUP});
      const page = new ImportGpgKeyPage(props);

      expect.assertions(1);
      expect(page.title).toBe("Please enter your private key to continue.");
    });

    it(`As AN on the setup workflow I should be able to generate a new key instead`, async() => {
      const props = defaultProps({displayAs: ImportGpgKeyVariations.SETUP});
      const page = new ImportGpgKeyPage(props);

      expect.assertions(2);
      expect(page.secondaryActionLink.textContent).toContain("Or generate a new private key.");
      await page.clickSecondaryActionLink();
      expect(props.onSecondaryActionClick).toHaveBeenCalled();
    });

    it("As AN on the setup workflow I can't provide a key having an expiration date", async() => {
      const props = defaultProps({
        displayAs: ImportGpgKeyVariations.SETUP,
        validatePrivateGpgKey: jest.fn(() => { throw new Error("The private key shouldn't have an expiry date."); })
      });
      props.context.port.request.mockImplementation(() => ({
        expires: "2100-01-01 00:00:00.000",
        revoked: false
      }));
      const page = new ImportGpgKeyPage(props);

      expect.assertions(2);
      await page.fill('Some private key');
      await page.verifyKey();
      expect(page.hasInvalidPrivateKeyError).toBeTruthy();
      expect(page.invalidPrivateKeyErrorMessage).toBe("The private key shouldn't have an expiry date.");
    });
  });

  describe('As AN on the Recover workflow', () => {
    it('As AN on the Recover workflow I should be prompted to import my private key', async() => {
      const props = defaultProps({displayAs: ImportGpgKeyVariations.RECOVER});
      const page = new ImportGpgKeyPage(props);

      expect.assertions(1);
      expect(page.title).toBe("Welcome back, please enter your private key to begin the recovery process.");
    });

    it(`As AN on the recover workflow I should be able to request help if I lost my private key`, async() => {
      const props = defaultProps({displayAs: ImportGpgKeyVariations.RECOVER});
      const page = new ImportGpgKeyPage(props);

      expect.assertions(2);
      expect(page.secondaryActionLink.textContent).toContain("Help, I lost my private key.");
      await page.clickSecondaryActionLink();
      expect(props.onSecondaryActionClick).toHaveBeenCalled();
    });

    it("As AN on the recover workflow I can still provide a key having an expiration date", async() => {
      const props = defaultProps({displayAs: ImportGpgKeyVariations.RECOVER});
      props.context.port.request.mockImplementation(() => ({
        expires: "2100-01-01 00:00:00.000",
        revoked: false
      }));
      const page = new ImportGpgKeyPage(props);

      expect.assertions(1);
      await page.fill('Some private key');
      await page.verifyKey();
      expect(page.hasInvalidPrivateKeyError).toBeFalsy();
    });

    it("As AN I should see a warning if the private key has an expiration date", async() => {
      const props = defaultProps({
        validatePrivateGpgKey: jest.fn(() => { throw new Error("The private key should be a valid armored GPG key."); }),
        hasKeyExpirationDate: jest.fn(() => Promise.resolve(true))
      });
      props.context.port.request.mockImplementation(() => ({
        expires: "2100-01-01 00:00:00.000",
        revoked: false
      }));
      const page = new ImportGpgKeyPage(props);

      expect.assertions(3);
      await page.fill('Some private key');
      await page.verifyKey();
      expect(page.hasInvalidPrivateKeyError).toBeTruthy();
      expect(page.warningMessage).toContain("The private key should not have an expiry date.");
      expect(page.warningMessage).toContain("Once expired you will not be able to connect to your account.");
    });
  });
});
