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

import { act } from "@testing-library/react";
import mockComponentSetState from "../../../react-extension/test/mock/components/React/mockSetState";
import { defaultProps } from "./ActiveSessionLocalStorageContext.test.data";
import ActiveSessionLocalStorageContextProvider from "./ActiveSessionLocalStorageContext";
import { defaultUserActiveSessionDto } from "../../models/entity/session/userActiveSessionEntity.test.data";
import UserActiveSessionEntity from "../../models/entity/session/userActiveSessionEntity";
import { AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT } from "../../services/serviceWorker/activeSession/activeSessionServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ActiveSessionLocalStorageContext", () => {
  describe("::constructor", () => {
    it("should initialise the default state and handlers", () => {
      expect.assertions(3);

      const contextProvider = new ActiveSessionLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeUndefined();
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();
      expect(contextProvider.state).toMatchObject({
        get: expect.any(Function),
        activeSession: null,
        updateLocalStorage: expect.any(Function),
      });
    });
  });

  describe("::componentDidMount", () => {
    it("should listen to the expected event", () => {
      expect.assertions(2);

      const contextProvider = new ActiveSessionLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.componentDidMount();

      const callbacks = contextProvider.props.storage.changeCallbacks;
      expect(callbacks.length).toStrictEqual(1);
      expect(callbacks[0]).toStrictEqual(contextProvider.handleStorageChange);
    });
  });

  describe("::componentWillUnmount", () => {
    it("should listen to the expected event", () => {
      expect.assertions(2);

      const contextProvider = new ActiveSessionLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.componentDidMount();
      expect(contextProvider.props.storage.changeCallbacks.length).toStrictEqual(1);

      contextProvider.componentWillUnmount();
      expect(contextProvider.props.storage.changeCallbacks.length).toStrictEqual(0);
    });
  });

  describe("::handleStorageChange", () => {
    it("should update the current state with the changed active session", () => {
      expect.assertions(1);

      const props = defaultProps();
      const contextProvider = new ActiveSessionLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      const expectedActiveSession = defaultUserActiveSessionDto();

      contextProvider.handleStorageChange({
        [contextProvider.storageKey]: {
          newValue: expectedActiveSession,
        },
      });

      expect(contextProvider.state.activeSession.toDto()).toStrictEqual(expectedActiveSession);
    });

    it("should ignore storage change event that are not related to active session", () => {
      expect.assertions(1);

      const contextProvider = new ActiveSessionLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.handleStorageChange({
        test: "something",
      });

      expect(contextProvider.setState).not.toHaveBeenCalled();
    });
  });

  describe("::get", () => {
    it("should return the active session if the state have been initialised already", () => {
      expect.assertions(1);

      const props = defaultProps();
      const contextProvider = new ActiveSessionLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      const expectedActiveSession = defaultUserActiveSessionDto();

      contextProvider.handleStorageChange({
        [contextProvider.storageKey]: {
          newValue: expectedActiveSession,
        },
      });

      expect(contextProvider.get().toDto()).toStrictEqual(expectedActiveSession);
    });

    it("should return null if the state hasn't been initialized yet and set a blocking promise while the init occurs", async () => {
      expect.assertions(3);

      const props = defaultProps();
      const contextProvider = new ActiveSessionLocalStorageContextProvider(props);

      props.storage.local.set({ [contextProvider.storageKey]: null });

      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();

      const result = await act(async () => contextProvider.get());

      expect(result).toBeNull();
      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();
    });
  });

  describe("::set", () => {
    it("should set the active session from a dto", () => {
      expect.assertions(2);

      const activeSession = defaultUserActiveSessionDto();

      const contextProvider = new ActiveSessionLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.activeSession).toBeNull();
      contextProvider.set(activeSession);

      expect(contextProvider.state.activeSession.toDto()).toStrictEqual(activeSession);
    });

    it("should set the active session from an entity", () => {
      expect.assertions(2);

      const activeSessionDto = defaultUserActiveSessionDto();
      const activeSessionEntity = new UserActiveSessionEntity(activeSessionDto);

      const contextProvider = new ActiveSessionLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.activeSession).toBeNull();
      contextProvider.set(activeSessionEntity);

      expect(contextProvider.state.activeSession.toDto()).toStrictEqual(activeSessionEntity.toDto());
    });
  });

  describe("::loadLocalStorage", () => {
    it("should find the active session from the local storage and set the context state with it.", async () => {
      expect.assertions(1);

      const activeSession = defaultUserActiveSessionDto();

      const props = defaultProps();
      const contextProvider = new ActiveSessionLocalStorageContextProvider(props);

      props.storage.local.set({ [contextProvider.storageKey]: activeSession });
      mockComponentSetState(contextProvider);

      await contextProvider.loadLocalStorage();

      expect(contextProvider.state.activeSession.toDto()).toStrictEqual(activeSession);
    });

    it("should call for updating the local storage if there is no active session in the local storage.", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const contextProvider = new ActiveSessionLocalStorageContextProvider(props);

      props.storage.local.set({ [contextProvider.storageKey]: null });
      props.port.addRequestListener(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT, async () =>
        defaultUserActiveSessionDto(),
      );

      const spyOnRequest = jest.spyOn(props.port, "request");

      mockComponentSetState(contextProvider);

      await contextProvider.loadLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT);
    });
  });

  describe("::updateLocalStorage", () => {
    it("should call the service worker with the right event to trigger the local storage update.", async () => {
      expect.assertions(3);

      const props = defaultProps();
      const contextProvider = new ActiveSessionLocalStorageContextProvider(props);

      const expectedActiveSession = defaultUserActiveSessionDto();
      props.storage.local.set({ [contextProvider.storageKey]: null });
      props.port.addRequestListener(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT, async () => expectedActiveSession);

      const spyOnRequest = jest.spyOn(props.port, "request");

      mockComponentSetState(contextProvider);

      await contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT);
      expect(contextProvider.state.activeSession.toDto()).toStrictEqual(expectedActiveSession);
    });

    it("should not call the service worker twice if a pending promise is running.", async () => {
      expect.assertions(3);

      const props = defaultProps();
      let resolveUpdateLocalStoragePromise;

      const contextProvider = new ActiveSessionLocalStorageContextProvider(props);
      const spyOnRequest = jest
        .spyOn(contextProvider.activeSessionServiceWorkerService, "findAndUpdateAuthenticationStatus")
        .mockImplementation(() => new Promise((resolve) => (resolveUpdateLocalStoragePromise = resolve)));
      mockComponentSetState(contextProvider);

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);

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
      props.port.addRequestListener(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT, async () =>
        defaultUserActiveSessionDto(),
      );

      const spyOnRequest = jest.spyOn(props.port, "request");

      const contextProvider = new ActiveSessionLocalStorageContextProvider(props);
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
