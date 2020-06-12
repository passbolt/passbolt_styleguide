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
import Plugin from "../../../../legacy/util/plugin";

class FoldersTreeItemContextualMenu extends React.Component {

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
    this.handleDocumentClickEvent = this.handleDocumentClickEvent.bind(this);
    this.handleDocumentContextualMenuEvent = this.handleDocumentContextualMenuEvent.bind(this);
    this.handleDocumentDragStartEvent = this.handleDocumentDragStartEvent.bind(this);
    this.handleCreateFolderItemClickEvent = this.handleCreateFolderItemClickEvent.bind(this);
    this.handleRenameFolderItemClickEvent = this.handleRenameFolderItemClickEvent.bind(this);
    this.handleShareFolderItemClickEvent = this.handleShareFolderItemClickEvent.bind(this);
    this.handleExportFolderItemClickEvent = this.handleExportFolderItemClickEvent.bind(this);
    this.handleDeleteFolderItemClickEvent = this.handleDeleteFolderItemClickEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClickEvent);
    document.addEventListener('contextmenu', this.handleDocumentContextualMenuEvent);
    document.addEventListener('dragstart', this.handleDocumentDragStartEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClickEvent);
    document.removeEventListener('contextmenu', this.handleDocumentContextualMenuEvent);
    document.removeEventListener('dragstart', this.handleDocumentDragStartEvent);
  }

  /**
   * Destroy the menu
   */
  destroy() {
    this.props.onDestroy();
  }

  /**
   * Handle click events on document. Hide the component if the click occurred outside of the component.
   * @param {ReactEvent} event The event
   */
  handleDocumentClickEvent(event) {
    // Prevent closing when the user click on an element of the contextual menu
    if (this.elementRef.current.contains(event.target)) {
      return;
    }
    this.destroy();
  }

  /**
   * Handle contextual menu events on document. Hide the component if the click occurred outside of the component.
   * Don't hide it if a contextual menu event occurred on the FoldersList component, this component props will be
   * updated with new datA.
   * @param {ReactEvent} event The event
   */
  handleDocumentContextualMenuEvent(event) {
    // Prevent closing when the user right click on an element of the contextual menu
    if (this.elementRef.current.contains(event.target)) {
      return;
    }
    // Prevent closing when the user right click on an element of the FoldersList component.
    if (this.props.foldersListElementRef.current.contains(event.target)) {
      return;
    }
    this.destroy();
  }

  /**
   * Handle drag start event on document. Hide the component if any.
   */
  handleDocumentDragStartEvent() {
    this.destroy();
  }

  /**
   * Handle click on the create a folder menu option.
   */
  handleCreateFolderItemClickEvent() {
    if (!this.canUpdate()) {
      return;
    }
    const folderParentId = this.props.folder.id;
    Plugin.send('passbolt.plugin.folders.open-create-dialog', {folderParentId});
    this.destroy();
  }

  /**
   * Handle click on the rename a folder menu option.
   */
  handleRenameFolderItemClickEvent() {
    if (!this.canUpdate()) {
      return;
    }
    const folderId = this.props.folder.id;
    Plugin.send('passbolt.plugin.folders.open-rename-dialog', {folderId});
    this.destroy();
  }

  /**
   * Handle click on the share a folder menu option.
   */
  handleShareFolderItemClickEvent() {
    if (!this.canShare()) {
      return;
    }
    const foldersIds = [this.props.folder.id];
    Plugin.send("passbolt.plugin.folders.open-share-dialog", {foldersIds});
    this.destroy();
  }

  /**
   * Handle click on the export a folder menu option.
   */
  handleExportFolderItemClickEvent() {
    const foldersIds = [this.props.folder.id];
    Plugin.send("passbolt.plugin.export_resources", {"folders": foldersIds});
    this.destroy();
  }

  /**
   * Handle click on the delete a folder menu option.
   */
  handleDeleteFolderItemClickEvent() {
    if (!this.canUpdate()) {
      return;
    }
    const folderId = this.props.folder.id;
    Plugin.send('passbolt.plugin.folders.open-delete-dialog', {folderId});
    this.destroy();
  }

  /**
   * Get the contextual menu style.
   */
  getStyle() {
    return {
      display: "block",
      position: "absolute",
      top: this.props.top,
      left: this.props.left
    };
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
   * Render the component.
   * @returns {JSX}
   */
  render() {
    const canUpdate = this.canUpdate();
    const canShare = this.canShare();

    return (
      <div ref={this.elementRef}>
        <ul className="contextual-menu" style={this.getStyle()}>
          <li key="option-create-folder" className={`ready closed ${canUpdate ? "" : "disabled"}`}>
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleCreateFolderItemClickEvent}><span>Create folder</span></a>
                </div>
              </div>
            </div>
          </li>
          <li key="option-rename-folder" className={`"separator-after ready closed ${canUpdate ? "" : "disabled"}`}>
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleRenameFolderItemClickEvent}><span>Rename</span></a>
                </div>
              </div>
            </div>
          </li>
          <li key="option-share-folder" className={`ready closed ${canShare ? "" : "disabled"}`}>
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleShareFolderItemClickEvent}><span>Share</span></a>
                </div>
              </div>
            </div>
          </li>
          <li key="option-export-folder" className="ready closed">
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleExportFolderItemClickEvent}><span>Export</span></a>
                </div>
              </div>
            </div>
          </li>
          <li key="option-delete-folder" className={`ready closed ${canUpdate ? "" : "disabled"}`}>
            <div className="row">
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <a onClick={this.handleDeleteFolderItemClickEvent}><span>Delete</span></a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

FoldersTreeItemContextualMenu.propTypes = {
  onDestroy: PropTypes.func,
  foldersListElementRef: PropTypes.object,
};

export default FoldersTreeItemContextualMenu;
