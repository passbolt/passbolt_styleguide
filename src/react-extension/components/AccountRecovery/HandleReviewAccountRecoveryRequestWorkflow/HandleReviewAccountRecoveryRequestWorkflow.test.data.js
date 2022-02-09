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
 * @since         3.6.0
 */
import MockPort from "../../../test/mock/MockPort";

/**
 * Default props
 * @returns {*}
 */
export function defaultProps() {
  return {
    context: {
      port: new MockPort(),
      loggedInUser: {
        id: "c4870358-e32f-41ce-999b-8f80c9b0d17f"
      }
    },
    accountRecoveryContext: {
      findAccountRecoveryPolicy: jest.fn(),
      getOrganizationPolicy: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    },
    user: {
      pending_account_recovery_user_request: {
        id: "c4870358-e32f-41ce-999c-8f80c9b0d17r"
      }
    },
    actionFeedbackContext: {
      displaySuccess: jest.fn()
    },
    onStop: jest.fn(),
    t: text => text
  };
}
