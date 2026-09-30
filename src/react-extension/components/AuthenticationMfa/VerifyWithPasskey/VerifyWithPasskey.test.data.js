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
 * Props when the organization does not allow to remember the device
 * @returns {object}
 */
export function withoutRememberMeProps() {
  return defaultProps({ apiMfaVerifyContext: { isRememberMeForAMonthEnabled: false } });
}

/**
 * Props when passkey is the only provider of the user
 * @returns {object}
 */
export function singleProviderProps() {
  return defaultProps({ apiMfaVerifyContext: { providers: ["webauthn"], getNextProviderUrl: jest.fn(() => null) } });
}

/**
 * Props while the browser prompt is pending
 * @returns {object}
 */
export function processingProps() {
  return defaultProps({ apiMfaVerifyContext: { state: ApiMfaVerifyContextState.CEREMONY_STATE } });
}

/**
 * Props when the verification is delegated by a mobile application
 * @returns {object}
 */
export function delegatedProps() {
  return { apiMfaVerifyContext: defaultApiMfaVerifyDelegatedContext() };
}
