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
 * @since         5.4.0
 */
import AbstractService from "../abstract/abstractService";
import PassboltResponseEntity from "../../../models/entity/apiService/PassboltResponseEntity";

const METADATA_GETTING_STARTED_SETTINGS_RESOURCE_NAME = "metadata/settings/";

export default class MetadataGettingStartedSettingsApiService extends AbstractService {
  /**
   * @constructor
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    super(apiClientOptions, METADATA_GETTING_STARTED_SETTINGS_RESOURCE_NAME);
  }

  /**
   * Retrieve the metadata getting started setting from the API.
   * @returns {Promise<PassboltResponseEntity>}
   * @public
   */
  async get() {
    const response = await this.apiClient.get("getting-started");
    return new PassboltResponseEntity(response);
  }
}
