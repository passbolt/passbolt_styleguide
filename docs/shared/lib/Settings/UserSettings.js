/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
export default class UserSettings {
  constructor(settings) {
    this.settings = settings;
  }

  /**
   * Returns the user id
   */
  get id() {
    return this.settings["user.id"];
  }

  /**
   * Returns the user full name
   */
  get fullName() {
    return `${this.settings["user.firstname"]} ${this.settings["user.lastname"]}`;
  }

  /**
   * Returns the username
   */
  get username() {
    return this.settings["user.username"];
  }

  /**
   * Returns the current user theme
   * @returns {*}
   */
  getTheme() {
    return this.settings["user.settings.theme"];
  }

  getTrustedDomain() {
    return this.settings["user.settings.trustedDomain"];
  }

  /**
   * retunr the security token
   * @returns {{backgroundColor, code, textColor}}
   */
  getSecurityToken() {
    return {
      code: this.settings["user.settings.securityToken.code"],
      backgroundColor: this.settings["user.settings.securityToken.color"],
      textColor: this.settings["user.settings.securityToken.textColor"]
    };
  }

  /**
   * Returns the current user locale
   * @returns {*}
   */
  get locale() {
    return this.settings["user.settings.locale"];
  }
}
