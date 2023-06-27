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
 * @since        3.6.0
 */

import {v4 as uuidv4} from "uuid";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultActionFeedbackContextContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultUserWorkspaceContext} from "../../../contexts/UserWorkspaceContext.test.data";

/**
 * Default props
 * @param {Object} [props] Props to override
 * @returns {Object}
 */
export function defaultProps(props = {}) {
  const users = [{id: uuidv4()}];
  const defaultProps = {
    actionFeedbackContext: defaultActionFeedbackContextContext(props?.actionFeedbackContext),
    context: defaultAppContext({users, ...props?.context}),
    match: {
      params: {
        accountRecoveryRequestId: uuidv4()
      }
    },
    userWorkspaceContext: defaultUserWorkspaceContext()
  };
  delete props.context; // treated in default props.
  delete props.actionFeedbackContext; // treated in default props.
  return Object.assign(defaultProps, props);
}

/**
 * Get a pending account recovery request.
 * @param {Object} [data] Properties to override.
 * @returns {Object}
 */
export function pendingAccountRecoveryRequest(data = {}) {
  const _default = {
    "id": uuidv4(),
    "user_id": uuidv4(),
    "status": "pending",
    "created": "2020-05-04T20:31:45+00:00",
  };

  return Object.assign(_default, data);
}
