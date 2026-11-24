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
 * @since         5.19.0
 */

import { defaultSecretState } from "./secretState.test.data";

/**
 * Default component props: a username, the page secret state idle.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    username: "admin@passbolt.com",
    onCopy: jest.fn(),
    ...defaultSecretState(),
    ...props,
  };
}

/**
 * Props without username.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function noUsernameProps(props = {}) {
  return defaultProps({ username: null, ...props });
}
