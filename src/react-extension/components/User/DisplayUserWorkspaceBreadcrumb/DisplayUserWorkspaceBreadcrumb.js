/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Breadcrumbs from "../../../../react/components/Common/Navigation/Breadcrumbs/Breadcrumbs";
import AppContext from "../../../contexts/AppContext";
import {UserWorkspaceFilterTypes, withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import Breadcrumb from "../../../../react/components/Common/Navigation/Breadcrumbs/Breadcrumb";
import {withNavigationContext} from "../../../contexts/NavigationContext";

/**
 * The component displays a navigation breadcrumb given the applied users filter
 */
class DisplayUserWorkspaceBreadcrumb extends Component {
  /**
   * Returns the current list of breadcrumb items
   */
  get items() {
    const items = [this.allUsersBreadcrumb];

    switch (this.props.userWorkspaceContext.filter.type) {
      case UserWorkspaceFilterTypes.NONE:
        return [];
      case UserWorkspaceFilterTypes.ALL:
        return items;
      case UserWorkspaceFilterTypes.TEXT: {
        const isEmptySearchText = !this.props.userWorkspaceContext.filter.payload;
        const currentSearchText = this.props.userWorkspaceContext.filter.payload;
        return isEmptySearchText ? items : [...items, this.getLastBreadcrumb(`Search : ${currentSearchText}`)];
      }
      case UserWorkspaceFilterTypes.RECENTLY_MODIFIED:
        return [...items, this.getLastBreadcrumb("Recently modified")];
      case UserWorkspaceFilterTypes.GROUP: {
        const group = this.props.userWorkspaceContext.filter.payload.group;
        const currentGroupName = (group && group.name) || "N/A";
        return [...items, this.getLastBreadcrumb(`${currentGroupName} (group)`)];
      }
    }

    return [];
  }

  /**
   * Returns the all users breadcrumb items
   * @return {JSX.Element}
   */
  get allUsersBreadcrumb() {
    return <Breadcrumb name="All users" onClick={this.props.navigationContext.onGoToUsersRequested}/>;
  }

  /**
   * Return the last breadcrumb
   * @param {string} name the breadcrumb name
   * @return {JSX.Element}
   */
  getLastBreadcrumb(name) {
    return <Breadcrumb name={name} onClick={this.onLastBreadcrumbClick.bind(this)}/>;
  }

  /**
   * Whenever the user click on the last breadcrumb
   * @returns {Promise<void>}
   */
  async onLastBreadcrumbClick() {
    const pathname = this.props.location.pathname;
    this.props.history.push({pathname});
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <Breadcrumbs items={this.items}/>
    );
  }
}

DisplayUserWorkspaceBreadcrumb.context = AppContext;

DisplayUserWorkspaceBreadcrumb.propTypes = {
  userWorkspaceContext: PropTypes.object, // The user workspace context
  location: PropTypes.object, // The router location
  history: PropTypes.object, // The router history
  navigationContext: PropTypes.any, // The application navigation context
};

export default withRouter(withNavigationContext(withUserWorkspace(DisplayUserWorkspaceBreadcrumb)));
