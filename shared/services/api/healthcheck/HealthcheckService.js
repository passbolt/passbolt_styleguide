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
 * @since         4.5.0
 */

import { ApiClient } from "../../../lib/apiClient/apiClient";

const HEALTHCHECK_RESOURCE_NAME = "healthcheck";

/**
 * Model related to the Healthcheck service settings
 */

class HealthcheckService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    this.apiClientOptions = apiClientOptions;
    this.initClient();
  }

  async fetchHealthcheck() {
    this.initClient();
    const result = await this.apiClient.findAll();
    return result?.body;
  }

  /**
   * Initializes the API client with the specified resource name.
   * @returns {void}
   */
  initClient() {
    this.apiClientOptions.setResourceName(HEALTHCHECK_RESOURCE_NAME);
    this.apiClient = new ApiClient(this.apiClientOptions);
  }
}
export default HealthcheckService;
