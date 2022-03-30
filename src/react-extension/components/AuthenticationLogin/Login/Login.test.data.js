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

/**
 * Default props
 * @params {Object} [props] Props to override
 * @returns {Object}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    displayAs: LoginVariations.SIGN_IN,
    userSettings: new UserSettings({
      "user.settings.securityToken.code": "TST",
      "user.settings.securityToken.color": "#f44336",
      "user.settings.securityToken.textColor": "#ffffff",
      "user.settings.trustedDomain": (new URL(window.location.href)).origin,
      "user.id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
      "user.username": "admin@passbolt.com",
      "user.firstname": "Admin",
      "user.lastname": "User",
      "user.settings.locale": "fr-FR"
    }),
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
      "security_token": {
        "code": "HGA",
        "color": "#8bc34a",
        "textcolor": "#000000",
      },
      "user": {
        "id": "f848277c-5398-58f8-a82a-72397af2d450",
        "role_id": "a58de6d3-f52c-5080-b79b-a601a647ac85",
        "username": "ada@passbolt.com",
        "active": true,
        "deleted": false,
        "created": "2020-08-13T10:10:02+00:00",
        "modified": "2020-09-13T10:10:02+00:00",
        "role": {
          "name": "admin",
        },
        "profile": {
          "id": "99522cc9-0acc-5ae2-b996-d03bded3c0a6",
          "user_id": "f848277c-5398-58f8-a82a-72397af2d450",
          "first_name": "Ada",
          "last_name": "Lovelace",
          "created": "2020-10-13T10:10:02+00:00",
          "modified": "2020-10-13T10:10:02+00:00",
          "avatar": {
            "url": {
              "medium": "img/avatar/user_medium.png",
              "small": "img/avatar/user.png"
            }
          }
        }
      }
    }
  };
  return Object.assign(defaultProps, props);
}
