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

import SmtpSettingsApiService from "../../services/api/smtpSettings/smtpSettingsApiService";

/**
 * Model related to the SMTP settings
 */
class SmtpSettingsModel {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    this.smtpSettingsService = new SmtpSettingsApiService(apiClientOptions);
  }

  /**
   * Find the SMTP settings using Passbolt API
   * @return {Promise<SmtpSettingsDto|null>}
   */
  async findSmtpSettings() {
    const apiResponse = await this.smtpSettingsService.find();
    const settings = apiResponse.body;
    settings.client = settings.client ?? "";
    settings.tls = Boolean(settings.tls);
    return settings;
  }

  /**
   * Save the SMTP settings using Passbolt API
   * @param {SmtpSettingsDto} smtpSettings the settings to save
   * @return {Promise<SmtpSettingsDto|null>}
   */
  async saveSmtpSettings(smtpSettings) {
    const response = await this.smtpSettingsService.create(smtpSettings);
    const savedSettings = response.body;
    savedSettings.tls = Boolean(savedSettings.tls);
    return savedSettings;
  }
}

export default SmtpSettingsModel;
