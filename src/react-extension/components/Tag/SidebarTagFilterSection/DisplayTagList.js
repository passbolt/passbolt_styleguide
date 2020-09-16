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
      // properties to display the contextual menu
      tagFilterItemContextualMenu: {
        left: 0, // left position in px on the page
        show: false,
        top: 0, // top position in px on the page
      },
      selectedTag: null, //  tag selected
    };
  }


  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleContextualMenuEvent = this.handleContextualMenuEvent.bind(this);
    this.handleTagFilterItemContextualMenuHideEvent = this.handleTagFilterItemContextualMenuHideEvent.bind(this);
  }


  /**
   * Handle when the user click right on the component
   * @param {ReactEvent} event The event
   */
  handleContextualMenuEvent(event, selectedTag) {
    const top = event.pageY;
    const left = event.pageX;
    const show = true;
    const tagFilterItemContextualMenu = {left, show, top};
    this.setState({tagFilterItemContextualMenu, selectedTag});
  }

  /**
   * Handle when the user wants to hide the contextual menu of a folder.
   */
  handleTagFilterItemContextualMenuHideEvent() {
    const tagFilterItemContextualMenu = {show: false};
    this.setState({tagFilterItemContextualMenu});
  }

  /**
   * check if no tag is present
   * @returns {boolean}
   */
  isLoading() {
    return !this.props.tags;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div>
        {this.state.tagFilterItemContextualMenu.show &&
        <DisplayTagListContextualMenu
          left={this.state.tagFilterItemContextualMenu.left}
          onDestroy={this.handleTagFilterItemContextualMenuHideEvent}
          top={this.state.tagFilterItemContextualMenu.top}
          selectedTag={this.state.selectedTag}
        />
        }
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
            {this.props.tags.map(tag =>
              <li className="open node root tag-item" key={tag.id}>
                <div className="row">
                  <div className="main-cell-wrapper">
                    <div className="main-cell">
                      <a title={tag.slug}><span className="ellipsis">{tag.slug}</span></a>
                    </div>
                  </div>
                  {!tag.is_shared &&
                  <div className="right-cell more-ctrl">
                    <a className="more"
                       onClick={(event) => this.handleContextualMenuEvent(event, tag)}><span>more</span></a>
                  </div>
                  }
                </div>
              </li>
            )
            }
          </ul>
          }
        </div>
      </div>
    );
  }
}

DisplayTagList.propTypes = {
  tags: PropTypes.array,
};

export default DisplayTagList;
