
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

const EMAIL_NOTIFICATION_RESOURCE_NAME = "settings/emails/notifications";

/**
 * Model related to the Email service settings
 */
class EmailNotificationService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    apiClientOptions.setResourceName(EMAIL_NOTIFICATION_RESOURCE_NAME);
    this.apiClient = new ApiClient(apiClientOptions);
  }

  /**
   * Find the email notification setting using Passbolt API
   *
   * @return {Promise<Array<SmtpSettingsDto>>|null>}
   */
  async find() {
    return (await this.apiClient.findAll()).body;
  }

  /**
   * Save the given email settings settings using Passbolt API
   * @param {EmailNotificationSettingDto} emailNotificationSetting
   * @returns {Promise<EmailNotificationSettingDto>}
   */
  async save(emailNotificationSetting) {
    return (await this.apiClient.create(emailNotificationSetting)).body;
  }
}

export default EmailNotificationService;
