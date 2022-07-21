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
import {
  AdministrationWorkspaceMenuTypes,
  withAdministrationWorkspace
} from "../../../contexts/AdministrationWorkspaceContext";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import Breadcrumb from "../../Common/Navigation/Breadcrumbs/Breadcrumb";
import {withTranslation} from "react-i18next";

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
          <Breadcrumb key="bread-1" name={this.translate("Administration")} onClick={this.props.navigationContext.onGoToAdministrationRequested}/>,
          <Breadcrumb key="bread-2" name={this.getLastBreadcrumbItemName()} onClick={this.onLastBreadcrumbClick.bind(this)}/>,
          <Breadcrumb key="bread-3" name={this.translate("Settings")} onClick={this.onLastBreadcrumbClick.bind(this)}/>
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
        return this.translate("Multi Factor Authentication");
      case AdministrationWorkspaceMenuTypes.USER_DIRECTORY:
        return this.translate("Users Directory");
      case AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION:
        return this.translate("Email Notification");
      case AdministrationWorkspaceMenuTypes.SUBSCRIPTION:
        return this.translate("Subscription");
      case AdministrationWorkspaceMenuTypes.INTERNATIONALIZATION:
        return this.translate("Internationalisation");
      case AdministrationWorkspaceMenuTypes.ACCOUNT_RECOVERY:
        return this.translate("Account Recovery");
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

DisplayAdministrationWorkspaceBreadcrumb.propTypes = {
  administrationWorkspaceContext: PropTypes.object, // The user workspace context
  location: PropTypes.object, // The router location
  history: PropTypes.object, // The router history
  navigationContext: PropTypes.any, // The application navigation context
  t: PropTypes.func, // The translation function
};

export default withRouter(withNavigationContext(withAdministrationWorkspace(withTranslation('common')(DisplayAdministrationWorkspaceBreadcrumb))));
