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
import { ApiMfaVerifyContextState } from "./ApiMfaVerifyContext";

/**
 * Default props of the context provider.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(data.context),
    value: { redirect: "/app/passwords", ...data.value },
  };
}

/**
 * Default verification settings dto as returned by GET /mfa/verify/webauthn.json
 * @param {Object} data The properties to override
 * @returns {object}
 */
export function defaultVerifySettingsDto(data = {}) {
  return {
    providers: ["totp", "webauthn"],
    isRememberMeForAMonthEnabled: true,
    ...data,
  };
}

/**
 * Default begin dto as returned by POST /mfa/verify/webauthn/begin.json
 * @param {Object} data The properties to override
 * @returns {object}
 */
export function defaultVerifyBeginDto(data = {}) {
  return {
    handle: "b1b3f8a2-5c7e-4d7b-9a0e-3f2d8c6e1a45",
    credentialRequestOptions: {
      challenge: "q0-ZyJ1lU0JTn9Gg5kRwWx0Fr6D2cQ1hW3u9bMaYp5I",
      rpId: "localhost",
      allowCredentials: [{ type: "public-key", id: "AWvDA0h7rG2B1c3f0fS8rQ" }],
      userVerification: "preferred",
      timeout: 60000,
    },
    ...data,
  };
}

/**
 * Default assertion as returned by PublicKeyCredential.toJSON()
 * @returns {object}
 */
export function defaultAssertionDto() {
  return {
    id: "AWvDA0h7rG2B1c3f0fS8rQ",
    rawId: "AWvDA0h7rG2B1c3f0fS8rQ",
    type: "public-key",
    response: {
      clientDataJSON: "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0In0",
      authenticatorData: "SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2MFAAAAAQ",
      signature: "MEUCIQDk3z0",
      userHandle: "ZDU3YzEwZjU",
    },
    clientExtensionResults: {},
    authenticatorAttachment: "platform",
  };
}

/**
 * Mocked MFA verify context for the components.
 * @param {Object} context The properties to override
 * @returns {object}
 */
export function defaultApiMfaVerifyContext(context = {}) {
  return {
    state: ApiMfaVerifyContextState.VERIFY_STATE,
    providers: ["totp", "webauthn"],
    isRememberMeForAMonthEnabled: true,
    redirect: "/app/passwords",
    error: null,
    onInitializeRequested: jest.fn(),
    onVerifyRequested: jest.fn(),
    onRetryRequested: jest.fn(),
    getNextProviderUrl: jest.fn(() => "https://localhost:6006/mfa/verify/totp?redirect=%2Fapp%2Fpasswords"),
    ...context,
  };
}
