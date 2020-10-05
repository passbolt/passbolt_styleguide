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
import Icon from "../../../../react/components/Common/Icons/Icon";
import AppContext from "../../../contexts/AppContext";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";

/**
 * This component display groups to filter the users
 */
class DisplayGroups extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      open: true, // open the group section
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleTitleClickEvent = this.handleTitleClickEvent.bind(this);
  }

  /**
   * Handle when the user click on the title.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * check if component loading
   * @returns {boolean}
   */
  isLoading() {
    return this.groups === null;
  }

  /**
   * has at least one group
   * @returns {*|boolean}
   */
  hasGroup() {
    return this.groups && this.groups.length > 0;
  }

  /**
   * get groups
   * @returns {*}
   */
  get groups() {
    return this.context.groups;
  }

  /**
   * get groups sorted
   * @returns {*|boolean}
   */
  get groupsSorted() {
    return this.hasGroup() && this.context.groups.sort((groupA, groupB) => groupA.name.localeCompare(groupB.name));
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
                      <span>All groups</span>
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </li>
        </ul>
        {this.state.open &&
        <div className="accordion-content">
          {this.isLoading() &&
          <div className="processing-wrapper">
            <span className="processing-text">Retrieving groups</span>
          </div>
          }
          {!this.isLoading() && !this.hasGroup() &&
          <em className="empty-content">empty</em>
          }
          {!this.isLoading() && this.hasGroup() &&
          <ul className="tree ready">
            {this.groupsSorted.map(group =>
              <li className="node root group-item" key={group.id}>
                <div className="row">
                  <div className="main-cell-wrapper">
                    <div className="main-cell">
                      <a title={group.name}><span className="ellipsis">{group.name}</span></a>
                    </div>
                  </div>
                </div>
              </li>
            )
            }
          </ul>
          }
        </div>
        }
      </div>
    );
  }
}

DisplayGroups.contextType = AppContext;

DisplayGroups.propTypes = {
  userWorkspaceContext: PropTypes.any, // user workspace context
  history: PropTypes.object
};

export default withRouter(withUserWorkspace(DisplayGroups));
