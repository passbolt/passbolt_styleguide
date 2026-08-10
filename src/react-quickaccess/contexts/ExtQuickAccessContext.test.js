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
 * @since         6.0.0
 */

import { ExtQuickAccessContextProvider } from "./ExtQuickAccessContext";
import { defaultAppContext } from "./AppContext.test.data";
import siteSettingsFixture from "../../react-extension/test/fixture/Settings/siteSettings";
import { BOOTSTRAP_FEATURE } from "../ExtQuickAccess";
import { defaultUserDto, defaultAdminUserDto } from "../../shared/models/entity/user/userEntity.test.data";
import { RBAC_FIND_ME } from "../../shared/services/serviceWorker/rbac/rbacServiceWorkerService";
import SiteSettingsEntity from "../../shared/models/entity/siteSettings/siteSettingsEntity";
import { defaultOfflineSettingsDto } from "../../shared/models/entity/offline/offlineSettingsEntity.test.data";
import { OFFLINE_GET_OR_FIND_OFFLINE_SETTINGS_EVENT } from "../../shared/services/serviceWorker/offline/offlineModeSettingsServiceWorkerService";
import UserActiveSessionEntity from "../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../shared/models/entity/session/userActiveSessionEntity.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("ExtQuickAccess Context", () => {
  let extQuickAccessContext; // The extQuickAccessContext to text

  describe("As LU I should complete an authentication setup", () => {
    beforeEach(() => {
      extQuickAccessContext = new ExtQuickAccessContextProvider(defaultAppContext());
      const setStateMock = (state) => (extQuickAccessContext.state = Object.assign(extQuickAccessContext.state, state));
      jest.spyOn(extQuickAccessContext, "setState").mockImplementation(setStateMock);
    });

    it("As LU I should update the state setWindowBlurBehaviour true", () => {
      expect.assertions(1);
      // process
      extQuickAccessContext.setWindowBlurBehaviour(true);
      // expectations
      expect(extQuickAccessContext.state.shouldCloseAtWindowBlur).toBeTruthy();
    });

    it("As LU I should update the state search", () => {
      expect.assertions(1);
      // process
      extQuickAccessContext.updateSearch("search");
      // expectations
      expect(extQuickAccessContext.state.search).toStrictEqual("search");
    });

    it("As LU I should be able to login without bootstrap feature login", async () => {
      expect.assertions(4);
      // 1st call get site settings after login
      jest.spyOn(extQuickAccessContext.state.port, "request").mockImplementationOnce(() => siteSettingsFixture);
      // 2nd call get user me
      jest.spyOn(extQuickAccessContext.state.port, "request").mockImplementationOnce(() => defaultUserDto());
      // 3rd call get RBAC
      jest.spyOn(extQuickAccessContext.state.port, "request").mockImplementationOnce(() => []);

      // process
      await extQuickAccessContext.loginOnlineSuccessCallBack();
      // expectations
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledTimes(3);
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledWith("passbolt.site-settings.get-or-find");
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledWith("passbolt.users.find-logged-in-user");
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledWith(RBAC_FIND_ME);
    });

    it("As LU I should be able to login with bootstrap feature login", async () => {
      expect.assertions(1);
      extQuickAccessContext.props.bootstrapFeature = BOOTSTRAP_FEATURE.LOGIN;
      jest.spyOn(window, "close");
      // process
      await extQuickAccessContext.loginOnlineSuccessCallBack();
      // expectations
      expect(window.close).toHaveBeenCalledTimes(1);
    });

    it("As LU I should be able to login offline", async () => {
      expect.assertions(2);
      jest.spyOn(extQuickAccessContext.state.port, "request").mockImplementationOnce(() => siteSettingsFixture);
      jest.spyOn(extQuickAccessContext.state.port, "request").mockImplementationOnce(() => defaultUserDto());
      jest.spyOn(extQuickAccessContext.state.port, "request").mockImplementationOnce(() => []);
      // process
      await extQuickAccessContext.loginOfflineSuccessCallBack();
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledWith("passbolt.site-settings.get-or-find");
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledWith("passbolt.users.find-logged-in-user");
    });

    it("As LU I should be able to login offline with bootstrap feature login", async () => {
      expect.assertions(2);
      extQuickAccessContext.props.bootstrapFeature = BOOTSTRAP_FEATURE.LOGIN;
      jest.spyOn(window, "close");
      jest.spyOn(extQuickAccessContext.state.port, "request").mockImplementation(() => siteSettingsFixture);
      // process
      await extQuickAccessContext.loginOfflineSuccessCallBack();
      // expectations
      expect(window.close).toHaveBeenCalledTimes(1);
      expect(extQuickAccessContext.state.port.request).not.toHaveBeenCalled();
    });

    it("As LU I should be redirected to mfa page is it's required", async () => {
      expect.assertions(2);
      jest.spyOn(extQuickAccessContext.state.port, "request").mockImplementationOnce(jest.fn());
      jest.spyOn(window, "close");
      // process
      await extQuickAccessContext.redirectToMfaAuthentication();
      // expectations
      expect(extQuickAccessContext.state.port.request).toHaveBeenNthCalledWith(1, "passbolt.tabs.open-trusted-domain");
      expect(window.close).toHaveBeenCalledTimes(1);
    });
  });

  describe("As LU I should resolve the offline mode capability", () => {
    let context;

    beforeEach(() => {
      context = new ExtQuickAccessContextProvider(defaultAppContext());
      const setStateMock = (state) => (context.state = Object.assign(context.state, state));
      jest.spyOn(context, "setState").mockImplementation(setStateMock);
    });

    const siteSettings = () => new SiteSettingsEntity(siteSettingsFixture);

    const siteSettingsWithoutOfflineMode = () => {
      const settings = JSON.parse(JSON.stringify(siteSettingsFixture));
      settings.passbolt.plugins.offlineMode.enabled = false;
      return new SiteSettingsEntity(settings);
    };

    /**
     * Mock the service worker reads behind the capability, each overridable per test.
     * @param {object} [overrides={}] Keyed by port event.
     * @returns {void}
     */
    const mockPort = (overrides = {}) => {
      const responses = {
        [OFFLINE_GET_OR_FIND_OFFLINE_SETTINGS_EVENT]: defaultOfflineSettingsDto(),
        "passbolt.users.find-logged-in-user": defaultAdminUserDto(),
        [RBAC_FIND_ME]: [],
        ...overrides,
      };
      jest.spyOn(context.state.port, "request").mockImplementation((event) => {
        const response = responses[event];
        return response instanceof Error ? Promise.reject(response) : Promise.resolve(response);
      });
    };

    it("sets canUseOfflineMode to false when the offline mode plugin is disabled", async () => {
      expect.assertions(1);
      mockPort();

      await context.resolveCanUseOfflineMode(siteSettingsWithoutOfflineMode());

      expect(context.state.canUseOfflineMode).toBe(false);
    });

    it("sets canUseOfflineMode to false when the organisation has no offline settings", async () => {
      /*
       * `canIUse("offlineMode")` only reports the plugin feature flag; disabling offline mode at the org
       * level makes the API serve no offline settings instead. Without this gate an offline-eligible user
       * whose offline session merely expired still reaches the offline login page, because that path
       * retains the user and rbac storages rather than flushing them the way a logout does.
       */
      expect.assertions(2);
      mockPort({ [OFFLINE_GET_OR_FIND_OFFLINE_SETTINGS_EVENT]: null });

      await context.resolveCanUseOfflineMode(siteSettings());

      expect(context.state.canUseOfflineMode).toBe(false);
      expect(context.state.offlineSettings).toBeNull();
    });

    it("sets canUseOfflineMode to true for an eligible user when offline mode is enabled", async () => {
      expect.assertions(1);
      mockPort();

      await context.resolveCanUseOfflineMode(siteSettings());

      expect(context.state.canUseOfflineMode).toBe(true);
    });

    it("sets canUseOfflineMode to false when there is no logged-in user available locally", async () => {
      expect.assertions(1);
      // Offline settings resolve, so the user lookup is the branch under test.
      mockPort({ "passbolt.users.find-logged-in-user": null });

      await context.resolveCanUseOfflineMode(siteSettings());

      expect(context.state.canUseOfflineMode).toBe(false);
    });

    it("sets canUseOfflineMode to false when the capability resolution fails", async () => {
      expect.assertions(1);
      jest.spyOn(console, "error").mockImplementation(() => {});
      mockPort({ "passbolt.users.find-logged-in-user": new Error() });

      await context.resolveCanUseOfflineMode(siteSettings());

      expect(context.state.canUseOfflineMode).toBe(false);
    });
  });

  describe("As LU the quickaccess should be ready to render", () => {
    let context;

    beforeEach(() => {
      context = new ExtQuickAccessContextProvider(defaultAppContext());
      // Everything but the offline capability is resolved (locale defaults to "en-UK").
      context.state.userSettings = {};
      context.state.siteSettings = {};
    });

    it("is not ready on an unreachable session until the offline capability is resolved", () => {
      expect.assertions(2);
      context.props.activeSession = new UserActiveSessionEntity(
        defaultUserActiveSessionDto({ is_server_reachable: false }),
      );

      expect(context.isReady()).toBe(false);
      context.state.canUseOfflineMode = false;
      expect(context.isReady()).toBe(true);
    });
  });
});
