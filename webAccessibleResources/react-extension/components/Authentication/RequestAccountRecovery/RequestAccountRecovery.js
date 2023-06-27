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
import {Trans, withTranslation} from "react-i18next";

/**
 * The component display variations.
 * @type {Object}
 */
export const RequestAccountRecoveryVariations = {
  SIGN_IN: 'Sign-in',
  RECOVER: 'Recover',
  ACCOUNT_RECOVERY: 'Account recovery'
};

class RequestAccountRecovery extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="initiate-recover-account">
        <h1><Trans>Request account recovery</Trans></h1>
        <p>
          {{
            [RequestAccountRecoveryVariations.SIGN_IN]: <><Trans>Your passphrase is required to sign-in.</Trans> <Trans>If you do not have access, you can request an account recovery to an administrator.</Trans></>,
            [RequestAccountRecoveryVariations.RECOVER]: <><Trans>Both the private key and passphrase are required to recover your account.</Trans> <Trans>If you do not have access, you can request an account recovery to an administrator.</Trans></>,
            [RequestAccountRecoveryVariations.ACCOUNT_RECOVERY]: <><Trans>The passphrase you defined when initiating the account recovery is required to complete the operation.</Trans> <Trans>If you do not have access, you can request a new account recovery to an administrator.</Trans></>,
          }[this.props.displayAs]}
        </p>
        <div className="form-actions">
          <button
            type="button"
            className={`button primary big full-width ${this.isProcessing ? "processing" : ""}`}
            disabled={this.isProcessing}
            onClick={this.props.onPrimaryActionClick}>
            <Trans>Request account recovery</Trans>
          </button>
          <button type="button" className="link" onClick={this.props.onSecondaryActionClick}>
            <Trans>I want to try again.</Trans>
          </button>
        </div>
      </div>
    );
  }
}

RequestAccountRecovery.propTypes = {
  displayAs: PropTypes.oneOf([
    RequestAccountRecoveryVariations.SIGN_IN,
    RequestAccountRecoveryVariations.RECOVER,
    RequestAccountRecoveryVariations.ACCOUNT_RECOVERY,
  ]).isRequired, // Defines how the form should be displayed and behaves
  onPrimaryActionClick: PropTypes.func.isRequired, // The callback to trigger clicks on the primary action
  onSecondaryActionClick: PropTypes.func.isRequired, // The callback to trigger clicks on the secondary action
};
export default withTranslation("common")(RequestAccountRecovery);
