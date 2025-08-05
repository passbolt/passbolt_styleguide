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
import MetadataGettingStartedSettingsEntity from "./metadataGettingStartedSettingsEntity";
import {defaultMetadataGettingStartedSettingsDto, enableMetadataGettingStartedSettingsDto} from "./metadataGettingStartedSettingsEntity.test.data";

describe("MetadataGettingStartedSettingsEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MetadataGettingStartedSettingsEntity.name, MetadataGettingStartedSettingsEntity.getSchema());
    });

    it("validates enabled property", () => {
      assertEntityProperty.boolean(MetadataGettingStartedSettingsEntity, "enabled");
      assertEntityProperty.required(MetadataGettingStartedSettingsEntity, "enabled");
    });
  });

  describe("::constructor", () => {
    it("constructor works if valid minimal DTO is provided", () => {
      expect.assertions(1);
      const dto = defaultMetadataGettingStartedSettingsDto();
      const entity = new MetadataGettingStartedSettingsEntity(dto);

      expect(entity._props.enabled).toBeDefined();
    });
  });

  describe("::getters", () => {
    it("`enableEncryptedMetadataOnInstall` should return the right value", () => {
      expect.assertions(2);
      const dto1 = defaultMetadataGettingStartedSettingsDto();
      const entity1 = new MetadataGettingStartedSettingsEntity(dto1);

      const dto2 = enableMetadataGettingStartedSettingsDto();
      const entity2 = new MetadataGettingStartedSettingsEntity(dto2);

      expect(entity1.enabled).toStrictEqual(false);
      expect(entity2.enabled).toStrictEqual(true);
    });
  });

  describe("::createFromDefault", () => {
    it("should give a default entity when no parameters are given", () => {
      expect.assertions(2);
      const entity = MetadataGettingStartedSettingsEntity.createFromDefault();

      expect(entity).toBeInstanceOf(MetadataGettingStartedSettingsEntity);
      expect(entity.enabled).toStrictEqual(false);
    });

    it("should give a valid entity when parameters are given", () => {
      expect.assertions(2);
      const entity = MetadataGettingStartedSettingsEntity.createFromDefault(enableMetadataGettingStartedSettingsDto());

      expect(entity).toBeInstanceOf(MetadataGettingStartedSettingsEntity);
      expect(entity.enabled).toStrictEqual(true);
    });
  });
});
