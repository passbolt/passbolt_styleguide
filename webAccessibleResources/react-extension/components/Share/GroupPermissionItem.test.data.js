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
 * @since         5.13.0
 */
import { defaultGroupDto } from "../../../shared/models/entity/group/groupEntity.test.data";

/**
 * Returns the default props for the unit test
 * @param {object} data Props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    id: "some-uuid",
    group: defaultGroupDto({ name: "Developer" }),
    permissionType: 15,
    updated: false,
    disabled: false,
    onUpdate: jest.fn(),
    onDelete: jest.fn(),
    onToggleGroupMemberVisibility: jest.fn(),
    ...data,
  };
}

/**
 * Returns props with a "can read" permission (type 1)
 * @param {object} data Props to override
 * @returns {object}
 */
export function defaultReadProps(data = {}) {
  return defaultProps({ permissionType: 1, ...data });
}

/**
 * Returns props with a "can update" permission (type 7)
 * @param {object} data Props to override
 * @returns {object}
 */
export function defaultUpdateProps(data = {}) {
  return defaultProps({ permissionType: 7, ...data });
}

/**
 * Returns props with an "is owner" permission (type 15)
 * @param {object} data Props to override
 * @returns {object}
 */
export function defaultOwnerProps(data = {}) {
  return defaultProps({ permissionType: 15, ...data });
}

/**
 * Returns props with a "varies" permission (-1) and variesDetails set
 * @param {object} data Props to override
 * @returns {object}
 */
export function defaultVariesProps(data = {}) {
  return defaultProps({
    permissionType: -1,
    variesDetails: { 0: [], 1: ["apache"], 7: ["cakephp"], 15: [] },
    ...data,
  });
}
