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
 * @since         4.10.1
 */
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import SessionKeysBundleDataEntity from "./sessionKeysBundleDataEntity";
import {defaultSessionKeysBundleDataDto} from "./sessionKeysBundleDataEntity.test.data";
import {defaultSessionKeysDtos} from "./sessionKeysCollection.test.data";

describe("SessionKeysBundleDataEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SessionKeysBundleDataEntity.name, SessionKeysBundleDataEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(SessionKeysBundleDataEntity, "object_type");
      assertEntityProperty.required(SessionKeysBundleDataEntity, "object_type");
      assertEntityProperty.enumeration(SessionKeysBundleDataEntity, "object_type", ["PASSBOLT_SESSION_KEYS"], ["any other values"]);
    });

    it("validates session_keys property", () => {
      const sessionKeysBundleDto = defaultSessionKeysBundleDataDto();
      const successScenarios = [
        {scenario: "a valid option", value: defaultSessionKeysDtos()},
      ];
      const failScenarios = [
        {scenario: "with invalid session private key build rule", value: defaultSessionKeysDtos(2, {session_key: "fail"})},
      ];
      assertEntityProperty.assertAssociation(SessionKeysBundleDataEntity, "session_keys", sessionKeysBundleDto, successScenarios, failScenarios);
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(2);
      const dto = defaultSessionKeysBundleDataDto({session_keys: []});
      const entity = new SessionKeysBundleDataEntity(dto);

      expect(entity._props.object_type).toStrictEqual("PASSBOLT_SESSION_KEYS");
      expect(entity._session_keys.toDto()).toStrictEqual([]);
    });

    it("constructor works if valid DTO is provided: with data", () => {
      expect.assertions(2);
      const dto = defaultSessionKeysBundleDataDto();
      const entity = new SessionKeysBundleDataEntity(dto);

      expect(entity._props.object_type).toStrictEqual("PASSBOLT_SESSION_KEYS");
      expect(entity._session_keys.toDto()).toStrictEqual(dto.session_keys);
    });
  });

  describe("::getters", () => {
    it("`sessionKeys` should return the right value", () => {
      expect.assertions(1);
      const dto = defaultSessionKeysBundleDataDto();
      const entity = new SessionKeysBundleDataEntity(dto);

      expect(entity.sessionKeys.toDto()).toStrictEqual(dto.session_keys);
    });
  });
});
