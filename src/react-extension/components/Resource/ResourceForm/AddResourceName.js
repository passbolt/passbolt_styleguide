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
    if (this.props.onChange) {
      this.props.onChange(event);
    }
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
            <input id="resource-name" name="metadata.name" type="text" value={this.props.resource?.metadata?.name || ""}
              onChange={this.handleInputChange} disabled={this.state.processing} maxLength="255"
              autoComplete="off" autoFocus={true} placeholder={this.translate("Name")}/>
            {this.props.isFieldMaxSizeReached &&
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
  resource: PropTypes.object, // The resource to update
  isFieldMaxSizeReached: PropTypes.bool, // is field max size reached
  onChange: PropTypes.func, // The on change function
  t: PropTypes.func, // The translation function
};

export default  withResourceWorkspace(withTranslation('common')(AddResourceName));

