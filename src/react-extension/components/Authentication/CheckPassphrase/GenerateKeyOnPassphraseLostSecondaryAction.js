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
import {withAuthenticationContext} from "../../../contexts/AuthenticationContext";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";

class GenerateKeyOnPassphraseLostSecondaryAction extends Component {
  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  render() {
    return (
      <a onClick={this.props.authenticationContext.onGoToGenerateGpgKeyRequested}>
        <Trans>I lost my passphrase, generate a new private key.</Trans>
      </a>
    );
  }
}

GenerateKeyOnPassphraseLostSecondaryAction.propTypes = {
  authenticationContext: PropTypes.any, // The authentication context
  t: PropTypes.func, // The translation function
};
export default withAuthenticationContext(withTranslation('common')(GenerateKeyOnPassphraseLostSecondaryAction));
