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
 * @since         5.4.0
 */
export const COMMENTS_CREATE = "passbolt.comments.create";
export const COMMENTS_DELETE = "passbolt.comments.delete";
export const COMMENTS_FIND_ALL_BY_RESOURCE = "passbolt.comments.find-all-by-resource";

class CommentsServiceWorkerService {
  /**
   * Constructor
   * @param {port} port The browser extension background page / service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Add a new Comment
   * @param {object} payload
   * @returns {object} The comments
   */
  async create(payload) {
    return await this.port.request(COMMENTS_CREATE, payload);
  }

  /**
   * Delete a Comment
   * @param {string} commentId
   * @returns {void}
   */
  async delete(commentId) {
    return await this.port.request(COMMENTS_DELETE, commentId);
  }

  /**
   * Find all comments for given resourceId
   * @param {string} resourceId
   * @returns {object} The comments
   */
  async findAllByResource(resourceId) {
    return await this.port.request(COMMENTS_FIND_ALL_BY_RESOURCE, resourceId);
  }
}

export default CommentsServiceWorkerService;
