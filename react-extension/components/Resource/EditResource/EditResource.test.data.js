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


/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    context: defaultAppContext(),
    resource: defaultResourceDto({resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT}),
    actionFeedbackContext: defaultActionFeedbackContext(),
    resourcePasswordGeneratorContext: defaultResourcePasswordGeneratorContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      getHierarchyFolderCache: () => [{name: "Folder", id: "1"}, {name: "subfolder", id: "2"}]
    }),
    passwordExpiryContext: defaultPasswordExpirySettingsContext(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
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
