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
 * @since         5.14.0
 */

import { waitFor } from "@testing-library/react";
import { defaultProps, withCredentialsProps } from "./DisplayPasskeyUserSettings.test.data";
import DisplayPasskeyUserSettingsPage from "./DisplayPasskeyUserSettings.test.page";
import { isWebAuthnSupported } from "../../../../shared/services/webauthn/webAuthnCeremonyService";

jest.mock("../../../../shared/services/webauthn/webAuthnCeremonyService", () => ({
  isWebAuthnSupported: jest.fn(() => true),
}));

/**
 * Wait until a predicate holds (throw-based, so it does not inflate expect.assertions).
 * @param {Function} predicate
 */
const waitUntil = (predicate) =>
  waitFor(() => {
    if (!predicate()) {
      throw new Error("condition not met yet");
    }
  });

const waitForReady = (page) => waitUntil(() => page.enrollButton && page.enrollButton.disabled === false);

beforeEach(() => {
  isWebAuthnSupported.mockImplementation(() => true);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("DisplayPasskeyUserSettings", () => {
  it("As a user I can see the passkey login settings screen", async () => {
    expect.assertions(3);
    const page = new DisplayPasskeyUserSettingsPage(defaultProps());
    await waitForReady(page);

    expect(page.exists()).toBeTruthy();
    expect(page.title.textContent).toEqual("Passkey");
    expect(page.enrollButton.textContent).toEqual("Set up passkey login");
  });

  it("As a user without an enrolled passkey I see the empty state", async () => {
    expect.assertions(2);
    const page = new DisplayPasskeyUserSettingsPage(defaultProps());
    await waitForReady(page);

    expect(page.rows.length).toEqual(0);
    expect([...page.descriptions].some((d) => d.textContent === "No passkey is enrolled yet.")).toBeTruthy();
  });

  it("As a user on an unsupported browser I am told passkeys are unavailable", async () => {
    expect.assertions(2);
    isWebAuthnSupported.mockImplementation(() => false);
    const page = new DisplayPasskeyUserSettingsPage(defaultProps());
    await waitFor(() => {});

    expect(page.enrollButton).toBeNull();
    expect([...page.descriptions].some((d) => /does not support passkeys/.test(d.textContent))).toBeTruthy();
  });

  it("As a user I can see my enrolled passkeys with their name and date", async () => {
    expect.assertions(3);
    const page = new DisplayPasskeyUserSettingsPage(withCredentialsProps());
    await waitUntil(() => page.rows.length === 2);

    expect(page.rows.length).toEqual(2);
    expect(page.rowName(0)).toEqual("Work laptop");
    // A credential without a name falls back to the generic "Passkey" label.
    expect(page.rowName(1)).toEqual("Passkey");
  });

  it("As a user I can delete a passkey by its credential id (not the DB row id)", async () => {
    expect.assertions(2);
    const props = withCredentialsProps();
    const page = new DisplayPasskeyUserSettingsPage(props);
    await waitUntil(() => page.rows.length === 2);

    await page.clickDelete(0);

    expect(props.passkeyContext.deleteCredential).toHaveBeenCalledTimes(1);
    expect(props.passkeyContext.deleteCredential).toHaveBeenCalledWith("cred-aaa");
  });

  it("As a user I can enrol a passkey with a friendly name", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const page = new DisplayPasskeyUserSettingsPage(props);
    await waitForReady(page);

    await page.fillName("Home desktop");
    await page.clickEnroll();
    await waitUntil(() => page.successMessage !== null);

    expect(props.passkeyContext.runEnrollProcess).toHaveBeenCalledTimes(1);
    expect(props.passkeyContext.runEnrollProcess).toHaveBeenCalledWith("Home desktop");
    expect(page.successMessage).not.toBeNull();
  });

  it("As a user I see an error message when the enrolment fails", async () => {
    expect.assertions(1);
    const props = defaultProps({
      passkeyContext: { runEnrollProcess: jest.fn(() => Promise.reject(new Error("boom"))) },
    });
    const page = new DisplayPasskeyUserSettingsPage(props);
    await waitForReady(page);

    await page.clickEnroll();
    await waitUntil(() => page.errorMessage !== null);

    expect(page.errorMessage.textContent).toEqual("boom");
  });
});
