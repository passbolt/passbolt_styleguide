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

import {defaultUserRbacContext, denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {
  defaultResourceDto, resourceStandaloneTotpDto, resourceWithReadPermissionDto, resourceWithTotpDto,
  resourceWithUpdatePermissionDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {defaultClipboardContext} from "../../../contexts/Clipboard/ManagedClipboardServiceProvider.test.data";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultUserAppContext(),
    rbacContext: defaultUserRbacContext(),
    resource: defaultResourceDto(),
    hide: jest.fn(),
    left: 10,
    top: 10,
    dialogContext: defaultDialogContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    passwordExpiryContext: defaultPasswordExpirySettingsContext({policy_override: true}),
    clipboardContext: defaultClipboardContext(),
    ...data
  };
}

/**
 * Props with a selected resource with totp where the user has a read only permission on
 * @returns {object}
 */
export function propsResourceTotp() {
  return {
    ...defaultProps(),
    resource: resourceWithTotpDto(),
  };
}

/**
 * Props with a selected resource with totp where the user has a read only permission on
 * @returns {object}
 */
export function propsResourceStandaloneTotp() {
  return {
    ...defaultProps(),
    resource: resourceStandaloneTotpDto(),
  };
}

/**
 * Props with a selected resource where the user has a read only permission on
 * @returns {object}
 */
export function propsResourceWithReadOnlyPermission() {
  return {
    ...defaultProps(),
    resource: resourceWithReadPermissionDto(),
  };
}

/**
 * Props with a selected resource where the user has an update permission on
 * @returns {object}
 */
export function propsResourceWithUpdatePermission() {
  return {
    ...defaultProps(),
    resource: resourceWithUpdatePermissionDto(),
  };
}

/**
 * Props with copy password denied by rbac
 * @returns {object}
 */
export function propsDenyUIActions() {
  return {
    ...defaultProps(),
    rbacContext: denyRbacContext()
  };
}
