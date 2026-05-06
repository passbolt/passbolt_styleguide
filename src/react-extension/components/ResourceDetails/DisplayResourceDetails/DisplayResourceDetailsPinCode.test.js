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
 * @since         5.12.0
 */

import { waitForTrue } from "../../../../../test/utils/waitFor";

import "../../../../../test/mocks/mockClipboard";
import { defaultProps, propsWithDenyUiAction } from "./DisplayResourceDetailsPinCode.test.data";
import DisplayResourceDetailsPinCodePage from "./DisplayResourceDetailsPinCode.test.page";

import { ActionFeedbackContext } from "../../../contexts/ActionFeedbackContext";
import { defaultUserAppContext } from "../../../contexts/ExtAppContext.test.data";
import UserAbortsOperationError from "../../../lib/Error/UserAbortsOperationError";

describe("DisplayResourceDetailsPinCode", () => {
  let props;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    props = defaultProps();
  });

  describe("As LU I can see the pin code section", () => {
    it("I should see the pin code section of a resource", async () => {
      expect.assertions(2);

      const page = new DisplayResourceDetailsPinCodePage(props);

      expect(page.title.textContent).toEqual("Pin code");
      expect(page.exists()).toEqual(true);
    });

    it("I should be able to identify the pin code label", async () => {
      expect.assertions(2);

      const page = new DisplayResourceDetailsPinCodePage(props);

      expect(page.pinCodeLabel).toEqual("Pin code");
      expect(page.pinCode.textContent).toEqual("Copy to clipboard");
    });

    it("I should be able to close the pin code section", async () => {
      expect.assertions(1);

      const page = new DisplayResourceDetailsPinCodePage(props);

      await page.click(page.title);
      expect(page.exists()).toEqual(false);
    });
  });

  describe("As LU I can copy the pin code of a resource to clipboard", () => {
    it("AS LU, I should be able to copy the pin code of a resource to clipboard", async () => {
      expect.assertions(3);

      const requestMock = jest.fn().mockResolvedValue({ pin_code: "1234" });
      props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", requestMock);

      const page = new DisplayResourceDetailsPinCodePage(props);

      await page.click(page.pinCodeLink);

      expect(requestMock).toHaveBeenCalledWith(props.resourceWorkspaceContext.details.resource.id, undefined);
      expect(props.clipboardContext.copyTemporarily).toHaveBeenCalledWith(
        "1234",
        "The pin code has been copied to clipboard.",
      );
      expect(props.resourceWorkspaceContext.onResourceCopied).toHaveBeenCalled();
    });

    it("AS LU, I should see a warning if the decrypted pin code is empty", async () => {
      expect.assertions(2);

      const requestMock = jest.fn().mockResolvedValue({ pin_code: "" });
      props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", requestMock);
      const displayWarningSpy = jest.spyOn(ActionFeedbackContext._currentValue, "displayWarning").mockReturnValue();

      const page = new DisplayResourceDetailsPinCodePage(props);

      await page.click(page.pinCodeLink);

      expect(displayWarningSpy).toHaveBeenCalledWith("The pin code is empty and cannot be copied to clipboard.");
      expect(props.clipboardContext.copyTemporarily).not.toHaveBeenCalled();
    });

    it("AS LU, I should do nothing if the decryption is aborted", async () => {
      expect.assertions(4);

      const requestMock = jest.fn().mockRejectedValue(new UserAbortsOperationError());

      props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", requestMock);
      const displayWarningSpy = jest.spyOn(ActionFeedbackContext._currentValue, "displayWarning").mockReturnValue();
      const displayErrorSpy = jest.spyOn(ActionFeedbackContext._currentValue, "displayError").mockReturnValue();

      const page = new DisplayResourceDetailsPinCodePage(props);

      await page.click(page.pinCodeLink);

      expect(props.clipboardContext.copyTemporarily).not.toHaveBeenCalled();
      expect(displayWarningSpy).not.toHaveBeenCalled();
      expect(displayErrorSpy).not.toHaveBeenCalled();
      expect(props.resourceWorkspaceContext.onResourceCopied).not.toHaveBeenCalled();
    });

    it("AS LU, I cannot copy the pin code if denied by RBAC", async () => {
      expect.assertions(1);

      props = propsWithDenyUiAction();
      const page = new DisplayResourceDetailsPinCodePage(props);

      expect(page.pinCodeLink.hasAttribute("disabled")).toEqual(true);
    });
  });

  describe("As LU I can preview the pin code of a resource", () => {
    it("AS LU, I should be able to preview and hide the pin code", async () => {
      expect.assertions(4);

      const requestMock = jest.fn().mockResolvedValue({ pin_code: "1234" });
      props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", requestMock);
      const page = new DisplayResourceDetailsPinCodePage(props);

      await page.click(page.viewPinCode);
      await waitForTrue(() => page.pinCode.textContent === "1234");

      expect(page.pinCode.textContent).toEqual("1234");
      expect(props.resourceWorkspaceContext.onResourcePreviewed).toHaveBeenCalledTimes(1);
      expect(requestMock).toHaveBeenCalledWith(props.resourceWorkspaceContext.details.resource.id, undefined);

      await page.click(page.viewPinCode);

      await waitForTrue(() => page.pinCode.textContent === "Copy to clipboard");
      expect(page.pinCode.textContent).toEqual("Copy to clipboard");
    });

    it("AS LU, if preview is aborted onResourcePreviewed and displayError are not called", async () => {
      expect.assertions(2);

      const requestMock = jest.fn().mockRejectedValue(new UserAbortsOperationError());
      props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", requestMock);
      const displayErrorSpy = jest.spyOn(ActionFeedbackContext._currentValue, "displayError").mockReturnValue();

      const page = new DisplayResourceDetailsPinCodePage(props);

      await page.click(page.viewPinCode);

      expect(props.resourceWorkspaceContext.onResourcePreviewed).not.toHaveBeenCalled();
      expect(displayErrorSpy).not.toHaveBeenCalled();
    });

    it("AS LU, the empty-secret sentence is displayed when the decrypted pin code is empty", async () => {
      expect.assertions(1);

      const requestMock = jest.fn().mockResolvedValue({ pin_code: "" });
      props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", requestMock);

      const page = new DisplayResourceDetailsPinCodePage(props);

      await page.click(page.viewPinCode);
      await waitForTrue(() => page.pinCodeLink.querySelector(".password-empty") !== null);

      expect(page.pinCodeLink.querySelector(".password-empty").textContent).toEqual("There is no pin code");
    });

    it("AS LU, I cannot preview the pin code if disabled by API flag", async () => {
      expect.assertions(1);

      const context = defaultUserAppContext({
        siteSettings: {
          canIUse: () => false,
        },
      });

      props = defaultProps({ context });
      const page = new DisplayResourceDetailsPinCodePage(props);

      expect(page.hasViewPinCodeButton).toEqual(false);
    });

    it("AS LU, I cannot preview the pin code if denied by RBAC", async () => {
      expect.assertions(1);

      props = propsWithDenyUiAction();
      const page = new DisplayResourceDetailsPinCodePage(props);

      expect(page.hasViewPinCodeButton).toEqual(false);
    });
  });

  describe("::componentDidUpdate", () => {
    it("It should reet the state when the resource changes", async () => {
      expect.assertions(4);

      let requestMock = jest.fn().mockResolvedValue({ pin_code: "1234" });
      props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", requestMock);
      const page = new DisplayResourceDetailsPinCodePage(props);

      await page.click(page.viewPinCode);
      await waitForTrue(() => page.pinCode.textContent === "1234");

      expect(page.pinCode.textContent).toEqual("1234");

      const newProps = defaultProps();
      requestMock = jest.fn().mockResolvedValue({ pin_code: "5678" });
      newProps.context.port.addRequestListener("passbolt.secret.find-by-resource-id", requestMock);
      page.rerender(newProps);

      // The resource is not previewed anymore
      expect(page.pinCodeLabel).toEqual("Pin code");
      expect(page.pinCode.textContent).toEqual("Copy to clipboard");

      // Check if the pin code value has been updated
      await page.click(page.viewPinCode);
      await waitForTrue(() => page.pinCode.textContent === "5678");
      expect(page.pinCode.textContent).toEqual("5678");
    });
  });
});
