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
import { withApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext";
import { ApiMfaVerifyDelegatedContextState } from "../../../contexts/ApiMfaVerifyDelegatedContext";
import VerifyWithPasskey from "../VerifyWithPasskey/VerifyWithPasskey";
import DisplayMfaVerifyError from "../DisplayMfaVerifyError/DisplayMfaVerifyError";
import DisplayMfaVerifyDelegatedSuccess from "../DisplayMfaVerifyDelegatedSuccess/DisplayMfaVerifyDelegatedSuccess";
import DisplayMfaVerifyDelegatedExpired from "../DisplayMfaVerifyDelegatedExpired/DisplayMfaVerifyDelegatedExpired";
import DisplayMfaVerifyDelegatedUnsupported from "../DisplayMfaVerifyDelegatedUnsupported/DisplayMfaVerifyDelegatedUnsupported";

/**
 * The component orchestrates the MFA verify workflow delegated by the mobile applications.
 */
class OrchestrateApiMfaVerifyDelegated extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    switch (this.props.apiMfaVerifyContext.state) {
      case ApiMfaVerifyDelegatedContextState.VERIFY_STATE:
      case ApiMfaVerifyDelegatedContextState.CEREMONY_STATE:
        return <VerifyWithPasskey />;
      case ApiMfaVerifyDelegatedContextState.VERIFIED_STATE:
        return <DisplayMfaVerifyDelegatedSuccess />;
      case ApiMfaVerifyDelegatedContextState.EXPIRED_STATE:
        return <DisplayMfaVerifyDelegatedExpired />;
      case ApiMfaVerifyDelegatedContextState.UNSUPPORTED_STATE:
        return <DisplayMfaVerifyDelegatedUnsupported />;
      case ApiMfaVerifyDelegatedContextState.ERROR_STATE:
        return <DisplayMfaVerifyError />;
      default:
        return <LoadingSpinner />;
    }
  }
}

OrchestrateApiMfaVerifyDelegated.propTypes = {
  apiMfaVerifyContext: PropTypes.object, // The api MFA verify context
};

export default withApiMfaVerifyContext(OrchestrateApiMfaVerifyDelegated);
