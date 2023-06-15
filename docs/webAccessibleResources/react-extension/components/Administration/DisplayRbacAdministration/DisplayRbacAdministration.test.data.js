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
 * @since         4.1.0
 */

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import {defaultAdministrationWorkspaceContext} from "../../../contexts/AdministrationWorkspaceContext.test.data";
import {defaultActionFeedbackContextContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {
  administrationRbacContextWithUpdatedRbac,
  defaultAdministrationRbacContext,
  populatedAdministrationRbacContext
} from "../../../contexts/Administration/AdministrationRbacContext/AdministrationRbacContext.test.data";
import {DefaultRoleService} from "../../../../shared/services/api/role/roleService.test.data";
import {DefaultRbacService} from "../../../../shared/services/api/rbac/rbacService.test.data";

export function defaultProps(props = {}) {
  return {
    context: defaultAppContext(),
    adminRbacContext: defaultAdministrationRbacContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext(),
    actionFeedbackContext: defaultActionFeedbackContextContext(),
    RoleService: DefaultRoleService,
    RbacService: DefaultRbacService,
    ...props
  };
}

export function propsWithPopulatedRbacContext(props = {}) {
  return defaultProps({
    adminRbacContext: populatedAdministrationRbacContext(),
    ...props
  });
}

export function propsWithDisabledFlag(featureName, props = {}) {
  const siteSettings = {
    getServerTimezone: () => '',
    canIUse: canIUserFeatureName => canIUserFeatureName !== featureName,
  };
  return propsWithPopulatedRbacContext({
    context: defaultAppContext({siteSettings}),
    ...props
  });
}

export function propsWithUpdatedRbacs(props = {}) {
  return propsWithPopulatedRbacContext({
    adminRbacContext: administrationRbacContextWithUpdatedRbac(),
    ...props
  });
}
