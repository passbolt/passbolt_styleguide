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

import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import MetadataKeysCollection from "../../../../shared/models/entity/metadata/metadataKeysCollection";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultAdministratorAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {resourceTypesCollectionDto} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {defaultMetadataKeysDtos} from "../../../../shared/models/entity/metadata/metadataKeysCollection.test.data";
import {defaultMetadataTypesSettingsV4Dto} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
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
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export const defaultProps = (props = {}) => ({
  context: defaultAdministratorAppContext(),
  dialogContext: defaultDialogContext(),
  actionFeedbackContext: defaultActionFeedbackContext(),
  metadataSettingsServiceWorkerService: {
    findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
    saveTypesSettings: jest.fn(settings => new MetadataTypesSettingsEntity(settings.toDto())),
  },
  createPortal: jest.fn,
  resourceTypesServiceWorkerService: {
    findAllByDeletedAndNonDeleted: () => new ResourceTypesCollection(resourceTypesCollectionDto()),
  },
  metadataKeysServiceWorkerService: {
    findAll: () => new MetadataKeysCollection(defaultMetadataKeysDtos()),
  },
  ...props
});

export const withoutMetadataKeys = (props = {}) => defaultProps({
  metadataKeysServiceWorkerService: {
    findAll: () => new MetadataKeysCollection([]),
  },
  ...props,
});

const deleted = {deleted: "2025-02-24T09:00:00+00:00"};
export const withOnlyTotpV5Enabled = (props = {}) => defaultProps({
  resourceTypesServiceWorkerService: {
    findAllByDeletedAndNonDeleted: () => new ResourceTypesCollection([
      resourceTypePasswordStringDto(deleted),
      resourceTypePasswordAndDescriptionDto(deleted),
      resourceTypePasswordDescriptionTotpDto(deleted),
      resourceTypeTotpDto(deleted),
      resourceTypeV5DefaultDto(deleted),
      resourceTypeV5PasswordStringDto(deleted),
      resourceTypeV5DefaultTotpDto(deleted),
      resourceTypeV5TotpDto(),
    ]),
  },
  ...props,
});
