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
import UnlockSVG from "../../../../img/svg/unlock.svg";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";

class AddResourceNote extends Component {
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
   * Is resource type v4 default
   * @returns {boolean}
   */
  get isResourceTypeV4Default() {
    return RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG === this.props.resourceType?.slug;
  }

  /**
   * Can have secret totp
   * @returns {boolean}
   */
  get canHaveMetadataDescription() {
    return this.props.resourceTypes?.hasSomeMetadataDescriptionResourceTypes(this.props.resourceType?.version);
  }

  /**
   * Checks if there is a max length warning for a specific property.
   *
   * @param {string} propName - The name of the property to check for max length warnings.
   * @returns {boolean} - Returns true if there is a max length warning for the property, false otherwise.
   */
  isMaxLengthWarnings(propName) {
    return !this.isMaxLengthError(propName) && this.props.warnings?.hasError(propName, "maxLength");
  }


  /**
   * Checks if there is a max length error for a specific property.
   *
   * @param {string} propName - The name of the property to check for max length errors.
   * @returns {boolean} - Returns true if there is a max length error for the property, false otherwise.
   */
  isMaxLengthError(propName) {
    return this.props.errors?.details.secret?.hasError(propName, "maxLength");
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
          <h2><Trans>Note</Trans></h2>
        </div>
        <div className="content">
          <div className="note-fields">
            <div className="input textarea">
              <label htmlFor="resource-note">
                <Trans>Content</Trans>
              </label>
              <textarea id="resource-note" name="secret.description" maxLength="10000" placeholder={this.translate("Add a note")} onChange={this.handleInputChange} value={this.props.resource?.secret?.description}>
              </textarea>
              {this.isMaxLengthError("description") &&
                <div className="note error-message"><Trans>This is the maximum size for this field, make sure your data was not truncated.</Trans></div>
              }
              {this.isMaxLengthWarnings("description") &&
                <div className="note warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                </div>
              }
            </div>
          </div>
        </div>
        {this.isResourceTypeV4Default && this.canHaveMetadataDescription &&
          <div className="message notice">
            <p className="text">
              <strong><Trans>Information</Trans>:</strong> <Trans>Note is a secret and it is not searchable.</Trans> <Trans>If you want it to be a searchable, you can convert it into a description.</Trans> <Trans>This is not recommended.</Trans>
            </p>
            <button id="convert-to-description" type="button" className="button" onClick={this.props.onConvertToDescription}>
              <UnlockSVG/>
              <Trans>Convert to description</Trans>
            </button>
          </div>
        }
      </>
    );
  }
}

AddResourceNote.propTypes = {
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, //The resource setter
  onConvertToDescription: PropTypes.func, //The resource note to convert
  resourceType: PropTypes.instanceOf(ResourceTypeEntity), // The resource type entity
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection),
  t: PropTypes.func, // The translation function
  warnings: PropTypes.object, //The warnings validation
  errors: PropTypes.object // The errors entity error validation
};

export default  withResourceTypesLocalStorage(withTranslation('common')(AddResourceNote));

