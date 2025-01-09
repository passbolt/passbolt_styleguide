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
 * @since         4.11.0
 */

import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultAdministrationWorkspaceContext} from "../../../contexts/AdministrationWorkspaceContext.test.data";
import {defaultAdministratorAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {
  defaultMetadataTypesSettingsV4Dto
} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    context: defaultAdministratorAppContext(),
    dialogContext: defaultDialogContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    metadataSettingsServiceWorkerService: {
      getOrFindTypesSettings: () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
      saveTypesSettings: jest.fn(settings => new MetadataTypesSettingsEntity(settings.toDto())),
    },
    createPortal: jest.fn,
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    t: text => text,
    ...props
  };
}

/**
 * With allowed version error.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function allowedVersionErrorProps(data = {}) {
  const settingsDto = defaultMetadataTypesSettingsV4Dto();
  settingsDto.allow_creation_of_v4_resources = false;

  return defaultProps({
    metadataSettingsServiceWorkerService: {
      getOrFindTypesSettings: () => new MetadataTypesSettingsEntity(settingsDto, {validate: false})
    },
    ...data
  });
}

/**
 * With resource types deleted warning.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function resourceTypesDeletedProps(data = {}) {
  return defaultProps({
    resourceTypes: new ResourceTypesCollection(),
    ...data
  });
}
