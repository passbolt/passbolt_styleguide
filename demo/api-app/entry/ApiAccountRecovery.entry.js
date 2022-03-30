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

/**
 * This is a demo entry point that has for aim to instantiate the account recovery application served by the
 * api. The demo is useful to mock the API calls.
 *
 * The production build will be based on the default entry defined in the webpack-api.config.js.
 */
import React from "react";
import ReactDOM from "react-dom";
import mockFetch from "../mock/mockFetch";
import ApiAccountRecovery from "../../../src/react-extension/ApiAccountRecovery";

mockFetch();
const appDomElement = document.createElement("div");
document.body.appendChild(appDomElement);
ReactDOM.render(<ApiAccountRecovery/>, appDomElement);
