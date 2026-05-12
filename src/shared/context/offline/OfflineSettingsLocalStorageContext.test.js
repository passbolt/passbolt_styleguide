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
import { OFFLINE_FIND_SETTINGS_EVENT } from "../../services/serviceWorker/offline/offlineModeSettingsServiceWorkerService";
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
        offlineSettings: null,
        updateLocalStorage: expect.any(Function),
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

      expect(contextProvider.state.offlineSettings).toBeNull();
      contextProvider.set(offlineSettings);

      expect(contextProvider.state.offlineSettings.toDto()).toStrictEqual(offlineSettings);
    });

    it("should set the offline settings from an entity", () => {
      expect.assertions(2);

      const offlineSettingsDto = defaultOfflineSettingsDto();
      const offlineSettingsEntity = new OfflineSettingsEntity(offlineSettingsDto);

      const contextProvider = new OfflineSettingsLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.offlineSettings).toBeNull();
      contextProvider.set(offlineSettingsEntity);

      expect(contextProvider.state.offlineSettings.toDto()).toStrictEqual(offlineSettingsEntity.toDto());
    });
  });

  describe("::loadLocalStorage", () => {
    it("should find the offline settings from the local storage and set the context state with it.", async () => {
      expect.assertions(1);

      const offlineSettings = defaultOfflineSettingsDto();

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);

      props.context.storage.local.set({ [contextProvider.storageKey]: offlineSettings });
      mockComponentSetState(contextProvider);

      await contextProvider.loadLocalStorage();

      expect(contextProvider.state.offlineSettings.toDto()).toStrictEqual(offlineSettings);
    });

    it("should call for updating the local storage if there is no offline settings in the local storage.", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);

      props.context.storage.local.set({ [contextProvider.storageKey]: null });
      props.context.port.addRequestListener(OFFLINE_FIND_SETTINGS_EVENT, async () =>
        defaultOfflineSettingsDtoFromApi(),
      );

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      mockComponentSetState(contextProvider);

      await contextProvider.loadLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith(OFFLINE_FIND_SETTINGS_EVENT);
    });
  });

  describe("::updateLocalStorage", () => {
    it("should call the service worker with the right event to trigger the local storage update.", async () => {
      expect.assertions(3);

      const props = defaultProps();
      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);

      const expectedOfflineSettings = defaultOfflineSettingsDtoFromApi();
      props.context.storage.local.set({ [contextProvider.storageKey]: null });
      props.context.port.addRequestListener(OFFLINE_FIND_SETTINGS_EVENT, async () => expectedOfflineSettings);

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      mockComponentSetState(contextProvider);

      await contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith(OFFLINE_FIND_SETTINGS_EVENT);
      expect(contextProvider.state.offlineSettings.toDto()).toStrictEqual(expectedOfflineSettings);
    });

    it("should not call the service worker twice if a pending promise is running.", async () => {
      expect.assertions(4);

      const props = defaultProps();
      let resolveUpdateLocalStoragePromise;
      const spyOnRequest = jest
        .spyOn(props.context.port, "request")
        .mockImplementation(() => new Promise((resolve) => (resolveUpdateLocalStoragePromise = resolve)));

      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith(OFFLINE_FIND_SETTINGS_EVENT);

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await resolveUpdateLocalStoragePromise();

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);

      await resolveUpdateLocalStoragePromise();
    });

    it("should call the service worker again if the promise has been resolved.", async () => {
      expect.assertions(5);

      const props = defaultProps();
      props.context.port.addRequestListener(OFFLINE_FIND_SETTINGS_EVENT, async () =>
        defaultOfflineSettingsDtoFromApi(),
      );

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      const contextProvider = new OfflineSettingsLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.updateLocalStorage();
      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      contextProvider.updateLocalStorage();
      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await contextProvider.runningLocalStorageUpdatePromise;

      // promise should be reinit now;
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);
    });
  });
});
