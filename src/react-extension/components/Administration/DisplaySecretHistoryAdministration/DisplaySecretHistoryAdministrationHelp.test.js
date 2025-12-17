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
 * @since         5.7.0
 */

import DisplaySecretHistoryAdministrationHelp from "./DisplaySecretHistoryAdministrationHelp.test.page";
import { waitFor } from "@testing-library/react";

describe("DisplaySecretHistoryAdministrationHelp", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("As a signed-in administrator I can see the secret history settings help page", () => {
    it("As a signed-in administrator I can see the help documentation", async () => {
      expect.assertions(1);

      const page = new DisplaySecretHistoryAdministrationHelp();
      await waitFor(() => {});

      expect(page.title.textContent).toBe("Need help?");
    });
  });

  describe("As a signed-in administrator, I can go to the help documentation page", () => {
    it("Redirect to the help page secret revision settings", async () => {
      expect.assertions(2);

      const page = new DisplaySecretHistoryAdministrationHelp();
      await waitFor(() => {});

      expect(page.readDocumentation.getAttribute("rel")).toStrictEqual("noopener noreferrer");
      expect(page.readDocumentation.getAttribute("href")).toStrictEqual(
        "https://passbolt.com/docs/admin/secret-history",
      );
    });
  });
});
