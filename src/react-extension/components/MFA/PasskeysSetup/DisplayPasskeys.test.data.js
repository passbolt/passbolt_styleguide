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
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";
import { defaultPasskeysDtos, defaultPasskeySettingsDto } from "../../../contexts/MFAContext.test.data";
import { mockMfaContext } from "../DisplayProviderList/DisplayProviderList.test.data";

export function defaultProps(props = {}) {
  return {
    context: defaultAppContext(props.context),
    dialogContext: defaultDialogContext(props.dialogContext),
    mfaContext: mockMfaContext({
      isProcessing: () => false,
      findPasskeys: jest.fn(async () => defaultPasskeysDtos()),
      findPasskeySettings: jest.fn(async () => defaultPasskeySettingsDto()),
      startPasskeyRegistration: jest.fn(),
      ...props.mfaContext,
    }),
  };
}

export function propsWithoutPasskeys(props = {}) {
  return defaultProps({
    ...props,
    mfaContext: { findPasskeys: jest.fn(async () => []), ...props.mfaContext },
  });
}

export function propsWithLimitReached(props = {}) {
  return defaultProps({
    ...props,
    mfaContext: {
      findPasskeys: jest.fn(async () => defaultPasskeysDtos(2)),
      findPasskeySettings: jest.fn(async () => defaultPasskeySettingsDto({ max_credentials_per_user: 2 })),
      ...props.mfaContext,
    },
  });
}
