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
import {Trans, withTranslation} from "react-i18next";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {
  AuthenticationLoginWorkflowStates,
  withAuthenticationLoginContext
} from "../../../contexts/Authentication/AuthenticationLoginContext";

/**
 * The component orchestrates the login authentication box footer.
 */
class OrchestrateLoginBoxFooter extends Component {
  /**
   * Render the component
   */
  render() {
    switch (this.props.authenticationLoginContext.state) {
      case AuthenticationLoginWorkflowStates.SIGN_IN:
      case AuthenticationLoginWorkflowStates.SIGN_IN_SSO:
        return <div className="login-box-footer-actions">
          <button type="button" className="link" onClick={this.props.authenticationLoginContext.handleSwitchAccount}>
            <Trans>Or switch to another account.</Trans>
          </button>
        </div>;
      default:
        return <></>;
    }
  }
}

OrchestrateLoginBoxFooter.propTypes = {
  context: PropTypes.any.isRequired, // The application context
  authenticationLoginContext: PropTypes.any.isRequired, // The authentication login context
};
export default withAppContext(withAuthenticationLoginContext(withTranslation("common")(OrchestrateLoginBoxFooter)));
