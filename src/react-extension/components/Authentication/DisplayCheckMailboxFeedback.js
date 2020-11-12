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

class DisplayCheckMailboxFeedback extends Component {
  render() {
    return (
      <div className="check-mailbox-feedback">
        <div className="email-sent-instructions">
          <div className="email-sent-bg"/>
          <h1>Check your mailbox!</h1>
          <p>
            We sent you a link to verify your email.
            Check your spam folder if you do not see hear from us after a while.
          </p>
        </div>
      </div>
    );
  }
}

export default DisplayCheckMailboxFeedback;
