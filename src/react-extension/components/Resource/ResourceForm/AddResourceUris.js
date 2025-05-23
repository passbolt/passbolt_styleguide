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
 * @since         5.2.0
 */

import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {
  withResourceTypesLocalStorage
} from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import AttentionSVG from "../../../../img/svg/attention.svg";
import DeleteSVG from "../../../../img/svg/delete.svg";
import AddSVG from "../../../../img/svg/add.svg";

const URIS_LIMIT = 20;

class AddResourceUris extends Component {
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
    this.handleAddUriClick = this.handleAddUriClick.bind(this);
    this.handleDeleteUriClick = this.handleDeleteUriClick.bind(this);
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
   * Handle the click on the add uri button
   */
  handleAddUriClick() {
    const eventUri = {
      target: {
        name: `metadata.uris.${this.props.resource.metadata.uris.length}`,
        value: ""
      }
    };
    this.props.onChange?.(eventUri);
  }

  /**
   * Handle the click on the delete uri button
   * @param {number} index The index of the uri to delete
   */
  handleDeleteUriClick(index) {
    const eventUri = {
      target: {
        name: `metadata.uris.${index}`,
        value: null
      }
    };
    this.props.onChange?.(eventUri);
  }

  /**
   * Additional uris
   * @returns {Array<string>}
   */
  get additionalUris() {
    return this.props.resource.metadata.uris.slice(1);
  }

  /**
   * Has multiple uris
   * @returns {boolean}
   */
  get hasMultipleUris() {
    return this.props.resource?.metadata?.uris?.length > 0;
  }

  /**
   * Can add uri
   * @returns {boolean}
   */
  get canAddUri() {
    const lastUri = this.props.resource?.metadata?.uris?.[this.props.resource.metadata.uris.length - 1];
    return lastUri?.length > 0 && this.props.resource.metadata.uris.length < URIS_LIMIT;
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
    const segments = propName.split('.');
    const propArrayName = segments[0];
    const propsArrayIndex = segments[1];
    return this.props.errors?.details?.metadata?.details?.[propArrayName]?.[propsArrayIndex]?.maxLength;
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
          <h2><Trans>URIs</Trans></h2>
        </div>
        <div className="content">
          <div className="uris-fields">
            <div className={`input text ${this.props.disabled ? 'disabled' : ''}`}>
              <label htmlFor="resource-main-uri"><Trans>Main URI</Trans>{this.isMaxLengthWarnings("uris.0") && <AttentionSVG className="attention-required"/>}</label>
              <input id="resource-main-uri" disabled={this.props.disabled} name="metadata.uris.0" maxLength="1024" type="text" autoComplete="off" placeholder={this.translate("URI")} value={this.props.resource?.metadata?.uris?.[0]} onChange={this.handleInputChange}/>
              {this.isMaxLengthError("uris.0") &&
                <div className="main-uri error-message"><Trans>This is the maximum size for this field, make sure your data was not truncated.</Trans></div>
              }
              {this.isMaxLengthWarnings("uris.0") &&
                <div className="main-uri warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                </div>
              }
            </div>
            <div className={`input text ${this.props.disabled ? 'disabled' : ''}`}>
              <label htmlFor={`resource-additional-uri-${this.hasMultipleUris ? this.additionalUris.length : ""}`}><Trans>Additional URI</Trans>{this.isMaxLengthWarnings("uris", "metadata") && <AttentionSVG className="attention-required"/>}</label>
              {this.hasMultipleUris && this.additionalUris.map((uri, index) => (
                <div key={index} className="additional-uri-wrapper">
                  <input id={`resource-additional-uri-${index + 1}`} autoFocus={index + 1 === this.additionalUris.length} disabled={this.props.disabled} name={`metadata.uris.${index + 1}`} maxLength="1024" type="text" autoComplete="off" placeholder={this.translate("URI")} value={this.props.resource.metadata.uris[index + 1]} onChange={this.handleInputChange}/>
                  <button type="button" className="button-icon" id={`resource-delete-additional-uri-${index + 1}`} onClick={() => this.handleDeleteUriClick(index + 1)}><DeleteSVG/></button>
                  {this.isMaxLengthError(`uris.${index + 1}`) &&
                    <div className={`additional-uri-${index + 1} error-message`}><Trans>This is the maximum size for this field, make sure your data was not truncated.</Trans></div>
                  }
                  {this.isMaxLengthWarnings(`uris.${index + 1}`) &&
                    <div className={`additional-uri-${index + 1} warning-message`}>
                      <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                    </div>
                  }
                </div>
              ))
              }
            </div>
            <div className="uri-add">
              <button type="button" disabled={!this.canAddUri} onClick={this.handleAddUriClick}>
                <AddSVG/>
                <span><Trans>Add URI</Trans></span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

AddResourceUris.propTypes = {
  resource: PropTypes.object, // The resource to edit or create
  onChange: PropTypes.func, //The resource setter
  t: PropTypes.func, // The translation function
  warnings: PropTypes.object, //The warnings validation
  errors: PropTypes.object, // The errors entity error validation
  disabled: PropTypes.bool // The disabled property
};

export default  withResourceTypesLocalStorage(withTranslation('common')(AddResourceUris));

