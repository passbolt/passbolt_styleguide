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
 * @since         4.5.0
 */

import EntityValidationError from "../entity/abstract/entityValidationError";
import EntitySchema from "../entity/abstract/entitySchema";
import { DateTime } from "luxon";
import { formatDateForApi } from "../../utils/dateUtils";

const DEFAULT_EXPIRY_PERIOD = 90;
const INPUT_DATE_FORMAT = "yyyy-MM-dd";

export const PasswordExpiryOptionEnum = {
  AUTOMATIC: "automatic",
  MANUAL: "manual",
  NEVER: "never",
};

/**
 * Model related to the user passphrase policies use only with the admin UI
 */
class PasswordExpiryDialogViewModel {
  /**
   * Constructor
   * @param {PasswordExpiryDialogDto} settings
   */
  constructor(settings = {}) {
    this.passwordExpiryDurationInDay = settings.passwordExpiryDurationInDay;
    this.passwordExpiryDate = settings.passwordExpiryDate;
    this.passwordExpiryOption = settings.passwordExpiryOption;
  }

  /**
   * Get validation schema of PasswordExpiryDialogViewModel
   * @returns {Object} schema
   */
  static getSchema() {
    const schema = {
      type: "object",
      required: ["passwordExpiryDurationInDay", "passwordExpiryDate", "passwordExpiryOption"],
      properties: {
        passwordExpiryDurationInDay: {
          type: "integer",
          maximum: 999,
          minimum: -99,
        },
        passwordExpiryDate: {
          type: "string",
          pattern: /\d{4}-\d{2}-\d{2}/,
        },
        passwordExpiryOption: {
          type: "string",
          enum: PasswordExpiryOptionEnum,
        },
      },
    };

    return schema;
  }

  /**
   * Instantiate a new ViewModel based on the dto of an Entity
   * @param {object} entityDto
   * @returns {PasswordExpiryDialogViewModel}
   */
  static fromEntityDto(entityDto) {
    const passwordExpiryDurationInDay = entityDto?.default_expiry_period || DEFAULT_EXPIRY_PERIOD;
    const passwordExpiryDate = DateTime.utc().plus({ days: passwordExpiryDurationInDay }).toFormat(INPUT_DATE_FORMAT);

    const data = {
      passwordExpiryDurationInDay: passwordExpiryDurationInDay,
      passwordExpiryDate: passwordExpiryDate,
      passwordExpiryOption: PasswordExpiryOptionEnum.AUTOMATIC,
    };

    return new PasswordExpiryDialogViewModel(data);
  }

  /**
   * Returns a DTO.
   * @returns {object}
   */
  toDto() {
    return {
      passwordExpiryDurationInDay: this.passwordExpiryDurationInDay,
      passwordExpiryDate: this.passwordExpiryDate,
      passwordExpiryOption: this.passwordExpiryOption,
    };
  }

  /**
   * Returns the expiration date based on the selected configuration.
   * @returns {string|null}
   * @private
   */
  getExpiryDateToApply() {
    let date;
    switch (this.passwordExpiryOption) {
      case PasswordExpiryOptionEnum.AUTOMATIC: {
        date = DateTime.utc().plus({ days: this.passwordExpiryDurationInDay });
        break;
      }
      case PasswordExpiryOptionEnum.MANUAL: {
        date = DateTime.fromFormat(this.passwordExpiryDate, INPUT_DATE_FORMAT, { zone: "UTC" });
        break;
      }
      case PasswordExpiryOptionEnum.NEVER: {
        date = null;
        break;
      }
      default: {
        throw new Error(`Unsuppored Password Expiry dialog option '${this.passwordExpiryOption}'`);
      }
    }
    return formatDateForApi(date);
  }

  /**
   * Map a given list to a list of PasswordExpiryDto
   * @param {Array<Resource>} resourceList
   */
  mapResourcesToPasswordExpiryDto(resourceList) {
    const expiryDate = this.getExpiryDateToApply();
    return resourceList.map((resource) => ({
      id: resource.id,
      expired: expiryDate,
    }));
  }

  /**
   * Validates the current object state
   * @returns {EntityValidationError}
   */
  validate() {
    switch (this.passwordExpiryOption) {
      case PasswordExpiryOptionEnum.AUTOMATIC: {
        return this.validatePasswordExpiryDurationInDay();
      }
      case PasswordExpiryOptionEnum.MANUAL: {
        return this.validatePasswordExpiryDate();
      }
    }
    return new EntityValidationError();
  }

  /**
   * Validates the password expiry duration in day field
   * @returns {EntityValidationError}
   * @throws {Error} if an error happens and that is not an EntityValidationError
   * @private
   */
  validatePasswordExpiryDurationInDay() {
    const schema = PasswordExpiryDialogViewModel.getSchema();
    try {
      EntitySchema.validateProp(
        "passwordExpiryDurationInDay",
        this.passwordExpiryDurationInDay,
        schema.properties.passwordExpiryDurationInDay,
      );
    } catch (e) {
      if (!(e instanceof EntityValidationError)) {
        throw e;
      }
      return e;
    }
    return new EntityValidationError();
  }

  /**
   * Validates the password expiry date field
   * @returns {EntityValidationError}
   * @throws {Error} if an error happens and that is not an EntityValidationError
   * @private
   */
  validatePasswordExpiryDate() {
    const schema = PasswordExpiryDialogViewModel.getSchema();
    try {
      EntitySchema.validateProp("passwordExpiryDate", this.passwordExpiryDate, schema.properties.passwordExpiryDate);
    } catch (e) {
      if (!(e instanceof EntityValidationError)) {
        throw e;
      }
      return e;
    }
    return new EntityValidationError();
  }
}

export default PasswordExpiryDialogViewModel;
