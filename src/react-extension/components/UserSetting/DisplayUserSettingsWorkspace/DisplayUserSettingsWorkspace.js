
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

import React from 'react';
import {Route, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../../../../react/components/Common/Navigation/Header/Logo";
import UserBadgeMenu from "../../../../react/components/Common/Navigation/Header/UserBadgeMenu";
import AppContext from "../../../contexts/AppContext";
import NavigateIntoUserSettingsWorkspace from "../NavigateIntooUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace";
import DisplayUserProfile from "../DisplayUserProfile/DisplayUserProfile";

/**
 * This component is a container for all the user settings workspace features
 */
class DisplayUserSettingsWorkspace extends React.Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const {path} = this.props.match;
    return (
      <div>
        <div className="header second">
          <Logo/>
          <UserBadgeMenu baseUrl={this.context.userSettings.getTrustedDomain()} user={this.context.loggedInUser}/>
        </div>
        <div className="header third">
        </div>
        <div className="panel main">
          <div className="tabs-content">
            <div className="tab-content selected">
              <div className="reports-workspace">
                <div className="panel left">
                  <NavigateIntoUserSettingsWorkspace/>

                </div>
                <div className="panel middle">
                  <Route path={`${path}/profile`} component={DisplayUserProfile}></Route>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayUserSettingsWorkspace.contextType = AppContext;
DisplayUserSettingsWorkspace.propTypes = {
  match: PropTypes.any,
};

export default withRouter(DisplayUserSettingsWorkspace);
