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
 * @since         4.12.0
 */

import EntitySchema from "../abstract/entitySchema";
import * as assertEntityProperty from "../../../../../test/assert/assertEntityProperty";
import MigrateMetadataEntity from "./migrateMetadataEntity";
import {defaultMigrateMetadataDto} from "./migrateMetadataEntity.test.data";

describe("MigrateMetadataEntity", () => {
  describe("::getSchema", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(MigrateMetadataEntity.name, MigrateMetadataEntity.getSchema());
    });

    it("validates migrate_resources_to_v5 property", () => {
      assertEntityProperty.boolean(MigrateMetadataEntity, "migrate_resources_to_v5");
      assertEntityProperty.notRequired(MigrateMetadataEntity, "migrate_resources_to_v5");
    });

    it("validates migrate_folders_to_v5 property", () => {
      assertEntityProperty.boolean(MigrateMetadataEntity, "migrate_folders_to_v5");
      assertEntityProperty.notRequired(MigrateMetadataEntity, "migrate_folders_to_v5");
    });

    it("validates migrate_tags_to_v5 property", () => {
      assertEntityProperty.boolean(MigrateMetadataEntity, "migrate_tags_to_v5");
      assertEntityProperty.notRequired(MigrateMetadataEntity, "migrate_tags_to_v5");
    });

    it("validates migrate_comments_to_v5 property", () => {
      assertEntityProperty.boolean(MigrateMetadataEntity, "migrate_comments_to_v5");
      assertEntityProperty.notRequired(MigrateMetadataEntity, "migrate_comments_to_v5");
    });

    it("validates migrate_personal_content property", () => {
      assertEntityProperty.boolean(MigrateMetadataEntity, "migrate_personal_content");
      assertEntityProperty.notRequired(MigrateMetadataEntity, "migrate_personal_content");
    });
  });

  describe("::constructor", () => {
    it("constructor works if minimal dto is provided.", () => {
      expect.assertions(5);
      const entity = new MigrateMetadataEntity({});

      expect(entity._props.migrate_resources_to_v5).toStrictEqual(true);
      expect(entity._props.migrate_folders_to_v5).toStrictEqual(false);
      expect(entity._props.migrate_tags_to_v5).toStrictEqual(false);
      expect(entity._props.migrate_comments_to_v5).toStrictEqual(false);
      expect(entity._props.migrate_personal_content).toStrictEqual(false);
    });

    it("constructor works if a dto is provided.", () => {
      expect.assertions(5);
      const dto = defaultMigrateMetadataDto();
      const entity = new MigrateMetadataEntity(dto);

      expect(entity._props.migrate_resources_to_v5).toStrictEqual(false);
      expect(entity._props.migrate_folders_to_v5).toStrictEqual(true);
      expect(entity._props.migrate_tags_to_v5).toStrictEqual(true);
      expect(entity._props.migrate_comments_to_v5).toStrictEqual(true);
      expect(entity._props.migrate_personal_content).toStrictEqual(true);
    });
  });

  describe("::toDto", () => {
    it("exports form data when no key were generated", () => {
      expect.assertions(1);

      const settings = new MigrateMetadataEntity(defaultMigrateMetadataDto({
        migrate_resources_to_v5: true,
      }));

      const expectedDto = {
        migrate_resources_to_v5: true,
        migrate_folders_to_v5: true,
        migrate_tags_to_v5: true,
        migrate_comments_to_v5: true,
        migrate_personal_content: true,
      };
      expect(settings.toDto()).toStrictEqual(expectedDto);
    });
  });
});
