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

/*
 * ==================================================
 * DTOs
 * ==================================================
 */

/**
 * Resource with string password DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const plaintextSecretPasswordStringDto = (data = {}) => ({
  password: "secret-password",
  ...data
});

/**
 * Resource with encrypted description DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const plaintextSecretPasswordAndDescriptionDto = (data = {}) => ({
  password: "secret-password",
  description: "secret-description",
  ...data
});

/**
 * Resource with encrypted description and TOTP DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const plaintextSecretPasswordDescriptionTotpDto = (data = {}) => ({
  password: "secret-password",
  description: "secret-description",
  totp: {
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret_key: "i73r3rn22atgcmdlqmotr2q7erukgmri46bvzxzlc6jbkckmtlpa",
  },
  ...data
});

/**
 * Resource TOTP DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const plaintextSecretTotpDto = (data = {}) => ({
  totp: {
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret_key: "i73r3rn22atgcmdlqmotr2q7erukgmri46bvzxzlc6jbkckmtlpa",
  },
  ...data
});

/*
 * ==================================================
 * Schemas
 * ==================================================
 */

export const plaintextSecretStringSchema = (data = {}) => ({
  type: "object",
  required: [
    "password"
  ],
  properties: {
    password: {
      type: "string",
      maxLength: 4096
    },
  },
  ...data
});

export const plaintextSecretPasswordAndDescriptionSchema = (data = {}) => ({
  type: "object",
  required: [
    "password"
  ],
  properties: {
    password: {
      type: "string",
      maxLength: 4096
    },
    description: {
      type: "string",
      maxLength: 10000,
      nullable: true,
    },
  },
  ...data,
});

export const plaintextSecretPasswordDescriptionAndTotpSchema = (data = {}) => ({
  type: "object",
  required: [
    "password"
  ],
  properties: {
    password: {
      type: "string",
      maxLength: 4096
    },
    description: {
      type: "string",
      maxLength: 10000,
      nullable: true,
    },
    totp: {
      type: "object",
      required: [
        "secret_key",
        "digits",
        "algorithm"
      ],
      properties: {
        algorithm: {
          type: "string",
          minLength: 4,
          maxLength: 6
        },
        secret_key: {
          type: "string",
          maxLength: 1024
        },
        digits: {
          type: "number",
          minimum: 6,
          maximum: 8
        },
        period: {
          type: "number"
        }
      }
    }
  },
  ...data
});

/**
 * Resource TOTP resource type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const plaintextSecretStandaloneTotpSchema = (data = {}) => ({
  type: "object",
  required: [
    "totp"
  ],
  properties: {
    totp: {
      type: "object",
      required: [
        "secret_key",
        "digits",
        "algorithm"
      ],
      properties: {
        algorithm: {
          type: "string",
          minLength: 4,
          maxLength: 6
        },
        secret_key: {
          type: "string",
          maxLength: 1024
        },
        digits: {
          type: "number",
          minimum: 6,
          maximum: 8
        },
        period: {
          type: "number"
        }
      }
    }
  },
  ...data
});
