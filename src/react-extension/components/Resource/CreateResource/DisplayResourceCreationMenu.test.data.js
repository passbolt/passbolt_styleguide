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
 * @since         5.0.0
 */

import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {
  resourceTypesCollectionDto,
  resourceTypesV4CollectionDto,
  resourceTypesV5CollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {
  defaultMetadataTypesSettingsV4Dto,
  defaultMetadataTypesSettingsV50FreshDto,
  defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto
} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import {
  resourceTypePasswordAndDescriptionDto,
  resourceTypePasswordDescriptionTotpDto,
  resourceTypePasswordStringDto,
  resourceTypeTotpDto,
  resourceTypeV5DefaultDto,
  resourceTypeV5DefaultTotpDto,
  resourceTypeV5PasswordStringDto,
  resourceTypeV5TotpDto
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";

/**
 * Default props
 * @returns {object}
 */
export const defaultProps = (data = {}) => ({
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  onClose: jest.fn(),
  ...data,
  context: defaultAppContext(data?.context),
  resourceWorkspaceContext: defaultResourceWorkspaceContext({
    ...data?.resourceWorkspaceContext,
    getHierarchyFolderCache: () => [{name: "Folder", id: "1"}, {name: "subfolder", id: "2"}],
  }),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto({
    default_resource_types: "v5",
    ...data?.metadataTypeSettings
  })),
});

/**
 * Props with only v5 content types available
 * @returns {object}
 */
export const onlyV5ContentTypesProps = (data = {}) => defaultProps({
  resourceTypes: new ResourceTypesCollection(resourceTypesV5CollectionDto()),
  ...data,
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50FreshDto(data?.metadataTypeSettings)),
});

/**
 * Props with only v5 content types available
 * @returns {object}
 */
export const onlyV4ContentTypesProps = (data = {}) => defaultProps({
  resourceTypes: new ResourceTypesCollection(resourceTypesV4CollectionDto()),
  ...data,
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto(data?.metadataTypeSettings)),
});

/**
 * Props with full v5 content types and some v4 available
 * @returns {object}
 */
export const fullV5AndPartialV4ContentTypes = (data = {}) => defaultProps({
  resourceTypes: new ResourceTypesCollection([
    resourceTypePasswordStringDto(),
    resourceTypePasswordAndDescriptionDto(),
    resourceTypeV5DefaultDto(),
    resourceTypeV5PasswordStringDto(),
    resourceTypeV5DefaultTotpDto(),
    resourceTypeV5TotpDto()
  ]),
  ...data,
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto(data?.metadataTypeSettings)),
});

/**
 * Props with full v4 content types and some v5 available
 * @returns {object}
 */
export const fullV4AndPartialV5ContentTypes = (data = {}) => defaultProps({
  resourceTypes: new ResourceTypesCollection([
    resourceTypePasswordStringDto(),
    resourceTypePasswordAndDescriptionDto(),
    resourceTypePasswordDescriptionTotpDto(),
    resourceTypeTotpDto(),
    resourceTypeV5TotpDto()
  ]),
  ...data,
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto(data?.metadataTypeSettings)),
});

export const onlyTotpV5ContentTypes = (data = {}) => defaultProps({
  resourceTypes: new ResourceTypesCollection([
    resourceTypeV5TotpDto()
  ]),
  ...data,
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto(data?.metadataTypeSettings)),
});

export const onlyPasswordV5ContentTypes = (data = {}) => defaultProps({
  resourceTypes: new ResourceTypesCollection([
    resourceTypeV5DefaultDto(),
    resourceTypeV5PasswordStringDto(),
  ]),
  ...data,
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto(data?.metadataTypeSettings)),
});
