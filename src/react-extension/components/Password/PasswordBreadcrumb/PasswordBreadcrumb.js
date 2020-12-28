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
import {ResourceWorkspaceFilterTypes, withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import Breadcrumbs from "../../../../react/components/Common/Navigation/Breadcrumbs/Breadcrumbs";
import AppContext from "../../../contexts/AppContext";

/**
 * The component displays a navigation breadcrumb given the applied resources filter
 */
class PasswordBreadcrumbs extends Component {
  /**
   * Returns the all items breadcrumb items
   */
  get allItems() {
    return  [
      {
        name: 'All Items',
        link: {
          pathname: '/app/passwords',
          state: {
            filter: {
              type: ResourceWorkspaceFilterTypes.ALL
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
    switch (this.props.resourceWorkspaceContext.filter.type) {
      case ResourceWorkspaceFilterTypes.FAVORITE: return "Favorite";
      case ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED: return "Recently modified";
      case ResourceWorkspaceFilterTypes.SHARED_WITH_ME: return "Shared with me";
      case ResourceWorkspaceFilterTypes.ITEMS_I_OWN: return "Items I own";
      case ResourceWorkspaceFilterTypes.TAG: {
        const currentTagName = this.props.resourceWorkspaceContext.filter.payload.tag.slug;
        return `${currentTagName} (tag)`;
      }
      case ResourceWorkspaceFilterTypes.ROOT_FOLDER: {
        return `root (folder)`;
      }
      case ResourceWorkspaceFilterTypes.FOLDER: {
        const folder =  this.props.resourceWorkspaceContext.filter.payload.folder;
        const currentFolderName = (folder && folder.name) || "N/A";
        return `${currentFolderName} (folder)`;
      }
      case ResourceWorkspaceFilterTypes.GROUP: {
        const currentGroupName = this.props.resourceWorkspaceContext.filter.payload.group.name;
        return `${currentGroupName} (group)`;
      }
      case ResourceWorkspaceFilterTypes.TEXT: {
        const currentSearchText = this.props.resourceWorkspaceContext.filter.payload;
        return `Search : ${currentSearchText}`;
      }
      default: return "";
    }
  }

  /**
   * Returns the current list of breadcrumb items
   */
  get items() {
    switch (this.props.resourceWorkspaceContext.filter.type) {
      case ResourceWorkspaceFilterTypes.ALL:  return this.allItems;
      case ResourceWorkspaceFilterTypes.NONE: return [];
      case ResourceWorkspaceFilterTypes.TEXT: {
        const isEmptySearchText = !this.props.resourceWorkspaceContext.filter.payload;
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

PasswordBreadcrumbs.context = AppContext;

PasswordBreadcrumbs.propTypes = {
  resourceWorkspaceContext: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(withResourceWorkspace(PasswordBreadcrumbs));
