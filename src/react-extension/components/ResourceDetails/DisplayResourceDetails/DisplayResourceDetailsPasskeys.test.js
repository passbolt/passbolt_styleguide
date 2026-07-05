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
import { defaultProps, passkeysDto } from "./DisplayResourceDetailsPasskeys.test.data";
import DisplayResourceDetailsPasskeysPage from "./DisplayResourceDetailsPasskeys.test.page";

const waitUntil = (predicate) =>
  waitFor(() => {
    if (!predicate()) {
      throw new Error("condition not met yet");
    }
  });

describe("DisplayResourceDetailsPasskeys", () => {
  it("As a user the section stays hidden for a resource without passkeys", async () => {
    expect.assertions(1);
    const page = new DisplayResourceDetailsPasskeysPage(defaultProps());
    await waitFor(() => {});

    expect(page.root).toBeNull();
  });

  it("As a user I can see the passkeys stored in the resource", async () => {
    expect.assertions(2);
    const page = new DisplayResourceDetailsPasskeysPage(defaultProps({ passkeys: passkeysDto() }));
    await waitUntil(() => page.root !== null);

    expect(page.rows.length).toEqual(1);
    expect(page.rowName(0)).toEqual("brf@webauthn.io");
  });

  it("As a user I can collapse and expand the passkeys section", async () => {
    expect.assertions(2);
    const page = new DisplayResourceDetailsPasskeysPage(defaultProps({ passkeys: passkeysDto() }));
    await waitUntil(() => page.root !== null);

    expect(page.rows.length).toEqual(1);
    await page.clickTitle();
    expect(page.rows.length).toEqual(0);
  });
});
