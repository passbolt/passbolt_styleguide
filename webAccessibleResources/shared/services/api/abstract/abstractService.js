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
 */
import { ApiClient } from "../../../lib/apiClient/apiClient";
import Validator from "validator";
import { assertNumber } from "../../../utils/assertions";

const DIRECTION_ASC = "asc";
const DIRECTION_DESC = "desc";

class AbstractService {
  /**
   *
   * @param apiClientOptions
   * @param resourceName
   */
  constructor(apiClientOptions, resourceName) {
    apiClientOptions.setResourceName(resourceName);
    this.apiClient = new ApiClient(apiClientOptions);
  }

  /**
   * Format contain options
   *
   * @param {object} contain example: {"user": true, "user.profile": true}
   * @param {array} supportedOptions example: ['user', 'user.profile', 'user.profile.avatar']
   * @returns {object} to be used in API request example: {"contain[user]":"1", "contain[user.profile]":"1"}
   */
  formatContainOptions(contain, supportedOptions) {
    const result = {};
    for (const item in contain) {
      /*
       * Trigger error if other formats are used
       * for example {user: {profile: true}} instead of {'user':true, 'user.profile': true}
       */
      if (typeof item !== "string") {
        const details = JSON.stringify(contain);
        throw new TypeError(`Invalid contain ${details}, items should be a string.`);
      }
      if (supportedOptions.includes(item)) {
        result[`contain[${item}]`] = contain[item] ? "1" : "0";
      }
    }
    return result;
  }

  /**
   * Format contain filters
   *
   * @param {object} filter example: {"has-id": ['uuid', 'uuid2'], "search": 'name'}
   * @param {array} supportedOptions example: ['has-id', 'search']
   * @throws {TypeError} if filter value is not an array or a string
   * @returns {object} to be used in API request
   */
  formatFilterOptions(filter, supportedOptions) {
    const result = {};
    for (const item in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, item) && supportedOptions.includes(item)) {
        if (typeof filter[item] === "boolean") {
          result[`filter[${item}]`] = filter[item] ? "1" : "0";
        } else if (typeof filter[item] === "string") {
          result[`filter[${item}]`] = filter[item];
        } else if (Array.isArray(filter[item])) {
          result[`filter[${item}][]`] = filter[item];
        } else {
          throw new TypeError(`Service error. Filter option should be an array or a string.`);
        }
      }
    }
    return result;
  }

  /**
   * Format page options
   *
   * @param {Object} pageOptions example: {"sorts": {'Resources.name': 'ASC'}, page: 1, limit: 1000}
   * @param {Array<String>} [pageOptions.sorts]
   * @param {number} [pageOptions.page]
   * @param {number} [pageOptions.limit]
   * @param {Array<String>} supportedOrders example: ['Resources.name', 'Resources.modified']
   * @returns {Object} to be used in API request
   */
  formatPageOptions(pageOptions, supportedSorts) {
    const result = {};

    if (pageOptions.limit) {
      assertNumber(pageOptions.limit);
      if (pageOptions.limit < 1) {
        throw new Error("The 'limit' parameter must be an integer greater than or equal to 1");
      }

      result.limit = pageOptions.limit.toString();
    }

    if (pageOptions.page && result.limit) {
      assertNumber(pageOptions.page);
      if (pageOptions.page < 1) {
        throw new Error("The 'page' parameter must be an integer greater than or equal to 1");
      }

      result.page = pageOptions.page.toString();
    }

    if (pageOptions.sorts) {
      const fields = Object.keys(pageOptions.sorts);
      fields.forEach((field) => {
        if (!supportedSorts.includes(field)) {
          return;
        }

        const direction = pageOptions.sorts[field] === DIRECTION_DESC ? DIRECTION_DESC : DIRECTION_ASC;
        result[`sort[${field}]`] = direction;
      });
    }

    return result;
  }

  /**
   * Assert that an id is a valid uuid or throw a TypeError
   *
   * @param {string} id
   * @throws {TypeError} if id is not a valid uuid
   * @return {void}
   * @public
   */
  assertValidId(id) {
    if (!id || typeof id !== "string" || !Validator.isUUID(id)) {
      throw new TypeError(`Service error. The id '${id}' is not a valid uuid.`);
    }
  }

  /**
   * Assert the provided data is not empty
   *
   * @param {object} data
   * @return {void}
   * @public
   */
  assertNonEmptyData(data) {
    if (!data) {
      throw new TypeError(`Service error. Data cannot be empty.`);
    }
  }
}

export default AbstractService;
