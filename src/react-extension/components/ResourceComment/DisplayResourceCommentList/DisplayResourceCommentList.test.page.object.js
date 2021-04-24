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

import {fireEvent, waitFor} from "@testing-library/react";

/**
 * Page object for the DisplayResourceCommentList component
 */
export default class DisplayResourceCommentListPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the list elements of comments
   */
  get list() {
    return this._container.querySelector('ul');
  }

  /**
   * Returns the loading element
   */
  get loadingMessage() {
    return this._container.querySelector('.processing-text');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.list !== null;
  }

  /**
   * Returns true
   */
  isLoading() {
    return this.loadingMessage !== null && this.loadingMessage.innerHTML === 'Retrieving comments';
  }

  /**
   * Returns the number of displayed comments
   */
  count() {
    return this.list.querySelectorAll('.comment').length;
  }

  /**
   * Returns the displayed comment author for the 'index' one
   * @param index The display rank of author's comment
   */
  author(index) {
    return this.list.querySelectorAll('.comment')[index - 1].querySelector('.author.username').textContent;
  }

  /**
   * Returns the displayed comment creation time for the 'index' one
   * @param index The display rank of comment
   */
  creationTime(index) {
    return this.list.querySelectorAll('.comment')[index - 1].querySelector('.metadata .modified').textContent;
  }

  /**
   * Wait for the comments to be loaded while an in-progress function should be satisfied
   * @param inProgressFn An in-progress function
   * @returns {Promise<void>} The promise that the load operation is completed
   */
  async waitForLoading(inProgressFn) {
    await waitFor(inProgressFn);
  }

  /**
   * Call to the delete action on the index-th comment
   * @param index The rank of the comment
   */
  async delete(index) {
    const deleteButton = this.list.querySelectorAll('.delete-comment')[index - 1];
    const leftClick = {button: 0};
    fireEvent.click(deleteButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns true if the delete action can be applied on the index-th comment
   * @param index The rank of the comment
   */
  canDelete(index) {
    return typeof this.list.querySelectorAll('.delete-comment')[index - 1] !== 'undefined';
  }
}
