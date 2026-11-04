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
import { defaultProps } from "./ActiveSessionSessionStorageContext.test.data";
import ActiveSessionSessionStorageContextProvider from "./ActiveSessionSessionStorageContext";
import { defaultUserActiveSessionDto } from "../../models/entity/session/userActiveSessionEntity.test.data";
import UserActiveSessionEntity from "../../models/entity/session/userActiveSessionEntity";
import { AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT } from "../../services/serviceWorker/activeSession/activeSessionServiceWorkerService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ActiveSessionSessionStorageContext", () => {
  describe("::constructor", () => {
    it("should initialise the default state and handlers", () => {
      expect.assertions(3);

      const contextProvider = new ActiveSessionSessionStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeUndefined();
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();
      expect(contextProvider.state).toMatchObject({
        get: expect.any(Function),
        activeSession: null,
        updateSessionStorage: expect.any(Function),
      });
    });
  });

  describe("::componentDidMount", () => {
    it("should listen to the expected event", () => {
      expect.assertions(2);

      const contextProvider = new ActiveSessionSessionStorageContextProvider(defaultProps());
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

      const contextProvider = new ActiveSessionSessionStorageContextProvider(defaultProps());
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
      const contextProvider = new ActiveSessionSessionStorageContextProvider(props);
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

      const contextProvider = new ActiveSessionSessionStorageContextProvider(defaultProps());
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
      const contextProvider = new ActiveSessionSessionStorageContextProvider(props);
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
      const contextProvider = new ActiveSessionSessionStorageContextProvider(props);

      props.storage.session.set({ [contextProvider.storageKey]: null });

      /*
       * Hold the service worker call pending: the blocking promise is reset as soon as the update settles,
       * so letting the mocked port resolve on its own would make the assertion below race the resolution.
       */
      let resolveUpdateLocalStoragePromise;
      jest
        .spyOn(contextProvider.activeSessionServiceWorkerService, "findAndUpdateAuthenticationStatus")
        .mockImplementation(() => new Promise((resolve) => (resolveUpdateLocalStoragePromise = resolve)));

      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();

      const result = await act(async () => contextProvider.get());

      expect(result).toBeNull();
      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();

      // Let the held update settle so no pending work outlives the test.
      await act(async () => resolveUpdateLocalStoragePromise(null));
    });
  });

  describe("::set", () => {
    it("should set the active session from a dto", () => {
      expect.assertions(2);

      const activeSession = defaultUserActiveSessionDto();

      const contextProvider = new ActiveSessionSessionStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.activeSession).toBeNull();
      contextProvider.set(activeSession);

      expect(contextProvider.state.activeSession.toDto()).toStrictEqual(activeSession);
    });

    it("should set the active session from an entity", () => {
      expect.assertions(2);

      const activeSessionDto = defaultUserActiveSessionDto();
      const activeSessionEntity = new UserActiveSessionEntity(activeSessionDto);

      const contextProvider = new ActiveSessionSessionStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.activeSession).toBeNull();
      contextProvider.set(activeSessionEntity);

      expect(contextProvider.state.activeSession.toDto()).toStrictEqual(activeSessionEntity.toDto());
    });
  });

  describe("::loadLocalStorage", () => {
    it("should find the active session from the session storage and set the context state with it.", async () => {
      expect.assertions(1);

      const activeSession = defaultUserActiveSessionDto();

      const props = defaultProps();
      const contextProvider = new ActiveSessionSessionStorageContextProvider(props);

      props.storage.session.set({ [contextProvider.storageKey]: activeSession });
      mockComponentSetState(contextProvider);

      await contextProvider.loadLocalStorage();

      expect(contextProvider.state.activeSession.toDto()).toStrictEqual(activeSession);
    });

    it("should call for updating the session storage if there is no active session in the session storage.", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const contextProvider = new ActiveSessionSessionStorageContextProvider(props);

      props.storage.session.set({ [contextProvider.storageKey]: null });
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

  describe("::updateSessionStorage", () => {
    it("should call the service worker with the right event to trigger the session storage update.", async () => {
      expect.assertions(3);

      const props = defaultProps();
      const contextProvider = new ActiveSessionSessionStorageContextProvider(props);

      const expectedActiveSession = defaultUserActiveSessionDto();
      props.storage.session.set({ [contextProvider.storageKey]: null });
      props.port.addRequestListener(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT, async () => expectedActiveSession);

      const spyOnRequest = jest.spyOn(props.port, "request");

      mockComponentSetState(contextProvider);

      await contextProvider.updateSessionStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith(AUTH_FIND_AND_UPDATE_ACTIVE_SESSION_EVENT);
      expect(contextProvider.state.activeSession.toDto()).toStrictEqual(expectedActiveSession);
    });

    it("should not call the service worker twice if a pending promise is running.", async () => {
      expect.assertions(3);

      const props = defaultProps();
      let resolveUpdateLocalStoragePromise;

      const contextProvider = new ActiveSessionSessionStorageContextProvider(props);
      const spyOnRequest = jest
        .spyOn(contextProvider.activeSessionServiceWorkerService, "findAndUpdateAuthenticationStatus")
        .mockImplementation(() => new Promise((resolve) => (resolveUpdateLocalStoragePromise = resolve)));
      mockComponentSetState(contextProvider);

      contextProvider.updateSessionStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      contextProvider.updateSessionStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await resolveUpdateLocalStoragePromise();

      contextProvider.updateSessionStorage();

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

      const contextProvider = new ActiveSessionSessionStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.updateSessionStorage();
      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      contextProvider.updateSessionStorage();
      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await contextProvider.runningLocalStorageUpdatePromise;

      // promise should be reinit now;
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();

      contextProvider.updateSessionStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);
    });
  });
});
