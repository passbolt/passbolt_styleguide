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

import XRegExp from "xregexp";
import ipRegex from "ip-regex";
import assertString from "validator/es/lib/util/assertString";

// Hostname allowed characters regex
const regexHostnameAllowedChars = XRegExp('^[\\p{L}\\p{N}.-]*$');

/**
 * The can suggest service
 */
class CanSuggestService {
  /**
   * Check if an uri can be suggested for an array of uris.
   * @param {string} uri
   * @param {Array<string>} suggestedUris
   * @returns {boolean}
   */
  canSuggestUris(uri, suggestedUris) {
    assertString(uri);
    return suggestedUris?.some(suggestedUri => this.canSuggestUri(uri, suggestedUri)) || false;
  }

  /**
   * Check if an uri can be suggested for a given one.
   * The uris can be suggested if:
   * - The uris hostname match;
   * - The suggested uri is a parent of the uri;
   * - (optional check) If the suggested uri contains a protocol, then it has to match the uri.
   * - (optional check) If the suggested uri contains a port, then it has to match the uri.
   *
   * Note that this function does not take in account any uris path, parameters or hash.
   *
   * @param {string} uri The uri.
   * @param {string} suggestedUri The potential uri to suggest
   * @returns {boolean}
   */
  canSuggestUri(uri, suggestedUri) {
    assertString(uri);
    assertString(suggestedUri);
    let uriObject;

    try {
      uriObject = new URL(uri);
    } catch (error) {
      /*
       * Only valid uri are accepted by this function.
       * This information should come from the browser tab uri, and so should be valid.
       */
      return false;
    }

    const suggestedUriObject = this.parseSuggestedUri(suggestedUri);

    // Unable to parse the hostname of the uri
    if (!uriObject || !uriObject.hostname) {
      return false;
    }

    // Unable to parse the suggested uri or the suggested uri has no hostname.
    if (!suggestedUriObject || !suggestedUriObject.hostname) {
      return false;
    }

    // Check the protocol, if the suggest uri has defined it.
    if (suggestedUriObject.protocol) {
      if (uriObject.protocol !== suggestedUriObject.protocol) {
        return false;
      }
    }

    // Check the port, if the suggest uri has defined it.
    if (suggestedUriObject.port) {
      if (uriObject.port !== suggestedUriObject.port) {
        return false;
      }
    }

    // Check the hostname, if the suggest uri has defined it. Perfect match
    if (uriObject.hostname === suggestedUriObject.hostname) {
      return true;
    }

    // If IPs, make a strict comparison.
    const uriIsIpAddress = ipRegex({exact: true}).test(uriObject.hostname);
    const suggestUriIsIpAddress = ipRegex({exact: true}).test(suggestedUriObject.hostname);
    if (uriIsIpAddress || suggestUriIsIpAddress) {
      return uriObject.hostname === suggestedUriObject.hostname;
    }

    // Otherwise check if the suggested uri hostname contain a dot and is a parent host of the uri hostname
    if (suggestedUriObject.hostname.indexOf(".") !== -1) {
      return this.isParentHostname(suggestedUriObject.hostname, uriObject.hostname);
    }

    return false;
  }

  /**
   * Parse a suggested uri.
   * @private
   * @param {string} suggestedUri The uri.
   * @returns {{protocol: string, hostname: string, port: string}}
   */
  parseSuggestedUri(suggestedUri) {
    let suggestedUriObject;
    let protocol = "";
    let hostname = "";
    let port = "";
    let enforceProtocol = false;

    /*
     * The browser URL primitive does not work with relative uris.
     * Enforce a protocol to the suggested uri, if none has been defined. A fake protocol is used in order to preserve
     * the port information that can be altered by the parsing. By instance, when the https is enforced to the uri
     * www.passbolt.com:443, then the port information is deleted after the parsing.
     */
    if (!/^[a-zA-Z\-]*:\/\//.test(suggestedUri)) {
      enforceProtocol = true;
      suggestedUri = `fake://${suggestedUri}`;
    }

    try {
      suggestedUriObject = new URL(suggestedUri);
    } catch (error) {
      return false;
    }

    port = suggestedUriObject.port;
    if (!enforceProtocol) {
      protocol = suggestedUriObject.protocol;
      hostname = suggestedUriObject.hostname;
    } else {
      suggestedUriObject.protocol = "https:";
      hostname = suggestedUriObject.hostname;
    }

    return {protocol: protocol, hostname: hostname, port: port};
  }

  /**
   * Check a hostname is parent of another on.
   * Note, the function does not ensure the validity of the hostnames.
   *
   * By instance for a given hostname: accounts.passbolt.com
   * The following hostnames should match:
   * - accounts.passbolt.com
   * - passbolt.com
   *
   * The following hostnames should not match:
   * - passbolt.com.attacker.com
   * - attacker-passbolt.com
   *
   * @private
   * @param {string} parent the hostname to check if it is parent.
   * @param {string} child The hostname to check if it is a child.
   * @return {boolean}
   */
  isParentHostname(parent, child) {
    if (!child || !parent || !regexHostnameAllowedChars.test(child) || !regexHostnameAllowedChars.test(parent)
    ) {
      return false;
    }

    const lastIndexOf = child.lastIndexOf(parent);

    // If found.
    if (lastIndexOf !== -1) {
      /*
       * The resource hostname has to be the last part of the given hostname.
       * It will prevent an attacker to use a hostname such as www.passbolt.com.attacker.com, and make passbolt
       * recognize it as passbolt.com.
       */
      if (lastIndexOf + parent.length === child.length) {
        /*
         * Whatever is found before the resource hostname in the hostname has to be a subdomain or nan.
         * It will prevent an attacker to use a hostname such as www.attacher-passbolt.com, and make passbolt
         * recognize it as passbolt.com.
         */
        if (child[lastIndexOf - 1] === undefined || child[lastIndexOf - 1] === '.') {
          return true;
        }
      }
    }

    return false;
  }
}

export default new CanSuggestService();
