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
 * @since         2.13.0
 */
import EntityValidationError from "./entityValidationError";
import Validator from "validator";
import CollectionValidationError from "./collectionValidationError";

class EntitySchema {
  /**
   * Baseline schema validation
   * TODO use json-schema validation tools
   *
   * @param {object} schema
   * @param {string} name
   * @throws TypeError if schema is invalid
   */
  static validateSchema(name, schema) {
    if (!schema) {
      throw new TypeError(`Could not validate entity ${name}. No schema for entity ${name}.`);
    }
    if (!schema.type) {
      throw new TypeError(`Could not validate entity ${name}. Type missing.`);
    }
    if (schema.type === "array") {
      if (!schema.items) {
        throw new TypeError(`Could not validate entity ${name}. Schema error: missing item definition.`);
      }
      return;
    }
    if (schema.type === "object") {
      if (!schema.required || !Array.isArray(schema.required)) {
        throw new TypeError(`Could not validate entity ${name}. Schema error: no required properties.`);
      }
      if (!schema.properties || !Object.keys(schema).length) {
        throw new TypeError(`Could not validate entity ${name}. Schema error: no properties.`);
      }
      const schemaProps = schema.properties;
      for (const propName in schemaProps) {
        // Check type is defined
        if (
          !Object.prototype.hasOwnProperty.call(schemaProps, propName) ||
          (!schemaProps[propName].type && !schemaProps[propName].anyOf)
        ) {
          throw TypeError(`Invalid schema. Type missing for ${propName}...`);
        }
        // In case there is multiple types
        if (schemaProps[propName].anyOf) {
          if (!Array.isArray(schemaProps[propName].anyOf) || !schemaProps[propName].anyOf.length) {
            throw new TypeError(`Invalid schema, prop ${propName} anyOf should be an array`);
          }
          // TODO subcheck anyOf items
        }
      }
    }
  }

  /**
   * Validate
   * TODO use json-schema validation tools
   *
   * @param {string} name of entity
   * @param {object} dto data transfer object
   * @param {object} schema json-schema "like" data transfer object definition
   * @return {object} properties that are listed in the schema
   * @throws ValidationError
   */
  static validate(name, dto, schema) {
    if (!name || !dto || !schema) {
      throw new TypeError(`Could not validate entity ${name}. No data provided.`);
    }

    switch (schema.type) {
      case "object":
        return EntitySchema.validateObject(name, dto, schema);
      case "array":
        return EntitySchema.validateArray(name, dto, schema);
      default:
        throw new TypeError(`Could not validate entity ${name}. Unsupported type.`);
    }
  }

  /**
   * Validate a given array against a given schema
   *
   * @param {string} name of entity
   * @param {object} dto data transfer object
   * @param {object} schema json-schema "like" data transfer object definition
   * @return {object} properties that are listed in the schema
   * @throws ValidationError
   */
  static validateArray(name, dto, schema) {
    let validationError;

    const parsedItems = EntitySchema.validateProp("items", dto, schema);

    if (typeof schema.minItems === "number") {
      if (!EntitySchema.isGreaterThanOrEqual(dto.length, schema.minItems)) {
        validationError = EntitySchema.handleCollectionValidationError(
          "minItems",
          `The items array should contain at least ${schema.minItems} item(s).`,
          validationError,
        );
      }
    }

    if (typeof schema.maxItems === "number") {
      if (!EntitySchema.isLessThanOrEqual(dto.length, schema.maxItems)) {
        validationError = EntitySchema.handleCollectionValidationError(
          "maxItems",
          `The items array should contain at maximum ${schema.maxItems} item(s).`,
          validationError,
        );
      }
    }

    if (validationError) {
      throw validationError;
    }

    return parsedItems;
  }

  /**
   * Validate a given object against a given schema
   *
   * @param {string} name of entity
   * @param {object} dto data transfer object
   * @param {object} schema json-schema "like" data transfer object definition
   * @return {object} properties that are listed in the schema
   * @throws ValidationError
   */
  static validateObject(name, dto, schema) {
    const requiredProps = schema.required;
    const schemaProps = schema.properties;

    const result = {};
    let validationError;

    for (const propName in schemaProps) {
      if (!Object.prototype.hasOwnProperty.call(schemaProps, propName)) {
        continue;
      }

      // check if property is null
      if (dto?.[propName] === null) {
        // the prop is explicitly null, is it explicitly nullable?
        if (schemaProps[propName]?.nullable === true) {
          result[propName] = null;
          continue;
        }
        /*
         * else:
         * the property is null but not marked as nullable. However, it could still be valid if an `anyOf` rule is set
         * with a type `null`. So, we cannot consider for the moment this data as invalid.
         */
      }

      // Check if property is required
      if (requiredProps.includes(propName)) {
        if (!Object.prototype.hasOwnProperty.call(dto, propName)) {
          validationError = EntitySchema.getOrInitEntityValidationError(name, validationError);
          validationError.addError(propName, "required", `The ${propName} is required.`);
          continue;
        }
      } else {
        // if it's not required and not present proceed
        if (!Object.prototype.hasOwnProperty.call(dto, propName)) {
          continue;
        }
      }

      try {
        result[propName] = EntitySchema.validateProp(propName, dto[propName], schemaProps[propName]);
      } catch (error) {
        if (error instanceof EntityValidationError) {
          validationError = EntitySchema.getOrInitEntityValidationError(name, validationError);
          validationError.details[propName] = error.details[propName];
        } else {
          throw error;
        }
      }
    }

    // Throw error if some issues were gathered
    if (validationError) {
      throw validationError;
    }

    return result;
  }

  /**
   * Get or init entity validation error.
   * @param {string} name The name of the entity.
   * @param {EntityValidationError|null} [validationError] The entity validation error to get or init if does not exist.
   * @returns {EntityValidationError}
   */
  static getOrInitEntityValidationError(name, validationError) {
    return validationError || new EntityValidationError(`Could not validate entity ${name}.`);
  }

  /**
   * Validate a given property against a given schema
   *
   * @param {string} propName example: name
   * @param {*} prop example 'my folder'
   * @param {object} propSchema example {type:string, maxLength: 64}
   * @throw {EntityValidationError}
   * @returns {*} prop
   */
  static validateProp(propName, prop, propSchema) {
    // Check for props that can be of multiple types
    if (propSchema.anyOf) {
      EntitySchema.validateAnyOf(propName, prop, propSchema.anyOf);
      return prop;
    }

    // check if prop is null
    if (propSchema.nullable === true && prop === null) {
      return prop;
    }

    // Check if prop validates based on type
    EntitySchema.validatePropType(propName, prop, propSchema);

    // Check if the value is the enumerated list
    if (propSchema.enum) {
      EntitySchema.validatePropEnum(propName, prop, propSchema);
      return prop;
    }

    // Additional rules by types
    switch (propSchema.type) {
      case "string":
        // maxLength, minLength, length, regex, etc.
        EntitySchema.validatePropTypeString(propName, prop, propSchema);
        break;
      /*
       * Note on 'array' - unchecked as not in use beyond array of objects in passbolt
       * Currently it must be done manually when bootstrapping collections
       * example: foldersCollection, permissionsCollection, etc.
       *
       * Note on 'object' - we do not check if property of type 'object' validate (or array of objects, see above)
       * Currently it must be done manually in the entities when bootstrapping associations
       *
       * Note on 'integer' and 'number' - Min / max supported, not needed in passbolt
       */
      case "integer":
      case "number":
        EntitySchema.validatePropTypeNumber(propName, prop, propSchema);
        break;
      case "array":
        EntitySchema.validatePropTypeArray(propName, prop, propSchema);
        break;
      case "object":
      case "boolean":
      case "blob":
      case "null":
        // No additional checks
        break;
      case "x-custom":
        EntitySchema.validatePropCustom(propName, prop, propSchema);
        break;
      default:
        throw new TypeError(`Could not validate property ${propName}. Unsupported prop type ${propSchema.type}`);
    }

    return prop;
  }

  /**
   * Validate a prop of type string
   * Throw an error with the validation details if validation fails
   *
   * @param {string} propName example: name
   * @param {*} prop example 'my folder'
   * @param {object} propSchema example {type:string}
   * @throw {EntityValidationError}
   * @returns void
   */
  static validatePropType(propName, prop, propSchema) {
    if (!EntitySchema.isValidPropType(prop, propSchema.type)) {
      throw EntitySchema.handlePropertyValidationError(
        propName,
        "type",
        `The ${propName} is not a valid ${propSchema.type}.`,
      );
    }
  }

  /**
   * Validate a prop with a custom validator
   * Throw an error with the validation details if validation fails
   *
   * @param {string} propName example: name
   * @param {*} prop the value to validate
   * @param {object} propSchema example {type:string}
   * @throw {EntityValidationError}
   * @returns void
   */
  static validatePropCustom(propName, prop, propSchema) {
    try {
      propSchema.validationCallback(prop);
    } catch (e) {
      throw EntitySchema.handlePropertyValidationError(
        propName,
        "custom",
        `The ${propName} is not valid: ${e.message}`,
      );
    }
  }

  /**
   * Validate a prop of type string
   * Throw an error with the validation details if validation fails
   *
   * @param {string} propName example: name
   * @param {*} prop example 'my folder'
   * @param {object} propSchema example {type:string, maxLength: 64}
   * @throw {EntityValidationError}
   * @returns void
   */
  static validatePropTypeString(propName, prop, propSchema) {
    let validationError;
    if (propSchema.format) {
      if (!EntitySchema.isValidStringFormat(prop, propSchema.format)) {
        validationError = EntitySchema.handlePropertyValidationError(
          propName,
          "format",
          `The ${propName} is not a valid ${propSchema.format}.`,
          validationError,
        );
      }
    }
    if (propSchema.length) {
      if (!EntitySchema.isValidStringLength(prop, propSchema.length, propSchema.length)) {
        validationError = EntitySchema.handlePropertyValidationError(
          propName,
          "length",
          `The ${propName} should be ${propSchema.length} character in length.`,
          validationError,
        );
      }
    }
    if (propSchema.minLength) {
      if (!EntitySchema.isValidStringLength(prop, propSchema.minLength)) {
        validationError = EntitySchema.handlePropertyValidationError(
          propName,
          "minLength",
          `The ${propName} should be ${propSchema.minLength} character in length minimum.`,
          validationError,
        );
      }
    }
    if (propSchema.maxLength) {
      if (!EntitySchema.isValidStringLength(prop, 0, propSchema.maxLength)) {
        validationError = EntitySchema.handlePropertyValidationError(
          propName,
          "maxLength",
          `The ${propName} should be ${propSchema.maxLength} character in length maximum.`,
          validationError,
        );
      }
    }
    if (propSchema.pattern) {
      if (!Validator.matches(prop, propSchema.pattern)) {
        validationError = EntitySchema.handlePropertyValidationError(
          propName,
          "pattern",
          `The ${propName} is not valid.`,
          validationError,
        );
      }
    }
    if (propSchema.custom) {
      if (!propSchema.custom(prop)) {
        validationError = EntitySchema.handlePropertyValidationError(
          propName,
          "custom",
          `The ${propName} is not valid.`,
          validationError,
        );
      }
    }
    if (validationError) {
      throw validationError;
    }
  }

  /**
   * Handle property validation error.
   *   instantiate it if it does not exist yet.
   * @param {string} [propName] The failing property.
   * @param {string} [rule] The failing rule.
   * @param {string} [message] The error message.
   * @param {EntityValidationError|null} [validationError=null] The entity validation error to add the error to,
   *   instantiate it if it does not exist yet.
   * @returns {EntityValidationError}
   */
  static handlePropertyValidationError(propName, rule, message, validationError = null) {
    validationError = validationError || new EntityValidationError(`Could not validate property ${propName}.`);
    validationError.addError(propName, rule, message);

    return validationError;
  }

  /**
   * Handle collection validation error.
   *   instantiate it if it does not exist yet.
   * @param {string} [rule] The failing rule.
   * @param {string} [message] The error message.
   * @param {CollectionValidationError|null} [validationError=null] The collection validation error to add the error to,
   *   instantiate it if it does not exist yet.
   * @returns {CollectionValidationError}
   */
  static handleCollectionValidationError(rule, message, validationError = null) {
    validationError = validationError || new CollectionValidationError(`Could not validate collection.`);
    validationError.addCollectionValidationError(rule, message);

    return validationError;
  }

  /**
   * Validate a prop of type number
   * Throw an error with the validation details if validation fails
   *
   * @param {string} propName example: name
   * @param {*} prop example 42
   * @param {object} propSchema example {type: number, minimum: 64, maximum: 128}
   * @throw {EntityValidationError}
   * @returns void
   */
  static validatePropTypeNumber(propName, prop, propSchema) {
    let validationError;
    if (typeof propSchema.minimum === "number") {
      if (!EntitySchema.isGreaterThanOrEqual(prop, propSchema.minimum)) {
        validationError = EntitySchema.handlePropertyValidationError(
          propName,
          "minimum",
          `The ${propName} should be greater or equal to ${propSchema.minimum}.`,
          validationError,
        );
      }
    }
    if (typeof propSchema.maximum === "number") {
      if (!EntitySchema.isLesserThanOrEqual(prop, propSchema.maximum)) {
        validationError = EntitySchema.handlePropertyValidationError(
          propName,
          "maximum",
          `The ${propName} should be lesser or equal to ${propSchema.maximum}.`,
          validationError,
        );
      }
    }

    if (validationError) {
      throw validationError;
    }
  }

  /**
   * Validate a prop of type array
   * Throw an error with the validation details if validation fails
   *
   * @param {string} propName example: name
   * @param {[*]} prop example [*]
   * @param {object} propSchema example {type: array, items: {type:string, maxLength: 64}}
   * @throw {EntityValidationError}
   * @returns void
   */
  static validatePropTypeArray(propName, prop, propSchema) {
    let validationError;

    // Do not validate array items if no schema items schema defined.
    if (!propSchema?.items || !(typeof propSchema.items === "object")) {
      return;
    }

    for (let index = 0; index < prop.length; index++) {
      const propItemName = `${propName}.${index}`;
      try {
        this.validateProp(propItemName, prop[index], propSchema.items);
      } catch (error) {
        if (error instanceof EntityValidationError) {
          validationError = EntitySchema.getOrInitEntityValidationError(propName, validationError);
          const errorDetails = error.details[propItemName];
          validationError.details[propName] = { ...validationError.details[propName], [index]: errorDetails };
        } else {
          throw error;
        }
      }
    }
    if (validationError) {
      throw validationError;
    }
  }

  /**
   * Validate a prop of any type with possible values define in enum
   * Throw an error with the validation details if validation fails
   *
   * @param {string} propName example: role
   * @param {*} prop example 'admin'
   * @param {object} propSchema example {type: string, enum: ['admin', 'user']}
   * @throw {EntityValidationError}
   * @returns void
   */
  static validatePropEnum(propName, prop, propSchema) {
    if (!EntitySchema.isPropInEnum(prop, propSchema.enum)) {
      const validationError = new EntityValidationError(`Could not validate property ${propName}.`);
      validationError.addError(propName, "enum", `The ${propName} value is not included in the supported list.`);
      throw validationError;
    }
  }

  /**
   * Validate a given property against multiple possible types
   *
   * @param {string} propName example: name
   * @param {*} prop example 'my folder'
   * @param {array} anyOf example [{type:string, maxLength: 64}, {type:null}]
   * @throw {EntityValidationError}
   * @returns {*} prop
   */
  static validateAnyOf(propName, prop, anyOf) {
    for (let i = 0; i < anyOf.length; i++) {
      try {
        EntitySchema.validateProp(propName, prop, anyOf[i]);
        return;
      } catch {
        // All must fail...
      }
    }
    const validationError = new EntityValidationError(`Could not validate property ${propName}.`);
    validationError.addError(propName, "type", `The ${propName} does not match any of the supported types.`);
    throw validationError;
  }

  /**
   * Check if prop validates based on type
   *
   * @param {*} prop
   * @param {string} type
   * @returns {boolean}
   * @throws TypeError if type is not supported
   */
  static isValidPropType(prop, type) {
    if (Array.isArray(type)) {
      throw new TypeError("EntitySchema isValidPropType multiple types are not supported.");
    }
    if (typeof type !== "string") {
      throw new TypeError("EntitySchema isValidPropType type is invalid.");
    }
    switch (type) {
      case "null":
        return prop === null;
      case "boolean":
        return typeof prop === "boolean";
      case "string":
        return typeof prop === "string";
      case "integer":
        return Number.isInteger(prop);
      case "number":
        return typeof prop === "number";
      case "object":
        return typeof prop === "object";
      case "array":
        return Array.isArray(prop);
      case "blob":
        return prop instanceof Blob;
      case "x-custom":
        return true;
      default:
        throw new TypeError("EntitySchema validation type not supported.");
    }
  }

  /**
   * Check if prop validates based on format
   *
   * @param {*} prop
   * @param {string} format
   * @returns {boolean}
   * @throws TypeError if format is not supported
   */
  static isValidStringFormat(prop, format) {
    if (typeof format !== "string") {
      throw new TypeError("EntitySchema validPropFormat format is invalid.");
    }
    switch (format) {
      case "uuid":
        return Validator.isUUID(prop);
      case "email":
      case "idn-email":
        return Validator.isEmail(prop);
      case "date-time":
        return Validator.isISO8601(prop);
      /*
       * case 'ipv4':
       *   return Validator.isIP(prop, '4');
       * case 'ipv6':
       *   return Validator.isIP(prop, '6');
       */

      /*
       * Not in json-schema but needed by passbolt
       * cowboy style section 🤠
       */
      case "x-hex-color":
        return Validator.isHexColor(prop);
      case "x-base64":
        return Validator.isBase64(prop);

      // Not supported - Not needed
      default:
        throw new TypeError(`EntitySchema string validation format ${format} is not supported.`);
    }
  }

  /**
   * Validate if a string is of a given length
   * @param {string} str
   * @param {int} min
   * @param {int} max
   * @returns {boolean|*}
   */
  static isValidStringLength(str, min, max) {
    min = min || 0;
    return Validator.isLength(str, min, max);
  }

  /**
   * Check if the value is the enumerated list
   *
   * @param {*} prop
   * @param {array<string>} enumList
   * @returns {boolean}
   * @throws TypeError if format is not supported
   */
  static isPropInEnum(prop, enumList) {
    if (!enumList || !Array.isArray(enumList) || !enumList.length) {
      throw new TypeError(`EntitySchema enum schema cannot be empty.`);
    }
    return enumList.includes(prop);
  }

  /**
   * Check if the value is greater than the given value
   *
   * @param {number} prop
   * @param {number} gte
   * @returns {boolean}
   */
  static isGreaterThanOrEqual(prop, gte) {
    return prop >= gte;
  }

  /**
   * Check if the value is less than the given value
   *
   * @param {number} prop
   * @param {number} lte
   * @returns {boolean}
   */
  static isLessThanOrEqual(prop, lte) {
    return prop <= lte;
  }

  /**
   * Check if the value is lesser than the given value
   *
   * @param {number} prop
   * @param {number} lte
   * @returns {boolean}
   */
  static isLesserThanOrEqual(prop, lte) {
    return prop <= lte;
  }
}

export default EntitySchema;
