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
import Plugin from "../../../../legacy/util/plugin";
import Config from "../../../../legacy/config/config";

// Select strategies.
const SELECT_SINGLE = 'single';
const SELECT_MULITPLE = 'multiple';
const SELECT_RANGE = 'range';

class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.initEventHandlers();
    this.state = this.getDefaultState();
    this.createRefs();
  }

  initEventHandlers() {
    this.handleSelectAllChange = this.handleSelectAllChange.bind(this);
    this.handleResourceClick = this.handleResourceClick.bind(this);
    this.handleResourceRightClick = this.handleResourceRightClick.bind(this);
    this.handleCheckboxWrapperClick = this.handleCheckboxWrapperClick.bind(this);
    this.handleCopyPasswordClick = this.handleCopyPasswordClick.bind(this);
    this.handleCopyUsernameClick = this.handleCopyUsernameClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleSortByColumnClick = this.handleSortByColumnClick.bind(this);
    this.handleGoToUrlClick = this.handleGoToUrlClick.bind(this);
  }

  getDefaultState() {
    return {
      selectStrategy: "",
      sortProperty: "modified",
      sortASC: false
    }
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createRefs() {
    this.listRef = React.createRef();
    this.dragFeedbackElement = React.createRef();
  }

  handleSelectAllChange(ev) {
    const checked = ev.target.checked;
    let selectedResources = [];

    if (checked) {
      selectedResources = this.filteredResources;
    }

    const selectStrategy = SELECT_MULITPLE;
    this.setState({selectStrategy});
    this.props.onSelect(selectedResources);
  }

  handleResourceClick(ev, resource) {
    ev.preventDefault();
    ev.stopPropagation();
    let selectStrategy;

    if (ev.metaKey) {
      selectStrategy = SELECT_MULITPLE;
    } else if (ev.shiftKey) {
      selectStrategy = SELECT_RANGE;
    } else {
      selectStrategy = SELECT_SINGLE;
    }

    this.selectResource(resource, selectStrategy);
  }

  handleResourceRightClick(event, resource) {
    // Prevent the default contextual menu to popup.
    event.preventDefault();
    this.props.onRightSelect(event, resource);
  }

  handleCheckboxWrapperClick(ev, resource) {
    // We want the td to extend the clickable area of the checkbox.
    // If we propagate the event, the tr will listen to the click and select only the clicked row.
    ev.stopPropagation();
    this.selectResource(resource, SELECT_MULITPLE);
  }

  selectResource(resource, selectStrategy) {
    let selectedResources;
    selectStrategy = selectStrategy || SELECT_SINGLE;

    switch (selectStrategy) {
      case SELECT_MULITPLE:
        selectedResources = this.getSelectedResourcesMultipleClickStrategy(resource);
        break;
      case SELECT_RANGE:
        selectedResources = this.getSelectedResourcesRangeClickStrategy(resource);
        break;
      case SELECT_SINGLE:
        selectedResources = this.getSelectedResourcesSingleClickStrategy(resource);
        break;
    }

    this.setState({selectStrategy});
    this.props.onSelect(selectedResources);

    return selectedResources;
  }

  getSelectedResourcesSingleClickStrategy(resource) {
    const hasOneResourceSelected = this.props.selectedResources.length == 1;

    // If only one resource selected and the given resource is already selected, unselect it.
    if (hasOneResourceSelected) {
      if (this.props.selectedResources[0].id === resource.id) {
        return [];
      }
    }

    // Otherwise select it.
    return [resource];
  }

  getSelectedResourcesMultipleClickStrategy(resource) {
    let selectedResources = this.props.selectedResources;
    const index = selectedResources.findIndex(selectedResource => resource.id === selectedResource.id);

    if (index !== -1) {
      selectedResources.splice(index, 1);
    } else {
      selectedResources = [...selectedResources, resource];
    }

    return selectedResources;
  }

  getSelectedResourcesRangeClickStrategy(resource) {
    let selectedResources = [];
    if (this.state.selectStrategy == "range" || this.props.selectedResources.length === 1) {
      const indexFirst = this.filteredResources.findIndex(item => item.id === this.props.selectedResources[0].id);
      const indexLast = this.filteredResources.findIndex(item => item.id === resource.id);
      if (indexFirst < indexLast) {
        selectedResources = this.filteredResources.slice(indexFirst, indexLast + 1);
      } else {
        selectedResources = this.filteredResources.slice(indexLast, indexFirst + 1).reverse();
      }
    } else {
      selectedResources = [resource];
    }

    return selectedResources;
  }

  isResourceSelected(resource) {
    return this.props.selectedResources.some(selectedResource => resource.id === selectedResource.id)
  }

  handleCopyUsernameClick(ev, resource) {
    ev.stopPropagation();
    const name = "username";
    const data = resource.username;
    Plugin.send('passbolt.clipboard', {name, data});
  }

  handleCopyPasswordClick(ev, resource) {
    ev.stopPropagation();
    Plugin.send('passbolt.plugin.decrypt_secret_and_copy_to_clipboard', resource.id);
  }

  async handleFavoriteClick(ev, resource) {
    ev.stopPropagation();
    if (resource.favorite === null) {
      this.favoriteResource(resource);
    } else {
      this.unfavoriteResource(resource);
    }
  }

  async handleSortByColumnClick(ev, sortProperty) {
    if (this.state.sortProperty === sortProperty) {
      this.setState({sortProperty: sortProperty, sortASC: !this.state.sortASC});
    } else {
      this.setState({sortProperty: sortProperty, sortASC: true});
    }
  }

  handleDragStartEvent(event, resource) {
    let selectedResources = this.props.selectedResources;

    // Firefox ESR 68 fix. Associate data to the drag event.
    // Call event.preventDefault() on any drop functions.
    // see example on MDN: https://developer.mozilla.org/en-US/docs/Web/API/Document/dragstart_event
    event.dataTransfer.setData('text/plain', null);

    if (!this.isResourceSelected(resource)) {
      selectedResources = this.selectResource(resource);
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
    const bus = document.querySelector("#bus");
    const trigerEvent = document.createEvent("CustomEvent");
    trigerEvent.initCustomEvent("passbolt.resources.drag-end", true, true);
    document.dispatchEvent(trigerEvent);
  }

  async favoriteResource(resource) {
    try {
      await Plugin.request('passbolt.plugin.favorite.add', [resource.id]);
      this.triggerNotification({status: "success", title: "app_favorites_add_success"});
    } catch (error) {
      this.triggerNotification({status: "error", title: "app_favorites_delete_success"});
    }
  }

  async unfavoriteResource(resource) {
    try {
      await Plugin.request('passbolt.plugin.favorite.delete', [resource.id]);
      this.triggerNotification({status: "success", title: "app_favorites_delete_success"});
    } catch (error) {
      this.triggerNotification({status: "error", message: error.message, force: true});
    }
  }

  triggerNotification(notification) {
    const bus = document.querySelector("#bus");
    const event = document.createEvent("CustomEvent");
    event.initCustomEvent("passbolt_notify", true, true, notification);
    bus.dispatchEvent(event);
  }

  getFilteredResources() {
    let filteredResources = this.props.resources.slice(0);
    filteredResources = this.filterResourcesBySearch(filteredResources, this.props.search);
    this.sortResources(filteredResources, false);
    return filteredResources;
  }

  /**
   * Filter resources by keywords.
   * Search on the name, the username, the uri and the description of the resources.
   * @param {array} resources The list of resources to filter.
   * @param {string} needle The needle to search.
   * @return {array} The filtered resources.
   */
  filterResourcesBySearch(resources, needle) {
    if (needle === '' || !needle) {
      return resources;
    }

    // Split the search by words
    const needles = needle.split(/\s+/);
    // Prepare the regexes for each word contained in the search.
    const regexes = needles.map(needle => new RegExp(this.escapeRegExp(needle), 'i'));

    return resources.filter(resource => {
      let match = true;
      for (let i in regexes) {
        // To match a resource would have to match all the words of the search.
        match &= (regexes[i].test(resource.name)
          || regexes[i].test(resource.username)
          || regexes[i].test(resource.uri)
          || regexes[i].test(resource.description)
          || resource.tags && resource.tags.some(tag => regexes[i].test(tag.slug)));
      }

      return match;
    });
  }

  /**
   * Escape a string that is to be treated as a literal string within a regular expression.
   * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
   * @param {string} value The string to escape
   */
  escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  sortResources(resources) {
    const collator = Intl.Collator();
    resources.sort((itemA, itemB) => {
      const valueA = (itemA[this.state.sortProperty] || '').toUpperCase();
      const valueB = (itemB[this.state.sortProperty] || '').toUpperCase();
      if (valueA == valueB) {
        return 0;
      }
      if (!valueA.length || valueA == null) {
        return 1;
      }
      if (!valueB.length || valueB == null) {
        return -1;
      }
      return this.state.sortASC ? collator.compare(valueA, valueB) : -collator.compare(valueA, valueB);
    });
  }

  scrollTo(resourceId) {
    const resourceIndex = this.filteredResources.findIndex(resource => resource.id === resourceId);
    this.listRef.current.scrollTo(resourceIndex);
  }

  isReady() {
    return this.props.resources !== null;
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
    )
  }

  getColumnSortedClass(column) {
    if (this.state.sortProperty === column) {
      if (this.state.sortASC) {
        return "sorted sort-asc";
      } else {
        return "sorted sort-desc";
      }
    }

    return "";
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
      let url = new URL(uri);
      if (url.protocol == "javascript") {
        throw Exception("The protocol javascript is forbidden.");
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
    const resource = this.filteredResources[index];
    const isSelected = this.isResourceSelected(resource);
    const isFavorite = resource.favorite !== null && resource.favorite !== undefined;
    const safeUri = this.sanitizeResourceUrl(resource) || "#";
    const modifiedFormatted = moment.tz(resource.modified, Config.read('app.server_timezone')).fromNow();

    return (
      <tr id={`resource_${resource.id}`} key={key} draggable="true" className={isSelected ? "selected" : ""}
        unselectable={this.state.selectStrategy == "range" ? "on" : ""}
        onClick={(ev) => this.handleResourceClick(ev, resource)}
        onContextMenu={(ev) => this.handleResourceRightClick(ev, resource)}
        onDragStart={event => this.handleDragStartEvent(event, resource)}
        onDragEnd={event => this.handleDragEndEvent(event, resource)}>
        <td className="cell_multipleSelect selections s-cell"
          onClick={(ev) => this.handleCheckboxWrapperClick(ev, resource)}>
          <div className="ready">
            <div className="input checkbox">
              <input type="checkbox" id={`checkbox_multiple_select_checkbox_${resource.id}`} checked={isSelected} readOnly={true}/>
              <label htmlFor={`checkbox_multiple_select_checkbox_${resource.id}`}></label>
            </div>
          </div>
        </td>
        <td className="cell_favorite selections s-cell">
          <div className="ready">
            <a className="no-text" onClick={(ev) => this.handleFavoriteClick(ev, resource)}>
              <i className={`icon ${isFavorite ? "unfav" : "fav"}`}></i>
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
            <a onClick={(ev) => this.handleCopyUsernameClick(ev, resource)}>{resource.username}</a>
          </div>
        </td>
        <td className="cell_secret m-cell password">
          <div title="secret" className="secret-copy">
            <a onClick={(ev) => this.handleCopyPasswordClick(ev, resource)}>
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
      const firstSelectedResource = this.props.resources.find(resource => resource.id === this.props.selectedResources[0].id);
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
    const isReady = this.isReady();
    let isEmpty, isSearching;
    let selectAll = false;

    if (isReady) {
      this.filteredResources = this.getFilteredResources();
      isEmpty = this.filteredResources.length === 0;
      isSearching = this.props.search.length > 0;
      selectAll = this.filteredResources.length === this.props.selectedResources.length;
    }

    return (
      <div className={`tableview ready ${isEmpty ? "empty" : ""} ${["default", "modified"].includes(this.props.filterType) ? "all_items" : ""}`}>
        {!isReady &&
        <div className="empty-content">
        </div>
        }
        {isReady &&
        <React.Fragment>
          {isEmpty && isSearching &&
          <div className="empty-content">
            <h2>None of your passwords matched this search.</h2>
            <p>Try another search or use the left panel to navigate into your passwords.</p>
          </div>
          }
          {isEmpty && !isSearching && this.props.filterType == "favorite" &&
          <div className="empty-content">
            <h2>None of your passwords are yet marked as favorite.</h2>
            <p>Add stars to passwords your want to easily find later.</p>
          </div>
          }
          {isEmpty && !isSearching && this.props.filterType == "group" &&
          <div className="empty-content">
            <h2>No passwords are shared with this group yet.</h2>
            <p>Share a password with this group or wait for a team member to share one with this group.</p>
          </div>
          }
          {isEmpty && !isSearching && this.props.filterType == "folder" &&
          <div className="empty-content">
            <h2>No passwords in this folder yet.</h2>
            <p>It does feel a bit empty here.</p>
          </div>
          }
          {isEmpty && !isSearching && this.props.filterType == "shared_with_me" &&
          <div className="empty-content">
            <h2>No passwords are shared with you yet.</h2>
            <p>It does feel a bit empty here. Wait for a team member to share a password with you.</p>
          </div>
          }
          {isEmpty && !isSearching && ["default", "modified", "owned_by_me"].includes(this.props.filterType) &&
          <React.Fragment>
            <div className="empty-content">
              <h2>Welcome to passbolt!</h2>
              <p>It does feel a bit empty here. Create your first password or<br/>wait for a team member to share one with you.</p>
            </div>
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
                      <input type="checkbox" name="select all" id="js-passwords-select-all" checked={selectAll}
                        onChange={this.handleSelectAllChange}/>
                      <label htmlFor="js-passwords-select-all">select all</label>
                    </div>
                  </th>
                  <th className="cell_favorite selections s-cell sortable">
                    <a>
                      <i className="icon fav"></i>
                      <span className="visuallyhidden">fav</span>
                    </a>
                  </th>
                  <th className={`cell_name m-cell sortable js_grid_column_name ${this.getColumnSortedClass("name")}`}>
                    <a onClick={ev => this.handleSortByColumnClick(ev, "name")}>Resource</a>
                  </th>
                  <th className={`cell_username m-cell username sortable js_grid_column_username ${this.getColumnSortedClass("username")}`}>
                    <a onClick={ev => this.handleSortByColumnClick(ev, "username")}>Username</a>
                  </th>
                  <th className="cell_secret m-cell password">
                    Password
                  </th>
                  <th className={`cell_uri l-cell sortable js_grid_column_uri ${this.getColumnSortedClass("uri")}`}>
                    <a onClick={ev => this.handleSortByColumnClick(ev, "uri")}>URI</a>
                  </th>
                  <th className={`cell_modified m-cell sortable js_grid_column_modified ${this.getColumnSortedClass("modified")}`}>
                    <a onClick={ev => this.handleSortByColumnClick(ev, "modified")}>Modified</a>
                  </th>
                </tr>
                </thead>
              </table>
            </div>
            <div className="tableview-content scroll">
              <ReactList
                itemRenderer={(index, key) => this.renderItem(index, key)}
                itemsRenderer={(items, ref) => this.renderTable(items, ref)}
                length={this.filteredResources.length}
                pageSize={20}
                type="uniform"
                ref={this.listRef}>
              </ReactList>
            </div>
          </React.Fragment>
          }
        </React.Fragment>
        }
      </div>
    );
  }
}

Grid.propTypes = {
  filterType: PropTypes.string,
  onRightSelect: PropTypes.func,
  onSelect: PropTypes.func,
  resources: PropTypes.array,
  search: PropTypes.string,
  selectedResources: PropTypes.array,
};

export default Grid;
