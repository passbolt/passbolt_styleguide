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
 * @since         4.O.0
 */

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";

export function defaultProps() {
  return {
    context: defaultAppContext(),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    actionFeedbackContext: {
      displaySuccess: () => jest.fn(),
      displayError: jest.fn()
    }
  };
}


/**
 * Mock settings result from server
 * @returns {object}
 */
export const mockRbacSettings = {
  "providers": [
    "totp",
    "yubikey",
    "duo"
  ],
  "yubikey": {
    "clientId": "80412",
    "secretKey": "pas6lyijz2AIhX3D9eLIYAxv63lt@"
  },
  "duo": {
    "hostName": "api-123456af.duosecurity.com",
    "integrationKey": "PAGI605APMFKP8YSME6T",
    "secretKey": "PACNkhAAlVLH0m8d3efssULkizlEtunMhIsOTCLT"
  }
};

/**
 * Mock settings result from server
 * @returns {object}
 */
export const mockRbacFormConfiguration = [
  {
    "name": ""
  }
];


export const defaultLocale = "en-UK";
