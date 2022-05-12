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
import {withContextualMenu} from "../../../contexts/ContextualMenuContext";
import FilterResourcesByFoldersItemContextualMenu from "./FilterResourcesByFoldersItemContextualMenu";
import {withAppContext} from "../../../contexts/AppContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withDrag} from "../../../contexts/DragContext";
import DisplayDragFolderItem from "./DisplayDragFolderItem";
import {withRouter} from "react-router-dom";

class FilterResourcesByFoldersItem extends React.Component {
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
      open: false,
      moreMenuOpen: false
    };
  }

  bindCallbacks() {
    this.handleCloseMoreMenu = this.handleCloseMoreMenu.bind(this);
    this.handleToggleOpenFolder = this.handleToggleOpenFolder.bind(this);
    this.handleContextualMenuEvent = this.handleContextualMenuEvent.bind(this);
    this.handleDragEndEvent = this.handleDragEndEvent.bind(this);
    this.handleDragLeaveEvent = this.handleDragLeaveEvent.bind(this);
    this.handleDragOverEvent = this.handleDragOverEvent.bind(this);
    this.handleDragStartEvent = this.handleDragStartEvent.bind(this);
    this.handleDropEvent = this.handleDropEvent.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
  }

  /**
   * Close the create menu
   */
  handleCloseMoreMenu() {
    this.setState({moreMenuOpen: false});
  }

  /**
   * Handle when the user start dragging the folder.
   * @param {ReactEvent} event The event
   */
  handleDragStartEvent(event) {
    event.persist();
    const draggedItems = {
      folders: [this.props.folder],
      resources: []
    };
    this.props.dragContext.onDragStart(event, DisplayDragFolderItem, draggedItems);
  }

  /**
   * Handle when the user click on the folder left caret.
   * Fold/Unfold the folder.
   * @param {ReactEvent} event The event
   */
  handleToggleOpenFolder(event) {
    /*
     * Prevent the component to select the folder.
     * @todo This default behavior should not be allowed as it will break other behavior, such as closing a contextual menu closing.
     */
    event.stopPropagation();
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Open the tree until a given folder
   * @param {object} selectedFolderId The folder id to scroll to
   */
  openFolderParentTree(selectedFolderId) {
    const selectedFolder = this.props.context.folders.find(folder => folder.id === selectedFolderId);
    // If the selected folder has a parent. Open it if not yet open.
    if (selectedFolder.folder_parent_id) {
      if (selectedFolder.folder_parent_id === this.props.folder.id) {
        this.setState({open: true});
      } else {
        this.openFolderParentTree(selectedFolder.folder_parent_id);
      }
    }
  }

  /**
   * Check if the current folder is open.
   * @return {boolean}
   */
  isOpen() {
    return this.state.open;
  }

  /**
   * Handle when the user right clicks on a folder name.
   * @param {ReactEvent} event The event
   */
  handleContextualMenuEvent(event) {
    // Prevent the browser contextual menu to pop up.
    event.preventDefault();

    const top = event.pageY;
    const left = event.pageX;
    const folder = this.props.folder;
    const contextualMenuProps = {folder, left, top};
    this.props.contextualMenuContext.show(FilterResourcesByFoldersItemContextualMenu, contextualMenuProps);
  }

  /**
   * Handle when the user clicks on the more button.
   * @param {ReactEvent} event The event
   */
  handleMoreClickEvent(event) {
    const moreMenuOpen = !this.state.moreMenuOpen;
    this.setState({moreMenuOpen});
    if (moreMenuOpen) {
      const {left, top} = event.currentTarget.getBoundingClientRect();
      const folder = this.props.folder;
      const onBeforeHide = this.handleCloseMoreMenu;
      const contextualMenuProps = {folder, left, top: top + 18, className: "right", onBeforeHide};
      this.props.contextualMenuContext.show(FilterResourcesByFoldersItemContextualMenu, contextualMenuProps);
    }
  }

  /**
   * Handle when the user stop dragging content.
   * @param {ReactEvent} event The event
   */
  handleDragEndEvent() {
    this.props.dragContext.onDragEnd();
  }

  /**
   * Handle when the user is not dragging over this component anymore.
   */
  handleDragLeaveEvent() {
    const draggingOver = false;
    const draggingOverSince = null;
    this.setState({draggingOver, draggingOverSince});
  }

  /**
   * Handle when the user is dragging over this component.
   * @param {ReactEvent} event The event
   */
  handleDragOverEvent(event) {
    /*
     * If you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events.
     * see: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
     */
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
    const open = this.isOpen();

    // If already open, leave.
    if (!open) {
      const now = Date.now();
      if (now - this.state.draggingOverSince > period) {
        this.handleToggleOpenFolder(event);
      }
    }
  }

  /**
   * Handle when the user drop content on this component.
   * @param {ReactEvent} event The event
   */
  handleDropEvent() {
    // The user cannot drop the dragged content on a dragged item.
    const folders = this.props.dragContext.draggedItems.folders.map(folder => folder.id);
    const resources = this.props.dragContext.draggedItems.resources.map(resource => resource.id);
    const folderParentId = this.props.folder.id;
    const isDroppingOnDraggedItem = this.draggedItems.folders.some(item => item.id === folderParentId);
    if (!isDroppingOnDraggedItem) {
      this.props.context.port.request("passbolt.folders.open-move-confirmation-dialog", {folders, resources, folderParentId});
    }

    // The dragLeave event is not fired when a drop is happening. Cancel the state manually.
    const draggingOver = false;
    this.setState({draggingOver});
  }

  /**
   * Handle the user selects a folder from the list.
   */
  handleSelectEvent() {
    this.props.history.push(`/app/folders/view/${this.props.folder.id}`);
  }

  /**
   * Check if the folder associated to this component is selected.
   * @returns {boolean}
   */
  isSelected() {
    const filter = this.props.resourceWorkspaceContext.filter;
    const hasSelectedFolder = filter.type === ResourceWorkspaceFilterTypes.FOLDER && filter.payload.folder;
    if (!hasSelectedFolder) {
      return false;
    }

    return filter.payload.folder.id === this.props.folder.id;
  }

  /**
   * Check if a folder is a child of any of the given folders.
   * @param {object} folder The target folder to check if it is a child
   * @param {array} folders The folders to check for
   */
  isChildOfAny(folder, folders) {
    for (const i in folders) {
      if (folder.folder_parent_id === folders[i].id) {
        return true;
      }
    }

    if (folder.folder_parent_id !== null) {
      const folderParent = this.props.context.folders.find(item => item.id === folder.folder_parent_id);
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

    const folderParent = this.props.context.folders.find(folder => folder.id === item.folder_parent_id);

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
    let canDragItems = draggedFolders.reduce((accumulator, folder) => accumulator && this.canDragItem(folder), true);

    const draggedResources = draggedItems.resources;
    canDragItems &= draggedResources.reduce((accumulator, folder) => accumulator && this.canDragItem(folder), true);

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
    const draggedFoldersLowestPermission = this.getItemsListLowestPermission(this.draggedItems.folders);
    const draggedResourcesLowestPermission = this.getItemsListLowestPermission(this.draggedItems.resources);

    return draggedFoldersLowestPermission < draggedResourcesLowestPermission ? draggedFoldersLowestPermission : draggedResourcesLowestPermission;
  }

  /**
   * Check if the user can drop the content they are dragging into the folder associated to this component.
   * @returns {boolean}
   */
  canDropInto() {
    if (!this.isDragging()) {
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
    if (this.isChildOfAny(this.props.folder, this.draggedItems.folders)) {
      return false;
    }

    // Cannot move a folder into itself.
    for (const i in this.draggedItems.folders) {
      if (this.props.folder.id === this.draggedItems.folders[i].id) {
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
    if (this.isDragging()) {
      return this.draggedItems.folders.some(folder => folder.id === this.props.folder.id);
    }
    return false;
  }

  /**
   * Check if the component is disabled.
   * @returns {boolean}
   */
  isDisabled() {
    /*
     * If the user is dragging content, disable the component if:
     * - The user is not allowed to drag any of dragged items;
     * - The user is not allowed to drop content in the folder associated to this component.
     */
    if (this.isDragging()) {
      const canDragItems = this.canDragItems(this.draggedItems);
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
    const folders = this.props.context.folders.filter(folder => folder.folder_parent_id === this.props.folder.id);
    this.sortFoldersAlphabetically(folders);

    return folders;
  }

  /**
   * return dragged items
   * @returns {*}
   */
  get draggedItems() {
    return this.props.dragContext.draggedItems;
  }

  /**
   * Check if the user is currently dragging content.
   * @returns {boolean}
   */
  isDragging() {
    return this.props.dragContext.dragging;
  }

  /**
   * Render the component
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
      <li
        className={`${isOpen ? "opened" : "closed"} folder-item`}>
        <div className={`row ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""} ${isDragged ? "is-dragged" : ""} ${showDropFocus ? "drop-focus" : ""} ${hasChildren ? "" : "no-child"} ${this.state.moreMenuOpen ? "highlight" : ""}`}
          draggable="true"
          onDrop={this.handleDropEvent}
          onDragOver={this.handleDragOverEvent}
          onDragEnd={this.handleDragEndEvent}
          onDragLeave={this.handleDragLeaveEvent}
          onDragStart={this.handleDragStartEvent}>
          <div className="main-cell-wrapper">
            <div className="main-cell"
              onClick={this.handleSelectEvent}
              onContextMenu={this.handleContextualMenuEvent}>
              <a role="button">
                {hasChildren &&
                <div className="toggle-folder" onClick={this.handleToggleOpenFolder}>
                  {isOpen &&
                  <Icon name="caret-down"/>
                  }
                  {!isOpen &&
                  <Icon name="caret-right"/>
                  }
                </div>
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
            <div className="dropdown right-cell more-ctrl">
              <a className={`button ${this.state.moreMenuOpen ? "open" : ""}`} onClick={this.handleMoreClickEvent}><Icon name="3-dots-h"/></a>
            </div>
          }
        </div>
        {hasChildren && isOpen &&
        <ul className="folders-tree">
          {folderChildren.map(folder => <DecoratedFoldersTreeItem
            key={`folders-tree-${folder.id}`}
            folder={folder}/>)}
        </ul>
        }
      </li>
    );
  }
}

FilterResourcesByFoldersItem.propTypes = {
  context: PropTypes.any, // The app context
  contextualMenuContext: PropTypes.any, // The contextual menu context
  history: PropTypes.object,
  match: PropTypes.object,
  folder: PropTypes.object,
  resourceWorkspaceContext: PropTypes.any,
  dragContext: PropTypes.any,
};

const DecoratedFoldersTreeItem = withRouter(withAppContext(withContextualMenu(withResourceWorkspace(withDrag(FilterResourcesByFoldersItem)))));

export default withRouter(withAppContext(withContextualMenu(withResourceWorkspace(withDrag(FilterResourcesByFoldersItem)))));
