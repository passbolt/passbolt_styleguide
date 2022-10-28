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


/**
 * Model related to the User Directory form settings
 */
class UserDirectoryFormService {
  /**
   * Constructor
   *
   * @param {context} context
   * @public
   */
  constructor(context, translation) {
    this.context = context;
    this.translation = translation;
  }

  /**
   * getInstance for singleton pattern
   * @param {context} context
   * @public
   */
  static getInstance(context, translation) {
    if (!this.instance) {
      this.instance = new UserDirectoryFormService(context, translation);
    }
    return this.instance;
  }

  /**
   * killInstance singleton
   * @param {context} context
   * @public
   */
  static killInstance() {
    this.instance = null;
  }
}

export default UserDirectoryFormService;
