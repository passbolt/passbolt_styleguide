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
import Breadcrumbs from "../../Common/Navigation/Breadcrumbs/Breadcrumbs";
import Breadcrumb from "../../Common/Navigation/Breadcrumbs/Breadcrumb";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import {withTranslation} from "react-i18next";

/**
 * The component displays a navigation breadcrumb given the applied resources filter
 */
class FilterResourcesByBreadcrumb extends Component {
  /**
   * Returns the current list of breadcrumb items
   */
  get items() {
    const items = [this.allItemsBreadcrumb];

    switch (this.props.resourceWorkspaceContext.filter.type) {
      case ResourceWorkspaceFilterTypes.NONE:
        return [];
      case ResourceWorkspaceFilterTypes.ALL:
        return items;
      case ResourceWorkspaceFilterTypes.TEXT: {
        const isEmptySearchText = !this.props.resourceWorkspaceContext.filter.payload;
        const filterText = this.props.resourceWorkspaceContext.filter.payload;
        return isEmptySearchText ? items : [...items, this.getLastBreadcrumb(`${this.translate("Search:")} ${filterText}`)];
      }
      case ResourceWorkspaceFilterTypes.FAVORITE:
        return [...items, this.getLastBreadcrumb(this.translate("Favorite"))];
      case ResourceWorkspaceFilterTypes.RECENTLY_MODIFIED:
        return [...items, this.getLastBreadcrumb(this.translate("Recently modified"))];
      case ResourceWorkspaceFilterTypes.SHARED_WITH_ME:
        return [...items, this.getLastBreadcrumb(this.translate("Shared with me"))];
      case ResourceWorkspaceFilterTypes.ITEMS_I_OWN:
        return [...items, this.getLastBreadcrumb(this.translate("Items I own"))];
      case ResourceWorkspaceFilterTypes.TAG: {
        const filteredTagName = this.props.resourceWorkspaceContext.filter.payload.tag.slug;
        return [...items, this.getLastBreadcrumb(`${filteredTagName} ${this.translate("(tag)")}`)];
      }
      case ResourceWorkspaceFilterTypes.ROOT_FOLDER: {
        return [...items, this.getLastBreadcrumb(this.translate("root (folder)"))];
      }
      case ResourceWorkspaceFilterTypes.FOLDER: {
        const folder = this.props.resourceWorkspaceContext.filter.payload.folder;
        const currentFolderName = (folder && folder.name) || this.translate("N/A");
        return [...items, this.getLastBreadcrumb(`${currentFolderName} ${this.translate("(folder)")}`)];
      }
      case ResourceWorkspaceFilterTypes.GROUP: {
        const group = this.props.resourceWorkspaceContext.filter.payload.group;
        const currentGroupName = (group && group.name) || this.translate("N/A");
        return [...items, this.getLastBreadcrumb(`${currentGroupName} ${this.translate("(group)")}`)];
      }
    }

    return items;
  }

  /**
   * Returns the all items breadcrumb items
   * @return {JSX.Element}
   */
  get allItemsBreadcrumb() {
    return <Breadcrumb name={this.translate("All items")} onClick={this.props.navigationContext.onGoToPasswordsRequested}/>;
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
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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

FilterResourcesByBreadcrumb.propTypes = {
  resourceWorkspaceContext: PropTypes.object,
  location: PropTypes.object, // The router location
  history: PropTypes.object, // The router history
  navigationContext: PropTypes.any, // The application navigation context
  t: PropTypes.func, // The translation function
};

export default withRouter(withNavigationContext(withResourceWorkspace(withTranslation('common')(FilterResourcesByBreadcrumb))));
