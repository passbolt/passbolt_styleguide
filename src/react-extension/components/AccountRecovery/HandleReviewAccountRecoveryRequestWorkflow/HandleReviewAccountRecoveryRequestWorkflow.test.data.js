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
 * @since         3.6.0
 */

import {v4 as uuidv4} from "uuid";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultActionFeedbackContextContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultAccountRecoveryUserContext} from "../../../contexts/AccountRecoveryUserContext.test.data";

/**
 * Default props
 * @param {Object} props The override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const _props = {
    accountRecoveryRequestId: uuidv4(),
    accountRecoveryContext: defaultAccountRecoveryUserContext({
      accountRecoveryOrganizationPolicy: {
        account_recovery_organization_public_key: {
          id: uuidv4()
        }
      }
    }),
    actionFeedbackContext: defaultActionFeedbackContextContext(props?.actionFeedbackContext),
    context: defaultAppContext(props?.context),
    dialogContext: defaultDialogContext(props?.dialogContext),
    onStop: jest.fn(),
    t: text => text
  };
  delete props?.adminAccountRecoveryContext; // Treated in the default
  delete props?.adminAccountRecoveryContext; // Treated in the default
  delete props?.context; // Treated in the default
  delete props?.dialogContext; // Treated in the default
  return Object.assign(_props, props);
}

