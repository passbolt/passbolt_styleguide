
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

const MFA_RESOURCE_NAME = "mfa/settings";

/**
 * Model related to the MFA service settings
 */
class MfaService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    apiClientOptions.setResourceName(MFA_RESOURCE_NAME);
    this.apiClient = new ApiClient(apiClientOptions);
  }

  /**
   * Find the MFA setting using Passbolt API
   *
   * @return {Promise<Array<MFADto>>|null>}
   */
  async findAllSettings() {
    return (await this.apiClient.findAll()).body;
  }

  /**
   * Save the MFA settings settings using Passbolt API
   * @param {MFASettingDto} MFASetting
   * @returns {Promise<MFASettingDto>}
   */
  async save(MFASetting) {
    return (await this.apiClient.create(MFASetting)).body;
  }
}

export default MfaService;

