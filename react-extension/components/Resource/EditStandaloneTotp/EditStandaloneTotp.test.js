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
 * @since         4.4.0
 */

/**
 * Unit tests on EditStandaloneTotp in regard of specifications
 */
import "../../../test/lib/crypto/cryptoGetRandomvalues";
import {waitFor} from "@testing-library/react";
import StandaloneTotpViewModel from "../../../../shared/models/standaloneTotp/StandaloneTotpViewModel";
import EditStandaloneTotpPage from "./EditStandaloneTotp.test.page";
import {defaultProps} from "./EditStandaloneTotp.test.data";
import {defaultTotpViewModelDto} from "../../../../shared/models/totp/TotpDto.test.data";

describe("See the Edit Standalone TOTP", () => {
  let page, props, totp;
  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementationOnce(implementation);

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    props = defaultProps(); // The props to pass
    totp = defaultTotpViewModelDto();
    mockContextRequest(props.context, () => ({totp}));
    page = new EditStandaloneTotpPage(props);
  });

  const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";
  describe('As LU I can start editing a standalone totp', () => {
    it('matches the styleguide', async() => {
      expect.assertions(12);
      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.header.textContent).toBe("Edit standalone TOTP");

      // Close button exists
      expect(page.dialogClose).not.toBeNull();

      // Name input field exists.
      expect(page.name.value).toBe(props.resource.metadata.name);
      // Uri input field exists.
      expect(page.uri.value).toBe(props.resource.metadata.uris[0]);
      // Username input field exists.
      expect(page.secretKey.value).toBe(totp.secret_key);

      // Upload QR code button exists.
      expect(page.uploadQrCodeButton).not.toBeNull();

      // Click to open advanced settings
      await page.click(page.advancedSettings);

      // Period input field exists
      expect(page.period.value).toBe(totp.period.toString());

      // Digits input field exists
      expect(page.digits.value).toBe(totp.digits.toString());

      // Algorithm input field exists
      expect(page.algorithm.textContent).toBe(totp.algorithm);

      // Save button exists
      expect(page.saveButton.textContent).toBe("Save");

      // Cancel button exists
      expect(page.cancelButton.textContent).toBe("Cancel");
    });

    it('Requests the addon to edit a standalone totp when clicking on the submit button.', async() => {
      expect.assertions(4);

      expect(page.exists()).toBeTruthy();
      // create standalone totp
      const resourceMeta = {
        name: "TOTP name",
        uri: "https://uri.dev",
        secret_key: totp.secret_key,
        period: totp.period,
        digits: totp.digits,
        algorithm: totp.algorithm,
      };
      // Fill the form
      page.fillInput(page.name, resourceMeta.name);
      page.fillInput(page.uri, resourceMeta.uri);

      await page.click(page.saveButton);
      await waitFor(() => {});

      const standaloneTotpViewModel = new StandaloneTotpViewModel(resourceMeta).toResourceDto();
      expect(props.onSubmit).toHaveBeenCalledWith(standaloneTotpViewModel, null);
      expect(props.onClose).toBeCalled();
      expect(props.onCancel).toBeCalled();
    });

    it('Requests the addon to edit a standalone totp with advanced settings when clicking on the submit button.', async() => {
      expect.assertions(4);

      expect(page.exists()).toBeTruthy();
      // create standalone totp
      const resourceMeta = {
        name: "TOTP name",
        uri: "https://uri.dev",
        secret_key: "JBSWY3DPEHPK3PXP",
        period: 60,
        digits: 7,
        algorithm: "SHA256",
      };
      // Fill the form
      page.fillInput(page.name, resourceMeta.name);
      page.fillInput(page.uri, resourceMeta.uri);
      page.fillInput(page.secretKey, resourceMeta.secret_key);

      // Click to open advanced settings
      await page.click(page.advancedSettings);
      // Fill the advanced settings form
      page.fillInput(page.period, resourceMeta.period);
      page.fillInput(page.digits, resourceMeta.digits);
      await page.selectFirstAlgorithm();

      await page.click(page.saveButton);

      const standaloneTotpViewModel = new StandaloneTotpViewModel(resourceMeta);
      expect(props.onSubmit).toHaveBeenCalledWith(standaloneTotpViewModel.toResourceDto(), standaloneTotpViewModel.toSecretDto());
      expect(props.onClose).toBeCalled();
      expect(props.onCancel).toBeCalled();
    });

    it("As LU I shouldn't be able to submit the form if there is an invalid field", async() => {
      expect.assertions(8);

      expect(page.exists()).toBeTruthy();
      // Click to open advanced settings
      await page.click(page.advancedSettings);
      // Fill the advanced settings form
      page.fillInput(page.name, "");
      page.fillInput(page.secretKey, "");
      page.fillInput(page.period, "");
      page.fillInput(page.digits, 9);
      await page.click(page.saveButton);

      // Throw error message
      expect(page.nameErrorMessage.textContent).toBe("The name is required.");
      expect(page.secretKeyErrorMessage.textContent).toBe("The key is required.");
      expect(page.digitsErrorMessage.textContent).toBe("TOTP length must be between 6 and 8.");
      expect(page.periodErrorMessage.textContent).toBe("TOTP expiry is required.");

      page.fillInput(page.secretKey, "????????");
      page.fillInput(page.period, 0);
      page.fillInput(page.digits, "");

      page.keyUpInput(page.secretKey);
      page.keyUpInput(page.period);
      page.keyUpInput(page.digits);

      expect(page.secretKeyErrorMessage.textContent).toBe("The key is not valid.");
      expect(page.digitsErrorMessage.textContent).toBe("TOTP length is required.");
      expect(page.periodErrorMessage.textContent).toBe("TOTP expiry must be greater than 0.");
    });

    it('As LU I can stop editing a standalone totp by clicking on the cancel button', async() => {
      expect.assertions(3);
      expect(page.exists()).toBeTruthy();
      await page.click(page.cancelButton);
      expect(props.onClose).toBeCalled();
      expect(props.onCancel).toBeCalled();
    });

    it('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      expect(page.exists()).toBeTruthy();
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      // Mock the request function to make it the expected result
      jest.spyOn(props, "onSubmit").mockImplementationOnce(requestMockImpl);
      page.clickWithoutWaitFor(page.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.name.getAttribute("disabled")).not.toBeNull();
        expect(page.uri.getAttribute("disabled")).not.toBeNull();
        expect(page.secretKey.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.className).toBe("button primary form disabled processing");
        expect(page.cancelButton.className).toBe("link cancel");
        updateResolve();
      });
    });

    it('As LU I can stop editing a standalone totp by closing the dialog', async() => {
      expect.assertions(3);
      expect(page.exists()).toBeTruthy();
      await page.click(page.dialogClose);
      expect(props.onClose).toBeCalled();
      expect(props.onCancel).toBeCalled();
    });

    it('As LU I can stop editing a standalone totp with the keyboard (escape)', async() => {
      expect.assertions(3);
      expect(page.exists()).toBeTruthy();
      await page.escapeKey(page.dialogClose);
      expect(props.onClose).toBeCalled();
      expect(props.onCancel).toBeCalled();
    });

    it('As LU I should access to the upload QR code dialog', async() => {
      expect.assertions(1);
      await page.click(page.uploadQrCodeButton);
      expect(props.onOpenUploadQrCode).toHaveBeenCalled();
    });

    it("As a user I should see a feedback when the key, name or uri fields content is truncated by a field limit", async() => {
      expect.assertions(3);

      page.fillInput(page.secretKey, 'a'.repeat(1025));
      page.fillInput(page.name, 'a'.repeat(256));
      page.fillInput(page.uri, 'a'.repeat(1025));

      page.keyUpInput(page.secretKey);
      page.keyUpInput(page.name);
      page.keyUpInput(page.uri);

      expect(page.secretKeyWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.nameWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.uriWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });
  });
});

