/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import DomainUtil from '../../../../react-extension/lib/Domain/DomainUtil';
import MapObject from '../../../../react-extension/lib/Map/MapObject';

/**
 * Model related to the Self Registration form settings
 */
class SelfRegistrationFormService {
  /**
   * Constructor
   *
   * @param {context} context
   * @public
   */
  constructor(translate) {
    this.translate = translate;
  }

  fields = new Map();

  /**
   * Validate the form.
   * @returns {Promise<boolean>}
   */
  async validate(domains) {
    this.fields = domains;
    // Validate the form inputs.
    const validation = this.validateInputs();
    //Check if we have errors
    return validation;
  }

  /**
   * Validate inputs.
   * @returns {Promise<void>}
   */
  validateInputs() {
    const errors = new Map();
    this.fields.forEach((value, key) => {
      this.validateInput(key, value, errors);
    });
    return errors;
  }

  /**
   * Validate inputs.
   * @params {string} The input name
   * @params {string} The input value
   * @returns {Promise<void>}
   */
  async validateInput(key, value, errors) {
    if (!value.length) {
      errors.set(key, this.translate("A domain is required."));
    } else {
      try {
        DomainUtil.checkDomainValidity(value);
      } catch {
        errors.set(key, this.translate("This should be a valid domain"));
      }
    }
    //Avoid duplicate value
    this.checkDuplicateValue(errors);
  }

  /**
   * Check if we have a duplication.
   * @returns {Promise<void>}
   */
  checkDuplicateValue(inputErrors) {
    this.fields.forEach((value, key) => {
      const hasDuplicate = MapObject.listValues(this.fields).filter(domain => domain === value && domain !== "").length > 1;
      if (hasDuplicate) {
        inputErrors.set(key, this.translate("This domain already exist"));
      }
    });
  }
}

export default  SelfRegistrationFormService;
