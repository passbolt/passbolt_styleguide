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

const SMTP_SETTINGS_RESOURCE_NAME = "smtp/settings";

/**
 * Model related to the SMTP settings
 */
class SmtpSettingsService {
  /**
   * Constructor
   *
   * @param {ApiClientOptions} apiClientOptions
   * @public
   */
  constructor(apiClientOptions) {
    apiClientOptions.setResourceName(SMTP_SETTINGS_RESOURCE_NAME);
    this.apiClient = new ApiClient(apiClientOptions);
  }

  /**
   * Find the SMTP settings using Passbolt API
   *
   * @return {Promise<Array<SmtpSettingsDto>>|null>}
   */
  async find() {
    const smtpSettings = await this.apiClient.findAll();
    const settings = smtpSettings?.body;
    settings.client = settings.client ?? "";
    settings.tls = Boolean(settings?.tls); //could be null from the API, we need it to be false then
    return settings;
  }

  /**
   * Save the given SMTP settings using Passbolt API
   * @param {SmtpSettignsDto} smtpSettings
   * @returns {Promise<SmtpSettignsDto>}
   */
  async save(smtpSettings) {
    const savedSettings = (await this.apiClient.create(smtpSettings)).body;
    savedSettings.tls = Boolean(savedSettings.tls);
    return savedSettings;
  }
}

export default SmtpSettingsService;
