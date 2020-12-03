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
/*
 * import EnterUsernameForm from "./components/Login/EnterUsernameForm";
 * import DisplayInvitationRequiredFeedback from "./components/Login/DisplayInvitationRequiredFeedback";
 * import DisplayCheckMailboxFeedback from "./components/Login/DisplayCheckMailboxFeedback";
 * import EnterNameForm from "./components/Login/EnterNameForm";
 * import EnterPassphraseForm from "./components/Login/EnterPassphraseForm";
 * import ImportPrivateKeyForm from "./components/Login/ImportPrivateKeyForm";
 * import ChooseSecurityTokenForm from "./components/Login/ChooseSecurityTokenForm";
 * import CheckExtensionPresence from "./components/Login/CheckExtensionPresence";
 * import InstallExtension from "./components/Login/InstallExtension";
 * import ApproveServerPublicKey from "./components/Login/ApproveServerPublicKey";
 */
import AuthenticationContextProvider, {AuthenticationContext} from "./contexts/AuthenticationContext";
import SetupAuthentication from "./components/AuthenticationSetup/SetupAuthentication/SetupAuthentication";
import ManageDialogs from "./components/Common/Dialog/ManageDialogs/ManageDialogs";
import DialogContextProvider from "../react/contexts/Common/DialogContext";

class ReactAuthenticationSetup extends Component {
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
      <AuthenticationContextProvider value={this.defaultContextValue}>
        <DialogContextProvider>
          <div id="container" className="container page login">
            <ManageDialogs/>
            <div className="content">
              <div className="header">
                <div className="logo"><span className="visually-hidden">Passbolt</span></div>
              </div>
              <div className="login-form">
                <SetupAuthentication/>
              </div>
            </div>
          </div>
        </DialogContextProvider>
      </AuthenticationContextProvider>
    );
  }
}

ReactAuthenticationSetup.contextType = AuthenticationContext;
ReactAuthenticationSetup.propTypes = {
  port: PropTypes.object,
  storage: PropTypes.object,
};
export default ReactAuthenticationSetup;

