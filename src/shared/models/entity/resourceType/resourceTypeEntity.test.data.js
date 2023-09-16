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
 * @since         4.3.0
 */

import {v4 as uuidv4} from "uuid";

export const TEST_RESOURCE_TYPE_RESOURCE_WITH_STRING_PASSWORD = uuidv4();

export const TEST_RESOURCE_TYPE_RESOURCE_WITH_ENCRYPTED_DESCRIPTION = uuidv4();

/**
 * Resource with string password resource type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceWithStringPasswordResourceTypeDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_RESOURCE_WITH_STRING_PASSWORD,
  name: "Password with description",
  slug: "password-and-description",
  definition: {
    "resource": {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 64
        },
        "username": {
          "anyOf": [{
            "type": "string",
            "maxLength": 64
          }, {
            "type": "null"
          }]
        },
        "uri": {
          "anyOf": [{
            "type": "string",
            "maxLength": 1024
          }, {
            "type": "null"
          }]
        },
        "description": {
          "anyOf": [{
            "type": "string",
            "maxLength": 10000
          }, {
            "type": "null"
          }]
        },
      }
    },
    "secret": {
      "type": "string",
      "maxLength": 4096
    }
  },
  ...data
});

/**
 * Resource with encrypted description resource type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceWithEncryptedDescriptionResourceTypeDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_RESOURCE_WITH_ENCRYPTED_DESCRIPTION,
  name: "Password with description",
  slug: "password-and-description",
  definition: {
    "resource": {
      "type": "object",
      "required": [
        "name"
      ],
      "properties": {
        "name": {
          "type": "string",
          "maxLength": 64
        },
        "username": {
          "anyOf": [{
            "type": "string",
            "maxLength": 64
          }, {
            "type": "null"
          }]
        },
        "uri": {
          "anyOf": [{
            "type": "string",
            "maxLength": 1024
          }, {
            "type": "null"
          }]
        },
      }
    },
    "secret": {
      "type": "object",
      "required": [
        "password"
      ],
      "properties": {
        "password": {
          "type": "string",
          "maxLength": 4096
        },
        "description": {
          "anyOf": [{
            "type": "string",
            "maxLength": 10000
          }, {
            "type": "null"
          }]
        },
      },
    }
  },
  ...data
});
