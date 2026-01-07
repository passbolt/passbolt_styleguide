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

import { defaultActionFeedbackContext } from "../../../contexts/ActionFeedbackContext.test.data";
import { defaultAdministrationWorkspaceContext } from "../../../contexts/AdministrationWorkspaceContext.test.data";
import { defaultAdministratorAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";

/**
 * Default props.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function defaultPropsPro(data = {}) {
  const defaultData = {
    context: defaultAdministratorAppContext(),
    dialogContext: defaultDialogContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    t: (text) => text,
  };
  defaultData.context.siteSettings.canIUse = () => true;
  return Object.assign(defaultData, data);
}
/**
 * Props with API flags disabled
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultPropsCE(props = {}) {
  const defaultProps = defaultPropsPro();
  defaultProps.context.siteSettings.canIUse = () => false;
  return Object.assign(defaultProps, props);
}
