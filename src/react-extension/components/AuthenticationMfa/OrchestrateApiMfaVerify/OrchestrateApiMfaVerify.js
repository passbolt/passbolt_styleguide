/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.17.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "../../Common/Loading/LoadingSpinner/LoadingSpinner";
import { ApiMfaVerifyContextState, withApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext";
import VerifyWithPasskey from "../VerifyWithPasskey/VerifyWithPasskey";
import DisplayMfaVerifyError from "../DisplayMfaVerifyError/DisplayMfaVerifyError";

/**
 * The component orchestrates the api MFA verify workflow.
 */
class OrchestrateApiMfaVerify extends Component {
  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    this.props.apiMfaVerifyContext.onInitializeRequested();
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    switch (this.props.apiMfaVerifyContext.state) {
      case ApiMfaVerifyContextState.VERIFY_STATE:
      case ApiMfaVerifyContextState.CEREMONY_STATE:
        return <VerifyWithPasskey />;
      case ApiMfaVerifyContextState.ERROR_STATE:
        return <DisplayMfaVerifyError />;
      default:
        return <LoadingSpinner />;
    }
  }
}

OrchestrateApiMfaVerify.propTypes = {
  apiMfaVerifyContext: PropTypes.object, // The api MFA verify context
};

export default withApiMfaVerifyContext(OrchestrateApiMfaVerify);
