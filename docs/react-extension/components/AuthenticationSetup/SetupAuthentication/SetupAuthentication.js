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
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {
  AuthenticationSetupWorkflowStates,
  withAuthenticationSetupContext
} from "../../../contexts/Authentication/AuthenticationSetupContext";
import CheckPassphrase, {CheckPassphraseVariations} from "../../Authentication/CheckPassphrase/CheckPassphrase";
import ChooseAccountRecoveryPreference
  from "../../Authentication/ChooseAccountRecoveryPreference/ChooseAccountRecoveryPreference";
import ChooseSecurityToken from "../../Authentication/ChooseSecurityToken/ChooseSecurityToken";
import CreateGpgKey, {CreateGpgKeyVariation} from "../../Authentication/CreateGpgKey/CreateGpgKey";
import DisplayUnexpectedError from "../../Authentication/DisplayUnexpectedError/DisplayUnexpectedError";
import DownloadRecoveryKit from "../../Authentication/DownloadRecoveryKit/DownloadRecoveryKit";
import ImportGpgKey, {ImportGpgKeyVariations} from "../../Authentication/ImportGpgKey/ImportGpgKey";
import IntroduceExtension from "../../Authentication/IntroduceExtension/IntroduceExtension";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";

/**
 * The component orchestrates the setup authentication process
 */
class SetupAuthentication extends Component {
  /**
   * Render the component
   */
  render() {
    switch (this.props.authenticationSetupContext.state)  {
      case AuthenticationSetupWorkflowStates.INTRODUCE_EXTENSION:
        return <IntroduceExtension
          onComplete={this.props.authenticationSetupContext.goToGenerateGpgKey}
        />;
      case AuthenticationSetupWorkflowStates.GENERATE_GPG_KEY:
        return <CreateGpgKey
          displayAs={CreateGpgKeyVariation.SETUP}
          onComplete={this.props.authenticationSetupContext.generateGpgKey}
          onSecondaryActionClick={this.props.authenticationSetupContext.goToImportGpgKey}
        />;
      case AuthenticationSetupWorkflowStates.DOWNLOAD_RECOVERY_KIT:
        return <DownloadRecoveryKit
          onDownload={this.props.authenticationSetupContext.downloadRecoveryKit}
          onComplete={this.props.authenticationSetupContext.handleRecoveryKitDownloaded}
        />;
      case AuthenticationSetupWorkflowStates.IMPORT_GPG_KEY:
        return <ImportGpgKey
          displayAs={ImportGpgKeyVariations.SETUP}
          onComplete={this.props.authenticationSetupContext.importGpgKey}
          onSecondaryActionClick={this.props.authenticationSetupContext.goToGenerateGpgKey}
          validatePrivateGpgKey={this.props.authenticationSetupContext.validatePrivateKey}
        />;
      case AuthenticationSetupWorkflowStates.VALIDATE_PASSPHRASE:
        return <CheckPassphrase
          displayAs={CheckPassphraseVariations.SETUP}
          canRememberMe={this.props.context.siteSettings.hasRememberMeUntilILogoutOption}
          onComplete={this.props.authenticationSetupContext.checkPassphrase}
          onSecondaryActionClick={this.props.authenticationSetupContext.goToGenerateGpgKey}
        />;
      case AuthenticationSetupWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_PREFERENCE:
        return <ChooseAccountRecoveryPreference
          policy={this.props.authenticationSetupContext.accountRecoveryOrganizationPolicy?.policy}
          onComplete={this.props.authenticationSetupContext.chooseAccountRecoveryPreference}
          canGenerateNewKeyInstead={!this.props.authenticationSetupContext.gpgKeyGenerated}
          onGenerateNewKeyInstead={this.props.authenticationSetupContext.goToGenerateGpgKey}
        />;
      case AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN:
        return <ChooseSecurityToken
          onComplete={this.props.authenticationSetupContext.chooseSecurityToken}
        />;
      case AuthenticationSetupWorkflowStates.CONFIGURING_SSO:
        return <LoadingSpinner
          title={<Trans>Configuring SSO access, please wait...</Trans>}
        />;
      case AuthenticationSetupWorkflowStates.COMPLETING_SETUP:
        return <LoadingSpinner
          title={<Trans>Completing setup, please wait...</Trans>}
        />;
      case AuthenticationSetupWorkflowStates.SIGNING_IN:
        return <LoadingSpinner
          title={<Trans>Signing in, please wait.</Trans>}
        />;
      case AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR:
        return <DisplayUnexpectedError
          error={this.props.authenticationSetupContext.error}
        />;
      case AuthenticationSetupWorkflowStates.RETRY_SETUP:
        return <DisplayUnexpectedError
          title={<Trans>Time is up</Trans>}
          message={<><Trans>You took too long to set up your account.</Trans> <Trans>Please try again.</Trans></>}
        />;
      case AuthenticationSetupWorkflowStates.LOADING:
        return <LoadingSpinner/>;
    }
  }
}

SetupAuthentication.propTypes = {
  context: PropTypes.any, // The application context
  authenticationSetupContext: PropTypes.any.isRequired, // The authentication setup context
};

export default withAppContext(withAuthenticationSetupContext(withTranslation("common")(SetupAuthentication)));
