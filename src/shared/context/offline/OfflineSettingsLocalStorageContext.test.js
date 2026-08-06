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

import { act } from "@testing-library/react";
import mockComponentSetState from "../../../react-extension/test/mock/components/React/mockSetState";
import { defaultProps } from "./OfflineSettingsLocalStorageContext.test.data";
import { OfflineSettingsLocalStorageContextProvider } from "./OfflineSettingsLocalStorageContext";
import {
  defaultOfflineSettingsDto,
  defaultOfflineSettingsDtoFromApi,
} from "../../models/entity/offline/offlineSettingsEntity.test.data";
import OfflineSettingsEntity from "../../models/entity/offline/offlineSettingsEntity";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("OfflineSettingsLocalStorageContext", () => {
  describe("::constructor", () => {
    it("should initialise the default state and handlers", () => {
      expect.assertions(3);

      const contextProvider = new OfflineSettingsLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeUndefined();
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();
      expect(contextProvider.state).toMatchObject({
        get: expect.any(Function),
        offlineSettings: undefined,
        getOrFind: expect.any(Function),
      });
    });
  });

  describe("::componentDidMount", () => {
    it("should listen to the expected event", () => {
      expect.assertions(2);

      const contextProvider = new OfflineSettingsLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.componentDidMount();

      const callbacks = contextProvider.props.context.storage.changeCallbacks;
      expect(callbacks.length).toStrictEqual(1);
      expect(callbacks[0]).toStrictEqual(contextProvider.handleStorageChange);
    });
  });

  describe("::componentWillUnmount", () => {
    it("should listen to the expected event", () => {
      expect.assertions(2);

      const contextProvider = new OfflineSettingsLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.componentDidMount();
      expect(contextProvider.props.context.storage.changeCallbacks.length).toStrictEqual(1);

      contextProvider.componentWillUnmount();
      expect(contextProvider.props.context.storage.changeCallbacks.length).toStrictEqual(0);
    });
  });

  describe("::handleStorageChange", () => {
    it("should update the current state with the changed offline settings", () => {
      expect.assertions(1);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      const expectedOfflineSettings = defaultOfflineSettingsDto();

      contextProvider.handleStorageChange({
        [contextProvider.storageKey]: {
          newValue: expectedOfflineSettings,
        },
      });

      expect(contextProvider.state.offlineSettings.toDto()).toStrictEqual(expectedOfflineSettings);
    });

    it("should update the current state with the changed offline settings flushed", () => {
      expect.assertions(1);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      // Simulate a browser.storage.local.remove, newValue is undefined, oldValue is defined
      contextProvider.handleStorageChange({
        [contextProvider.storageKey]: {
          oldValue: {},
        },
      });

      expect(contextProvider.state.offlineSettings).toBeNull();
    });

    it("should ignore storage change event that are not related to offline settings", () => {
      expect.assertions(1);

      const contextProvider = new OfflineSettingsLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.handleStorageChange({
        test: "something",
      });

      expect(contextProvider.setState).not.toHaveBeenCalled();
    });
  });

  describe("::get", () => {
    it("should return the offline settings if the state have been initialised already", () => {
      expect.assertions(1);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      const expectedOfflineSettings = defaultOfflineSettingsDto();

      contextProvider.handleStorageChange({
        [contextProvider.storageKey]: {
          newValue: expectedOfflineSettings,
        },
      });

      expect(contextProvider.get().toDto()).toStrictEqual(expectedOfflineSettings);
    });

    it("should return null if the state hasn't been initialized yet and set a blocking promise while the init occurs", async () => {
      expect.assertions(3);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      jest
        .spyOn(contextProvider.offlineModeSettingsServiceWorker, "getOrFindSettings")
        .mockImplementation(() => new Promise(() => {}));

      props.context.storage.local.set({ [contextProvider.storageKey]: null });

      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();

      const result = await act(async () => contextProvider.get());

      expect(result).toBeNull();
      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();
    });
  });

  describe("::set", () => {
    it("should set the offline settings from a dto", () => {
      expect.assertions(2);

      const offlineSettings = defaultOfflineSettingsDto();

      const contextProvider = new OfflineSettingsLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.offlineSettings).toBeUndefined();
      contextProvider.set(offlineSettings);

      expect(contextProvider.state.offlineSettings.toDto()).toStrictEqual(offlineSettings);
    });

    it("should set the offline settings from an entity", () => {
      expect.assertions(2);

      const offlineSettingsDto = defaultOfflineSettingsDto();
      const offlineSettingsEntity = new OfflineSettingsEntity(offlineSettingsDto);

      const contextProvider = new OfflineSettingsLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.offlineSettings).toBeUndefined();
      contextProvider.set(offlineSettingsEntity);

      expect(contextProvider.state.offlineSettings.toDto()).toStrictEqual(offlineSettingsEntity.toDto());
    });
  });

  describe("::getOrFind", () => {
    it("should call the service worker with the right event to trigger the local storage update.", async () => {
      expect.assertions(3);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      const expectedOfflineSettings = defaultOfflineSettingsDtoFromApi();
      const spyOnGetOrFind = jest
        .spyOn(contextProvider.offlineModeSettingsServiceWorker, "getOrFindSettings")
        .mockImplementation(async () => expectedOfflineSettings);

      await contextProvider.getOrFind();

      expect(spyOnGetOrFind).toHaveBeenCalledTimes(1);
      expect(contextProvider.state.offlineSettings.toDto()).toStrictEqual(
        new OfflineSettingsEntity(expectedOfflineSettings).toDto(),
      );
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();
    });

    it("should do nothing if the service worker throw an error.", async () => {
      expect.assertions(3);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      const spyOnGetOrFind = jest
        .spyOn(contextProvider.offlineModeSettingsServiceWorker, "getOrFindSettings")
        .mockImplementation(async () => {
          throw new Error("Error occurred.");
        });

      await contextProvider.getOrFind();

      expect(spyOnGetOrFind).toHaveBeenCalledTimes(1);
      expect(contextProvider.state.offlineSettings).toBeUndefined();
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();
    });

    it("should not call the service worker twice if a pending promise is running.", async () => {
      expect.assertions(4);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      let resolveGetOrFindSettings;
      const spyOnGetOrFind = jest
        .spyOn(contextProvider.offlineModeSettingsServiceWorker, "getOrFindSettings")
        .mockImplementation(() => new Promise((resolve) => (resolveGetOrFindSettings = resolve)));

      const firstUpdate = contextProvider.getOrFind();
      expect(spyOnGetOrFind).toHaveBeenCalledTimes(1);

      const secondUpdate = contextProvider.getOrFind();
      expect(spyOnGetOrFind).toHaveBeenCalledTimes(1);

      resolveGetOrFindSettings(defaultOfflineSettingsDtoFromApi());
      await Promise.all([firstUpdate, secondUpdate]);

      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();

      const thirdUpdate = contextProvider.getOrFind();
      expect(spyOnGetOrFind).toHaveBeenCalledTimes(2);

      resolveGetOrFindSettings(defaultOfflineSettingsDtoFromApi());
      await thirdUpdate;
    });

    it("should call the service worker again if the promise has been resolved.", async () => {
      expect.assertions(5);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      const spyOnGetOrFind = jest
        .spyOn(contextProvider.offlineModeSettingsServiceWorker, "getOrFindSettings")
        .mockImplementation(async () => defaultOfflineSettingsDtoFromApi());

      const firstUpdate = contextProvider.getOrFind();
      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();
      expect(spyOnGetOrFind).toHaveBeenCalledTimes(1);

      contextProvider.getOrFind();
      expect(spyOnGetOrFind).toHaveBeenCalledTimes(1);

      await firstUpdate;

      // promise should be reinit now;
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();

      await contextProvider.getOrFind();
      expect(spyOnGetOrFind).toHaveBeenCalledTimes(2);
    });
  });
});
