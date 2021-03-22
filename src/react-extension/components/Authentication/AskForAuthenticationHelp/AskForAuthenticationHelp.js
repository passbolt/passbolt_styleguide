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
import {withAppContext} from "../../../contexts/AppContext";
import {AuthenticationContext, AuthenticationContextProcess} from "../../../contexts/AuthenticationContext";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component propose to help the use who lost his gpg key or passphrase
 */
class AskForAuthenticationHelp extends Component {
  /**
   * Default contrustor
   */
  constructor(props) {
    super(props);
    this.bindEventHandlers();
  }


  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.onGoToImportGpgKeyRequested = this.onGoToImportGpgKeyRequested.bind(this);
  }

  /**
   * When the user wants to enter its credentials again
   */
  onGoToImportGpgKeyRequested() {
    if (this.context.process === AuthenticationContextProcess.SETUP) {
      this.context.onGoToImportGpgKeyRequested();
    } else {
      this.context.onInitializeRecoverRequested();
    }
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
          <Trans>Both the private key and passphrase are required to perform an account recovery.</Trans> <Trans>If you do not access, you can request a new account to the administrator.</Trans>
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
          <a onClick={this.onGoToImportGpgKeyRequested}>
            <Trans>I want to try again.</Trans>
          </a>
        </div>
      </div>
    );
  }
}

AskForAuthenticationHelp.contextType = AuthenticationContext;

AskForAuthenticationHelp.propTypes = {
  context: PropTypes.object, // The application context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withTranslation('common')(AskForAuthenticationHelp));
