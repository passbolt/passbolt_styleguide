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

class DisplayInvitationRequiredFeedback extends Component {
  render() {
    return (
      <div className="invitation-required-feedback">
        <h1>Access to this service requires an invitation.</h1>
        <p>
          This email is not associated with any approved users on this domain.
          Please contact your administrator to request an invitation link.
        </p>
        <div className="form-actions">
          <a href="#" className="button primary big" role="button">
            Try with another email
          </a>
        </div>
      </div>
    );
  }
}

export default DisplayInvitationRequiredFeedback;
