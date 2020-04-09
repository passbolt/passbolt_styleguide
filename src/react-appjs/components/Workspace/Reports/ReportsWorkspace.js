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
import PropTypes from "prop-types";
import Logo from "../../Common/Header/Logo";
import SearchBar from "../../Common/Header/SearchBar";
import ProfileMenu from "../../Common/Header/ProfileMenu";
import ActionBar from "../../Common/ActionBar/ActionBar";
import AccordionMenu from "./AccordionMenu";

class ReportsWorkspace extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
  }

  /**
   * Get default state
   * @returns {*}
   */
  getDefaultState() {
    return {
    }
  }

  onMenuItemClick(menuItem) {
    this.props.onMenuItemClick(menuItem);
  }

  BreadCrumb() {
    return (
      <div className="breadcrumbs">
        <ul className="menu">
          <li>
            <div className="main-cell">
              <a href="demo/LU_users.php"><span>All reports</span></a>
            </div>
          </li>
          <li>
            <div className="main-cell">
              <a href="demo/LU_users_profile.php"><span>On-boarding</span></a>
            </div>
          </li>
          <li>
            <div className="main-cell">
              <a href="demo/LU_users_profile.php"><span>MFA On-boarding</span></a>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  WorkspaceContent() {
    return (
      <div className="workspace-reports-content">
        <div className="tabs-content">
          <div className="tab-content selected">
            <iframe src="http://passbolt.local:8086/demo/reports/mfa_onboarding_report.php" width="100%" ></iframe>
          </div>
        </div>
      </div>
    );
  }

  Workspace() {
    return (
      <div className="panel main">
        <div className="tabs-content">
          <div className="tab-content selected">
            <div className="reports-workspace">
              <div className="panel left">
                <AccordionMenu/>
              </div>
              <div className="panel middle">
                {this.BreadCrumb()}
                {this.WorkspaceContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="header second">
          <Logo/>
          <SearchBar disabled={true} placeholder=" "/>
          <ProfileMenu onClick={this.onMenuItemClick.bind(this)} />
        </div>
        <ActionBar/>
        {this.Workspace()}
      </div>
    );
  }
}

ReportsWorkspace.propTypes = {
  onMenuItemClick: PropTypes.func,
};

export default ReportsWorkspace;

