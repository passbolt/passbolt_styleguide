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
 * Link to the verification page of the next MFA provider of the user.
 */
class SelectAnotherMfaProvider extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const url = this.props.apiMfaVerifyContext.getNextProviderUrl();
    if (!url || this.props.apiMfaVerifyContext.state === ApiMfaVerifyContextState.CEREMONY_STATE) {
      return null;
    }
    return (
      <a href={url}>
        <Trans>Or try with another provider</Trans>
      </a>
    );
  }
}

SelectAnotherMfaProvider.propTypes = {
  apiMfaVerifyContext: PropTypes.object, // The api MFA verify context
};

export default withApiMfaVerifyContext(withTranslation("common")(SelectAnotherMfaProvider));
