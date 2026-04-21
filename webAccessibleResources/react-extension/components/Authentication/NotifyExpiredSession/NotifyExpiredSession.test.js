/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

/**
 * Unit tests on SessionExpired in regard of specifications
 */
import NotifyExpiredSessionPage from "./NotifyExpiredSession.test.page";
import { defaultProps } from "./NotifyExpiredSession.test.data";
import { defaultAppContext } from "../../User/DeleteUser/DeleteUser.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the session expired dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps({ context }); // The

  describe("As LU I can start go to login", () => {
    /**
     * I should see the session expired dialog
     */
    beforeEach(() => {
      page = new NotifyExpiredSessionPage(props);
    });

    it("matches the styleguide", async () => {
      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Session Expired");

      // Close button exists
      expect(Boolean(page.dialogClose)).toBeTruthy();

      // Save button exists
      expect(page.loginButton.textContent).toBe("Sign in");
    });

    it("As LU I should go to login page by clicking on the login button", async () => {
      jest.spyOn(context.port, "request");
      await page.goToLogin();
      expect(context.port.request).toHaveBeenCalledWith("passbolt.tab.reload");
    });

    it("As LU I can go to login page by closing the dialog", async () => {
      jest.spyOn(context.port, "request");
      await page.closeDialog();
      expect(context.port.request).toHaveBeenCalledWith("passbolt.tab.reload");
    });

    it("As LU I can go to login page with the keyboard (escape)", async () => {
      jest.spyOn(context.port, "request");
      await page.escapeKey();
      expect(context.port.request).toHaveBeenCalledWith("passbolt.tab.reload");
    });
  });
});
