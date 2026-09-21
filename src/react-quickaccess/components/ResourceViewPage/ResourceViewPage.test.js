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
  standaloneNoteResourceProps,
  standaloneCustomFieldsResourceProps,
  standaloneEmptyCustomFieldsResourceProps,
  standaloneCustomFieldsSecretDto,
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

  describe("As LU, I should see and copy a note resource.", () => {
    const noteSecret = () => ({
      object_type: "PASSBOLT_SECRET_DATA",
      description: "Wifi: office-5G\nThe password is at the reception.",
    });
    const emptyNoteSecret = () => ({ object_type: "PASSBOLT_SECRET_DATA", description: "" });

    it("As LU, I should see the note hidden and the URI, and no username, password, totp or use on this page", async () => {
      expect.assertions(7);
      const props = standaloneNoteResourceProps();
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.propertyNames).toStrictEqual(["Notes", "URI"]);
      expect(page.encryptedNote).not.toBeNull();
      expect(page.uri.textContent).toStrictEqual("https://passbolt.com");
      expect(page.username).toBeNull();
      expect(page.password).toBeNull();
      expect(page.totp).toBeNull();
      expect(page.useOnThisPageButton).toBeNull();
    });

    it("As LU, I should be able to copy the note by clicking on the copy icon", async () => {
      expect.assertions(2);
      const props = standaloneNoteResourceProps();
      mockContextRequest(props.context, noteSecret);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.copyNoteButton);

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.context.storage.local.get(["resources"]).resources[0].id,
      );
      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.clipboard.copy-temporarily",
        noteSecret().description,
      );
    });

    it("As LU, I should be able to copy the note by clicking on the masked value", async () => {
      expect.assertions(1);
      const props = standaloneNoteResourceProps();
      mockContextRequest(props.context, noteSecret);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.note);

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.clipboard.copy-temporarily",
        noteSecret().description,
      );
    });

    it("As LU, I should preview and hide the note", async () => {
      expect.assertions(4);
      const props = standaloneNoteResourceProps();
      mockContextRequest(props.context, noteSecret);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewNoteButton.hasAttribute("disabled")).toBeFalsy();

      await page.click(page.previewNoteButton);
      expect(page.notePreviewed.textContent).toStrictEqual(noteSecret().description);

      await page.click(page.previewNoteButton);
      expect(page.notePreviewed).toBeNull();
      expect(page.encryptedNote).not.toBeNull();
    });

    it("As LU, I shouldn't be able to preview the note if disabled by API flag", async () => {
      expect.assertions(2);
      const props = standaloneNoteResourceProps();
      props.context.siteSettings.canIUse = () => false;
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewNoteButton).toBeNull();
      expect(page.copyNoteButton).not.toBeNull();
    });

    it("As LU, I shouldn't be able to preview the note if denied by RBAC", async () => {
      expect.assertions(1);
      const props = standaloneNoteResourceProps({ rbacContext: denyRbacContext() });
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewNoteButton).toBeNull();
    });

    it("As LU, I should not be able to copy the note if denied by RBAC", async () => {
      expect.assertions(3);
      const props = standaloneNoteResourceProps({ rbacContext: denyRbacContext() });
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.encryptedNote).not.toBeNull();
      expect(page.note.hasAttribute("disabled")).toBeTruthy();
      expect(page.copyNoteButton).toBeNull();
    });

    it("As LU, nothing is copied and the note stays hidden if I cancel the passphrase", async () => {
      expect.assertions(3);
      const props = standaloneNoteResourceProps();
      const abortError = new Error("The user aborted the operation");
      abortError.name = "UserAbortsOperationError";
      mockContextRequest(props.context, () => Promise.reject(abortError));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.copyNoteButton);
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.clipboard.copy-temporarily",
        expect.anything(),
      );
      expect(page.encryptedNote).not.toBeNull();

      mockContextRequest(props.context, () => Promise.reject(abortError));
      await page.click(page.previewNoteButton);
      expect(page.notePreviewed).toBeNull();
    });

    it("As LU, I should be told when the note is empty", async () => {
      expect.assertions(4);
      const props = standaloneNoteResourceProps();
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      mockContextRequest(props.context, emptyNoteSecret);
      await page.click(page.copyNoteButton);
      expect(page.errorMessage.textContent).toStrictEqual("The note is empty and cannot be copied to clipboard.");
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.clipboard.copy-temporarily",
        expect.anything(),
      );

      mockContextRequest(props.context, emptyNoteSecret);
      await page.click(page.previewNoteButton);
      expect(page.errorMessage.textContent).toStrictEqual("The note is empty and cannot be previewed.");
      expect(page.notePreviewed).toBeNull();
    });
  });

  describe("As LU, I should see and copy a custom fields resource.", () => {
    const decryptCalls = (props) =>
      props.context.port.request.mock.calls.filter(([name]) => name === "passbolt.secret.find-by-resource-id");

    it("As LU, I should see one row per custom field, in order, with its label and hidden value, the URI, and no username, password, totp or use on this page", async () => {
      expect.assertions(8);
      const props = standaloneCustomFieldsResourceProps();
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.propertyNames).toStrictEqual(["License key", "Port", "no key", "Empty", "URI"]);
      expect(page.customFieldRows.length).toStrictEqual(4);
      expect([0, 1, 2, 3].map((index) => page.customFieldValueText(index))).toStrictEqual(
        Array(4).fill("Copy to clipboard"),
      );
      expect(page.uri.textContent).toStrictEqual("https://passbolt.com");
      expect(page.username).toBeNull();
      expect(page.password).toBeNull();
      expect(page.totp).toBeNull();
      expect(page.useOnThisPageButton).toBeNull();
    });

    it("As LU, I should be able to copy a single custom field value by clicking on the copy icon", async () => {
      expect.assertions(2);
      const props = standaloneCustomFieldsResourceProps();
      mockContextRequest(props.context, standaloneCustomFieldsSecretDto);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.copyCustomFieldButton(0));

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.secret.find-by-resource-id",
        props.context.storage.local.get(["resources"]).resources[0].id,
      );
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", "XYZ-123");
    });

    it("As LU, I should be able to copy a custom field value by clicking on the masked value", async () => {
      expect.assertions(1);
      const props = standaloneCustomFieldsResourceProps();
      mockContextRequest(props.context, standaloneCustomFieldsSecretDto);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.customFieldValue(0));

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", "XYZ-123");
    });

    it("As LU, I should copy number and boolean values as text, decrypting the secret only once", async () => {
      expect.assertions(3);
      const props = standaloneCustomFieldsResourceProps();
      mockContextRequest(props.context, standaloneCustomFieldsSecretDto);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.copyCustomFieldButton(1));
      await page.click(page.copyCustomFieldButton(2));

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", "8080");
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.clipboard.copy-temporarily", "true");
      expect(decryptCalls(props).length).toStrictEqual(1);
    });

    it("As LU, I should preview each custom field value independently and hide it again", async () => {
      expect.assertions(7);
      const props = standaloneCustomFieldsResourceProps();
      mockContextRequest(props.context, standaloneCustomFieldsSecretDto);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.previewCustomFieldButton(0));
      expect(page.customFieldValueText(0)).toStrictEqual("XYZ-123");
      expect(page.customFieldValueText(1)).toStrictEqual("Copy to clipboard");

      await page.click(page.previewCustomFieldButton(1));
      expect(page.customFieldValueText(0)).toStrictEqual("XYZ-123");
      expect(page.customFieldValueText(1)).toStrictEqual("8080");

      await page.click(page.previewCustomFieldButton(0));
      expect(page.customFieldValueText(0)).toStrictEqual("Copy to clipboard");
      expect(page.customFieldValueText(1)).toStrictEqual("8080");
      expect(decryptCalls(props).length).toStrictEqual(1);
    });

    it("As LU, I should be told when a custom field value is empty", async () => {
      expect.assertions(3);
      const props = standaloneCustomFieldsResourceProps();
      mockContextRequest(props.context, standaloneCustomFieldsSecretDto);
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.previewCustomFieldButton(3));
      expect(page.customFieldValueText(3)).toStrictEqual("There is no value");

      await page.click(page.copyCustomFieldButton(3));
      expect(page.errorMessage.textContent).toStrictEqual(
        "The custom field value is empty and cannot be copied to clipboard.",
      );
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.clipboard.copy-temporarily",
        expect.anything(),
      );
    });

    it("As LU, I should see a single row when the resource has no custom fields", async () => {
      expect.assertions(3);
      const props = standaloneEmptyCustomFieldsResourceProps();
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.propertyNames).toStrictEqual(["Custom fields", "URI"]);
      expect(page.customFieldRows.length).toStrictEqual(0);
      expect(page.emptyCustomFields.textContent).toStrictEqual("No custom fields");
    });

    it("As LU, I shouldn't be able to preview the custom fields if disabled by API flag", async () => {
      expect.assertions(2);
      const props = standaloneCustomFieldsResourceProps();
      props.context.siteSettings.canIUse = () => false;
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewCustomFieldButton(0)).toBeNull();
      expect(page.copyCustomFieldButton(0)).not.toBeNull();
    });

    it("As LU, I shouldn't be able to preview the custom fields if denied by RBAC", async () => {
      expect.assertions(1);
      const props = standaloneCustomFieldsResourceProps({ rbacContext: denyRbacContext() });
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.previewCustomFieldButton(0)).toBeNull();
    });

    it("As LU, I should not be able to copy the custom fields if denied by RBAC", async () => {
      expect.assertions(3);
      const props = standaloneCustomFieldsResourceProps({ rbacContext: denyRbacContext() });
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      expect(page.customFieldValueText(0)).toStrictEqual("Copy to clipboard");
      expect(page.customFieldValue(0).hasAttribute("disabled")).toBeTruthy();
      expect(page.copyCustomFieldButton(0)).toBeNull();
    });

    it("As LU, nothing is copied and the values stay hidden if I cancel the passphrase", async () => {
      expect.assertions(3);
      const props = standaloneCustomFieldsResourceProps();
      const abortError = new Error("The user aborted the operation");
      abortError.name = "UserAbortsOperationError";
      mockContextRequest(props.context, () => Promise.reject(abortError));
      let page;
      await act(async () => {
        page = new ResourceViewPagePage(props);
      });

      await page.click(page.copyCustomFieldButton(0));
      expect(props.context.port.request).not.toHaveBeenCalledWith(
        "passbolt.clipboard.copy-temporarily",
        expect.anything(),
      );
      expect(page.customFieldValueText(0)).toStrictEqual("Copy to clipboard");

      mockContextRequest(props.context, () => Promise.reject(abortError));
      await page.click(page.previewCustomFieldButton(0));
      expect(page.customFieldValueText(0)).toStrictEqual("Copy to clipboard");
    });
  });
});
