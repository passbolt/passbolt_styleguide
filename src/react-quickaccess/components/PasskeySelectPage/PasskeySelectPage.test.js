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
import PasskeySelectPagePage from "./PasskeySelectPage.test.page";
import { defaultPasskeyGetRequestDto, defaultProps, mockGetRequest } from "./PasskeySelectPage.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("PasskeySelectPage", () => {
  /**
   * Render the page once the background gave the get request.
   * @param {object} props The props.
   * @returns {Promise<PasskeySelectPagePage>}
   */
  const renderWithRequest = async (props) => {
    const page = new PasskeySelectPagePage(props);
    await waitForTrue(() => page.rpId !== null);
    return page;
  };

  it("As a signed-in user asked to sign in with a passkey, I should see the verified site first, then my passkeys for it", async () => {
    expect.assertions(7);
    const props = defaultProps();
    mockGetRequest(props.context);
    const page = await renderWithRequest(props);
    expect(page.title.textContent).toStrictEqual("Sign in to example.com");
    expect(page.instruction.textContent).toStrictEqual("Choose the passkey to sign in with.");
    expect(page.passkeys).toHaveLength(2);
    expect(page.passkeyName(0).textContent).toStrictEqual("Example");
    expect(page.passkeyUsername(0).textContent).toStrictEqual("ada@example.com");
    expect(page.passkeyName(1).textContent).toStrictEqual("Example work");
    expect(page.hint.textContent).toStrictEqual("Select Cancel to use a security key or a passkey stored elsewhere.");
  });

  it("As a signed-in user, I should see the passkey names as plain text isolated from the page direction", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const markup = '<img src="x" alt="injected">';
    const rightToLeftOverride = String.fromCharCode(0x202e);
    mockGetRequest(
      props.context,
      defaultPasskeyGetRequestDto({
        passkeys: [
          { id: "8e3874ae-4b40-590b-968a-418f704b9d9a", name: markup, username: `${rightToLeftOverride}evil` },
        ],
      }),
    );
    const page = await renderWithRequest(props);
    expect(page.passkeyName(0).textContent).toStrictEqual(markup);
    expect(page.passkeyName(0).querySelector("img")).toBeNull();
    expect(page.passkeyUsername(0).firstElementChild.tagName).toStrictEqual("BDI");
  });

  it("As a signed-in user, I should not see a username for a passkey without one", async () => {
    expect.assertions(1);
    const props = defaultProps();
    mockGetRequest(
      props.context,
      defaultPasskeyGetRequestDto({ passkeys: [{ id: "8e3874ae-4b40-590b-968a-418f704b9d9a", name: "Example" }] }),
    );
    const page = await renderWithRequest(props);
    expect(page.passkeyUsername(0)).toBeNull();
  });

  it("As a signed-in user, I should sign in with the passkey I pick and the window should close", async () => {
    expect.assertions(4);
    const props = defaultProps();
    mockGetRequest(props.context);
    const authenticate = jest.fn();
    props.context.port.addRequestListener("passbolt.passkey.authenticate", authenticate);
    const page = await renderWithRequest(props);
    await page.clickOnPasskey(1);
    expect(authenticate.mock.calls[0][0]).toStrictEqual(props.requestId);
    expect(authenticate.mock.calls[0][1]).toStrictEqual("f848277c-5398-58f8-a82a-72397af2d450");
    expect(props.context.setWindowBlurBehaviour).toHaveBeenCalledWith(false);
    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
  });

  it("As a signed-in user, I should see why the site could not be signed in", async () => {
    expect.assertions(4);
    const props = defaultProps();
    mockGetRequest(props.context);
    props.context.port.addRequestListener("passbolt.passkey.authenticate", () => {
      throw new Error("The passkey cannot be used.");
    });
    const page = await renderWithRequest(props);
    await page.clickOnPasskey(0);
    expect(page.errorMessage.textContent).toStrictEqual("The passkey cannot be used.");
    expect(page.closeButton.textContent).toStrictEqual("Close");
    expect(page.passkeyButton(0).disabled).toStrictEqual(true);
    expect(props.context.setWindowBlurBehaviour).toHaveBeenLastCalledWith(true);
  });

  it("As a signed-in user who cancels the passphrase prompt, I should be able to pick a passkey again", async () => {
    expect.assertions(4);
    const props = defaultProps();
    mockGetRequest(props.context);
    props.context.port.addRequestListener("passbolt.passkey.authenticate", () => {
      const error = new Error("The dialog has been closed.");
      error.name = "UserAbortsOperationError";
      throw error;
    });
    const page = await renderWithRequest(props);
    await page.clickOnPasskey(0);
    expect(props.context.closeWindow).not.toHaveBeenCalled();
    expect(page.errorMessage).toBeNull();
    expect(page.passkeyButton(1).disabled).toStrictEqual(false);
    expect(page.cancelButton.disabled).toStrictEqual(false);
  });

  it("As a signed-in user, I should not pick another passkey nor leave while the site is being signed in", async () => {
    expect.assertions(4);
    const props = defaultProps();
    mockGetRequest(props.context);
    props.context.port.addRequestListener("passbolt.passkey.authenticate", () => new Promise(() => {}));
    const page = await renderWithRequest(props);
    await page.clickOnPasskey(1);
    expect(page.isPasskeyProcessing(1)).toStrictEqual(true);
    expect(page.passkeyButton(0).disabled).toStrictEqual(true);
    expect(page.passkeyButton(1).disabled).toStrictEqual(true);
    expect(page.cancelButton.disabled).toStrictEqual(true);
  });

  it("As a signed-in user, the window should close when the site ends the request", async () => {
    expect.assertions(1);
    const props = defaultProps();
    mockGetRequest(props.context);
    await renderWithRequest(props);
    await props.context.port.emit("passbolt.passkey.request-ended");
    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
  });

  it("As a signed-in user who left the page, the window should not close when the site ends the request", async () => {
    expect.assertions(1);
    const props = defaultProps();
    mockGetRequest(props.context);
    const page = await renderWithRequest(props);
    page.unmount();
    await props.context.port.emit("passbolt.passkey.request-ended");
    expect(props.context.closeWindow).not.toHaveBeenCalled();
  });

  it("As a signed-in user, I should be told when the site no longer waits for a passkey", async () => {
    expect.assertions(3);
    const props = defaultProps();
    props.context.port.addRequestListener("passbolt.passkey.get-pending-request", () => {
      throw new Error("The passkey request is no longer pending.");
    });
    const page = new PasskeySelectPagePage(props);
    await waitForTrue(() => page.errorMessage !== null);
    expect(page.errorMessage.textContent).toStrictEqual("The passkey request is no longer pending.");
    expect(page.closeButton.textContent).toStrictEqual("Close");
    expect(page.cancelButton).toBeNull();
  });

  it("As a signed-in user, I should cancel to leave the sign-in to another authenticator without using a passkey", async () => {
    expect.assertions(2);
    const props = defaultProps();
    mockGetRequest(props.context);
    const authenticate = jest.fn();
    props.context.port.addRequestListener("passbolt.passkey.authenticate", authenticate);
    const page = await renderWithRequest(props);
    await page.clickOnCancel();
    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
    expect(authenticate).not.toHaveBeenCalled();
  });
});
