/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.4.0
 */

import {TotpCodeGeneratorService} from "../../../../../shared/services/otp/TotpCodeGeneratorService";
import {defaultProps} from "./ScanTotpCode.test.data";
import ScanTotpCodePage from "./ScanTotpCode.test.page";
import QRCode from 'qrcode';

/**
 * Unit tests on ScanTotpCode in regard of specifications
 */

describe("ScanTotpCode", () => {
  describe("As a logged user I should be able to scan a qrcode to setup the totp provider", () => {
    let page,
      props;

    beforeEach(() => {
      props = defaultProps();
      page = new ScanTotpCodePage(props);
    });
    it('I should have access to the scan totp screen', () => {
      expect.assertions(5);

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toEqual("Time based One Time Password (TOTP)");
      expect(page.subtitle.textContent).toEqual("Scan this bar code");
      expect(page.qrcode).not.toBeNull();
      expect(page.inputLabelOtp.textContent).toEqual("One Time Password (OTP)");
    });

    it('I should be able to generate a qr code', async() => {
      expect.assertions(2);

      jest.spyOn(TotpCodeGeneratorService, "generateUri");
      jest.spyOn(QRCode, "toDataURL");

      page = new ScanTotpCodePage(props);

      expect(TotpCodeGeneratorService.generateUri).toHaveBeenCalledWith(expect.objectContaining({"issuer": "localhost", "label": "ada@passbolt.com"}));
      expect(QRCode.toDataURL).toHaveBeenCalledWith(expect.arrayContaining(
        [expect.objectContaining({
          data: expect.stringContaining("otpauth://totp/localhost:ada%40passbolt.com?issuer=localhost&"),
          "mode": "byte"
        }
        )],
      ), {"color": {}, "quality": 1, "type": "image/jpeg"}
      );
    });


    it('I should be able to cancel the setup', async() => {
      expect.assertions(1);

      await page.clickOnCancelButton();

      expect(props.mfaContext.goToProviderList).toHaveBeenCalled();
    });

    it('I should see an error message if the otp input is empty', async() => {
      expect.assertions(1);

      await page.clickOnValidateButton();

      expect(page.errorMessage.textContent).toEqual("A OTP code is required.");
    });

    it('I should see an error message if the otp input is invalid', async() => {
      expect.assertions(1);

      jest.spyOn(props.mfaContext, "validateTotpCode").mockImplementation(() => Promise.reject());

      await page.fillOtpInput('123456');
      await page.clickOnValidateButton();

      expect(page.errorMessage.textContent).toEqual("This OTP is not valid.");
    });


    it('I should be able to valide the otp code and navigate to the configuration screen', async() => {
      expect.assertions(4);
      const code = '123456';
      jest.spyOn(props.mfaContext, "validateTotpCode").mockImplementation(() => Promise.resolve());

      await page.fillOtpInput(code);
      await page.clickOnValidateButton();

      expect(page.errorMessage).toBeNull();
      expect(props.mfaContext.validateTotpCode).toHaveBeenCalled();
      expect(props.mfaContext.navigate).toHaveBeenCalled();
      expect(props.mfaContext.findMfaSettings).toHaveBeenCalled();
    });

    it('I should see an help box in the scan totp screen ', async() => {
      expect.assertions(5);

      expect(page.helpBox).not.toBeNull();
      expect(page.helpBoxTitle.textContent).toBe("Requirements");
      expect(page.helpBoxDescription.textContent).toBe("To proceed you need to install an application that supports Time Based One Time Passwords (TOTP) on your phone or tablet such as:Google Authenticator or FreeOTP.");
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute('href')).toEqual('https://help.passbolt.com/start');
    });
  });
});
