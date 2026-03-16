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
 * Service to find SMTP settings
 */
class FindSmtpSettingsService {
  /**
   * Constructor
   * @param {ApiClientOptions} apiClientOptions
   */
  constructor(apiClientOptions) {
    this.smtpSettingsApiService = new SmtpSettingsApiService(apiClientOptions);
  }

  /**
   * Find the SMTP settings
   * @returns {Promise<SmtpNoneAuthenticationEntity|SmtpUsernameAuthenticationEntity|
   *           SmtpUsernamePasswordAuthenticationEntity|SmtpOAuthCredentialsGrantSettingsEntity>}
   */
  async find() {
    const response = await this.smtpSettingsApiService.find();
    return SmtpSettingsEntity.createFromSettings(response.body);
  }
}

export default FindSmtpSettingsService;
