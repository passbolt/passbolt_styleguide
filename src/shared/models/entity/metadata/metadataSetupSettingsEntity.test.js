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
 * @since         5.4.0
 */
import EntitySchema from "passbolt-styleguide/src/shared/models/entity/abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import MetadataSetupSettingsEntity from "./metadataSetupSettingsEntity";
import {defaultMetadataSetupSettingsDto, enableMetadataSetupSettingsDto} from "./metadataSetupSettingsEntity.test.data";

describe("MetadataSetupSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataSetupSettingsEntity.name, MetadataSetupSettingsEntity.getSchema());
    });

    it("validates enable_encrypted_metadata_on_install property", () => {
      assertEntityProperty.boolean(MetadataSetupSettingsEntity, "enable_encrypted_metadata_on_install");
      assertEntityProperty.required(MetadataSetupSettingsEntity, "enable_encrypted_metadata_on_install");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(1);
      const dto = defaultMetadataSetupSettingsDto();
      const entity = new MetadataSetupSettingsEntity(dto);

      expect(entity._props.id).toBeUndefined();
    });
  });

  describe("::getters", () => {
    it("`enableEncryptedMetadataOnInstall` should return the right value", () => {
      expect.assertions(2);
      const dto1 = defaultMetadataSetupSettingsDto();
      const entity1 = new MetadataSetupSettingsEntity(dto1);

      const dto2 = enableMetadataSetupSettingsDto();
      const entity2 = new MetadataSetupSettingsEntity(dto2);

      expect(entity1.enableEncryptedMetadataOnInstall).toStrictEqual(false);
      expect(entity2.enableEncryptedMetadataOnInstall).toStrictEqual(true);
    });
  });

  describe("::createFromDefault", () => {
    it("should give a default entity when no parameters are given", () => {
      expect.assertions(2);
      const entity = MetadataSetupSettingsEntity.createFromDefault();

      expect(entity).toBeInstanceOf(MetadataSetupSettingsEntity);
      expect(entity.enableEncryptedMetadataOnInstall).toStrictEqual(false);
    });

    it("should give a valid entity when parameters are given", () => {
      expect.assertions(2);
      const entity = MetadataSetupSettingsEntity.createFromDefault(enableMetadataSetupSettingsDto());

      expect(entity).toBeInstanceOf(MetadataSetupSettingsEntity);
      expect(entity.enableEncryptedMetadataOnInstall).toStrictEqual(true);
    });
  });
});
