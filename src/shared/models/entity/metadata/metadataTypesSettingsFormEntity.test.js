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

import {RESOURCE_TYPE_VERSION_4} from "./metadataTypesSettingsEntity";
import MetadataTypesSettingsFormEntity from "./metadataTypesSettingsFormEntity";
import {defaultMetadataTypesSettingsV50FreshDto} from "./metadataTypesSettingsEntity.test.data";

describe("MetadataTypesSettingsFormEntity", () => {
  describe("::createForLoadingForm", () => {
    it("creates for loading administration form", () => {
      expect.assertions(12);
      const entity = MetadataTypesSettingsFormEntity.createForLoadingForm();

      expect(entity._props.default_resource_types).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_folder_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_tag_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.default_comment_type).toEqual(RESOURCE_TYPE_VERSION_4);
      expect(entity._props.allow_creation_of_v5_resources).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v5_comments).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_resources).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_folders).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_tags).toBeFalsy();
      expect(entity._props.allow_creation_of_v4_comments).toBeFalsy();
    });
  });

  describe("::toFormDto", () => {
    it("should export only the properties handled by the form", () => {
      expect.assertions(1);

      const dto = defaultMetadataTypesSettingsV50FreshDto();
      const entity = new MetadataTypesSettingsFormEntity(dto);

      const expectedDto = {
        default_resource_types: "v5",
        allow_creation_of_v5_resources: true,
        allow_creation_of_v4_resources: false,
      };
      expect(entity.toFormDto()).toStrictEqual(expectedDto);
    });

    it("exports even if invalid", () => {
      expect.assertions(1);

      const entity = MetadataTypesSettingsFormEntity.createForLoadingForm();

      const expectedDto = {
        default_resource_types: "v4",
        allow_creation_of_v5_resources: false,
        allow_creation_of_v4_resources: false,
      };
      expect(entity.toFormDto()).toStrictEqual(expectedDto);
    });
  });
});
