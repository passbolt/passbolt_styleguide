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
 * @since         3.9.0
 */

import {SelfRegistrationProviderTypes} from "./SelfRegistrationEnumeration";

/**
 * Model related to the self registration dto for API
 */
class SelfRegistrationDto {
  /**
   * Constructor
   * @param {SelfRegistrationDomainsViewModel} selfRegistration
   * @param {Object} settings which come from the server and should not be modify
   */
  constructor(selfRegistrationDomains, settings = {}) {
    this.id = settings.id;
    this.provider = settings.provider || SelfRegistrationProviderTypes.EMAILDOMAINS;
    this.data = this.mapData(selfRegistrationDomains?.allowedDomains);
  }

  /**
   * Map domains into string array of domains
   * @param {Map} domains
   */
  mapData(domains = new Map()) {
    return {allowed_domains: Array.from(domains.values())};
  }
}

export default SelfRegistrationDto;

