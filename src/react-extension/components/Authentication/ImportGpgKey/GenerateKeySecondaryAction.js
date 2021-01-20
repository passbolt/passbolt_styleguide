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
import {AuthenticationContext} from "../../../contexts/AuthenticationContext";

export class GenerateKeySecondaryAction extends Component {
  render() {
    return (
      <a onClick={this.context.onGoToGenerateGpgKeyRequested}>
        Or generate a new private key.
      </a>
    );
  }
}
GenerateKeySecondaryAction.contextType = AuthenticationContext;
export default GenerateKeySecondaryAction;
