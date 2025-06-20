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
 * @since         5.3.0
 */

import PropTypes from "prop-types";
import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";
import DeleteSVG from "../../../../img/svg/delete.svg";
import AddSVG from "../../../../img/svg/add.svg";
import SecureTextarea from "../../../../shared/components/SecureTextarea/SecureTextarea";
import CustomFieldEntity from "../../../../shared/models/entity/customField/customFieldEntity";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {
  CUSTOM_FIELD_COLLECTION_MAX_CONTENT_SIZE
} from "../../../../shared/models/entity/customField/customFieldsCollection";

class AddResourceCustomFields extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  get defaultState() {
    return {
      totalCharacters: 0,
    };
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCustomFieldsClick = this.handleAddCustomFieldsClick.bind(this);
    this.handleAddCustomFieldsClick = this.handleAddCustomFieldsClick.bind(this);
  }

  /**
   * Get the translation function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
   * Handle the click on the add custom fields button
   */
  handleAddCustomFieldsClick() {
    const eventCustomField = {
      target: {
        name: `secret.custom_fields.${this.props.resource.secret.custom_fields.length}`,
        value: CustomFieldEntity.createFromDefault()
      }
    };
    this.props.onChange?.(eventCustomField);
  }

  /**
   * Handle the click on the delete custom fields button
   * @param {number} index The index of the uri to delete
   */
  handleDeleteCustomFieldClick(index) {
    const eventCustomField = {
      target: {
        name: `secret.custom_fields.${index}`,
        value: null
      }
    };
    this.props.onChange?.(eventCustomField);
  }

  /**
   * Can add custom field
   * @returns {boolean}
   */
  get canAddCustomField() {
    return this.props.resource?.secret?.custom_fields?.length < 33 || this.isCustomFieldsCollectionMaxContentSizeReached;
  }

  /**
   * Display the content surrounded or not with a tooltip.
   * @param {React.JSX.Element} content content to display
   * @param {boolean} isDisabled if disabled the tooltip is added
   * @returns {ReactDOM}
   */
  addTooltipOnDisabledElement(content, isDisabled) {
    return isDisabled
      ? <Tooltip message={<Trans>You have reach the row limit.</Trans>} direction="bottom">{content}</Tooltip>
      : <>{content}</>;
  }

  /**
   * Checks if there is a max length warning for a specific property.
   *
   * @param {string} propName - The name of the property to check for max length warnings.
   * @returns {boolean} - Returns true if there is a max length warning for the property, false otherwise.
   */
  isMaxLengthWarnings(propName) {
    return !this.isCustomFieldsCollectionMaxContentSizeReached && this.props.warnings?.hasError(propName, "maxLength");
  }

  /**
   * Get the max length according to the index of the custom field
   * @param {number} index
   * @returns {number}
   */
  customFieldValueMaxLengthAllowed(index) {
    const currentCustomFieldValueMaxLengthAllowed = (CUSTOM_FIELD_COLLECTION_MAX_CONTENT_SIZE - this.customFieldsValueLength) + this.props.resource?.secret.custom_fields[index].secret_value.length;
    return Math.min(5000, currentCustomFieldValueMaxLengthAllowed);
  }

  /**
   * Get the custom fields value total length
   * @returns {*}
   */
  get customFieldsValueLength() {
    return this.props.resource?.secret.custom_fields.reduce((total, custom_field) => total + custom_field.secret_value.length, 0);
  }

  /**
   * Is custom fields collection max content size is reached
   * @returns {boolean}
   */
  get isCustomFieldsCollectionMaxContentSizeReached() {
    return this.customFieldsValueLength === CUSTOM_FIELD_COLLECTION_MAX_CONTENT_SIZE;
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
          <h2><Trans>Custom fields</Trans></h2>
        </div>
        <div className="header">
          <div className="key">
            <span className="label"><Trans>Key</Trans></span>
            <span className="subinfo"><Trans>Searchable Metadata</Trans></span>
          </div>
          <div className="divider-wrapper">
            <span className="divider"></span>
          </div>
          <div className="value">
            <span className="label"><Trans>Value</Trans></span>
            <span className="subinfo"><Trans>Non-Searchable Secret</Trans></span>
          </div>
        </div>
        <div className="content">
          <div className="custom-fields-fields">
            {this.props.resource?.secret.custom_fields?.map((custom_field, index) => (
              <div key={index} className="custom-field-row">
                <div className="input custom-field">
                  <input id={`resource-custom-fields-key-${index}`} disabled={this.props.disabled} name={`secret.custom_fields.${index}.metadata_key`} maxLength="255" type="text" autoComplete="off" placeholder={this.translate("Key")} value={custom_field.metadata_key} onChange={this.handleInputChange}/>
                  <SecureTextarea
                    id={`resource-custom-fields-value-${index}`}
                    name={`secret.custom_fields.${index}.secret_value`}
                    placeholder={this.translate("Value")}
                    maxLength={this.customFieldValueMaxLengthAllowed(index)}
                    value={custom_field.secret_value}
                    onChange={this.handleInputChange}
                    disabled={this.props.disabled}
                  />
                  <button type="button" className="button-transparent inline" id={`resource-delete-custom-field-${index}`} onClick={() => this.handleDeleteCustomFieldClick(index)}><DeleteSVG/></button>
                </div>
                {this.isMaxLengthWarnings(`custom_fields.${index}.metadata_key`) &&
                  <div className={`resource-custom-fields-key-${index} warning-message`}>
                    <Trans>The key exceeds the character limit, make sure your data won’t be truncated.</Trans>
                  </div>
                }
                {this.isMaxLengthWarnings(`custom_fields.${index}.metadata_value`) &&
                  <div className={`resource-custom-fields-value-${index} warning-message`}>
                    <Trans>The value exceeds the character limit, make sure your data won’t be truncated.</Trans>
                  </div>
                }
              </div>
            ))
            }
            <div className="custom-field-add">
              {this.addTooltipOnDisabledElement(
                <button type="button" disabled={!this.canAddCustomField} onClick={this.handleAddCustomFieldsClick}>
                  <AddSVG/>
                  <span><Trans>Add Row</Trans></span>
                </button>,
                !this.canAddCustomField
              )}
            </div>
          </div>
        </div>
        {this.isCustomFieldsCollectionMaxContentSizeReached &&
          <div className="warning message no-margin">
            <Trans>You have reach the maximum content size limit.</Trans>
          </div>
        }
      </>
    );
  }
}

AddResourceCustomFields.propTypes = {
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, //The resource setter
  t: PropTypes.func, // The translation function
  warnings: PropTypes.object, //The warnings validation
  disabled: PropTypes.bool // The disabled property
};

export default  withTranslation('common')(AddResourceCustomFields);

