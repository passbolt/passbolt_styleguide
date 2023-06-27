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

/**
 * Returns the default app context for the unit test
 * @param {Object} appContext App context properties to override
 * @returns {any}
 */
export function defaultAppContext(appContext = {}) {
  const defaultAppContext = {
    trustedDomain: "https://passbolt.local"
  };
  return Object.assign(defaultAppContext, appContext);
}

/**
 * Default props
 * @returns {Object} The props to override
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    context: defaultAppContext(),
  };
  return Object.assign(defaultProps, props);
}
