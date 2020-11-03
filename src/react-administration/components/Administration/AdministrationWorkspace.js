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
import {withApp} from "../../contexts/AppContext";
import {
  AdministrationWorkspaceMenuTypes,
  withAdministrationWorkspace
} from "../../contexts/AdministrationWorkspaceContext";
import MainMenu from "../../../react/components/Common/Navigation/MainMenu/MainMenu";
import Logo from "../../../react/components/Common/Navigation/Header/Logo";
import UserBadgeMenu from "../../../react/components/Common/Navigation/Header/UserBadgeMenu";
import DisplayAdministrationMenu from "./DisplayAdministrationMenu/DisplayAdministrationMenu";
import DisplayMfaAdministration from "./DisplayMfaAdministration/DisplayMfaAdministration";
import DisplayAdministrationWorkspaceActions from "./DisplayAdministartionWorkspaceActions/DisplayUserWorkspaceActions";

class AdministrationWorkspace extends Component {

  /**
   * If MFA menu is selected
   * @returns {boolean}
   */
  isMfaSelected() {
    return AdministrationWorkspaceMenuTypes.MFA === this.props.administrationWorkspaceContext.selectedAdministration;
  }

  render() {
    return (
      <div id="container" className="page administration">
        <div id="app" tabIndex="1000">
          <div className="header first">
            <MainMenu baseUrl={"http://passbolt.local"}/>
          </div>
          <div className="header second">
            <Logo/>
            <UserBadgeMenu baseUrl={"http://passbolt.local"} user={this.props.appContext.loggedInUser}/>
          </div>
          <div className="header third">
            <div className="col1 main-action-wrapper">
            </div>
          </div>
          <div className="panel main">
            <div>
              <div className="panel left">
                <DisplayAdministrationMenu/>
              </div>
              <div className="panel middle">
                <div className="workspace-main">
                  <div className="grid grid-responsive-12">
                    {this.isMfaSelected() &&
                    <DisplayMfaAdministration/>
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
