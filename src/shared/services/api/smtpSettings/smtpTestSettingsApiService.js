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
 * @since         5.11.0
 */

import AbstractService from "../abstract/abstractService";
import PassboltResponseEntity from "../../../models/entity/apiService/PassboltResponseEntity";

/**
 * API service related to the SMTP test settings
 */
class SmtpTestSettingsApiService extends AbstractService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    super(apiClientOptions, SmtpTestSettingsApiService.RESOURCE_NAME);
  }

  /**
   * API Resource Name
   *
   * @returns {string}
   * @public
   */
  static get RESOURCE_NAME() {
    return "smtp/email";
  }

  /**
   * Send a test email using Passbolt API
   * @param {object} sendTestEmailDto
   * @return {Promise<PassboltResponseEntity>}
   */
  async create(sendTestEmailDto) {
    this.assertNonEmptyData(sendTestEmailDto);
    const response = await this.apiClient.create(sendTestEmailDto);
    return new PassboltResponseEntity(response);
  }
}

export default SmtpTestSettingsApiService;
