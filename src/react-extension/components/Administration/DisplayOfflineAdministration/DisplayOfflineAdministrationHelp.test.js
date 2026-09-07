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
 * @since         5.13.0
 */

import DisplayOfflineAdministrationHelpPage from "./DisplayOfflineAdministrationHelp.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the offline mode administration help", () => {
  let page;

  // TODO: restore when help section is updated with documentation
  /* eslint-disable jest/no-commented-out-tests */
  /*
    describe("As LU I can access the help page", () => {
    it("As LU I can see the help section with documentation link", () => {
      expect.assertions(6);
      const props = { shouldDisplayWarning: false };
      page = new DisplayOfflineAdministrationHelpPage(props);

      expect(page.exists()).toBeTruthy();
      expect(page.helpBox).toBeDefined();
      expect(page.helpBoxTitle.textContent).toEqual("Need help?");
      expect(page.helpBoxDescription[0].textContent).toEqual("Check out the offline mode documentation.");
      expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
      expect(page.helpBoxButton.getAttribute("href")).toEqual("");
    });

    it("As LU I can see the help button attributes", () => {
      expect.assertions(2);
      const props = { shouldDisplayWarning: false };
      page = new DisplayOfflineAdministrationHelpPage(props);

      expect(page.helpBoxButton.getAttribute("target")).toEqual("_blank");
      expect(page.helpBoxButton.getAttribute("rel")).toEqual("noopener noreferrer");
    });
  });*/

  describe("As LU I can see a warning banner when offline mode is active", () => {
    it("As LU I can see the warning banner when shouldDisplayWarning is true", () => {
      expect.assertions(3);
      const props = { shouldDisplayWarning: true };
      page = new DisplayOfflineAdministrationHelpPage(props);

      expect(page.hasWarningBanner).toBeTruthy();
      expect(page.warningBanner).toBeDefined();
      expect(page.warningBanner.textContent).toContain(
        "Warning: Enabling offline mode allows encrypted data to be cached on user devices. Make sure your retention and session policies align with your organisation security requirements.",
      );
    });

    it("As LU I cannot see the warning banner when shouldDisplayWarning is false", () => {
      expect.assertions(1);
      const props = { shouldDisplayWarning: false };
      page = new DisplayOfflineAdministrationHelpPage(props);

      expect(page.hasWarningBanner).toBeFalsy();
    });
  });
});
