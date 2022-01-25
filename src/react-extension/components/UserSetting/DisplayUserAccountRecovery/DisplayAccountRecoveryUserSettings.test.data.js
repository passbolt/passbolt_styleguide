/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultProps(props) {
  const defaultProps = {
    context: {
      loggedInUser: {
        accountRecoveryStatus: "pending"
      },
      locale: "en-US",
      userSettings: {
        getTrustedDomain: () => new URL(window.location).origin
      }
    },
    dialogContext: {
      open: jest.fn()
    }
  };
  return Object.assign(defaultProps, props || {});
}

export const mockedData = {
  policy: {
    policy: "opt-out"
  },
  creator: {
    profile: {
      first_name: "Ada",
      last_name: "Lovelace"
    },
    gpgkey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
    },
  },
  modified: "2022-01-13T15:27:26.301Z"
};

export function getAccountRecoveryUserService(mockedData) {
  return {
    getOrganizationAccountRecoverySettings: () => mockedData
  };
}
