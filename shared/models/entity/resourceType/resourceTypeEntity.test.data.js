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
export const TEST_RESOURCE_TYPE_V5_DEFAULT = uuidv4();
export const TEST_RESOURCE_TYPE_V5_PASSWORD_STRING = uuidv4();
export const TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP = uuidv4();
export const TEST_RESOURCE_TYPE_V5_TOTP = uuidv4();
export const TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS = uuidv4();

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
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        username: {
          type: "string",
          maxLength: 255,
          nullable: true,
        },
        uri: {
          type: "string",
          maxLength: 1024,
          nullable: true,
        },
        description: {
          type: "string",
          maxLength: 10000,
          nullable: true,
        },
      }
    },
    secret: {
      type: "string",
      maxLength: 4096
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
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        username: {
          type: "string",
          maxLength: 255,
          nullable: true,
        },
        uri: {
          type: "string",
          maxLength: 1024,
          nullable: true,
        },
      }
    },
    secret: {
      type: "object",
      required: ["password"],
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
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        username: {
          type: "string",
          maxLength: 255,
          nullable: true,
        },
        uri: {
          type: "string",
          maxLength: 1024,
          nullable: true,
        },
      }
    },
    secret: {
      type: "object",
      required: ["password", "totp"],
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
              maximum: 8,
            },
            period: {
              type: "number"
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
  name: "Standalone TOTP",
  slug: "totp",
  definition: {
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        uri: {
          type: "string",
          maxLength: 1024,
          nullable: true,
        },
      }
    },
    secret: {
      type: "object",
      required: ["totp"],
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
              maximum: 8,
            },
            period: {
              type: "number"
            }
          }
        }
      },
    }
  },
  ...data
});

/**
 * Resource type with secret definition DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceTypeWithoutSecretDefinitionDto = (data = {}) => ({
  id: uuidv4(),
  name: "Empty definition resource type",
  slug: "password-string",
  definition: {
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        uri: {
          type: "string",
          maxLength: 1024,
          nullable: true,
        },
      }
    },
  },
  ...data
});

/**
 * Resource V5 default type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceTypeV5DefaultDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_V5_DEFAULT,
  name: "V5 Default",
  slug: "v5-default",
  definition: {
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        username: {
          type: "string",
          maxLength: 255,
          nullable: true,
        },
        uris: {
          type: "array",
          items: {
            type: "string",
            maxLength: 1024,
            nullable: true
          },
          maxItems: 32,
        },
        description: {
          type: "string",
          maxLength: 10000,
          nullable: true,
        },
        custom_fields: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              maxItems: 128,
              items: {
                type: "object",
                required: ["id", "type"],
                properties: {
                  id: {
                    type: "string",
                    format: "uuid"
                  },
                  type: {
                    type: "string",
                    enum: ["text", "password", "boolean", "number", "uri"]
                  },
                  metadata_key: {
                    type: "string",
                    maxLength: 255,
                    nullable: true
                  },
                  metadata_value: {
                    anyOf: [
                      {type: "string", maxLength: 5000},
                      {type: "number"},
                      {type: "boolean"}
                    ],
                    nullable: true
                  },
                }
              }
            }
          }
        }
      }
    },
    secret: {
      type: "object",
      required: ["password"],
      properties: {
        object_type: {
          type: "string",
          enum: ['PASSBOLT_SECRET_DATA'],
        },
        password: {
          type: "string",
          maxLength: 4096,
          nullable: true,
        },
        description: {
          type: "string",
          maxLength: 10000,
          nullable: true,
        },
        custom_fields: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              maxItems: 128,
              items: {
                type: "object",
                required: ["id", "type"],
                properties: {
                  id: {
                    type: "string",
                    format: "uuid"
                  },
                  type: {
                    type: "string",
                    enum: ["text", "password", "boolean", "number", "uri"]
                  },
                  secret_key: {
                    type: "string",
                    maxLength: 255,
                    nullable: true
                  },
                  secret_value: {
                    anyOf: [
                      {type: "string", maxLength: 5000},
                      {type: "number"},
                      {type: "boolean"}
                    ],
                    nullable: true
                  }
                }
              }
            }
          }
        }
      },
    }
  },
  ...data
});

/**
 * Resource V5 password string type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceTypeV5PasswordStringDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_V5_PASSWORD_STRING,
  name: "V5 Password",
  slug: "v5-password-string",
  definition: {
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        username: {
          type: "string",
          maxLength: 255,
          nullable: true,
        },
        uris: {
          type: "array",
          items: {
            type: "string",
            maxLength: 1024,
            nullable: true
          },
          maxItems: 32,
        },
        description: {
          type: "string",
          maxLength: 10000,
          nullable: true,
        },
      }
    },
    secret: {
      type: "string",
      maxLength: 4096
    }
  },
  ...data
});

/**
 * Resource V5 default with totp type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceTypeV5DefaultTotpDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
  name: "V5 Default with TOTP",
  slug: "v5-default-with-totp",
  definition: {
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        username: {
          type: "string",
          maxLength: 255,
          nullable: true,
        },
        uris: {
          type: "array",
          items: {
            type: "string",
            maxLength: 1024,
            nullable: true
          },
          maxItems: 32,
        },
        description: {
          type: "string",
          maxLength: 10000,
          nullable: true,
        },
        custom_fields: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              maxItems: 128,
              items: {
                type: "object",
                required: ["id", "type"],
                properties: {
                  id: {
                    type: "string",
                    format: "uuid"
                  },
                  type: {
                    type: "string",
                    enum: ["text", "password", "boolean", "number", "uri"]
                  },
                  metadata_key: {
                    type: "string",
                    maxLength: 255,
                    nullable: true
                  },
                  metadata_value: {
                    anyOf: [
                      {type: "string", maxLength: 5000},
                      {type: "number"},
                      {type: "boolean"}
                    ],
                    nullable: true
                  },
                }
              }
            }
          }
        }
      }
    },
    secret: {
      type: "object",
      required: ["password", "totp"],
      properties: {
        object_type: {
          type: "string",
          enum: ['PASSBOLT_SECRET_DATA'],
        },
        password: {
          type: "string",
          maxLength: 4096,
          nullable: true,
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
              maximum: 8,
            },
            period: {
              type: "number"
            }
          }
        },
        custom_fields: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              maxItems: 128,
              items: {
                type: "object",
                required: ["id", "type"],
                properties: {
                  id: {
                    type: "string",
                    format: "uuid"
                  },
                  type: {
                    type: "string",
                    enum: ["text", "password", "boolean", "number", "uri"]
                  },
                  secret_key: {
                    type: "string",
                    maxLength: 255,
                    nullable: true
                  },
                  secret_value: {
                    anyOf: [
                      {type: "string", maxLength: 5000},
                      {type: "number"},
                      {type: "boolean"}
                    ],
                    nullable: true
                  }
                }
              }
            }
          }
        }
      },
    }
  },
  ...data
});

/**
 * Resource V5 TOTP resource type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceTypeV5TotpDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_V5_TOTP,
  name: "V5 Standalone TOTP",
  slug: "v5-totp-standalone",
  definition: {
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        uris: {
          type: "array",
          items: {
            type: "string",
            maxLength: 1024,
            nullable: true
          },
          maxItems: 32,
        },
        description: {
          type: "string",
          maxLength: 10000,
          nullable: true,
        },
      }
    },
    secret: {
      type: "object",
      required: ["totp"],
      properties: {
        object_type: {
          type: "string",
          enum: ['PASSBOLT_SECRET_DATA'],
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
              maximum: 8,
            },
            period: {
              type: "number"
            }
          }
        }
      },
    }
  },
  ...data
});

/**
 * Resource V5 TOTP resource type DTO.
 * @param {object} data The data to override
 * @returns {object}
 */
export const resourceTypeV5CustomFieldsDto = (data = {}) => ({
  id: TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
  name: "Standalone custom fields",
  slug: "v5-custom-fields-standalone",
  definition: {
    resource: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
          maxLength: 255
        },
        username: {
          type: "string",
          maxLength: 255,
          nullable: true
        },
        uris: {
          type: "array",
          items: {
            type: "string",
            maxLength: 1024,
            nullable: true
          },
          maxItems: 32,
        },
        description: {
          type: "string",
          maxLength: 10000,
          nullable: true,
        },
        custom_fields: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              maxItems: 128,
              items: {
                type: "object",
                required: ["id", "type"],
                properties: {
                  id: {
                    type: "string",
                    format: "uuid"
                  },
                  type: {
                    type: "string",
                    enum: ["text", "password", "boolean", "number", "uri"]
                  },
                  metadata_key: {
                    type: "string",
                    maxLength: 255,
                    nullable: true
                  },
                  metadata_value: {
                    anyOf: [
                      {type: "string", maxLength: 5000},
                      {type: "number"},
                      {type: "boolean"}
                    ],
                    nullable: true
                  },
                }
              }
            }
          }
        }
      },
    },
    secret: {
      type: "object",
      required: ["custom_fields"],
      properties: {
        object_type: {
          type: "string",
          enum: ['PASSBOLT_SECRET_DATA'],
        },
        custom_fields: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              maxItems: 128,
              items: {
                type: "object",
                required: ["id", "type"],
                properties: {
                  id: {
                    type: "string",
                    format: "uuid"
                  },
                  type: {
                    type: "string",
                    enum: ["text", "password", "boolean", "number", "uri"]
                  },
                  secret_key: {
                    type: "string",
                    maxLength: 255,
                    nullable: true
                  },
                  secret_value: {
                    anyOf: [
                      {type: "string", maxLength: 5000},
                      {type: "number"},
                      {type: "boolean"}
                    ],
                    nullable: true
                  }
                }
              }
            }
          }
        }
      },
    }
  },
  ...data
});
