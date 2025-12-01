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
 * @since         5.8.0
 */

import RoleEntity from "../../shared/models/entity/role/roleEntity";
import RolesCollection from "../../shared/models/entity/role/rolesCollection";
import {rolesCollectionDto} from "../../shared/models/entity/role/rolesCollection.test.data";
import {defaultAppContext} from "./ExtAppContext.test.data";
import {RoleContextProvider} from "./RoleContext";
import {v4 as uuidv4} from "uuid";
import mockComponentSetState from "../test/mock/components/React/mockSetState";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("RoleContextProvider", () => {
  describe("::constructor", () => {
    it("should initialise the default state and handlers", () => {
      expect.assertions(3);

      const props = {context: defaultAppContext()};

      const context = new RoleContextProvider(props);
      mockComponentSetState(context);

      expect(context.runningLocalStorageUpdatePromise).not.toBeUndefined();
      expect(context.runningLocalStorageUpdatePromise).toBeNull();
      expect(context.state).toMatchObject({
        getAllRoles: expect.any(Function),
        getRole: expect.any(Function),
        rolesCollection: new RolesCollection(),
      });
    });
  });

  describe("::componentDidMount", () => {
    it("should listen to the expected event", () => {
      expect.assertions(2);
      const props = {context: defaultAppContext()};

      const context = new RoleContextProvider(props);
      mockComponentSetState(context);

      context.componentDidMount();

      const callbacks = context.props.context.storage.changeCallbacks;
      expect(callbacks.length).toStrictEqual(1);
      expect(callbacks[0]).toStrictEqual(context.handleStorageChange);
    });
  });

  describe("::componentWillUnmount", () => {
    it("should listen to the expected event", () => {
      expect.assertions(2);
      const props = {context: defaultAppContext()};

      const context = new RoleContextProvider(props);
      mockComponentSetState(context);

      context.componentDidMount();
      expect(context.props.context.storage.changeCallbacks.length).toStrictEqual(1);

      context.componentWillUnmount();
      expect(context.props.context.storage.changeCallbacks.length).toStrictEqual(0);
    });
  });

  describe("::handleStorageChange", () => {
    it("should update the current state with the changed metadata types settings", () => {
      expect.assertions(1);

      const props = {context: defaultAppContext()};

      const context = new RoleContextProvider(props);
      mockComponentSetState(context);

      context.handleStorageChange({
        [context.storageKey]: {
          newValue: rolesCollectionDto,
        },
      });

      expect(context.state.rolesCollection.toDto()).toStrictEqual(rolesCollectionDto);
    });

    it("should ignore storage change event that are not related to metadata types settings", () => {
      expect.assertions(1);

      const props = {context: defaultAppContext()};

      const context = new RoleContextProvider(props);
      mockComponentSetState(context);

      context.handleStorageChange({
        test: "something"
      });

      expect(context.setState).not.toHaveBeenCalled();
    });
  });

  describe("::getRole", () => {
    it("should return the role given its id and not refresh the local storage", async() => {
      expect.assertions(2);

      const roleData = rolesCollectionDto;
      const defaultProps = {context: defaultAppContext()};

      const context = new RoleContextProvider(defaultProps);
      jest.spyOn(context.roleServiceWorkerService, "updateResourceLocalStorage").mockImplementation(async() => { await defaultProps.context.storage.local.set({roles: roleData}); });

      mockComponentSetState(context);
      await context.componentDidMount();

      const role = await context.getRole(roleData[3].id);

      expect(role).toStrictEqual(new RoleEntity(roleData[3]));
      expect(context.roleServiceWorkerService.updateResourceLocalStorage).toHaveBeenCalledTimes(1); // 1 as componentDidMount calls it automatically
    });

    it("should return the role given its id and refresh the local storage", async() => {
      expect.assertions(2);

      const roleData = rolesCollectionDto;
      const defaultProps = {context: defaultAppContext()};

      const context = new RoleContextProvider(defaultProps);
      jest.spyOn(context.roleServiceWorkerService, "updateResourceLocalStorage").mockImplementation(async() => { await defaultProps.context.storage.local.set({roles: roleData}); });

      mockComponentSetState(context);
      await context.componentDidMount();

      const role = await context.getRole(uuidv4());

      expect(role).toBeNull();
      expect(context.roleServiceWorkerService.updateResourceLocalStorage).toHaveBeenCalledTimes(2); // 2 as getRole + componentDidMount called it
    });
  });

  describe("::getAllRole", () => {
    it("should return a collection of all available roles in the context", () => {
      expect.assertions(2);

      const roleData = rolesCollectionDto;
      const props = defaultAppContext({roles: roleData});

      const context = new RoleContextProvider({context: props});
      jest.spyOn(context.roleServiceWorkerService, "updateResourceLocalStorage").mockImplementation(() => {});

      const allRoles = context.getAllRoles();

      expect(allRoles).toStrictEqual(new RolesCollection(allRoles));
      expect(context.roleServiceWorkerService.updateResourceLocalStorage).not.toHaveBeenCalled();
    });

    it("should return an empty collection of roles in the context is not initialised yet", () => {
      expect.assertions(2);

      const props = defaultAppContext({roles: null});

      const context = new RoleContextProvider({context: props});
      jest.spyOn(context.roleServiceWorkerService, "updateResourceLocalStorage").mockImplementation(() => {});

      const allRoles = context.getAllRoles();

      expect(allRoles).toStrictEqual(new RolesCollection());
      expect(context.roleServiceWorkerService.updateResourceLocalStorage).not.toHaveBeenCalled();
    });
  });

  describe("::refreshRoles", () => {
    it("should call for the right event on the service worker service to trigger a local storage refresh", async() => {
      expect.assertions(2);

      const props = defaultAppContext();
      const context = new RoleContextProvider({context: props});

      jest.spyOn(props.port, "request").mockImplementation(() => {});

      await context.refreshRoles();

      expect(props.port.request).toHaveBeenCalledTimes(1);
      expect(props.port.request).toHaveBeenCalledWith("passbolt.role.update-local-storage");
    });
  });
});
