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
 * Unit tests on CreateStandaloneTotp in regard of specifications
 */
import "../../../test/lib/crypto/cryptoGetRandomvalues";
import {waitFor} from "@testing-library/react";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import {TEST_RESOURCE_TYPE_TOTP} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import {defaultProps} from "./CreateStandaloneTotp.test.data";
import CreateStandaloneTotpPage from "./CreateStandaloneTotp.test.page";
import PassboltApiFetchError from "../../../../shared/error/passboltApiFetchError";
import UploadQrCode from "../UploadQrCode/UploadQrCode";

describe("See the Create Standalone TOTP", () => {
  let page, props;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    props = defaultProps(); // The props to pass

    page = new CreateStandaloneTotpPage(props);
  });

  const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementationOnce(implementation);
  const truncatedWarningMessage = "Warning: this is the maximum size for this field, make sure your data was not truncated.";
  describe('As LU I can start adding a standalone totp', () => {
    it('matches the styleguide', async() => {
      expect.assertions(12);
      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.header.textContent).toBe("Create standalone TOTP");

      // Close button exists
      expect(page.dialogClose).not.toBeNull();

      // Name input field exists.
      expect(page.name.value).toBe("");
      // Uri input field exists.
      expect(page.uri.value).toBe("");
      // Username input field exists.
      expect(page.key.value).toBe("");

      // Upload QR code button exists.
      expect(page.uploadQrCodeButton).not.toBeNull();

      // Click to open advanced settings
      await page.click(page.advancedSettings);

      // Period input field exists
      expect(page.period.value).toBe("30");

      // Digits input field exists
      expect(page.digits.value).toBe("6");

      // Algorithm input field exists
      expect(page.algorithm.textContent).toBe("SHA1");

      // Save button exists
      expect(page.saveButton.textContent).toBe("Create");

      // Cancel button exists
      expect(page.cancelButton.textContent).toBe("Cancel");
    });

    it('Requests the addon to create a standalone totp when clicking on the submit button.', async() => {
      expect.assertions(6);
      expect(page.exists()).toBeTruthy();
      const createdStandaloneTotpId = "f2b4047d-ab6d-4430-a1e2-3ab04a2f4fb9";
      // create standalone totp
      const resourceMeta = {
        name: "TOTP name",
        uri: "https://uri.dev",
        key: "JBSWY3DPEHPK3PXP",
        period: 30,
        digits: 6,
        algorithm: "SHA1",
      };
      // Fill the form
      page.fillInput(page.name, resourceMeta.name);
      page.fillInput(page.uri, resourceMeta.uri);
      page.fillInput(page.key, `   ${resourceMeta.key}   `);

      const requestMockImpl = jest.fn((message, data) => Object.assign({id: createdStandaloneTotpId}, data));
      mockContextRequest(requestMockImpl);
      jest.spyOn(props.context.port, 'emit').mockImplementation(jest.fn());

      const resourceDto = {
        folder_parent_id: null,
        name: resourceMeta.name,
        uri: resourceMeta.uri,
        resource_type_id: TEST_RESOURCE_TYPE_TOTP
      };

      const secretDto = {
        totp: {
          secret_key: resourceMeta.key,
          period: resourceMeta.period,
          digits: resourceMeta.digits,
          algorithm: resourceMeta.algorithm
        }
      };

      await page.click(page.saveButton);
      await waitFor(() => {});
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.create", resourceDto, secretDto);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
      expect(props.history.push).toHaveBeenCalled();
      expect(props.history.push).toHaveBeenNthCalledWith(1, `/app/passwords/view/${createdStandaloneTotpId}`);
      expect(props.onClose).toBeCalled();
    });

    it('Requests the addon to create a standalone totp with advanced settings when clicking on the submit button.', async() => {
      expect.assertions(5);
      expect(page.exists()).toBeTruthy();
      const createdStandaloneTotpId = "f2b4047d-ab6d-4430-a1e2-3ab04a2f4fb9";
      // create standalone totp
      const resourceMeta = {
        name: "TOTP name",
        uri: "https://uri.dev",
        key: "JBSWY3DPEHPK3PXP",
        period: 60,
        digits: 7,
        algorithm: "SHA256",
      };
      // Fill the form
      page.fillInput(page.name, resourceMeta.name);
      page.fillInput(page.uri, resourceMeta.uri);
      page.fillInput(page.key, resourceMeta.key);

      // Click to open advanced settings
      await page.click(page.advancedSettings);
      // Fill the advanced settings form
      page.fillInput(page.period, resourceMeta.period);
      page.fillInput(page.digits, resourceMeta.digits);
      await page.selectFirstAlgorithm();

      const requestMockImpl = jest.fn((message, data) => Object.assign({id: createdStandaloneTotpId}, data));
      mockContextRequest(requestMockImpl);
      jest.spyOn(props.context.port, 'emit').mockImplementation(jest.fn());

      const resourceDto = {
        folder_parent_id: null,
        name: resourceMeta.name,
        uri: resourceMeta.uri,
        resource_type_id: TEST_RESOURCE_TYPE_TOTP
      };

      const secretDto = {
        totp: {
          secret_key: resourceMeta.key,
          period: resourceMeta.period,
          digits: resourceMeta.digits,
          algorithm: resourceMeta.algorithm
        }
      };

      await page.click(page.saveButton);

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.resources.create", resourceDto, secretDto);
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
      expect(props.history.push).toHaveBeenNthCalledWith(1, `/app/passwords/view/${createdStandaloneTotpId}`);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I shouldn’t be able to submit the form if there is an invalid field', async() => {
      expect.assertions(5);
      expect(page.exists()).toBeTruthy();
      // Click to open advanced settings
      await page.click(page.advancedSettings);
      // Fill the advanced settings form
      page.fillInput(page.period, "");
      page.fillInput(page.digits, "");
      await page.click(page.saveButton);

      // Throw error message
      expect(page.nameErrorMessage.textContent).toBe("A name is required.");
      expect(page.keyErrorMessage.textContent).toBe("A key is required.");
      expect(page.digitsErrorMessage.textContent).toBe("The TOTP length should be between 6 and 8.");
      expect(page.periodErrorMessage.textContent).toBe("A TOTP expiry is required.");
    });

    it('As LU I can stop creating a standalone totp by clicking on the cancel button', async() => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.click(page.cancelButton);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));

      page.fillInput(page.name, "name");
      await page.fillInput(page.key, "JBSWY3DPEHPK3PXP");

      // Mock the request function to make it the expected result
      mockContextRequest(requestMockImpl);
      page.clickWithoutWaitFor(page.saveButton);
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.name.getAttribute("disabled")).not.toBeNull();
        expect(page.uri.getAttribute("disabled")).not.toBeNull();
        expect(page.key.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.className).toBe("button primary disabled processing");
        expect(page.cancelButton.className).toBe("link cancel");
        updateResolve();
      });
    });

    it('As LU I can stop creating a standalone totp by closing the dialog', async() => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.click(page.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop adding a standalone totp with the keyboard (escape)', async() => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      await page.escapeKey(page.dialogClose);
      expect(props.onClose).toBeCalled();
    });

    it.only('As LU I should see an error dialog if the submit operation fails for an unexpected reason', async() => {
      expect.assertions(1);
      // Mock the request function to make it return an error.
      page.fillInput(page.name, "name");
      await page.fillInput(page.key, "JBSWY3DPEHPK3PXP");

      const error = new PassboltApiFetchError("Jest simulate API error.");
      jest.spyOn(props.context.port, 'request').mockImplementationOnce(() => {
        throw error;
      });

      await page.click(page.saveButton);

      // Throw general error message
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {error: error});
    });

    it('As LU I should access to the upload QR code dialog', async() => {
      expect.assertions(1);
      await page.click(page.uploadQrCodeButton);
      expect(props.dialogContext.open).toHaveBeenCalledWith(UploadQrCode, expect.anything());
    });

    it("As a user I should see a feedback when the key, name or uri fields content is truncated by a field limit", async() => {
      expect.assertions(3);
      page.fillInput(page.key, 'a'.repeat(1025));
      page.fillInput(page.name, 'a'.repeat(256));
      page.fillInput(page.uri, 'a'.repeat(1025));

      await page.keyUpInput(page.key);
      await page.keyUpInput(page.name);
      await page.keyUpInput(page.uri);

      expect(page.keyWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.nameWarningMessage.textContent).toEqual(truncatedWarningMessage);
      expect(page.uriWarningMessage.textContent).toEqual(truncatedWarningMessage);
    });
  });
});

