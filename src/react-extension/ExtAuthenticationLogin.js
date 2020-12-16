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
 * @since         2.12.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import AuthenticationContextProvider, {AuthenticationContext} from "./contexts/AuthenticationContext";
import ManageDialogs from "./components/Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../react/contexts/Common/DialogContext";
import {BrowserRouter as Router} from "react-router-dom";
import OrchestrateLogin from "./components/AuthenticationLogin/OrchestrateLogin/OrchestrateLogin";

/**
 * The login application served by the browser extension.
 */
class ExtAuthenticationLogin extends Component {
  /**
   * Returns the component default state
   */
  get defaultContextValue() {
    return {
      port: this.props.port,
      storage: this.props.storage,
    };
  }

  /**
   * Renders the component
   */
  render() {
    return (
      <Router>
        <AuthenticationContextProvider value={this.defaultContextValue}>
          <DialogContextProvider>
            <div id="container" className="container page login">
              <ManageDialogs/>
              <div className="content">
                <div className="header">
                  <div className="logo"><span className="visually-hidden">Passbolt</span></div>
                </div>
                <div className="login-form">
                  <OrchestrateLogin/>
                </div>
              </div>
            </div>
          </DialogContextProvider>
        </AuthenticationContextProvider>
      </Router>
    );
  }
}

ExtAuthenticationLogin.contextType = AuthenticationContext;
ExtAuthenticationLogin.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};

export default ExtAuthenticationLogin;

