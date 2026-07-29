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
import { defaultUserDto } from "../../shared/models/entity/user/userEntity.test.data";
import { RBAC_FIND_ME } from "../../shared/services/serviceWorker/rbac/rbacServiceWorkerService";

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
      await extQuickAccessContext.loginSuccessCallback();
      // expectations
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledTimes(3);
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledWith("passbolt.site-settings.get-or-find", true);
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledWith("passbolt.users.find-logged-in-user");
      expect(extQuickAccessContext.state.port.request).toHaveBeenCalledWith(RBAC_FIND_ME);
    });

    it("As LU I should be able to login with bootstrap feature login", () => {
      expect.assertions(1);
      extQuickAccessContext.props.bootstrapFeature = BOOTSTRAP_FEATURE.LOGIN;
      jest.spyOn(window, "close");
      // process
      extQuickAccessContext.loginSuccessCallback();
      // expectations
      expect(window.close).toHaveBeenCalledTimes(1);
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
});
