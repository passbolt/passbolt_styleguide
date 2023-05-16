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

import {defaultAppContext} from "./ExtAppContext.test.data";

/**
 * Default context
 * @param {Object} context The override
 * @returns {object}
 */
export function defaultAdminAccountRecoveryContext(context = {}) {
  const defaultKeyInfo = {
    amored_key: "armored-key"
  };
  const defaultContext = {
    currentPolicy: {policy: "disabled"},
    policyChanges: {},
    findAccountRecoveryPolicy: jest.fn(),
    getKeyInfo: jest.fn(() => defaultKeyInfo),
    hasPolicyChanges: jest.fn(),
    changePolicy: jest.fn(),
    changePublicKey: jest.fn(),
    resetChanges: jest.fn(),
    save: jest.fn()
  };
  return Object.assign(defaultContext, context);
}

/**
 * Has policy changes context
 * @param {Object} context The override
 * @returns {object}
 */
export function hasPolicyChangesAdminAccountRecoveryContext(context = {}) {
  const defaultContext = {
    policyChanges: {
      policy: "opt-in",
      publicKey: "new-public-key"
    },
    hasPolicyChanges: jest.fn(() => true)
  };
  return defaultAdminAccountRecoveryContext(Object.assign(defaultContext, context));
}

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    context: defaultAppContext(props?.appContext),
    accountRecoveryContext: {
      reloadAccountRecoveryPolicy: jest.fn()
    }
  };
  return Object.assign(defaultProps, props);
}
