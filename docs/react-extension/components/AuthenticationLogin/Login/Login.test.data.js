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

import {LoginVariations} from "./Login";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

/**
 * Default props
 * @params {Object} [props] Props to override
 * @returns {Object}
 */
export function defaultProps(props = {}) {
  const userSettings = new UserSettings({
    "user.settings.securityToken.code": "TST",
    "user.settings.securityToken.color": "#f44336",
    "user.settings.securityToken.textColor": "#ffffff",
    "user.settings.trustedDomain": (new URL(window.location.href)).origin,
    "user.id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "user.username": "admin@passbolt.com",
    "user.firstname": "Admin",
    "user.lastname": "User",
    "user.settings.locale": "fr-FR"
  });
  const defaultProps = {
    displayAs: LoginVariations.SIGN_IN,
    context: defaultAppContext({userSettings}),
    userSettings: userSettings,
    onSignIn: jest.fn(() => Promise.resolve()),
    onCheckPassphrase: jest.fn(() => Promise.resolve()),
    onSecondaryActionClick: jest.fn(() => Promise.resolve()),
  };
  return Object.assign(defaultProps, props);
}

/**
 * Default props
 * @params {Object} [props] Props to override
 * @returns {Object}
 */
export function defaultPropsWithAccount(props = {}) {
  const defaultProps = {
    userSettings: null,
    account: {
      "domain": (new URL(window.location.href)).origin,
      "user_id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "username": "admin@passbolt.com",
      "first_name": "Admin",
      "last_name": "User",
      "locale": "fr-FR",
      "security_token": {
        "code": "HGA",
        "color": "#8bc34a",
        "textcolor": "#000000",
      },
    }
  };
  return Object.assign(defaultProps, props);
}
