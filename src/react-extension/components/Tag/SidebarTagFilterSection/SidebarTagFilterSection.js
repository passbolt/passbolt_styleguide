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
import PropTypes from "prop-types";
import Icon from "../../../../react/components/Common/Icons/Icon";
import SidebarTagFilterSectionContextualMenu from "./SidebarTagFilterSectionContextualMenu";
import DisplayTagList from "./DisplayTagList";

/**
 * This component display the tag to filter the resources
 */
class SidebarTagFilterSection extends React.Component {

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
      title: "Filter by tags",
      // properties to display the contextual menu
      tagFilterContextualMenu: {
        left: 0, // left position in px on the page
        show: false,
        top: 0, // top position in px on the page
      },
      filterType: null // type of the filter selected
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
    this.handleContextualMenuEvent = this.handleContextualMenuEvent.bind(this);
    this.handleTagFilterContextualMenuHideEvent = this.handleTagFilterContextualMenuHideEvent.bind(this);
    this.handleFilterTagsType = this.handleFilterTagsType.bind(this);
  }

  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Handle when the user click right on the component
   * @param {ReactEvent} event The event
   */
  handleContextualMenuEvent(event) {
    const top = event.pageY;
    const left = event.pageX;
    const show = true;
    const tagFilterContextualMenu = {left, show, top};
    this.setState({tagFilterContextualMenu});
  }

  /**
   * Handle when the user wants to hide the contextual menu of a folder.
   */
  handleTagFilterContextualMenuHideEvent() {
    const tagFilterContextualMenu = {show: false};
    this.setState({tagFilterContextualMenu});
  }

  /**
   * Handle when the user wants to filter tags
   * @param {string} filterType
   */
  handleFilterTagsType(filterType) {
    this.setState({filterType}, () => {
      this.updateTitle();
    });
  }

  // Zero conditional statements
  /**
   * get the title
   * @returns {{shared: string, default: string, personal: string}}
   */
  get titles() {
    return {
      personal: "My tags",
      shared: "Shared tags",
      default: "Filter by tags"
    }
  }


  /**
   * update the title of the filter tag
   */
  updateTitle() {
    const title = this.titles[this.state.filterType] || this.titles.default;
    this.setState({title});
  }

  // Zero conditional statements
  /**
   * get the filter according to the type of the filter
   * @returns {{shared: (function(*): *), default: (function(*): *), personal: (function(*): *)}}
   */
  get filters() {
    return {
      personal: tag => !tag.is_shared,
      shared: tag => tag.is_shared,
      default: tag => tag
    }
  }

  /**
   * filter tag to display only the type selected
   * @returns {*[filtered tags]}
   */
  get filteredTags() {
    if(this.props.tags) {
      const filter = this.filters[this.state.filterType] || this.filters.default;
      return this.props.tags.filter(filter);
    }
    return null;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {

    return (
      <div>
        {this.state.tagFilterContextualMenu.show &&
        <SidebarTagFilterSectionContextualMenu
          left={this.state.tagFilterContextualMenu.left}
          onDestroy={this.handleTagFilterContextualMenuHideEvent}
          top={this.state.tagFilterContextualMenu.top}
          filterTagsType={this.handleFilterTagsType}/>
        }
        <div className="folders navigation first accordion">
          <ul className="accordion-header">
            <li className={`node root ${this.state.open ? "open" : "close"}`}>
              <div className="row title">
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <h3>
                    <span className="folders-label" onClick={this.handleTitleClickEvent}>
                      <Fragment>
                        {this.state.open &&
                        <Icon name="caret-down"/>
                        }
                        {!this.state.open &&
                        <Icon name="caret-right"/>
                        }
                      </Fragment>
                      <span>{this.state.title}</span>
                    </span>
                    </h3>
                  </div>
                </div>
                <div className="right-cell more-ctrl">
                  <a className="filter" onClick={this.handleContextualMenuEvent}><span>more</span></a>
                </div>
              </div>
            </li>
          </ul>
          {this.state.open &&
          <DisplayTagList
            tags={this.filteredTags}/>
          }
        </div>
      </div>
    );
  }
}

SidebarTagFilterSection.propTypes = {
  tags: PropTypes.array,
};

export default SidebarTagFilterSection;