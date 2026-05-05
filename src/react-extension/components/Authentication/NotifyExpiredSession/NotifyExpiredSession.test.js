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

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the session expired dialog", () => {
  let page; // The page to test against
  const props = defaultProps(); // The

  describe("As LU I can start go to login", () => {
    /**
     * I should see the session expired dialog
     */
    beforeEach(() => {
      page = new NotifyExpiredSessionPage(props);
    });

    it("matches the styleguide", async () => {
      expect.assertions(4);
      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Session Expired");

      // Close button exists
      expect(Boolean(page.dialogClose)).toBeTruthy();

      // Save button exists
      expect(page.loginButton.textContent).toBe("Sign in");
    });

    it("As LU I should go to login page by clicking on the login button", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request");
      await page.goToLogin();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.tab.reload");
    });

    it("As LU I can go to login page by closing the dialog", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request");
      await page.closeDialog();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.tab.reload");
    });

    it("As LU I can go to login page with the keyboard (escape)", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request");
      await page.escapeKey();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.tab.reload");
    });
  });
});
