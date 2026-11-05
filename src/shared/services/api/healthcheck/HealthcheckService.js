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
const HEALTHCHECK_API_VERSION = "v5";

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

  /**
   * Fetch the healthcheck in its generic (v5) format.
   * @returns {Promise<array>} the response body, a flat list of checks
   */
  async fetchHealthcheck() {
    this.initClient();
    const result = await this.apiClient.findAll();
    return result?.body;
  }

  /**
   * Initializes the API client with the specified resource name.
   * The version is pinned on the client and not on apiClientOptions, which is shared with every
   * other service and would carry it over to the next client built from it.
   * @returns {void}
   */
  initClient() {
    this.apiClientOptions.setResourceName(HEALTHCHECK_RESOURCE_NAME);
    this.apiClient = new ApiClient(this.apiClientOptions);
    this.apiClient.setApiVersion(HEALTHCHECK_API_VERSION);
  }
}
export default HealthcheckService;
