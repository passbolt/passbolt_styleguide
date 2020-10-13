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
 * Unit tests on DisplayUserWorkspaceMainActions in regard of specifications
 */

import DisplayUserWorkspaceMainActionsTestPage from "./DisplayUserWorkspaceMainActions.test.page";
import {defaultAppContext, defaultProps} from "./DisplayUserWorkspaceMainActions.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See Workspace Main Menu", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const adminUser = {
    role_id: "8e3874ae-4b40-590b-968a-418f704b9d9a",
  };
  const user = {
    role_id: "8e3874ae-4b40-590b-968a-418f704b9d9b",
  };

  describe('As AD I can start adding a user via the workspace main menu', () => {
    /**
     * Given a AD user
     * Then I should see the create resource menu
     */

    beforeEach(() => {
      context.setContext({currentUser: adminUser});
      page = new DisplayUserWorkspaceMainActionsTestPage(context, props);
    });

    it('As AD I can adding a user via the create menu', () => {
      expect(page.displayUserWorkspaceMainActions.exists()).toBeTruthy();
      expect(page.displayUserWorkspaceMainActions.createMenu).not.toBeNull();
      page.displayUserWorkspaceMainActions.clickOnMenu(page.displayUserWorkspaceMainActions.createMenu);
      expect(page.displayUserWorkspaceMainActions.newUserMenu).not.toBeNull();
    });
  });

  describe('As LU I can\'t see the workspace create menu', () => {
    /**
     * Given a LU
     * Then I shouldn't see the create resource menu
     */

    beforeEach(() => {
      context.setContext({currentUser: user});
      page = new DisplayUserWorkspaceMainActionsTestPage(context, props);
    });

    it('As LU I cannot start adding a user via the workspace create menu', () => {
      expect(page.displayUserWorkspaceMainActions.exists()).toBeFalsy();
    });
  });
});
