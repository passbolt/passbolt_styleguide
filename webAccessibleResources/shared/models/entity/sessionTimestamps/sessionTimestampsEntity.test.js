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
 * @since         5.18.0
 */

import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import SessionTimestampsEntity from "./sessionTimestampsEntity";
import { defaultSessionTimestampsDto } from "./sessionTimestampsEntity.test.data";

describe("SessionTimestampsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SessionTimestampsEntity.name, SessionTimestampsEntity.getSchema());
    });

    it("validates last_logged_in property", () => {
      assertEntityProperty.string(SessionTimestampsEntity, "last_logged_in");
      assertEntityProperty.dateTime(SessionTimestampsEntity, "last_logged_in");
      assertEntityProperty.required(SessionTimestampsEntity, "last_logged_in");
    });

    it("validates last_seen_online property", () => {
      assertEntityProperty.string(SessionTimestampsEntity, "last_seen_online");
      assertEntityProperty.dateTime(SessionTimestampsEntity, "last_seen_online");
      assertEntityProperty.required(SessionTimestampsEntity, "last_seen_online");
    });
  });

  describe("::constructor", () => {
    it("constructor throws if an empty dto is provided.", () => {
      expect.assertions(1);
      expect(() => new SessionTimestampsEntity({})).toThrow();
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(2);
      const dto = defaultSessionTimestampsDto();
      const entity = new SessionTimestampsEntity(dto);

      expect(entity._props.last_logged_in).toStrictEqual(dto.last_logged_in);
      expect(entity._props.last_seen_online).toStrictEqual(dto.last_seen_online);
    });
  });

  describe("::lastLoggedIn", () => {
    it("get last_logged_in property value", () => {
      expect.assertions(1);
      const last_logged_in = "2024-10-05T12:10:00+00:00";
      const entity = new SessionTimestampsEntity(defaultSessionTimestampsDto({ last_logged_in }));
      expect(entity.lastLoggedIn).toStrictEqual(last_logged_in);
    });

    it("set last_logged_in property value", () => {
      expect.assertions(1);
      const last_logged_in = "2024-10-05T12:10:00+00:00";
      const entity = new SessionTimestampsEntity(defaultSessionTimestampsDto());
      entity.lastLoggedIn = last_logged_in;
      expect(entity.lastLoggedIn).toStrictEqual(last_logged_in);
    });

    it("set last_logged_in throws if the value is not a date-time", () => {
      expect.assertions(1);
      const entity = new SessionTimestampsEntity(defaultSessionTimestampsDto());
      expect(() => (entity.lastLoggedIn = "not a date")).toThrow();
    });
  });

  describe("::lastSeenOnline", () => {
    it("get last_seen_online property value", () => {
      expect.assertions(1);
      const last_seen_online = "2024-10-05T12:10:00+00:00";
      const entity = new SessionTimestampsEntity(defaultSessionTimestampsDto({ last_seen_online }));
      expect(entity.lastSeenOnline).toStrictEqual(last_seen_online);
    });

    it("set last_seen_online property value", () => {
      expect.assertions(1);
      const last_seen_online = "2024-10-05T12:10:00+00:00";
      const entity = new SessionTimestampsEntity(defaultSessionTimestampsDto());
      entity.lastSeenOnline = last_seen_online;
      expect(entity.lastSeenOnline).toStrictEqual(last_seen_online);
    });

    it("set last_seen_online throws if the value is not a date-time", () => {
      expect.assertions(1);
      const entity = new SessionTimestampsEntity(defaultSessionTimestampsDto());
      expect(() => (entity.lastSeenOnline = "not a date")).toThrow();
    });
  });
});
