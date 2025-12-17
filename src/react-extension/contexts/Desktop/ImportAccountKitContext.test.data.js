/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import { v4 as uuidv4 } from "uuid";
import MockPort from "../../test/mock/MockPort";

export const defaultAccountKit = (data = {}) => {
  const defaultData = {
    domain: "https://passbolt.local",
    user_id: uuidv4(),
    username: "ada@passbolt.dev",
    first_name: "Ada",
    last_name: "Lovelace",
    user_public_armored_key: "",
    user_private_armored_key: "",
    server_public_armored_key: "",
    security_token: defaultSecurityTokenDto(data?.security_token),
  };

  delete data?.securityToken;

  return Object.assign(defaultData, data);
};

export const defaultSecurityTokenDto = (data = {}) => {
  const defaultData = {
    code: "HGA",
    color: "#8bc34a",
    textcolor: "#000000",
  };

  return Object.assign(defaultData, data);
};

/**
 * Default props.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: {
      port: new MockPort(),
    },
  };
  return Object.assign(defaultProps, data);
}

/**
 * Returns the default import account kit context context for the unit test
 * @param context An existing context
 * @returns {object}
 */
export function defaultImportAccountKitContext(context = {}) {
  return {
    state: null,
    unexpectedError: null,
    navigate: jest.fn(),
    isProcessing: jest.fn(),
    setProcessing: jest.fn(),
    clearContext: jest.fn(),
    verifyAccountKit: jest.fn(),
    verifyPassphrase: jest.fn(),
    flushAccountKit: jest.fn(),
    ...context,
  };
}
