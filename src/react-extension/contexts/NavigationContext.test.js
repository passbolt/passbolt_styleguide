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
 * @since         5.14.6
 */

import { NavigationContextProvider } from "./NavigationContext";

/**
 * Build a provider instance with mocked router and application context props.
 * @param {object} context The application context to inject
 * @returns {NavigationContextProvider}
 */
function buildProvider(context = {}) {
  const props = {
    context: {
      name: "browser-extension",
      port: { request: jest.fn() },
      trustedDomain: "https://passbolt.local",
      userSettings: null,
      ...context,
    },
    history: { push: jest.fn() },
  };
  return new NavigationContextProvider(props);
}

describe("NavigationContext", () => {
  let openSpy;

  beforeEach(() => {
    openSpy = jest.spyOn(window, "open").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("goTo", () => {
    it("navigates within the same application using the router history", async () => {
      expect.assertions(2);
      const provider = buildProvider({ name: "browser-extension" });

      await provider.goTo("browser-extension", "/app/passwords");

      expect(provider.props.history.push).toHaveBeenCalledWith({ pathname: "/app/passwords" });
      expect(openSpy).not.toHaveBeenCalled();
    });

    it("delegates to the browser extension port when navigating to an api served page", async () => {
      expect.assertions(2);
      const provider = buildProvider({ name: "browser-extension" });

      await provider.goTo("api", "/app/administration/mfa");

      expect(provider.props.context.port.request).toHaveBeenCalledWith(
        "passbolt.tabs.open-admin-page",
        "/app/administration/mfa",
      );
      expect(openSpy).not.toHaveBeenCalled();
    });

    it("opens the trusted domain url when switching application from the api", async () => {
      expect.assertions(1);
      const provider = buildProvider({ name: "api", trustedDomain: "https://passbolt.local" });

      await provider.goTo("browser-extension", "/app/passwords");

      expect(openSpy).toHaveBeenCalledWith("https://passbolt.local/app/passwords", "_parent", "noopener,noreferrer");
    });

    it("throws and does not navigate when the pathname is not in the allowed list", async () => {
      expect.assertions(4);
      const provider = buildProvider({ name: "browser-extension" });

      await expect(provider.goTo("browser-extension", "https://evil.com")).rejects.toThrow(
        "The pathname is not part of the allowed list of pathnames.",
      );
      expect(provider.props.history.push).not.toHaveBeenCalled();
      expect(provider.props.context.port.request).not.toHaveBeenCalled();
      expect(openSpy).not.toHaveBeenCalled();
    });

    it("throws when a crafted pathname tries to reach the trusted domain window.open branch", async () => {
      expect.assertions(2);
      const provider = buildProvider({ name: "api", trustedDomain: "https://passbolt.local" });

      await expect(provider.goTo("browser-extension", "@evil.com")).rejects.toThrow(
        "The pathname is not part of the allowed list of pathnames.",
      );
      expect(openSpy).not.toHaveBeenCalled();
    });
  });

  describe("external links open constant, trusted destinations", () => {
    it("opens the help documentation in a new tab", async () => {
      expect.assertions(1);
      const provider = buildProvider();

      await provider.onGoToHelpRequested();

      expect(openSpy).toHaveBeenCalledWith("https://www.passbolt.com/docs/", "_blank", "noopener,noreferrer");
    });

    it("opens the terms page in a new tab", async () => {
      expect.assertions(1);
      const provider = buildProvider();

      await provider.onGoToTermsRequested();

      expect(openSpy).toHaveBeenCalledWith("https://www.passbolt.com/terms", "_blank", "noopener,noreferrer");
    });

    it("opens the subscription update quantity page with encoded parameters", async () => {
      expect.assertions(1);
      const provider = buildProvider();

      await provider.onGoToSubscriptionUpdateQuantityRequested("sub 1&x", "cust/2");

      expect(openSpy).toHaveBeenCalledWith(
        "https://www.passbolt.com/subscription/ee/update/qty?subscription_id=sub%201%26x&customer_id=cust%2F2",
        "_blank",
        "noopener,noreferrer",
      );
    });

    it("opens the subscription renew page with encoded parameters", async () => {
      expect.assertions(1);
      const provider = buildProvider();

      await provider.onGoToSubscriptionRenewRequested("sub 1&x", "cust/2");

      expect(openSpy).toHaveBeenCalledWith(
        "https://www.passbolt.com/subscription/ee/update/renew?subscription_id=sub%201%26x&customer_id=cust%2F2",
        "_blank",
        "noopener,noreferrer",
      );
    });
  });
});
