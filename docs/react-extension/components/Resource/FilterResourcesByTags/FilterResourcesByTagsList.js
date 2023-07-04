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
import FilterResourcesByTagsListContextualMenu from "./FilterResourcesByTagsListContextualMenu";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withContextualMenu} from "../../../contexts/ContextualMenuContext";
import {withRouter} from "react-router-dom";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {withDrag} from "../../../contexts/DragContext";
import {withDialog} from "../../../contexts/DialogContext";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

class FilterResourcesByTagsList extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
      open: true,
      selectedTag: null, // Tag selected for the contextual menu
      draggingOverTagId: null, // The dragging over tag id
      moreMenuOpenTagId: null // more menu open for a tag with the id
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleContextualMenuEvent = this.handleContextualMenuEvent.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
    this.handleCloseMoreMenu = this.handleCloseMoreMenu.bind(this);
    this.handleDropEvent = this.handleDropEvent.bind(this);
    this.handleDragOverEvent = this.handleDragOverEvent.bind(this);
    this.handleDragLeaveEvent = this.handleDragLeaveEvent.bind(this);
  }

  /**
   * Handle when the user clicks right on a tag
   * @param {ReactEvent} event The event
   * @param {Object} selectedTag The target tag
   */
  handleContextualMenuEvent(event, selectedTag) {
    // Prevent the browser contextual menu to pop up.
    event.preventDefault();

    // No operation available on shared tag.
    if (selectedTag.is_shared) {
      return;
    }

    this.showContextualMenu(event.pageY, event.pageX, selectedTag);
  }

  /**
   * Handle when the user clicks on the more button
   * @param {ReactEvent} event The event
   * @param {Object} selectedTag The target tag
   */
  handleMoreClickEvent(event, selectedTag) {
    const moreMenuOpenTagId = this.state.moreMenuOpenTagId === selectedTag.id ? null : selectedTag.id;
    this.setState({moreMenuOpenTagId});
    if (moreMenuOpenTagId) {
      const {left, top} = event.currentTarget.getBoundingClientRect();
      this.showContextualMenu(top + 18, left, selectedTag, "right", this.handleCloseMoreMenu);
    }
  }

  /**
   * Close the more menu with the tag id
   * @param {string} id The tag id
   */
  handleCloseMoreMenu(id) {
    if (this.state.moreMenuOpenTagId === id) {
      this.setState({moreMenuOpenTagId: null});
    }
  }

  /**
   * Show the contextual menu
   * @param {int} left The left position to display the menu
   * @param {int} top The top position to display the menu
   * @param {Object} selectedTag The target tag
   * @param {string} className The class name to display the menu
   * @param {function} callbackBeforeHide The callback before to hide the menu
   */
  showContextualMenu(top, left, selectedTag, className = "", callbackBeforeHide = null) {
    const onBeforeHide = callbackBeforeHide;
    const contextualMenuProps = {left, selectedTag, onBeforeHide, top, className};
    this.props.contextualMenuContext.show(FilterResourcesByTagsListContextualMenu, contextualMenuProps);
  }

  handleOnClickTag(tag) {
    const filter = {type: ResourceWorkspaceFilterTypes.TAG, payload: {tag: tag}};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    this.handleAllFilterRequired(prevProps.tags);
  }

  /**
   * If the tag filtered is deleted
   * Apply an all filter to unfiltered the resources
   * @param previousTags
   */
  handleAllFilterRequired(previousTags) {
    const hasTagNumberChanged = previousTags && this.props.tags.length !== previousTags.length;

    if (hasTagNumberChanged) {
      const filter = this.props.resourceWorkspaceContext.filter;
      const isAppFilterByTag = filter && filter.type === ResourceWorkspaceFilterTypes.TAG;
      if (isAppFilterByTag) {
        // check if the tag is present in the list of tags
        const isTagFilteredPresent = this.props.tags.filter(tag => tag.id === filter.payload.tag.id).length > 0;
        if (!isTagFilteredPresent) {
          // If the tag filtered is deleted apply all filter
          const filter = {type: ResourceWorkspaceFilterTypes.ALL};
          this.props.history.push({pathname: '/app/passwords', state: {filter}});
        }
      }
    }
  }

  /**
   * Handle when the user drop content on this component.
   * @param {ReactEvent} event The event
   * @param {Object} tag The tag
   */
  async handleDropEvent(event, tag) {
    this.setState({draggingOverTagId: null});
    try {
      const resources = this.props.dragContext.draggedItems.resources.map(resource => resource.id);
      this.props.context.port.request("passbolt.tags.add-resources-tag", {resources, tag});
    } catch (error) {
      this.onUnexpectedError(error);
    }
  }

  /**
   * Whenever an unexpected error occured
   * @param {object} error The error
   * @returns {Promise<void>}
   */
  onUnexpectedError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Handle when the user is dragging over the tag.
   * @param {ReactEvent} event The event
   * @param {string} tagId The tag ID
   */
  handleDragOverEvent(event, tagId) {
    /*
     * If you want to allow a drop, you must prevent the default handling by cancelling both the dragenter and dragover events.
     * see: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#droptargets
     */
    event.preventDefault();
    this.setState({draggingOverTagId: tagId});
  }

  /**
   * Handle when the user is dragging leave the tag.
   */
  handleDragLeaveEvent() {
    this.setState({draggingOverTagId: null});
  }

  // Zero conditional statements
  /**
   * get the filter according to the type of the filter
   * @returns {{shared: (function(*): *), default: (function(*): *), personal: (function(*): *)}}
   */
  get filters() {
    return {
      [filterByTagsOptions.personal]: tag => !tag.is_shared,
      [filterByTagsOptions.shared]: tag => tag.is_shared,
      [filterByTagsOptions.all]: tag => tag
    };
  }

  /**
   * filter tag to display only the type selected
   * @returns {*[filtered tags]}
   */
  get filteredTags() {
    const filterType = this.props.filterType || filterByTagsOptions.all;
    const filter = this.filters[filterType];
    return this.props.tags.filter(filter);
  }

  /**
   * check if no tag is present
   * @returns {boolean}
   */
  isLoading() {
    return !this.props.tags;
  }

  /**
   * Check if the tag associated to this component is selected.
   * @returns {boolean}
   * @param tagId
   * @returns {boolean}
   */
  isSelected(tagId) {
    const filter = this.props.resourceWorkspaceContext.filter;
    return filter.type === ResourceWorkspaceFilterTypes.TAG && filter.payload.tag.id === tagId;
  }

  /**
   * Check if the user is currently dragging content.
   * @returns {boolean}
   */
  isDragging() {
    return this.props.dragContext.dragging;
  }

  /**
   * Check if the component is disabled.
   * @param {Object} tag
   * @returns {boolean}
   */
  isDisabled(tag) {
    /*
     * If the user is dragging content, disable the component if:
     * - The user is not allowed to drop content in the shared tag.
     * - The user is not allowed to drop dragged items except resources;
     */
    if (this.isDragging()) {
      if (tag.is_shared) {
        return true;
      }
      if (!this.canDropInto()) {
        return true;
      }
    }

    return false;
  }

  /**
   * Show the drop focus for a tag
   * @param tag
   * @returns {boolean}
   */
  showDropFocus(tag) {
    return tag.id === this.state.draggingOverTagId && !this.isDisabled(tag);
  }

  /**
   * Check if the user can drag all the items they are currently dragging.
   * @returns {boolean}
   */
  canDropInto() {
    return this.draggedItems.resources.length > 0;
  }

  /**
   * return dragged items
   * @returns {*}
   */
  get draggedItems() {
    return this.props.dragContext.draggedItems;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="accordion-content">
        {this.isLoading() &&
        <div className="processing-wrapper">
          <Icon name="spinner"/>
          <span className="processing-text"><Trans>Retrieving tags</Trans></span>
        </div>
        }
        {!this.isLoading() && this.filteredTags.length === 0 &&
        <em className="empty-content"><Trans>empty</Trans></em>
        }
        {!this.isLoading() && this.filteredTags.length > 0 &&
        <ul className="tree ready">
          {this.filteredTags.map(tag =>
            <li className="open node root tag-item" key={tag.id}>
              <div className={`row ${this.isSelected(tag.id) ? "selected" : ""} ${this.isDisabled(tag) ? "disabled" : ""} ${this.showDropFocus(tag) ? "drop-focus" : ""}`}
                onDrop={ event => this.handleDropEvent(event, tag)}
                onDragOver={ event => this.handleDragOverEvent(event, tag.id)}
                onDragLeave={this.handleDragLeaveEvent}>
                <div className="main-cell-wrapper"
                  onClick={() => this.handleOnClickTag(tag)}
                  onContextMenu={event => this.handleContextualMenuEvent(event, tag)}>
                  <div className="main-cell">
                    <button className="link no-border" type="button" title={tag.slug}><span className="ellipsis tag-name">{tag.slug}</span></button>
                  </div>
                </div>
                {!tag.is_shared &&
                <div className="dropdown right-cell more-ctrl">
                  <button type="button" className={`${this.state.moreMenuOpenTagId === tag.id ? "open" : ""}`} onClick={event => this.handleMoreClickEvent(event, tag)}>
                    <Icon name="3-dots-h"/>
                  </button>
                </div>
                }
              </div>
            </li>
          )
          }
        </ul>
        }
      </div>
    );
  }
}

FilterResourcesByTagsList.propTypes = {
  context: PropTypes.any, // The app context
  contextualMenuContext: PropTypes.any, // The contextual menu context
  tags: PropTypes.array,
  filterType: PropTypes.string,
  resourceWorkspaceContext: PropTypes.object,
  history: PropTypes.any,
  dialogContext: PropTypes.any, // The dialog context
  dragContext: PropTypes.any, // The drag and drop context
};

export default withRouter(withAppContext(withDialog(withResourceWorkspace(withContextualMenu(withDrag(withTranslation("common")(FilterResourcesByTagsList)))))));

export const filterByTagsOptions = {
  all: "all",
  shared: "shared",
  personal: "personal"
};
