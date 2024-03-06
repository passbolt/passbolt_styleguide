import Entity from "../../abstract/entity";
import EntitySchema from "../../abstract/entitySchema";

const ENTITY_NAME = "ssl";

class SslEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(
      SslEntity.ENTITY_NAME,
      dto,
      SslEntity.getSchema()
    ), options);
  }

  /**
   * Get ssl entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      "required": ["peerValid", "hostValid", "notSelfSigned"],
      "properties": {
        "peerValid": {
          "type": "boolean"
        },
        "hostValid": {
          "type": "boolean"
        },
        "notSelfSigned": {
          "type": "boolean"
        },
        "info": {
          "type": "string"
        }
      }
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get peerValid() {
    return this._props.peerValid;
  }

  get hostValid() {
    return this._props.hostValid;
  }

  get notSelfSigned() {
    return this._props.notSelfSigned;
  }

  get info() {
    return this._props.info;
  }

  /*
   * ==================================================*
   * Static properties getters
   *==================================================*
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default SslEntity;
