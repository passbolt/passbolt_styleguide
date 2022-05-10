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
 * @since         3.6.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  ApiAccountRecoveryContextState,
  withApiAccountRecoveryContext
} from "../../../contexts/ApiAccountRecoveryContext";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";
import DisplayUnexpectedError from "../../Authentication/DisplayUnexpectedError/DisplayUnexpectedError";
import DisplayRestartFromScratchError from "../DisplayRestartFromScratchError/DisplayRestartFromScratchError";
import DisplayExpiredTokenError from "../DisplayExpiredTokenError/DisplayExpiredTokenError";
import DisplayAlreadyLoggedInError, {DisplayAlreadyLoggedInErrorVariations} from "../../Authentication/DisplayAlreadyLoggedInError/DisplayAlreadyLoggedInError";

/**
 * The component orchestrates the api account recovery authentication workflow.
 */
class OrchestrateApiAccountRecovery extends Component {
  /**
   * Whenever the component is initialized
   */
  componentDidMount() {
    this.initializeAccountRecovery();
  }

  /**
   * Initialize the recover.
   */
  initializeAccountRecovery() {
    setTimeout(() => this.props.apiAccountRecoveryContext.onInitializeAccountRecoveryRequested(), 1000);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    switch (this.props.apiAccountRecoveryContext.state) {
      case ApiAccountRecoveryContextState.RESTART_FROM_SCRATCH:
        return <DisplayRestartFromScratchError/>;
      case ApiAccountRecoveryContextState.TOKEN_EXPIRED_STATE:
        return <DisplayExpiredTokenError/>;
      case ApiAccountRecoveryContextState.ERROR_ALREADY_SIGNED_IN_STATE:
        return <DisplayAlreadyLoggedInError
          onLogoutButtonClick={this.props.apiAccountRecoveryContext.logoutUserAndRefresh}
          displayAs={DisplayAlreadyLoggedInErrorVariations.ACCOUNT_RECOVERY}
        />;
      case ApiAccountRecoveryContextState.UNEXPECTED_ERROR_STATE:
        return <DisplayUnexpectedError
          error={this.props.apiAccountRecoveryContext.unexpectedError}
        />;
      default:
        return <LoadingSpinner/>;
    }
  }
}

OrchestrateApiAccountRecovery.propTypes = {
  apiAccountRecoveryContext: PropTypes.object, // The api account recovery context
};

export default withApiAccountRecoveryContext(OrchestrateApiAccountRecovery);
