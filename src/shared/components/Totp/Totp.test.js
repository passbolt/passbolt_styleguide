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
 * @since         4.3.0
 */

import TotpTestPage from "./Totp.test.page";
import { defaultProps, secretKeyInvalidProps } from "./Totp.test.data";
import { TotpCodeGeneratorService } from "../../services/otp/TotpCodeGeneratorService";

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

describe("Totp", () => {
  describe("As a user I can see the TOTP code", () => {
    it("should display the TOTP code.", () => {
      const props = defaultProps();
      const page = new TotpTestPage(props);
      const code = TotpCodeGeneratorService.generate(props.totp);

      expect.assertions(1);
      expect(page.code).toEqual(code);
    });

    it("should refresh the TOTP code at the end of the TOTP period", () => {
      const props = defaultProps();
      const page = new TotpTestPage(props);

      expect.assertions(3);

      const code = TotpCodeGeneratorService.generate(props.totp);
      expect(page.code).toEqual(code);
      jest.advanceTimersByTime(31000);

      const code2 = TotpCodeGeneratorService.generate(props.totp);
      expect(code2).not.toEqual(code);
      expect(page.code).toEqual(code2);
    });
  });

  describe("As a user I can click on the TOTP code", () => {
    it("it should call onClick props when clicked", async () => {
      const props = defaultProps();
      const page = new TotpTestPage(props);

      expect.assertions(1);
      await page.click(page.button);
      expect(props.onClick).toHaveBeenCalled();
    });

    it("it should not call onClick props when clicked if props canClick is false", async () => {
      const props = defaultProps({ canClick: false });
      const page = new TotpTestPage(props);

      expect.assertions(1);
      await page.click(page.button);
      expect(props.onClick).not.toHaveBeenCalled();
    });

    it("It should display an TOTP code even if the secret key contain special characters and spaces", async () => {
      const props = secretKeyInvalidProps();
      const page = new TotpTestPage(props);
      expect.assertions(1);

      const code = TotpCodeGeneratorService.generate(props.totp);
      expect(page.code).toEqual(code);
    });
  });

  describe("As a user I should not see TOTP code if there is an error", () => {
    it("It should display an error message", async () => {
      const props = defaultProps();
      jest.spyOn(TotpCodeGeneratorService, "generate").mockImplementationOnce(() => {
        throw new Error("Error");
      });
      const page = new TotpTestPage(props);

      expect.assertions(1);
      await page.click(page.button);
      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith("Unable to preview the TOTP");
    });
  });
});
