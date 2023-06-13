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
import {ApiRecoverContextState, withApiRecoverContext} from "../../../contexts/ApiRecoverContext";
import InstallExtension from "../../Authentication/InstallExtension/InstallExtension";
import DisplayBrowserNotSupported from "../../Authentication/DisplayBrowserNotSupported/DisplayBrowserNotSupported";
import DisplayRequireInvitationError from "../../Authentication/DisplayRequireInvitationError/DisplayRequireInvitationError";
import DisplayExpiredTokenError from "../../Authentication/DisplayExpiredTokenError/DisplayExpiredTokenError";
import DisplayAlreadyLoggedInError, {DisplayAlreadyLoggedInErrorVariations} from "../../Authentication/DisplayAlreadyLoggedInError/DisplayAlreadyLoggedInError";
import DisplayUnexpectedError from "../../Authentication/DisplayUnexpectedError/DisplayUnexpectedError";

/**
 * The component orchestrates the api recover authentication workflow.
 */
class OrchestrateApiRecover extends Component {
  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initializeRecover();
  }

  /**
   * Initialize the recover.
   */
  initializeRecover() {
    setTimeout(() => this.props.apiRecoverContext.onInitializeRecoverRequested(), 1000);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    switch (this.props.apiRecoverContext.state) {
      case ApiRecoverContextState.INSTALL_EXTENSION_STATE:
        return <InstallExtension/>;
      case ApiRecoverContextState.DOWNLOAD_SUPPORTED_BROWSER_STATE:
        return <DisplayBrowserNotSupported/>;
      case ApiRecoverContextState.TOKEN_EXPIRED_STATE:
        return <DisplayExpiredTokenError/>;
      case ApiRecoverContextState.ERROR_ALREADY_SIGNED_IN_STATE:
        return <DisplayAlreadyLoggedInError
          onLogoutButtonClick={this.props.apiRecoverContext.logoutUserAndRefresh}
          displayAs={DisplayAlreadyLoggedInErrorVariations.RECOVER}
        />;
      case ApiRecoverContextState.REQUEST_INVITATION_ERROR:
        return <DisplayRequireInvitationError/>;
      case ApiRecoverContextState.UNEXPECTED_ERROR_STATE:
        return <DisplayUnexpectedError
          error={this.props.apiRecoverContext.unexpectedError}
        />;
      default:
        return <LoadingSpinner/>;
    }
  }
}

OrchestrateApiRecover.propTypes = {
  apiRecoverContext: PropTypes.object, // The api setup context
};

export default withApiRecoverContext(OrchestrateApiRecover);
