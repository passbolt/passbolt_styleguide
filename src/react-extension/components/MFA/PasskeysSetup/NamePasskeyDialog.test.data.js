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
import { defaultActionFeedbackContext } from "../../../contexts/ActionFeedbackContext.test.data";
import { defaultPasskeysDtos } from "../../../contexts/MFAContext.test.data";
import { mockMfaContext } from "../DisplayProviderList/DisplayProviderList.test.data";

export function defaultProps({ mfaContext, actionFeedbackContext, ...props } = {}) {
  return {
    aaguid: "adce0002-35bc-c60a-648b-0b25f1f05503",
    passkeys: defaultPasskeysDtos(),
    onSaved: jest.fn(),
    onFailed: jest.fn(),
    onAborted: jest.fn(),
    onClose: jest.fn(),
    actionFeedbackContext: defaultActionFeedbackContext(actionFeedbackContext),
    mfaContext: mockMfaContext({
      finishPasskeyRegistration: jest.fn(async () => {}),
      abortPasskeyRegistration: jest.fn(async () => {}),
      ...mfaContext,
    }),
    ...props,
  };
}
