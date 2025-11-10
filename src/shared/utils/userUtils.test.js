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

import {defaultUserDto} from "../models/entity/user/userEntity.test.data";
import {USER_STATUS, getUserFormattedName, getUserStatus, isUserSuspended, isAccountRecoveryRequested, isMissingMetadataKey} from "./userUtils";

describe("userUtils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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


  describe("::getUserStatus", () => {
    it("should return DELETED if the user has a `deleted` date set", () => {
      expect.assertions(1);
      const user = {
        deleted: new Date("2023-11-11T08:09:00"),
      };
      expect(getUserStatus(user)).toStrictEqual(USER_STATUS.DELETED);
    });

    it("should return DELETED if the user has a `deleted` date set even with a `disabled` date set", () => {
      expect.assertions(1);
      const user = {
        deleted: new Date("2023-11-11T08:09:00"),
        disabled: new Date("1023-11-11T08:09:00"),
      };
      expect(getUserStatus(user)).toStrictEqual(USER_STATUS.DELETED);
    });


    it("should return SUSPENDED if the user has a `disabled` date in the past", () => {
      expect.assertions(1);
      const user = {
        deleted: null,
        disabled: new Date("1023-11-11T08:09:00"),
      };
      expect(getUserStatus(user)).toStrictEqual(USER_STATUS.SUSPENDED);
    });

    it("should return ACTIVE if the user has a `suspended` date in the future", () => {
      expect.assertions(1);
      const user = {
        deleted: null,
        disabled: new Date(Date.now() + 3_600_000),
      };
      expect(getUserStatus(user)).toStrictEqual(USER_STATUS.ACTIVE);
    });

    it("should return ACTIVE when the user has no deleted date and no suspended date set", () => {
      expect.assertions(1);
      const user = {
        deleted: null,
        disabled: null,
      };
      expect(getUserStatus(user)).toStrictEqual(USER_STATUS.ACTIVE);
    });
  });

  describe("::getUserFormattedName", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const mockTranslation = jest.fn().mockImplementation(s => s);

    it("should return the user name when defined and without username", () => {
      expect.assertions(2);
      const user = defaultUserDto();
      const expectedResult = `${user.profile.first_name} ${user.profile.last_name}`;
      expect(getUserFormattedName(user, mockTranslation)).toStrictEqual(expectedResult);
      expect(mockTranslation).not.toHaveBeenCalled();
    });

    it("should return the user name when defined and with username", () => {
      expect.assertions(2);
      const user = defaultUserDto();
      const expectedResult = `${user.profile.first_name} ${user.profile.last_name} (${user.username})`;
      expect(getUserFormattedName(user, mockTranslation, {withUsername: true})).toStrictEqual(expectedResult);
      expect(mockTranslation).not.toHaveBeenCalled();
    });

    it("should return 'Unknown user' if no name is defined", () => {
      expect.assertions(3);
      const user = {profile: {}};
      expect(getUserFormattedName(user, mockTranslation)).toStrictEqual("Unknown user");
      expect(mockTranslation).toHaveBeenCalledTimes(1);
      expect(mockTranslation).toHaveBeenCalledWith("Unknown user");
    });

    it("should return 'Unknown user' if group is not defined", () => {
      expect.assertions(3);
      const user = null;
      expect(getUserFormattedName(user, mockTranslation)).toStrictEqual("Unknown user");
      expect(mockTranslation).toHaveBeenCalledTimes(1);
      expect(mockTranslation).toHaveBeenCalledWith("Unknown user");
    });
  });

  describe("::isAccountRecoveryRequested", () => {
    it("should return false if the user is not defined", () => {
      expect.assertions(1);
      const user = undefined;
      expect(isAccountRecoveryRequested(user)).toStrictEqual(false);
    });

    it("should return false if the user has no `pending_account_recovery_request` property", () => {
      expect.assertions(1);
      const user = {
        id: "54c6278e-f824-5fda-91ff-3e946b18d994",
      };
      expect(isAccountRecoveryRequested(user)).toStrictEqual(false);
    });

    it("should return true if the user has `pending_account_recovery_request` property", () => {
      expect.assertions(1);
      const user = {
        id: "54c6278e-f824-5fda-91ff-3e946b18d994",
        pending_account_recovery_request: {"status": "pending"}
      };
      expect(isAccountRecoveryRequested(user)).toStrictEqual(true);
    });
  });

  describe("::isMissingMetadataKey", () => {
    it("should return false if the user is not defined", () => {
      expect.assertions(1);
      const user = undefined;
      expect(isMissingMetadataKey(user)).toStrictEqual(false);
    });

    it("should return false if the user has no `missing_metadata_key_ids` length is 0", () => {
      expect.assertions(1);
      const user = {
        id: "54c6278e-f824-5fda-91ff-3e946b18d994",
        missing_metadata_key_ids: [],
      };
      expect(isMissingMetadataKey(user)).toStrictEqual(false);
    });

    it("should return true if the user has `missing_metadata_key_ids` length is greater than 0", () => {
      expect.assertions(1);
      const user = {
        id: "54c6278e-f824-5fda-91ff-3e946b18d994",
        missing_metadata_key_ids: [
          '1234',
        ]
      };
      expect(isMissingMetadataKey(user)).toStrictEqual(true);
    });
  });
});
