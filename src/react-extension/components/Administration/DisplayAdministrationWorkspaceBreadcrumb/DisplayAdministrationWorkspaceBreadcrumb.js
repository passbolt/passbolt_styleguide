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

/**
 * The component displays a navigation breadcrumb given the administration setting selected
 */
class DisplayAdministrationWorkspaceBreadcrumb extends Component {
  /**
   * Returns the all settings breadcrumb items
   */
  get allSettings() {
    return  [
      {
        name: "Administration",
        link: this.props.location
      }
    ];
  }

  /**
   * Returns the breadcrumb items for the given administration setting selected
   */
  getBreadcrumb() {
    return [
      ...this.allSettings,
      {
        name: this.getBreadcrumbItemName(),
        link: this.props.location
      },
      {
        name: "Settings"
      }
    ];
  }

  /**
   * Returns the main breadcrumb item name given the current administration setting selected
   * @returns {string}
   */
  getBreadcrumbItemName() {
    switch (this.props.administrationWorkspaceContext.selectedAdministration) {
      case AdministrationWorkspaceMenuTypes.MFA: return "Multi factor authentication";
      case AdministrationWorkspaceMenuTypes.USER_DIRECTORY: return "Users Directory";
      case AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION: return "Email Notification";
      default: return "";
    }
  }

  /**
   * Returns the current list of breadcrumb items
   */
  get items() {
    switch (this.props.administrationWorkspaceContext.selectedAdministration) {
      case AdministrationWorkspaceMenuTypes.NONE:  return [];
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

DisplayAdministrationWorkspaceBreadcrumb.context = AppContext;

DisplayAdministrationWorkspaceBreadcrumb.propTypes = {
  administrationWorkspaceContext: PropTypes.object, // The user workspace context
  location: PropTypes.object
};

export default withRouter(withAdministrationWorkspace(DisplayAdministrationWorkspaceBreadcrumb));
