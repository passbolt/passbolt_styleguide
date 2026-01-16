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
 * @since         4.5.0
 */

import { defaultLoggedInUser } from "../../context/Rbac/RbacContext.test.data";
import RbacEntity from "../../models/entity/rbac/rbacEntity";
import RbacsCollection from "../../models/entity/rbac/rbacsCollection";
import {
  defaultSettingsRbacsCollectionData,
  settingsRbacsCollectionData,
} from "../../models/entity/rbac/rbacsCollection.test.data";
import RoleEntity from "../../models/entity/role/roleEntity";
import { defaultAdminUserDto } from "../../models/entity/user/userEntity.test.data";
import CanUse from "./canUseService";
import GetControlFunctionService from "./getControlFunctionService";
import { uiActions } from "./uiActionEnumeration";
import { actions } from "./actionEnumeration";
import { defaultRbacData } from "../../models/entity/rbac/rbacEntity.test.data";
import { controlFunctions } from "./controlFunctionEnumeration";

describe("CanUseService", () => {
  const user = defaultLoggedInUser();
  let rbacs = new RbacsCollection(defaultSettingsRbacsCollectionData);

  describe("::canRoleUseAction", () => {
    it("should return true for admin user with admin control function for ui action", () => {
      expect.assertions(2);
      jest.spyOn(GetControlFunctionService, "getDefaultForAdminAndAction");

      const result = CanUse.canRoleUseAction(
        defaultAdminUserDto(),
        new RbacsCollection(defaultSettingsRbacsCollectionData),
        uiActions.RESOURCES_EXPORT,
      );

      expect(result).toBeTruthy();
      expect(GetControlFunctionService.getDefaultForAdminAndAction).toHaveBeenCalledWith(uiActions.RESOURCES_EXPORT);
    });

    it("should return true for a non-admin user with RBAC control function for ui action", () => {
      expect.assertions(3);

      jest.spyOn(rbacs, "findRbacByRoleAndActionName");
      jest.spyOn(GetControlFunctionService, "getByRbac");
      jest.spyOn(CanUse, "getByRbacOrDefault");

      const result = CanUse.canRoleUseAction(user, rbacs, uiActions.RESOURCES_EXPORT);

      expect(result).toBe(true);
      expect(rbacs.findRbacByRoleAndActionName).toHaveBeenCalledWith(
        new RoleEntity(user.role),
        uiActions.RESOURCES_EXPORT,
      );
      expect(CanUse.getByRbacOrDefault).toHaveBeenCalled();
    });

    it("should return true for desktop action with RBAC control function for ui action", () => {
      expect.assertions(3);
      global.window.chrome = { webview: true };

      jest.spyOn(rbacs, "findRbacByActionName");
      jest.spyOn(GetControlFunctionService, "getByRbac");

      const result = CanUse.canRoleUseAction(user, rbacs, uiActions.RESOURCES_EXPORT);

      // Delete to avoid other test running in desktop app mode
      delete global.window.chrome;

      expect(result).toBe(true);
      expect(rbacs.findRbacByActionName).toHaveBeenCalledWith(uiActions.RESOURCES_EXPORT);
      expect(GetControlFunctionService.getByRbac).toHaveBeenCalled();
    });

    it("should fallback to admin default for desktop admin user when no RBAC exists", () => {
      expect.assertions(2);
      global.window.chrome = { webview: true };

      const emptyRbacs = new RbacsCollection([]);
      jest.spyOn(GetControlFunctionService, "getDefaultForAdminAndAction");

      const result = CanUse.canRoleUseAction(defaultAdminUserDto(), emptyRbacs, actions.GROUPS_ADD);

      delete global.window.chrome;

      expect(result).toBeTruthy();
      expect(GetControlFunctionService.getDefaultForAdminAndAction).toHaveBeenCalledWith(actions.GROUPS_ADD);
    });

    it("should fallback to user default for desktop non-admin user when no RBAC exists", () => {
      expect.assertions(2);
      global.window.chrome = { webview: true };

      const emptyRbacs = new RbacsCollection([]);
      jest.spyOn(GetControlFunctionService, "getDefaultForUserAndAction");

      const result = CanUse.canRoleUseAction(user, emptyRbacs, actions.GROUPS_ADD);

      delete global.window.chrome;

      expect(result).toBeFalsy();
      expect(GetControlFunctionService.getDefaultForUserAndAction).toHaveBeenCalledWith(actions.GROUPS_ADD);
    });

    it("should return false if rbac is Deny for ui action", () => {
      expect.assertions(1);

      rbacs = new RbacsCollection(settingsRbacsCollectionData());
      jest
        .spyOn(rbacs, "findRbacByRoleAndActionName")
        .mockImplementationOnce(() => new RbacEntity(defaultRbacData({ control_function: controlFunctions.DENY })));

      const result = CanUse.canRoleUseAction(user, rbacs, uiActions.RESOURCES_IMPORT);

      expect(result).toBeFalsy();
    });

    it("should return true for admin user with admin control function for action", () => {
      expect.assertions(1);
      jest.spyOn(GetControlFunctionService, "getDefaultForAdminAndAction");

      const result = CanUse.canRoleUseAction(
        defaultAdminUserDto(),
        new RbacsCollection(defaultSettingsRbacsCollectionData),
        actions.GROUPS_ADD,
      );

      expect(result).toBeTruthy();
    });

    it("should return true for a non-admin user with RBAC control function for action", () => {
      expect.assertions(3);

      rbacs = new RbacsCollection(defaultSettingsRbacsCollectionData);
      jest.spyOn(rbacs, "findRbacByRoleAndActionName");
      jest.spyOn(GetControlFunctionService, "getByRbac");
      jest.spyOn(CanUse, "getByRbacOrDefault");

      const result = CanUse.canRoleUseAction(user, rbacs, actions.ACCOUNT_RECOVERY_RESPONSE_CREATE);

      expect(result).toBeTruthy();
      expect(rbacs.findRbacByRoleAndActionName).toHaveBeenCalledWith(
        new RoleEntity(user.role),
        actions.ACCOUNT_RECOVERY_RESPONSE_CREATE,
      );
      expect(CanUse.getByRbacOrDefault).toHaveBeenCalled();
    });

    it("should return false if rbac is Deny for action", () => {
      expect.assertions(1);

      rbacs = new RbacsCollection(settingsRbacsCollectionData());
      jest
        .spyOn(rbacs, "findRbacByRoleAndActionName")
        .mockImplementationOnce(() => new RbacEntity(defaultRbacData({ control_function: controlFunctions.DENY })));

      const result = CanUse.canRoleUseAction(user, rbacs, actions.GROUPS_ADD);

      expect(result).toBeFalsy();
    });
  });

  describe("::getByRbacOrDefault", () => {
    it("should return the rbac function and execute it when rbac is defined", () => {
      expect.assertions(2);

      const rbac = new RbacEntity(defaultSettingsRbacsCollectionData[0]);
      jest.spyOn(GetControlFunctionService, "getByRbac");
      const result = CanUse.getByRbacOrDefault(rbac, uiActions.RESOURCES_EXPORT, user);

      expect(result).toBeTruthy();
      expect(GetControlFunctionService.getByRbac).toHaveBeenCalledWith(rbac);
    });

    it("should return the fallback control function and execute it when rbac is not defined", () => {
      expect.assertions(2);

      jest.spyOn(GetControlFunctionService, "getDefaultForUserAndAction");
      const result = CanUse.getByRbacOrDefault(null, uiActions.RESOURCES_EXPORT, user);

      expect(result).toBeTruthy();
      expect(GetControlFunctionService.getDefaultForUserAndAction).toHaveBeenCalledWith(uiActions.RESOURCES_EXPORT);
    });
  });
});
