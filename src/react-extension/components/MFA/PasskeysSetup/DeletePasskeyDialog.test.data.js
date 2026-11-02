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
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";
import { defaultActionFeedbackContext } from "../../../contexts/ActionFeedbackContext.test.data";
import { defaultPasskeyDto } from "../../../contexts/MFAContext.test.data";
import { mockMfaContext } from "../DisplayProviderList/DisplayProviderList.test.data";

export function defaultProps(props = {}) {
  return {
    passkey: defaultPasskeyDto(),
    onDeleted: jest.fn(),
    onClose: jest.fn(),
    dialogContext: defaultDialogContext(props.dialogContext),
    actionFeedbackContext: defaultActionFeedbackContext(props.actionFeedbackContext),
    mfaContext: mockMfaContext({ deletePasskey: jest.fn(async () => {}), ...props.mfaContext }),
    ...props,
  };
}
