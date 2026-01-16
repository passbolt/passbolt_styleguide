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

import { defaultProps } from "./YubikeySetup.test.data";
import YubikeySetupPage from "./YubikeySetup.test.page";

/**
 * Unit tests on YubikeySetup in regard of specifications
 */

describe("YubikeySetup", () => {
  describe("As a logged user I should be able to scan a enter the yubikey code to setup the yubikey provider", () => {
    let page, props;

    beforeEach(() => {
      props = defaultProps();
      page = new YubikeySetupPage(props);
    });
    it("I should have access to the yubikey setup screen", () => {
      expect.assertions(4);

      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toEqual("Yubikey One Time Password");
      expect(page.helpText.textContent).toEqual("Plug in the yubikey and put your finger on it.");
      expect(page.inputLabelOtp.textContent).toEqual("Yubikey OTP");
    });

    it("I should be able to cancel the setup", async () => {
      expect.assertions(1);

      await page.clickOnCancelButton();

      expect(props.mfaContext.goToProviderList).toHaveBeenCalled();
    });

    it("I should see an error message if the otp input is empty", async () => {
      expect.assertions(1);

      await page.clickOnValidateButton();

      expect(page.errorMessage.textContent).toEqual("A OTP code is required.");
    });

    it("I should see an error message if the otp input is invalid", async () => {
      expect.assertions(1);

      jest.spyOn(props.mfaContext, "validateYubikeyCode").mockImplementation(() => Promise.reject());

      await page.fillOtpInput("notavalidcode");
      await page.clickOnValidateButton();

      expect(page.errorMessage.textContent).toEqual("This OTP is not valid.");
    });

    it("I should be able to valide the otp code and navigate to the configuration screen", async () => {
      expect.assertions(4);
      const code = "yubikey-code";
      jest.spyOn(props.mfaContext, "validateYubikeyCode").mockImplementation(() => Promise.resolve());

      await page.fillOtpInput(code);
      await page.clickOnValidateButton();

      expect(page.errorMessage).toBeNull();
      expect(props.mfaContext.validateYubikeyCode).toHaveBeenCalled();
      expect(props.mfaContext.navigate).toHaveBeenCalled();
      expect(props.mfaContext.findMfaSettings).toHaveBeenCalled();
    });
  });
});
