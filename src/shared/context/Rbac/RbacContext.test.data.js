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
 * Returns the default administrator rbac context for the unit test.
 * @param {Object} data Override the default context.
 * @returns {Object)}
 */
export function defaultAdministratorRbacContext(data = {}) {
  return {
    canIUseUiAction: () => true,
    ...data
  };
}

/**
 * Returns the default user rbac context for the unit test.
 * @param {Object} data Override the default context.
 * @returns {Object)}
 */
export function defaultUserRbacContext(data = {}) {
  return {
    canIUseUiAction: () => true,
    ...data
  };
}

/**
 * Returns the full deny rbac context for the unit test.
 * @param {Object} data Override the default context.
 * @returns {Object)}
 */
export function denyRbacContext(data = {}) {
  return {
    canIUseUiAction: () => false,
    ...data
  };
}

export function defaultLoggedInUser(data = {}) {
  const user = {
    role: {
      id: 'a58de6d3-f52c-5080-b79b-a601a647ac85',
      name: 'user',
      description: 'Logged in user',
      created: '2012-07-04T13:39:25+00:00',
      modified: '2012-07-04T13:39:25+00:00'
    },
    groups_users: [
      {
        created: "2023-09-06T13:11:21+00:00",
        group_id: "1f0d3803-4cee-4531-b101-59f9133dcbaf",
        id: "3a3d2f56-023b-4e23-a309-7368f01c1baa",
        is_admin: true,
        user_id: "1e0f5056-2516-4956-aa9e-47b1bb6e1f28"
      }
    ]
  };
  return Object.assign(user, data);
}

export function groupsWithoutOwnership(data = {}) {
  const groupsUsers = [
    {
      created: "2023-09-06T13:11:21+00:00",
      group_id: "1f0d3803-4cee-4531-b101-59f9133dcbaf",
      id: "3a3d2f56-023b-4e23-a309-7368f01c1baa",
      is_admin: false,
      user_id: "1e0f5056-2516-4956-aa9e-47b1bb6e1f28"
    }
  ];

  return Object.assign(groupsUsers, data);
}

export function defaultLoggedInAdmin(data = {}) {
  const user = defaultLoggedInUser({
    role: {
      id: 'a58de6d3-f52c-5080-b79b-a601a647ac86',
      name: 'admin',
      description: 'Logged in user',
    }
  })

  return Object.assign(user, data);
}
