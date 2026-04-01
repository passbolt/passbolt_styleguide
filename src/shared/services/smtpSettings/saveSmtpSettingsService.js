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

import SmtpSettingsApiService from "../api/smtpSettings/smtpSettingsApiService";
import SmtpSettingsEntity from "../../models/entity/smtpSettings/smtpSettingsEntity";

/**
 * Service to save SMTP settings
 */
class SaveSmtpSettingsService {
  /**
   * Constructor
   * @param {ApiClientOptions} apiClientOptions
   */
  constructor(apiClientOptions) {
    this.smtpSettingsApiService = new SmtpSettingsApiService(apiClientOptions);
  }

  /**
   * Save the given SMTP settings entity
   * @param {SmtpSettingsEntity} smtpSettingsEntity
   * @returns {Promise<SmtpNoneAuthenticationEntity|SmtpUsernameAuthenticationEntity|
   *           SmtpUsernamePasswordAuthenticationEntity|SmtpOAuthCredentialsGrantSettingsEntity>}
   */
  async save(smtpSettingsEntity) {
    const response = await this.smtpSettingsApiService.create(smtpSettingsEntity.toDto());
    return SmtpSettingsEntity.createFromSettings(response.body);
  }
}

export default SaveSmtpSettingsService;
