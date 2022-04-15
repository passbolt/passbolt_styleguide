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
    accountRecoveryRequest: {
      id: "54c6278e-f824-5fda-91ff-3e946b18d996",
      status: "pending",
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD",
      created: "2022-01-13T15:27:26.301Z",
      creator: {
        id: "54c6278e-f824-5fda-91ff-3e946b18d994",
        role_id: "c4870358-e32f-41ce-999b-8f80c9b0d17f",
        active: true,
        deleted: false,
        last_logged_in: "",
        profile: {
          avatar: {url: {medium: "img/avatar/user_medium.png", small: "img/avatar/user.png"}},
          created: "2020-09-01T13:11:08+00:00",
          first_name: "Betty",
          id: "f6b23982-d3dd-4f8b-9bcc-f3a473edffc2",
          last_name: "Holberton",
          modified: "2020-09-01T13:11:08+00:00",
          user_id: "5247399c-6c8a-47f0-8880-aa854e01e554",
        },
      },
    },
    onClose: jest.fn(),
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
    onError: jest.fn()
  };
}
