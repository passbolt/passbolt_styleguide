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
 * @since         4.9.0
 */
import EntitySchema from "./entitySchema";
import Entity from "./entity";
import assertString from "validator/es/lib/util/assertString";
import EntityValidationError from "./entityValidationError";
import {snakeCaseToCamelCase} from "../../../utils/stringUtils";

const SCALAR_PROPERTY_TYPES = ["string", "number", "integer", "boolean"];
const ARRAY_PROPERTY_TYPE = "array";

class EntityV2 extends Entity {
  /**
   * The entity cached schemas referenced by entity class name.
   * The key will represent the entity class name while the value will be the schema definition object.
   * @type {object}
   * @private
   */
  static _cachedSchema = {};

  /**
   * @inheritDoc
   * @param {boolean} [options.validate=true] validate the given props against the entity schema and the build rules.
   *   Disabling validation should be done with caution, considering its consequences:
   *     - The data will not be checked against the schema or the build rules.
   *     - The data will not be trimmed, and properties not defined in the schema will remain in _props.
   *     - Triggering validation later through validate, validateSchema, or validateBuildRules will not validate associated entities and collections.
   * @param {object} [options.schema] dynamic schema to be used for data validation.
   * @param {object} [options.validateBuildRules] Options to pass to validate build rules function @see EntityV2::validateBuildRules
   *
   * Additionally to the Entity, the EntityV2 will:
   * - Validate the entity schema.
   * - Validate the entity build rules.
   *
   * @throws {EntityValidationError} If the dto does not validate the entity schema.
   * @throws {EntityValidationError} If the dto does not validate the entity build rules.
   */
  constructor(dtos = {}, options = {}) {
    const validate = options?.validate ?? true;

    // Note: Entity V1 will clone the dtos into the instance _props property.
    super(dtos, options);
    this.marshall();
    if (validate) {
      this.validateSchema({schema: options?.schema, skipSchemaAssociationValidation: options?.skipSchemaAssociationValidation});
    }
    this.createAssociations(options);
    if (validate) {
      this.validateBuildRules(options?.validateBuildRules);
    }
  }

  /**
   * Marshall the entity props.
   * Caution, the marshalling happens before the validation.
   * @protected
   */
  marshall() {
    // Override this method to marshall the entity props prior to validation.
  }

  /**
   * Validate the entity: its schema and its build rules.
   * @param {object} [options] Options
   * @param {object} [options.schema] dynamic schema to be used for data validation.
   * @param {object} [options.skipSchemaAssociationValidation] skip association validation schema
   * @param {object} [options.validateBuildRules] Options to pass to validate build rules function
   */
  validate(options = {}) {
    try {
      this.validateSchema(
        {schema: options?.schema, skipSchemaAssociationValidation: options?.skipSchemaAssociationValidation}
      );
      this.validateBuildRules(options?.validateBuildRules);
      this.validateAssociations(options);
    } catch (error) {
      if (!(error instanceof EntityValidationError)) {
        throw error;
      }
      return error;
    }

    return null;
  }

  /**
   * Validate the entity schema.
   * Note: the entity schema will be created on first call and cached into a class static property.
   * Note: it does not validate the schema of associated entities or collections, it remains the responsibility of the constructor.
   * @param {object} [options.schema] dynamic schema to be used for data validation.
   * @param {object} [options.skipSchemaAssociationValidation] skip association validation schema
   * @throws {EntityValidationError} If the dto does not validate the entity schema.1
   */
  validateSchema(option = null) {
    let schema = option?.schema ?? this.cachedSchema;
    if (option?.skipSchemaAssociationValidation) {
      schema = {...schema};
      const requiredAssociations = Object.keys(this.constructor.associations);
      const required = schema.required.filter(requiredSchema => !requiredAssociations.includes(requiredSchema));
      schema.required = required;
    }
    this._props = EntitySchema.validate(
      this.constructor.name,
      this._props,
      schema
    );
  }

  /**
   * Get the entity cached schema
   * Note: The getter can only be accessed only from an instance context as it uses the instance scope.
   * @returns {object}
   * @private
   */
  get cachedSchema() {
    if (!this.constructor._cachedSchema[this.constructor.name]) {
      this.constructor._cachedSchema[this.constructor.name] = this.constructor.getSchema();
    }

    return this.constructor._cachedSchema[this.constructor.name];
  }

  /**
   * Return the schema representing this entity.
   * Override this method to define the entity schema.
   * @return {object}
   * @abstract
   */
  static getSchema() {
    throw new Error("The entity class should declare its schema.");
  }

  /**
   * Validate the item build rules.
   * It is used to validate other rules that are not covered by the schema definition, by instance to check if
   * a password and its confirmation are identical.
   * @param {object} [options] Options.
   * @throws {EntityValidationError} If the dto does not validate the entity build rules.
   */
  // eslint-disable-next-line no-unused-vars
  validateBuildRules(options = {}) {
    // Override this method to add entity validation build rules.
  }

  /**
   * create the association entity: its schema and its build rules.
   * @param {object} [options] Options
   */
  createAssociations(options = {}) {
    if (Object.keys(this.constructor.associations).length > 0) {
      const validationErrors = new EntityValidationError();
      for (const [associationProp, associationEntityClass] of Object.entries(this.constructor.associations)) {
        try {
          if (this._props[associationProp]) {
            // Get the association name and replace '_[a-z]' into [A-Z]  (example: associated_entity_v2 become associatedEntityV2)
            const associationPropName = snakeCaseToCamelCase(associationProp);
            this[`_${associationPropName}`] = new associationEntityClass(this._props[associationProp], {...options, clone: false});
            delete this._props[associationProp];
          }
        } catch (error) {
          if (error instanceof EntityValidationError) {
            validationErrors.addAssociationError(associationProp, error);
          } else {
            throw error;
          }
        }
      }
      // Throw error if some issues were gathered
      if (validationErrors.hasErrors()) {
        throw validationErrors;
      }
    }
  }

  /**
   * Return the associations contained in the entity.
   * Override this method to define the associations.
   * @return {object}
   */
  static get associations() {
    return {};
  }

  /**
   * Return a property value.
   *
   * Note: This function returns only scalar properties. Not supported:
   *   - associated entities;
   *   - associated collections;
   *   - nested object;
   *   - nested array;
   *
   * @param {string} propName The property name.
   * @returns {*}
   * @throws {TypeError} If the given property name is not a string.
   * @throws {Error} If the property has no schema definition.
   * @throws {Error} If the property references an association.
   */
  get(propName) {
    assertString(propName);
    const schemaProperties = this.constructor.getSchema().properties[propName];
    if (!schemaProperties) {
      throw new Error(`The property "${propName}" has no schema definition.`);
    }
    if (!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type)) {
      throw new Error("The property \"associated_entity\" should reference scalar properties only.");
    }
    return this._props[propName];
  }

  /**
   * Set a property value. The new property value will be validated against the entity schema unless validation is
   * explicitly disabled in the options.
   *
   * Note: the build rules are not enforced by this assignment and should be handled by the caller.
   * Note: This function sets scalar and association properties. Not supported:
   *   - nested object;
   *
   * @param {string} propName The property name.
   * @param {*} value The value to set.
   * @param {object} [options] Options.
   * @param {boolean} [options.validate=true] validate the given props against the entity schema and the build rules.
   * @throws {Error} If the property has no schema definition.
   * @throws {Error} If the property does not validate the entity schema.
   * @throws {EntityValidationError} If the property does not validate the entity schema.
   */
  set(propName, value, options = {}) {
    assertString(propName);

    const validate = options?.validate ?? true;
    if (this.isAssociation(propName)) {
      this.setAssociation(propName, value, options);
    } else {
      const propNameSplit = propName.split(".");
      const basePropName = propNameSplit[0];

      const schemaProperties = this.constructor.getSchema().properties[basePropName];
      if (!schemaProperties) {
        throw new Error(`The property "${basePropName}" has no schema definition.`);
      }

      if (schemaProperties?.type === ARRAY_PROPERTY_TYPE) {
        this.setArrayProp(propName, value, options);
      } else {
        if (!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type)) {
          throw new Error("The property \"associated_entity\" should reference scalar properties only.");
        }
        if (validate) {
          EntitySchema.validateProp(basePropName, value, schemaProperties);
        }
        this._props[basePropName] = value;
      }
    }
  }
  /**
   * Set an array property value. The new array value will be validated against the entity schema unless validation is
   * explicitly disabled in the options.
   *
   * @param {string} propName The property name.
   * @param {*} value The value to set.
   * @param {object} [options] Options.
   * @throws {Error} If the property does not respect the index format.
   * @throws {Error} If the property does not include an index.
   * @throws {Error} If the property does not validate the entity schema.
   * @throws {EntityValidationError} If the property does not validate the entity schema.
   * @private
   */
  setArrayProp(propName, value, options) {
    assertString(propName); // Assert propName is a string
    const propNameSplit = propName.split(".");
    const basePropName = propNameSplit[0];
    let index = null;
    const schemaProperties = this.constructor.getSchema().properties[basePropName];
    const validate = options?.validate ?? true;

    if (propNameSplit.length === 2) {
      //Validate array index format
      const arrayIndexMatch = propNameSplit[1].match(/^(\d+)$/);
      if (!arrayIndexMatch) {
        throw new Error(`The property "${propNameSplit[0]}" has an invalid index format. Expected format: digits.`);
      }
      index = parseInt(arrayIndexMatch[1], 10);
    } else {
      throw new Error(`The property "${propNameSplit[0]}" has no index passed.`);
    }

    if (!SCALAR_PROPERTY_TYPES.includes(schemaProperties.items.type)) {
      throw new Error("The property \"associated_entity\" with array type should reference scalar properties only.");
    }
    if (validate) {
      EntitySchema.validateProp(basePropName, value, schemaProperties.items);
    }
    if (!this._props[basePropName]) {
      this._props[basePropName] = [];
    }
    this._props[basePropName][index] = value;
  }

  /**
   * Set an association or an association property value. The new association value will be validated against the entity schema unless validation is
   * explicitly disabled in the options.
   *
   * Note: If the value is an instance of entity type, no clone or validation is applied.
   * Note: the build rules are not enforced by this assignment and should be handled by the caller.
   * Note: This function sets association and association properties. Not supported:
   *   - nested object;
   *   - nested array;
   *
   * @param {string} propName The property name.
   * @param {*} value The value to set.
   * @param {object} [options] Options.
   * @throws {Error} If the property has no schema definition.
   * @throws {Error} If the property does not validate the entity schema.
   * @throws {EntityValidationError} If the property does not validate the entity schema.
   * @private
   */
  setAssociation(propName, value, options = {}) {
    assertString(propName); // Assert propName is a string
    // Assert is association
    if (this.isAssociation(propName)) {
      // Get the prop name split in case of association prop name (example: associationPropName.propName)
      const propNameSplit = propName.split(".");
      // Get the association name and replace '_[a-z]' into [A-Z]  (example: associated_entity_v2 become associatedEntityV2)
      const associationPropName = snakeCaseToCamelCase(propNameSplit[0]);
      // Check if the propName  is a property of the association
      const isPropertyAssociation = propNameSplit.length > 1;
      if (isPropertyAssociation) {
        if (!this[`_${associationPropName}`]) {
          // Instantiate a new empty association entity with no validation to set the value after
          this[`_${associationPropName}`] = new this.constructor.associations[propNameSplit[0]]({}, {validate: false});
        }
        const concatenatedPropName = propNameSplit.slice(1).join('.');
        // loop to set the association prop name
        this[`_${associationPropName}`].set(concatenatedPropName, value, options);
      } else {
        if (value instanceof this.constructor.associations[propName]) {
          // Set the association
          this[`_${associationPropName}`] = value;
        } else {
          // Instantiate a new association entity with the value
          this[`_${associationPropName}`] = new this.constructor.associations[propName](value, options);
        }
      }
    }
  }

  /**
   * Validate the entity associations
   * @param {object} [options] Options
   */
  validateAssociations(options = {}) {
    const validationErrors = new EntityValidationError();

    if (Object.keys(this.constructor.associations).length > 0) {
      Object.keys(this.constructor.associations).forEach(propsName => {
        const propsNameToCamelCase = snakeCaseToCamelCase(propsName);
        if (this[`_${propsNameToCamelCase}`]) {
          const association = this[propsNameToCamelCase];
          const errors = association.validate(options);
          if (errors) {
            validationErrors.addAssociationError(propsName, errors);
          }
        }
      });
    }

    // Throw error if some issues were gathered
    if (validationErrors.hasErrors()) {
      throw validationErrors;
    }
  }

  /**
   * Compares the properties of two entities to identify differences.
   *
   * Note: This function compares only scalar properties. Not supported:
   *   - associated entities;
   *   - associated collections;
   *   - nested object;
   *   - nested array;
   *
   * @param {EntityV2} compareEntity The entity to compare to.
   * @return {Object} Returns an object containing properties from the current entity that differ from those of the entity being compared.
   * The values in the returned object are taken from the compared entity.
   */
  diffProps(compareEntity) {
    if (!(compareEntity instanceof EntityV2)) {
      throw new TypeError("The property \"compareEntity\" should be of \"EntityV2\" type.");
    }

    const diff = {};
    const schema = this.constructor.getSchema();
    const propertiesNamesToCompare = Object.keys(schema.properties)
      .filter(propertyName => SCALAR_PROPERTY_TYPES.includes(schema.properties[propertyName].type));

    for (const propertyName of propertiesNamesToCompare) {
      const propValue = this.get(propertyName);
      const comparedPropValue = compareEntity.get(propertyName);
      if (propValue !== comparedPropValue) {
        diff[propertyName] = comparedPropValue;
      }
    }

    return diff;
  }

  /**
   * Determines if the current entity has different properties compared to another entity.
   * This function checks only directly associated properties and does not include comparisons of nested or associated entities.
   * @param {EntityV2} compareEntity The entity to compare to.
   * @return {boolean}
   */
  hasDiffProps(compareEntity) {
    const diff = this.diffProps(compareEntity);
    return Object.keys(diff).length > 0;
  }

  /**
   * Determine if the prop name is part of an association
   * @param {string} propName The property name.
   * @returns {boolean}
   */
  isAssociation(propName) {
    // Get the main prop name split in case of association prop name (example: associationPropName.propName)
    const mainPropName = propName.split(".")[0];
    return Boolean(this.constructor.associations?.[mainPropName]);
  }
}

export default EntityV2;
