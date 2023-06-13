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

import SmtpTestSettingsService from "../../services/api/smtpSettings/SmtpTestSettingsService";

/**
 * Model related to the SMTP settings
 */
class SmtpTestSettingsModel {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    this.smtpTestSettingsService = new SmtpTestSettingsService(apiClientOptions);
  }

  /**
   * Find the SMTP settings using Passbolt API
   * @return {Promise<SmtpSettingsDto|null>}
   */
  sendTestEmail(settings, recipient) {
    const {sender_name, sender_email, host, port, client, username, password, tls} = settings;
    const dto = {
      sender_name,
      sender_email,
      host,
      port,
      client,
      username,
      password,
      tls,
      email_test_to: recipient
    };
    dto.client = dto.client || null;
    return this.smtpTestSettingsService.sendTestEmail(dto);
  }
}

export default SmtpTestSettingsModel;
