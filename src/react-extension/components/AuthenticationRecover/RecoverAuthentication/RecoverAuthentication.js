import React, {Component} from "react";
import {AuthenticationContext, AuthenticationContextState} from "../../../contexts/AuthenticationContext";
import ImportGpgKey from "../../Authentication/ImportGpgKey/ImportGpgKey";
import CheckPassphrase from "../../Authentication/CheckPassphrase/CheckPassphrase";
import ChooseSecurityToken from "../../Authentication/ChooseSecurityToken/ChooseSecurityToken";
import AskForAuthenticationHelp from "../../Authentication/AskForAuthenticationHelp/AskForAuthenticationHelp";
import LoadingSpinner from "../../../../react/components/Common/Loading/LoadingSpinner/LoadingSpinner";
import PropTypes from "prop-types";
import HelpOnPrivateKeyLostSecondaryAction from "../../Authentication/CheckPassphrase/HelpOnPrivateKeyLostSecondaryAction";
import HelpOnPassphraseLostSecondaryAction
  from "../../Authentication/CheckPassphrase/HelpOnPassphraseLostSecondaryAction";
import DisplayUnexpectedError from "../../Authentication/DisplayError/DisplayUnexpectedError";
import DisplayLoginInProgress from "../../AuthenticationLogin/DisplayLoginInProgress/DisplayLoginInProgress";
import {withTranslation} from "react-i18next";

/**
 * The component orchestrates the recover authentication process
 */
class RecoverAuthentication extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.initializeRecover();
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
      this.context.onCompleteRecoverRequested();
    }
  }

  /**
   * Initialize the authentication recover process
   */
  initializeRecover() {
    this.context.onInitializeRecoverRequested();
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
      case AuthenticationContextState.RECOVER_INITIALIZED:
        return <ImportGpgKey
          title={this.translate("Welcome back, please enter your private key to begin with the recovery process.")}
          secondaryAction={<HelpOnPrivateKeyLostSecondaryAction/>}/>;
      case AuthenticationContextState.GPG_KEY_VALIDATED:
        return <CheckPassphrase canRememberMe={this.canRememberMe} secondaryAction={<HelpOnPassphraseLostSecondaryAction/>}/>;
      case AuthenticationContextState.GPG_KEY_IMPORTED:
        return <ChooseSecurityToken/>;
      case AuthenticationContextState.PASSPHRASE_LOST:
        return <AskForAuthenticationHelp/>;
      case  AuthenticationContextState.RECOVER_COMPLETED:
        return <DisplayLoginInProgress/>;
      case AuthenticationContextState.UNEXPECTED_ERROR:
        return <DisplayUnexpectedError error={this.context.error}/>;
      default:
        return <LoadingSpinner/>;
    }
  }
}

RecoverAuthentication.contextType = AuthenticationContext;
RecoverAuthentication.propTypes = {
  siteSettings: PropTypes.object, // The site settings
  t: PropTypes.func, // The translation function
};

export default withTranslation('common')(RecoverAuthentication);
