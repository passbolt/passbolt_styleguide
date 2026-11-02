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
 * @since         5.17.0
 */

import { defaultAppContext } from "./ApiAppContext.test.data";
import { ApiMfaVerifyDelegatedContextState } from "./ApiMfaVerifyDelegatedContext";

/**
 * Default props of the context provider.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(data.context),
    value: {
      delegatedState: "0b8d6e3c-2f4a-4c1e-9d7b-5a3f1e8c2b6d",
      redirectUri: "passbolt://mfa/webauthn/callback",
      ...data.value,
    },
  };
}

/**
 * Default finish result dto as returned by POST /mfa/verify/webauthn/delegated/finish.json
 * @param {Object} data The properties to override
 * @returns {object}
 */
export function defaultDelegatedFinishResultDto(data = {}) {
  return {
    mfa_delegated_token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNTdjMTBmNSJ9.c2lnbmF0dXJl",
    ...data,
  };
}

/**
 * Mocked delegated MFA verify context for the components.
 * @param {Object} context The properties to override
 * @returns {object}
 */
export function defaultApiMfaVerifyDelegatedContext(context = {}) {
  return {
    state: ApiMfaVerifyDelegatedContextState.VERIFY_STATE,
    providers: [],
    isRememberMeForAMonthEnabled: false,
    error: null,
    hideErrorLogs: true,
    delegatedToken: null,
    delegatedState: "0b8d6e3c-2f4a-4c1e-9d7b-5a3f1e8c2b6d",
    redirectUri: "passbolt://mfa/webauthn/callback",
    onVerifyRequested: jest.fn(),
    onRetryRequested: jest.fn(),
    getNextProviderUrl: jest.fn(() => null),
    getReturnToApplicationUrl: jest.fn(() => "passbolt://mfa/webauthn/callback?error=cancelled"),
    ...context,
  };
}
