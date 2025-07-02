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

import {defaultResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext.test.data";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {
  TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
  TEST_RESOURCE_TYPE_V5_DEFAULT, TEST_RESOURCE_TYPE_V5_TOTP,
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultPasswordPoliciesContext} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultPasswordPoliciesDto} from "../../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import MetadataTypesSettingsEntity from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto
} from "../../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import {
  defaultResourceMetadataDto
} from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import {v4 as uuidv4} from "uuid";


/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    context: defaultAppContext({
      getHierarchyFolderCache: () => [{name: "Folder", id: "1"}, {name: "subfolder", id: "2"}]
    }),
    resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT}),
    actionFeedbackContext: defaultActionFeedbackContext(),
    resourcePasswordGeneratorContext: defaultResourcePasswordGeneratorContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
    passwordExpiryContext: defaultPasswordExpirySettingsContext(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV50OngoingMigrationFromV4Dto({
      default_resource_types: "v5",
      ...data?.metadataTypeSettings
    })),
    passwordPoliciesContext: defaultPasswordPoliciesContext({
      policies: defaultPasswordPoliciesDto({
        external_dictionary_check: false,
      })
    }),
    onClose: jest.fn(),
    dialogContext: defaultDialogContext(),
  };

  return Object.assign(defaultData, data);
}

/**
 * Default totp props
 * @returns {*}
 */
export function defaultTotpProps(data = {}) {
  const defaultData = defaultProps({
    resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_TOTP}),
  });

  return Object.assign(defaultData, data);
}

/**
 * Default custom fields props
 * @returns {*}
 */
export function defaultCustomFieldsProps(data = {}) {
  const customFieldUuid = uuidv4();
  const customFields = [{
    id: customFieldUuid,
    type: "text",
    metadata_key: "key-0"
  }];
  const metadata = defaultResourceMetadataDto({resource_type_id: TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS, custom_fields: customFields});
  const defaultData = defaultProps({
    resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS, metadata: metadata}),
  });

  return Object.assign(defaultData, data);
}
