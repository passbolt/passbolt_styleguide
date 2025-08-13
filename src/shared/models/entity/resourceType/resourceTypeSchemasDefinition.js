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
 * @since         4.10.0
 */
export const RESOURCE_TYPE_PASSWORD_STRING_SLUG = "password-string";
export const RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG = "password-and-description";
export const RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG = "password-description-totp";
export const RESOURCE_TYPE_TOTP_SLUG = "totp";
export const RESOURCE_TYPE_V5_DEFAULT_SLUG = "v5-default";
export const RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG = "v5-password-string";
export const RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG = "v5-default-with-totp";
export const RESOURCE_TYPE_V5_TOTP_SLUG = "v5-totp-standalone";
export const RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG = "v5-custom-fields";

//Plaintext secret schema for slug: "password-string"
export const RESOURCE_TYPE_PASSWORD_STRING_LEGACY_DEFINITION_SCHEMA = {
  resource: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
        maxLength: 255,
      },
      username: {
        type: "string",
        maxLength: 255,
        nullable: true,
      },
      description: {
        maxLength: 10000,
        nullable: true,
        type: "string"
      },
      uri: {
        type: "string",
        maxLength: 1024,
        nullable: true
      }
    }
  },
  secret: {
    type: "string",
    maxLength: 4096
  }
};

//Plaintext secret schema for slug: "password-and-description"
const RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_DEFINITION_SCHEMA = {
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
      uri: {
        type: "string",
        maxLength: 1024,
        nullable: true
      },
    },
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
};

//Plaintext secret schema for slug: "totp"
const RESOURCE_TYPE_TOTP_DEFINITION_SCHEMA = {
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
        nullable: true
      }
    }
  },
  secret: {
    type: "object",
    required: ["totp"],
    properties: {
      totp: {
        type: "object",
        required: ["secret_key", "digits", "algorithm"],
        properties: {
          algorithm: {
            type: "string",
            minLength: 4,
            maxLength: 6,
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
    }
  }
};

//Plaintext secret schema for slug: "password-description-totp"
const RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_DEFINITION_SCHEMA = {
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
      uri: {
        type: "string",
        maxLength: 1024,
        nullable: true
      },
    },
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
      totp: RESOURCE_TYPE_TOTP_DEFINITION_SCHEMA.secret.properties.totp,
    },
  }
};

//Plaintext secret schema for slug: "v5-custom-fields"
const RESOURCE_TYPE_V5_CUSTOM_FIELDS_DEFINITION_SCHEMA = {
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
        maxItems: 32
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
                    {type: "string", maxLength: 20000},
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
                    {type: "string", maxLength: 20000},
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
};

//Plaintext secret schema for slug: "v5-default"
const RESOURCE_TYPE_V5_DEFAULT_DEFINITION_SCHEMA = {
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
        maxItems: 32
      },
      description: {
        type: "string",
        maxLength: 10000,
        nullable: true,
      },
      custom_fields: RESOURCE_TYPE_V5_CUSTOM_FIELDS_DEFINITION_SCHEMA.resource.properties.custom_fields
    },
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
        nullable: true
      },
      description: {
        type: "string",
        maxLength: 50000,
        nullable: true,
      },
      custom_fields: RESOURCE_TYPE_V5_CUSTOM_FIELDS_DEFINITION_SCHEMA.secret.properties.custom_fields
    },
  }
};

//Plaintext secret schema for slug: "v5-password-string"
const RESOURCE_TYPE_V5_PASSWORD_STRING_DEFINITION_SCHEMA = {
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
        maxItems: 32
      },
      description: {
        type: "string",
        maxLength: 10000,
        nullable: true,
      },
    },
  },
  secret: {
    type: "string",
    maxLength: 4096
  }
};

//Plaintext secret schema for slug: "v5-default-with-totp"
const RESOURCE_TYPE_V5_DEFAULT_TOTP_DEFINITION_SCHEMA = {
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
        maxItems: 32
      },
      description: {
        type: "string",
        maxLength: 10000,
        nullable: true,
      },
      custom_fields: RESOURCE_TYPE_V5_CUSTOM_FIELDS_DEFINITION_SCHEMA.resource.properties.custom_fields
    },
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
        nullable: true
      },
      description: {
        type: "string",
        maxLength: 50000,
        nullable: true,
      },
      totp: RESOURCE_TYPE_TOTP_DEFINITION_SCHEMA.secret.properties.totp,
      custom_fields: RESOURCE_TYPE_V5_CUSTOM_FIELDS_DEFINITION_SCHEMA.secret.properties.custom_fields
    },
  }
};

//Plaintext secret schema for slug: "v5-totp-standalone"
const RESOURCE_TYPE_V5_TOTP_DEFINITION_SCHEMA = {
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
        maxItems: 32
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
        required: ["secret_key", "digits", "algorithm"],
        properties: {
          algorithm: {
            type: "string",
            minLength: 4,
            maxLength: 6,
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
    }
  },
};

export const V4_TO_V5_RESOURCE_TYPE_MAPPING = {
  [RESOURCE_TYPE_PASSWORD_STRING_SLUG]: RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
  [RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG]: RESOURCE_TYPE_V5_DEFAULT_SLUG,
  [RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG]: RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  [RESOURCE_TYPE_TOTP_SLUG]: RESOURCE_TYPE_V5_TOTP_SLUG,
};

class ResourceTypeSchemasDefinition {
  get SCHEMAS() {
    return {
      [RESOURCE_TYPE_PASSWORD_STRING_SLUG]: RESOURCE_TYPE_PASSWORD_STRING_LEGACY_DEFINITION_SCHEMA,
      [RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG]: RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_DEFINITION_SCHEMA,
      [RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG]: RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_DEFINITION_SCHEMA,
      [RESOURCE_TYPE_TOTP_SLUG]: RESOURCE_TYPE_TOTP_DEFINITION_SCHEMA,
      [RESOURCE_TYPE_V5_DEFAULT_SLUG]: RESOURCE_TYPE_V5_DEFAULT_DEFINITION_SCHEMA,
      [RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG]: RESOURCE_TYPE_V5_PASSWORD_STRING_DEFINITION_SCHEMA,
      [RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG]: RESOURCE_TYPE_V5_DEFAULT_TOTP_DEFINITION_SCHEMA,
      [RESOURCE_TYPE_V5_TOTP_SLUG]: RESOURCE_TYPE_V5_TOTP_DEFINITION_SCHEMA,
      [RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG]: RESOURCE_TYPE_V5_CUSTOM_FIELDS_DEFINITION_SCHEMA
    };
  }
}

export default new ResourceTypeSchemasDefinition();
