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
import PropTypes from "prop-types";
import {withApp} from "../../contexts/ApiAppContext";
import {
  AdministrationWorkspaceMenuTypes,
  withAdministrationWorkspace
} from "../../contexts/AdministrationWorkspaceContext";
import MainMenu from "../../../react/components/Common/Navigation/MainMenu/MainMenu";
import Logo from "../../../react/components/Common/Navigation/Header/Logo";
import UserBadgeMenu from "../../../react/components/Common/Navigation/Header/UserBadgeMenu";
import DisplayAdministrationMenu from "./DisplayAdministrationMenu/DisplayAdministrationMenu";
import DisplayMfaAdministration from "./DisplayMfaAdministration/DisplayMfaAdministration";
import DisplayAdministrationWorkspaceActions from "./DisplayAdministrationWorkspaceActions/DisplayAdministrationWorkspaceActions";
import DisplayAdministrationWorkspaceBreadcrumb
  from "./DisplayAdministrationWorkspaceBreadcrumb/DisplayAdministrationWorkspaceBreadcrumb";
import DisplayUserDirectoryAdministration
  from "./DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration";
import DisplayEmailNotificationsAdministration
  from "./DisplayEmailNotificationsAdministration/DisplayEmailNotificationsAdministration";

class AdministrationWorkspace extends Component {
  /**
   * If MFA menu is selected
   * @returns {boolean}
   */
  isMfaSelected() {
    return AdministrationWorkspaceMenuTypes.MFA === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If User directory menu is selected
   * @returns {boolean}
   */
  isUserDirectorySelected() {
    return AdministrationWorkspaceMenuTypes.USER_DIRECTORY === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * If Email notifications menu is selected
   * @returns {boolean}
   */
  isEmailNotificationsSelected() {
    return AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  render() {
    return (
      <div id="container" className="page administration">
        <div id="app" tabIndex="1000">
          <div className="header first">
            <MainMenu baseUrl={this.props.appContext.trustedDomain}/>
          </div>
          <div className="header second">
            <Logo/>
            <UserBadgeMenu baseUrl={this.props.appContext.trustedDomain} user={this.props.appContext.loggedInUser}/>
          </div>
          <div className="header third">
            <div className="col1 main-action-wrapper">
            </div>
            <DisplayAdministrationWorkspaceActions/>
          </div>
          <div className="panel main">
            <div>
              <div className="panel left">
                <DisplayAdministrationMenu/>
              </div>
              <div className="panel middle">
                <DisplayAdministrationWorkspaceBreadcrumb/>
                <div className="workspace-main">
                  <div className="grid grid-responsive-12">
                    {this.isMfaSelected() &&
                    <DisplayMfaAdministration/>
                    }
                    {this.isUserDirectorySelected() &&
                    <DisplayUserDirectoryAdministration/>
                    }
                    {this.isEmailNotificationsSelected() &&
                    <DisplayEmailNotificationsAdministration/>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdministrationWorkspace.propTypes = {
  appContext: PropTypes.any, // The application context provider
  administrationWorkspaceContext: PropTypes.object, // The administration workspace context
};

export default withApp(withAdministrationWorkspace(AdministrationWorkspace));
