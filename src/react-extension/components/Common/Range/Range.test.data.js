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
 * @since         hackaton
 */

import {v4 as uuid} from 'uuid';

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    id: uuid(),
    values: [],
    onChange: () => jest.fn()
  };
  return Object.assign(defaultProps, props);
}

export const valuesEntropy = [
  {label: "Disabled", value: 0},
  {label: "50 bits", value: 50},
  {label: "64 bits", value: 64},
  {label: "80 bits", value: 80},
  {label: "96 bits", value: 96},
  {label: "128 bits", value: 128},
  {label: "160 bits", value: 160},
  {label: "192 bits", value: 192},
  {label: "224 bits", value: 224}
];

export const labels = {
  start: "Weak",
  end: "Secure"
};
