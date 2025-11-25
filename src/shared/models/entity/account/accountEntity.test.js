/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.12.0
 */

import EntitySchema from "../../../../shared/models/entity/abstract/entitySchema";
import AccountEntity from "./accountEntity";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {defaultAccountDto} from "./accountEntity.test.data";

describe("AccountEntity", () => {
  describe("AccountEntity::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(AccountEntity.ENTITY_NAME, AccountEntity.getSchema());
    });

    it("validates domain property", () => {
      assertEntityProperty.string(AccountEntity, "domain");
      assertEntityProperty.required(AccountEntity, "domain");
    });

    it("validates user_id property", () => {
      assertEntityProperty.string(AccountEntity, "user_id");
      assertEntityProperty.uuid(AccountEntity, "user_id");
      assertEntityProperty.required(AccountEntity, "user_id");
    });

    it("validates user_key_fingerprint property", () => {
      const successScenario = [
        {scenario: "a valid fingerprint", value: "ABCD".repeat(10)},
      ];

      const failingScenario = [
        {scenario: "non hexadecimal fingerprint character set", value: "GHIJ".repeat(10)},
        {scenario: "wrong fingerprint character case set", value: "abcd".repeat(10)},
      ];

      assertEntityProperty.string(AccountEntity, "user_key_fingerprint");
      assertEntityProperty.minLength(AccountEntity, "user_key_fingerprint", 40);
      assertEntityProperty.maxLength(AccountEntity, "user_key_fingerprint", 40);
      assertEntityProperty.assert(AccountEntity, "user_key_fingerprint", successScenario, failingScenario, "pattern");
      assertEntityProperty.notRequired(AccountEntity, "user_key_fingerprint");
    });

    it("validates user_public_armored_key property", () => {
      assertEntityProperty.string(AccountEntity, "user_public_armored_key");
      assertEntityProperty.required(AccountEntity, "user_public_armored_key");
    });

    it("validates server_public_armored_key property", () => {
      assertEntityProperty.string(AccountEntity, "server_public_armored_key");
      assertEntityProperty.required(AccountEntity, "server_public_armored_key");
    });

    it("validates username property", () => {
      assertEntityProperty.string(AccountEntity, "username");
      assertEntityProperty.required(AccountEntity, "username");
    });

    it("validates first_name property", () => {
      assertEntityProperty.string(AccountEntity, "first_name");
      assertEntityProperty.required(AccountEntity, "first_name");
    });

    it("validates last_name property", () => {
      assertEntityProperty.string(AccountEntity, "last_name");
      assertEntityProperty.required(AccountEntity, "first_name");
    });

    it("validates locale property", () => {
      assertEntityProperty.nullable(AccountEntity, "locale");
      assertEntityProperty.locale(AccountEntity, "locale");
      assertEntityProperty.notRequired(AccountEntity, "locale");
    });

    it("validates role_name property", () => {
      const successScenarios = [
        {scenario: "valid role 'user'", value: 'user'},
        {scenario: "valid role 'admin'", value: 'admin'},
        {scenario: "valid role 'guest'", value: 'guest'},
        {scenario: "valid role 'custom'", value: 'custom'},
      ];

      const failingScenarios = [
        assertEntityProperty.SCENARIO_INTEGER,
        assertEntityProperty.SCENARIO_OBJECT,
        assertEntityProperty.SCENARIO_ARRAY,
        assertEntityProperty.SCENARIO_TRUE,
      ];

      assertEntityProperty.nullable(AccountEntity, "role_name");
      assertEntityProperty.assert(AccountEntity, "role_name", successScenarios, failingScenarios);
      assertEntityProperty.notRequired(AccountEntity, "role_name");
    });
  });

  describe("AccountEntity:constructor", () => {
    it("it should instantiate the entity with a minimal dto", () => {
      expect.assertions(1);
      const dto = defaultAccountDto();
      const entity = new AccountEntity(dto);
      expect(entity).toBeInstanceOf(AccountEntity);
    });
  });

  describe("AccountEntity:toDto", () => {
    it("should return the expected properties.", () => {
      expect.assertions(2);
      const expectedKeys = [
        'type',
        'domain',
        'user_id',
        'user_key_fingerprint',
        'user_public_armored_key',
        'server_public_armored_key',
        'username',
        'first_name',
        'last_name',
        'locale'
      ];

      const dto = defaultAccountDto();
      const entity = new AccountEntity(dto);
      const resultDto = entity.toDto();
      const keys = Object.keys(resultDto);
      expect(Object.keys(resultDto).length).toBe(10);
      expect(keys).toEqual(expectedKeys);
    });
  });
});
