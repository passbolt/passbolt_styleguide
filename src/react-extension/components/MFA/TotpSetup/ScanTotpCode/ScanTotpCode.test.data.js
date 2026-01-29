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
 * @since         4.4.0
 */

import { defaultAppContext } from "../../../../contexts/ExtAppContext.test.data";

export function defaultProps(props = {}) {
  return {
    context: defaultAppContext(),
    mfaContext: mockMfaContext(props),
  };
}

export function mockMfaContext(props = {}) {
  return {
    navigate: jest.fn(),
    validateTotpCode: jest.fn(),
    findMfaSettings: jest.fn(),
    goToProviderList: jest.fn(),
    isProcessing: jest.fn(),
    ...props,
  };
}
