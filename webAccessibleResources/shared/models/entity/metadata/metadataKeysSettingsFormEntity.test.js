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
 * @since         4.11.0
 */

import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {
  defaultMetadataKeysSettingsFormDto,
  metadataKeysSettingsFormWithGeneratedKeyDto,
} from "./metadataKeysSettingsFormEntity.test.data";
import MetadataKeysSettingsFormEntity from "./metadataKeysSettingsFormEntity";
import { pgpKeys } from "../../../../../test/fixture/pgpKeys/keys";
import {
  SCENARIO_EMPTY,
  SCENARIO_FALSE,
  SCENARIO_FLOAT,
  SCENARIO_INTEGER,
  SCENARIO_OBJECT,
  SCENARIO_STRING,
  SCENARIO_TRUE,
} from "../../../../../test/assert/assertEntityProperty";

describe("MetadataKeysSettingsFormEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataKeysSettingsFormEntity.name, MetadataKeysSettingsFormEntity.getSchema());
    });

    it("validates allow_creation_of_v5_resources property", () => {
      assertEntityProperty.boolean(MetadataKeysSettingsFormEntity, "allow_usage_of_personal_keys");
      assertEntityProperty.required(MetadataKeysSettingsFormEntity, "allow_usage_of_personal_keys");
    });

    it("validates allow_creation_of_v5_folders property", () => {
      assertEntityProperty.boolean(MetadataKeysSettingsFormEntity, "zero_knowledge_key_share");
      assertEntityProperty.required(MetadataKeysSettingsFormEntity, "zero_knowledge_key_share");
    });

    it("validates generated_private_key property", () => {
      const dto = metadataKeysSettingsFormWithGeneratedKeyDto();
      const successScenario = [{ scenario: "valid gpg key pair entity", value: dto.generated_metadata_key }];

      const failingPrivateKeyScenario = {
        scenario: "invalid private key",
        value: { private_key: { armored_key: "invalid-armored-key" } },
      };
      const failingPublicKeyScenario = {
        scenario: "invalid private key",
        value: { public_key: { armored_key: "invalid-armored-key" } },
      };
      const failingScenario = [
        SCENARIO_EMPTY,
        SCENARIO_STRING,
        SCENARIO_INTEGER,
        SCENARIO_FLOAT,
        SCENARIO_OBJECT,
        SCENARIO_TRUE,
        SCENARIO_FALSE,
        failingPrivateKeyScenario,
        failingPublicKeyScenario,
      ];
      assertEntityProperty.assertAssociation(
        MetadataKeysSettingsFormEntity,
        "generated_metadata_key",
        dto,
        successScenario,
        failingScenario,
      );
      assertEntityProperty.nullable(MetadataKeysSettingsFormEntity, "generated_private_key");
      assertEntityProperty.notRequired(MetadataKeysSettingsFormEntity, "generated_metadata_key");
    });
  });

  describe("::constructor", () => {
    it("constructor works if default is provided.", () => {
      expect.assertions(2);
      const dto = defaultMetadataKeysSettingsFormDto();
      const entity = new MetadataKeysSettingsFormEntity(dto);

      expect(entity._props.allow_usage_of_personal_keys).toBeTruthy();
      expect(entity._props.zero_knowledge_key_share).toBeFalsy();
    });

    it("constructor works with just generated key.", () => {
      expect.assertions(4);
      const dto = metadataKeysSettingsFormWithGeneratedKeyDto();
      const entity = new MetadataKeysSettingsFormEntity(dto);

      expect(entity._props.allow_usage_of_personal_keys).toBeTruthy();
      expect(entity._props.zero_knowledge_key_share).toBeFalsy();
      expect(entity._props.metadata_private_armored_key).toBe(dto.metadata_private_armored_key);
      expect(entity._props.metadata_public_armored_key).toBe(dto.metadata_public_armored_key);
    });
  });

  describe("::toDto", () => {
    it("exports form data when no key were generated", () => {
      expect.assertions(1);

      const dto = defaultMetadataKeysSettingsFormDto();
      const settings = new MetadataKeysSettingsFormEntity(dto);

      const expectedDto = {
        allow_usage_of_personal_keys: true,
        zero_knowledge_key_share: false,
        generated_metadata_key: null,
      };
      expect(settings.toDto()).toStrictEqual(expectedDto);
    });

    it("exports form data containing pending generated metadata key", () => {
      expect.assertions(1);

      const dto = metadataKeysSettingsFormWithGeneratedKeyDto();
      const settings = new MetadataKeysSettingsFormEntity(dto);

      const expectedDto = {
        allow_usage_of_personal_keys: true,
        zero_knowledge_key_share: false,
        generated_metadata_key: {
          private_key: {
            armored_key: pgpKeys.eddsa_ed25519.private,
          },
          public_key: {
            armored_key: pgpKeys.eddsa_ed25519.public,
          },
        },
      };
      expect(settings.toDto()).toStrictEqual(expectedDto);
    });

    it("exports even if invalid", () => {
      expect.assertions(1);

      const settings = new MetadataKeysSettingsFormEntity(
        {
          allow_usage_of_personal_keys: "",
          zero_knowledge_key_share: "",
          metadata_private_armored_key: "",
          metadata_public_armored_key: "",
          generated_metadata_key: "",
        },
        { validate: false },
      );

      const expectedDto = {
        allow_usage_of_personal_keys: "",
        zero_knowledge_key_share: "",
        metadata_private_armored_key: "",
        metadata_public_armored_key: "",
        generated_metadata_key: null,
      };
      expect(settings.toDto()).toStrictEqual(expectedDto);
    });
  });
});
