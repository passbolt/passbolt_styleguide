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
import Breadcrumbs from "../../Common/Navigation/Breadcrumbs/Breadcrumbs";
import AppContext from "../../../contexts/AppContext";
import {UserWorkspaceFilterTypes, withUserWorkspace} from "../../../contexts/UserWorkspaceContext";

/**
 * The component displays a navigation breadcrumb given the applied users filter
 */
class DisplayUserWorkspaceBreadcrumb extends Component {
  /**
   * Returns the all items breadcrumb items
   */
  get allItems() {
    return  [
      {
        name: 'All Items',
        link: {
          pathname: '/app/users',
          state: {
            filter: {
              type: UserWorkspaceFilterTypes.ALL
            }
          }
        }
      }
    ];
  }

  /**
   * Returns the breadcrumb items for the given filter
   */
  getBreadcrumb() {
    return [
      ...this.allItems,
      {
        name: this.getBreadcrumbItemName(),
        link: this.props.location
      }
    ];
  }

  /**
   * Returns the main breadcrumb item name given the current filter
   * @returns {string}
   */
  getBreadcrumbItemName() {
    switch (this.props.userWorkspaceContext.filter.type) {
      case UserWorkspaceFilterTypes.ALL: return "All items";
      case UserWorkspaceFilterTypes.RECENTLY_MODIFIED: return "Recently modified";
      case UserWorkspaceFilterTypes.GROUP: {
        const currentGroupName = this.props.userWorkspaceContext.filter.payload.group.name;
        return `${currentGroupName} (group)`;
      }
      case UserWorkspaceFilterTypes.TEXT: {
        const currentSearchText = this.props.userWorkspaceContext.filter.payload;
        return `Search : ${currentSearchText}`;
      }
      default: return "";
    }
  }

  /**
   * Returns the current list of breadcrumb items
   */
  get items() {
    switch (this.props.userWorkspaceContext.filter.type) {
      case UserWorkspaceFilterTypes.ALL:  return this.allItems;
      case UserWorkspaceFilterTypes.NONE: return [];
      case UserWorkspaceFilterTypes.TEXT: {
        const isEmptySearchText = !this.props.userWorkspaceContext.filter.payload;
        return isEmptySearchText ? this.allItems : this.getBreadcrumb();
      }
      default: return this.getBreadcrumb();
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <Breadcrumbs items={this.items} />
    );
  }
}

DisplayUserWorkspaceBreadcrumb.context = AppContext;

DisplayUserWorkspaceBreadcrumb.propTypes = {
  userWorkspaceContext: PropTypes.object, // The user workspace context
  location: PropTypes.object
};

export default withRouter(withUserWorkspace(DisplayUserWorkspaceBreadcrumb));
