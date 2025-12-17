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
import { defaultSessionKeysBundleDataDto } from "./sessionKeysBundleDataEntity.test.data";
import { sharedResourcesSessionKeys } from "./sessionKeysCollection.test.data";
import SessionKeysCollection from "./sessionKeysCollection";

describe("SessionKeysBundleDataEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SessionKeysBundleDataEntity.name, SessionKeysBundleDataEntity.getSchema());
    });

    it("validates object_type property", () => {
      assertEntityProperty.string(SessionKeysBundleDataEntity, "object_type");
      assertEntityProperty.required(SessionKeysBundleDataEntity, "object_type");
      assertEntityProperty.enumeration(
        SessionKeysBundleDataEntity,
        "object_type",
        ["PASSBOLT_SESSION_KEYS"],
        ["any other values"],
      );
    });

    it("validates session_keys property", () => {
      const sessionKeysBundleDto = defaultSessionKeysBundleDataDto();
      const successScenarios = [{ scenario: "a valid option", value: sharedResourcesSessionKeys() }];
      const failScenarios = [
        {
          scenario: "with invalid session private key build rule",
          value: sharedResourcesSessionKeys({ session_key: "fail" }),
        },
      ];
      assertEntityProperty.assertAssociation(
        SessionKeysBundleDataEntity,
        "session_keys",
        sessionKeysBundleDto,
        successScenarios,
        failScenarios,
      );
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(2);
      const dto = defaultSessionKeysBundleDataDto({ session_keys: [] });
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

  describe("::createFromSessionKeys", () => {
    it("create from a session keys collection", () => {
      expect.assertions(2);
      const sessionKeysDto = sharedResourcesSessionKeys();
      const sessionKeys = new SessionKeysCollection(sessionKeysDto);
      const entity = SessionKeysBundleDataEntity.createFromSessionKeys(sessionKeys);

      expect(entity._props.object_type).toStrictEqual("PASSBOLT_SESSION_KEYS");
      expect(entity._session_keys.toDto()).toStrictEqual(sessionKeysDto);
    });

    it("throws if sessionKeys parameter is not valid", () => {
      expect.assertions(3);
      expect(() => SessionKeysBundleDataEntity.createFromSessionKeys(42)).toThrow(
        'The parameter "sessionKey" should be a SessionKeysCollection.',
      );
      expect(() => SessionKeysBundleDataEntity.createFromSessionKeys()).toThrow(
        'The parameter "sessionKey" should be a SessionKeysCollection.',
      );
      expect(() => SessionKeysBundleDataEntity.createFromSessionKeys(null)).toThrow(
        'The parameter "sessionKey" should be a SessionKeysCollection.',
      );
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
