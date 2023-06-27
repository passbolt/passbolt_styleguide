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
 * @since         3.8.3
 */

import {SelfRegistrationProviderTypes} from "../../../../shared/models/selfRegistration/SelfRegistrationEnumeration";
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";

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
    dialogContext: {
      open: jest.fn(),
      close: jest.fn()
    },
    t: text => text
  };
  return Object.assign(defaultProps, data);
}

/**
 * Mock settings result from server
 * @returns {object}
 */
export function mockResult(domains = allowedDomains, provider = SelfRegistrationProviderTypes.EMAILDOMAINS) {
  return {
    "id": "287ddd52-8131-4ef0-bdb8-19cf8291bf11",
    "provider": provider,
    "data": {
      "allowed_domains": domains
    },
  };
}

export const allowedDomains = [
  "passbolt.com",
  "passbolt.io",
  "passbolt.lu",
];


export const domains = {
  "0": allowedDomains[0],
  "1": allowedDomains[1],
  "2": allowedDomains[2],
  "3": "gmail.com"
};
