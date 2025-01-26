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
  metadataKeysSettingsFormWithGeneratedKeyDto
} from "./MetadataKeysSettingsFormEntity.test.data";
import MetadataKeysSettingsFormEntity from "./MetadataKeysSettingsFormEntity";
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";

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

    it("validates armored_metadata_private_key property", () => {
      assertEntityProperty.string(MetadataKeysSettingsFormEntity, "armored_metadata_private_key");
      assertEntityProperty.maxLength(MetadataKeysSettingsFormEntity, "armored_metadata_private_key", 10_000);
      assertEntityProperty.nullable(MetadataKeysSettingsFormEntity, "armored_metadata_private_key");
      assertEntityProperty.armoredPrivateKey(MetadataKeysSettingsFormEntity, "armored_metadata_private_key");
    });

    it("validates armored_metadata_public_key property", () => {
      assertEntityProperty.string(MetadataKeysSettingsFormEntity, "armored_metadata_public_key");
      assertEntityProperty.maxLength(MetadataKeysSettingsFormEntity, "armored_metadata_public_key", 10_000);
      assertEntityProperty.nullable(MetadataKeysSettingsFormEntity, "armored_metadata_public_key");
      assertEntityProperty.armoredPublicKey(MetadataKeysSettingsFormEntity, "armored_metadata_public_key");
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
      expect(entity._props.armored_metadata_private_key).toBe(dto.armored_metadata_private_key);
      expect(entity._props.armored_metadata_public_key).toBe(dto.armored_metadata_public_key);
    });
  });

  describe("::toFormDto", () => {
    it("exports form data when no key were generated", () => {
      expect.assertions(1);

      const dto = defaultMetadataKeysSettingsFormDto();
      const settings = new MetadataKeysSettingsFormEntity(dto);

      const expectedDto = {
        allow_usage_of_personal_keys: true,
        zero_knowledge_key_share: false,
      };
      expect(settings.toFormDto()).toStrictEqual(expectedDto);
    });

    it("exports form data containing pending generated metadata key", () => {
      expect.assertions(1);

      const dto = metadataKeysSettingsFormWithGeneratedKeyDto();
      const settings = new MetadataKeysSettingsFormEntity(dto);

      const expectedDto = {
        allow_usage_of_personal_keys: true,
        zero_knowledge_key_share: false,
        armored_metadata_private_key: pgpKeys.eddsa_ed25519.private,
        armored_metadata_public_key: pgpKeys.eddsa_ed25519.public,
      };
      expect(settings.toFormDto()).toStrictEqual(expectedDto);
    });

    it("exports even if invalid", () => {
      expect.assertions(1);

      const settings = new MetadataKeysSettingsFormEntity({
        allow_usage_of_personal_keys: "",
        zero_knowledge_key_share: "",
        armored_metadata_private_key: "",
        armored_metadata_public_key: "",
      }, {validate: false});

      const expectedDto = {
        allow_usage_of_personal_keys: "",
        zero_knowledge_key_share: "",
        armored_metadata_private_key: "",
        armored_metadata_public_key: "",
      };
      expect(settings.toFormDto()).toStrictEqual(expectedDto);
    });
  });
});
