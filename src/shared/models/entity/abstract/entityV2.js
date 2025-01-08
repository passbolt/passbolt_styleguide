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

const SCALAR_PROPERTY_TYPES = ["string", "number", "integer", "boolean"];

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
      const error = this.validate({
        schema: options?.schema,
        validateBuildRules: options?.validateBuildRules
      });
      // Entity constructor always throws validation error.
      if (error) {
        throw error;
      }
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
   * @param {object} [options.validateBuildRules] Options to pass to validate build rules function
   */
  validate(options = {}) {
    try {
      this.validateSchema(options?.schema);
      this.validateBuildRules(options?.validateBuildRules);
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
   * @param {object} [schema] dynamic schema to be used for data validation instead of the cachedSchema.
   * @throws {EntityValidationError} If the dto does not validate the entity schema.
   */
  validateSchema(schema = null) {
    this._props = EntitySchema.validate(
      this.constructor.name,
      this._props,
      schema ?? this.cachedSchema
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
   * Note: This function sets only scalar properties. Not supported:
   *   - associated entities;
   *   - associated collections;
   *   - nested object;
   *   - nested array;
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
    const schemaProperties = this.constructor.getSchema().properties[propName];
    if (!schemaProperties) {
      throw new Error(`The property "${propName}" has no schema definition.`);
    }
    if (!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type)) {
      throw new Error("The property \"associated_entity\" should reference scalar properties only.");
    }
    if (validate) {
      EntitySchema.validateProp(propName, value, schemaProperties);
    }
    this._props[propName] = value;
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
    for (const prop of Object.keys(this._props)) {
      const schemaProperties = this.constructor.getSchema().properties[prop];
      if (!SCALAR_PROPERTY_TYPES.includes(schemaProperties?.type)) {
        continue;
      }
      const comparedPropValue = compareEntity.get(prop);
      if (this.get(prop) !== comparedPropValue) {
        diff[prop] = comparedPropValue;
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
}

export default EntityV2;
