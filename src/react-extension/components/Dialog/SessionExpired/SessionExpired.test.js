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
import SessionExpiredPage from "./SessionExpired.test.page";
import {defaultAppContext, defaultProps} from "./SessionExpired.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the session expired dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe('As LU I can start go to login', () => {
    /**
     * I should see the session expired dialog
     */
    beforeEach(() => {
      page = new SessionExpiredPage(context, props);
    });

    it('matches the styleguide', async() => {
      // Dialog title exists and correct
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Session Expired");

      // Close button exists
      expect(Boolean(page.dialogClose)).toBeTruthy();

      // Save button exists
      expect(page.loginButton.value).toBe("Login");
    });

    it('As LU I should go to login page by clicking on the login button', async() => {
      await page.goToLogin();
      expect(props.history.push).toHaveBeenCalledWith("/auth/login");
    });

    it('As LU I can go to login page by closing the dialog', async() => {
      await page.closeDialog();
      expect(props.onClose).toBeCalled();
      expect(props.history.push).toHaveBeenCalledWith("/auth/login");
    });

    it('As LU I can go to login page with the keyboard (escape)', async() => {
      await page.escapeKey();
      expect(props.onClose).toBeCalled();
      expect(props.history.push).toHaveBeenCalledWith("/auth/login");
    });
  });
});
