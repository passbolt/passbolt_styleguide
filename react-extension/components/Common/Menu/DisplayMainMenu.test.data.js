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

import {defaultAdministratorAppContext, defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultAdministratorRbacContext, denyRbacContext} from "../../../../shared/context/Rbac/RbacContext.test.data";

/**
 * Default user props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultUserProps(props = {}) {
  return {
    context: defaultUserAppContext(props?.context),
    rbacContext: defaultAdministratorRbacContext(props?.rbacContext),
    ...props
  };
}

/**
 * Default administrator props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultAdministratorProps(props = {}) {
  return defaultUserProps({
    context: defaultAdministratorAppContext(),
    ...props,
  });
}

/**
 * Props for user having a denied access to the users workspace.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function deniedUsersWorkspaceRbacProps(props = {}) {
  return defaultUserProps({
    rbacContext: denyRbacContext({}),
    ...props
  });
}
