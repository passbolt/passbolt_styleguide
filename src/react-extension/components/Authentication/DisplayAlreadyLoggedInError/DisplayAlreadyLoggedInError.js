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
export const DisplayAlreadyLoggedInErrorVariations = {
  SETUP: 'setup',
  RECOVER: 'recover',
  ACCOUNT_RECOVERY: 'account-recovery',
};

class DisplayAlreadyLoggedInError extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="setup-error">
        <h1><Trans>Cannot perform the action while being logged in</Trans></h1>
        <p>
          {{
            [DisplayAlreadyLoggedInErrorVariations.SETUP]: <Trans>It is not possible to perform a setup of a new account as you are still logged in. You need to log out first before continuing.</Trans>,
            [DisplayAlreadyLoggedInErrorVariations.RECOVER]: <Trans>It is not possible to perform the recovery of your account as you are still logged in. You need to log out first before continuing.</Trans>,
            [DisplayAlreadyLoggedInErrorVariations.ACCOUNT_RECOVERY]: <Trans>It is not possible to recover your private key of your account as you are still logged in. You need to log out first before continuing.</Trans>,
          }[this.props.displayAs]}
        </p>
        <div className="form-actions">
          <button onClick={this.props.onLogoutButtonClick.bind(this)} className="button primary big full-width" role="button"><Trans>Sign out</Trans></button>
        </div>
      </div>
    );
  }
}

DisplayAlreadyLoggedInError.propTypes = {
  displayAs: PropTypes.oneOf([
    DisplayAlreadyLoggedInErrorVariations.SETUP,
    DisplayAlreadyLoggedInErrorVariations.RECOVER,
    DisplayAlreadyLoggedInErrorVariations.ACCOUNT_RECOVERY,
  ]).isRequired, // Defines how the disalog should be displayed
  onLogoutButtonClick: PropTypes.func.isRequired, // The callback function that should trigger a log out of the current user
};
export default withTranslation("common")(DisplayAlreadyLoggedInError);
