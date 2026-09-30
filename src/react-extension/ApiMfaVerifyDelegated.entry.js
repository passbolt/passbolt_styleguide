/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.17.0
 */
import React from "react";
import { createRoot } from "react-dom/client";
import ApiMfaVerifyDelegated from "./ApiMfaVerifyDelegated";

/**
 * Entry point - MFA verification application delegated by the mobile applications, served by the API.
 * This entry point will be used to compile the production code see webpack.config.js
 */
const appDomElement = document.createElement("div");
document.body.appendChild(appDomElement);

const root = createRoot(appDomElement);
root.render(<ApiMfaVerifyDelegated />);
