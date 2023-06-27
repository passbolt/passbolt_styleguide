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
import {withDialog} from "../../../contexts/DialogContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import RenameResourceFolder from "../../ResourceFolder/RenameResourceFolder/RenameResourceFolder";
import DeleteResourceFolder from "../../ResourceFolder/DeleteResourceFolder/DeleteResourceFolder";
import ShareDialog from "../../Share/ShareDialog";
import ExportResources from "../ExportResources/ExportResources";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {withRbac} from "../../../../shared/context/Rbac/RbacContext";
import {uiActions} from "../../../../shared/services/rbacs/uiActionEnumeration";

class FilterResourcesByFoldersItemContextualMenu extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCreateFolderItemClickEvent = this.handleCreateFolderItemClickEvent.bind(this);
    this.handleRenameFolderItemClickEvent = this.handleRenameFolderItemClickEvent.bind(this);
    this.handleShareFolderItemClickEvent = this.handleShareFolderItemClickEvent.bind(this);
    this.handleExportFolderItemClickEvent = this.handleExportFolderItemClickEvent.bind(this);
    this.handleDeleteFolderItemClickEvent = this.handleDeleteFolderItemClickEvent.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  /**
   * Handle hide contextual menu
   */
  handleHide() {
    if (typeof this.props.onBeforeHide === 'function') {
      this.props.onBeforeHide();
    }
    this.props.hide();
  }

  /**
   * Handle click on the create a folder menu option.
   */
  handleCreateFolderItemClickEvent() {
    if (this.canUpdate()) {
      this.props.context.setContext({folderCreateDialogProps: {folderParentId: this.props.folder.id}});
      this.props.dialogContext.open(CreateResourceFolder);
      this.handleHide();
    }
  }

  /**
   * Handle click on the rename a folder menu option.
   */
  handleRenameFolderItemClickEvent() {
    if (this.canUpdate()) {
      this.props.context.setContext({folder: this.props.folder});
      this.props.dialogContext.open(RenameResourceFolder);
      this.handleHide();
    }
  }

  /**
   * Handle click on the share a folder menu option.
   */
  handleShareFolderItemClickEvent() {
    if (this.canShare()) {
      const foldersIds = [this.props.folder.id];
      this.props.context.setContext({shareDialogProps: {foldersIds}});
      this.props.dialogContext.open(ShareDialog);
      this.handleHide();
    }
  }

  /**
   * Handle click on the export a folder menu option.
   */
  async handleExportFolderItemClickEvent() {
    if (this.canExport()) {
      await this.export();
      this.handleHide();
    }
  }

  /**
   * Handle click on the delete a folder menu option.
   */
  handleDeleteFolderItemClickEvent() {
    if (this.canUpdate()) {
      this.props.context.setContext({folder: this.props.folder});
      this.props.dialogContext.open(DeleteResourceFolder);
      this.handleHide();
    }
  }

  /**
   * Check if the user can update the folder.
   * @returns {boolean}
   */
  canUpdate() {
    return this.props.folder.permission.type >= 7;
  }

  /**
   * Check if the user can share the folder.
   * @returns {boolean}
   */
  canShare() {
    return this.props.folder.permission.type === 15;
  }

  /**
   * Check if the user can export
   * @returns {boolean}
   */
  canExport() {
    return this.props.context.siteSettings.canIUse("export")
      && this.props.rbacContext.canIUseUiAction(uiActions.RESOURCES_EXPORT);
  }

  /**
   * Exports the selected resources
   */
  async export() {
    const foldersIds = [this.props.folder.id];
    await this.props.resourceWorkspaceContext.onResourcesToExport({foldersIds});
    await this.props.dialogContext.open(ExportResources);
  }

  /**
   * Render the component.
   * @returns {JSX}
   */
  render() {
    const canUpdate = this.canUpdate();
    const canShare = this.canShare();
    const canExport = this.canExport();

    return (
      <ContextualMenuWrapper
        hide={this.handleHide}
        left={this.props.left}
        top={this.props.top}
        className={this.props.className}>
        <li key="option-create-folder" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button
                  type="button"
                  onClick={this.handleCreateFolderItemClickEvent}
                  disabled={!canUpdate}
                  className="create link no-border">
                  <span><Trans>Create folder</Trans></span>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li key="option-rename-folder" className="separator-after ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button
                  type="button"
                  onClick={this.handleRenameFolderItemClickEvent}
                  disabled={!canUpdate}
                  className="rename link no-border">
                  <span><Trans>Rename</Trans></span>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li key="option-share-folder" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button
                  type="button"
                  onClick={this.handleShareFolderItemClickEvent}
                  disabled={!canShare}
                  className="share link no-border">
                  <span><Trans>Share</Trans></span>
                </button>
              </div>
            </div>
          </div>
        </li>
        {canExport &&
          <li key="option-export-folder" className="ready closed">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <button
                    type="button"
                    className="export link no-border"
                    onClick={this.handleExportFolderItemClickEvent}>
                    <span><Trans>Export</Trans></span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        }
        <li key="option-delete-folder" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <button
                  type="button"
                  onClick={this.handleDeleteFolderItemClickEvent}
                  disabled={!canUpdate}
                  className="delete link no-border">
                  <span><Trans>Delete</Trans></span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

FilterResourcesByFoldersItemContextualMenu.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  folder: PropTypes.object,
  hide: PropTypes.func, // Hide the contextual menu
  onBeforeHide: PropTypes.func, // On before hide callBack
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  className: PropTypes.string, // Class name to add
  dialogContext: PropTypes.any,
  resourceWorkspaceContext: PropTypes.any, // Resource workspace context
};

export default withAppContext(withRbac(withResourceWorkspace(withDialog(withTranslation("common")(FilterResourcesByFoldersItemContextualMenu)))));
