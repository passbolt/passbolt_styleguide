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
 */
import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Breadcrumbs from "../../Common/Navigation/Breadcrumbs/Breadcrumbs";
import {withAppContext} from "../../../contexts/AppContext";
import Breadcrumb from "../../Common/Navigation/Breadcrumbs/Breadcrumb";
import {withNavigationContext} from "../../../contexts/NavigationContext";
import {withTranslation} from "react-i18next";

/**
 * The component displays a navigation breadcrumb given the applied users filter
 */
class DisplayUserSettingsWorkspaceBreadcrumb extends Component {
  /**
   * Returns the breadcrumb items for the given filter
   * @return {array<JSX.Element>}
   */
  get items() {
    return [
      <Breadcrumb key="bread-1" name={this.translate("All users")} onClick={this.props.navigationContext.onGoToUsersRequested}/>,
      <Breadcrumb key="bread-2" name={this.loggedInUserName} onClick={this.props.navigationContext.onGoToUserSettingsProfileRequested}/>,
      <Breadcrumb key="bread-3" name={this.getLastBreadcrumbItemName} onClick={this.onLastBreadcrumbClick.bind(this)}/>
    ];
  }

  /**
   * Get the logged in user full name.
   * @returns {string}
   */
  get loggedInUserName() {
    const user = this.props.context.loggedInUser;
    return user ? `${user.profile.first_name} ${user.profile.last_name}` : "";
  }


  /**
   * Returns the current item name given the current location
   */
  get getLastBreadcrumbItemName() {
    const matchPathSuffix = pathSuffix => this.props.location.pathname.endsWith(pathSuffix);
    const names = {
      profile: this.translate("Profile"),
      passphrase: this.translate("Passphrase"),
      'security-token': this.translate("Security token"),
      theme: this.translate("Theme"),
      mfa: this.translate("Multi Factor Authentication"),
      keys: this.translate("Keys inspector"),
      mobile: this.translate("Mobile transfer"),
      'account-recovery': this.translate("Account Recovery"),
    };
    const matchedKey = Object.keys(names).find(matchPathSuffix);
    return names[matchedKey];
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

DisplayUserSettingsWorkspaceBreadcrumb.propTypes = {
  context: PropTypes.any, // The application context
  location: PropTypes.object, // The router location
  history: PropTypes.object, // The router history
  navigationContext: PropTypes.any, // The application navigation context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withRouter(withNavigationContext(withTranslation('common')(DisplayUserSettingsWorkspaceBreadcrumb))));
