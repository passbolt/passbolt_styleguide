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
import {
  AdministrationWorkspaceMenuTypes,
  withAdministrationWorkspace
} from "../../../contexts/AdministrationWorkspaceContext";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import Breadcrumb from "../../../../react/components/Common/Navigation/Breadcrumbs/Breadcrumb";

/**
 * The component displays a navigation breadcrumb given the administration setting selected
 */
class DisplayAdministrationWorkspaceBreadcrumb extends Component {
  /**
   * Returns the current list of breadcrumb items
   */
  get items() {
    switch (this.props.administrationWorkspaceContext.selectedAdministration) {
      case AdministrationWorkspaceMenuTypes.NONE:
        return [];
      default:
        return [
          <Breadcrumb key="bread-1" name="Administration" onClick={this.props.navigationContext.onGoToAdministrationRequested}/>,
          <Breadcrumb key="bread-2" name={this.getLastBreadcrumbItemName()} onClick={this.onLastBreadcrumbClick.bind(this)}/>,
          <Breadcrumb key="bread-3" name="Settings" onClick={this.onLastBreadcrumbClick.bind(this)}/>
        ];
    }
  }

  /**
   * Returns the main breadcrumb item name given the current administration setting selected
   * @returns {string}
   */
  getLastBreadcrumbItemName() {
    switch (this.props.administrationWorkspaceContext.selectedAdministration) {
      case AdministrationWorkspaceMenuTypes.MFA:
        return "Multi factor authentication";
      case AdministrationWorkspaceMenuTypes.USER_DIRECTORY:
        return "Users Directory";
      case AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION:
        return "Email Notification";
      default:
        return "";
    }
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

DisplayAdministrationWorkspaceBreadcrumb.context = AppContext;

DisplayAdministrationWorkspaceBreadcrumb.propTypes = {
  administrationWorkspaceContext: PropTypes.object, // The user workspace context
  location: PropTypes.object, // The router location
  history: PropTypes.object, // The router history
  navigationContext: PropTypes.any, // The application navigation context
};

export default withRouter(withNavigationContext(withAdministrationWorkspace(DisplayAdministrationWorkspaceBreadcrumb)));
