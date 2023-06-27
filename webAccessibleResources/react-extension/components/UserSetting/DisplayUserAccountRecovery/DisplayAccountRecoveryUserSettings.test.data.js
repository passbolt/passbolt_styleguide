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

import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(data?.context),
    dialogContext: {
      open: jest.fn()
    }
  };
  delete data.context;
  return Object.assign(defaultProps, data);
}

export const mockedData = {
  policy: {
    policy: "opt-out"
  },
  creator: {
    profile: {
      first_name: "Ada",
      last_name: "Lovelace"
    },
    gpgkey: {
      fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
    },
  },
  modified: "2022-01-13T15:27:26.301Z"
};

export function getAccountRecoveryUserService(mockedData) {
  return {
    getOrganizationAccountRecoverySettings: () => mockedData
  };
}
