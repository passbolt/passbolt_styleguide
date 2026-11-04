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
import PasskeyCreatePagePage from "./PasskeyCreatePage.test.page";
import { defaultPasskeyCreateRequestDto, defaultProps, mockCreateRequest } from "./PasskeyCreatePage.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("PasskeyCreatePage", () => {
  /**
   * Render the page once the background gave the create request.
   * @param {object} props The props.
   * @returns {Promise<PasskeyCreatePagePage>}
   */
  const renderWithRequest = async (props) => {
    const page = new PasskeyCreatePagePage(props);
    await waitForTrue(() => page.rpId !== null);
    return page;
  };

  it("As a signed-in user asked to save a passkey, I should see the verified site first, then the names the site gave", async () => {
    expect.assertions(5);
    const props = defaultProps();
    mockCreateRequest(props.context);
    const page = await renderWithRequest(props);
    expect(page.title.textContent).toStrictEqual("Save a passkey for example.com");
    expect(page.name.textContent).toStrictEqual("Example");
    expect(page.userName.textContent).toStrictEqual("ada@example.com");
    expect(page.userDisplayName.textContent).toStrictEqual("Ada Lovelace");
    expect(page.hint.textContent).toStrictEqual("Close this window to use a security key or another passkey.");
  });

  it("As a signed-in user asked to save a passkey, I should see the names the site gave as plain text isolated from the page direction", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const markup = '<img src="x" alt="injected">';
    const rightToLeftOverride = String.fromCharCode(0x202e);
    mockCreateRequest(
      props.context,
      defaultPasskeyCreateRequestDto({ name: markup, user_name: `${rightToLeftOverride}evil` }),
    );
    const page = await renderWithRequest(props);
    expect(page.name.textContent).toStrictEqual(markup);
    expect(page.name.querySelector("img")).toBeNull();
    expect(page.userName.firstElementChild.tagName).toStrictEqual("BDI");
  });

  it("As a signed-in user, I should save the passkey and close the window", async () => {
    expect.assertions(3);
    const props = defaultProps();
    mockCreateRequest(props.context);
    const create = jest.fn();
    props.context.port.addRequestListener("passbolt.passkey.create", create);
    const page = await renderWithRequest(props);
    await page.clickOnSave();
    expect(create.mock.calls[0][0]).toStrictEqual(props.requestId);
    expect(props.context.setWindowBlurBehaviour).toHaveBeenCalledWith(false);
    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
  });

  it("As a signed-in user, I should be told when a passkey for this account is already saved", async () => {
    expect.assertions(4);
    const props = defaultProps();
    mockCreateRequest(props.context);
    props.context.port.addRequestListener("passbolt.passkey.create", () => {
      const error = new Error("A passkey for this account is already saved in passbolt.");
      error.name = "PasskeyCredentialExcludedError";
      throw error;
    });
    const page = await renderWithRequest(props);
    await page.clickOnSave();
    expect(page.alreadySavedMessage.textContent).toStrictEqual(
      "A passkey for this account is already saved in passbolt.",
    );
    expect(page.hint).toBeNull();
    expect(page.useAnotherAuthenticatorButton).toBeNull();
    expect(props.context.closeWindow).not.toHaveBeenCalled();
  });

  it("As a signed-in user, I should see why the passkey could not be saved", async () => {
    expect.assertions(3);
    const props = defaultProps();
    mockCreateRequest(props.context);
    props.context.port.addRequestListener("passbolt.passkey.create", () => {
      throw new Error("Could not save.");
    });
    const page = await renderWithRequest(props);
    await page.clickOnSave();
    expect(page.errorMessage.textContent).toStrictEqual("Could not save.");
    expect(page.closeButton.textContent).toStrictEqual("Close");
    expect(props.context.setWindowBlurBehaviour).toHaveBeenLastCalledWith(true);
  });

  it("As a signed-in user who cancels the passphrase prompt, the window should close", async () => {
    expect.assertions(2);
    const props = defaultProps();
    mockCreateRequest(props.context);
    props.context.port.addRequestListener("passbolt.passkey.create", () => {
      const error = new Error("The dialog has been closed.");
      error.name = "UserAbortsOperationError";
      throw error;
    });
    const page = await renderWithRequest(props);
    await page.clickOnSave();
    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
    expect(page.errorMessage).toBeNull();
  });

  it("As a signed-in user, the window should restore its blur behaviour after a failed save", async () => {
    expect.assertions(1);
    const props = defaultProps();
    props.context.shouldCloseAtWindowBlur = false;
    mockCreateRequest(props.context);
    props.context.port.addRequestListener("passbolt.passkey.create", () => {
      throw new Error("Could not save.");
    });
    const page = await renderWithRequest(props);
    await page.clickOnSave();
    expect(props.context.setWindowBlurBehaviour.mock.calls).toStrictEqual([[false], [false]]);
  });

  it("As a signed-in user, the window should close when the site ends the request", async () => {
    expect.assertions(1);
    const props = defaultProps();
    mockCreateRequest(props.context);
    await renderWithRequest(props);
    await props.context.port.emit("passbolt.passkey.request-ended");
    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
  });

  it("As a signed-in user who left the page, the window should not close when the site ends the request", async () => {
    expect.assertions(1);
    const props = defaultProps();
    mockCreateRequest(props.context);
    const page = await renderWithRequest(props);
    page.unmount();
    await props.context.port.emit("passbolt.passkey.request-ended");
    expect(props.context.closeWindow).not.toHaveBeenCalled();
  });

  it("As a signed-in user, I should not see the names the site left empty", async () => {
    expect.assertions(2);
    const props = defaultProps();
    mockCreateRequest(props.context, defaultPasskeyCreateRequestDto({ user_display_name: "" }));
    const page = await renderWithRequest(props);
    expect(page.userDisplayName).toBeNull();
    expect(page.userName.textContent).toStrictEqual("ada@example.com");
  });

  it("As a signed-in user, I should be told when the site no longer waits for the passkey", async () => {
    expect.assertions(3);
    const props = defaultProps();
    props.context.port.addRequestListener("passbolt.passkey.get-pending-request", () => {
      throw new Error("The passkey request is no longer pending.");
    });
    const page = new PasskeyCreatePagePage(props);
    await waitForTrue(() => page.errorMessage !== null);
    expect(page.errorMessage.textContent).toStrictEqual("The passkey request is no longer pending.");
    expect(page.closeButton.textContent).toStrictEqual("Close");
    expect(page.saveButton).toBeNull();
  });

  it("As a signed-in user, I should leave the passkey to another authenticator without saving it", async () => {
    expect.assertions(2);
    const props = defaultProps();
    mockCreateRequest(props.context);
    const create = jest.fn();
    props.context.port.addRequestListener("passbolt.passkey.create", create);
    const page = await renderWithRequest(props);
    await page.clickOnUseAnotherAuthenticator();
    expect(props.context.closeWindow).toHaveBeenCalledTimes(1);
    expect(create).not.toHaveBeenCalled();
  });
});
