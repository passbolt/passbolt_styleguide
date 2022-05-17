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
export function defaultProps(props = {}) {
  const defaultProps = {
    items: [
      {value: "0", label: "list item #1"},
      {value: "1", label: "list item #2"},
      {value: "2", label: "list item #3"},
      {value: "3", label: "list item #4"},
      {value: "4", label: "list item #5"},
      {value: "5", label: "list item #6"},
      {value: "6", label: "list item #7"},
    ],
    value: "0",
    onChange: () => jest.fn()
  };
  return Object.assign(defaultProps, props || {});
}

/**
 * Default inline props
 * @returns {{}}
 */
export function defaultInlineProps(props = {}) {
  const defaultProps = {
    items: [
      {value: "0", label: "can read"},
      {value: "1", label: "can update"},
      {value: "2", label: "is owner"},
      {value: "-1", label: "varies"},
    ],
    value: "0",
    onChange: () => jest.fn()
  };
  return Object.assign(defaultProps, props || {});
}

/**
 * Default inline props
 * @returns {{}}
 */
export function defaultInlineLdapProps(props = {}) {
  const defaultProps = {
    items: [
      {value: "0", label: "ldap://"},
      {value: "1", label: "http://"},
      {value: "2", label: "https://"},
      {value: "3", label: "ftp://"},
    ],
    value: "0",
    onChange: () => jest.fn()
  };
  return Object.assign(defaultProps, props || {});
}
