
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
 * The FilterResourcesByTagsListContextualMenu component represented as a page
 */
export default class FilterResourcesByTagsListContextualMenuPageObject {
  /**
   * Default constructor
   * @param container The container which includes the DisplayTagListContextualMenu Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * @returns the delete tag menu element
   */
  get deleteTagContextualMenu() {
    return this._container.querySelector('#delete-tag');
  }

  /**
   * @returns {any} the edit tag menu element
   */
  get editTagContextualMenu() {
    return this._container.querySelector('#edit-tag');
  }
}
