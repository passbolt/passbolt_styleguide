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
import {Trans, withTranslation} from "react-i18next";

class CheckAccountRecoveryEmail extends Component {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    // @todo review style as per figma
    return (
      <div className="email-sent-instructions">
        <div className="email-sent-bg">
        </div>
        <h1><Trans>Please wait, while your request is processed.</Trans></h1>
        <p><Trans>As soon as an administrator validates your request you will receive an email link to complete the process.</Trans></p>
        <p><b><Trans>You need use the same computer and browser to finalize the process.</Trans></b></p>
      </div>
    );
  }
}

export default withTranslation("common")(CheckAccountRecoveryEmail);
