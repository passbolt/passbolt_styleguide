/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../contexts/AppContext";
import {
  AuthenticationRecoverWorkflowStates,
  withAuthenticationRecoverContext
} from "../../../contexts/Authentication/AuthenticationRecoverContext";
import ImportGpgKey, {ImportGpgKeyVariations} from "../../Authentication/ImportGpgKey/ImportGpgKey";
import CheckPassphrase, {CheckPassphraseVariations} from "../../Authentication/CheckPassphrase/CheckPassphrase";
import ChooseSecurityToken from "../../Authentication/ChooseSecurityToken/ChooseSecurityToken";
import AskForAuthenticationHelp from "../../Authentication/AskForAuthenticationHelp/AskForAuthenticationHelp";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";
import DisplayUnexpectedError from "../../Authentication/DisplayUnexpectedError/DisplayUnexpectedError";
import IntroduceExtension from "../../Authentication/IntroduceExtension/IntroduceExtension";
import InitiateAccountRecovery from "../../Authentication/RequestAccountRecovery/RequestAccountRecovery";
import CreateGpgKey, {CreateGpgKeyVariation} from "../../Authentication/CreateGpgKey/CreateGpgKey";
import CheckAccountRecoveryEmail from "../../Authentication/CheckAccountRecoveryEmail/CheckAccountRecoveryEmail";

/**
 * The component orchestrates the recover authentication process
 */
class RecoverAuthentication extends Component {
  /**
   * Render the component
   */
  render() {
    switch (this.props.authenticationRecoverContext.state) {
      case AuthenticationRecoverWorkflowStates.INTRODUCE_EXTENSION:
        return <IntroduceExtension
          onComplete={this.props.authenticationRecoverContext.goToImportGpgKey.bind(this)}
        />;
      case AuthenticationRecoverWorkflowStates.IMPORT_GPG_KEY:
        return <ImportGpgKey
          displayAs={ImportGpgKeyVariations.RECOVER}
          onComplete={this.props.authenticationRecoverContext.importGpgKey.bind(this)}
          onSecondaryActionClick={this.props.authenticationRecoverContext.requestHelpCredentialsLost.bind(this)}
          validatePrivateGpgKey={this.props.authenticationRecoverContext.validatePrivateKey.bind(this)}
        />;
      case AuthenticationRecoverWorkflowStates.VALIDATE_PASSPHRASE:
        return <CheckPassphrase
          displayAs={CheckPassphraseVariations.RECOVER}
          canRememberMe={this.props.context.siteSettings.hasRememberMeUntilILogoutOption}
          onComplete={this.props.authenticationRecoverContext.checkPassphrase.bind(this)}
          onSecondaryActionClick={this.props.authenticationRecoverContext.requestHelpCredentialsLost.bind(this)}
        />;
      case AuthenticationRecoverWorkflowStates.CHOOSE_SECURITY_TOKEN:
        return <ChooseSecurityToken
          onComplete={this.props.authenticationRecoverContext.chooseSecurityToken.bind(this)}
        />;
      case  AuthenticationRecoverWorkflowStates.SIGNING_IN:
        return <LoadingSpinner
          title={<Trans>Signing in, please wait...</Trans>}
        />;
      case AuthenticationRecoverWorkflowStates.HELP_CREDENTIALS_LOST:
        return <AskForAuthenticationHelp
          onTryAgain={this.props.authenticationRecoverContext.goToImportGpgKey.bind(this)}
        />;
      case AuthenticationRecoverWorkflowStates.INITIATE_ACCOUNT_RECOVERY:
        return <InitiateAccountRecovery
          onComplete={this.props.authenticationRecoverContext.initiateAccountRecovery.bind(this)}
        />;
      case AuthenticationRecoverWorkflowStates.GENERATE_ACCOUNT_RECOVERY_GPG_KEY:
        return <CreateGpgKey
          displayAs={CreateGpgKeyVariation.GENERATE_ACCOUNT_RECOVERY_GPG_KEY}
          onComplete={this.props.authenticationRecoverContext.generateAccountRecoveryGpgKey.bind(this)}
        />;
      case AuthenticationRecoverWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_SECURITY_TOKEN:
        return <ChooseSecurityToken
          onComplete={this.props.authenticationRecoverContext.chooseAccountRecoverySecurityToken.bind(this)}
        />;
      case AuthenticationRecoverWorkflowStates.REQUESTING_ACCOUNT_RECOVERY:
        return <LoadingSpinner
          title={<Trans>Requesting administrator approval. Please wait...</Trans>}
        />;
      case AuthenticationRecoverWorkflowStates.CHECK_ACCOUNT_RECOVERY_EMAIL:
        return <CheckAccountRecoveryEmail/>;
      case AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR:
        return <DisplayUnexpectedError
          error={this.props.authenticationRecoverContext.error}
        />;
      case AuthenticationRecoverWorkflowStates.LOADING:
        return <LoadingSpinner/>;
    }
  }
}

RecoverAuthentication.propTypes = {
  context: PropTypes.any, // The application context
  authenticationRecoverContext: PropTypes.any.isRequired, // The authentication recover context
};

export default withAppContext(withAuthenticationRecoverContext(withTranslation('common')(RecoverAuthentication)));
