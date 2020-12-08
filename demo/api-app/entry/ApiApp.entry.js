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
 */

/**
 * This is a demo entry point that has for aim to instantiate the application served by the
 * api. The demo is useful to mock the API calls.
 *
 * The api should instantiate the application in its code in order to:
 * 1. Not use the application as a dependencies but build it as part of its build workflow
 * 2. Inject its own port and local storage dependencies
 */
import React from "react";
import ReactDOM from "react-dom";
import ApiApp from "../../../src/react-extension/ApiApp.js";
import mockFetch from "../mock/mockFetch";

mockFetch();

const domContainer = document.createElement("div");
document.body.appendChild(domContainer);
ReactDOM.render(<ApiApp/>, domContainer);
