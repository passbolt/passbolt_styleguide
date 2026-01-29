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
import { v4 as uuid } from "uuid";

export const SCENARIO_NULL = { label: "null", data: null };
export const SCENARIO_UNDEFINED = { label: "undefined", data: undefined };
export const SCENARIO_EMPTY = { label: "empty string", data: "" };
export const SCENARIO_STRING = { label: "a string", data: "valid-string" };
export const SCENARIO_STRING_UTF8 = { label: "a string UTF8", data: "🔥" };
export const SCENARIO_INTEGER = { label: "an integer", data: 42 };
export const SCENARIO_FLOAT = { label: "a float", data: 42.2 };
export const SCENARIO_OBJECT = { label: "an object", data: { str: "string" } };
export const SCENARIO_ARRAY = { label: "an array", data: ["string"] };
export const SCENARIO_ARRAY_EMPTY = { label: "an empty array", data: [] };
export const SCENARIO_UUID = { label: "a uuid", data: uuid() };
export const SCENARIO_DATE_YEAR = { label: "year", data: "2018" };
export const SCENARIO_DATE_YEAR_MONTH = { label: "year and month", data: "2018-10" };
export const SCENARIO_DATE_YEAR_MONTH_DAY = { label: "year, month and day", data: "2018-10-18" };
export const SCENARIO_DATE_YEAR_MONTH_DAY_TIME = {
  label: "year, month, day and time",
  data: "2021-11-17T13:19:48+00:00",
};
export const SCENARIO_BOOL_TRUE = { label: "true", data: true };
export const SCENARIO_BOOL_FALSE = { label: "false", data: false };

export const schemaValidateSimple = {
  type: "object",
  required: ["name"],
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
    name: {
      type: "string",
    },
    some: {
      type: "string",
      enum: ["type1", "type2"],
    },
    nested: {
      type: "object",
      required: [],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
      },
    },
    created: {
      type: "string",
      format: "date-time",
    },
  },
};

export const testObjectValidateSimpleDto = {
  id: uuid(),
  name: "valid name",
  some: "type1",
  created: "2024-08-20T13:59:11+00:00",
  not_in_schema: "must be removed",
};

export const schemaValidateRequired = {
  type: "object",
  required: ["property"],
  properties: {
    property: {
      anyOf: [
        { type: "string" },
        { type: "integer" },
        { type: "number" },
        { type: "boolean" },
        { type: "object" },
        { type: "array" },
      ],
    },
  },
};

export const schemaValidateNotNullable = {
  type: "object",
  required: [],
  properties: {
    property: {},
  },
};

export const schemaValidateNullable = {
  type: "object",
  required: [],
  properties: {
    property: {
      nullable: true,
    },
  },
};

export const schemaValidateTypeInvalid = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "invalid",
    },
  },
};

export const schemaValidateTypeString = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
    },
  },
};

export const schemaValidateTypeBoolean = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "boolean",
    },
  },
};

export const schemaValidateTypeInteger = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "integer",
    },
  },
};

export const schemaValidateTypeNumber = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "number",
    },
  },
};

export const schemaValidateTypeObject = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "object",
    },
  },
};

export const schemaValidateTypeArray = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "array",
    },
  },
};

export const schemaValidateAnyOf = {
  type: "object",
  required: ["name"],
  properties: {
    name: {
      anyOf: [{ type: "null" }, { type: "string" }],
    },
  },
};

export const schemaValidateFormatInvalid = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      format: "invalid",
    },
  },
};

export const schemaValidateFormatUuid = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      format: "uuid",
    },
  },
};

export const schemaValidateFormatDateTime = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      format: "date-time",
    },
  },
};

export const schemaValidateFormatEmail = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      format: "email",
    },
  },
};

export const schemaValidateFormatXHexColor = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      format: "x-hex-color",
    },
  },
};

export const schemaValidateFormatXBase64 = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      format: "x-base64",
    },
  },
};

export const schemaValidateEnum = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      enum: ["value1", "value2"],
    },
  },
};

export const schemaValidateMinLength = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      minLength: 3,
    },
  },
};

export const schemaValidateMaxLength = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      maxLength: 3,
    },
  },
};

export const schemaValidatePattern = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "string",
      pattern: "^\\d*$",
    },
  },
};

export const schemaValidateMinimumNumberValue = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "number",
      minimum: 15,
    },
  },
};

export const schemaValidateMaximumNumberValue = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "number",
      maximum: 15,
    },
  },
};

export const schemaValidateMinimumIntegerValue = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "integer",
      minimum: 15,
    },
  },
};

export const schemaValidateMaximumIntegerValue = {
  type: "object",
  required: [],
  properties: {
    property: {
      type: "integer",
      maximum: 15,
    },
  },
};

export const schemaValidateSimpleArray = {
  type: "array",
  items: schemaValidateSimple,
};

export const schemaValidateMinItemsArrayValue = {
  type: "array",
  items: schemaValidateSimple,
  minItems: 1,
};
