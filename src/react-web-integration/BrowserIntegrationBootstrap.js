/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import {QuickAccessEvent} from "./Events/Quickaccess/QuickAccessEvent";
import {AuthLogin} from "./AuthLogin/AuthLogin";
import InFormManager from "./lib/InForm/InFormManager";

/**
 * Bootstrap the browser integration with browsed pages.
 */
function init() {
  AuthLogin.legacyAuthLogin();
  QuickAccessEvent.fillForm();
  InFormManager.initialize();
}

export const BrowserIntegrationBootstrap = {init};
