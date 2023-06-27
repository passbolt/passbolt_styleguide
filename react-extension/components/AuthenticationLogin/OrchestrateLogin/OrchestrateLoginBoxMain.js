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
import React, {Component} from "react";
import Login from "../Login/Login";
import SsoLogin from "../SsoLogin/SsoLogin";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {
  AuthenticationLoginWorkflowStates,
  withAuthenticationLoginContext
} from "../../../contexts/Authentication/AuthenticationLoginContext";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";
import AcceptLoginServerKeyChange from "../AcceptLoginServerKeyChange/AcceptLoginServerKeyChange";
import DisplayUnexpectedError from "../../Authentication/DisplayUnexpectedError/DisplayUnexpectedError";
import RequestAccountRecovery, {RequestAccountRecoveryVariations} from "../../Authentication/RequestAccountRecovery/RequestAccountRecovery";
import AskForAuthenticationHelp, {AskForAuthenticationHelpCredentialLostVariations} from "../../Authentication/AskForAuthenticationHelpCredentialLost/AskForAuthenticationHelpCredentialLost";
import CheckMailBox from "../../Authentication/CheckMailBox/CheckMailBox";
import DisplaySsoDisabledError from "../../Sso/DisplaySsoDisabledError";
import DisplaySsoProviderMismatchError from "../../Sso/DisplaySsoProviderMismatchError";

/**
 * The component orchestrates the login authentication box main content.
 */
class OrchestrateLoginBoxMain extends Component {
  /**
   * Render the component
   */
  render() {
    switch (this.props.authenticationLoginContext.state) {
      case AuthenticationLoginWorkflowStates.SIGN_IN:
        return <Login
          canRememberMe={this.props.context.siteSettings.hasRememberMeUntilILogoutOption}
          userSettings={this.props.context.userSettings}
          onSignIn={this.props.authenticationLoginContext.signIn}
          isSsoAvailable={this.props.authenticationLoginContext.isSsoAvailable()}
          onCheckPassphrase={this.props.authenticationLoginContext.checkPassphrase}
          onSecondaryActionClick={this.props.authenticationLoginContext.needHelpCredentialsLost}
          switchToSsoLogin={this.props.authenticationLoginContext.handleSwitchToSso}
        />;
      case AuthenticationLoginWorkflowStates.SIGN_IN_SSO:
        return <SsoLogin
          userSettings={this.props.context.userSettings}
          onSecondaryActionClick={this.props.authenticationLoginContext.needHelpCredentialsLost}
          onSsoSignIn={this.props.authenticationLoginContext.handleSsoSignIn}
          ssoProvider={this.props.authenticationLoginContext.getSsoProvider()}
          switchToPassphraseLogin={this.props.authenticationLoginContext.handleSwitchToPassphrase}
        />;
      case AuthenticationLoginWorkflowStates.ACCEPT_NEW_SERVER_KEY:
        return <AcceptLoginServerKeyChange
          serverKey={this.props.authenticationLoginContext.serverKey}
          onAccept={this.props.authenticationLoginContext.acceptNewServerKey}
        />;
      case AuthenticationLoginWorkflowStates.SIGNING_IN:
        return <LoadingSpinner
          title={<Trans>Signing in, please wait...</Trans>}
        />;
      case AuthenticationLoginWorkflowStates.SIGN_IN_ERROR:
        return <DisplayUnexpectedError
          title={<Trans>Sorry, you have not been signed in.</Trans>}
          message={<Trans>Something went wrong, the sign in failed with the following error:</Trans>}
          error={this.props.authenticationLoginContext.error}
        />;
      case AuthenticationLoginWorkflowStates.INITIATE_ACCOUNT_RECOVERY:
        return <RequestAccountRecovery
          displayAs={RequestAccountRecoveryVariations.SIGN_IN}
          onPrimaryActionClick={this.props.authenticationLoginContext.requestHelpCredentialsLost.bind(this)}
          onSecondaryActionClick={this.props.authenticationLoginContext.goToValidatePassphrase.bind(this)}
        />;
      case AuthenticationLoginWorkflowStates.HELP_CREDENTIALS_LOST:
        return <AskForAuthenticationHelp
          displayAs={AskForAuthenticationHelpCredentialLostVariations.SIGN_IN}
          onPrimaryActionClick={this.props.authenticationLoginContext.requestHelpCredentialsLost.bind(this)}
          onSecondaryActionClick={this.props.authenticationLoginContext.goToValidatePassphrase.bind(this)}
          canRequestHelp={this.props.context.siteSettings.canIUse('accountRecoveryRequestHelp')}
        />;
      case AuthenticationLoginWorkflowStates.CHECK_MAILBOX:
        return <CheckMailBox/>;
      case AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR:
        return <DisplayUnexpectedError
          error={this.props.authenticationLoginContext.error}
        />;
      case AuthenticationLoginWorkflowStates.SSO_DISABLED_ERROR:
        return <DisplaySsoDisabledError
          onSignInWithPassphraseClick={this.props.authenticationLoginContext.handleUserConfirmSsoDisable}
        />;
      case AuthenticationLoginWorkflowStates.SSO_PROVIDER_MISMATCH_ERROR:
        return <DisplaySsoProviderMismatchError
          onAcceptNewProvider={this.props.authenticationLoginContext.handleUserConfirmSsoProviderChange}
          newProvider={this.props.authenticationLoginContext.getNewSsoProvider()}
        />;
      case AuthenticationLoginWorkflowStates.LOADING:
        return <LoadingSpinner/>;
    }
  }
}

OrchestrateLoginBoxMain.propTypes = {
  context: PropTypes.any.isRequired, // The application context
  authenticationLoginContext: PropTypes.any.isRequired, // The authentication login context
};
export default withAppContext(withAuthenticationLoginContext(withTranslation("common")(OrchestrateLoginBoxMain)));
