/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.2.0
 */

import { defaultPasswordPoliciesContext } from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import { defaultUserAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";

/**
 * Default props
 * @param {object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    context: defaultUserAppContext(),
    passwordPoliciesContext: defaultPasswordPoliciesContext(),
    dialogContext: defaultDialogContext(),
    onClose: jest.fn(),
    handleUpdateOrganizationKey: jest.fn(),
    ...props,
  };
}
