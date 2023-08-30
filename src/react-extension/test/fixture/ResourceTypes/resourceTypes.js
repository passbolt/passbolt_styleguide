export default [
  {
    "id": "669f8c64-242a-59fb-92fc-81f660975fd3",
    "slug": "password-string",
    "name": "Simple password",
    "description": "The original passbolt resource type, where the secret is a non empty string.",
    "definition": {
      "resource": {
        "type": "object",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "username": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 255
              },
              {
                "type": "null"
              }
            ]
          },
          "uri": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 1024
              },
              {
                "type": "null"
              }
            ]
          },
          "description": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 10000
              },
              {
                "type": "null"
              }
            ]
          }
        }
      },
      "secret": {
        "type": "string",
        "maxLength": 4064
      }
    },
    "created": "2020-09-02T07:23:19+00:00",
    "modified": "2020-09-02T07:23:19+00:00"
  },
  {
    "id": "a28a04cd-6f53-518a-967c-9963bf9cec51",
    "slug": "password-and-description",
    "name": "Password with description",
    "description": "A resource with the password and the description encrypted.",
    "definition": {
      "resource": {
        "type": "object",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "username": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 255
              },
              {
                "type": "null"
              }
            ]
          },
          "uri": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 1024
              },
              {
                "type": "null"
              }
            ]
          }
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
            "maxLength": 4064
          },
          "description": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 10000
              },
              {
                "type": "null"
              }
            ]
          }
        }
      }
    },
    "created": "2020-09-02T07:23:19+00:00",
    "modified": "2020-09-02T07:23:19+00:00"
  },
  {
    "id": "b34a04cd-6f53-907a-967c-9963bf9cec78",
    "slug": "password-and-description-and-totp",
    "name": "Password with description and totp",
    "description": "A resource with the password, the description and totp encrypted.",
    "definition": {
      "resource": {
        "type": "object",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "username": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 255
              },
              {
                "type": "null"
              }
            ]
          },
          "uri": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 1024
              },
              {
                "type": "null"
              }
            ]
          }
        }
      },
      "secret": {
        "type": "object",
        "required": [
          "password", "totp"
        ],
        "properties": {
          "password": {
            "type": "string",
            "maxLength": 4096
          },
          "description": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 10000
              },
              {
                "type": "null"
              }
            ]
          },
          "totp": {
            "type": "object",
            "required": [
              "type", "secret_key", "digits", "algorithm"
            ],
            "properties": {
              "algorithm": {
                "type": "string",
                "maxLength": 4,
                "minLength": 6
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
        }
      }
    },
    "created": "2020-09-02T07:23:19+00:00",
    "modified": "2020-09-02T07:23:19+00:00"
  },
  {
    "id": "c56a04cd-6f53-997a-967c-9963bf9cec62",
    "slug": "totp",
    "name": "Totp",
    "description": "A resource with totp encrypted.",
    "definition": {
      "resource": {
        "type": "object",
        "required": [
          "name"
        ],
        "properties": {
          "name": {
            "type": "string",
            "maxLength": 255
          },
          "uri": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 1024
              },
              {
                "type": "null"
              }
            ]
          }
        }
      },
      "secret": {
        "type": "object",
        "required": [
          "totp"
        ],
        "properties": {
          "totp": {
            "type": "object",
            "required": [
              "type","secret_key","digits","algorithm"
            ],
            "properties": {
              "algorithm": {
                "type": "string",
                "maxLength": 64,
                "minLength": 46
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
        }
      }
    },
    "created": "2020-09-02T07:23:19+00:00",
    "modified": "2020-09-02T07:23:19+00:00"
  }
];
