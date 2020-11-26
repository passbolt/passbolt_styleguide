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
 * @since         2.12.0
 */
import React, {Component} from "react";
import LoginContext from "./contexts/LoginContext";
import CheckMailBox from "./components/Authentication/CheckMailBox/CheckMailBox";
import {BrowserRouter as Router, Route} from "react-router-dom";

class ReactTriageSetup extends Component {
  render() {
    return (
      <Router>
        <div id="container" className="container page login">
          <div className="content">
            <div className="header">
              <div className="logo"><span className="visually-hidden">Passbolt</span></div>
            </div>
            <div className="login-form">
              <Route path="/setup/check-mailbox">
                <CheckMailBox />
              </Route>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

ReactTriageSetup.contextType = LoginContext;

export default ReactTriageSetup;
