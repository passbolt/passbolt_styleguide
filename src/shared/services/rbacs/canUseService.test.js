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

import {defaultLoggedInUser} from "../../context/Rbac/RbacContext.test.data";
import RbacEntity from "../../models/entity/rbac/rbacEntity";
import RbacsCollection from "../../models/entity/rbac/rbacsCollection";
import {defaultSettingsRbacsCollectionData, settingsRbacsCollectionData} from "../../models/entity/rbac/rbacsCollection.test.data";
import RoleEntity from "../../models/entity/role/roleEntity";
import {defaultAdminUserDto} from "../../models/entity/user/userEntity.test.data";
import CanUse from "./canUseService";
import DenyControlFunction from "./controlFunctions/denyControlFunction";
import GetControlFunctionService from "./getControlFunctionService";
import {uiActions} from "./uiActionEnumeration";

describe("CanUseService", () => {
  const user = defaultLoggedInUser();
  let rbacs = new RbacsCollection(defaultSettingsRbacsCollectionData);

  describe('::getDefaultForAdminAndUiAction', () => {
    it('should return true for admin user with admin control function', () => {
      expect.assertions(2);
      jest.spyOn(GetControlFunctionService, "getDefaultForAdminAndUiAction");

      const result = CanUse.canRoleUseUiAction(defaultAdminUserDto(),  new RbacsCollection(defaultSettingsRbacsCollectionData), uiActions.RESOURCES_EXPORT);

      expect(result).toBeTruthy();
      expect(GetControlFunctionService.getDefaultForAdminAndUiAction).toHaveBeenCalledWith(uiActions.RESOURCES_EXPORT);
    });

    it('should return true for a non-admin user with RBAC control function', () => {
      expect.assertions(3);

      jest.spyOn(rbacs, "findRbacByRoleAndUiActionName");
      jest.spyOn(GetControlFunctionService, "getByRbac");
      jest.spyOn(CanUse, "getByRbacOrDefault");

      const result = CanUse.canRoleUseUiAction(user, rbacs, uiActions.RESOURCES_EXPORT);

      expect(result).toBe(true);
      expect(rbacs.findRbacByRoleAndUiActionName).toHaveBeenCalledWith(new RoleEntity(user.role), uiActions.RESOURCES_EXPORT);
      expect(CanUse.getByRbacOrDefault).toHaveBeenCalled();
    });

    it('should return true for desktop action with RBAC control function', () => {
      expect.assertions(3);
      global.window.chrome = {webview: true};

      jest.spyOn(rbacs, "findRbacByUiActionName");
      jest.spyOn(GetControlFunctionService, "getByRbac");

      const result = CanUse.canRoleUseUiAction(user, rbacs, uiActions.RESOURCES_EXPORT);

      expect(result).toBe(true);
      expect(rbacs.findRbacByUiActionName).toHaveBeenCalledWith(uiActions.RESOURCES_EXPORT);
      expect(GetControlFunctionService.getByRbac).toHaveBeenCalled();
    });

    it('should return false if rbac is Deny', () => {
      expect.assertions(1);

      rbacs = new RbacsCollection(settingsRbacsCollectionData());
      jest.spyOn(rbacs, "findRbacByRoleAndUiActionName").mockImplementation(() =>  DenyControlFunction);

      const result = CanUse.canRoleUseUiAction(user, rbacs, uiActions.RESOURCES_IMPORT);

      expect(result).toBeFalsy();
    });
  });

  describe('::getByRbacOrDefault', () => {
    it('should return the rbac function and execute it when rbac is defined', () => {
      expect.assertions(2);

      const rbac = new RbacEntity(defaultSettingsRbacsCollectionData[0]);
      jest.spyOn(GetControlFunctionService, "getByRbac");
      const result = CanUse.getByRbacOrDefault(rbac, uiActions.RESOURCES_EXPORT, user);

      expect(result).toBeTruthy();
      expect(GetControlFunctionService.getByRbac).toHaveBeenCalledWith(rbac);
    });

    it('should return the fallback control function and execute it when rbac is not defined', () => {
      expect.assertions(2);

      jest.spyOn(GetControlFunctionService, "getDefaultForUserAndUiAction");
      const result = CanUse.getByRbacOrDefault(null, uiActions.RESOURCES_EXPORT, user);

      expect(result).toBeTruthy();
      expect(GetControlFunctionService.getDefaultForUserAndUiAction).toHaveBeenCalledWith(uiActions.RESOURCES_EXPORT);
    });
  });
});
