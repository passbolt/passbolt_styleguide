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
export function defaultProps() {
  return {
    context: {
      locale: 'en-GB',
      userSettings: {
        getTrustedDomain: () => (new URL(window.location.href)).origin
      },
      loggedInUser: {
        id: '54c6278e-f824-5fdb-91ff-3e946b18c996'
      }
    },
    user: {
      id: "54c6278e-f824-5fda-91ff-3e946b18d994",
      profile: {
        first_name: "Betty"
      },
      pending_account_recovery_user_request: {
        id: "54c6278e-f824-5fda-91ff-3e946b18d997",
        created: "2021-05-25T09:08:34.123",
        fingerprint: "0c1d1761110d1e33c9006d1a5b1b332e"
      },
    },
    onClose: jest.fn(),
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
    onError: jest.fn()
  };
}
