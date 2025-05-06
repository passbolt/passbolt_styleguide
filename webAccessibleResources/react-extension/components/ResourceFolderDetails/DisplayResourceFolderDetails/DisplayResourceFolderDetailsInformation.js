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
import PropTypes from "prop-types";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withRouter} from "react-router-dom";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {formatDateTimeAgo} from "../../../../shared/utils/dateUtils";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import FolderSVG from "../../../../img/svg/folder.svg";
import ShareFolderSVG from "../../../../img/svg/share_folder.svg";
import TooltipPortal from "../../Common/Tooltip/TooltipPortal";
import CabinetSVG from "../../../../img/svg/cabinet.svg";

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
  getFolderName(folderParentId) {
    if (folderParentId === null) {
      return this.props.t("My workspace");
    }

    if (this.props.context.folders) {
      const folder = this.props.context.folders.find(item => item.id === folderParentId);
      if (folder) {
        return folder.name;
      }
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
   * Render the tooltip folders structure.
   * @param {array<FolderEntity>} folderStructure The folders structure.
   * @render {JSX}
   */
  renderTooltipFolderStructure(folderStructure) {
    if (folderStructure.length === 0) {
      return <span><Trans>My workspace</Trans></span>;
    }

    return folderStructure?.map((folder, index) =>
      <div key={folder.id} className="folder-level" style={{marginLeft: `${5 * index}px`}}>
        {folder.folder_parent_id !== null &&
          <span className="caret">›</span>
        }
        <span>{folder.name}</span>
      </div>
    );
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
    const folderStructure = this.props.context.getHierarchyFolderCache(this.folder.folder_parent_id);

    return (
      <div className={`detailed-information accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClickEvent}>
              <span className="accordion-title">
                <Trans>Information</Trans>
              </span>
              {this.state.open
                ? <CaretDownSVG />
                : <CaretRightSVG />
              }
            </button>
          </h4>
        </div>
        {this.state.open &&
          <div className="accordion-content">
            <div className="information-label">
              <span className="username label"><Trans>Name</Trans></span>
              <span className="created label"><Trans>Created</Trans></span>
              <span className="created-by label"><Trans>Created by</Trans></span>
              <span className="modified label"><Trans>Modified</Trans></span>
              <span className="modified-by label"><Trans>Modified by</Trans></span>
              <span className="location label"><Trans>Location</Trans></span>
            </div>
            <div className="information-value">
              <span className="username value">{this.folder.name}</span>
              <span className="created value" title={this.folder.created}>{createdDateTimeAgo}</span>
              <span className="created-by value">{creatorUsername}</span>
              <span className="modified value" title={this.folder.modified}>{modifiedDateTimeAgo}</span>
              <span className="modified-by value">{modifierUsername}</span>
              <span className="location value">
                <TooltipPortal message={this.renderTooltipFolderStructure(folderStructure)}>
                  <button type="button" onClick={this.handleFolderParentClickEvent} disabled={!this.props.context.folders} className="no-border">
                    {this.folder.folder_parent_id === null &&
                      <>
                        <CabinetSVG />
                        <Trans>My workspace</Trans>
                      </>
                    }
                    {this.folder.folder_parent_id !== null &&
                      <>
                        {this.isFolderParentShared() ? <ShareFolderSVG/> : <FolderSVG/>}
                        {folderStructure.map(folder =>
                          <React.Fragment key={folder.id}>
                            {folder.folder_parent_id !== null &&
                              <span className="caret">›</span>
                            }
                            <span>{folder.name}</span>
                          </React.Fragment>
                        )}
                      </>
                    }
                  </button>
                </TooltipPortal>
              </span>
            </div>
          </div>
        }
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
