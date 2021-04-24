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
 * @param {object} options
 * - {array<string>} whitelistedProtocols The protocols to white list. Default ['https:','http:']
 * - {string} defaultProtocol Default protocol if the uri has none.
 * @returns {string|boolean}
 */
export default (uri, options) => {
  // Wrong format.
  if (typeof uri === 'undefined' || typeof uri !== "string" || !uri.length) {
    return false;
  }
  options = options || {};
  if (options.whitelistedProtocols) {
    if (!Array.isArray(options.whitelistedProtocols)) {
      throw new TypeError("The whitelistedProtocols should be an array of string.");
    }
  }
  if (options.defaultProtocol) {
    if (typeof options.defaultProtocol !== "string") {
      throw new TypeError("The defaultProtocol should be a string.");
    }
  }

  const whitelistedProtocols = options.whitelistedProtocols || [urlProtocols.HTTP, urlProtocols.HTTPS];
  const blacklistedProtocols = [urlProtocols.JAVASCRIPT];
  const defaultProtocol = options.defaultProtocol || "";

  // If the uri doesn't have a protocol and a default one is provided, then prepend it to the uri.
  if (!/^((?!:\/\/).)*:\/\//.test(uri) && defaultProtocol) {
    uri = `${defaultProtocol}//${uri}`;
  }

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

/**
 * List of protocols
 * @type {object}
 */
export const urlProtocols = {
  FTP: "http:",
  FTPS: "https:",
  HTTP: "http:",
  HTTPS: "https:",
  JAVASCRIPT: "javascript:",
  SSH: "ssh:",
};
