import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import PassphraseDialog from "./PassphraseDialog";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import UserSettings from "../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../react-extension/test/fixture/Settings/userSettings";
import { waitFor } from "@testing-library/dom";
import PassphraseDialogPage from "./PassphraseDialog.test.page";
import { defaultAppContext, passkeyPromptProps } from "./PassphraseDialog.test.data";

// Reset the modules before each test.
beforeEach(() => {
  jest.resetModules();
});

// Cleanup after each test.
afterEach(cleanup);

describe("PassphraseDialog", () => {
  it("should execute the onComplete prop function when the passphrase is correct", async () => {
    const onComplete = jest.fn();
    const appContext = {
      userSettings: new UserSettings(userSettingsFixture),
    };
    const component = render(
      <MockTranslationProvider>
        <PassphraseDialog debug context={appContext} onComplete={onComplete} />
      </MockTranslationProvider>,
    );
    // mock the passbolt messaging layer.
    appContext.port = {
      emit: () => new Promise((resolve) => resolve()),
      request: () => new Promise((resolve) => resolve()),
    };

    // Fill the passphrase input.
    const passphraseInput = component.container.querySelector('[name="passphrase"]');
    const event = { target: { value: "admin@passbolt.com" } };
    fireEvent.change(passphraseInput, event);

    // Click on submit.
    const submitButton = component.container.querySelector('button[type="submit"]');
    fireEvent.click(submitButton, { button: 0 });

    await waitFor(() => {});
    expect(onComplete).toHaveBeenCalled();
  });

  describe("passkey prompt", () => {
    it.each([
      [
        "verify-organisation",
        "get",
        "Verify your passkey sign-in",
        "github.com requires user verification as part of the passkey protocol.Your organisation requires your Passbolt passphrase for this request.“Remember me” still applies to your Passbolt session.",
        "Verify and continue",
      ],
      [
        "verify",
        "get",
        "Verify your passkey sign-in",
        "github.com requires user verification as part of the passkey protocol.Your passkey setting requires your Passbolt passphrase for this request.“Remember me” still applies to your Passbolt session.",
        "Verify and continue",
      ],
      [
        "verify",
        "create",
        "Verify your passkey registration",
        "github.com requires user verification as part of the passkey protocol.Your passkey setting requires your Passbolt passphrase for this request.“Remember me” still applies to your Passbolt session.",
        "Verify and continue",
      ],
      [
        "unlock",
        "get",
        "Unlock your passkey",
        "github.com requires user verification as part of the passkey protocol.Your setting allows Passbolt to use an unlocked session. Enter your passphrase to unlock this passkey and continue.Your Passbolt “remember me” preference stays the same.",
        "Unlock and continue",
      ],
      [
        "unlock",
        "create",
        "Unlock Passbolt to save your passkey",
        "github.com requires user verification as part of the passkey protocol.Your setting allows Passbolt to use an unlocked session. Enter your passphrase to save this passkey and continue.Your Passbolt “remember me” preference stays the same.",
        "Unlock and continue",
      ],
    ])("shows the %s %s texts", (purpose, ceremony, title, messages, submit) => {
      expect.assertions(6);
      const page = new PassphraseDialogPage(defaultAppContext(), passkeyPromptProps({ purpose, ceremony }));
      expect(page.title.textContent).toStrictEqual(title);
      expect(page.rpId.textContent).toStrictEqual("github.com");
      expect(page.passkeyMessages.textContent).toStrictEqual(messages);
      expect(page.passphraseLabel.textContent).toStrictEqual("Passphrase");
      expect(page.submitButton.textContent).toStrictEqual(submit);
      expect(page.rememberMe).toBeNull();
    });

    it("answers without remembering the passphrase", async () => {
      expect.assertions(2);
      const appContext = defaultAppContext();
      jest.spyOn(appContext.port, "request").mockResolvedValue();
      jest.spyOn(appContext.port, "emit");
      const props = passkeyPromptProps();
      const page = new PassphraseDialogPage(appContext, props);

      await page.submit("passphrase");

      expect(appContext.port.emit).toHaveBeenCalledWith(props.requestId, "SUCCESS", {
        passphrase: "passphrase",
        rememberMe: false,
      });
      expect(props.onComplete).toHaveBeenCalled();
    });

    it("keeps the default texts and the remember-me checkbox without a passkey prompt", () => {
      expect.assertions(4);
      const page = new PassphraseDialogPage(defaultAppContext(), { requestId: "8e3874ae-4b40-590b-968a-418f704b9d9a" });
      expect(page.title.textContent).toStrictEqual("Passphrase required");
      expect(page.passkeyMessages).toBeNull();
      expect(page.submitButton.textContent).toStrictEqual("Submit");
      expect(page.rememberMe).not.toBeNull();
    });
  });
});
