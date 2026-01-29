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
import SessionKeysBundleEntity from "./sessionKeysBundleEntity";
import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {
  decryptedSessionKeysBundleDto,
  defaultSessionKeysBundleDto,
  minimalSessionKeysBundleDto,
} from "./sessionKeysBundleEntity.test.data";
import EntityValidationError from "../abstract/entityValidationError";
import { defaultPgpMessage } from "../../../../../test/assert/assertEntityProperty.test.data";
import { defaultSessionKeysBundleDataDto } from "./sessionKeysBundleDataEntity.test.data";
import SessionKeysBundleDataEntity from "./sessionKeysBundleDataEntity";

describe("SessionKeysBundleEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(SessionKeysBundleEntity.name, SessionKeysBundleEntity.getSchema());
    });

    it("validates id property", () => {
      assertEntityProperty.uuid(SessionKeysBundleEntity, "id");
      assertEntityProperty.notRequired(SessionKeysBundleEntity, "id");
      assertEntityProperty.nullable(SessionKeysBundleEntity, "id");
    });

    it("validates user_id property", () => {
      assertEntityProperty.uuid(SessionKeysBundleEntity, "user_id");
      assertEntityProperty.notRequired(SessionKeysBundleEntity, "user_id");
      assertEntityProperty.nullable(SessionKeysBundleEntity, "user_id");
    });

    it("validates data property", () => {
      assertEntityProperty.required(SessionKeysBundleEntity, "data");

      const dataStringSuccessScenarios = [
        {
          scenario: "PGP Message with comments in the header",
          value: defaultPgpMessage({ withCrc: true, withComments: true }),
        },
        {
          scenario: "PGP Message without comments in the header",
          value: defaultPgpMessage({ withCrc: true, withComments: false }),
        },
      ];
      for (let i = 0; i < dataStringSuccessScenarios.length; i++) {
        const scenario = dataStringSuccessScenarios[i];
        const dto = defaultSessionKeysBundleDto({ data: scenario.value });
        expect(() => new SessionKeysBundleEntity(dto)).not.toThrow();
      }

      const dataStringFailScenarios = [
        { scenario: "PGP Message without CRC", value: defaultPgpMessage({ withCrc: false }) },
        {
          scenario: "PGP Message without CRC and multiple blocks",
          value: defaultPgpMessage({ withCrc: false, withDuplicates: true }),
        },
        {
          scenario: "PGP Message with wrong extra characters",
          value: defaultPgpMessage({ withCrc: true, withWrongExtraCharacters: true }),
        },
        {
          scenario: "PGP Message with wrong extra characters and multiple blocks",
          value: defaultPgpMessage({ withCrc: true, withWrongExtraCharacters: true, withDuplicates: true }),
        },
        {
          scenario: "PGP Message with comments in the header and multiple blocks",
          value: defaultPgpMessage({ withCrc: true, withComments: true, withDuplicates: true }),
        },
        {
          scenario: "PGP Message without comments in the header and multiple blocks",
          value: defaultPgpMessage({ withCrc: true, withComments: false, withDuplicates: true }),
        },
      ];
      for (let i = 0; i < dataStringFailScenarios.length; i++) {
        const scenario = dataStringFailScenarios[i];
        const dto = defaultSessionKeysBundleDto({ data: scenario.value });

        expect(() => new SessionKeysBundleEntity(dto)).toThrow(EntityValidationError);
      }

      const dataObjectSuccessScenarios = [{ scenario: "valid entity dto", value: defaultSessionKeysBundleDataDto() }];
      for (let i = 0; i < dataObjectSuccessScenarios.length; i++) {
        const scenario = dataObjectSuccessScenarios[i];
        const dto = defaultSessionKeysBundleDto({ data: scenario.value });

        expect(() => new SessionKeysBundleEntity(dto)).not.toThrow();
      }

      const dataObjectFailScenarios = [
        { scenario: "invalid entity object", value: {} },
        { scenario: "integer", value: 42 },
        { scenario: "boolean", value: false },
      ];
      for (let i = 0; i < dataObjectFailScenarios.length; i++) {
        const scenario = dataObjectFailScenarios[i];
        const dto = defaultSessionKeysBundleDto({ data: scenario.value });

        expect(() => new SessionKeysBundleEntity(dto)).toThrow(EntityValidationError);
      }
    });

    it("validates created property", () => {
      assertEntityProperty.string(SessionKeysBundleEntity, "created");
      assertEntityProperty.dateTime(SessionKeysBundleEntity, "created");
      assertEntityProperty.notRequired(SessionKeysBundleEntity, "created");
    });

    it("validates modified property", () => {
      assertEntityProperty.string(SessionKeysBundleEntity, "modified");
      assertEntityProperty.dateTime(SessionKeysBundleEntity, "modified");
      assertEntityProperty.notRequired(SessionKeysBundleEntity, "modified");
    });

    it("validates created_by property", () => {
      assertEntityProperty.uuid(SessionKeysBundleEntity, "created_by");
      assertEntityProperty.notRequired(SessionKeysBundleEntity, "created_by");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(6);
      const dto = minimalSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity._props.id).toBeUndefined();
      expect(entity._props.user_id).toStrictEqual(dto.user_id);
      expect(entity._props.data).toStrictEqual(dto.data);
      expect(entity._props.created).toBeUndefined();
      expect(entity._props.created_by).toBeUndefined();
      expect(entity._props.modified).toBeUndefined();
    });

    it("constructor works if valid DTO is provided: with data", () => {
      expect.assertions(6);
      const dto = defaultSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity._props.id).toStrictEqual(dto.id);
      expect(entity._props.user_id).toStrictEqual(dto.user_id);
      expect(entity._props.data).toStrictEqual(dto.data);
      expect(entity._props.created).toStrictEqual(dto.created);
      expect(entity._props.created_by).toStrictEqual(dto.created_by);
      expect(entity._props.modified).toStrictEqual(dto.modified);
    });

    it("constructor fails if both data and the decrypted data (_data) are given", () => {
      expect.assertions(1);
      const entity = new SessionKeysBundleEntity(defaultSessionKeysBundleDto());
      entity._data = defaultSessionKeysBundleDataDto();

      expect(() => entity.validateBuildRules()).toThrowEntityValidationError("data", "only-one-defined");
    });
  });

  describe("::getters", () => {
    it("`id` should return the populated value", () => {
      expect.assertions(1);
      const dto = defaultSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);
      expect(entity.id).toStrictEqual(dto.id);
    });

    it("`id` should return null if no value is populated", () => {
      expect.assertions(1);
      const dto = minimalSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);
      expect(entity.id).toBeNull();
    });

    it("`data` should return the right value: with string", () => {
      expect.assertions(1);
      const dto = defaultSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity.data).toStrictEqual(dto.data);
    });

    it("`data` should return the right value: with a SessionKeysBundleDataEntity", () => {
      expect.assertions(2);
      const dto = defaultSessionKeysBundleDto({
        data: defaultSessionKeysBundleDataDto(),
      });
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity.data).toBeInstanceOf(SessionKeysBundleDataEntity);
      expect(entity.data.toDto()).toStrictEqual(dto.data);
    });

    it("`userId` should return the right value: with string", () => {
      expect.assertions(1);
      const dto = defaultSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity.userId).toStrictEqual(dto.user_id);
    });

    it("`modified` should return the right value: with string", () => {
      expect.assertions(1);
      const dto = defaultSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity.modified).toStrictEqual(dto.modified);
    });
  });

  describe("::setters", () => {
    describe("::data", () => {
      it("`data` could be set with a string", () => {
        expect.assertions(6);
        const dto = defaultSessionKeysBundleDto();
        const entity = new SessionKeysBundleEntity(dto);

        expect(entity.data).toStrictEqual(dto.data);
        expect(entity._data).toBeUndefined();

        entity.data = new SessionKeysBundleDataEntity(defaultSessionKeysBundleDataDto());
        expect(entity._data).toBeInstanceOf(SessionKeysBundleDataEntity);
        expect(entity._props.data).toBeUndefined();

        const pgpMessage = defaultPgpMessage();
        entity.data = pgpMessage;
        expect(entity._props.data).toStrictEqual(pgpMessage);
        expect(entity._data).toBeUndefined();
      });

      it("`data` should assert the parameter", () => {
        expect.assertions(1);
        const entity = new SessionKeysBundleEntity(defaultSessionKeysBundleDto());

        expect(() => {
          entity.data = "test";
        }).toThrow(EntityValidationError);
      });
    });
  });

  describe("::isDecrypted", () => {
    it("should return true if the data is decrypted", () => {
      expect.assertions(1);

      const dto = decryptedSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity.isDecrypted).toStrictEqual(true);
    });

    it("should return false if the data is encrypted", () => {
      expect.assertions(1);

      const dto = defaultSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity.isDecrypted).toStrictEqual(false);
    });
  });

  describe("::toDto", () => {
    it("should export all fields from props: with data encrypted", () => {
      expect.assertions(1);

      const dto = defaultSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity.toDto()).toStrictEqual(dto);
    });

    it("should export all fields from props: with data decrypted", () => {
      expect.assertions(1);

      const dto = decryptedSessionKeysBundleDto();
      const entity = new SessionKeysBundleEntity(dto);

      expect(entity.toDto()).toStrictEqual(dto);
    });
  });
});
