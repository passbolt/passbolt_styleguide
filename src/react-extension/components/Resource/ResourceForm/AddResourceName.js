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
import KeySVG from "../../../../img/svg/key.svg";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

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
      resourceViewModel: null,
      processing: false,
    };
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
    const target = event.target;
    const name = target.name;
    const value = target.value || null;

    const newState = {
      resourceViewModel: this.state.resourceViewModel.cloneWithMutation(name, value),
    };

    this.setState(newState);
  }

  /**
   * Returns true if the `maxLength` property of the given field has been reached.
   * @param {string} fieldName
   * @returns {boolean}
   */
  isFieldMaxSizeReached(fieldName) {
    const schema = this.state.resourceViewModel?.constructor.getSchema();
    if (typeof(schema?.properties[fieldName]?.maxLength) === "undefined") {
      return false;
    }

    return this.state.resourceViewModel[fieldName]?.length >= schema.properties[fieldName].maxLength;
  }

  /**
   * Returns the current list of breadcrumb items
   */
  get breadcrumbItems() {
    const foldersHierarchy = this.props.resourceWorkspaceContext.getHierarchyFolderCache(this.props.folderParentId);
    return <div className="breadcrumbs">
      <div className="folder-name"><Trans>My workspace</Trans></div>
      {foldersHierarchy?.map(folder =>
        <Fragment key={folder.id}>
          {folder.folder_parent_id !== null &&
            <span className="caret">›</span>
          }
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

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    return (
      <div className="resource-info">
        <div className="resource-icon">
          <KeySVG/>
        </div>
        <div className="information">
          <div className="input text">
            <input id="resource-name" name="name" type="text" value={this.state.resourceViewModel?.name || ""}
              onChange={this.handleInputChange} disabled={this.state.processing} maxLength="255"
              autoComplete="off" autoFocus={true} placeholder={this.translate("Name")}/>
            {this.isFieldMaxSizeReached("name") &&
              <div className="name warning-message">
                <strong><Trans>Warning:</Trans></strong> <Trans>this is the maximum size for this field, make sure your data was not truncated</Trans>
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
  folderParentId: PropTypes.string, // The folder parent id
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  t: PropTypes.func, // The translation function
};

export default  withResourceWorkspace(withTranslation('common')(AddResourceName));

