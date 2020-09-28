/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SARL (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SARL (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */
import PropTypes from "prop-types";
import React from "react";
import ReactList from "react-list";
import moment from 'moment/moment';
import 'moment-timezone/builds/moment-timezone-with-data-2012-2022';
import AppContext from "../../../contexts/AppContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import debounce from "debounce-promise";
import Icon from "../../Common/Icons/Icon";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withRouter} from "react-router-dom";


/**
 * This component allows to display the filtered resources into a grid
 */
class Grid extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.handleFavoriteClickDebounced = debounce(this.handleFavoriteUpdate, 200);
    this.createRefs();
  }

  /**
   * Returns the component default state
   */
  getDefaultState() {
    return {
      resources: [], // The current list of resources to display
      selectStrategy: "",
    };
  }

  /**
   * Initialize the component event handlers
   */
  initEventHandlers() {
    this.handleSelectAllChange = this.handleSelectAllChange.bind(this);
    this.handleResourceSelected = this.handleResourceSelected.bind(this);
    this.handleResourceRightClick = this.handleResourceRightClick.bind(this);
    this.handleCheckboxWrapperClick = this.handleCheckboxWrapperClick.bind(this);
    this.handleCopyPasswordClick = this.handleCopyPasswordClick.bind(this);
    this.handleCopyUsernameClick = this.handleCopyUsernameClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleSortByColumnClick = this.handleSortByColumnClick.bind(this);
    this.handleGoToUrlClick = this.handleGoToUrlClick.bind(this);
  }

  /**
   * Whenever the component has been updated
   */
  componentDidUpdate() {
    this.handleInitialResourceScroll();
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.listRef = React.createRef();
    this.dragFeedbackElement = React.createRef();
  }

  /**
   * Handle the All resources selection
   * @param event The DOM event
   */
  handleSelectAllChange(event) {
    const checked = event.target.checked;
    const operationName = checked ? "all" : "none";
    this.props.resourceWorkspaceContext.onResourceSelected[operationName]();
  }

  /**
   * Handle the resource selection
   * @param event The DOM event
   * @param resource The selected resource
   */
  async handleResourceSelected(event, resource) {
    event.preventDefault();
    event.stopPropagation();

    await this.selectResource(resource, event);
  }

  handleResourceRightClick(event, resource) {
    // Prevent the default contextual menu to popup.
    event.preventDefault();
    this.props.onRightSelect(event, resource);
  }

  handleCheckboxWrapperClick(ev, resource) {
    /*
     * We want the td to extend the clickable area of the checkbox.
     * If we propagate the event, the tr will listen to the click and select only the clicked row.
     */
    ev.stopPropagation();
    this.props.resourceWorkspaceContext.onResourceSelected.multiple(resource);
  }

  /**
   * Handles the initial resource scroll ( with a specific manual resource url /password/view/:id )
   */
  handleInitialResourceScroll() {
    const resourceToScroll = this.props.resourceWorkspaceContext.scrollTo.resource;
    if (resourceToScroll) {
      this.scrollTo(resourceToScroll.id);
      this.props.resourceWorkspaceContext.onResourceScrolled();

      // Dynamic programming just to save continuous checking and voiding the handler
      this.handleInitialResourceScroll = () => {};
    }
  }

  /**
   * Returns the current list of filtered resources to display
   */
  get resources() {
    return this.props.resourceWorkspaceContext.filteredResources;
  }

  /**
   * Returns the current list of selected resources
   */
  get selectedResources() {
    return this.props.resourceWorkspaceContext.selectedResources;
  }

  /**
   * Returns true if the given resource is selected
   * @param resource A resource
   */
  isResourceSelected(resource) {
    return this.props.resourceWorkspaceContext.selectedResources.some(selectedResource => resource.id === selectedResource.id);
  }

  handleCopyUsernameClick(ev, resource) {
    ev.stopPropagation();
    const name = "username";
    const data = resource.username;
    this.context.port.emit('passbolt.clipboard', {name, data});
  }

  handleCopyPasswordClick(ev, resource) {
    ev.stopPropagation();
    this.context.port.emit('passbolt.plugin.decrypt_secret_and_copy_to_clipboard', resource.id);
  }

  async handleFavoriteClick(event, resource) {
    event.stopPropagation();
    await this.handleFavoriteClickDebounced(resource);
  }

  handleFavoriteUpdate(resource) {
    if (resource.favorite === null) {
      this.favoriteResource(resource);
    } else {
      this.unfavoriteResource(resource);
    }
  }

  /**
   * Handle the resource sorter change
   * @param event A DOM event
   * @param sortProperty The resource property to sort on
   */
  async handleSortByColumnClick(event, sortProperty) {
    this.props.resourceWorkspaceContext.onSorterChanged(sortProperty);
  }

  handleDragStartEvent(event, resource) {
    let selectedResources = this.props.selectedResources;

    if (!this.isResourceSelected(resource)) {
      selectedResources = this.props.resourceWorkspaceContext.onResourceSelected.multiple(resource);
    }
    const draggedItems = {
      resources: selectedResources,
      folders: []
    };
    event.dataTransfer.setDragImage(this.dragFeedbackElement.current, 5, 5);
    const trigerEvent = document.createEvent("CustomEvent");
    trigerEvent.initCustomEvent("passbolt.resources.drag-start", true, true, draggedItems);
    document.dispatchEvent(trigerEvent);
  }

  handleDragEndEvent() {
    const trigerEvent = document.createEvent("CustomEvent");
    trigerEvent.initCustomEvent("passbolt.resources.drag-end", true, true);
    document.dispatchEvent(trigerEvent);
  }

  /**
   * Select the resource given the selection event.
   * If no event is provided, the selection is considered as multiple
   * @param resource
   */
  async selectResource(resource, event) {
    const isMultipleSelection = event && event.metaKey;
    const isRangeSelection = event && event.shiftKey;
    const hasNoEvent = !event;

    if (hasNoEvent || isMultipleSelection) {
      await this.props.resourceWorkspaceContext.onResourceSelected.multiple(resource);
    } else if (isRangeSelection) {
      await this.props.resourceWorkspaceContext.onResourceSelected.range(resource);
    } else {
      await this.props.resourceWorkspaceContext.onResourceSelected.single(resource);
    }
  }



  async favoriteResource(resource) {
    try {
      await this.context.port.request('passbolt.favorite.add', resource.id);
      this.displaySuccessNotification("The password has been added as a favorite");
    } catch (error) {
      this.displayErrorNotification(error.message);
    }
  }

  async unfavoriteResource(resource) {
    try {
      await this.context.port.request('passbolt.favorite.delete', resource.id);
      this.displaySuccessNotification("The password has been removed from favorites");
    } catch (error) {
      this.displayErrorNotification(error.message);
    }
  }

  /**
   * Display success notification (toaster)
   * @param message
   */
  displaySuccessNotification(message) {
    this.props.actionFeedbackContext.displaySuccess(message);
  }

  /**
   * Display error notification (toaster)
   * @param message
   */
  displayErrorNotification(message) {
    this.props.actionFeedbackContext.displayError(message);
  }

  scrollTo(resourceId) {
    const resourceIndex = this.resources.findIndex(resource => resource.id === resourceId);
    const [visibleStartIndex, visibleEndIndex] = this.listRef.current.getVisibleRange();
    const isInvisible = resourceIndex < visibleStartIndex || resourceIndex > visibleEndIndex;

    if (isInvisible) {
      this.listRef.current.scrollTo(resourceIndex);
    }
  }

  renderTable(items, ref) {
    const tableStyle = {
      MozUserSelect: "none",
      WebkitUserSelect: "none",
      msUserSelect: "none"
    };
    return (
      <table style={tableStyle}>
        <tbody ref={ref}>
          {items}
        </tbody>
      </table>
    );
  }

  /**
   * Check if the grid is sorted for a given column
   * @param column The column name
   */
  isSortedColumn(column) {
    return this.props.resourceWorkspaceContext.sorter.propertyName === column;
  }

  /**
   * Check if the sort is ascendant.
   * @returns {boolean}
   */
  isSortedAsc() {
    return this.props.resourceWorkspaceContext.sorter.asc;
  }

  sanitizeResourceUrl(resource) {
    let uri = resource.uri;

    // Wrong format.
    if (uri == undefined || typeof uri != "string" || !uri.length) {
      return false;
    }

    // Absolute url are not valid url.
    if (uri[0] == "/") {
      return false;
    }

    // If no protocol defined, use http.
    if (!/^((?!:\/\/).)*:\/\//.test(uri)) {
      uri = `http://${uri}`;
    }

    try {
      const url = new URL(uri);
      if (url.protocol === "javascript") {
        throw new Error("The protocol javascript is forbidden.");
      }
      return url.href;
    } catch (error) {
      return false;
    }
  }

  handleGoToUrlClick(event) {
    event.stopPropagation();
  }

  renderItem(index, key) {
    const resource = this.resources[index];
    const isSelected = this.isResourceSelected(resource);
    const isFavorite = resource.favorite !== null && resource.favorite !== undefined;
    const safeUri = this.sanitizeResourceUrl(resource) || "#";
    const serverTimezone = this.context.siteSettings.getServerTimezone();
    const modifiedFormatted = moment.tz(resource.modified, serverTimezone).fromNow();

    return (
      <tr id={`resource_${resource.id}`} key={key} draggable="true" className={isSelected ? "selected" : ""}
        unselectable={this.state.selectStrategy == "range" ? "on" : ""}
        onClick={ev => this.handleResourceSelected(ev, resource)}
        onContextMenu={ev => this.handleResourceRightClick(ev, resource)}
        onDragStart={event => this.handleDragStartEvent(event, resource)}
        onDragEnd={event => this.handleDragEndEvent(event, resource)}>
        <td className="cell_multipleSelect selections s-cell"
          onClick={ev => this.handleCheckboxWrapperClick(ev, resource)}>
          <div className="ready">
            <div className="input checkbox">
              <input type="checkbox" id={`checkbox_multiple_select_checkbox_${resource.id}`} checked={isSelected} readOnly={true}/>
              <label htmlFor={`checkbox_multiple_select_checkbox_${resource.id}`}></label>
            </div>
          </div>
        </td>
        <td className="cell_favorite selections s-cell">
          <div className="ready">
            <a className={`no-text ${isFavorite ? "fav" : "unfav"}`} onClick={ev => this.handleFavoriteClick(ev, resource)}>
              <Icon baseline={true} name="star"></Icon>
              <span className="visuallyhidden">fav</span>
            </a>
          </div>
        </td>
        <td className="cell_name m-cell uri">
          <div title={resource.name}>
            {resource.name}
          </div>
        </td>
        <td className="cell_username m-cell username">
          <div title={resource.username}>
            <a onClick={ev => this.handleCopyUsernameClick(ev, resource)}>{resource.username}</a>
          </div>
        </td>
        <td className="cell_secret m-cell password">
          <div title="secret" className="secret-copy">
            <a onClick={ev => this.handleCopyPasswordClick(ev, resource)}>
              <span>copy password to clipboard</span>
            </a>
          </div>
        </td>
        <td className="cell_uri l-cell">
          <div title={resource.uri}>
            <a href={safeUri} onClick={this.handleGoToUrlClick} target="_blank" rel="noopener noreferrer">{resource.uri}</a>
          </div>
        </td>
        <td className="cell_modified m-cell">
          <div title={resource.modified}>
            {modifiedFormatted}
          </div>
        </td>
      </tr>
    );
  }

  renderDragFeedback() {
    const isSelected = this.props.selectedResources.length > 0;
    const isMultipleSelected = this.props.selectedResources.length > 1;
    let dragFeedbackText = "";
    let dragElementClassname = "";

    if (isSelected) {
      const firstSelectedResource = this.props.resourceWorkspaceContext.filteredResources.find(resource => resource.id === this.props.selectedResources[0].id);
      if (firstSelectedResource) {
        dragElementClassname = isMultipleSelected ? "drag-and-drop-multiple" : "drag-and-drop";
        dragFeedbackText = firstSelectedResource.name;
      }
    }

    return (
      <div ref={this.dragFeedbackElement} className={dragElementClassname}>
        {dragFeedbackText}
        {isMultipleSelected &&
        <span className="count">
          {this.props.selectedResources.length}
        </span>
        }
      </div>
    );
  }

  render() {
    const isEmpty = this.resources.length === 0;
    const selectAll = this.resources.length === this.selectedResources.length;
    const filterType = this.props.resourceWorkspaceContext.filter.type;

    return (
      <div className={`tableview ready ${isEmpty ? "empty" : ""} ${["default", "modified"].includes(this.props.filterType) ? "all_items" : ""}`}>

        <React.Fragment>
          {isEmpty && filterType === ResourceWorkspaceFilterTypes.TEXT &&
          <div className="empty-content">
            <h2>None of your passwords matched this search.</h2>
            <p>Try another search or use the left panel to navigate into your passwords.</p>
          </div>
          }
          {isEmpty && filterType == ResourceWorkspaceFilterTypes.FAVORITE &&
          <div className="empty-content">
            <h2>None of your passwords are yet marked as favorite.</h2>
            <p>Add stars to passwords your want to easily find later.</p>
          </div>
          }
          {isEmpty && filterType == "group" &&
          <div className="empty-content">
            <h2>No passwords are shared with this group yet.</h2>
            <p>Share a password with this group or wait for a team member to share one with this group.</p>
          </div>
          }
          {isEmpty && filterType == ResourceWorkspaceFilterTypes.FOLDER &&
          <div className="empty-content">
            <h2>No passwords in this folder yet.</h2>
            <p>It does feel a bit empty here.</p>
          </div>
          }
          {isEmpty &&  filterType == ResourceWorkspaceFilterTypes.SHARED_WITH_ME &&
          <div className="empty-content">
            <h2>No passwords are shared with you yet.</h2>
            <p>It does feel a bit empty here. Wait for a team member to share a password with you.</p>
          </div>
          }
          {isEmpty &&
          filterType !== ResourceWorkspaceFilterTypes.NONE  &&
          ["default", "modified", "owned_by_me"].includes(filterType) &&
          <React.Fragment>
            <div className="empty-content">
              <h1>Welcome to passbolt!</h1>
              <p>It does feel a bit empty here. Create your first password or<br/>wait for a team member to share one with you.
              </p>
            </div>
            <div className="tableview-content scroll"></div>
          </React.Fragment>
          }
          {!isEmpty &&
          <React.Fragment>
            {this.renderDragFeedback()}
            <div className="tableview-header">
              <table>
                <thead>
                  <tr>
                    <th className="cell_multipleSelect selections s-cell">
                      <div className="input checkbox">
                        <input type="checkbox" name="select all" checked={selectAll}
                          onChange={this.handleSelectAllChange}/>
                        <label htmlFor="js-passwords-select-all">select all</label>
                      </div>
                    </th>
                    <th className="cell_favorite selections s-cell sortable">
                      <a className="unfav">
                        <Icon baseline={true} name="star"></Icon>
                        <span className="visuallyhidden">fav</span>
                      </a>
                    </th>
                    <th className="cell_name m-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "name")}>
                        Resource
                        {this.isSortedColumn("name") && this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-up"/>
                        }
                        {this.isSortedColumn("name") && !this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-down"/>
                        }
                      </a>
                    </th>
                    <th className="cell_username m-cell username sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "username")}>
                        Username
                        {this.isSortedColumn("username") && this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-up"/>
                        }
                        {this.isSortedColumn("username") && !this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-down"/>
                        }
                      </a>
                    </th>
                    <th className="cell_secret m-cell password">
                    Password
                    </th>
                    <th className="cell_uri l-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "uri")}>
                        URI
                        {this.isSortedColumn("uri") && this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-up"/>
                        }
                        {this.isSortedColumn("uri") && !this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-down"/>
                        }
                      </a>
                    </th>
                    <th className="cell_modified m-cell sortable">
                      <a onClick={ev => this.handleSortByColumnClick(ev, "modified")}>
                        Modified
                        {this.isSortedColumn("modified") && this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-up"/>
                        }
                        {this.isSortedColumn("modified") && !this.isSortedAsc() &&
                        <Icon baseline={true} name="caret-down"/>
                        }
                      </a>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="tableview-content scroll">
              <ReactList
                itemRenderer={(index, key) => this.renderItem(index, key)}
                itemsRenderer={(items, ref) => this.renderTable(items, ref)}
                length={this.resources.length}
                pageSize={20}
                type="uniform"
                ref={this.listRef}>
              </ReactList>
            </div>
          </React.Fragment>
          }
        </React.Fragment>
      </div>
    );
  }
}

Grid.contextType = AppContext;

Grid.propTypes = {
  filterType: PropTypes.string,
  onRightSelect: PropTypes.func,
  onSelect: PropTypes.func,
  search: PropTypes.string,
  selectedResources: PropTypes.array,
  resourceWorkspaceContext: PropTypes.any,
  actionFeedbackContext: PropTypes.any // The action feedback context
};

export default withRouter(withActionFeedback(withResourceWorkspace(Grid)));
