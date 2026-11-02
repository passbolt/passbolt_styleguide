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
 * @since         4.1.0
 */

import "../../../../test/mocks/mockClipboard";
import ResourceViewPagePage from "./ResourceViewPage.test.page";
import {
  defaultProps,
  deniedRbacProps,
  disabledApiFlagsProps,
  multipleUrisResourceProps,
  standaloneTotpResourceProps,
  totpResourceProps,
  standalonePinCodeResourceProps,
} from "./ResourceViewPage.test.data";
import { TotpCodeGeneratorService } from "../../../shared/services/otp/TotpCodeGeneratorService";
import { denyRbacContext } from "../../../shared/context/Rbac/RbacContext.test.data";
import { defaultTotpViewModelDto } from "../../../shared/models/entity/totp/totpDto.test.data";
import { act } from "react";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("ResourceViewPage", () => {
  const mockContextRequest = (context, implementation) =>
    jest.spyOn(context.port, "request").mockImplementationOnce(implementation);

  describe("As LU, I should preview the secret.", () => {
    it("As LU, I should preview the secret password of a resource ", async () => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      const page = new ResourceViewPagePage(props);

      expect(page.previewPasswordButton.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.previewPasswordButton);
      expect(page.passwordText).toStrictEqual("secret-decrypted");
    });

    it("As LU, I should see username, URI of a resource", async () => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.username.textContent).toStrictEqual("admin@passbolt.com");
      expect(page.uri.textContent).toStrictEqual("https://passbolt.com");
    });

    it("As LU, I shouldn't be able to preview secret password of a resource if disabled by API flag", async () => {
      expect.assertions(1);
      const props = disabledApiFlagsProps();
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      const page = new ResourceViewPagePage(props);

      expect(page.previewPasswordButton).toBeNull();
    });

    it("As LU, I shouldn't be able to preview secret password of a resource if denied by RBAC.", async () => {
      expect.assertions(1);
      const props = deniedRbacProps(); // The props to pass
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      const page = new ResourceViewPagePage(props);

      expect(page.previewPasswordButton).toBeNull();
    });

    it("As LU, I should preview the secret totp of a resource ", async () => {
      expect.assertions(2);
      const props = totpResourceProps(); // The props to pass
      const totp = defaultTotpViewModelDto();
      mockContextRequest(props.context, () => ({
        password: "secret-decrypted",
        description: "description",
        totp: totp,
      }));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewTotpButton.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.previewTotpButton);
      const code = TotpCodeGeneratorService.generate(totp);
      expect(page.totpText.replace(/\s/, "")).toStrictEqual(code);
    });

    it("As LU, I should not see username and password of a resource from a standalone totp", async () => {
      expect.assertions(3);
      const props = standaloneTotpResourceProps(); // The props to pass
      const totp = defaultTotpViewModelDto();
      mockContextRequest(props.context, () => ({ totp: totp }));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.username).toBeNull();
      expect(page.password).toBeNull();
      expect(page.totp).not.toBeNull();
    });

    it("As LU, I shouldn't be able to preview secret totp of a resource if disabled by API flag", async () => {
      expect.assertions(1);
      const props = disabledApiFlagsProps();
      mockContextRequest(props.context, () => ({
        password: "secret-decrypted",
        description: "description",
        totp: defaultTotpViewModelDto(),
      }));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewTotpButton).toBeNull();
    });

    it("As LU, I shouldn't be able to preview secret totp of a resource if denied by RBAC.", async () => {
      expect.assertions(1);
      const props = deniedRbacProps(); // The props to pass
      mockContextRequest(props.context, () => ({
        password: "secret-decrypted",
        description: "description",
        totp: defaultTotpViewModelDto(),
      }));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewTotpButton).toBeNull();
    });
  });

  describe("As LU, I should copy the secret.", () => {
    it("As LU, I should be able to copy the secret password of resource by clicking on the password", async () => {
      expect.assertions(4);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.passwordText).toStrictEqual("Copy to clipboard");
      expect(page.password.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.password);

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.context.storage.local.get(["resources"]).resources[0].id,
      );
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.clipboard.copy-temporarily",
        "secret-decrypted",
      );
    });

    it("As LU, I should be able to copy the secret password of resource by clicking on the copy icon", async () => {
      expect.assertions(2);
      const props = defaultProps(); // The props to pass
      mockContextRequest(props.context, () => ({ password: "secret-decrypted", description: "description" }));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.copyPasswordButton);

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.context.storage.local.get(["resources"]).resources[0].id,
      );
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.clipboard.copy-temporarily",
        "secret-decrypted",
      );
    });

    it("As LU, I should not be able to copy the secret password of resource  if denied by RBAC.", async () => {
      expect.assertions(3);
      const props = deniedRbacProps(); // The props to pass
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.passwordText).toStrictEqual("Copy to clipboard");
      expect(page.password.hasAttribute("disabled")).toBeTruthy();
      expect(page.copyPasswordButton).toBeNull();
    });

    it("As LU, I should be able to copy the secret totp of resource by clicking on the password", async () => {
      expect.assertions(4);
      const props = totpResourceProps(); // The props to pass
      const totp = defaultTotpViewModelDto();
      mockContextRequest(props.context, () => ({
        password: "secret-decrypted",
        description: "description",
        totp: totp,
      }));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.totpText).toStrictEqual("Copy TOTP to clipboard");
      expect(page.totp.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.totp);
      const code = TotpCodeGeneratorService.generate(totp);

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.context.storage.local.get(["resources"]).resources[0].id,
      );
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", code);
    });

    it("As LU, I should be able to copy the secret totp of resource by clicking on the copy icon", async () => {
      expect.assertions(2);
      const props = totpResourceProps(); // The props to pass
      const totp = defaultTotpViewModelDto();
      mockContextRequest(props.context, () => ({
        password: "secret-decrypted",
        description: "description",
        totp: totp,
      }));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.copyTotpButton);
      const code = TotpCodeGeneratorService.generate(totp);

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.context.storage.local.get(["resources"]).resources[0].id,
      );
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", code);
    });

    it("As LU, I should not be able to copy the secret totp of resource  if denied by RBAC.", async () => {
      expect.assertions(3);
      const props = totpResourceProps({ rbacContext: denyRbacContext() }); // The props to pass
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.totpText).toStrictEqual("Copy TOTP to clipboard");
      expect(page.totp.hasAttribute("disabled")).toBeTruthy();
      expect(page.copyTotpButton).toBeNull();
    });
  });

  describe("As LU, I should see additional uris.", () => {
    it("As LU, I should be able to see additional uris", async () => {
      expect.assertions(1);
      const props = multipleUrisResourceProps(); // The props to pass
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.additionalUrisSection);

      expect(page.listUris.length).toStrictEqual(4);
    });
  });
  describe("As LU, I should see and copy a PIN code resource.", () => {
    const pinCodeSecret = () => ({ object_type: "PASSBOLT_SECRET_DATA", pin_code: "482913" });

    it("As LU, I should see the pin code masked, and no username, password, totp, uri or use on this page", async () => {
      expect.assertions(6);
      const props = standalonePinCodeResourceProps();
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.pinCodeText).toStrictEqual("Copy to clipboard");
      expect(page.propertyNames).toStrictEqual(["Pin code"]);
      expect(page.username).toBeNull();
      expect(page.password).toBeNull();
      expect(page.totp).toBeNull();
      expect(page.useOnThisPageButton).toBeNull();
    });

    it("As LU, I should still see the link to view the pin code in passbolt", async () => {
      expect.assertions(1);
      const props = standalonePinCodeResourceProps();
      const resourceId = props.context.storage.local.get(["resources"]).resources[0].id;
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.viewInPassboltLink.getAttribute("href")).toStrictEqual(
        `${props.context.userSettings.getTrustedDomain()}/app/passwords/view/${resourceId}`,
      );
    });

    it("As LU, I should be able to copy the pin code by clicking on the copy icon", async () => {
      expect.assertions(2);
      const props = standalonePinCodeResourceProps();
      mockContextRequest(props.context, pinCodeSecret);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.copyPinCodeButton);

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.context.storage.local.get(["resources"]).resources[0].id,
      );
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", "482913");
    });

    it("As LU, I should be able to copy the pin code by clicking on the masked value", async () => {
      expect.assertions(1);
      const props = standalonePinCodeResourceProps();
      mockContextRequest(props.context, pinCodeSecret);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.pinCode);

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", "482913");
    });

    it("As LU, I should preview and hide the pin code", async () => {
      expect.assertions(3);
      const props = standalonePinCodeResourceProps();
      mockContextRequest(props.context, pinCodeSecret);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewPinCodeButton.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.previewPinCodeButton);
      expect(page.pinCodeText).toStrictEqual("482913");

      await page.click(page.previewPinCodeButton);
      expect(page.pinCodeText).toStrictEqual("Copy to clipboard");
    });

    it("As LU, I shouldn't be able to preview the pin code if disabled by API flag", async () => {
      expect.assertions(2);
      const props = standalonePinCodeResourceProps();
      props.context.siteSettings.canIUse = () => false;
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewPinCodeButton).toBeNull();
      expect(page.copyPinCodeButton).not.toBeNull();
    });

    it("As LU, I shouldn't be able to preview the pin code if denied by RBAC", async () => {
      expect.assertions(1);
      const props = standalonePinCodeResourceProps({ rbacContext: denyRbacContext() });
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewPinCodeButton).toBeNull();
    });

    it("As LU, I should not be able to copy the pin code if denied by RBAC", async () => {
      expect.assertions(3);
      const props = standalonePinCodeResourceProps({ rbacContext: denyRbacContext() });
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.pinCodeText).toStrictEqual("Copy to clipboard");
      expect(page.pinCode.hasAttribute("disabled")).toBeTruthy();
      expect(page.copyPinCodeButton).toBeNull();
    });

    it("As LU, nothing is copied and the pin code stays hidden if I cancel the passphrase", async () => {
      expect.assertions(2);
      const props = standalonePinCodeResourceProps();
      const abortError = new Error("The user aborted the operation");
      abortError.name = "UserAbortsOperationError";
      mockContextRequest(props.context, () => Promise.reject(abortError));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.copyPinCodeButton);

      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.clipboard.copy-temporarily",
        expect.anything(),
      );
      expect(page.pinCodeText).toStrictEqual("Copy to clipboard");
    });
  });
});
