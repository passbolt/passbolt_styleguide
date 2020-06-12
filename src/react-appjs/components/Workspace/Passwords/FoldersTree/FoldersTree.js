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
import React, {Fragment} from "react";
import Icon from "../../../Common/Icons/Icon";
import FoldersTreeItem from "./FoldersTreeItem";
import PropTypes from "prop-types";
import Plugin from "../../../../legacy/util/plugin";

// Root virtual folder identifier.
const ROOT = null;

class FoldersTree extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.createInputRef();
    this.bindCallbacks();
    this.initEventHandlers();
  }

  /**
   * Return default state
   * @returns {Object} default state
   */
  getDefaultState() {
    return {
      draggedItems: {
        folders: [],
        resources: []
      },
      dragging: false,
      draggingOverTitle: false,
      open: true,
      openFolders: []
    };
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.elementRef = React.createRef();
    this.dragFeedbackElementRef = React.createRef();
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleClickOnTitle = this.handleClickOnTitle.bind(this);
    this.handleContextualMenuEvent = this.handleContextualMenuEvent.bind(this);
    this.handleDragLeaveTitle = this.handleDragLeaveTitle.bind(this);
    this.handleDragOverTitle = this.handleDragOverTitle.bind(this);
    this.handleDropTitle = this.handleDropTitle.bind(this);
    this.handleFolderCloseEvent = this.handleFolderCloseEvent.bind(this);
    this.handleFolderDragEndEvent = this.handleFolderDragEndEvent.bind(this);
    this.handleFolderDragStartEvent = this.handleFolderDragStartEvent.bind(this);
    this.handleFolderDropEvent = this.handleFolderDropEvent.bind(this);
    this.handleFolderOpenEvent = this.handleFolderOpenEvent.bind(this);
    this.handleFolderSelectEvent = this.handleFolderSelectEvent.bind(this);
    this.handleGridDragStartEvent = this.handleGridDragStartEvent.bind(this);
    this.handleGridDragEndEvent = this.handleGridDragEndEvent.bind(this);
  }

  /**
   * Initialize event listeners.
   */
  initEventHandlers() {
    document.addEventListener('passbolt.resources.drag-start', this.handleGridDragStartEvent);
    document.addEventListener('passbolt.resources.drag-end', this.handleGridDragEndEvent);
  }

  /**
   * Handle when the user opens a folder.
   * @param {ReactEvent} event The event
   * @param {Object} folder The open folder
   */
  handleFolderCloseEvent(event, folder) {
    const openFolders = this.state.openFolders;
    const folderIndex = openFolders.findIndex(item => item.id === folder.id);
    openFolders.splice(folderIndex, 1);
    this.setState({openFolders});
  }

  /**
   * Handle when the user opens a folder.
   * @param {ReactEvent} event The event
   * @param {Object} folder The open folder
   */
  handleFolderOpenEvent(event, folder) {
    const openFolders = this.state.openFolders;
    openFolders.push(folder);
    this.setState({openFolders});
  }

  /**
   * Handle when the user clicks on the section title.
   */
  handleClickOnTitle() {
    this.props.onSelectRoot();
  }

  /**
   * Handle when the user requests to display a folder item contextual menu.
   * @param {Object} folder The target folder
   * @param {int} top The position to display the contextual menu
   * @param left The position to display the contextual menu
   */
  handleContextualMenuEvent(folder, top, left) {
    this.props.onContextualMenu(folder, top, left, this.elementRef);
  }

  /**
   * Handle fold/unfold root folder icon click
   */
  handleSectionTitleClickCaretEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Handle when the user is not dragging over the section title anymore.
   * @param {ReactEvent} event The event
   */
  handleDragLeaveTitle(event) {
    const draggingOverTitle = false;
    this.setState({draggingOverTitle})
  }

  /**
   * Handle when the user is dragging content over the section title.
   * @param {ReactEvent} event The event
   */
  handleDragOverTitle(event) {
    // If you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events.
    // see: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
    event.preventDefault();

    if (this.state.draggingOverTitle) {
      return;
    }
    const draggingOverTitle = true;
    this.setState({draggingOverTitle})
  }

  /**
   * Handle when the user is dropping the content on the title.
   */
  handleDropTitle() {
    const folders = this.state.draggedItems.folders.map(folder => folder.id);
    const resources = this.state.draggedItems.resources.map(resource => resource.id);
    const folderParentId = null;
    Plugin.send('passbolt.plugin.folders.open-move-confirmation-dialog', {folders, resources, folderParentId});

    // The dragLeave event is not fired when a drop is happening. Cancel the state manually.
    const draggingOverTitle = false;
    this.setState({draggingOverTitle});
  }

  /**
   * Handle when the user stop dragging a folder.
   * @param {ReactEvent} event The event
   */
  handleFolderDragEndEvent(event) {
    const draggedItems = {
      folders: [],
      resources: [],
    };
    const dragging = false;
    this.setState({draggedItems, dragging});
  }

  /**
   * Handle when the user starts dragging a folder.
   * @param {ReactEvent} event The event
   * @param {Object} folder The dragged folder
   */
  handleFolderDragStartEvent(event, folder) {
    const dragging = true;
    const draggedItems = {
      folders: [folder],
      resources: []
    };
    this.setState({dragging, draggedItems});
    event.dataTransfer.setDragImage(this.dragFeedbackElementRef.current, 5, 5);
  }

  /**
   * Handle when the user drop the content on a folder.
   * @param {ReactEvent} event The event
   * @param {Object} folder The drop folder
   */
  handleFolderDropEvent(event, folder) {
    const folders = this.state.draggedItems.folders.map(folder => folder.id);
    const resources = this.state.draggedItems.resources.map(resource => resource.id);
    const folderParentId = folder.id;
    Plugin.send('passbolt.plugin.folders.open-move-confirmation-dialog', {folders, resources, folderParentId});
  }

  /**
   * Handle the user selects a folder from the list.
   * @param {ReactEvent} event The event
   * @param {Object} folder The folder
   */
  handleFolderSelectEvent(event, folder) {
    this.props.onSelect(folder);
  }

  /**
   * Handle when the user is dragging content from the grid.
   * @param {ReactEvent} event The event
   * event.details should be formatted as following:
   * {
   *   array folders The list of dragged folders
   *   array resources The list of dragged resources
   * }
   */
  handleGridDragStartEvent(event) {
    const draggedItems = event.detail;
    this.setState({draggedItems});
  }

  /**
   * Handle when the user stops dragging content from the grid.
   */
  handleGridDragEndEvent() {
    const draggedItems = {
      folders: [],
      resources: []
    };
    this.setState({draggedItems});
  }

  /**
   * Open the tree until a given folder
   * @param {object} folder The folder to scroll to
   */
  openFolderTree(folder) {
    let openFolders = this.state.openFolders;

    // If the selected folder has a parent. Open it if not yet open.
    if (folder.folder_parent_id) {
      const folderParent = this.props.folders.find(item => item.id === folder.folder_parent_id);
      if (folderParent) {
        openFolders = Array.from(new Set([...openFolders, folderParent]));
        this.setState({openFolders}, () => this.openFolderTree(folderParent));
      }
    }
  }

  /**
   * Check if the user can drag an item.
   * @param {object} item The target item
   */
  canDragItem(item) {
    // The user can always drag an element located at their root.
    if (item.folder_parent_id === null) {
      return true;
    }

    const folderParent = this.props.folders.find(folder => folder.id === item.folder_parent_id);

    // The user can always drag content from a personal folder.
    if (folderParent.personal) {
      return true;
    }

    // The user cannot drag an element if the parent folder is in READ.
    if (folderParent.permission.type < 7) {
      return false;
    }

    // The user cannot move folder in READ ONLY from a shared folder.
    if (item.permission.type < 7) {
      return false;
    }

    return true;
  }

  /**
   * Check if the user can drag all the items they are currently dragging.
   * @param {array} draggedItems The list of dragged items.
   * @returns {boolean}
   */
  canDragItems(draggedItems) {
    const draggedFolders = draggedItems.folders;
    let canDragItems = draggedFolders.reduce((accumulator, folder) => {
      return accumulator && this.canDragItem(folder);
    }, true);

    const draggedResources = draggedItems.resources;
    canDragItems = canDragItems && draggedResources.reduce((accumulator, folder) => {
      return accumulator && this.canDragItem(folder);
    }, true);

    return canDragItems;
  }

  /**
   * Render the drag feedback
   * @returns {JSX}
   */
  renderDragFeedback() {
    let error = false;
    let dragFeedbackText = "";
    if (this.state.dragging) {
      const canDrag = this.canDragItems(this.state.draggedItems);
      if (canDrag) {
        dragFeedbackText = this.state.draggedItems.folders[0].name;
      } else {
        error = true;
        dragFeedbackText = "You are not allowed to move this content";
      }
    }

    // We display the drag feedback element even if there is no drag event happening.
    // The start drag event can start using the element before the render is completely rendered, not sure the waiting
    // the status to be updated will be sufficient.
    return (
      <div ref={this.dragFeedbackElementRef} className="drag-and-drop">
        {error &&
        <Icon name="ban"/>
        }
        <span className={`message ${error ? "not-allowed" : ""}`}>{dragFeedbackText}</span>
      </div>
    );
  }

  /**
   * Check if the component is loading.
   * @returns {boolean}
   */
  isLoading() {
    return this.props.folders === null;
  }

  /**
   * Sort a list of folders alphabetically
   * @param {array} folders The list of folders to sort
   */
  sortFoldersAlphabetically(folders) {
    folders.sort((folderA, folderB) => {
      const folderAName = folderA.name.toLowerCase();
      const folderBName = folderB.name.toLowerCase();

      if (folderAName < folderBName) {
        return -1;
      } else if (folderAName > folderBName) {
        return 1;
      }

      return 0;
    });
  }

  /**
   * Get the folders that are at the root of the user.
   * @returns {array}
   */
  getRootFolders() {
    let folders = [];
    if (!this.isLoading()) {
      folders = this.props.folders.filter(folder => {
        return folder.folder_parent_id === ROOT;
      });
    }

    this.sortFoldersAlphabetically(folders);

    return folders;
  }

  /**
   * Check if the user is currently dragging content.
   * @returns {number}
   */
  isDragging() {
    return this.state.draggedItems.folders.length || this.state.draggedItems.resources.length;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isLoading = this.isLoading();
    const isOpen = this.state.open;
    const rootFolders = this.getRootFolders();
    const isDragging = this.isDragging();
    let showDropFocus = false;
    let disabled = false;

    if (isDragging && this.state.draggingOverTitle) {
      const canDragItems = this.canDragItems(this.state.draggedItems);
      if (canDragItems) {
        showDropFocus = true;
      } else {
        // Disabled the drop area in order to avoid the drop event to be fired when the user cannot drop content on the root.
        disabled = true;
      }
    }

    return (
      <div ref={this.elementRef} className="folders navigation first accordion">
        {this.renderDragFeedback()}
        <div className="accordion-header1">
          <div className={`${isOpen ? "open" : "close"} node root`}>
            <div className={`row title ${showDropFocus ? "drop-focus" : ""} ${disabled ? "disabled" : ""}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <h3>
                    <span className="folders-label">
                      {!isLoading &&
                      <Fragment>
                        {isOpen &&
                        <Icon name="caret-down" onClick={() => this.handleSectionTitleClickCaretEvent()}/>
                        }
                        {!isOpen &&
                        <Icon name="caret-right" onClick={() => this.handleSectionTitleClickCaretEvent()}/>
                        }
                      </Fragment>
                      }
                      <span href="demo/LU_folders.php"
                        onDragOver={this.handleDragOverTitle}
                        onDragLeave={this.handleDragLeaveTitle}
                        onDrop={this.handleDropTitle}
                        onClick={this.handleClickOnTitle}
                      >Folders</span>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isLoading && isOpen &&
        <ul className="folders-tree ">
          {rootFolders.map(folder => {
            return <FoldersTreeItem
              key={`folders-list-${folder.id}`}
              draggedItems={this.state.draggedItems}
              folder={folder}
              folders={this.props.folders}
              isDragging={isDragging}
              onClose={this.handleFolderCloseEvent}
              onContextualMenu={this.handleContextualMenuEvent}
              onDragEnd={this.handleFolderDragEndEvent}
              onDragStart={this.handleFolderDragStartEvent}
              onDrop={this.handleFolderDropEvent}
              onOpen={this.handleFolderOpenEvent}
              openFolders={this.state.openFolders}
              onSelect={this.handleFolderSelectEvent}
              selectedFolder={this.props.selectedFolder}/>;
          })}
        </ul>
        }
      </div>
    );
  }
}

FoldersTree.propTypes = {
  selectedFolder: PropTypes.object,
  folders: PropTypes.array,
  onContextualMenu: PropTypes.func,
  onSelect: PropTypes.func,
  onSelectRoot: PropTypes.func
};

export default FoldersTree;
