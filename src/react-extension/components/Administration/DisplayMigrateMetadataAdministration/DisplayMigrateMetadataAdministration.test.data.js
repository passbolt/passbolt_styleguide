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

import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultAdministrationWorkspaceContext} from "../../../contexts/AdministrationWorkspaceContext.test.data";
import {defaultAdministratorAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {
  defaultMetadataTypesSettingsV4Dto,
  defaultMetadataTypesSettingsV6Dto
} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataKeysCollection from "../../../../shared/models/entity/metadata/metadataKeysCollection";
import {defaultMetadataKeysDtos} from "../../../../shared/models/entity/metadata/metadataKeysCollection.test.data";
import PassboltResponsePaginationHeaderEntity from "../../../../shared/models/entity/apiService/PassboltResponsePaginationHeaderEntity";
import {AdministrationWorkspaceMenuTypes} from "../../../contexts/AdministrationWorkspaceContext";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    context: defaultAdministratorAppContext(),
    dialogContext: defaultDialogContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration:  AdministrationWorkspaceMenuTypes.MIGRATE_METADATA
    }),
    actionFeedbackContext: defaultActionFeedbackContext(),
    metadataSettingsServiceWorkerService: {
      findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV6Dto({
        allow_v4_v5_upgrade: true,
      })),
      saveTypesSettings: jest.fn(settings => new MetadataTypesSettingsEntity(settings.toDto())),
    },
    metadataKeysServiceWorkerService: {
      findAll: () => new MetadataKeysCollection(defaultMetadataKeysDtos()),
    },
    metadataMigrateContentServiceWorkerService: {
      findCountMetadataMigrateResources: () => new PassboltResponsePaginationHeaderEntity({
        limit: null,
        count: 31,
        page: 1,
      }),
    },
    createPortal: jest.fn,
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    t: text => text,
    ...props
  };
}

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function withMigrationFullyDone(props = {}) {
  return defaultProps({
    metadataMigrateContentServiceWorkerService: {
      findCountMetadataMigrateResources: () => new PassboltResponsePaginationHeaderEntity({
        limit: null,
        count: 0,
        page: 1,
      }),
    },
    ...props,
  });
}
/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function withMissingMetadataKeys(props = {}) {
  return defaultProps({
    metadataKeysServiceWorkerService: {
      findAll: () => new MetadataKeysCollection([]),
    },
    ...props
  });
}

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function withMissingResourceTypes(props = {}) {
  return defaultProps({
    metadataSettingsServiceWorkerService: {
      findTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
      saveTypesSettings: jest.fn(settings => new MetadataTypesSettingsEntity(settings.toDto())),
    },
    resourceTypes: new ResourceTypesCollection([]),
    ...props
  });
}
