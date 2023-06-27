
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
 * @since         2.11.0
 */

/**
 * The FilterUsersByGroupContextualMenu component represented as a page
 */
export default class DisplayGroupsContextualMenuPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * @returns the delete group menu element
   */
  get deleteGroupContextualMenu() {
    return this._container.querySelector('#delete-group');
  }

  /**
   * @returns {any} the edit group menu element
   */
  get editGroupContextualMenu() {
    return this._container.querySelector('#edit-group');
  }
}
