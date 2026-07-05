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
import { defaultProps } from "./DisplayPasskeyAdministration.test.data";
import DisplayPasskeyAdministrationPage from "./DisplayPasskeyAdministration.test.page";

const waitUntil = (predicate) =>
  waitFor(() => {
    if (!predicate()) {
      throw new Error("condition not met yet");
    }
  });

describe("DisplayPasskeyAdministration", () => {
  it("As an administrator I see the passkey login toggle reflecting the current setting", () => {
    expect.assertions(2);
    const page = new DisplayPasskeyAdministrationPage(defaultProps());

    expect(page.title.textContent).toEqual("Passkey login");
    expect(page.toggle.checked).toBe(true);
  });

  it("As an administrator I can turn passkey login off and save it", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const page = new DisplayPasskeyAdministrationPage(props);

    await page.toggleEnabled();
    expect(page.toggle.checked).toBe(false);

    await page.clickSave();
    await waitUntil(() => page.successMessage !== null);

    expect(props.passkeyContext.setOrgEnabled).toHaveBeenCalledWith(false);
    expect(page.successMessage).not.toBeNull();
  });

  it("As an administrator I see an error message when saving fails", async () => {
    expect.assertions(1);
    const props = defaultProps({ passkeyContext: { setOrgEnabled: jest.fn(() => Promise.reject(new Error("nope"))) } });
    const page = new DisplayPasskeyAdministrationPage(props);

    await page.clickSave();
    await waitUntil(() => page.errorMessage !== null);

    expect(page.errorMessage.textContent).toEqual("nope");
  });
});
