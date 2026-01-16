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
 * @since         3.6.0
 */

import PassboltResponseEntity from "../../src/shared/models/entity/apiService/PassboltResponseEntity";

/**
 * Mock an API response
 * @param {Object} body The response body
 * @returns {Promise<string>} The response serialized in JSON.
 */
export const mockApiResponse = (body = {}, header = {}) => Promise.resolve(JSON.stringify({header: header, body: body}));

/**
 * Mock an API error response
 * @param {number} status the HTTP status code of the response
 * @param {string} errorMessage The error message of the response
 * @param {Object} body The response body
 * @returns {Promise<string>} The response serialized in JSON.
 */
export const mockApiResponseError = (status, errorMessage, body = {}) => Promise.resolve({
  status: status,
  body: JSON.stringify({
    header: {
      message: errorMessage,
      status: status
    },
    body: body
  })
});

/**
 * Mock a Passbolt API response entity with pagination support
 * Creates a PassboltResponseEntity instance suitable for testing paginated endpoints.
 * The pagination count is automatically computed based on the body content.
 *
 * @param {Object|Array} body The response body. Can be an array for collections or an object for single entities.
 * @param {Object} [header] The response header with optional pagination metadata
 * @param {Object} [header.pagination] Pagination metadata
 * @param {number} [header.pagination.page=1] Current page number
 * @param {number} [header.pagination.limit=1000] Maximum number of items per page
 * @returns {Promise<PassboltResponseEntity>} A PassboltResponseEntity instance with computed pagination count
 *
 * @example
 * // Mock a paginated collection response
 * const response = await mockPassboltResponse([{id: 1}, {id: 2}, {id: 3}]);
 */
export const mockPassboltResponse = async (body, header = { pagination: { page: 1, limit: 1000}}) => {
  const elementCount = body?.length || 0;
  return new PassboltResponseEntity({
    body: body,
    header: {
      ...header,
      pagination: {
        ...header.pagination,
        count: elementCount
      }
    }
  })
};