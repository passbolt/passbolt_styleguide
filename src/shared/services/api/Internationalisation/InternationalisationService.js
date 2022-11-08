
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

import {ApiClient} from "../../../lib/apiClient/apiClient";

const INTERNATIONALISATION_RESOURCE_NAME = "locale/settings";

/**
 * Model related to the intertionalisation service settings
 */
class InternationalisationService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    apiClientOptions.setResourceName(INTERNATIONALISATION_RESOURCE_NAME);
    this.apiClient = new ApiClient(apiClientOptions);
  }

  /**
   * Save the given internalisation settings using Passbolt API
   * @param {string} lang
   * @returns {Promise<string>}
   */
  async save(lang) {
    return (await this.apiClient.create(lang)).body;
  }
}

export default InternationalisationService;

