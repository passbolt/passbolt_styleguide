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
 * @since         5.13.0
 */

import { v4 as uuidv4 } from "uuid";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";

/**
 * Default props for the HandlePermissionWorkflow component.
 * @param {Object} [props] The overrides.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const _props = {
    folderParentId: uuidv4(),
    context: defaultAppContext(props?.context),
    dialogContext: defaultDialogContext(props?.dialogContext),
  };
  delete props?.context;
  delete props?.dialogContext;
  return Object.assign(_props, props);
}
