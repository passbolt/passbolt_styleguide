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
 * @since         5.14.0
 */

/**
 * Build a mocked passkey context, with sensible defaults overridable per test.
 * @param {object} overrides
 * @returns {object}
 */
export function mockPasskeyContext(overrides = {}) {
  return {
    loadConfiguration: jest.fn(() => Promise.resolve(false)),
    hasUserAPasskeyKit: jest.fn(() => false),
    runSignInProcess: jest.fn(() => Promise.resolve()),
    runEnrollProcess: jest.fn(() => Promise.resolve({})),
    listCredentials: jest.fn(() => Promise.resolve([])),
    deleteCredential: jest.fn(() => Promise.resolve()),
    isOrgEnabled: jest.fn(() => true),
    setOrgEnabled: jest.fn(() => Promise.resolve(true)),
    ...overrides,
  };
}

/**
 * Two enrolled passkeys (server-side shape: credential_id + name + created).
 * @returns {Array}
 */
export function credentialsDto() {
  return [
    { id: "row-1", credential_id: "cred-aaa", name: "Work laptop", created: "2026-07-04T10:00:00+00:00" },
    { id: "row-2", credential_id: "cred-bbb", name: null, created: "2026-07-05T10:00:00+00:00" },
  ];
}

export function defaultProps(props = {}) {
  return {
    passkeyContext: mockPasskeyContext(props.passkeyContext),
  };
}

export function withCredentialsProps(props = {}) {
  return {
    passkeyContext: mockPasskeyContext({
      loadConfiguration: jest.fn(() => Promise.resolve(true)),
      listCredentials: jest.fn(() => Promise.resolve(credentialsDto())),
      ...(props.passkeyContext || {}),
    }),
  };
}
