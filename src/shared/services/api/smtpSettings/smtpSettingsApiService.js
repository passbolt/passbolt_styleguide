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
 * API service related to the SMTP settings
 */
class SmtpSettingsApiService extends AbstractService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    super(apiClientOptions, SmtpSettingsApiService.RESOURCE_NAME);
  }

  /**
   * API Resource Name
   *
   * @returns {string}
   * @public
   */
  static get RESOURCE_NAME() {
    return "smtp/settings";
  }

  /**
   * Find the SMTP settings using Passbolt API
   * @return {Promise<PassboltResponseEntity>}
   */
  async find() {
    const response = await this.apiClient.findAll();
    response.body.tls = Boolean(response.body.tls);
    return new PassboltResponseEntity(response);
  }

  /**
   * Create/save the given SMTP settings using Passbolt API
   * @param {object} smtpSettingsDto
   * @returns {Promise<PassboltResponseEntity>}
   */
  async create(smtpSettingsDto) {
    this.assertNonEmptyData(smtpSettingsDto);
    const response = await this.apiClient.create(smtpSettingsDto);
    response.body.tls = Boolean(response.body.tls);
    return new PassboltResponseEntity(response);
  }
}

export default SmtpSettingsApiService;
