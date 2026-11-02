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

import { defaultApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext.test.data";
import { ApiMfaVerifyContextState } from "../../../contexts/ApiMfaVerifyContext";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";
import { defaultApiMfaVerifyDelegatedContext } from "../../../contexts/ApiMfaVerifyDelegatedContext.test.data";

/**
 * Default props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    ...props,
    apiMfaVerifyContext: defaultApiMfaVerifyContext(props.apiMfaVerifyContext),
  };
}

/**
 * Props with an API error
 * @returns {object}
 */
export function apiErrorProps() {
  const error = new PassboltApiFetchError("The credential could not be verified.", {
    code: 401,
    body: null,
  });
  return defaultProps({ apiMfaVerifyContext: { state: ApiMfaVerifyContextState.ERROR_STATE, error } });
}

/**
 * Props with an error of the browser prompt
 * @returns {object}
 */
export function browserErrorProps() {
  const error = new Error("The operation either timed out or was not allowed.");
  error.name = "NotAllowedError";
  return defaultProps({ apiMfaVerifyContext: { state: ApiMfaVerifyContextState.ERROR_STATE, error } });
}

/**
 * Props with an error when the verification is delegated by a mobile application
 * @returns {object}
 */
export function delegatedProps() {
  const error = new PassboltApiFetchError("The credential could not be verified.", {
    code: 400,
    body: null,
  });
  return {
    apiMfaVerifyContext: defaultApiMfaVerifyDelegatedContext({
      state: ApiMfaVerifyContextState.ERROR_STATE,
      error,
      getReturnToApplicationUrl: jest.fn(() => "passbolt://mfa/webauthn/callback?error=verification_failed"),
    }),
  };
}
