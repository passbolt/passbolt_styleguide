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
 * @since         5.13.0
 */

import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import UserActiveSessionEntity, {
  USER_ACTIVE_SESSION_OFFLINE,
  USER_ACTIVE_SESSION_ONLINE,
} from "./userActiveSessionEntity";
import { defaultUserActiveSessionDto, minimalUserActiveSessionDto } from "./userActiveSessionEntity.test.data";

describe("UserActiveSession", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(UserActiveSessionEntity.name, UserActiveSessionEntity.getSchema());
    });

    it("validates is_authenticated property", () => {
      assertEntityProperty.boolean(UserActiveSessionEntity, "is_authenticated");
      assertEntityProperty.required(UserActiveSessionEntity, "is_authenticated");
    });

    it("validates is_mfa_authenticated property", () => {
      assertEntityProperty.boolean(UserActiveSessionEntity, "is_mfa_authenticated");
      assertEntityProperty.notRequired(UserActiveSessionEntity, "is_mfa_authenticated");
    });

    it("validates is_server_reachable property", () => {
      assertEntityProperty.boolean(UserActiveSessionEntity, "is_server_reachable");
      assertEntityProperty.notRequired(UserActiveSessionEntity, "is_server_reachable");
    });

    it("validates type property", () => {
      assertEntityProperty.string(UserActiveSessionEntity, "type");
      const expectedValues = ["online", "offline"];
      const unexpectedValues = ["1", "false", "test"];
      assertEntityProperty.enumeration(UserActiveSessionEntity, "type", expectedValues, unexpectedValues);
      assertEntityProperty.required(UserActiveSessionEntity, "type");
    });

    it("validates last_logged_in property", () => {
      assertEntityProperty.string(UserActiveSessionEntity, "last_logged_in");
      assertEntityProperty.dateTime(UserActiveSessionEntity, "last_logged_in");
      assertEntityProperty.notRequired(UserActiveSessionEntity, "last_logged_in");
    });

    it("validates last_seen_online property", () => {
      assertEntityProperty.string(UserActiveSessionEntity, "last_seen_online");
      assertEntityProperty.dateTime(UserActiveSessionEntity, "last_seen_online");
      assertEntityProperty.notRequired(UserActiveSessionEntity, "last_seen_online");
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal dto is provided.", () => {
      expect.assertions(2);
      const dto = minimalUserActiveSessionDto();
      const entity = new UserActiveSessionEntity(dto);

      expect(entity._props.is_authenticated).toStrictEqual(dto.is_authenticated);
      expect(entity._props.type).toStrictEqual(dto.type);
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(6);
      const dto = defaultUserActiveSessionDto();
      const entity = new UserActiveSessionEntity(dto);

      expect(entity._props.is_authenticated).toStrictEqual(dto.is_authenticated);
      expect(entity._props.is_mfa_authenticated).toStrictEqual(dto.is_mfa_authenticated);
      expect(entity._props.is_server_reachable).toStrictEqual(dto.is_server_reachable);
      expect(entity._props.type).toStrictEqual(dto.type);
      expect(entity._props.last_logged_in).toStrictEqual(dto.last_logged_in);
      expect(entity._props.last_seen_online).toStrictEqual(dto.last_seen_online);
    });
  });

  describe("::isAuthenticated", () => {
    it("get is_authenticated property value", () => {
      expect.assertions(2);
      let entity = new UserActiveSessionEntity(minimalUserActiveSessionDto());
      expect(entity.isAuthenticated).toBeTruthy();
      entity = new UserActiveSessionEntity(minimalUserActiveSessionDto({ is_authenticated: false }));
      expect(entity.isAuthenticated).toBeFalsy();
    });

    it("set is_authenticated property value", () => {
      expect.assertions(2);
      let entity = new UserActiveSessionEntity(minimalUserActiveSessionDto());
      expect(entity.isAuthenticated).toBeTruthy();
      entity.isAuthenticated = false;
      expect(entity.isAuthenticated).toBeFalsy();
    });
  });

  describe("::isMfaAuthenticated", () => {
    it("get is_mfa_authenticated property value", () => {
      expect.assertions(2);
      let entity = new UserActiveSessionEntity(defaultUserActiveSessionDto());
      expect(entity.isMfaAuthenticated).toBeTruthy();
      entity = new UserActiveSessionEntity(defaultUserActiveSessionDto({ is_mfa_authenticated: false }));
      expect(entity.isMfaAuthenticated).toBeFalsy();
    });

    it("set is_mfa_authenticated property value", () => {
      expect.assertions(2);
      let entity = new UserActiveSessionEntity(defaultUserActiveSessionDto());
      expect(entity.isMfaAuthenticated).toBeTruthy();
      entity.isMfaAuthenticated = false;
      expect(entity.isMfaAuthenticated).toBeFalsy();
    });
  });

  describe("::isServerReachable", () => {
    it("get is_server_reachable property value", () => {
      expect.assertions(2);
      let entity = new UserActiveSessionEntity(defaultUserActiveSessionDto());
      expect(entity.isServerReachable).toBeTruthy();
      entity = new UserActiveSessionEntity(defaultUserActiveSessionDto({ is_server_reachable: false }));
      expect(entity.isServerReachable).toBeFalsy();
    });

    it("set is_server_reachable property value", () => {
      expect.assertions(2);
      let entity = new UserActiveSessionEntity(defaultUserActiveSessionDto());
      expect(entity.isServerReachable).toBeTruthy();
      entity.isServerReachable = false;
      expect(entity.isServerReachable).toBeFalsy();
    });
  });

  describe("::type", () => {
    it("get type property value", () => {
      expect.assertions(2);
      let entity = new UserActiveSessionEntity(defaultUserActiveSessionDto());
      expect(entity.type).toStrictEqual(USER_ACTIVE_SESSION_ONLINE);
      entity = new UserActiveSessionEntity(defaultUserActiveSessionDto({ type: USER_ACTIVE_SESSION_OFFLINE }));
      expect(entity.type).toStrictEqual(USER_ACTIVE_SESSION_OFFLINE);
    });

    it("set type property value", () => {
      expect.assertions(2);
      let entity = new UserActiveSessionEntity(defaultUserActiveSessionDto());
      expect(entity.type).toStrictEqual(USER_ACTIVE_SESSION_ONLINE);
      entity.type = USER_ACTIVE_SESSION_OFFLINE;
      expect(entity.type).toStrictEqual(USER_ACTIVE_SESSION_OFFLINE);
    });
  });

  describe("::lastLoggedIn", () => {
    it("get last_logged_in property value", () => {
      expect.assertions(1);
      const last_logged_in = "2024-10-05T12:10:00+00:00";
      const entity = new UserActiveSessionEntity(defaultUserActiveSessionDto({ last_logged_in }));
      expect(entity.lastLoggedIn).toStrictEqual(last_logged_in);
    });

    it("set last_logged_in property value", () => {
      expect.assertions(1);
      const last_logged_in = "2024-10-05T12:10:00+00:00";
      const entity = new UserActiveSessionEntity(defaultUserActiveSessionDto());
      entity.lastLoggedIn = last_logged_in;
      expect(entity.lastLoggedIn).toStrictEqual(last_logged_in);
    });
  });

  describe("::lastSeenOnline", () => {
    it("get last_seen_online property value", () => {
      expect.assertions(1);
      const last_seen_online = "2024-10-05T12:10:00+00:00";
      const entity = new UserActiveSessionEntity(defaultUserActiveSessionDto({ last_seen_online }));
      expect(entity.lastSeenOnline).toStrictEqual(last_seen_online);
    });

    it("set last_seen_online property value", () => {
      expect.assertions(1);
      const last_seen_online = "2024-10-05T12:10:00+00:00";
      const entity = new UserActiveSessionEntity(defaultUserActiveSessionDto());
      entity.lastSeenOnline = last_seen_online;
      expect(entity.lastSeenOnline).toStrictEqual(last_seen_online);
    });
  });
});
