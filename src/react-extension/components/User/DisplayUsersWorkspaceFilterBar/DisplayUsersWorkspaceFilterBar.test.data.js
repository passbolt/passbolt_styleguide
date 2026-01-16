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
import { defaultAppContext, defaultUserAppContext } from "../../../contexts/ExtAppContext.test.data";
import { UserWorkspaceFilterTypes } from "../../../contexts/UserWorkspaceContext";
import {
  defaultUserWorkspaceContext,
  users,
  usersWithAttentionRequiredStates,
} from "../../../contexts/UserWorkspaceContext.test.data";
import {
  defaultAdministratorRbacContext,
  defaultUserRbacContext,
  denyRbacContext,
} from "../../../../shared/context/Rbac/RbacContext.test.data";
import RbacsCollection from "../../../../shared/models/entity/rbac/rbacsCollection";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    userWorkspaceContext: defaultUserWorkspaceContext(),
    rbacContext: new RbacsCollection([]),
    history: {
      push: jest.fn(),
    },
    ...data,
  };
}

/**
 * Props filter by shared.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function propsFilterBySuspended(data = {}) {
  return defaultProps({
    userWorkspaceContext: defaultUserWorkspaceContext({ filter: { type: UserWorkspaceFilterTypes.SUSPENDED_USER } }),
    ...data,
  });
}

export function defaultPropsWithoutAttentionRequiredUsers(data = {}) {
  return {
    userWorkspaceContext: defaultUserWorkspaceContext(),
    context: defaultAppContext({
      users: users,
    }),
    rbacContext: denyRbacContext(),
    history: {
      push: jest.fn(),
    },
    ...data,
  };
}

export function defaultPropsWithAttentionRequiredUsers(data = {}) {
  return {
    userWorkspaceContext: defaultUserWorkspaceContext(),
    context: defaultAppContext({
      users: usersWithAttentionRequiredStates,
    }),
    rbacContext: defaultAdministratorRbacContext(),
    history: {
      push: jest.fn(),
    },
    ...data,
  };
}

export function propsWithAttentionFilter(data = {}) {
  return {
    userWorkspaceContext: defaultUserWorkspaceContext(),
    context: defaultAppContext({
      users: usersWithAttentionRequiredStates,
    }),
    rbacContext: defaultAdministratorRbacContext(),
    history: {
      push: jest.fn(),
    },
    ...data,
  };
}

export function propsWithAttentionRequiredUsersNotAdmin(data = {}) {
  return {
    userWorkspaceContext: defaultUserWorkspaceContext(),
    context: defaultUserAppContext({
      users: usersWithAttentionRequiredStates,
    }),
    rbacContext: denyRbacContext(),
    history: {
      push: jest.fn(),
    },
    ...data,
  };
}

export function propsWithAttentionRequiredUsersNotAdminWithRbacAllowed(data = {}) {
  return {
    userWorkspaceContext: defaultUserWorkspaceContext(),
    context: defaultUserAppContext({
      users: usersWithAttentionRequiredStates,
    }),
    rbacContext: defaultUserRbacContext(),
    history: {
      push: jest.fn(),
    },
    ...data,
  };
}

export function propsWithUsersFilteredByAccountRecovery(data = {}) {
  return {
    userWorkspaceContext: defaultUserWorkspaceContext({
      filter: { type: UserWorkspaceFilterTypes.ACCOUNT_RECOVERY_REQUEST },
    }),
    context: defaultAppContext({
      users: usersWithAttentionRequiredStates,
    }),
    rbacContext: defaultUserRbacContext(),
    history: {
      push: jest.fn(),
    },
    ...data,
  };
}

export function propsWithUsersFilteredByMissingMetadata(data = {}) {
  return {
    userWorkspaceContext: defaultUserWorkspaceContext({
      filter: { type: UserWorkspaceFilterTypes.MISSING_METADATA_KEY },
    }),
    context: defaultAppContext({
      users: usersWithAttentionRequiredStates,
    }),
    rbacContext: defaultAdministratorRbacContext(),
    history: {
      push: jest.fn(),
    },
    ...data,
  };
}
