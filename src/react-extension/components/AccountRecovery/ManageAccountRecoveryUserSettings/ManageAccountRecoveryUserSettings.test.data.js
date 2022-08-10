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

/**
 * Default props
 * @returns {object}
 */
export function defaultProps(policy) {
  return {
    context: {
      locale: "en-US",
      userSettings: {
        // eslint-disable-next-line no-undef
        getTrustedDomain: () => process.env.ORIGIN_URL
      },
      port: {
        request: jest.fn()
      },
      setContext: jest.fn()
    },
    organizationPolicy: {
      modified: "2022-01-13T15:27:26.301Z",
      creator: {
        profile: {
          first_name: "Ada",
          last_name: "Lovelace"
        },
        gpgkey: {
          fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
        },
      },
      policy: policy
    },
    onClose: jest.fn(),
    accountRecoveryContext: {
      setUserAccountRecoveryStatus: jest.fn()
    },
    actionFeedbackContext: {
      displaySuccess: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    }
  };
}
