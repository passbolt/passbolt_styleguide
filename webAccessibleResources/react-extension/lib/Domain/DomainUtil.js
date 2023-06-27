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
 * @since         3.8.3
 */

import XRegExp from 'xregexp';
import {nonProfessionalDomains} from './Domains';
import ipRegex from "ip-regex";

const HOSTNAMEREGEX = "(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[a-z]{2,})";

/**
 * The DomainUtil which will interact with domains
 */
class DomainUtil {
  /**
   * Extract domain for email address
   * @param {string} domain
   * @returns {String}
   */
  static extractDomainFromEmail(email) {
    const regex = XRegExp(`(?<=@)${HOSTNAMEREGEX}`);
    const match = XRegExp.match(email, regex);
    return match || "";
  }

  /**
   * Check if the domain is a profesionnal
   * @param {string} domain
   * @returns {Boolean}
   */
  static isProfessional(domain) {
    return !nonProfessionalDomains.includes(domain);
  }

  /**
   * Check the domain through regex and URL validation
   * @param {string} domain
   * @returns {Void}
   */
  static checkDomainValidity(domain) {
    const regex = XRegExp(`^${HOSTNAMEREGEX}$`);
    if (!regex.test(domain)) {
      throw new Error(
        "Cannot parse domain. The domain does not match the pattern."
      );
    }
    try {
      // we had https to avoid issue for validation
      const url = new URL(`https://${domain}`);
      if (!url.host) {
        throw new Error(
          "Cannot parse domain. The domain does not match the pattern."
        );
      }
    } catch (error) {
      throw new Error("Cannot parse domain. The domain is not valid.");
    }
  }

  /**
   * Is the domain is valid hostname or ip address
   * @param {string} domain
   * @returns {boolean}
   */
  static isValidHostname(domain) {
    const regex = XRegExp(`^${HOSTNAMEREGEX}$`);
    return regex.test(domain) || ipRegex({exact: true}).test(domain);
  }
}

export default DomainUtil;
