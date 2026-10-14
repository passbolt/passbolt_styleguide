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
import { Trans, withTranslation } from "react-i18next";
import { ApiMfaVerifyContextState, withApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext";

/**
 * Link returning to the mobile application that delegated the MFA verification.
 * A plain anchor: the tap is a fresh user gesture, required to open the application scheme.
 */
class ReturnToApplication extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const url = this.props.apiMfaVerifyContext.getReturnToApplicationUrl?.();
    if (!url || this.props.apiMfaVerifyContext.state === ApiMfaVerifyContextState.CEREMONY_STATE) {
      return null;
    }
    return (
      <a href={url} className="return-to-application">
        <Trans>Return to app</Trans>
      </a>
    );
  }
}

ReturnToApplication.propTypes = {
  apiMfaVerifyContext: PropTypes.object, // The api MFA verify context
};

export default withApiMfaVerifyContext(withTranslation("common")(ReturnToApplication));
