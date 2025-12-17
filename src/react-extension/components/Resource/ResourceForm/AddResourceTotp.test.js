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
 * Unit tests on AddResourceTotp in regard of specifications
 */
import "../../../../../test/mocks/mockClipboard";
import { defaultProps, qrCode } from "./AddResourceTotp.test.data";
import AddResourceTotpPage from "./AddResourceTotp.test.page";
import { defaultSecretDataV5DefaultTotpEntityDto } from "../../../../shared/models/entity/secretData/secretDataV5DefaultTotpEntity.test.data";
import { defaultResourceFormDto } from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import { TotpCodeGeneratorService } from "../../../../shared/services/otp/TotpCodeGeneratorService";
import { defaultTotpDto } from "../../../../shared/models/entity/totp/totpDto.test.data";
import { Html5Qrcode } from "html5-qrcode";
import TotpEntity from "../../../../shared/models/entity/totp/totpEntity";

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourceTotp", () => {
  let page; // The page to test against

  describe("As LU I can see the totp form.", () => {
    it("As LU I can see the resource totp form.", () => {
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

  describe("Fill totp password", () => {
    it("Enter uri should call callback function.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceTotpPage(props);
      await page.fillInput(page.uri, "https://passbolt.com");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.uris.0");
      expect(value).toEqual("https://passbolt.com");
    });

    it("Enter totp key should call callback function.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceTotpPage(props);
      await page.fillInput(page.resourceTotpKey, "key");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("secret.totp.secret_key");
      expect(value).toEqual("key");
    });

    it("Enter totp expiry should call callback function.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
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

    it("Enter totp length should call callback function.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
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

    it("Enter totp algorithm should call callback function.", async () => {
      expect.assertions(3);

      let name, value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation((event) => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceTotpPage(props);

      await page.click(page.advancedSettings);
      await page.click(page.algorithm);
      await page.click(page.firstItemOption);

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("secret.totp.algorithm");
      expect(value).toEqual("SHA256");
    });
  });

  describe("As LU I cannot see the totp uri input form.", () => {
    it("As LU I cannot see the uri if the resource has a secret password.", () => {
      expect.assertions(3);

      const props = defaultProps({
        resource: defaultResourceFormDto({ secret: defaultSecretDataV5DefaultTotpEntityDto() }),
      });
      page = new AddResourceTotpPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("TOTP");
      expect(page.uri).toBeNull();
    });
  });

  describe("As LU I can copy a valid totp", () => {
    it("As LU I can copy the totp from the code.", async () => {
      expect.assertions(3);

      const props = defaultProps(defaultResourceFormDto({ resource: { secret: { totp: defaultTotpDto() } } }));
      page = new AddResourceTotpPage(props);

      expect(page.exists).toBeTruthy();
      await page.click(page.resourceTotpCode);
      const code = TotpCodeGeneratorService.generate(props.resource.secret.totp);

      expect(props.clipboardContext.copyTemporarily).toHaveBeenCalledTimes(1);
      expect(props.clipboardContext.copyTemporarily).toHaveBeenCalledWith(
        code,
        "The TOTP has been copied to clipboard.",
      );
    });

    it("As LU I can copy the totp from the button.", async () => {
      expect.assertions(3);

      const props = defaultProps(defaultResourceFormDto({ resource: { secret: { totp: defaultTotpDto() } } }));
      page = new AddResourceTotpPage(props);

      expect(page.exists).toBeTruthy();
      await page.click(page.copyTotpButton);
      const code = TotpCodeGeneratorService.generate(props.resource.secret.totp);

      expect(props.clipboardContext.copyTemporarily).toHaveBeenCalledTimes(1);
      expect(props.clipboardContext.copyTemporarily).toHaveBeenCalledWith(
        code,
        "The TOTP has been copied to clipboard.",
      );
    });

    it("As LU I cannot copy an invalid totp", async () => {
      expect.assertions(3);

      const props = defaultProps();
      page = new AddResourceTotpPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.resourceTotpCode.hasAttribute("disabled")).toBeTruthy();
      expect(page.copyTotpButton.hasAttribute("disabled")).toBeTruthy();
    });
  });

  describe("As LU I can import a qr code", () => {
    it("As LU I can import a valid totp from a file.", async () => {
      expect.assertions(2);
      const qrCodeResult = qrCode();
      jest.spyOn(Html5Qrcode.prototype, "scanFileV2").mockImplementation(() => qrCodeResult);

      const props = defaultProps();
      page = new AddResourceTotpPage(props);

      expect(page.exists).toBeTruthy();
      const file = new File(["mock"], "qrCode.png", { type: "image/png" });
      // select file in the form
      await page.selectImportFile(file);
      const url = new URL(decodeURIComponent(qrCodeResult.decodedText));
      // expected Totp
      const totp = {
        secret_key: url.searchParams.get("secret"),
        algorithm: "SHA1",
        digits: 6,
        period: 30,
      };
      // Expected event
      const event = {
        target: {
          name: "secret.totp",
          value: new TotpEntity(totp),
        },
      };

      expect(props.onChange).toHaveBeenCalledWith(event);
    });

    it("As LU I should see a warning message if there is no QR code in the file", async () => {
      expect.assertions(2);
      const error = { name: "NotFoundException", message: "No QR code found." };
      jest.spyOn(Html5Qrcode.prototype, "scanFileV2").mockImplementation(() => {
        throw error;
      });

      const props = defaultProps();
      page = new AddResourceTotpPage(props);

      expect(page.exists).toBeTruthy();
      const file = new File(["mock"], "qrCode.png", { type: "image/png" });
      // check fields in the form
      await page.selectImportFile(file);

      // Throw error message
      expect(page.warningImportMessage.textContent).toBe(error.message);
    });

    it("As LU I should see a warning message if there is an error in PNG file", async () => {
      expect.assertions(2);
      const error = { name: "Error", message: "Error" };
      jest.spyOn(Html5Qrcode.prototype, "scanFileV2").mockImplementation(() => {
        throw error;
      });

      const props = defaultProps();
      page = new AddResourceTotpPage(props);

      expect(page.exists).toBeTruthy();
      const file = new File(["mock"], "qrCode.png", { type: "image/png" });
      // check fields in the form
      await page.selectImportFile(file);

      // Throw error message
      expect(page.warningImportMessage.textContent).toBe("The QR code is incomplete.");
    });
  });

  describe("As LU I should see the totp disabled.", () => {
    it("As LU I can see the totp form disabled.", async () => {
      expect.assertions(5);

      const props = defaultProps({ disabled: true });
      page = new AddResourceTotpPage(props);
      await page.click(page.advancedSettings);

      expect(page.resourceTotpKey.hasAttribute("disabled")).toBeTruthy();
      expect(page.uri.hasAttribute("disabled")).toBeTruthy();
      expect(page.period.hasAttribute("disabled")).toBeTruthy();
      expect(page.digits.hasAttribute("disabled")).toBeTruthy();
      expect(page.algorithm.className).toBe("selected-value disabled");
    });
  });
});
