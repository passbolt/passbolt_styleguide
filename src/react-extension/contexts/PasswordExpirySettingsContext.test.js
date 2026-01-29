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
 * @since         4.4.0
 */

import { PasswordExpirySettingsContextProvider } from "./PasswordExpirySettingsContext";
import {
  defaultPasswordExpirySettingsEntityDto,
  passwordExpirySettingsEntityDtoFromApi,
} from "../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";
import { defaultProps } from "./PasswordExpirySettingsContext.test.data";
import { v4 as uuid } from "uuid";
import { waitFor } from "@testing-library/dom";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("PasswordExpirySettingsContext", () => {
  describe("::findSettings", () => {
    it("should not call for passbolt.password-expiry.get-or-find if the feature flag is disabled", async () => {
      expect.assertions(1);

      const props = defaultProps();
      props.context.siteSettings.canIUse = () => false;

      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () => {
        throw new Error("Shouldn't not be called");
      });

      const context = new PasswordExpirySettingsContextProvider(props);
      mockState(context);

      await context.findSettings();
      expect(context.getSettings()).toStrictEqual(null);
    });

    it("should call for passbolt.password-expiry.get-or-find to retrieve the settings", async () => {
      expect.assertions(1);

      const expectedSettings = defaultPasswordExpirySettingsEntityDto();

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () => expectedSettings);

      const context = new PasswordExpirySettingsContextProvider(props);
      mockState(context);

      await context.findSettings();
      expect(context.getSettings()).toStrictEqual(expectedSettings);
    });

    it("should not called twice passbolt.password-expiry.get-or-find", async () => {
      expect.assertions(2);

      const expectedSettings = defaultPasswordExpirySettingsEntityDto();

      let callCount = 0;
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () => {
        callCount++;
        return expectedSettings;
      });

      const context = new PasswordExpirySettingsContextProvider(props);
      mockState(context);

      await context.findSettings();
      await context.findSettings();
      expect(context.getSettings()).toStrictEqual(expectedSettings);
      expect(callCount).toStrictEqual(1);
    });
  });

  describe("::getSettings", () => {
    it("should return the `settings` value", async () => {
      expect.assertions(1);

      const props = defaultProps();
      const context = new PasswordExpirySettingsContextProvider(props);
      mockState(context);

      const expectedSettings = { id: uuid() };

      context.setState({
        settings: expectedSettings,
      });

      expect(context.getSettings()).toStrictEqual(expectedSettings);
    });
  });

  describe("::isFeatureEnabled", () => {
    it("should return false if the feature flag is disabled", async () => {
      expect.assertions(1);

      const props = defaultProps();
      props.context.siteSettings.canIUse = () => false;

      const context = new PasswordExpirySettingsContextProvider(props);
      expect(context.isFeatureEnabled()).toStrictEqual(false);
    });

    it("should return false if the feature flag is enabled but settings is disabled", async () => {
      expect.assertions(1);

      const expectedSettings = defaultPasswordExpirySettingsEntityDto();

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () => expectedSettings);

      const context = new PasswordExpirySettingsContextProvider(props);
      mockState(context);

      await context.findSettings();
      expect(context.isFeatureEnabled()).toStrictEqual(false);
    });

    it("should return true if the feature flag is enabled and settings is enabled", async () => {
      expect.assertions(1);

      const expectedSettings = passwordExpirySettingsEntityDtoFromApi();

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", () => expectedSettings);

      const context = new PasswordExpirySettingsContextProvider(props);
      mockState(context);

      await context.findSettings();
      expect(context.isFeatureEnabled()).toStrictEqual(true);
    });
  });

  describe("::getDefaultExpirationDate", () => {
    it("should return null if the feature flag is disabled", async () => {
      expect.assertions(1);

      const props = defaultProps();
      props.context.siteSettings.canIUse = () => false;

      const context = new PasswordExpirySettingsContextProvider(props);
      expect(context.getDefaultExpirationDate()).toStrictEqual(null);
    });

    it("should return 0 if there is no settings set", async () => {
      expect.assertions(1);

      const props = defaultProps();
      props.context.siteSettings.canIUse = () => true;

      const context = new PasswordExpirySettingsContextProvider(props);
      expect(context.getDefaultExpirationDate()).toStrictEqual(null);
    });

    // @todo move this to a service
    it("should return the date from the settings", async () => {
      expect.assertions(1);

      jest.useFakeTimers().setSystemTime(new Date("2024-01-01T00:00:00.000Z"));

      const expectedPeriod = 5;
      const expectedSettings = defaultPasswordExpirySettingsEntityDto({
        default_expiry_period: expectedPeriod,
      });

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.password-expiry.get-or-find", async () => expectedSettings);

      const context = new PasswordExpirySettingsContextProvider(props);
      mockState(context);

      const findSettingsPromise = context.findSettings();
      await waitFor(() => {});
      jest.runAllTimers();
      await findSettingsPromise;
      const expectedDefaultDate = "2024-01-06T00:00:00.000Z";
      expect(context.getDefaultExpirationDate()).toStrictEqual(expectedDefaultDate);
    });
  });
});

function mockState(contextProvider) {
  const setStateMock = (state) => {
    let newState;
    if (typeof state === "function") {
      newState = state(contextProvider.state);
    } else {
      newState = state;
    }
    contextProvider.state = Object.assign(contextProvider.state, newState);
  };
  jest.spyOn(contextProvider, "setState").mockImplementation(setStateMock);
}
