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
import Icon from "../../Common/Icons/Icon";

class TagFilter extends React.Component {

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
    };
  }


  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }


  /**
   * Handle when the user selects the folder parent.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {

    return (
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
                      <span>Filter by tags</span>
                    </span>
                  </h3>
                </div>
              </div>
              <div className="right-cell more-ctrl">
                <a className="filter"><span>more</span></a>
              </div>
            </div>
          </li>
        </ul>
        {this.state.open &&
        <div className="accordion-content">
          {!this.props.tags &&
          <em className="empty-content">loading...</em>
          }
          {this.props.tags && this.props.tags.length === 0 &&
          <em className="empty-content">empty</em>
          }
          {this.props.tags && this.props.tags.length > 0 &&
          <ul className="tree ready">
            {this.props.tags.map((tag) =>
              <li className="open node root tag-item" key={tag.id}>
                <div className="row ">
                  <div className="main-cell-wrapper">
                    <div className="main-cell">
                      <a title={tag.slug}><span className="ellipsis">{tag.slug}</span></a>
                    </div>
                  </div>
                </div>
              </li>)
            }
          </ul>
          }
        </div>
        }
      </div>
    );
  }
}

TagFilter.propTypes = {
  tags: PropTypes.array,
};

export default TagFilter;