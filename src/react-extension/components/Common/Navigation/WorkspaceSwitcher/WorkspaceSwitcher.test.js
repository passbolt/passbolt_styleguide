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

/**
 * Unit tests on WorkspaceSwitcher in regard of specifications
 */

import WorkspaceSwitcherPage from "./WorkspaceSwitcher.test.page";
import { defaultProps } from "./WorkspaceSwitcher.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("WorkspaceSwitcher", () => {
  describe("As LU I can see the workspace switcher", () => {
    it("As AD I should see the workspace switcher", () => {
      expect.assertions(1);

      const props = defaultProps({ isUserAdmin: true, isUserWorkspaceVisible: false });
      const page = new WorkspaceSwitcherPage(props);

      expect(page.exists()).toBe(true);
    });

    it("As LU I should see the workspace switcher when I can access the user workspace", () => {
      expect.assertions(1);

      const props = defaultProps({ isUserAdmin: false, isUserWorkspaceVisible: true });
      const page = new WorkspaceSwitcherPage(props);

      expect(page.exists()).toBe(true);
    });

    it("As LU I should see the workspace switcher when I am neither admin nor can access the user workspace", () => {
      expect.assertions(1);

      const props = defaultProps({ isUserAdmin: false, isUserWorkspaceVisible: false });
      const page = new WorkspaceSwitcherPage(props);

      expect(page.exists()).toBe(true);
    });

    it("As LU I should not see the menu until I open the dropdown", () => {
      expect.assertions(2);

      const props = defaultProps();
      const page = new WorkspaceSwitcherPage(props);

      expect(page.menu).toBeNull();
      expect(page.termsCreditsButton).toBeNull();
    });
  });

  describe("As LU I can access the terms & credits page", () => {
    it("As LU I should see the terms & credits entry once the menu is open", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const page = new WorkspaceSwitcherPage(props);
      await page.open();

      expect(page.menu).not.toBeNull();
      expect(page.termsCreditsButton).not.toBeNull();
    });

    it("As LU I should go to the terms & credits page when I click the entry", async () => {
      expect.assertions(1);

      const props = defaultProps();
      const page = new WorkspaceSwitcherPage(props);
      await page.open();
      await page.click(page.termsCreditsButton);

      expect(props.navigationContext.onGoToTermsRequested).toHaveBeenCalledTimes(1);
    });
  });

  describe("As LU I can navigate through the other workspace switcher entries", () => {
    it("As LU I should go to the help page when I click the help entry", async () => {
      expect.assertions(1);

      const props = defaultProps();
      const page = new WorkspaceSwitcherPage(props);
      await page.open();
      await page.click(page.helpButton);

      expect(props.navigationContext.onGoToHelpRequested).toHaveBeenCalledTimes(1);
    });

    it("As LU I should go to the users workspace when I click the manage users & groups entry", async () => {
      expect.assertions(1);

      const props = defaultProps();
      const page = new WorkspaceSwitcherPage(props);
      await page.open();
      await page.click(page.usersButton);

      expect(props.navigationContext.onGoToUsersRequested).toHaveBeenCalledTimes(1);
    });

    it("As AD I should see and reach the organisation settings entry", async () => {
      expect.assertions(1);

      const props = defaultProps({ isUserAdmin: true });
      const page = new WorkspaceSwitcherPage(props);
      await page.open();
      await page.click(page.organisationSettingsButton);

      expect(props.navigationContext.onGoToAdministrationRequested).toHaveBeenCalledTimes(1);
    });

    it("As LU I should not see the organisation settings entry when I am not an admin", async () => {
      expect.assertions(1);

      const props = defaultProps({ isUserAdmin: false, isUserWorkspaceVisible: true });
      const page = new WorkspaceSwitcherPage(props);
      await page.open();

      expect(page.organisationSettingsButton).toBeNull();
    });

    it("As LU I should not see the manage users & groups entry when I cannot access the user workspace", async () => {
      expect.assertions(1);

      const props = defaultProps({ isUserWorkspaceVisible: false });
      const page = new WorkspaceSwitcherPage(props);
      await page.open();

      expect(page.usersButton).toBeNull();
    });
  });
});
