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

import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import ReactAuthenticationSetup from "../../../../src/react-extension/ReactAuthenticationSetup";
import mockPort from "../../mock/mockPort";
import mockStorage from "../../mock/mockStorage";

const mockedStorage = mockStorage();
const mockedPort = mockPort(mockedStorage);

class DemoReactLogin extends Component {

  render() {
    return (
      <ReactAuthenticationSetup ref={this.reactExtensionElement} port={mockedPort} storage={mockedStorage}/>
    );
  }
}

const domContainer = document.getElementById("root");
ReactDOM.render(<DemoReactLogin/>, domContainer);
