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
import PropTypes from "prop-types";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";
import {ApiTriageContextState, withApiTriageContext} from "../../../contexts/ApiTriageContext";
import EnterUsernameForm from "../../Authentication/EnterUsernameForm/EnterUsernameForm";
import EnterNameForm from "../../Authentication/EnterNameForm/EnterNameForm";
import CheckMailBox from "../../Authentication/CheckMailBox/CheckMailBox";
import DisplayRequireInvitationError from "../../Authentication/DisplayRequireInvitationError/DisplayRequireInvitationError";
import DisplayUnexpectedError from "../../Authentication/DisplayUnexpectedError/DisplayUnexpectedError";
import SsoProviders from "../../Administration/ManageSsoSettings/SsoProviders.data";
import IdentifyWithSso from "../../Authentication/IdentifyWithSso/IdentifyWithSso";

/**
 * The component orchestrates the api triage workflow.
 */
class OrchestrateApiTriage extends Component {
  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initializeTriage();
    this.getSsoProviderData = this.getSsoProviderData.bind(this);
  }

  /**
   * Initialize the triage.
   */
  initializeTriage() {
    setTimeout(this.props.apiTriageContext.onInitializeTriageRequested, 1000);
  }

  /**
   * Returns the SSO provider data based on the current provider id set in props
   * @returns {object}
   */
  getSsoProviderData() {
    const providerId = this.props.apiTriageContext.getSsoProviderId();
    return SsoProviders.find(provider => provider.id === providerId);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    switch (this.props.apiTriageContext.state) {
      case ApiTriageContextState.USERNAME_STATE:
        return <EnterUsernameForm
          isSsoRecoverEnabled={this.props.apiTriageContext.isSsoRecoverEnabled}
          onSecondaryActionClick={this.props.apiTriageContext.handleSwitchToSsoSignInState}
        />;
      case ApiTriageContextState.SSO_SIGN_IN_STATE:
        return <IdentifyWithSso
          ssoProvider={this.getSsoProviderData()}
          onSecondaryActionClick={this.props.apiTriageContext.handleSwitchToUsernameState}
          onUserRegistrationRequired={this.props.apiTriageContext.handleSwitchToEnterNameState}
        />;
      case ApiTriageContextState.CHECK_MAILBOX_STATE:
        return <CheckMailBox/>;
      case ApiTriageContextState.NAME_STATE:
        return <EnterNameForm/>;
      case ApiTriageContextState.ERROR_STATE:
        return <DisplayRequireInvitationError/>;
      case ApiTriageContextState.UNEXPECTED_ERROR_STATE:
        return <DisplayUnexpectedError
          error={this.props.apiTriageContext.unexpectedError}
        />;
      default:
        return <LoadingSpinner/>;
    }
  }
}

OrchestrateApiTriage.propTypes = {
  apiTriageContext: PropTypes.object, // The api setup context
};

export default withApiTriageContext(OrchestrateApiTriage);
