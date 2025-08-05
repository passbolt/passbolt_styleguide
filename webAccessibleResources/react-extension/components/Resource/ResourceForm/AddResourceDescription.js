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
 * @since         5.0.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import LockSVG from "../../../../img/svg/lock.svg";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  RESOURCE_TYPE_PASSWORD_STRING_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import AttentionSVG from "../../../../img/svg/attention.svg";

class AddResourceDescription extends Component {
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }
  /**
   * Get the translation function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  }

  /**
   * Is resource type v4 password string
   * @returns {boolean}
   */
  get isResourceTypeV4PasswordString() {
    return RESOURCE_TYPE_PASSWORD_STRING_SLUG === this.props.resourceType?.slug;
  }

  /**
   * Can have secret totp
   * @returns {boolean}
   */
  get canHaveSecretNote() {
    return this.props.resourceTypes?.hasSomeNoteResourceTypes(this.props.resourceType?.version);
  }
  /**
   * Checks if there is a max length warning for a specific property.
   *
   * @param {string} propName - The name of the property to check for max length warnings.
   * @param {string} association - The name of the association to check for max length warnings.
   * @returns {boolean} - Returns true if there is a max length warning for the property, false otherwise.
   */
  isMaxLengthWarnings(propName, association) {
    return !this.isMaxLengthError(propName) && this.props.warnings?.hasError(`${association}.${propName}`, "maxLength");
  }

  /**
   * Checks if there is a max length error for a specific property.
   *
   * @param {string} propName - The name of the property to check for max length errors.
   * @returns {boolean} - Returns true if there is a max length error for the property, false otherwise.
   */
  isMaxLengthError(propName) {
    return this.props.errors?.details.metadata?.hasError(propName, "maxLength");
  }
  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <>
        <div className="title">
          <h2><Trans>Description</Trans></h2>
        </div>
        <div className="content">
          <div className="description-fields">
            <div className={`input textarea ${this.props.disabled ? 'disabled' : ''}`}>
              <label htmlFor="resource-description">
                <Trans>Content</Trans>
                {this.isMaxLengthWarnings("description", "metadata") && <AttentionSVG className="attention-required"/>}
              </label>
              <textarea
                id="resource-description"
                name="metadata.description"
                maxLength="10000"
                placeholder={this.translate("Add a description")}
                onChange={this.handleInputChange}
                disabled={this.props.disabled}
                value={this.props.resource?.metadata?.description}>
              </textarea>
              {this.isMaxLengthError("description") &&
                <div className="description error-message"><Trans>This is the maximum size for this field, make sure your data was not truncated.</Trans></div>
              }
              {this.isMaxLengthWarnings("description", "metadata") &&
                <div className="description warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                </div>
              }
            </div>
          </div>
        </div>
        {this.isResourceTypeV4PasswordString && this.canHaveSecretNote &&
          <div className="message notice">
            <p className="text">
              <strong><Trans>Information</Trans>:</strong> <Trans>Description is a searchable metadata.</Trans> <Trans>If you want it to be a secret, you can convert it into a note.</Trans>
            </p>
            <button id="convert-to-note" type="button" className="button" onClick={this.props.onConvertToNote}>
              <LockSVG/>
              <Trans>Convert to note</Trans>
            </button>
          </div>
        }
      </>
    );
  }
}

AddResourceDescription.propTypes = {
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, //The resource setter
  onConvertToNote: PropTypes.func, //The resource description to convert
  resourceType: PropTypes.instanceOf(ResourceTypeEntity), // The resource type entity
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection),
  disabled: PropTypes.bool, // The disabled property
  t: PropTypes.func, // The translation function
  warnings: PropTypes.object, //The warnings validation
  errors: PropTypes.object // The errors entity error validation
};

export default  withResourceTypesLocalStorage(withTranslation('common')(AddResourceDescription));

