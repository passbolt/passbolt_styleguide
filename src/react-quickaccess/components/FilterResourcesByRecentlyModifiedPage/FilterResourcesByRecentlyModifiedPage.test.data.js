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
import {defaultResourceDto} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultAppContext} from "../../contexts/AppContext.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {resourceTypesCollectionDto} from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV4Dto
} from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";

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
  ...data
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
  ...data,
});

/**
 * Suggested resources props.
 * @param props
 * @return {Object}
 */
export const withFilteredResourcesProps = (data = {}) => ({
  context: defaultAppContext(data.context),
  resources: [
    defaultResourceDto({
      metadata: {
        name: "apache",
        username: "www-data",
        uri: "http://www.apache.org/",
        description: "Apache is the world's most used web server software.",
      }
    }, {withFavorite: true}),
    defaultResourceDto({
      metadata: {
        name: "esaie",
        username: "test",
        uri: "http://www.essaie.org/",
        description: "",
      }
    }, {withFavorite: true}),
  ],
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
  ...data,
});

