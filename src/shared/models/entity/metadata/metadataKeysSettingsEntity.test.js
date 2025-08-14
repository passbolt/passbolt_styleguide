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
 * @since         4.10.0
 */

import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import {defaultMetadataKeysSettingsDto} from "./metadataKeysSettingsEntity.test.data";
import MetadataKeysSettingsEntity from "./metadataKeysSettingsEntity";
import {defaultMetadataPrivateKeyDto} from "./metadataPrivateKeyEntity.test.data";

describe("MetadataKeysSettings", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataKeysSettingsEntity.name, MetadataKeysSettingsEntity.getSchema());
    });

    it("validates allow_creation_of_v5_resources property", () => {
      assertEntityProperty.boolean(MetadataKeysSettingsEntity, "allow_usage_of_personal_keys");
      assertEntityProperty.required(MetadataKeysSettingsEntity, "allow_usage_of_personal_keys");
    });

    it("validates allow_creation_of_v5_folders property", () => {
      assertEntityProperty.boolean(MetadataKeysSettingsEntity, "zero_knowledge_key_share");
      assertEntityProperty.required(MetadataKeysSettingsEntity, "zero_knowledge_key_share");
    });

    it("validates metadata_private_keys property", () => {
      const metadataKeysSettingsDto = defaultMetadataKeysSettingsDto();
      const successScenarios = [
        {scenario: "a valid option", value: [defaultMetadataPrivateKeyDto()]},
      ];
      const failScenarios = [
        {scenario: "with invalid metadata private key build rule", value: [{}]},
      ];
      assertEntityProperty.assertAssociation(MetadataKeysSettingsEntity, "metadata_private_keys", metadataKeysSettingsDto, successScenarios, failScenarios);
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal dto is provided.", () => {
      expect.assertions(2);
      const dto = defaultMetadataKeysSettingsDto();
      const entity = new MetadataKeysSettingsEntity(dto);

      expect(entity._props.allow_usage_of_personal_keys).toBeTruthy();
      expect(entity._props.zero_knowledge_key_share).toBeFalsy();
    });

    it("constructor works if valid DTO is provided", () => {
      expect.assertions(3);
      const dto = defaultMetadataKeysSettingsDto({}, {withMetadataPrivateKeys: true});
      const entity = new MetadataKeysSettingsEntity(dto);

      expect(entity._props.allow_usage_of_personal_keys).toBeTruthy();
      expect(entity._props.zero_knowledge_key_share).toBeFalsy();
      expect(entity._metadataPrivateKeys).toStrictEqual(new ShareMetadataPrivateKeysCollection(dto.metadata_private_keys));
    });

    it("constructor throw an error if the zero knowledge is true and the private metadata key is defined", () => {
      expect.assertions(1);
      const dto = defaultMetadataKeysSettingsDto({zero_knowledge_key_share: true}, {withMetadataPrivateKeys: true});
      expect(() => new MetadataKeysSettingsEntity(dto)).toThrowEntityValidationError("metadata_private_keys", "not_defined_for_zero_knowledge");
    });
  });

  describe("::createFromDefault", () => {
    it("creates from default metadata keys settings", () => {
      expect.assertions(2);
      const entity = MetadataKeysSettingsEntity.createFromDefault();

      expect(entity._props.allow_usage_of_personal_keys).toBeTruthy();
      expect(entity._props.zero_knowledge_key_share).toBeFalsy();
    });

    it("creates from default metadata keys settings with data overridden", () => {
      expect.assertions(2);
      const entity = MetadataKeysSettingsEntity.createFromDefault({allow_usage_of_personal_keys: false, zero_knowledge_key_share: true});

      expect(entity._props.allow_usage_of_personal_keys).toBeFalsy();
      expect(entity._props.zero_knowledge_key_share).toBeTruthy();
    });
  });

  describe("::allowUsageOfPersonalKeys", () => {
    it("get allow_usage_of_personal_keys property value", () => {
      expect.assertions(2);
      let entity = new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto());
      expect(entity.allowUsageOfPersonalKeys).toBeTruthy();
      entity = new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto({allow_usage_of_personal_keys: false}));
      expect(entity.allowUsageOfPersonalKeys).toBeFalsy();
    });
  });

  describe("::zeroKnowledgeKeyShare", () => {
    it("get zero_knowledge_key_share property value", () => {
      expect.assertions(2);
      let entity = new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto());
      expect(entity.zeroKnowledgeKeyShare).toBeFalsy();
      entity = new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto({zero_knowledge_key_share: true}));
      expect(entity.zeroKnowledgeKeyShare).toBeTruthy();
    });
  });
});
