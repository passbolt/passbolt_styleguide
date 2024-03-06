import Entity from "../../abstract/entity";
import EntitySchema from "../../abstract/entitySchema";

const ENTITY_NAME = "database";

class DatabaseEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(
      DatabaseEntity.ENTITY_NAME,
      dto,
      DatabaseEntity.getSchema()
    ), options);
  }

  /**
   * Get database entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": ["tablesCount", "info", "connect", "supportedBackend", "defaultContent"],
      "properties": {
        "tablesCount": {
          "type": "boolean"
        },
        "info": {
          "type": "object",
          "required": ["tablesCount"],
          "properties": {
            "tablesCount": {
              "type": "number"
            }
          }
        },
        "connect": {
          "type": "boolean"
        },
        "supportedBackend": {
          "type": "boolean"
        },
        "defaultContent": {
          "type": "boolean"
        }
      }
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get tablesCount() {
    return this._props.tablesCount;
  }

  get info() {
    return this._props.info;
  }

  get connect() {
    return this._props.connect;
  }

  get supportedBackend() {
    return this._props.supportedBackend;
  }

  get defaultContent() {
    return this._props.defaultContent;
  }

  /*
   *==================================================*
   * Static properties getters
   *==================================================*
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default DatabaseEntity;
