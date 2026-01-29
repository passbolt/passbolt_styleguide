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
 * @since         4.6.0
 */

import { defaultRbacData, defaultUnknownRbac } from "../../models/entity/rbac/rbacEntity.test.data";
import AllowControlFunction from "./controlFunctions/allowControlFunction";
import DenyControlFunction from "./controlFunctions/denyControlFunction";
import GetControlFunctionService from "./getControlFunctionService";

describe("GetControlFunctionService", () => {
  describe("::getByRbac", () => {
    it("should return DenyControlFunction for unknown rbac", () => {
      expect.assertions(1);

      const result = GetControlFunctionService.getByRbac(defaultUnknownRbac());

      expect(result).toEqual(DenyControlFunction);
    });

    it("should return the control function for a known rbac", () => {
      expect.assertions(1);

      const result = GetControlFunctionService.getByRbac(defaultRbacData());

      expect(result).toEqual(DenyControlFunction);
    });
  });

  describe("::getDefaultForAdminAndAction", () => {
    it("should return AllowControlFunction for an unknown ui action", () => {
      expect.assertions(1);

      const result = GetControlFunctionService.getDefaultForAdminAndAction(defaultUnknownRbac());

      expect(result).toEqual(AllowControlFunction);
    });

    it("should return the correct control function for a known ui action", () => {
      expect.assertions(1);

      const result = GetControlFunctionService.getDefaultForAdminAndAction(defaultRbacData());

      expect(result).toEqual(AllowControlFunction);
    });
  });

  describe("::getDefaultForUserAndAction", () => {
    it("should return AllowControlFunction for an unknown ui action", () => {
      expect.assertions(1);

      const result = GetControlFunctionService.getDefaultForUserAndAction(defaultUnknownRbac());

      expect(result).toEqual(AllowControlFunction);
    });

    it("should return the correct control function for a known ui action", () => {
      expect.assertions(1);

      const result = GetControlFunctionService.getDefaultForUserAndAction(defaultRbacData());

      expect(result).toEqual(AllowControlFunction);
    });
  });
});
