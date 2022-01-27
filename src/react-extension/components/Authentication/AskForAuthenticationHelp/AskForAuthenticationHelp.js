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
import {withAppContext} from "../../../contexts/AppContext";

/**
 * This component propose to help the use who lost his gpg key or passphrase
 */
class AskForAuthenticationHelp extends Component {
  /**
   * When the user wants to try again.
   */
  handleClickTryAgain() {
    this.props.onTryAgain();
  }

  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="ask-for-authentication-help">
        <h1><Trans>Sorry... maybe an administrator can help?</Trans></h1>
        <p>
          <Trans>Both the private key and passphrase are required to perform an account recovery.</Trans> <Trans>If you do not have access, you can request a new account from the administrator.</Trans>
        </p>
        <div className="form-actions">
          <a
            href={`${this.props.context.trustedDomain}/users/recover`}
            className="button primary big full-width"
            role="button"
            target="_parent"
            rel="noopener noreferrer">
            <Trans>Request new account</Trans>
          </a>
          <a onClick={this.handleClickTryAgain.bind(this)}>
            <Trans>I want to try again.</Trans>
          </a>
        </div>
      </div>
    );
  }
}

AskForAuthenticationHelp.propTypes = {
  context: PropTypes.object.isRequired, // The application context.
  onTryAgain: PropTypes.func.isRequired, // The callback to trigger when the user wants to try again.
};

export default withAppContext(withTranslation('common')(AskForAuthenticationHelp));
