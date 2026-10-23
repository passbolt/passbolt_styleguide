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
import { withApiMfaVerifyContext } from "../../../contexts/ApiMfaVerifyContext";
import AnimatedFeedback from "../../../../shared/components/Icons/AnimatedFeedback";

/**
 * The screen displayed when the browser cannot run the passkey verification delegated by a mobile application.
 * The page navigates to the application on its own: the link is the fallback if that navigation did not happen.
 */
class DisplayMfaVerifyDelegatedUnsupported extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="mfa-verify-delegated-result mfa-verify-delegated-unsupported">
        <AnimatedFeedback name="attention" />
        <h1>
          <Trans>This browser cannot verify with a passkey.</Trans>
        </h1>
        <p>
          <Trans>
            Update your browser or your operating system, then start the verification again from the application.
          </Trans>
        </p>
        <div className="form-actions">
          <a
            className="button primary big full-width"
            href={this.props.apiMfaVerifyContext.getReturnToApplicationUrl()}
          >
            <Trans>Return to app</Trans>
          </a>
        </div>
      </div>
    );
  }
}

DisplayMfaVerifyDelegatedUnsupported.propTypes = {
  apiMfaVerifyContext: PropTypes.object, // The api MFA verify context
};

export default withApiMfaVerifyContext(withTranslation("common")(DisplayMfaVerifyDelegatedUnsupported));
