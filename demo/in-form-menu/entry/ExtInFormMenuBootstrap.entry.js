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
 * This is a demo entry point that has for aim to instantiate the passbolt application served by the
 * extension. The demo is useful to inject extra dependencies: port and local storage.
 *
 * The browser extension build should be based on this entry point and customizes it.
 */
import React from "react";
import ReactDOM from "react-dom";
import mockPort from "../mock/mockPort";
import mockStorage from "../mock/mockStorage";
import ExtInFormMenuBootstrap from "./ExtInFormMenuBootstrap";

const browserExtensionUrl = "http://localhost:3002/";
const mockedStorage = mockStorage();
const mockedPort = mockPort(mockedStorage);

const domContainer = document.createElement("div");
document.body.appendChild(domContainer);
ReactDOM.render(<ExtInFormMenuBootstrap port={mockedPort} storage={mockedStorage} browserExtensionUrl={browserExtensionUrl}/>, domContainer);
