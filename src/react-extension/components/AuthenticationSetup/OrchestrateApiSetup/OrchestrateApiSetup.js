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
import {ApiSetupContextState, withApiSetupContext} from "../../../contexts/ApiSetupContext";
import InstallExtension from "../../Authentication/InstallExtension/InstallExtension";
import DisplayBrowserNotSupported from "../../Authentication/DisplayBrowserNotSupported/DisplayBrowserNotSupported";
import DisplayRequireInvitationError from "../../Authentication/DisplayError/DisplayRequireInvitationError";
import DisplayExpiredTokenError from "../../Authentication/DisplayError/DisplayExpiredTokenError";

/**
 * The component orchestrates the api setup authentication workflow.
 */
class OrchestrateApiSetup extends Component {
  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initializeSetup();
  }

  /**
   * Initialize the setup.
   */
  initializeSetup() {
    setTimeout(() => this.props.apiSetupContext.onInitializeSetupRequested(), 1000);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    switch (this.props.apiSetupContext.state) {
      case ApiSetupContextState.INSTALL_EXTENSION_STATE:
        return <InstallExtension/>;
      case ApiSetupContextState.DOWNLOAD_SUPPORTED_BROWSER_STATE:
        return <DisplayBrowserNotSupported/>;
      case ApiSetupContextState.TOKEN_EXPIRED_STATE:
        return <DisplayExpiredTokenError/>;
      case ApiSetupContextState.ERROR_STATE:
        return <DisplayRequireInvitationError/>;
      default:
        return <LoadingSpinner/>;
    }
  }
}

OrchestrateApiSetup.propTypes = {
  apiSetupContext: PropTypes.object, // The api setup context
};

export default withApiSetupContext(OrchestrateApiSetup);
