/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultResourceWorkspaceContext, resourceWorkspaceContextWithSelectedResourceIOwn} from "../../../contexts/ResourceWorkspaceContext.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {defaultAdministratorRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {TEST_RESOURCE_TYPE_PASSWORD_STRING} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto
} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultClipboardContext} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider.test.data";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const resourceWorkspaceContext = data.resourceWorkspaceContext || resourceWorkspaceContextWithSelectedResourceIOwn();
  delete data.resourceWorkspaceContext;
  return {
    context: defaultUserAppContext(data.context),
    rbacContext: defaultAdministratorRbacContext(data.rbacContext),
    resourceWorkspaceContext: resourceWorkspaceContext,
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto({
      default_resource_types: "v5",
      ...data?.metadataTypeSettings
    })),
    actionFeedbackContext: defaultActionFeedbackContext(),
    clipboardContext: defaultClipboardContext(),
    ...data,
  };
}

/**
 * Props with unencrypted resource description
 * @returns {object}
 */
export function propsWithUnencryptedDescriptionResource(data = {}) {
  const resourceWorkspaceContext = defaultResourceWorkspaceContext({
    details: {
      resource: defaultResourceDto({
        resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING
      }),
    },
    ...data
  });

  return {
    context: defaultUserAppContext(),
    resourceWorkspaceContext: resourceWorkspaceContext,
    rbacContext: defaultAdministratorRbacContext(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto({
      default_resource_types: "v5",
      ...data?.metadataTypeSettings
    })),
    actionFeedbackContext: defaultActionFeedbackContext(),
    initialEntries: `/app/passwords/view/${resourceWorkspaceContext.details.resource.id}`,
    ...data,
  };
}
