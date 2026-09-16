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
import { defaultProps, propsWithLimitReached, propsWithoutPasskeys } from "./DisplayPasskeys.test.data";
import { defaultPasskeysDtos } from "../../../contexts/MFAContext.test.data";
import DeletePasskeyDialog from "./DeletePasskeyDialog";
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
});
