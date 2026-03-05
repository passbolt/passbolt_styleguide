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

import SmtpTestSettingsApiService from "../api/smtpSettings/smtpTestSettingsApiService";

/**
 * Service to send a test SMTP email
 */
class SendTestSmtpSettingsService {
  /**
   * Constructor
   * @param {ApiClientOptions} apiClientOptions
   */
  constructor(apiClientOptions) {
    this.smtpTestSettingsApiService = new SmtpTestSettingsApiService(apiClientOptions);
  }

  /**
   * Send a test email using the given SMTP settings entity
   * @param {SmtpSettingsEntity} smtpSettingsEntity
   * @param {string} recipient
   * @returns {Promise<{debug: Array<string>}>}
   */
  async send(smtpSettingsEntity, recipient) {
    const dto = smtpSettingsEntity.toDto();
    dto.email_test_to = recipient;
    const response = await this.smtpTestSettingsApiService.create(dto);
    return response.body;
  }
}

export default SendTestSmtpSettingsService;
