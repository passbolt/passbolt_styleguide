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
 * @since         3.10.0
 */

import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import {MfaPolicyEnumerationTypes} from '../../../../shared/models/mfaPolicy/MfaPolicyEnumeration';

/**
 * Default props.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(data?.context),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    actionFeedbackContext: {
      displaySuccess: jest.fn(),
      displayError: jest.fn()
    },
    t: text => text
  };
  return Object.assign(defaultProps, data);
}

export const settingDto = {
  policy: MfaPolicyEnumerationTypes.OPTIN,
  remember_me_for_a_month: "false"
};
