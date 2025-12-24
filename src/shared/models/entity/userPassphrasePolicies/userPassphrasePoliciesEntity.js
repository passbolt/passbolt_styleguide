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
 * @since         4.3.0
 */

import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";

const ENTITY_NAME = "UserPassphrasePolicies";

class UserPassphrasePoliciesEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(userPassphrasePoliciesDto, options = {}) {
    super(
      EntitySchema.validate(
        UserPassphrasePoliciesEntity.ENTITY_NAME,
        userPassphrasePoliciesDto,
        UserPassphrasePoliciesEntity.getSchema(),
      ),
      options,
    );
  }

  /**
   * Get user passphrase policies entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: ["entropy_minimum", "external_dictionary_check"],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        entropy_minimum: {
          type: "integer",
          minimum: 50,
          maximum: 224,
        },
        external_dictionary_check: {
          type: "boolean",
        },
        created: {
          type: "string",
          format: "date-time",
        },
        created_by: {
          type: "string",
          format: "uuid",
        },
        modified: {
          type: "string",
          format: "date-time",
        },
        modified_by: {
          type: "string",
          format: "uuid",
        },
      },
    };
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  /**
   * UserPassphrasePoliciesEntity.ENTITY_NAME
   * @returns {string}
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /**
   * Return the default settings overriden with the given data if any.
   * @param {UserPassphrasePoliciesDto} data the data to override the entity with
   * @returns {UserPassphrasePoliciesEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      entropy_minimum: 50,
      external_dictionary_check: true,
    };

    const dto = Object.assign(defaultData, data);
    return new UserPassphrasePoliciesEntity(dto);
  }
}

export default UserPassphrasePoliciesEntity;
