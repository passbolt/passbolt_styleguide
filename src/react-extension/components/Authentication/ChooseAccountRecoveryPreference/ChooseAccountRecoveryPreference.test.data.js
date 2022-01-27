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
 * Default props
 * @returns {{}}
 */
export function defaultProps(props) {
  const defaultProps = {
    policy: 'mandatory',
    onComplete: () => {},
    canGenerateNewKeyInstead: true,
    onGenerateNewKeyInstead: () => {}
  };
  return Object.assign(defaultProps, props || {});
}

/**
 * Mandatory policy props
 * @returns {*}
 */
export function mandatoryPolicyProps() {
  return defaultProps({
    policy: 'mandatory',
  });
}

/**
 * Opt-In policy props
 * @returns {*}
 */
export function optInPolicyProps() {
  return defaultProps({
    policy: 'opt-in',
  });
}

/**
 * OptOut policy props
 * @returns {*}
 */
export function optOutPolicyProps() {
  return defaultProps({
    policy: 'opt-out',
  });
}

/**
 * Mandatory policy props with imported key
 * @returns {*}
 */
export function mandatoryPolicyPropsWithImportedKey() {
  return defaultProps({
    policy: 'mandatory',
    canGenerateNewKeyInstead: true,
  });
}

/**
 * Opt-In policy props with imported key
 * @returns {*}
 */
export function optInPolicyPropsWithImportedKey() {
  return defaultProps({
    policy: 'opt-in',
    canGenerateNewKeyInstead: true,
  });
}

/**
 * OptOut policy props with imported key
 * @returns {*}
 */
export function optOutPolicyPropsWithImportedKey() {
  return defaultProps({
    policy: 'opt-out',
    canGenerateNewKeyInstead: true,
  });
}
