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
 * @since         4.4.0
 */

import {isUserSuspended} from "./dateUtils";

describe("dateUtils", () => {
  describe("::isUserSuspended", () => {
    it("should return false if the user is not defined", () => {
      expect.assertions(1);
      const user = undefined;
      expect(isUserSuspended(user)).toStrictEqual(false);
    });

    it("should return false if the user has no `disabled` property", () => {
      expect.assertions(1);
      const user = {};
      expect(isUserSuspended(user)).toStrictEqual(false);
    });

    it("should return false if the user a `disabled` property but falsy", () => {
      expect.assertions(1);
      const user = {disabled: false};
      expect(isUserSuspended(user)).toStrictEqual(false);
    });

    it("should return false if the user a `disabled` property but later than now", () => {
      expect.assertions(1);
      const user = {disabled: new Date("3023-11-11T08:09:00")};
      expect(isUserSuspended(user)).toStrictEqual(false);
    });

    it("should return true if the user a `disabled` set before now", () => {
      expect.assertions(1);
      const user = {disabled: new Date("2022-11-11T08:09:00")};
      expect(isUserSuspended(user)).toStrictEqual(true);
    });
  });
});
