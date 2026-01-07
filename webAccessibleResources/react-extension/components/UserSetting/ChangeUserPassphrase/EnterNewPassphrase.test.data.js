/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.1.0
 */

import { defaultUserAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";
import { defaultUserPassphrasePoliciesContext } from "../../../contexts/UserPassphrasePoliciesContext.test.data";
import { defaultUserPassphrasePoliciesEntityDto } from "../../../../shared/models/userPassphrasePolicies/UserPassphrasePoliciesDto.test.data";

/**
 * Default props
 * @param {object} props The props to override
 * @return {object}
 */
export const defaultProps = (props = {}) => ({
  context: defaultUserAppContext(),
  userSettingsContext: {
    onUpdatePassphraseRequested: jest.fn(async () => {}),
    onGoToIntroductionPassphraseRequested: jest.fn(),
  },
  userPassphrasePoliciesContext: defaultUserPassphrasePoliciesContext(),
  dialogContext: defaultDialogContext(),
  ...props,
});

export const propsWithExternalDictionaryCheckDisabled = (data = {}) => {
  const defaultData = defaultProps({
    userPassphrasePoliciesContext: defaultUserPassphrasePoliciesContext({
      getSettings: jest.fn(() =>
        defaultUserPassphrasePoliciesEntityDto({
          external_dictionary_check: false,
        }),
      ),
    }),
  });

  return Object.assign(defaultData, data);
};
