import React, {Component} from "react";
import CreateGpgKey from "../../Authentication/CreateGpgKey/CreateGpgKey";
import {AuthenticationContext, AuthenticationContextState} from "../../../contexts/AuthenticationContext";
import DownloadRecoveryKit from "../../Authentication/DownloadRecoveryKit/DownloadRecoveryKit";
import ChooseSecurityToken from "../../Authentication/ChooseSecurityToken/ChooseSecurityToken";
import ImportGpgKey from "../../Authentication/ImportGpgKey/ImportGpgKey";
import CheckPassphrase from "../../Authentication/CheckPassphrase/CheckPassphrase";
import LoadingSpinner from "../../../../react/components/Common/Loading/LoadingSpinner/LoadingSpinner";
import PropTypes from "prop-types";
import GenerateKeyOnPassphraseLostSecondaryAction
  from "../../Authentication/CheckPassphrase/GenerateKeyOnPassphraseLostSecondaryAction";
import GenerateKeySecondaryAction
  from "../../Authentication/ImportGpgKey/GenerateKeySecondaryAction";
import DisplayUnexpectedError from "../../Authentication/DisplayError/DisplayUnexpectedError";
import DisplayLoginInProgress from "../../AuthenticationLogin/DisplayLoginInProgress/DisplayLoginInProgress";
import {withTranslation} from "react-i18next";

/**
 * The component orchestrates the setup authentication process
 */
class SetupAuthentication extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.initializeSetup();
  }

  /**
   * Whenever the component is updated
   */
  componentDidUpdate() {
    this.handleSecurityTokenSaved();
  }

  /**
   * Can the user use the remember until I logout option
   * @return {boolean}
   */
  get canRememberMe() {
    return this.props.siteSettings.hasRememberMeUntilILogoutOption;
  }

  /**
   * Whenever the security token has been saved
   */
  handleSecurityTokenSaved() {
    if (this.context.state === AuthenticationContextState.SECURITY_TOKEN_SAVED) {
      this.context.onCompleteSetupRequested();
    }
  }

  /**
   * Initialize the authentication setup process
   */
  initializeSetup() {
    this.context.onInitializeSetupRequested();
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   */
  render() {
    switch (this.context.state)  {
      case AuthenticationContextState.SETUP_INITIALIZED:
        return <CreateGpgKey/>;
      case AuthenticationContextState.GPG_KEY_GENERATED:
        return <DownloadRecoveryKit/>;
      case AuthenticationContextState.RECOVERY_KIT_DOWNLOADED:
      case AuthenticationContextState.GPG_KEY_IMPORTED:
        return <ChooseSecurityToken/>;
      case AuthenticationContextState.GPG_KEY_TO_IMPORT_REQUESTED:
        return <ImportGpgKey
          title={this.translate("Welcome, please enter your private key to continue.")}
          secondaryAction={<GenerateKeySecondaryAction/>}/>;
      case AuthenticationContextState.GPG_KEY_VALIDATED:
        return <CheckPassphrase canRememberMe={this.canRememberMe} secondaryAction={<GenerateKeyOnPassphraseLostSecondaryAction/>}/>;
      case  AuthenticationContextState.SETUP_COMPLETED:
        return <DisplayLoginInProgress/>;
      case AuthenticationContextState.UNEXPECTED_ERROR:
        return <DisplayUnexpectedError error={this.context.error}/>;
      default:
        return <LoadingSpinner/>;
    }
  }
}

SetupAuthentication.contextType = AuthenticationContext;
SetupAuthentication.propTypes = {
  siteSettings: PropTypes.object, // The site settings
  t: PropTypes.func, // The translation function
};
export default withTranslation('common')(SetupAuthentication);
