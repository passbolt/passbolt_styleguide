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

import XRegExp from 'xregexp';

/**
 * Model related to the User Directory form settings
 */
class UserDirectoryFormService {
  /**
   * Constructor
   *
   * @param {context} context
   * @public
   */
  constructor(context, translate) {
    this.context = context;
    this.translate = translate;
  }

  /**
   * getInstance for singleton pattern
   * @param {context} context
   * @public
   */
  static getInstance(context, translate) {
    if (!this.instance) {
      this.instance = new UserDirectoryFormService(context, translate);
    }
    return this.instance;
  }

  /**
   * killInstance singleton
   * @param {context} context
   * @public
   */
  static killInstance() {
    this.instance = null;
  }

  /**
   * Validate the form.
   * @returns {boolean}
   */
  validate() {
    // Validate the form inputs.
    const validation = {
      hostError: this.validateHostInput(),
      portError: this.validatePortInput(),
      domainError: this.validateDomainInput(),
      fieldsMappingAdUserUsernameError: this.validateFieldsMappingAdUserUsernameInput(),
      fieldsMappingOpenLdapGroupUsersError: this.validateOpenLdapFieldsMappingGroupUsersInput(),
    };

    this.context.setErrors(validation);
    //Check if we have errors
    return Object.values(validation).filter(x => x !== null).length === 0;
  }

  /**
   * Validate the host input.
   * @returns {string|null} the error message if any or null
   * @private
   */
  validateHostInput() {
    const settings = this.context.getSettings();
    const host = settings.host?.trim();
    const hostError = host.length ? null : this.translate("A host is required.");
    return hostError;
  }

  /**
   * Validate the port input.
   * @returns {string|null} the error message if any or null
   * @private
   */
  validatePortInput() {
    const settings = this.context.getSettings();
    let portError = null;
    const port = settings.port.trim();
    if (!port.length) {
      portError = this.translate("A port is required.");
    } else if (!XRegExp("^[0-9]+").test(port)) {
      portError = this.translate("Only numeric characters allowed.");
    }
    return portError;
  }

  /**
   * Validate the field mapping's username input for active directory.
   * @returns {string|null} the error message if any or null
   * @private
   */
  validateFieldsMappingAdUserUsernameInput() {
    const settings = this.context.getSettings();
    const value = settings.fieldsMapping.ad.user.username;
    let fieldsMappingAdUserUsernameError = null;
    if (!value || value.trim() === "") {
      fieldsMappingAdUserUsernameError = this.translate("The user username field mapping cannot be empty");
    } else if (value.length > 128) {
      fieldsMappingAdUserUsernameError = this.translate("The user username field mapping cannot exceed 128 characters.");
    }

    return fieldsMappingAdUserUsernameError;
  }

  /**
   * Validate the field mapping's username input for active directory.
   * @returns {string|null} the error message if any or null
   * @private
   */
  validateOpenLdapFieldsMappingGroupUsersInput() {
    const settings = this.context.getSettings();
    const value = settings.fieldsMapping.openldap.group.users;
    let fieldsMappingOpenLdapGroupUsersError = null;
    if (!value || value.trim() === "") {
      fieldsMappingOpenLdapGroupUsersError = this.translate("The group users field mapping cannot be empty");
    } else if (value.length > 128) {
      fieldsMappingOpenLdapGroupUsersError = this.translate("The group users field mapping cannot exceed 128 characters.");
    }

    return fieldsMappingOpenLdapGroupUsersError;
  }

  /**
   * Validate the domain input.
   * @returns {string|null} the error message if any or null
   * @private
   */
  validateDomainInput() {
    const settings = this.context.getSettings();
    let domainError = null;
    const domain = settings.domain.trim();
    if (!domain.length) {
      domainError = this.translate("A domain name is required.");
    }
    return domainError;
  }
}

export default UserDirectoryFormService;
