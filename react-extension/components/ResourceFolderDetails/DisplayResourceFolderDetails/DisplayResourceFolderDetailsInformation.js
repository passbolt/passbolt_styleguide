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
 * @since         2.13.0
 */
import React from "react";
import Icon from "../../../../shared/components/Icons/Icon";
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withRouter} from "react-router-dom";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";

class DisplayResourceFolderDetailsInformation extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: true,
      creator: null, // the data of the folder creator
      modifier: null, // the data of the folder modifier
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleFolderParentClickEvent = this.handleFolderParentClickEvent.bind(this);
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }

  componentDidMount() {
    if (this.state.open) {
      this.loadUserInformation();
    }
  }

  /**
   * Whenever the component has updated in terms of props
   * @param {object} prevProps The previous componentDidUpdate props
   */
  componentDidUpdate(prevProps) {
    this.handleFolderChange(prevProps.resourceWorkspaceContext.details.folder);
  }

  /**
   * Check if the folder has changed and fetch
   * @param {object} previousFolder The previously selected folder
   */
  handleFolderChange(previousFolder) {
    const hasModifierOrCreatorChanged = this.folder.created_by !== previousFolder.created_by
      || this.folder.modified_by !== previousFolder.modified_by;
    if (hasModifierOrCreatorChanged && this.state.open) {
      this.loadUserInformation();
    }
  }

  /**
   * Loads the information about the creator and the modifier of the current selected folder.
   * @returns {Promise<void>}
   */
  async loadUserInformation() {
    const folderInformation = await this.props.context.port.request("passbolt.folders.find-details", this.folder.id);
    this.setState({
      creator: folderInformation?.creator,
      modifier: folderInformation?.modifier,
    });
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleFolderParentClickEvent() {
    if (this.folder.folder_parent_id) { // Case of specific folder
      const folderParent = this.props.context.folders.find(item => item.id === this.folder.folder_parent_id);
      this.props.history.push(`/app/folders/view/${folderParent.id}`);
    } else { // Case of root folder
      const filter = {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER};
      this.props.history.push(`/app/passwords`, {filter});
    }
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Returns the current detailed folder
   */
  get folder() {
    return this.props.resourceWorkspaceContext.details.folder;
  }

  /**
   * Get the folder name.
   * @param {string} folderId The folder id
   * @returns {string}
   */
  getFolderName(folderId) {
    if (folderId === null) {
      return '/';
    }

    if (this.props.context.folders) {
      const folder = this.props.context.folders.find(item => item.id === folderId);
      return folder?.name;
    }

    return "";
  }


  /**
   * Check if folder parent is shared
   * @returns {boolean}
   */
  isFolderParentShared() {
    const isShared = false;

    if (this.folder.folder_parent_id !== null && this.props.context.folders) {
      const folder = this.props.context.folders.find(item => item.id === this.folder.folder_parent_id);
      if (folder) {
        return !folder.personal;
      }
    }

    return isShared;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const creatorUsername = this.state.creator?.username || "";
    const modifierUsername = this.state.modifier?.username || "";
    const createdDateTimeAgo = formatDateTimeAgo(this.folder.created, this.props.t, this.props.context.locale);
    const modifiedDateTimeAgo = formatDateTimeAgo(this.folder.modified, this.props.t, this.props.context.locale);
    const folderParentName = this.getFolderName(this.folder.folder_parent_id);

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <Trans>Information</Trans>
              {this.state.open &&
              <Icon name="caret-down"/>
              }
              {!this.state.open &&
              <Icon name="caret-right"/>
              }
            </button>
          </h4>
        </div>
        <div className="accordion-content">
          <ul>
            <li className="username">
              <span className="label"><Trans>Name</Trans></span>
              <span className="value">{this.folder.name}</span>
            </li>
            <li className="modified">
              <span className="label"><Trans>Modified</Trans></span>
              <span className="value" title={this.folder.modified}>{modifiedDateTimeAgo}</span>
            </li>
            <li className="modified-by">
              <span className="label"><Trans>Modified by</Trans></span>
              <span className="value">{modifierUsername}</span>
            </li>
            <li className="modified">
              <span className="label"><Trans>Created</Trans></span>
              <span className="value" title={this.folder.created}>{createdDateTimeAgo}</span>
            </li>
            <li className="modified-by">
              <span className="label"><Trans>Created by</Trans></span>
              <span className="value">{creatorUsername}</span>
            </li>
            <li className="location">
              <span className="label"><Trans>Location</Trans></span>
              <span className="value">
                <button type="button" onClick={this.handleFolderParentClickEvent} disabled={!this.props.context.folders} className="link no-border folder-link">
                  { !this.isFolderParentShared() ? <Icon name="folder"/> : <Icon name="folder-shared"/> }
                  <span>{folderParentName}</span>
                </button>
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

DisplayResourceFolderDetailsInformation.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.object,
  resourceWorkspaceContext: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withResourceWorkspace(withTranslation('common')(DisplayResourceFolderDetailsInformation))));
