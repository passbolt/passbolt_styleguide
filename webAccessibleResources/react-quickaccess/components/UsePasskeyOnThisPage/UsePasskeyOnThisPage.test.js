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
 * @since         5.18.0
 */
import { waitForTrue } from "../../../../test/utils/waitFor";
import UsePasskeyOnThisPagePage from "./UsePasskeyOnThisPage.test.page";
import { defaultProps, defaultTabPendingPasskeyRequestDto, mockTab } from "./UsePasskeyOnThisPage.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("UsePasskeyOnThisPage", () => {
  it("should sign in with the passkey a sign-in of the page waits for, then close QuickAccess", async () => {
    expect.assertions(5);
    const props = defaultProps();
    const pendingRequest = defaultTabPendingPasskeyRequestDto({ passkey_ids: [props.resource.id] });
    mockTab(props.context, "https://www.example.com/login", [pendingRequest]);
    props.context.port.addRequestListener("passbolt.passkey.authenticate", (pendingRequestId, resourceId) => {
      expect(pendingRequestId).toStrictEqual(pendingRequest.id);
      expect(resourceId).toStrictEqual(props.resource.id);
    });
    const page = new UsePasskeyOnThisPagePage(props);
    await waitForTrue(() => page.useButton);
    expect(page.isUseButtonDisabled).toBe(false);
    expect(page.hint).toBeNull();
    await page.clickUseButton();
    await waitForTrue(() => props.context.closeWindow.mock.calls.length > 0);
    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
  });

  it("should be disabled with a hint when no sign-in of the page waits on the passkey's site", async () => {
    expect.assertions(2);
    const props = defaultProps();
    mockTab(props.context, "https://example.com/login");
    const page = new UsePasskeyOnThisPagePage(props);
    await waitForTrue(() => page.useButton);
    expect(page.isUseButtonDisabled).toBe(true);
    expect(page.hint.textContent).toStrictEqual(
      "No passkey sign-in is waiting on this page. Start one, or reload the page.",
    );
  });

  it("should be disabled with a hint when the sign-in of the page asks for another passkey", async () => {
    expect.assertions(3);
    const props = defaultProps();
    mockTab(props.context, "https://example.com/login", [defaultTabPendingPasskeyRequestDto()]);
    props.context.port.addRequestListener("passbolt.passkey.authenticate", jest.fn());
    const page = new UsePasskeyOnThisPagePage(props);
    await waitForTrue(() => page.useButton);
    expect(page.hint.textContent).toStrictEqual("This page asks for a different passkey.");
    await page.clickUseButton();
    expect(page.isUseButtonDisabled).toBe(true);
    expect(props.context.closeWindow).not.toHaveBeenCalled();
  });

  it("should not be shown on another site", async () => {
    expect.assertions(1);
    const props = defaultProps();
    mockTab(props.context, "https://other.com/");
    jest.spyOn(props.context.port, "request");
    const page = new UsePasskeyOnThisPagePage(props);
    await waitForTrue(() => props.context.port.request.mock.calls.length === 2);
    // The port answers on the next timer tick.
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(page.useButton).toBeNull();
  });

  it("should stay available without an error when the user cancels the passphrase prompt", async () => {
    expect.assertions(3);
    const props = defaultProps();
    mockTab(props.context, "https://example.com/", [
      defaultTabPendingPasskeyRequestDto({ passkey_ids: [props.resource.id] }),
    ]);
    props.context.port.addRequestListener("passbolt.passkey.authenticate", () => {
      throw { name: "UserAbortsOperationError" };
    });
    const page = new UsePasskeyOnThisPagePage(props);
    await waitForTrue(() => page.useButton);
    await page.clickUseButton();
    await waitForTrue(() => !page.isUseButtonDisabled);
    expect(page.isUseButtonDisabled).toBe(false);
    expect(page.errorMessage).toBeNull();
    expect(props.context.closeWindow).not.toHaveBeenCalled();
  });

  it("should show an error when the sign-in fails", async () => {
    expect.assertions(1);
    const props = defaultProps();
    mockTab(props.context, "https://example.com/", [
      defaultTabPendingPasskeyRequestDto({ passkey_ids: [props.resource.id] }),
    ]);
    props.context.port.addRequestListener("passbolt.passkey.authenticate", () => {
      throw new Error("The passkey could not sign.");
    });
    jest.spyOn(console, "error").mockImplementation(() => {});
    const page = new UsePasskeyOnThisPagePage(props);
    await waitForTrue(() => page.useButton);
    await page.clickUseButton();
    await waitForTrue(() => page.errorMessage);
    expect(page.errorMessage.textContent).toStrictEqual("Unable to sign in with the passkey on this page.");
  });
});
