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

import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import ResourceIcon from "../../../../shared/components/Icons/ResourceIcon";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {ResourceEditCreateFormEnumerationTypes} from "../../../../shared/models/resource/ResourceEditCreateFormEnumerationTypes";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";

class AddResourceName extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get the default state
   * @returns {object}
   */
  get defaultState() {
    return {
      processing: false,
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onResourceIconClick = this.onResourceIconClick.bind(this);
  }

  /**
   * Click callback on resource icon
   * @param {ReactEvent} e
   */
  onResourceIconClick(e) {
    this.props.onIconClick(e, ResourceEditCreateFormEnumerationTypes.APPEARANCE);
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
   * Returns the current list of breadcrumb items
   */
  get breadcrumbItems() {
    const foldersHierarchy = this.props.context.getHierarchyFolderCache(this.props.resource?.folder_parent_id);
    return <div className="breadcrumbs">
      <div className="folder-name"><Trans>My workspace</Trans></div>
      {foldersHierarchy?.map(folder =>
        <Fragment key={folder.id}>
          <span className="caret">›</span>
          <div className="folder-name">{folder.name}</div>
        </Fragment>
      )}
    </div>;
  }

  /**
   * Get the translation function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Checks if there is a max length warning for a specific property.
   * @param {string} propName - The name of the property to check for max length warning.
   * @param {string} association - The name of the association to check for max length warning.
   *
   * @returns {boolean} - Returns true if there is a max length warning for the property, false otherwise.
   */
  isMaxLengthWarnings(propName, association) {
    return !this.isMaxLengthError() && this.props.warnings?.hasError(`${association}.${propName}`, "maxLength");
  }

  /**
   * Checks if there is a max length error for a specific property.
   *
   * @returns {boolean} - Returns true if there is a max length error for the property, false otherwise.
   */
  isMaxLengthError() {
    return this.props.errors?.details?.metadata?.hasError("name", "maxLength");
  }

  /**
   * Check if resource is using v5
   * @returns {boolean} - Returns true if the version used is V5.
   */
  get isV5ResourceType() {
    return this.props.resourceType.isV5();
  }
  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <div className="resource-info">
        <div className="resource-icon">
          {
            this.isV5ResourceType && (
              <button className="button-transparent" onClick={this.onResourceIconClick} type="button">
                <ResourceIcon resource={this.props.resource}/>
              </button>
            )
          }
          {
            !this.isV5ResourceType && <ResourceIcon resource={this.props.resource} />
          }
        </div>
        <div className="information">
          <div className={`input text ${this.props.disabled ? 'disabled' : ''}`}>
            <input id="resource-name" name="metadata.name" type="text" value={this.props.resource?.metadata?.name || ""}
              onChange={this.handleInputChange} disabled={this.props.disabled} maxLength="255"
              autoComplete="off" autoFocus={true} placeholder={this.translate("Name")}/>
            {this.isMaxLengthError() &&
                <div className="name error-message"><Trans>This is the maximum size for this field, make sure your data was not truncated.</Trans></div>
            }
            {this.isMaxLengthWarnings("name", "metadata") &&
                <div className="name warning-message">
                  <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated.</Trans>
                </div>
            }
          </div>
          {this.breadcrumbItems}
        </div>
      </div>
    );
  }
}

AddResourceName.propTypes = {
  context: PropTypes.any, // The app context
  resource: PropTypes.object, // The resource to update``
  resourceType: PropTypes.instanceOf(ResourceTypeEntity), // The resource types collection
  warnings: PropTypes.object, //The warnings validation
  errors: PropTypes.object, // The errors entity error validation
  onChange: PropTypes.func, // The on change function
  disabled: PropTypes.bool, // The disabled property
  t: PropTypes.func, // The translation function
  onIconClick: PropTypes.func, // The callback to change the current form
};

export default  withAppContext(withTranslation('common')(AddResourceName));

