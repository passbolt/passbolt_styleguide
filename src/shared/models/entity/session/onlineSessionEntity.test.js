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
import OnlineSessionEntity from "./onlineSessionEntity";
import { defaultOnlineSessionDto, minimalOnlineSessionDto } from "./onlineSessionEntity.test.data";

describe("OnlineSession", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(OnlineSessionEntity.name, OnlineSessionEntity.getSchema());
    });

    it("validates is_authenticated property", () => {
      assertEntityProperty.boolean(OnlineSessionEntity, "is_authenticated");
      assertEntityProperty.required(OnlineSessionEntity, "is_authenticated");
    });

    it("validates is_mfa_authenticated property", () => {
      assertEntityProperty.boolean(OnlineSessionEntity, "is_mfa_authenticated");
      assertEntityProperty.notRequired(OnlineSessionEntity, "is_mfa_authenticated");
    });

    it("validates last_online_logged_in property", () => {
      assertEntityProperty.string(OnlineSessionEntity, "last_online_logged_in");
      assertEntityProperty.dateTime(OnlineSessionEntity, "last_online_logged_in");
      assertEntityProperty.required(OnlineSessionEntity, "last_online_logged_in");
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal dto is provided.", () => {
      expect.assertions(2);
      const dto = minimalOnlineSessionDto();
      const entity = new OnlineSessionEntity(dto);

      expect(entity._props.is_authenticated).toStrictEqual(dto.is_authenticated);
      expect(entity._props.last_online_logged_in).toStrictEqual(dto.last_online_logged_in);
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(3);
      const dto = defaultOnlineSessionDto();
      const entity = new OnlineSessionEntity(dto);

      expect(entity._props.is_authenticated).toStrictEqual(dto.is_authenticated);
      expect(entity._props.is_mfa_authenticated).toStrictEqual(dto.is_mfa_authenticated);
      expect(entity._props.last_online_logged_in).toStrictEqual(dto.last_online_logged_in);
    });
  });

  describe("::isAuthenticated", () => {
    it("get is_authenticated property value", () => {
      expect.assertions(2);
      let entity = new OnlineSessionEntity(minimalOnlineSessionDto());
      expect(entity.isAuthenticated).toBeTruthy();
      entity = new OnlineSessionEntity(minimalOnlineSessionDto({ is_authenticated: false }));
      expect(entity.isAuthenticated).toBeFalsy();
    });
  });

  describe("::isMfaAuthenticated", () => {
    it("get is__mfaauthenticated property value", () => {
      expect.assertions(2);
      let entity = new OnlineSessionEntity(defaultOnlineSessionDto());
      expect(entity.isMfaAuthenticated).toBeTruthy();
      entity = new OnlineSessionEntity(defaultOnlineSessionDto({ is_mfa_authenticated: false }));
      expect(entity.isMfaAuthenticated).toBeFalsy();
    });
  });

  describe("::lastOnlineLoggedIn", () => {
    it("get last_online_logged_in property value", () => {
      expect.assertions(1);
      const last_online_logged_in = "2024-10-05T12:10:00+00:00";
      const entity = new OnlineSessionEntity(defaultOnlineSessionDto({ last_online_logged_in }));
      expect(entity.lastOnlineLoggedIn).toStrictEqual(last_online_logged_in);
    });
  });
});
