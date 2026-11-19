/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.11.0
 */

import { defaultAppContext } from "./ExtAppContext.test.data";
import ExtAppContextProvider from "./ExtAppContext";
import userSettingsFixture from "../test/fixture/Settings/userSettings";
import UserSettings from "../../shared/lib/Settings/UserSettings";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("ExtApp Context", () => {
  let extAppContext; // The extAppContext to text

  describe("As LU I should complete an authentication setup", () => {
    beforeEach(() => {
      extAppContext = new ExtAppContextProvider(defaultAppContext());
      const setStateMock = (state) => (extAppContext.state = Object.assign(extAppContext.state, state));
      jest.spyOn(extAppContext, "setState").mockImplementation(setStateMock);
    });

    it("As LU I should start with the state isSessionLogoutByUser false", () => {
      expect.assertions(1);
      // expectations
      expect(extAppContext.state.isSessionLogoutByUser).toBeFalsy();
    });

    it("As LU I should listen on expired session", () => {
      expect.assertions(3);
      // data mocked
      const callback = () => "Hello";
      // mock function
      jest.spyOn(extAppContext, "onExpiredSession");
      jest.spyOn(extAppContext.props.port, "on");
      // process
      extAppContext.onExpiredSession(callback);
      // expectations
      expect(extAppContext.onExpiredSession).toHaveBeenCalledWith(callback);
      expect(extAppContext.props.port.on).toHaveBeenCalledWith("passbolt.auth.after-logout", expect.any(Function));
      expect(extAppContext.state.isSessionLogoutByUser).toBeFalsy();
    });

    it("As LU I should logout with the state isSessionLogoutByUser true", () => {
      expect.assertions(1);
      // process
      extAppContext.onLogoutRequested();
      // expectations
      expect(extAppContext.state.isSessionLogoutByUser).toBeTruthy();
    });
  });
  describe("As LU I should get my user settings", () => {
    beforeEach(() => {
      extAppContext = new ExtAppContextProvider(defaultAppContext());
      const setStateMock = (state) => (extAppContext.state = Object.assign(extAppContext.state, state));
      jest.spyOn(extAppContext, "setState").mockImplementation(setStateMock);
      jest.spyOn(extAppContext.props.port, "request").mockImplementation(() => userSettingsFixture);
    });

    it("As LU I should get my user settings from the background page", async () => {
      expect.assertions(3);
      await extAppContext.getUserSettings();
      expect(extAppContext.props.port.request).toHaveBeenCalledWith("passbolt.user-settings.get-legacy-user-settings");
      expect(extAppContext.state.userSettings).toBeInstanceOf(UserSettings);
      expect(extAppContext.state.userSettings.getTrustedDomain()).toEqual(
        userSettingsFixture["user.settings.trustedDomain"],
      );
    });

    it("As LU I should get my user settings again when the accounts, the theme or the legacy storage change", () => {
      expect.assertions(1);
      jest.spyOn(extAppContext, "getUserSettings");
      const account = extAppContext.props.account;
      extAppContext.setState({ account });
      extAppContext.handleStorageChange({ accounts: { newValue: [] } });
      extAppContext.handleStorageChange({ [`theme-${account.id}`]: { newValue: { name: "midgar" } } });
      extAppContext.handleStorageChange({
        _passbolt_data: {
          oldValue: { config: userSettingsFixture },
          newValue: { config: { ...userSettingsFixture, "user.settings.securityToken.color": "#ff0000" } },
        },
      });
      expect(extAppContext.getUserSettings).toHaveBeenCalledTimes(3);
    });

    it("As LU I should not have an unhandled error if the user settings cannot be retrieved after a storage change", async () => {
      expect.assertions(1);
      const error = new Error("No account found.");
      jest.spyOn(extAppContext.props.port, "request").mockImplementation(() => Promise.reject(error));
      jest.spyOn(console, "error").mockImplementation(() => {});
      extAppContext.handleStorageChange({ accounts: { newValue: [] } });
      await Promise.resolve();
      await Promise.resolve();
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });
});
