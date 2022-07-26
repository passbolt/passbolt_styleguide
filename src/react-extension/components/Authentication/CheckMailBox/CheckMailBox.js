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
import {Trans, withTranslation} from "react-i18next";

class CheckMailBox extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="email-sent-instructions">
        <div className="email-sent-bg">
        </div>
        <h1><Trans>Check your mailbox!</Trans></h1>
        <p><Trans>We sent you a link to verify your email.</Trans><br/>
          <Trans>Check your spam folder if you do not hear from us after a while.</Trans></p>
      </div>
    );
  }
}

CheckMailBox.propTypes = {
};

export default withTranslation("common")(CheckMailBox);
