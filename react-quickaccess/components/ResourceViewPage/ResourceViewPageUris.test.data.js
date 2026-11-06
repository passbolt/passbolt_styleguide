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
 * @since         5.18.0
 */

/**
 * Default component props: one safe URI.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  return {
    uris: ["https://passbolt.com"],
    onGoToUrl: jest.fn(),
    ...props,
  };
}

/**
 * Props with several URIs, the last one unsafe.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function multipleUrisProps(props = {}) {
  return defaultProps({
    uris: [
      "https://passbolt.com",
      "https://community.passbolt.com",
      "https://www.passbolt.com/docs",
      "javascript:alert(1)",
    ],
    ...props,
  });
}

/**
 * Props with an unsafe primary URI.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function unsafeUriProps(props = {}) {
  return defaultProps({ uris: ["javascript:alert(1)"], ...props });
}

/**
 * Props without URI.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function noUriProps(props = {}) {
  return defaultProps({ uris: [], ...props });
}
