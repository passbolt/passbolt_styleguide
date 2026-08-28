/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.7.4
 */
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import { defaultResourceDto } from "../../../shared/models/entity/resource/resourceEntity.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import { defaultMetadataTypesSettingsV4Dto } from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import { updatePermissionDto } from "../../../shared/models/entity/permission/permissionEntity.test.data";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { defaultMetadataKeysSettingsDto } from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";

/**
 * Default component props
 * @param props
 * @return {Object}
 */
export const defaultProps = (data = {}) => ({
  context: defaultAppContext(),
  resources: null,
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
  metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
  ...data,
});

/**
 * No filtered resources props.
 * @param props
 * @return {Object}
 */
export const noFilteredResourcesProps = (data = {}) => ({
  context: defaultAppContext(),
  resources: [],
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
  metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
  ...data,
});

/**
 * No filtered resources props.
 * @param props
 * @return {Object}
 */
export const withFilteredResourcesProps = (data = {}) => ({
  context: defaultAppContext(data.context),
  resources: [
    defaultResourceDto(
      {
        permission: updatePermissionDto(),
        metadata: {
          name: "apache",
          username: "www-data",
          uris: ["http://www.apache.org/", "http://www.apache.org/projects"],
          description: "Apache is the world's most used web server software.",
        },
      },
      { withFavorite: true },
    ),
    defaultResourceDto(
      {
        permission: updatePermissionDto(),
        metadata: {
          name: "esaie",
          username: "test",
          uris: ["http://www.essaie.org/"],
          description: "",
        },
      },
      { withFavorite: true },
    ),
  ],
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
  metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
  ...data,
});
