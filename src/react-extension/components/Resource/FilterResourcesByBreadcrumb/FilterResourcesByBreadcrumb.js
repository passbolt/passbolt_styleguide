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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import Breadcrumbs from "../../Common/Navigation/Breadcrumbs/Breadcrumbs";
import Breadcrumb from "../../Common/Navigation/Breadcrumbs/Breadcrumb";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import {Trans, withTranslation} from "react-i18next";

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
        return isEmptySearchText ? items : [...items, this.getBreadcrumb(`${this.translate("Search:")} ${filterText}`)];
      }
      case ResourceWorkspaceFilterTypes.FAVORITE:
        return [...items, this.getBreadcrumb(this.translate("Favorite"))];
      case ResourceWorkspaceFilterTypes.SHARED_WITH_ME:
        return [...items, this.getBreadcrumb(this.translate("Shared with me"))];
      case ResourceWorkspaceFilterTypes.EXPIRED:
        return [...items, this.getBreadcrumb(this.translate("Expired"))];
      case ResourceWorkspaceFilterTypes.ITEMS_I_OWN:
        return [...items, this.getBreadcrumb(this.translate("Items I own"))];
      case ResourceWorkspaceFilterTypes.PRIVATE:
        return [...items, this.getBreadcrumb(this.translate("Private"))];
      case ResourceWorkspaceFilterTypes.TAG: {
        const filteredTagName = this.props.resourceWorkspaceContext.filter.payload.tag.slug;
        return [...items, this.getBreadcrumb(`${filteredTagName} ${this.translate("(tag)")}`)];
      }
      case ResourceWorkspaceFilterTypes.ROOT_FOLDER: {
        return [this.myWorkspaceBreadcrumb];
      }
      case ResourceWorkspaceFilterTypes.FOLDER: {
        const folder = this.props.resourceWorkspaceContext.filter.payload.folder;
        this.foldersHierarchy = this.props.context.getHierarchyFolderCache(folder?.folder_parent_id);

        const currentFolderName = (folder && folder.name) || this.translate("N/A");
        const currentBreadcrumbItem = this.getBreadcrumb(`${currentFolderName}`, `/app/folders/view/${folder.id}`);

        const subFolders = this.foldersHierarchy.map(folder => {
          const currentFolderName = (folder && folder.name) || this.translate("N/A");
          return this.getBreadcrumb(`${currentFolderName}`, `/app/folders/view/${folder.id}`);
        });
        return [this.myWorkspaceBreadcrumb, ...subFolders, currentBreadcrumbItem];
      }
      case ResourceWorkspaceFilterTypes.GROUP: {
        const group = this.props.resourceWorkspaceContext.filter.payload.group;
        const currentGroupName = (group && group.name) || this.translate("N/A");
        return [...items, this.getBreadcrumb(`${currentGroupName} ${this.translate("(group)")}`)];
      }
    }

    return items;
  }

  /**
   * Returns the home breadcrumb items
   * @return {JSX.Element}
   */
  get allItemsBreadcrumb() {
    return <Breadcrumb name={this.translate("Home")} onClick={this.props.navigationContext.onGoToPasswordsRequested}/>;
  }

  /**
   * Returns the my workspace breadcrumb items
   * @return {JSX.Element}
   */
  get myWorkspaceBreadcrumb() {
    return <Breadcrumb name={this.translate("My workspace")} onClick={this.handleClickOnMyWorkspace.bind(this)}/>;
  }

  /**
   * Handle when the user clicks on the my workspace breadcrumb.
   */
  handleClickOnMyWorkspace() {
    const filter = {type: ResourceWorkspaceFilterTypes.ROOT_FOLDER};
    this.props.history.push(`/app/passwords`, {filter});
  }

  /**
   * Return the breadcrumb
   * @param {string} name the breadcrumb name
   * @param {string} pathname the breadcrumb pathname
   * @return {JSX.Element}
   */
  getBreadcrumb(name, pathname) {
    return <Breadcrumb name={name} onClick={this.onBreadcrumbClick.bind(this, pathname)}/>;
  }

  /**
   * Whenever the user click on the breadcrumb
   * @param {string} pathname the breadcrumb pathname
   * @returns {Promise<void>}
   */
  async onBreadcrumbClick(pathname = this.props.location.pathname) {
    this.props.history.push({pathname});
  }

  /**
   * Is resources not null
   * @return {boolean}
   */
  get isResourceNotNull() {
    return this.props.resourceWorkspaceContext.filteredResources !== null;
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
    const count = this.props.resourceWorkspaceContext.filteredResources?.length;
    return (
      <Breadcrumbs items={this.items}>
        {this.isResourceNotNull &&
          <span className="counter"><Trans count={count}>{{count}} items</Trans></span>
        }
      </Breadcrumbs>
    );
  }
}

FilterResourcesByBreadcrumb.propTypes = {
  context: PropTypes.any, // The app context
  resourceWorkspaceContext: PropTypes.object,
  location: PropTypes.object, // The router location
  history: PropTypes.object, // The router history
  navigationContext: PropTypes.any, // The application navigation context
  t: PropTypes.func, // The translation function
};

export default withRouter(withAppContext(withNavigationContext(withResourceWorkspace(withTranslation('common')(FilterResourcesByBreadcrumb)))));
