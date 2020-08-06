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
import PropTypes from "prop-types";

class FoldersTreeItem extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Return default state
   * @returns {Object} default state
   */
  getDefaultState() {
    return {
      draggingOver: false,
      draggingOverSince: null,
      open: false
    };
  }

  bindCallbacks() {
    this.handleClickLeftCaretEvent = this.handleClickLeftCaretEvent.bind(this);
    this.handleContextualMenuEvent = this.handleContextualMenuEvent.bind(this);
    this.handleDragEndEvent = this.handleDragEndEvent.bind(this);
    this.handleDragLeaveEvent = this.handleDragLeaveEvent.bind(this);
    this.handleDragOverEvent = this.handleDragOverEvent.bind(this);
    this.handleDragStartEvent = this.handleDragStartEvent.bind(this);
    this.handleDropEvent = this.handleDropEvent.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
  }

  /**
   * Handle when the user start dragging the folder.
   * @param {ReactEvent} event The event
   */
  handleDragStartEvent(event) {
    const dragging = true;
    this.setState({dragging});
    this.props.onDragStart(event, this.props.folder);
  }

  /**
   * Handle when the user click on the folder left caret.
   * Fold/Unfold the folder.
   * @param {ReactEvent} event The event
   */
  handleClickLeftCaretEvent(event) {
    // Stop the propagation to avoid the listener on the parent (select folder) to react to it.
    event.stopPropagation();
    if (this.isOpen()) {
      this.props.onClose(event, this.props.folder);
    } else {
      this.props.onOpen(event, this.props.folder);
    }
  }

  /**
   * Check if the current folder is open.
   * @return {boolean}
   */
  isOpen() {
    return this.props.openFolders.some(folder => folder.id === this.props.folder.id);
  }

  /**
   * Handle when the user click right on the component
   * @param {ReactEvent} event The event
   */
  handleContextualMenuEvent(event) {
    // Prevent the browser contextual menu to pop up.
    event.preventDefault();
    event.stopPropagation();

    const top = event.pageY;
    const left = event.pageX;
    this.props.onContextualMenu(this.props.folder, top, left);
  }

  /**
   * Handle when the user stop dragging content.
   * @param {ReactEvent} event The event
   */
  handleDragEndEvent(event) {
    this.props.onDragEnd(event);
  }

  /**
   * Handle when the user is not dragging over this component anymore.
   * @param {ReactEvent} event The event
   */
  handleDragLeaveEvent(event) {
    const draggingOver = false;
    const draggingOverSince = null;
    this.setState({draggingOver, draggingOverSince});
  }

  /**
   * Handle when the user is dragging over this component.
   * @param {ReactEvent} event The event
   */
  handleDragOverEvent(event) {
    // If you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events.
    // see: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
    event.preventDefault();

    if (this.state.draggingOver) {
      this.openOnLongDragOver(event);
      return;
    }

    const draggingOver = true;
    const draggingOverSince = Date.now();
    this.setState({draggingOver, draggingOverSince});
  }

  /**
   * Open the folder when the user is dragging for a defined period on a folder.
   * @param {ReactEvent} event The event
   */
  openOnLongDragOver(event) {
    const period = 2000;
    let open = this.isOpen();

    // If already open, leave.
    if (!open) {
      const now = Date.now();
      if (now - this.state.draggingOverSince > period) {
        this.props.onOpen(event, this.props.folder);
      }
    }
  }

  /**
   * Handle when the user drop content on this component.
   * @param {ReactEvent} event The event
   */
  handleDropEvent(event) {
    this.props.onDrop(event, this.props.folder);

    // The dragLeave event is not fired when a drop is happening. Cancel the state manually.
    const draggingOver = false;
    this.setState({draggingOver});
  }

  /**
   * Handle when this component is selected.
   * @param {ReactEvent} event The event
   */
  handleSelectEvent(event) {
    this.props.onSelect(event, this.props.folder);
  }

  /**
   * Check if the folder associated to this component is selected.
   * @returns {boolean}
   */
  isSelected() {
    if (!this.props.selectedFolder) {
      return false;
    }

    return this.props.selectedFolder.id === this.props.folder.id;
  }

  /**
   * Check if a folder is a child of any of the given folders.
   * @param {object} folder The target folder to check if it is a child
   * @param {array} folders The folders to check for
   */
  isChildOfAny(folder, folders) {
    for (let i in folders) {
      if (folder.folder_parent_id === folders[i].id) {
        return true;
      }
    }

    if (folder.folder_parent_id !== null) {
      const folderParent = this.props.folders.find(item => item.id === folder.folder_parent_id);
      return this.isChildOfAny(folderParent, folders);
    }

    return false;
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
    canDragItems &= draggedResources.reduce((accumulator, folder) => {
      return accumulator && this.canDragItem(folder);
    }, true);

    return canDragItems;
  }

  /**
   * Get the lowest permissions among a list of items
   * @param {array} items The list of items to look into
   * @returns {int}
   */
  getItemsListLowestPermission(items) {
    return items.reduce((accumulator, draggedItem) => {
      if (draggedItem.permission.type < accumulator) {
        accumulator = draggedItem.permission.type;
      }
      return accumulator;
    }, 15);
  }

  /**
   * Get the lowest permissions among all the dragged items.
   * @returns {int}
   */
  getDraggedItemsLowestPermission() {
    const draggedFoldersLowestPermission = this.getItemsListLowestPermission(this.props.draggedItems.folders);
    const draggedResourcesLowestPermission = this.getItemsListLowestPermission(this.props.draggedItems.resources);

    return draggedFoldersLowestPermission < draggedResourcesLowestPermission ? draggedFoldersLowestPermission : draggedResourcesLowestPermission;
  }

  /**
   * Check if the user can drop the content they are dragging into the folder associated to this component.
   * @returns {boolean}
   */
  canDropInto() {
    if (!this.props.isDragging) {
      return false;
    }

    // Cannot move content into a folder for with the user has insufficient permission (<UPDATE)
    if (this.props.folder.permission.type < 7) {
      return false;
    }

    // Cannot move a content in READ ONLY into a shared folder.
    if (!this.props.folder.personal) {
      const draggedItemsLowestPermission = this.getDraggedItemsLowestPermission();
      if (draggedItemsLowestPermission < 7) {
        return false;
      }
    }

    // Cannot move a folder into one of its own children.
    if (this.isChildOfAny(this.props.folder, this.props.draggedItems.folders)) {
      return false;
    }

    // Cannot move a folder into itself.
    for (let i in this.props.draggedItems.folders) {
      if (this.props.folder.id === this.props.draggedItems.folders[i].id) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check if the component is dragged.
   * @returns {boolean}
   */
  isDragged() {
    for (let i in this.props.draggedItems.folders) {
      if (this.props.folder.id === this.props.draggedItems.folders[i].id) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if the component is disabled.
   * @returns {boolean}
   */
  isDisabled() {
    // If the user is dragging content, disable the component if:
    // - The user is not allowed to drag any of dragged items;
    // - The user is not allowed to drop content in the folder associated to this component.
    if (this.props.isDragging) {
      const canDragItems = this.canDragItems(this.props.draggedItems);
      if (!canDragItems) {
        return true;
      }
      const canDropInto = this.canDropInto();
      if (!canDropInto) {
        return true;
      }
    }

    return false;
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
   * Get the folder children.
   * @returns {array}
   */
  getChildrenFolders() {
    const folders = this.props.folders.filter(folder => folder.folder_parent_id === this.props.folder.id)
    this.sortFoldersAlphabetically(folders);

    return folders;
  }

  /**
   * Render a folder
   * @returns {JSX}
   */
  render() {
    const folderChildren = this.getChildrenFolders();
    const hasChildren = folderChildren.length > 0;
    const isSelected = this.isSelected();
    const isDisabled = this.isDisabled();
    const isDragged = this.isDragged();
    const isOpen = this.isOpen();
    const canDropInto = this.canDropInto();
    const showDropFocus = this.state.draggingOver && canDropInto;

    return (
      <li className={`${isOpen ? "opened" : "closed"} folder-item`}>
        <div className={`row ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""} ${isDragged ? "is-dragged" : ""} ${showDropFocus ? "drop-focus" : ""}`}
          draggable="true"
          onClick={this.handleSelectEvent}
          onContextMenu={this.handleContextualMenuEvent}
          onDrop={this.handleDropEvent}
          onDragOver={this.handleDragOverEvent}
          onDragEnd={this.handleDragEndEvent}
          onDragLeave={this.handleDragLeaveEvent}
          onDragStart={this.handleDragStartEvent}>
          <div className="main-cell-wrapper">
            <div className="main-cell">
              <a>
                {hasChildren &&
                <Fragment>
                  {isOpen &&
                  <Icon name="caret-down" onClick={this.handleClickLeftCaretEvent}/>
                  }
                  {!isOpen &&
                  <Icon name="caret-right" onClick={this.handleClickLeftCaretEvent}/>
                  }
                </Fragment>
                }
                {!this.props.folder.personal &&
                <Icon name="folder-shared"/>
                }
                {this.props.folder.personal &&
                <Icon name="folder"/>
                }
                <span title={this.props.folder.name} className="folder-name">{this.props.folder.name}</span>
              </a>
            </div>
          </div>
          {!isDragged &&
          <div className="right-cell more-ctrl">
            <a onClick={this.handleContextualMenuEvent}><span>more</span></a>
          </div>
          }
        </div>
        {hasChildren && isOpen &&
        <ul className="folders-tree">
          {folderChildren.map(folder => {
            return <FoldersTreeItem
              key={`folders-tree-${folder.id}`}
              draggedItems={this.props.draggedItems}
              folder={folder}
              folders={this.props.folders}
              isDragging={this.props.isDragging}
              onClose={this.props.onClose}
              onContextualMenu={this.props.onContextualMenu}
              onDragEnd={this.props.onDragEnd}
              onDragStart={this.props.onDragStart}
              onDrop={this.props.onDrop}
              onOpen={this.props.onOpen}
              onSelect={this.props.onSelect}
              openFolders={this.props.openFolders}
              selectedFolder={this.props.selectedFolder}/>;
          })}
        </ul>
        }
      </li>
    );
  }
}

FoldersTreeItem.propTypes = {
  draggedItems: PropTypes.object,
  folders: PropTypes.array,
  folder: PropTypes.object,
  isDragging: PropTypes.bool,
  onClose: PropTypes.func,
  onContextualMenu: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onOpen: PropTypes.func,
  onSelect: PropTypes.func,
  openFolders: PropTypes.array,
  selectedFolder: PropTypes.object,
};

export default FoldersTreeItem;
