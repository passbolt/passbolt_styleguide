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
 * @since         3.0.0
 */

import React from 'react';
import {Route, withRouter} from "react-router-dom";
import Logo from "../../Common/Navigation/Header/Logo";
import DisplayUserBadgeMenu from "../../User/DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import NavigateIntoUserSettingsWorkspace from "../NavigateIntoUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace";
import DisplayUserSettingsWorkspaceBreadcrumb
  from "../DisplayUserSettingsWorkspaceBreadcrumb/DisplayUserSettingsWorkspaceBreadcrumb";
import DisplayUserMfa from "../DisplayUserMfa/DisplayUserMfa";
import PropTypes from "prop-types";
import SearchBar from "../../Common/Navigation/Search/SearchBar";
import {withMfa} from '../../../contexts/MFAContext';
import DisplayUserMfaProvider from '../DisplayUserMfa/DisplayUserMfaProvider';

/**
 * This component is a container for all the user settings workspace features
 */
class DisplayApiUserSettingsWorkspace extends React.Component {
  /**
   * Return if user has to define mfa.
   * @returns {bool}
   */
  get isMfaChoiceRequired() {
    return this.props.mfaContext.isMfaChoiceRequired();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div>
        <div className="header second">
          <Logo/>
          <SearchBar disabled={true}/>
          <DisplayUserBadgeMenu baseUrl={this.props.context.trustedDomain} user={this.props.context.loggedInUser}/>
        </div>
        <div className="header third">
        </div>
        <div className="panel main">
          <div className="panel left">
            <NavigateIntoUserSettingsWorkspace hasPendingMfaChoice={this.isMfaChoiceRequired}/>
          </div>
          <div className="panel middle">
            <DisplayUserSettingsWorkspaceBreadcrumb/>
            <Route exact path="/app/settings/mfa/:provider" component={DisplayUserMfaProvider}></Route>
            <Route exact path="/app/settings/mfa" component={DisplayUserMfa}></Route>
          </div>
        </div>
      </div>
    );
  }
}

DisplayApiUserSettingsWorkspace.propTypes = {
  context: PropTypes.any, // The application context provider
  mfaContext: PropTypes.object
};

export default withRouter(withAppContext(withMfa(DisplayApiUserSettingsWorkspace)));
