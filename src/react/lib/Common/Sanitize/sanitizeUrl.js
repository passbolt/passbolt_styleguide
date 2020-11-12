/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SARL (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SARL (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
/**
 * Sanitize a URI
 * Return 'safe' string or False if uri is not valid
 * Note that javascript: URI are never allowed
 *
 * @param {string} uri
 * @param {array<string>} [whitelistedProtocols] optional default ['https:','http:']
 * @returns {string|boolean}
 */
export default (uri, whitelistedProtocols) => {
  // Wrong format.
  if (typeof uri === 'undefined' || typeof uri !== "string" || !uri.length) {
    return false;
  }

  if (!whitelistedProtocols || !Array.isArray(whitelistedProtocols)) {
    whitelistedProtocols = ['http:', 'https:'];
  }
  const blacklistedProtocols = ['javascript:'];

  try {
    const url = new URL(uri);
    if (blacklistedProtocols.includes(url.protocol)) {
      return false;
    }
    if (!whitelistedProtocols.includes(url.protocol)) {
      return false;
    }
    return url.href;
  } catch (error) {
    return false;
  }
};
