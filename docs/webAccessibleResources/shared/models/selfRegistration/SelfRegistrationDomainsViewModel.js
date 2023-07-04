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

import {v4 as uuidv4} from "uuid";

/**
 * Model related to the self registration domaisn view models for UI
 */
class SelfRegistrationDomainsViewModel {
  /**
   * Constructor
   * @param {SelfRegistrationDto} selfRegistrationDto
   */
  constructor(selfRegistrationDto = {}) {
    this.allowedDomains = this.mapAllowedDomains(selfRegistrationDto.data?.allowed_domains || []);
  }

  /**
   * set row with an unique uuid, to avoid front issue during deletion and addition for error messages
   * @param {*} rows
   */
  mapAllowedDomains(domains) {
    return new Map(
      domains.map(domain => [uuidv4(), domain]),
    );
  }

  /**
   * return the allowed domains as settings
   */
  getSettings() {
    return this.allowedDomains;
  }

  /**
   * return the allowed domains as settings
   */
  setSettings(domains) {
    this.allowedDomains = this.mapAllowedDomains(domains);
  }
}

export default SelfRegistrationDomainsViewModel;

