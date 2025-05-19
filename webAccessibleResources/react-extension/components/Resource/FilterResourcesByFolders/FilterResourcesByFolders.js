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
import FilterResourcesByFoldersItem from "./FilterResourcesByFoldersItem";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withRouter} from "react-router-dom";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import FilterResourcesByRootFolderContextualMenu from "./FilterResourcesByRootFolderContextualMenu";
import {withContextualMenu} from "../../../contexts/ContextualMenuContext";
import PropTypes from "prop-types";
import {withDialog} from "../../../contexts/DialogContext";
import ReactList from "react-list";
import {Trans, withTranslation} from "react-i18next";
import {withDrag} from "../../../contexts/DragContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import MoreHorizontalSVG from "../../../../img/svg/more_horizontal.svg";
import CabinetSVG from "../../../../img/svg/cabinet.svg";
import SpinnerSVG from "../../../../img/svg/spinner.svg";
import memoize from "memoize-one";

// Root virtual folder identifier.
const ROOT = null;

class FilterResourcesByFolders extends React.Component {
  /**
   * Constructor
   * Initialize state and bind methods
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
    this.createRefs();
  }

  /**
   * Return default state
   * @returns {Object} default state
   */
  getDefaultState() {
    return {
      draggingOverTitle: false,
      draggingOverTitleSince: null,
      open: true,
      moreMenuOpen: false,
      folderIdsOpened: []
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleCloseMoreMenu = this.handleCloseMoreMenu.bind(this);
    this.handleClickOnTitle = this.handleClickOnTitle.bind(this);
    this.handleTitleContextualMenuEvent = this.handleTitleContextualMenuEvent.bind(this);
    this.handleDragLeaveTitle = this.handleDragLeaveTitle.bind(this);
    this.handleDragOverTitle = this.handleDragOverTitle.bind(this);
    this.handleDropTitle = this.handleDropTitle.bind(this);
    this.handleTitleMoreClickEvent = this.handleTitleMoreClickEvent.bind(this);
    this.handleToggleOpenFolder = this.handleToggleOpenFolder.bind(this);
    this.handleToggleCloseFolder = this.handleToggleCloseFolder.bind(this);
    this.handleFolderToDisplay = this.handleFolderToDisplay.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.folderTreeRef = React.createRef();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    if (this.props.match.params.filterByFolderId) {
      // Add folder parent id that should be open
      this.addParentFolderIdsToBeOpen(this.props.match.params.filterByFolderId);
    }
  }

  /**
   * Component did update
   * @param prevProps The previous props
   */
  componentDidUpdate(prevProps) {
    const folderId = this.props.match.params.filterByFolderId;
    const hasFolderRouteChange = folderId !== prevProps.match.params.filterByFolderId;
    if (hasFolderRouteChange && folderId) {
      // Add folder id and parent id that should be open
      this.addParentFolderIdsToBeOpen(folderId);
    }
  }

  /**
   * Handles the initial folder scroll ( with a specific manual resource url /folder/view/:id )
   * @param {array<object>} folders
   */
  handleFolderScroll(folders) {
    const folderToScroll = this.props.resourceWorkspaceContext.scrollTo.folder;
    const hasNotEmptyRange = this.folderTreeRef.current?.getVisibleRange().some(value => value);
    if (folderToScroll && hasNotEmptyRange) {
      this.scrollTo(folders,  this.props.match.params.filterByFolderId);
      this.props.resourceWorkspaceContext.onFolderScrolled();
    }
  }

  /**
   * Triggers a scroll of the folder tree to a folder given its id, if the folder is not visible yet.
   * @param {array<object>} folders
   * @param {string} folderId
   */
  scrollTo(folders, folderId) {
    const folderIndex = folders.findIndex(folder => folder.id === folderId);
    const [visibleStartIndex, visibleEndIndex] = this.folderTreeRef.current.getVisibleRange();
    const isInvisible = folderIndex < visibleStartIndex || folderIndex > visibleEndIndex;
    if (isInvisible) {
      this.folderTreeRef.current.scrollTo(folderIndex);
    }
  }

  /**
   * Get folders to display from context folders and the state folderIdsOpened.
   * @param {array<Object>} folders The folders to ensure the memoized
   * @param {array<string>} folderIdsOpened The folder ids opened to ensure the memoized
   *   function is only triggered when the folders are updated or opened.
   * @return {array<Object>} the folders to display
   */
  getFoldersToDisplay = memoize((folders, folderIdsOpened) => this.handleFolderToDisplay(folders, folderIdsOpened));

  /**
   * Handle folder to display according to te context folders and the state for with folder ids opened
   * @param {array<Object>} folders The folders from context
   * @param {array<string>} folderIdsOpened The folder ids that is opened
   * @returns {*[]} The folders array to display
   */
  handleFolderToDisplay(folders, folderIdsOpened) {
    const foldersByParentIdOrderedByDepth = this.filterFoldersByRootAndFoldersOpened(folders, folderIdsOpened);
    return this.sortAndFlatFoldersByDepth(foldersByParentIdOrderedByDepth);
  }

  /**
   * filter folders by root and folders opened
   * @param {array<object>} folders
   * @param {array<string>} folderIdsOpened
   * @returns {array<object>} An array ordered by depth of folders containing object with parent folder id as a key and an array of folders as value
   * (example of result: [{null: [folderC, folderA, folderE]}, {folderA.parent_folder_id: [folderK, folderG], ...}, ...]
   */
  filterFoldersByRootAndFoldersOpened(folders, folderIdsOpened) {
    // Store each array of folders by depth rang into an object with parent id as a key and an array of folders as value (example: root folder 0, subfolder 1, ...)
    const foldersByParentIdOrderedByDepth = [{}];
    // Loop through each folder form the context and set the foldersByParentIdOrderedByDepth
    folders?.forEach(folder => {
      if (folder.folder_parent_id === ROOT) {
        // Initialize or get the depth 0 of root folders to display
        (foldersByParentIdOrderedByDepth[0][folder.folder_parent_id] = foldersByParentIdOrderedByDepth[0][folder.folder_parent_id] || []).push(folder);
      } else if (folderIdsOpened.includes(folder.folder_parent_id)) {
        const depth = this.props.context.getHierarchyFolderCache(folder.id).length;
        // Initialize or get the depth of folders to display
        foldersByParentIdOrderedByDepth[depth] = foldersByParentIdOrderedByDepth[depth] || {};
        // Initialize or get the subfolders of a parent to display and add the folder
        (foldersByParentIdOrderedByDepth[depth][folder.folder_parent_id] = foldersByParentIdOrderedByDepth[depth][folder.folder_parent_id] || []).push(folder);
      }
    });
    return foldersByParentIdOrderedByDepth;
  }

  /**
   * Sort and flat array of folders by depth
   * @param {array<object>} foldersByParentIdOrderedByDepth
   * @returns {*[]} Array of folders sorted by depth
   */
  sortAndFlatFoldersByDepth(foldersByParentIdOrderedByDepth) {
    // The folders array to display
    const foldersToDisplay = [];
    // Loop through each depth corresponding of the order of the array
    foldersByParentIdOrderedByDepth?.forEach(foldersByParent => {
      // Get the key (folder parent id) and the value (array of folders)
      for (const [key, value] of Object.entries(foldersByParent)) {
        // Get the index of the folder parent id
        const folderParentIndex = foldersToDisplay.findIndex(folder => folder.id === key);
        // Sort folders alphabetically
        this.sortFoldersAlphabetically(value);
        // Insert folders into the right position
        foldersToDisplay.splice(folderParentIndex + 1, 0, ...value);
      }
    });
    return foldersToDisplay;
  }

  /**
   * Add parent folder ids in te state folderIdsOpened
   * @param folderId The folder id selected
   */
  addParentFolderIdsToBeOpen(folderId) {
    const folderIdsOpened = [...this.state.folderIdsOpened];
    const selectedFolder = this.props.context.folders?.find(folder => folder.id === folderId);
    // If the selected folder has a parent. Open it if not yet open.
    let folderParentId = selectedFolder?.folder_parent_id;
    // loop until folder parent id is null
    while (folderParentId) {
      const parentFolder = this.props.context.folders.find(folder => folder.id === folderParentId);
      if (!folderIdsOpened.includes(parentFolder.id)) {
        folderIdsOpened.push(parentFolder.id);
      }
      folderParentId = parentFolder.folder_parent_id;
    }
    this.setState({folderIdsOpened});
  }

  /**
   * Close the create menu
   */
  handleCloseMoreMenu() {
    this.setState({moreMenuOpen: false});
  }

  /**
   * Handle when the user clicks on the section title.
   */
  handleClickOnTitle() {
    const filter = {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER};
    this.props.history.push(`/app/passwords`, {filter});
  }

  /**
   * Returns true if the All Items shortcut is currently selected
   */
  get isSelected() {
    return this.props.resourceWorkspaceContext.filter.type === ResourceWorkspaceFilterTypes.ROOT_FOLDER;
  }

  /**
   * Handle when the user requests to display the contextual menu on the root folder.
   * @param {ReactEvent} event The event
   */
  handleTitleContextualMenuEvent(event) {
    // Prevent the browser contextual menu to pop up.
    event.preventDefault();

    const top = event.pageY;
    const left = event.pageX;
    const contextualMenuProps = {left, top};
    this.props.contextualMenuContext.show(FilterResourcesByRootFolderContextualMenu, contextualMenuProps);
  }

  /**
   * Handle when the user requests to display the contextual menu on the root folder.
   * @param {ReactEvent} event The event
   */
  handleTitleMoreClickEvent(event) {
    const moreMenuOpen = !this.state.moreMenuOpen;
    this.setState({moreMenuOpen});
    if (moreMenuOpen) {
      const {left, top} = event.currentTarget.getBoundingClientRect();
      const onBeforeHide = this.handleCloseMoreMenu;
      const contextualMenuProps = {left, top: top + 19, className: "right", onBeforeHide};
      this.props.contextualMenuContext.show(FilterResourcesByRootFolderContextualMenu, contextualMenuProps);
    }
  }

  /**
   * Handle toggle open folder
   * Add the folder id to the state folderIdsOpened
   * @param folderId
   */
  handleToggleOpenFolder(folderId) {
    if (!this.state.folderIdsOpened.includes(folderId)) {
      const folderIdsOpened = [...this.state.folderIdsOpened, folderId];
      this.setState({folderIdsOpened});
    }
  }

  /**
   * Handle toggle close folder
   * Remove the child folder ids from the state folderIdsOpened
   * @param folderId
   */
  handleToggleCloseFolder(folderId) {
    const foldersToClose = [folderId];
    this.props.context.folders.forEach(folder => {
      if (foldersToClose.includes(folder.folder_parent_id)) {
        foldersToClose.push(folder.id);
      }
    });
    const folderIdsOpened = this.state.folderIdsOpened.filter(folderId => !foldersToClose.includes(folderId));
    this.setState({folderIdsOpened});
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
   */
  handleDragLeaveTitle() {
    const draggingOverTitle = false;
    const draggingOverTitleSince = null;
    this.setState({draggingOverTitle, draggingOverTitleSince});
  }

  /**
   * Handle when the user is dragging content over the section title.
   * @param {ReactEvent} event The event
   */
  handleDragOverTitle(event) {
    /*
     * If you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events.
     * see: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
     */
    event.preventDefault();

    if (this.state.draggingOverTitle) {
      this.openTitleOnLongDragOver();
      return;
    }
    const draggingOverTitle = true;
    const draggingOverTitleSince = Date.now();
    this.setState({draggingOverTitle, draggingOverTitleSince});
  }

  /**
   * Open the root folder when the user is dragging for a defined period on it.
   * @param {ReactEvent} event The event
   */
  openTitleOnLongDragOver() {
    const period = 2000;

    // If already open, leave.
    if (!this.state.open) {
      const now = Date.now();
      if (now - this.state.draggingOverTitleSince > period) {
        this.handleSectionTitleClickCaretEvent();
      }
    }
  }

  /**
   * Handle when the user is dropping the content on the title.
   */
  handleDropTitle() {
    const folders = this.props.dragContext.draggedItems.folders.map(folder => folder.id);
    const resources = this.props.dragContext.draggedItems.resources.map(resource => resource.id);
    if (folders?.length > 0) {
      this.props.context.port.request("passbolt.folders.move-by-id", folders[0], null);
    } else if (resources?.length > 0) {
      this.props.context.port.request("passbolt.resources.move-by-ids", resources, null);
    }

    // The dragLeave event is not fired when a drop is happening. Cancel the state manually.
    const draggingOverTitle = false;
    this.setState({draggingOverTitle});
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
    canDragItems = canDragItems && draggedResources.reduce((accumulator, folder) => accumulator && this.canDragItem(folder), true);

    return canDragItems;
  }

  /**
   * Check if the component is loading.
   * @returns {boolean}
   */
  isLoading() {
    return this.props.context.folders === null;
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
   * Check if the user is currently dragging content.
   * @returns {boolean}
   */
  isDragging() {
    return this.props.dragContext.dragging;
  }

  /**
   * return dragged items
   * @returns {*}
   */
  get draggedItems() {
    return this.props.dragContext.draggedItems;
  }

  /**
   * Render folder tree for rows
   * @param items
   * @param ref
   * @return {JSX.Element}
   */
  renderFolderTree(items, ref) {
    return <ul ref={ref} className="folders-tree">{items}</ul>;
  }

  /**
   * Render item folder row
   * @param index
   * @param key
   * @param folders
   * @return {JSX.Element}
   */
  renderItem(index, key, folders) {
    const item = folders[index];
    const isOpen = this.state.folderIdsOpened.includes(item.id);

    return <FilterResourcesByFoldersItem
      key={item.id}
      folder={item}
      isOpen={isOpen}
      toggleOpenFolder={this.handleToggleOpenFolder}
      toggleCloseFolder={this.handleToggleCloseFolder}
    />;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const isLoading = this.isLoading();
    const isOpen = this.state.open;
    const folders = this.getFoldersToDisplay(this.props.context.folders, this.state.folderIdsOpened);
    const isDragging = this.isDragging();
    let showDropFocus = false;
    let disabled = false;

    // Handle scroll to the selected folder if needed
    if (this.props.match.params.filterByFolderId) {
      this.handleFolderScroll(folders);
    }

    if (isDragging && this.state.draggingOverTitle) {
      const canDragItems = this.canDragItems(this.draggedItems);
      if (canDragItems) {
        showDropFocus = true;
      } else {
        // Disabled the drop area in order to avoid the drop event to be fired when the user cannot drop content on the root.
        disabled = true;
      }
    }

    return (
      <div className="navigation-secondary-tree navigation-secondary navigation-folders accordion">
        <div className="accordion-header">
          <div className={`${isOpen ? "open" : "close"} node root`}>
            <div className={`row title ${this.isSelected ? "selected" : ""} ${showDropFocus ? "drop-focus" : ""} ${disabled ? "disabled" : ""} ${this.state.moreMenuOpen ? "highlight" : ""}`}>
              <div className="main-cell-wrapper">
                <div className="main-cell">
                  <h3>
                    <span className="folders-label">
                      <button type="button" className="link no-border"
                        onDragOver={this.handleDragOverTitle}
                        onDragLeave={this.handleDragLeaveTitle}
                        onDrop={this.handleDropTitle}
                        onClick={this.handleClickOnTitle}
                        onContextMenu={this.handleTitleContextualMenuEvent}>
                        <div className="toggle-folder" onClick={() => this.handleSectionTitleClickCaretEvent()}>
                          {isOpen
                            ? <CaretDownSVG />
                            : <CaretRightSVG />
                          }
                        </div>
                        <CabinetSVG />
                        <Trans>My workspace</Trans>
                      </button>
                    </span>
                  </h3>
                </div>
              </div>
              <div className="dropdown right-cell more-ctrl">
                <button type="button" className={`button-transparent inline-menu-horizontal ${this.state.moreMenuOpen ? "open" : ""}`} onClick={this.handleTitleMoreClickEvent}>
                  <MoreHorizontalSVG />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-content">
          {isLoading &&
            <div className="processing-wrapper">
              <SpinnerSVG/>
              <span className="processing-text"><Trans>Retrieving folders</Trans></span>
            </div>
          }
          {!isLoading && isOpen && folders.length === 0 &&
            <em className="empty-content"><Trans>empty</Trans></em>
          }
          {!isLoading && isOpen && folders.length > 0 &&
            <ReactList
              itemRenderer={(index, key) => this.renderItem(index, key, folders)}
              itemsRenderer={(items, ref) => this.renderFolderTree(items, ref)}
              length={folders.length}
              pageSize={30}
              minSize={30}
              type="uniform"
              usePosition={true}
              ref={this.folderTreeRef}>
            </ReactList>
          }
        </div>
      </div>
    );
  }
}

FilterResourcesByFolders.propTypes = {
  context: PropTypes.any, // The app context
  contextualMenuContext: PropTypes.any, // The contextual menu context
  history: PropTypes.object,
  match: PropTypes.object,
  resourceWorkspaceContext: PropTypes.object,
  dialogContext: PropTypes.any,
  dragContext: PropTypes.any,
};

export default withRouter(withDialog(withContextualMenu(withResourceWorkspace(withAppContext(withDrag(withTranslation("common")(FilterResourcesByFolders)))))));
