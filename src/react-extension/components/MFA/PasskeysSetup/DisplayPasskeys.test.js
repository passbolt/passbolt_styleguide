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
 * @since         5.17.0
 */
/**
 * Unit tests on DisplayPasskeys in regard of specifications
 */
import { waitFor } from "@testing-library/react";
import { DateTime } from "luxon";
import DisplayPasskeysPage from "./DisplayPasskeys.test.page";
import {
  defaultProps,
  propsWithLimitReached,
  propsWithoutPasskeys,
  propsWithPendingRegistration,
} from "./DisplayPasskeys.test.data";
import { defaultPasskeysDtos } from "../../../contexts/MFAContext.test.data";
import DeletePasskeyDialog from "./DeletePasskeyDialog";
import NamePasskeyDialog from "./NamePasskeyDialog";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayPasskeys", () => {
  describe("As LU I can see my passkeys", () => {
    it("As LU I should see the title, the help text and my passkeys", async () => {
      expect.assertions(8);
      const props = defaultProps();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      const passkeys = defaultPasskeysDtos();
      expect(page.exists()).toBeTruthy();
      expect(page.title.textContent).toEqual("Passkeys");
      expect(page.passkeys).toHaveLength(3);
      expect(page.passkeyName(0).textContent).toEqual(passkeys[0].name);
      expect(page.passkeyCreated(0).textContent).toEqual(
        DateTime.fromISO(passkeys[0].created).setLocale("en-UK").toLocaleString(DateTime.DATE_SHORT),
      );
      expect(page.passkeyLastUsed(0).textContent).toEqual(
        DateTime.fromISO(passkeys[0].last_used).toRelative({ locale: "en-UK" }),
      );
      expect(page.passkeyIcon(0)).not.toBeNull();
      expect(page.addPasskeyButton.hasAttribute("disabled")).toBeFalsy();
    });

    it("As LU I should see a fallback name and Never as last used for a fresh unnamed passkey", async () => {
      expect.assertions(2);
      const props = defaultProps({
        mfaContext: { findPasskeys: jest.fn(async () => defaultPasskeysDtos(1, { name: null, last_used: null })) },
      });
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      expect(page.passkeyName(0).textContent).toEqual("Passkey");
      expect(page.passkeyLastUsed(0).textContent).toEqual("Never");
    });

    it("As LU I should see the empty state with an enabled add passkey button", async () => {
      expect.assertions(3);
      const props = propsWithoutPasskeys();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      expect(page.passkeysList).toBeNull();
      expect(page.addPasskeyTooltip).toBeNull();
      expect(page.addPasskeyButton.hasAttribute("disabled")).toBeFalsy();
    });

    it("As LU I should see the add passkey button disabled with a tooltip when the limit is reached", async () => {
      expect.assertions(2);
      const props = propsWithLimitReached();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      expect(page.addPasskeyButton.hasAttribute("disabled")).toBeTruthy();
      expect(page.addPasskeyTooltip.textContent).toEqual("The maximum number of passkeys has been reached.");
    });

    it("As LU I should see an error dialog when the passkeys cannot be loaded", async () => {
      expect.assertions(1);
      const error = new Error("Jest simulate API error.");
      const props = defaultProps({ mfaContext: { findPasskeys: jest.fn(() => Promise.reject(error)) } });
      new DisplayPasskeysPage(props);
      await waitFor(() => {
        if (!props.dialogContext.open.mock.calls.length) {
          throw new Error("The error dialog is not opened yet");
        }
      });

      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, { error });
    });
  });

  describe("As LU I can manage my passkeys", () => {
    it("As LU I should be able to start the registration of a passkey", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      await page.clickOnAddPasskey();

      expect(props.mfaContext.startPasskeyRegistration).toHaveBeenCalled();
    });

    it("As LU I should be able to open the delete passkey dialog", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      await page.clickOnDeletePasskey(1);

      expect(props.dialogContext.open).toHaveBeenCalledWith(DeletePasskeyDialog, {
        passkey: defaultPasskeysDtos()[1],
        onDeleted: expect.any(Function),
      });
    });

    it("As LU I should be able to go back to the providers list", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      await page.clickOnManageProviders();

      expect(props.mfaContext.goToProviderList).toHaveBeenCalled();
    });
  });

  describe("As LU I can add a passkey", () => {
    const strayHint = "It may still appear in your password manager or passkey settings.";

    /**
     * Returns the props given to the name passkey dialog
     */
    const openedNamePasskeyDialogProps = (props) =>
      props.dialogContext.open.mock.calls.find(([component]) => component === NamePasskeyDialog)[1];

    it("As LU I should see the registration pending while the browser prompt is open", async () => {
      expect.assertions(7);
      const props = propsWithPendingRegistration();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();
      expect(page.registrationHint).toBeNull();

      await page.clickOnAddPasskey();

      expect(props.mfaContext.startPasskeyRegistration).toHaveBeenCalled();
      expect(page.addPasskeyButtonProcessing).not.toBeNull();
      expect(page.registrationHint.textContent).toEqual(
        "Follow the instructions of your browser to create the passkey.",
      );
      expect(page.addPasskeyButton.hasAttribute("disabled")).toBeTruthy();
      expect(page.passkeyDeleteButton(0).hasAttribute("disabled")).toBeTruthy();
      expect(page.manageProvidersButton.hasAttribute("disabled")).toBeTruthy();
    });

    it("As LU I should be asked to name the passkey once it is created", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      await page.clickOnAddPasskey();

      expect(props.dialogContext.open).toHaveBeenCalledWith(NamePasskeyDialog, {
        aaguid: "adce0002-35bc-c60a-648b-0b25f1f05503",
        passkeys: defaultPasskeysDtos(),
        onSaved: expect.any(Function),
        onFailed: expect.any(Function),
        onAborted: expect.any(Function),
      });
      await page.waitForRegistrationSettled();
      expect(page.addPasskeyButtonProcessing).toBeNull();
      expect(page.registrationHint).toBeNull();
    });

    it("As LU I should see my passkeys reloaded once the passkey is saved", async () => {
      expect.assertions(2);
      const props = defaultProps();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();
      await page.clickOnAddPasskey();
      props.mfaContext.findPasskeys.mockImplementation(async () => defaultPasskeysDtos(4));

      await openedNamePasskeyDialogProps(props).onSaved();

      await waitFor(() => {
        if (page.passkeys.length !== 4) {
          throw new Error("The passkeys are not reloaded yet");
        }
      });
      expect(page.passkeys.length).toEqual(4);
      expect(props.mfaContext.findPasskeySettings).toHaveBeenCalledTimes(2);
    });

    it.each([
      {
        scenario: "the browser prompt is cancelled",
        error: { name: "WebauthnCeremonyCancelledError", message: "The ceremony was cancelled." },
        expected: "The passkey was not created. The browser prompt was cancelled or timed out.",
      },
      {
        scenario: "the authenticator is already registered",
        error: { name: "WebauthnAuthenticatorAlreadyRegisteredError", message: "Already registered." },
        expected: "This authenticator is already registered for your account.",
      },
      {
        scenario: "the TLS certificate is invalid or untrusted",
        error: { name: "WebauthnTLSCertificateError", message: "The TLS certificate is invalid." },
        expected:
          "The operation requires a secure connection. Passkeys were blocked due to an untrusted TLS certificate or an invalid Relying Party ID.",
      },
      {
        scenario: "another webauthn ceremony is runnging",
        error: { name: "WebauthnTLSCertificateError", message: "Another Webauthn ceremony is running." },
        expected: "A passkey prompt is already opened in another window. Please complete or cancel it to continue.",
      },
      {
        scenario: "the registration cannot start",
        error: { name: "PassboltApiFetchError", message: "The WebAuthn provider is not enabled." },
        expected: "The WebAuthn provider is not enabled.",
      },
    ])("As LU I should see an error when $scenario", async ({ error, expected }) => {
      expect.assertions(3);
      jest.spyOn(console, "error").mockImplementation(() => {});
      const props = defaultProps({
        mfaContext: { startPasskeyRegistration: jest.fn(() => Promise.reject(error)) },
      });
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      await page.clickOnAddPasskey();
      await page.waitForRegistrationSettled();

      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith(expected);
      expect(props.dialogContext.open).not.toHaveBeenCalled();
      expect(page.addPasskeyButtonProcessing).toBeNull();
    });

    it("As LU I should see no error when the registration is aborted", async () => {
      expect.assertions(3);
      jest.spyOn(console, "error").mockImplementation(() => {});
      const error = { name: "WebauthnCeremonyAbortedError", message: "The passkey registration was aborted." };
      const props = defaultProps({
        mfaContext: { startPasskeyRegistration: jest.fn(() => Promise.reject(error)) },
      });
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();

      await page.clickOnAddPasskey();
      await page.waitForRegistrationSettled();

      expect(props.actionFeedbackContext.displayError).not.toHaveBeenCalled();
      expect(props.dialogContext.open).not.toHaveBeenCalled();
      expect(page.addPasskeyButtonProcessing).toBeNull();
    });

    it("As LU I should see an error and my passkeys reloaded when the passkey cannot be saved", async () => {
      expect.assertions(3);
      const props = defaultProps();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();
      await page.clickOnAddPasskey();

      await openedNamePasskeyDialogProps(props).onFailed({
        name: "PassboltApiFetchError",
        message: "The maximum number of passkeys has been reached.",
        data: { code: 400, body: "" },
      });

      expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith(
        `The maximum number of passkeys has been reached. ${strayHint}`,
      );
      expect(props.mfaContext.findPasskeys).toHaveBeenCalledTimes(2);
      expect(props.mfaContext.findPasskeySettings).toHaveBeenCalledTimes(2);
    });

    it("As LU I should see a warning when I close the name dialog", async () => {
      expect.assertions(1);
      const props = defaultProps();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();
      await page.clickOnAddPasskey();

      openedNamePasskeyDialogProps(props).onAborted();

      expect(props.actionFeedbackContext.displayWarning).toHaveBeenCalledWith(
        `The passkey was not added to your account. ${strayHint}`,
      );
    });

    it("As LU I should abort the registration when I leave the page while the browser prompt is open", async () => {
      expect.assertions(1);
      const props = propsWithPendingRegistration();
      const page = new DisplayPasskeysPage(props);
      await page.waitForLoaded();
      await page.clickOnAddPasskey();

      page.unmount();

      expect(props.mfaContext.abortPasskeyRegistration).toHaveBeenCalled();
    });
  });
});
