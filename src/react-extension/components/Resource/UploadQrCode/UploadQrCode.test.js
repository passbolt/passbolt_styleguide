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
 * Unit tests on UploadQrCode in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import {defaultProps, qrCode} from "./UploadQrCode.test.data";
import UploadQrCodePage from "./UploadQrCode.test.page";
import {Html5Qrcode} from "html5-qrcode";
import StandaloneTotpViewModel from "../../../../shared/models/standaloneTotp/StandaloneTotpViewModel";

beforeEach(() => {
  jest.resetModules();
});

describe("UploadQrCode", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe('As LU I can start import a file', () => {
    /**
     * I should see the upload QR code dialog
     */
    beforeEach(() => {
      jest.clearAllMocks();
      page = new UploadQrCodePage(props);
    });

    it('As LU I can save a totp a file with success', async() => {
      expect.assertions(4);
      const qrCodeResult = qrCode();
      jest.spyOn(Html5Qrcode.prototype, "scanFileV2").mockImplementation(() => qrCodeResult);

      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe(props.title);

      const file = new File(["mock"], 'qrCode.png', {type: 'image/png'});
      // select file in the form
      await page.selectImportFile(file);

      await page.save();
      const url = new URL(decodeURIComponent(qrCodeResult.decodedText));

      const standaloneTotp = {
        name: url.pathname.substring(7).split(":").join(": "),
        uri: url.searchParams.get('issuer'),
        secret_key: url.searchParams.get('secret'),
        algorithm: "SHA1",
        digits: 6,
        period: 30
      };

      expect(props.onSubmit).toHaveBeenCalledWith(new StandaloneTotpViewModel(standaloneTotp));
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can not save a totp if no file is imported', async() => {
      expect.assertions(3);
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe(props.title);

      await page.save();

      expect(page.errorMessage).toStrictEqual("A file is required.");
    });

    it('As LU I cannot update the form fields and I should see a processing feedback while submitting the form', async() => {
      const file = new File(["mock"], 'qrCode.png', {type: 'image/png'});
      // check fields in the form
      await page.selectImportFile(file);
      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      jest.spyOn(Html5Qrcode.prototype, "scanFileV2").mockImplementation(requestMockImpl);

      page.saveWithoutWaiting();

      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.importFile.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.getAttribute("disabled")).not.toBeNull();
        expect(page.saveButton.className).toBe("button primary disabled processing");
        expect(page.saveButton.hasAttribute('disabled')).toBeTruthy();
        expect(page.cancelButton.className).toBe("link cancel");
        expect(page.cancelButton.hasAttribute('disabled')).toBeTruthy();
        updateResolve();
      });
    });

    it('As LU I shouldn’t be able to submit the form if there is no QR code in the file', async() => {
      expect.assertions(1);
      const file = new File(["mock"], 'qrCode.png', {type: 'image/png'});
      // check fields in the form
      await page.selectImportFile(file);
      const error = {name: "NotFoundException", message: "No QR code found."};
      jest.spyOn(Html5Qrcode.prototype, "scanFileV2").mockImplementation(() => { throw error; });

      await page.save();
      await waitFor(() => {});

      // Throw error message
      expect(page.errorMessage).toBe(error.message);
    });

    it('As LU I shouldn’t be able to submit the form if there is an error in PNG file', async() => {
      expect.assertions(1);
      const file = new File(["mock"], 'qrCode.png', {type: 'image/png'});
      // check fields in the form
      await page.selectImportFile(file);
      const error = {name: "Error", message: "Error"};
      jest.spyOn(Html5Qrcode.prototype, "scanFileV2").mockImplementation(() => { throw error; });

      await page.save();
      await waitFor(() => {});

      // Throw error message
      expect(page.errorMessage).toBe("The QR code is incomplete.");
    });

    it('As LU I can stop importing QR code by clicking on the cancel button', async() => {
      expect.assertions(1);
      await page.cancel();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop importing QR code by closing the dialog', async() => {
      expect.assertions(1);
      await page.closeDialog();
      expect(props.onClose).toBeCalled();
    });

    it('As LU I can stop importing QR code with the keyboard (escape)', async() => {
      expect.assertions(1);
      await page.escapeKey();
      expect(props.onClose).toBeCalled();
    });
  });
});
