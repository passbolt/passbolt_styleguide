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

import MockPort from "../../../test/mock/MockPort";

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
    importAccountKitContext: {
      verifyAccountKit: jest.fn(),
    },
  };
  return Object.assign(defaultProps, data);
}

/**
 * file to upload
 */
export function mockFile(data = {}) {
  const defaultFile = {
    name: "account-kit.passbolt",
    content: "test content",
    contentType: "application/passbolt",
  };
  return Object.assign(defaultFile, data);
}
