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
 * @since         3.8.0
 */

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    // eslint-disable-next-line no-undef
    baseUrl: process.env.ORIGIN_URL,
    id: "test",
    label: "label",
    disabled: false,
    name: "name",
    placeholder: "placeholder",
    searchCallback: jest.fn(),
    onSelect: jest.fn(),
    onOpen: jest.fn(),
    onClose: jest.fn()
  };
  return Object.assign(defaultProps, data);
}
