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
import AppContext from "../../../contexts/AppContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import FolderCreateDialog from "../../Folder/FolderCreateDialog/FolderCreateDialog";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import ExportResources from "../ExportResources/ExportResources";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

class FoldersTreeRootFolderContextualMenu extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.createRefs();
    this.bindCallbacks();
  }

  /**
   * Return default state
   * @returns {Object} default state
   */
  getDefaultState() {
    return {};
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.elementRef = React.createRef();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCreateFolderItemClickEvent = this.handleCreateFolderItemClickEvent.bind(this);
    this.handleExportFolderItemClickEvent = this.handleExportFolderItemClickEvent.bind(this);
  }

  /**
   * Handle click on the create a folder menu option.
   */
  handleCreateFolderItemClickEvent() {
    this.context.setContext({
      folderCreateDialogProps: {
        folderParentId: null
      }
    });
    this.props.dialogContext.open(FolderCreateDialog);
    this.props.hide();
  }

  /**
   * Handle click on the export a folder menu option.
   */
  async handleExportFolderItemClickEvent() {
    await this.export();
    this.props.hide();
  }

  /**
   * Returns true if the user can export
   */
  canExport() {
    return this.context.siteSettings.settings.passbolt.plugins.export;
  }

  /**
   * Exports the selected resources
   */
  async export() {
    const foldersIds = this.context.folders.filter(folder => folder.folder_parent_id === null).map(folder => folder.id);
    const resourcesIds = this.context.resources.filter(resource => resource.folder_parent_id === null).map(resource => resource.id);
    await this.props.resourceWorkspaceContext.onResourcesToExport({foldersIds, resourcesIds});
    await this.props.dialogContext.open(ExportResources);
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    return (
      <ContextualMenuWrapper
        hide={this.props.hide}
        left={this.props.left}
        top={this.props.top}>
        <li key="option-create-folder" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handleCreateFolderItemClickEvent}><span>Create folder</span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-export-folder" className={`ready closed ${this.canExport() ? "" : "disabled"}`}>
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handleExportFolderItemClickEvent}><span>Export all</span></a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

FoldersTreeRootFolderContextualMenu.contextType = AppContext;

FoldersTreeRootFolderContextualMenu.propTypes = {
  hide: PropTypes.func, // Hide the contextual menu
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  dialogContext: PropTypes.any, // The dialog context
  resourceWorkspaceContext: PropTypes.any // The resource workspace context
};

export default withResourceWorkspace(withDialog(FoldersTreeRootFolderContextualMenu));
