/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.12.0
 */

import SiteSettings from "../../lib/Settings/SiteSettings";
import IsEmailValidator from "../../lib/Validator/IsEmailValidator";
import IsRegexValidator from "../../lib/Validator/IsRegexValidator";

export default class AppEmailValidatorService {
  /**
   * Validate an email
   * @param {string} value The value to validate.
   * @param {SiteSettings} appSettings The application settings.
   * @returns {boolean|boolean}
   */
  static validate(value, appSettings) {
    return AppEmailValidatorService.getValidator(appSettings)
      .validate(value);
  }

  /**
   * Get the application validator.
   *
   * Note 1: This method is used in a non asynchronous context (Entity).
   * Note 2: This method requires the application settings to be loaded and stored in the app settings model cache.
   *
   * @params {SiteSettings} appSettings The application settings
   * @returns {IsRegexValidator|IsEmailValidator}
   */
  static getValidator(appSettings) {
    if (appSettings
      && appSettings instanceof SiteSettings
      && appSettings.emailValidateRegex) {
      return new IsRegexValidator(appSettings.emailValidateRegex);
    }

    return IsEmailValidator;
  }
}
