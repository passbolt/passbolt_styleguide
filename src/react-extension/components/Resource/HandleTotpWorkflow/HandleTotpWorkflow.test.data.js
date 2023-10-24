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
 * @since         4.4.0
 */
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {TotpWorkflowMode} from "./HandleTotpWorkflowMode";
import {v4 as uuidv4} from "uuid";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {
  resourceStandaloneTotpDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";

/**
 * Default props
 * @param {Object} data The override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    folderParentId: uuidv4(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    context: defaultUserAppContext(),
    resourceWorkspaceContext: defaultResourceWorkspaceContext({selectedResources: [resourceStandaloneTotpDto()]}),
    dialogContext: defaultDialogContext(),
    onStop: jest.fn(),
    history: {
      push: jest.fn()
    },
    mode: TotpWorkflowMode.CREATE_STANDALONE_TOTP,
    totp: null,
    onApply: jest.fn(),
    t: text => text
  };

  return Object.assign(defaultData, data);
}

