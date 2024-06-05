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
   *
   * Additionally to the Entity, the EntityV2 will:
   * - Validate the entity schema.
   * - Validate the entity build rules.
   *
   * @throws {EntityValidationError} If the dto does not validate the entity schema.
   * @throws {EntityValidationError} If the dto does not validate the entity build rules.
   */
  constructor(dtos = {}, options = {}) {
    // Note: Entity V1 will clone the dtos into the instance _props property.
    super(dtos, options);
    this.marshall();
    const validate = options?.validate ?? true;
    if (validate) {
      this.validateSchema();
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

  /*
   * ==================================================
   * Validation
   * ==================================================
   */

  /**
   * Validate the entity schema.
   * Note: the entity schema will be created on first call and cached into a class static property.
   * @private
   */
  validateSchema() {
    this._props = EntitySchema.validate(
      this.constructor.name,
      this._props,
      this.cachedSchema
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
   */
  // eslint-disable-next-line no-unused-vars
  validateBuildRules(options = {}) {
    // Override this method to add entity validation build rules.
  }
}

export default EntityV2;
