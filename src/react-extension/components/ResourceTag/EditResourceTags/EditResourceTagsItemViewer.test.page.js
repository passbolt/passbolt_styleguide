
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
 * The EditResourceTagsItemViewer component represented as a page
 */
export default class EditResourceTagsItemViewerPageObject {
  /**
   * Default constructor
   * @param container The container which includes the TagItemViewer Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the loading element
   */
  get loadingMessage() {
    return this._container.querySelector('.processing-text');
  }

  /**
   * Returns true
   */
  isLoading() {
    return this.loadingMessage !== null && this.loadingMessage.innerHTML === 'Retrieving tags';
  }

  /**
   * Returns the empty element
   */
  get emptyMessage() {
    return this._container.querySelector('.empty-content');
  }

  /**
   * Returns true
   */
  isEmpty() {
    return this.emptyMessage !== null && this.emptyMessage.innerHTML === 'There is no tag, click here to add one';
  }

  /**
   * Returns the number of displayed tags
   */
  count() {
    return this._container.querySelectorAll('.tag-list-item .tag').length;
  }

  /**
   * Returns the displayed tag name for the 'index' one
   * @param index The display rank of name's tag
   */
  name(index) {
    return this._container.querySelectorAll('.tag-list-item')[index - 1].querySelector('.tag.ellipsis').textContent;
  }
}
