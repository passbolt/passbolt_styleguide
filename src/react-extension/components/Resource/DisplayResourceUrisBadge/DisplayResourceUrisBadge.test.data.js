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
 * @since         5.2.0
 */

/**
 * Default props
 * @param {object} data Override the default props.
 * @returns {any}
 */
export function defaultProps(data = {}) {
  return {
    additionalUris: ["https://passbolt.com", "ftp://not_a_safe_link", "ssh://127.0.0.1:8080"],
    ...data,
  };
}

/**
 * Props with large amount of uris
 * @param {object} data Override the default props.
 * @returns {any}
 */
export function propsWithLargeAmountOfUris(data = {}) {
  const uris = [
    "https://passbolt.com",
    "https://community.passbolt.com",
    "https://www.passbolt.com/docs",
    "https://www.passbolt.com/blog",
    "https://www.passbolt.com/security",
  ];
  for (let i = 0; i < 100; i++) {
    const uri = uris[i % 4];
    uris.push(uri);
  }
  return {
    additionalUris: uris,
    ...data,
  };
}
