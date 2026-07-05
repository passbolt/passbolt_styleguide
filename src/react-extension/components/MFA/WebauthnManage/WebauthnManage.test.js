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
import { MfaSettingsWorkflowStates } from "../../../contexts/MFAContext";
import { defaultProps, emptyProps } from "./WebauthnManage.test.data";
import WebauthnManagePage from "./WebauthnManage.test.page";

const waitUntil = (predicate) =>
  waitFor(() => {
    if (!predicate()) {
      throw new Error("condition not met yet");
    }
  });

describe("WebauthnManage", () => {
  it("As a user I can see the security keys I have registered", async () => {
    expect.assertions(3);
    const page = new WebauthnManagePage(defaultProps());
    await waitUntil(() => page.rows.length === 2);

    expect(page.title.textContent).toEqual("Your security keys");
    expect(page.rowName(0)).toEqual("YubiKey 5");
    // A credential without a name falls back to the generic "Security key" label.
    expect(page.rowName(1)).toEqual("Security key");
  });

  it("As a user without a registered key I see the empty state", async () => {
    expect.assertions(2);
    const page = new WebauthnManagePage(emptyProps());
    await waitUntil(() => page.description !== null && !/Loading/.test(page.description.textContent));

    expect(page.rows.length).toEqual(0);
    expect(page.description.textContent).toEqual("You do not have any registered security key yet.");
  });

  it("As a user I can remove a security key by its credential id", async () => {
    expect.assertions(1);
    const props = defaultProps();
    const page = new WebauthnManagePage(props);
    await waitUntil(() => page.rows.length === 2);

    await page.clickRemove(0);

    expect(props.mfaContext.removeWebauthnCredential).toHaveBeenCalledWith("cred-1");
  });

  it("As a user I return to the provider list once the last key is removed", async () => {
    expect.assertions(1);
    const props = defaultProps({
      mfaContext: {
        // First load returns one key, the reload after removal returns none.
        getWebauthnCredentials: jest
          .fn()
          .mockResolvedValueOnce([{ credential_id: "cred-1", name: "Only key" }])
          .mockResolvedValueOnce([]),
      },
    });
    const page = new WebauthnManagePage(props);
    await waitUntil(() => page.rows.length === 1);

    await page.clickRemove(0);

    expect(props.mfaContext.goToProviderList).toHaveBeenCalled();
  });

  it("As a user I can go back to the provider list", async () => {
    expect.assertions(1);
    const props = defaultProps();
    const page = new WebauthnManagePage(props);
    await waitUntil(() => page.rows.length === 2);

    await page.clickBack();

    expect(props.mfaContext.goToProviderList).toHaveBeenCalled();
  });

  it("As a user I can register another security key", async () => {
    expect.assertions(1);
    const props = defaultProps();
    const page = new WebauthnManagePage(props);
    await waitUntil(() => page.rows.length === 2);

    await page.clickRegister();

    expect(props.mfaContext.navigate).toHaveBeenCalledWith(MfaSettingsWorkflowStates.SETUPWEBAUTHN);
  });
});
