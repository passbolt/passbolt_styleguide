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
 * @since         5.10.0
 */
import { v4 as uuidv4 } from "uuid";

/**
 * Returns a default tag object
 * @param {object} data Data to override
 * @returns {object}
 */
export function defaultTagData(data = {}) {
  return {
    id: uuidv4(),
    slug: "test-tag",
    ...data,
  };
}

/**
 * Returns the default component props
 * @param {object} props Props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    tag: defaultTagData(),
    onClick: jest.fn(),
    ...props,
  };
}
