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
 * @since         4.9.4
 */

import { waitFor } from "@testing-library/dom";
import mockComponentSetState from "../../react-extension/test/mock/components/React/mockSetState";
import { defaultResourceDto } from "../../shared/models/entity/resource/resourceEntity.test.data";
import { ResourceLocalStorageContextProvider } from "./ResourceLocalStorageContext";
import { defaultProps } from "./ResourceLocalStorageContext.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ResourceLocalStorageContext", () => {
  describe("::constructor", () => {
    it("should initialise the default state and handlers", () => {
      expect.assertions(3);

      const contextProvider = new ResourceLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeUndefined();
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();
      expect(contextProvider.state).toMatchObject({
        get: expect.any(Function),
        resources: null,
        updateLocalStorage: expect.any(Function),
      });
    });
  });

  describe("::componentDidMount", () => {
    it("should listen to the expected event", () => {
      expect.assertions(2);

      const contextProvider = new ResourceLocalStorageContextProvider(defaultProps());
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

      const contextProvider = new ResourceLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.componentDidMount();
      expect(contextProvider.props.context.storage.changeCallbacks.length).toStrictEqual(1);

      contextProvider.componentWillUnmount();
      expect(contextProvider.props.context.storage.changeCallbacks.length).toStrictEqual(0);
    });
  });

  describe("::handleStorageChange", () => {
    it("should update the current state with the changed resources", () => {
      expect.assertions(1);

      const contextProvider = new ResourceLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      const expectedResources = [defaultResourceDto(), defaultResourceDto()];

      contextProvider.handleStorageChange({
        resources: {
          newValue: expectedResources,
        },
      });

      expect(contextProvider.state.resources).toStrictEqual(expectedResources);
    });

    it("should ignore storage change event that are not related to resources", () => {
      expect.assertions(1);

      const contextProvider = new ResourceLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.handleStorageChange({
        test: "something",
      });

      expect(contextProvider.setState).not.toHaveBeenCalled();
    });
  });

  describe("::get", () => {
    it("should return the resources if the state have been initialised already", () => {
      expect.assertions(1);

      const contextProvider = new ResourceLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      const expectedResources = [defaultResourceDto(), defaultResourceDto()];

      contextProvider.handleStorageChange({
        resources: {
          newValue: expectedResources,
        },
      });

      expect(contextProvider.get()).toStrictEqual(expectedResources);
    });

    it("should return an empty array if the state have been initialised and no resources are available", () => {
      expect.assertions(1);

      const contextProvider = new ResourceLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.handleStorageChange({
        resources: {
          newValue: [],
        },
      });

      expect(contextProvider.get()).toStrictEqual([]);
    });

    it("should return null if the state hasn't been initiliased yet and set a blocking promise while the init occurs", async () => {
      expect.assertions(3);

      const props = defaultProps();
      props.context.storage.local.set({ resources: null });

      const contextProvider = new ResourceLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();
      expect(contextProvider.get()).toBeNull();

      await waitFor(() => {});

      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();
    });
  });

  describe("::set", () => {
    it("should set the resources and sort them", () => {
      expect.assertions(2);

      const resource1 = defaultResourceDto({ metadata: { name: "Password B" } });
      const resource2 = defaultResourceDto({ metadata: { name: "Password A" } });
      const resources = [resource1, resource2];

      const contextProvider = new ResourceLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.resources).toBeNull();
      contextProvider.set(resources);

      expect(contextProvider.state.resources).toStrictEqual([resource2, resource1]);
    });
  });

  describe("::loadLocalStorage", () => {
    it("should find the resources from the local storage, sort them and set the context state with it.", async () => {
      expect.assertions(1);

      const resource1 = defaultResourceDto({ metadata: { name: "Password B" } });
      const resource2 = defaultResourceDto({ metadata: { name: "Password A" } });

      const resourceFromLocalStorage = [resource1, resource2];

      const props = defaultProps();
      props.context.storage.local.set({ resources: resourceFromLocalStorage });

      const contextProvider = new ResourceLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      await contextProvider.loadLocalStorage();

      expect(contextProvider.state.resources).toStrictEqual([resource2, resource1]);
    });

    it("should call for updating the local storage if there is no resources in the local storage.", async () => {
      expect.assertions(2);

      const props = defaultProps();
      props.context.storage.local.set({ resources: null });
      props.context.port.addRequestListener("passbolt.resources.update-local-storage", async () => {});

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      const contextProvider = new ResourceLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      await contextProvider.loadLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith("passbolt.resources.update-local-storage");
    });
  });

  describe("::updateLocalStorage", () => {
    it("should call the service worker with the right event to trigger the local storage update.", async () => {
      expect.assertions(2);

      const props = defaultProps();
      props.context.storage.local.set({ resources: null });
      props.context.port.addRequestListener("passbolt.resources.update-local-storage", async () => {});

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      const contextProvider = new ResourceLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith("passbolt.resources.update-local-storage");
    });

    it("should not call the service worker twice if a pending promise is running.", async () => {
      expect.assertions(4);

      const props = defaultProps();
      let resolveUpdadeLocalStoragePromise;
      const spyOnRequest = jest
        .spyOn(props.context.port, "request")
        .mockImplementation(() => new Promise((resolve) => (resolveUpdadeLocalStoragePromise = resolve)));

      const contextProvider = new ResourceLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith("passbolt.resources.update-local-storage");

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await resolveUpdadeLocalStoragePromise();

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);

      await resolveUpdadeLocalStoragePromise();
    });

    it("should call the service worker again if the promise has been resolved.", async () => {
      expect.assertions(5);

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.resources.update-local-storage", async () => {});

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      const contextProvider = new ResourceLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.updateLocalStorage();
      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      contextProvider.updateLocalStorage();
      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await contextProvider.runningLocalStorageUpdatePromise;

      //promise should be reinit now;
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();

      contextProvider.updateLocalStorage();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);
    });
  });
});
