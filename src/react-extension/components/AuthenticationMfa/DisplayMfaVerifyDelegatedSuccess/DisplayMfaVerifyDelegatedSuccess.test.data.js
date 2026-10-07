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

import { ApiMfaVerifyDelegatedContextState } from "../../../contexts/ApiMfaVerifyDelegatedContext";
import { defaultApiMfaVerifyDelegatedContext } from "../../../contexts/ApiMfaVerifyDelegatedContext.test.data";

/**
 * Default props
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    ...props,
    apiMfaVerifyContext: defaultApiMfaVerifyDelegatedContext({
      state: ApiMfaVerifyDelegatedContextState.VERIFIED_STATE,
      delegatedToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNTdjMTBmNSJ9.c2lnbmF0dXJl",
      getReturnToApplicationUrl: jest.fn(
        () =>
          "passbolt://mfa/webauthn/callback?mfa_delegated_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNTdjMTBmNSJ9.c2lnbmF0dXJl",
      ),
      ...props.apiMfaVerifyContext,
    }),
  };
}
