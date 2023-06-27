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
import Icon from "../../../../shared/components/Icons/Icon";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component display groups to filter the resources
 */
class FilterResourcesByGroups extends React.Component {
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
    this.handleClickGroupEvent = this.handleClickGroupEvent.bind(this);
  }

  /**
   * Handle when the user click on the title.
   */
  handleTitleClickEvent() {
    const open = !this.state.open;
    this.setState({open});
  }

  /**
   * Handle when the user selects a group.
   */
  handleClickGroupEvent(group) {
    // filter the resources by group;
    const filter = {type: ResourceWorkspaceFilterTypes.GROUP, payload: {group}};
    this.props.history.push({pathname: '/app/passwords', state: {filter}});
  }

  /**
   * Check if the tag associated to this component is selected.
   * @returns {boolean}
   * @param tagId
   * @returns {boolean}
   */
  isSelected(groupId) {
    const filter = this.props.resourceWorkspaceContext.filter;
    return filter.type === ResourceWorkspaceFilterTypes.GROUP && filter.payload.group.id === groupId;
  }

  /**
   * has at least one group that the user belongs to
   * @returns {*|boolean}
   */
  hasGroup() {
    return this.props.context.groups && this.groups.length > 0;
  }

  /**
   * get groups that the user belongs to
   * @returns {*}
   */
  get groups() {
    return this.props.context.groups.filter(group => group.my_group_user !== null);
  }

  /**
   * get the groups sorted
   * @returns {*}
   */
  get groupsSorted() {
    return this.groups.sort((groupA, groupB) => groupA.name.localeCompare(groupB.name));
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <>
        {this.hasGroup() &&
        <div className="navigation-secondary-tree navigation-secondary navigation-groups accordion">
          <ul className="accordion-header">
            <li className={`node root ${this.state.open ? "open" : "close"}`}>
              <div className="row title" onClick={this.handleTitleClickEvent}>
                <div className="main-cell-wrapper">
                  <div className="main-cell">
                    <h3>
                      <span className="folders-label">
                        <button type="button" className="link no-border">
                          <>
                            {this.state.open &&
                              <Icon name="caret-down"/>
                            }
                            {!this.state.open &&
                              <Icon name="caret-right"/>
                            }
                          </>
                          <Trans>Groups</Trans>
                        </button>
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          {this.state.open &&
          <div className="accordion-content">
            <ul className="tree ready">
              {this.groupsSorted.map(group =>
                <li className="node root group-item" key={group.id}>
                  <div className={`row ${this.isSelected(group.id) ? "selected" : ""}`} onClick={() => this.handleClickGroupEvent(group)}>
                    <div className="main-cell-wrapper">
                      <div className="main-cell">
                        <button type="button" className="link no-border" title={group.name}>
                          <Icon name="users"/>
                          <span className="ellipsis">{group.name}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
              }
            </ul>
          </div>
          }
        </div>
        }
      </>
    );
  }
}

FilterResourcesByGroups.propTypes = {
  context: PropTypes.any, // The application context
  resourceWorkspaceContext: PropTypes.any,
  history: PropTypes.object,
};

export default withRouter(withAppContext(withResourceWorkspace(withTranslation("common")(FilterResourcesByGroups))));
