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
import {withAppContext} from "../../../contexts/AppContext";
import ContextualMenuWrapper from "../../Common/ContextualMenu/ContextualMenuWrapper";
import CreateResourceFolder from "../../ResourceFolder/CreateResourceFolder/CreateResourceFolder";
import {withDialog} from "../../../contexts/DialogContext";
import ExportResources from "../ExportResources/ExportResources";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";

class FilterResourcesByRootFolderContextualMenu extends React.Component {
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
    this.handleExportFolderItemClickEvent = this.handleExportFolderItemClickEvent.bind(this);
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
    this.props.context.setContext({
      folderCreateDialogProps: {
        folderParentId: null
      }
    });
    this.props.dialogContext.open(CreateResourceFolder);
    this.handleHide();
  }

  /**
   * Handle click on the export a folder menu option.
   */
  async handleExportFolderItemClickEvent() {
    await this.export();
    this.handleHide();
  }

  /**
   * Returns true if the user can export
   */
  canExport() {
    return this.props.context.siteSettings.canIUse("export");
  }

  /**
   * Exports the selected resources
   */
  async export() {
    const foldersIds = this.props.context.folders.filter(folder => folder.folder_parent_id === null).map(folder => folder.id);
    const resourcesIds = this.props.context.resources.filter(resource => resource.folder_parent_id === null).map(resource => resource.id);
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
        hide={this.handleHide}
        left={this.props.left}
        top={this.props.top}
        className={this.props.className}>
        <li key="option-create-folder" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a onClick={this.handleCreateFolderItemClickEvent}><span><Trans>Create folder</Trans></span></a>
              </div>
            </div>
          </div>
        </li>
        <li key="option-export-folder" className="ready closed">
          <div className="row">
            <div className="main-cell-wrapper">
              <div className="main-cell">
                <a className={`${this.canExport() ? "" : "disabled"}`}
                  onClick={this.handleExportFolderItemClickEvent}>
                  <span>
                    <Trans>Export all</Trans>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ContextualMenuWrapper>
    );
  }
}

FilterResourcesByRootFolderContextualMenu.propTypes = {
  context: PropTypes.any, // The application context
  hide: PropTypes.func, // Hide the contextual menu
  onBeforeHide: PropTypes.func, // On before hide callBack
  left: PropTypes.number, // left position in px of the page
  top: PropTypes.number, // top position in px of the page
  className: PropTypes.string, // Class name to add
  dialogContext: PropTypes.any, // The dialog context
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
};

export default withAppContext(withResourceWorkspace(withDialog(withTranslation("common")(FilterResourcesByRootFolderContextualMenu))));
