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
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { defaultMetadataKeysSettingsDto } from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
/**
 * Default component props
 * @param props
 * @return {Object}
 */
export const defaultProps = (data = {}) => ({
  context: defaultAppContext(data.context),
  resources: [defaultResourceDto({}, { withTags: true })],
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
  metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
  ...data,
});

/**
 * Default component props
 * @param props
 * @return {Object}
 */
export const noResourcesProps = (data = {}) => ({
  context: defaultAppContext(data.context),
  resources: null,
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
  metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
  ...data,
});

/**
 * Default component props
 * @param props
 * @return {Object}
 */
export const noTagsProps = (data = {}) => ({
  context: defaultAppContext(data.context),
  resources: [],
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
  metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
  ...data,
});

/**
 * Suggested resources props.
 * @param props
 * @return {Object}
 */
export const withFilteredResourcesProps = (data = {}) => {
  const resource1 = defaultResourceDto(
    {
      metadata: {
        name: "apache",
        username: "www-data",
        uris: ["http://www.apache.org/", "http://www.apache.org/projects"],
        description: "Apache is the world\u0027s most used web server software.",
      },
    },
    { withTags: true },
  );

  const resource2 = defaultResourceDto({
    metadata: {
      name: "esaie",
      username: "test",
      uris: ["http://www.essaie.org/"],
      description: "",
    },
    tags: resource1.tags,
  });

  return {
    context: defaultAppContext(data.context),
    resources: [resource1, resource2],
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
    metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
    ...data,
  };
};
