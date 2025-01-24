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
import DisplayUserBadgeMenu from "../../User/DisplayUserBadgeMenu/DisplayUserBadgeMenu";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import NavigateIntoUserSettingsWorkspace from "../NavigateIntoUserSettingsWorkspace/NavigateIntoUserSettingsWorkspace";
import DisplayUserSettingsWorkspaceBreadcrumb
  from "../DisplayUserSettingsWorkspaceBreadcrumb/DisplayUserSettingsWorkspaceBreadcrumb";
import PropTypes from "prop-types";
import {withMfa} from '../../../contexts/MFAContext';
import DisplayUserMfaProvider from '../DisplayUserMfa/DisplayUserMfaProvider';
import DisplayUserMfa from "../DisplayUserMfa/DisplayUserMfa";
import ArrowLeftSVG from "../../../../img/svg/arrow_left.svg";
import {Trans} from "react-i18next";
import {withNavigationContext} from "../../../contexts/NavigationContext";

/**
 * This component is a container for all the user settings workspace features
 */
class DisplayApiUserSettingsWorkspace extends React.Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.bindCallbacks();
  }

  /**
   * Bind callbacks methods
   * @return {void}
   */
  bindCallbacks() {
    this.handleGoBack = this.handleGoBack.bind(this);
  }

  /**
   * Return if user has to define mfa.
   * @returns {bool}
   */
  get isMfaChoiceRequired() {
    return this.props.mfaContext.isMfaChoiceRequired();
  }

  /**
   * Handle go back to resource workspace
   */
  handleGoBack() {
    this.props.navigationContext.onGoToPasswordsRequested();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="panel main">
        <div className="panel left">
          <div className="sidebar-content">
            <div className="top-bar-left-navigation">
              <div className="navigation">
                <button type="button" className="button-transparent back" onClick={this.handleGoBack}>
                  <ArrowLeftSVG/>
                </button>
                <span className="title my-profile"><Trans>My Profile</Trans></span>
              </div>
            </div>
            <div className="sidebar-content-left">
              <NavigateIntoUserSettingsWorkspace hasPendingMfaChoice={this.isMfaChoiceRequired}/>
            </div>
          </div>
        </div>
        <div className="panel middle">
          <div className="header">
            <DisplayUserBadgeMenu baseUrl={this.props.context.trustedDomain} user={this.props.context.loggedInUser}/>
          </div>
          <div className="middle-right">
            <div className="breadcrumbs-and-grid">
              <div className="top-bar">
                <DisplayUserSettingsWorkspaceBreadcrumb/>
              </div>
              <div className="main-page">
                <Route exact path="/app/settings/mfa/:provider" component={DisplayUserMfaProvider}></Route>
                <Route exact path="/app/settings/mfa" component={DisplayUserMfa}></Route>
              </div>
            </div>
            <div className="help-panel">
              {/* TODO Should display according help panel information */}
              <div className="sidebar-help">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayApiUserSettingsWorkspace.propTypes = {
  context: PropTypes.any, // The application context provider
  mfaContext: PropTypes.object,
  navigationContext: PropTypes.any, // The application navigation context
};

export default withRouter(withAppContext(withMfa(withNavigationContext(DisplayApiUserSettingsWorkspace))));
