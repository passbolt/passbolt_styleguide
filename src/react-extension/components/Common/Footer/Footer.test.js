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
 * Unit tests on Footer in regard of specifications
 */

import FooterPage from "./Footer.test.page";
import {
  cloudProps,
  communityEditionProps,
  defaultProps,
  selfHostedSecureProps,
  withClientAndServerVersionProps,
  withClientVersionOnlyProps,
} from "./Footer.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("Footer", () => {
  describe("As LU I can see the application edition in the footer", () => {
    it("As LU I should see the Pro Edition label pro instance", () => {
      expect.assertions(2);

      const props = selfHostedSecureProps();
      const page = new FooterPage(props.context, props);

      expect(page.exists()).toBeTruthy();
      expect(page.editionLabel).toBe("Pro Edition");
    });

    it("As LU I should see the Community Edition label on a community instance", () => {
      expect.assertions(2);

      const props = communityEditionProps();
      const page = new FooterPage(props.context, props);

      expect(page.editionLabel).toBe("Community Edition");
      expect(page.editionText).toContain("(free)");
    });

    it("As LU I should see the Cloud label on a passbolt cloud instance", () => {
      expect.assertions(1);

      const props = cloudProps();
      const page = new FooterPage(props.context, props);

      expect(page.editionLabel).toBe("Cloud");
    });
  });

  describe("As LU I can see the version information in the footer tooltip", () => {
    it("As LU I should see the client and server versions", () => {
      expect.assertions(3);

      const props = withClientAndServerVersionProps();
      const page = new FooterPage(props.context, props);

      expect(page.versionsText).toContain("Client 4.10.0");
      expect(page.versionsText).toContain("Server 3.5.0");
      expect(page.versionsDivider).not.toBeNull();
    });

    it("As LU I should see only the server version when the client version is not available", () => {
      expect.assertions(3);

      const props = defaultProps();
      const page = new FooterPage(props.context, props);

      expect(page.versionsText).toContain("Server 3.5.0");
      expect(page.versionsText).not.toContain("Client");
      expect(page.versionsDivider).toBeNull();
    });

    it("As LU I should see only the client version when the server version is not available", () => {
      expect.assertions(3);

      const props = withClientVersionOnlyProps();
      const page = new FooterPage(props.context, props);

      expect(page.versionsText).toContain("Client 4.10.0");
      expect(page.versionsText).not.toContain("Server");
      expect(page.versionsDivider).toBeNull();
    });
  });

  describe("As LU I can identify an unsafe instance from the footer", () => {
    it("As LU I should see the unsafe mode banner when the instance is served over http", () => {
      expect.assertions(2);

      const props = defaultProps();
      const page = new FooterPage(props.context, props);

      expect(page.unsafeModeLink).not.toBeNull();
      expect(page.unsafeModeLink.getAttribute("href")).toBe(
        "https://www.passbolt.com/docs/hosting/faq/why-I-see-unsafe-mode-banner/",
      );
    });

    it("As LU I should not see the unsafe mode banner on a secure instance", () => {
      expect.assertions(1);

      const props = selfHostedSecureProps();
      const page = new FooterPage(props.context, props);

      expect(page.unsafeModeLink).toBeNull();
    });
  });

  describe("As LU I can access the credits page from the footer", () => {
    it("As LU I should see the credits link pointing to the passbolt credits page", () => {
      expect.assertions(3);

      const props = defaultProps();
      const page = new FooterPage(props.context, props);

      expect(page.creditsLink).not.toBeNull();
      expect(page.creditsLink.getAttribute("href")).toBe("https://www.passbolt.com/terms");
      expect(page.creditsLink.getAttribute("target")).toBe("_blank");
    });
  });
});
