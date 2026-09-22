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
 * @since         4.10.0
 */

import { waitFor } from "@testing-library/dom";
import mockComponentSetState from "../../../react-extension/test/mock/components/React/mockSetState";
import { defaultProps } from "./ResourceTypesLocalStorageContext.test.data";
import { ResourceTypesLocalStorageContextProvider } from "./ResourceTypesLocalStorageContext";
import { resourceTypesCollectionDto } from "../../models/entity/resourceType/resourceTypesCollection.test.data";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("ResourceTypesLocalStorageContext", () => {
  describe("::constructor", () => {
    it("should initialise the default state and handlers", () => {
      expect.assertions(3);

      const contextProvider = new ResourceTypesLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeUndefined();
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();
      expect(contextProvider.state).toMatchObject({
        get: expect.any(Function),
        resourceTypes: null,
        getOrFind: expect.any(Function),
      });
    });
  });

  describe("::componentDidMount", () => {
    it("should listen to the expected event", () => {
      expect.assertions(2);

      const contextProvider = new ResourceTypesLocalStorageContextProvider(defaultProps());
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

      const contextProvider = new ResourceTypesLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.componentDidMount();
      expect(contextProvider.props.context.storage.changeCallbacks.length).toStrictEqual(1);

      contextProvider.componentWillUnmount();
      expect(contextProvider.props.context.storage.changeCallbacks.length).toStrictEqual(0);
    });
  });

  describe("::handleStorageChange", () => {
    it("should update the current state with the changed resource types", () => {
      expect.assertions(1);

      const contextProvider = new ResourceTypesLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      const expectedResourceTypes = resourceTypesCollectionDto();

      contextProvider.handleStorageChange({
        [contextProvider.storageKey]: {
          newValue: expectedResourceTypes,
        },
      });

      expect(contextProvider.state.resourceTypes.toDto()).toStrictEqual(expectedResourceTypes);
    });

    it("should ignore storage change event that are not related to resource types", () => {
      expect.assertions(1);

      const contextProvider = new ResourceTypesLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.handleStorageChange({
        test: "something",
      });

      expect(contextProvider.setState).not.toHaveBeenCalled();
    });
  });

  describe("::get", () => {
    it("should return the resource types if the state have been initialised already", () => {
      expect.assertions(1);

      const contextProvider = new ResourceTypesLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      const expectedResourceTypes = resourceTypesCollectionDto();

      contextProvider.handleStorageChange({
        [contextProvider.storageKey]: {
          newValue: expectedResourceTypes,
        },
      });

      expect(contextProvider.get().toDto()).toStrictEqual(expectedResourceTypes);
    });

    it("should return an empty array if the state have been initialised and no resource types are available", () => {
      expect.assertions(1);

      const contextProvider = new ResourceTypesLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      contextProvider.handleStorageChange({
        [contextProvider.storageKey]: {
          newValue: [],
        },
      });

      expect(contextProvider.get().toDto()).toStrictEqual([]);
    });

    it("should return null if the state hasn't been initialized yet and set a blocking promise while the init occurs", async () => {
      expect.assertions(3);

      const props = defaultProps();

      const contextProvider = new ResourceTypesLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();
      expect(contextProvider.get()).toBeNull();

      await waitFor(() => {});

      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();
    });
  });

  describe("::set", () => {
    it("should set the resource types", () => {
      expect.assertions(2);

      const resourceTypes = resourceTypesCollectionDto();

      const contextProvider = new ResourceTypesLocalStorageContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.resourceTypes).toBeNull();
      contextProvider.set(resourceTypes);

      expect(contextProvider.state.resourceTypes.toDto()).toStrictEqual(resourceTypes);
    });
  });

  describe("::getOrFind", () => {
    it("should call the service worker with the right event to trigger the local storage update.", async () => {
      expect.assertions(2);

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.resource-type.get-or-find-all", async () => {});

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      const contextProvider = new ResourceTypesLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.getOrFind();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith("passbolt.resource-type.get-or-find-all");
    });

    it("should do nothing if the service worker throw an error.", async () => {
      expect.assertions(3);

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.resource-type.get-or-find-all", async () => {});

      const spyOnRequest = jest
        .spyOn(props.context.port, "request")
        .mockImplementationOnce(() => Promise.reject(new Error("Error")));

      const contextProvider = new ResourceTypesLocalStorageContextProvider(props);
      jest.spyOn(contextProvider, "set");
      mockComponentSetState(contextProvider);

      await contextProvider.getOrFind();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith("passbolt.resource-type.get-or-find-all");
      expect(contextProvider.set).not.toHaveBeenCalled();
    });

    it("should not call the service worker twice if a pending promise is running.", async () => {
      expect.assertions(4);

      const props = defaultProps();
      let resolveUpdadeLocalStoragePromise;
      const spyOnRequest = jest
        .spyOn(props.context.port, "request")
        .mockImplementation(() => new Promise((resolve) => (resolveUpdadeLocalStoragePromise = resolve)));

      const contextProvider = new ResourceTypesLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.getOrFind();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith("passbolt.resource-type.get-or-find-all");

      contextProvider.getOrFind();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await resolveUpdadeLocalStoragePromise();

      contextProvider.getOrFind();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);

      await resolveUpdadeLocalStoragePromise();
    });

    it("should call the service worker again if the promise has been resolved.", async () => {
      expect.assertions(5);

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.resource-type.get-or-find-all", async () => {});

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      const contextProvider = new ResourceTypesLocalStorageContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.getOrFind();
      expect(contextProvider.runningLocalStorageUpdatePromise).not.toBeNull();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      contextProvider.getOrFind();
      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await contextProvider.runningLocalStorageUpdatePromise;

      //promise should be reinit now;
      expect(contextProvider.runningLocalStorageUpdatePromise).toBeNull();

      contextProvider.getOrFind();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);
    });
  });
});
