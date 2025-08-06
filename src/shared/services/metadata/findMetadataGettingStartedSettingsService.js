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
import MetadataGettingStartedSettingsEntity from "../../models/entity/metadata/metadataGettingStartedSettingsEntity";
import MetadataGettingStartedSettingsApiService from "../api/metadata/metadataGettingStartedSettingsApiService";

export default class FindMetadataGettingStartedSettingsService {
  /**
   * @constructor
   * @param {ApiClientOptions} apiClientOptions
   */
  constructor(apiClientOptions) {
    this.metadataGettingStartedSettingsApiService = new MetadataGettingStartedSettingsApiService(apiClientOptions);
  }

  /**
   * Retrieve the metadata getting started settings.
   * @returns {Promise<MetadataGettingStartedSettingsEntity>}
   */
  async findGettingStartedSettings() {
    try {
      const passboltResponse = await this.metadataGettingStartedSettingsApiService.get();
      return new MetadataGettingStartedSettingsEntity(passboltResponse.body);
    } catch (e) {
      console.error(e);
      return MetadataGettingStartedSettingsEntity.createFromDefault();
    }
  }
}
