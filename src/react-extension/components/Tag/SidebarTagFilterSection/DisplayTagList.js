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
import DisplayTagListContextualMenu from "./DisplayTagListContextualMenu";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {withContextualMenu} from "../../../contexts/Common/ContextualMenuContext";
import {withRouter} from "react-router-dom";
import Icon from "../../Common/Icons/Icon";

class DisplayTagList extends React.Component {
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
      selectedTag: null, //  tag selected for the contextual menu
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleContextualMenuEvent = this.handleContextualMenuEvent.bind(this);
    this.handleMoreClickEvent = this.handleMoreClickEvent.bind(this);
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
    this.showContextualMenu(event.pageY, event.pageX, selectedTag);
  }

  /**
   * Show the contextual menu
   * @param {int} left The left position to display the menu
   * @param {int} top The top position to display the menu
   * @param {Object} selectedTag The target tag
   */
  showContextualMenu(top, left, selectedTag) {
    const contextualMenuProps = {left, selectedTag, top};
    this.props.contextualMenuContext.show(DisplayTagListContextualMenu, contextualMenuProps);
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
    const hasTagNumberChanged = this.props.tags.length !== previousTags.length;

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
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="accordion-content">
        {this.isLoading() &&
        <div className="processing-wrapper">
          <span className="processing-text">Retrieving tags</span>
        </div>
        }
        {!this.isLoading() && this.props.tags.length === 0 &&
        <em className="empty-content">empty</em>
        }
        {!this.isLoading() && this.props.tags.length > 0 &&
        <ul className="tree ready">
          {this.filteredTags.map(tag =>
            <li className="open node root tag-item" key={tag.id}>
              <div className={`row ${this.isSelected(tag.id) ? "selected" : ""}`}>
                <div className="main-cell-wrapper" onClick={() => this.handleOnClickTag(tag)}
                  onContextMenu={event => this.handleContextualMenuEvent(event, tag)}>
                  <div className="main-cell">
                    <a title={tag.slug}><span className="ellipsis">{tag.slug}</span></a>
                  </div>
                </div>
                {!tag.is_shared &&
                <div className="right-cell more-ctrl">
                  <a className="more" onClick={event => this.handleMoreClickEvent(event, tag)}>
                    <Icon name="plus-square"/>
                  </a>
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

DisplayTagList.propTypes = {
  contextualMenuContext: PropTypes.any, // The contextual menu context
  tags: PropTypes.array,
  filterType: PropTypes.string,
  resourceWorkspaceContext: PropTypes.object,
  history: PropTypes.any
};

export default withRouter(withResourceWorkspace(withContextualMenu(DisplayTagList)));

export const filterByTagsOptions = {
  all: "all",
  shared: "shared",
  personal: "personal"
};
