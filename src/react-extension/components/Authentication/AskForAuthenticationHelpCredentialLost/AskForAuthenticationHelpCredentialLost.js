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
 * The component display variations.
 * @type {Object}
 */
export const AskForAuthenticationHelpCredentialLostVariations = {
  SIGN_IN: 'Sign in',
  RECOVER: 'Recover',
};

/**
 * This component propose to help the uses who lost its credentials.
 */
class AskForAuthenticationHelpCredentialLost extends Component {
  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <div className="ask-for-authentication-help">
        <h1><Trans>Sorry... maybe an administrator can help?</Trans></h1>
        <p>
          {{
            [AskForAuthenticationHelpCredentialLostVariations.SIGN_IN]: <><Trans>Your passphrase is required to sign-in.</Trans> <Trans>If you do not have access, you can request help to an administrator.</Trans></>,
            [AskForAuthenticationHelpCredentialLostVariations.RECOVER]: <><Trans>Both the private key and passphrase are required to recover your account.</Trans> <Trans>If you do not have access, you can request help to an administrator.</Trans></>,
          }[this.props.displayAs]}
        </p>
        <div className="form-actions">
          {this.props.canRequestHelp &&
          <>
            <button
              onClick={this.props.onPrimaryActionClick.bind(this)}
              className="button primary big full-width"
              role="button"
              rel="noopener noreferrer">
              <Trans>Request help</Trans>
            </button>
            <a onClick={this.props.onSecondaryActionClick.bind(this)}>
              <Trans>I want to try again.</Trans>
            </a>
          </>
          }
          {!this.props.canRequestHelp &&
          <button
            onClick={this.props.onSecondaryActionClick.bind(this)}
            className="button primary big full-width"
            role="button"
            rel="noopener noreferrer">
            <Trans>I want to try again.</Trans>
          </button>
          }
        </div>
      </div>
    );
  }
}

AskForAuthenticationHelpCredentialLost.defaultProps = {
  canRequestHelp: true,
};

AskForAuthenticationHelpCredentialLost.propTypes = {
  displayAs: PropTypes.oneOf([
    AskForAuthenticationHelpCredentialLostVariations.SIGN_IN,
    AskForAuthenticationHelpCredentialLostVariations.RECOVER,
  ]).isRequired, // Defines how the form should be displayed and behaves
  context: PropTypes.object.isRequired, // The application context.
  onPrimaryActionClick: PropTypes.func.isRequired, // The callback to trigger when the user wants to request help.
  onSecondaryActionClick: PropTypes.func.isRequired, // The callback to trigger when the user wants to try again.
  canRequestHelp: PropTypes.bool, // Can the user request administrator help. @deprecated since v3.6 the request help feature was added with v3.6
};

export default withAppContext(withTranslation("common")(AskForAuthenticationHelpCredentialLost));
