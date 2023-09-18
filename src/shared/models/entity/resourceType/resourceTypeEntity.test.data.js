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

export const TEST_RESOURCE_TYPE_PASSWORD_STRING = uuidv4();
export const TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION = uuidv4();
export const TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP = uuidv4();
export const TEST_RESOURCE_TYPE_TOTP = uuidv4();

/**
 * Resource with string password resource type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceTypePasswordStringDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
  name: "Simple password",
  slug: "password-string",
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
export const resourceTypePasswordAndDescriptionDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
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

/**
 * Resource with encrypted description and TOTP resource type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceTypePasswordDescriptionTotpDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  name: "Password, Description and TOTP",
  slug: "password-description-totp",
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
        "totp": {
          "type": "object",
          "required": [
            "secret_key",
            "digits",
            "algorithm"
          ],
          "properties": {
            "algorithm": {
              "type": "string",
              "minLength": 4,
              "maxLength": 6
            },
            "secret_key": {
              "type": "string",
              "maxLength": 1024
            },
            "digits": {
              "type": "number",
              "minimum": 6,
              "exclusiveMaximum": 9
            },
            "period": {
              "type": "number"
            }
          }
        }
      },
    }
  },
  ...data
});

/**
 * Resource TOTP resource type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceTypeTotpDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_TOTP,
  name: "Password, Description and TOTP",
  slug: "password-description-totp",
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
        "totp": {
          "type": "object",
          "required": [
            "secret_key",
            "digits",
            "algorithm"
          ],
          "properties": {
            "algorithm": {
              "type": "string",
              "minLength": 4,
              "maxLength": 6
            },
            "secret_key": {
              "type": "string",
              "maxLength": 1024
            },
            "digits": {
              "type": "number",
              "minimum": 6,
              "exclusiveMaximum": 9
            },
            "period": {
              "type": "number"
            }
          }
        }
      },
    }
  },
  ...data
});
