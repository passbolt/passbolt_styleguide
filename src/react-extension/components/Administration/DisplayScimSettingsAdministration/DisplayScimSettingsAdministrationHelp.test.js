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

import DisplayScimSettingsAdministrationHelpPage from "./DisplayScimSettingsAdministrationHelp.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the SCIM settings administration help", () => {
  let page;

  describe("As LU I can access the help page", () => {
    it("As LU I can see the help section with documentation link", () => {
      expect.assertions(6);
      const props = { shouldDisplayWarning: false };
      page = new DisplayScimSettingsAdministrationHelpPage(props);

      expect(page.exists()).toBeTruthy();
      expect(page.helpBox).toBeDefined();
      expect(page.helpBoxTitle.textContent).toEqual("Need help?");
      expect(page.helpBoxDescription[0].textContent).toEqual(
        "For more information about SCIM, checkout the dedicated page on the official website.",
      );
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute("href")).toEqual(
        "https://www.passbolt.com/docs/admin/user-provisioning/scim",
      );
    });

    it("As LU I can see the help button attributes", () => {
      expect.assertions(2);
      const props = { shouldDisplayWarning: false };
      page = new DisplayScimSettingsAdministrationHelpPage(props);

      expect(page.helpBoxButton.getAttribute("target")).toEqual("_blank");
      expect(page.helpBoxButton.getAttribute("rel")).toEqual("noopener noreferrer");
    });
  });

  describe("As LU I can see a warning banner when secret is active", () => {
    it("As LU I can see the warning banner when shouldDisplayWarning is true", () => {
      expect.assertions(3);
      const props = { shouldDisplayWarning: true };
      page = new DisplayScimSettingsAdministrationHelpPage(props);

      expect(page.hasWarningBanner).toBeTruthy();
      expect(page.warningBanner).toBeDefined();
      expect(page.warningBanner.textContent).toContain(
        "Warning: if you think the secret has been compromised please regenerate and update it in your provider settings.",
      );
    });

    it("As LU I cannot see the warning banner when shouldDisplayWarning is false", () => {
      expect.assertions(1);
      const props = { shouldDisplayWarning: false };
      page = new DisplayScimSettingsAdministrationHelpPage(props);

      expect(page.hasWarningBanner).toBeFalsy();
    });
  });
});
