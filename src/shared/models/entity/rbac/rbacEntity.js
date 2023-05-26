/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";
import ActionEntity from "./actionEntity";
import UiActionEntity from "./uiActionEntity";
import {controlFunctions} from "../../../services/rbacs/controlFunctionEnumeration";

const ENTITY_NAME = "Rbac";
const FOREIGN_MODEL_UI_ACTION = "UiAction";
const FOREIGN_MODEL_ACTION = "Action";

class RbacEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto) {
    super(EntitySchema.validate(
      RbacEntity.ENTITY_NAME,
      dto,
      RbacEntity.getSchema()
    ));

    // Associations
    if (this._props.action) {
      this._action = new ActionEntity(this._props.action);
    }
    delete this._props.action;
    if (this._props.ui_action) {
      this._ui_action = new UiActionEntity(this._props.ui_action);
    }
    delete this._props.ui_action;
  }

  /**
   * Get resource entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": [
        "id",
        "role_id",
        "foreign_model",
        "foreign_id",
        "control_function"
      ],
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "role_id": {
          "type": "string",
          "format": "uuid"
        },
        "foreign_model": {
          "type": "string",
          "enum": [
            RbacEntity.FOREIGN_MODEL_ACTION,
            RbacEntity.FOREIGN_MODEL_UI_ACTION,
          ]
        },
        "foreign_id": {
          "type": "string",
          "format": "uuid"
        },
        "control_function": {
          "type": "string",
          "enum": [
            controlFunctions.ALLOW,
            controlFunctions.DENY
          ]
        },
        // Association
        "action": ActionEntity.getSchema(), // relative action entity
        "ui_action": UiActionEntity.getSchema(), // relative ui action entity
      }
    };
  }

  /*
   * ==================================================
   * Serialization
   * ==================================================
   */

  /**
   * Return a DTO ready to be sent to API
   *
   * @param {object} [contain] optional
   * @returns {object}
   */
  toDto(contain) {
    const result = Object.assign({}, this._props);
    if (!contain) {
      return result;
    }
    if (this._action && contain.action) {
      result.action = this._action.toDto();
    }
    if (this._ui_action && contain.ui_action) {
      result.ui_action = this._ui_action.toDto();
    }

    return result;
  }

  /**
   * Return an update DTO ready to send to the API.
   *
   * @returns {object}
   */
  toUpdateDto() {
    return {
      id: this.id,
      control_function: this.controlFunction
    };
  }

  /**
   * Customizes JSON stringification behavior
   * @returns {*}
   */
  toJSON() {
    return this.toDto(RbacEntity.ALL_CONTAIN_OPTIONS);
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get id
   * @returns {string} uuid
   */
  get id() {
    return this._props.id;
  }

  /**
   * Get role id
   * @returns {string} uuid
   */
  get roleId() {
    return this._props.role_id;
  }

  /**
   * Get the foreign model
   * @returns {string}
   */
  get foreignModel() {
    return this._props.foreign_model;
  }

  /**
   * Get the foreign id
   * @returns {string}
   */
  get foreignId() {
    return this._props.foreign_id;
  }

  /**
   * Get the control function
   * @returns {string}
   */
  get controlFunction() {
    return this._props.control_function;
  }

  /*
   * ==================================================
   * Dynamic properties setters
   * ==================================================
   */
  set controlFunction(controlFunction) {
    EntitySchema.validateProp("control_function", controlFunction, RbacEntity.getSchema().properties.control_function);
    this._props.control_function = controlFunction;
  }

  /*
   * ==================================================
   * Other associated properties methods
   * ==================================================
   */

  /**
   * Get the associated action
   * @returns {(ActionEntity|null)}
   */
  get action() {
    return this._action || null;
  }

  /**
   * Get the associated ui action
   * @returns {(UiActionEntity|null)}
   */
  get uiAction() {
    return this._ui_action || null;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * RbacEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * RbacEntity.ALL_CONTAIN_OPTIONS
   * @returns {object} all contain options that can be used in toDto()
   */
  static get ALL_CONTAIN_OPTIONS() {
    return {action: true, ui_action: true};
  }

  /**
   * RbacEntity.FOREIGN_MODEL_ACTION
   * @returns {string}
   */
  static get FOREIGN_MODEL_ACTION() {
    return FOREIGN_MODEL_ACTION;
  }

  /**
   * RbacEntity.FOREIGN_MODEL_UI_ACTION
   * @returns {string}
   */
  static get FOREIGN_MODEL_UI_ACTION() {
    return FOREIGN_MODEL_UI_ACTION;
  }
}

export default RbacEntity;
