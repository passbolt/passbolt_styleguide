/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */
import { defaultProps, propsWithHealthcheckApiBody } from "./DisplayHealthcheckAdministration.test.data";
import DisplayHealthcheckAdministrationPage from "./DisplayHealthcheckAdministration.test.page";
import { healthcheckChecksCollection } from "../../../contexts/Administration/AdministrationHealthcheckContext/AdministrationHealthcheckContext.test.data";
import {
  allPassHealthcheckApiBodyDto,
  defaultHealthcheckCheckDto,
  emptyHealthcheckApiBodyDto,
  mixedStatusHealthcheckApiBodyDto,
  nonContiguousHealthcheckApiBodyDto,
} from "../../../../shared/models/entity/healthcheck/healthcheck.test.data";

/**
 * The domains the page is expected to draw out of a response body, in the order it draws them.
 * @param {array} body
 * @returns {array<{key: string, title: string, checks: array}>}
 */
const domainsOf = (body) => healthcheckChecksCollection(body).groupByDomain();

describe("See the healthcheck settings", () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  describe("As AD, I should see the healthcheck the API reports", () => {
    let page, props, body, domains;

    beforeEach(() => {
      body = mixedStatusHealthcheckApiBodyDto();
      domains = domainsOf(body);
      props = propsWithHealthcheckApiBody(body);
      page = new DisplayHealthcheckAdministrationPage(props);
    });

    it("should render the panel and enable the refresh button", () => {
      expect.assertions(2);
      expect(page.exists()).toBeTruthy();
      expect(page.isRefreshButtonEnabled()).toBeTruthy();
    });

    it("should be able to refresh", async () => {
      expect.assertions(2);
      expect(props.adminHealthcheckContext.loadHealthcheckData).toHaveBeenCalledTimes(1);
      await page.click(page.toolbarActionsRefreshButton);
      // Should be called twice: first on render, second on refresh
      expect(props.adminHealthcheckContext.loadHealthcheckData).toHaveBeenCalledTimes(2);
    });

    it("should render one section per domain the API returned", () => {
      expect.assertions(2);
      expect(page.domainCount).toEqual(domains.length);
      expect(page.domains.every((_, domainIndex) => page.domainSection(domainIndex) !== null)).toBe(true);
    });

    it("should render the domains in the order the API returned them", () => {
      expect.assertions(1);
      expect(page.domainTitles).toEqual(domains.map((domain) => domain.title));
    });

    it("should render the checks of a domain together even when the API sent them apart", () => {
      expect.assertions(2);
      const apartBody = nonContiguousHealthcheckApiBodyDto();
      const apartPage = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(apartBody));
      expect(apartPage.domainCount).toEqual(2);
      expect(apartPage.checks(0)).toHaveLength(2);
    });

    it("should render every check of every domain, in the order the API returned them", () => {
      expect.assertions(domains.length * 2);
      domains.forEach((domain, domainIndex) => {
        expect(page.checks(domainIndex)).toHaveLength(domain.checks.length);
        expect(page.checks(domainIndex).map((_, checkIndex) => page.checkMessage(domainIndex, checkIndex))).toEqual(
          domain.checks.map((check) => check.message),
        );
      });
    });

    it("should give every check the badge of its status", () => {
      expect.assertions(1);
      const expected = domains
        .flatMap((domain) => domain.checks)
        .map((check) => `healthcheck-badge--${check.status === "pass" ? "success" : check.status}`);
      expect(page.allBadgeModifiers).toEqual(expected);
    });
  });

  describe("As AD, I should see the help of a check", () => {
    it("should list the help entries of every check in order, with their text", () => {
      const body = mixedStatusHealthcheckApiBodyDto();
      const domains = domainsOf(body);
      const page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(body));
      const checkCount = domains.reduce((count, domain) => count + domain.checks.length, 0);
      expect.assertions(checkCount);
      domains.forEach((domain, domainIndex) => {
        domain.checks.forEach((check, checkIndex) => {
          expect(page.helpEntries(domainIndex, checkIndex).map((entry) => entry.textContent)).toEqual(check.help);
        });
      });
    });

    it("should not render a help list on a check with no help", () => {
      expect.assertions(2);
      const body = [defaultHealthcheckCheckDto({ help: [] })];
      const page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(body));
      expect(page.checks(0)).toHaveLength(1);
      expect(page.helpList(0, 0)).toBeNull();
    });

    it("should show the help of a check reported as info", () => {
      expect.assertions(2);
      const help = ["See `timedatectl | grep -i -A 1 clock`."];
      const body = [defaultHealthcheckCheckDto({ key: "time-sync", status: "info", help })];
      const page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(body));
      expect(page.checkBadgeModifier(0, 0)).toEqual("healthcheck-badge--info");
      expect(page.helpEntries(0, 0).map((entry) => entry.textContent)).toEqual(help);
    });

    it("should render a URL of a help entry as a link opening in a new tab", () => {
      expect.assertions(4);
      const help = ["See. https://www.passbolt.com/help/tech/install#toc_gpg"];
      const body = [defaultHealthcheckCheckDto({ status: "error", help })];
      const page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(body));
      const links = page.helpLinks(0, 0);
      expect(links).toHaveLength(1);
      expect(links[0].getAttribute("href")).toEqual("https://www.passbolt.com/help/tech/install#toc_gpg");
      expect(links[0].getAttribute("target")).toEqual("_blank");
      expect(links[0].getAttribute("rel")).toEqual("noopener noreferrer");
    });

    it("should give the help list an id derived from the check key", () => {
      expect.assertions(1);
      const body = [defaultHealthcheckCheckDto({ key: "time-sync", help: ["See `timedatectl`."] })];
      const page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(body));
      expect(page.helpList(0, 0).id).toEqual("healthcheck-help-time-sync");
    });
  });

  describe("As AD, I should not see help I cannot act on", () => {
    const SAFE_ENTRIES = ["Run `bin/cake passbolt healthcheck`.", "See https://www.passbolt.com/docs/."];

    beforeEach(() => {
      jest.spyOn(console, "warn").mockImplementation(() => {});
      jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it.each(["https://[", "https://:80", "https://a:b:c"])(
      "should drop a help entry whose URL %s is rejected by sanitizeUrl, and keep the others",
      (rejectedUrl) => {
        expect.assertions(5);
        const rejectedEntry = `Set the full base url to ${rejectedUrl} to repair the installation.`;
        const help = [SAFE_ENTRIES[0], rejectedEntry, SAFE_ENTRIES[1]];
        const body = [defaultHealthcheckCheckDto({ key: "flux-capacitor", status: "error", help })];
        const page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(body));

        expect(page.helpEntries(0, 0).map((entry) => entry.textContent)).toEqual(SAFE_ENTRIES);
        expect(page.checks(0)[0].textContent).not.toContain(rejectedUrl);
        expect(page.checks(0)[0].textContent).not.toContain("to repair the installation");
        expect(page.helpLinks(0, 0).map((link) => link.getAttribute("href"))).toEqual([
          "https://www.passbolt.com/docs/",
        ]);
        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining(rejectedUrl));
      },
    );

    it("should render no help list when every entry of a check is unsafe, leaving badge and message", () => {
      expect.assertions(4);
      const help = ["Set the url to https://[.", "Or to https://:80."];
      const body = [defaultHealthcheckCheckDto({ key: "flux-capacitor", status: "error", message: "Broken.", help })];
      const page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(body));

      expect(page.helpList(0, 0)).toBeNull();
      expect(page.checks(0)[0].querySelectorAll("a")).toHaveLength(0);
      expect(page.checkBadgeModifier(0, 0)).toEqual("healthcheck-badge--error");
      expect(page.checkMessage(0, 0)).toEqual("Broken.");
    });

    it("should name the check whose help was dropped in the warning", () => {
      expect.assertions(1);
      const body = [defaultHealthcheckCheckDto({ key: "flux-capacitor", help: ["Set the url to https://[."] })];
      new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(body));
      expect(console.warn).toHaveBeenCalledWith(expect.stringMatching(/flux-capacitor.*https:\/\/\[/));
    });

    it.each([
      "ftp://files.example.com/key.asc",
      "ldap://directory.example.com:389",
      "javascript:alert(1)",
      "file:///etc/passwd",
    ])("should keep a help entry carrying %s, shown as plain text rather than hidden", (ignoredUrl) => {
      expect.assertions(3);
      const entry = `Fetch it from ${ignoredUrl} before retrying.`;
      const body = [defaultHealthcheckCheckDto({ key: "flux-capacitor", status: "error", help: [entry] })];
      const page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(body));

      expect(page.helpEntries(0, 0).map((helpEntry) => helpEntry.textContent)).toEqual([entry]);
      expect(page.helpLinks(0, 0)).toHaveLength(0);
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe("As AD, I should see the states the panel can be in", () => {
    it("should display the spinner while the healthcheck is being processed", () => {
      expect.assertions(1);
      const props = defaultProps({
        adminHealthcheckContext: { isProcessing: jest.fn(() => true) },
      });
      const page = new DisplayHealthcheckAdministrationPage(props);
      expect(page.domainCount).toEqual(0);
    });

    it("should display the empty state when the API returned no healthcheck at all", () => {
      expect.assertions(2);
      const page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(emptyHealthcheckApiBodyDto()));
      expect(page.domainCount).toEqual(0);
      expect(page.emptyState).not.toBeNull();
    });

    it("should display the disabled message and disable refresh when the endpoint is off", () => {
      expect.assertions(3);
      const props = defaultProps({
        adminHealthcheckContext: { isHealthcheckEndpointEnabled: jest.fn(() => false) },
      });
      const page = new DisplayHealthcheckAdministrationPage(props);
      expect(page.domainCount).toEqual(0);
      expect(page.endpointDisabledMessage).not.toBeNull();
      expect(page.isRefreshButtonEnabled()).toBeFalsy();
    });

    it("should render every domain of an all passing instance with the success badge", () => {
      expect.assertions(1);
      const page = new DisplayHealthcheckAdministrationPage(
        propsWithHealthcheckApiBody(allPassHealthcheckApiBodyDto()),
      );
      expect(new Set(page.allBadgeModifiers)).toEqual(new Set(["healthcheck-badge--success"]));
    });
  });

  describe("As AD, I should see a legend that explains the status badges", () => {
    let page;

    beforeEach(() => {
      page = new DisplayHealthcheckAdministrationPage(propsWithHealthcheckApiBody(mixedStatusHealthcheckApiBodyDto()));
    });

    it("should render one badge per status, in the order success, warning, error, info", () => {
      expect.assertions(1);
      expect(page.legendBadgeModifiers).toEqual([
        "healthcheck-badge--success",
        "healthcheck-badge--warning",
        "healthcheck-badge--error",
        "healthcheck-badge--info",
      ]);
    });
  });
});
