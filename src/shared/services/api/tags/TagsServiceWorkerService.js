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
 * @since         6.0.0
 */
export const FIND_ALL_TAGS = "passbolt.tags.find-all";
export const UPDATE_TAG = "passbolt.tags.update";
export const DELETE_TAG = "passbolt.tags.delete";
export const UPDATE_RESOURCE_TAGS = "passbolt.tags.update-resource-tags";
export const ADD_TAG_TO_RESOURCES = "passbolt.tags.add-resources-tag";

class TagsServiceWorkerService {
  /**
   * Constructor
   * @param {Port} port The browser extension service worker port.
   */
  constructor(port) {
    this.port = port;
  }

  /**
   * Find all tags
   * @returns {Promise<Array>} The collection of tags
   */
  findAll() {
    return this.port.request(FIND_ALL_TAGS);
  }

  /**
   * Update a tag
   * @param {Object} tagDto The tag dto
   * @returns {Promise<Object>} The updated tag
   */
  update(tagDto) {
    return this.port.request(UPDATE_TAG, tagDto);
  }

  /**
   * Delete a tag
   * @param {string} tagId The tag to delete id
   * @returns {Promise<void>}
   */
  async delete(tagId) {
    await this.port.request(DELETE_TAG, tagId);
  }

  /**
   * Update resource's tags collection
   * @param {string} resourceId The resource id to update
   * @param {Array} tags The updated tags collection
   * @returns {Promise<Object>} The updated resource
   */
  updateResourceTags(resourceId, tags) {
    return this.port.request(UPDATE_RESOURCE_TAGS, resourceId, tags);
  }

  /**
   * Add a tag to many resources tags collection
   * @param {Array<string>} resources The resource ids to update
   * @param {Object} tag The tag to add
   * @returns {Promise<Array>} The updated resources
   */
  addResourcesTag(resources, tag) {
    return this.port.request(ADD_TAG_TO_RESOURCES, { resources, tag });
  }
}

export default TagsServiceWorkerService;
