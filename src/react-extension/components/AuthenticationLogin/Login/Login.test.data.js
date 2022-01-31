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

import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import {LoginVariations} from "./Login";

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps(props) {
  const defaultProps = {
    displayAs: LoginVariations.SIGN_IN,
    userSettings: new UserSettings({
      "user.settings.securityToken.code": "TST",
      "user.settings.securityToken.color": "#f44336",
      "user.settings.securityToken.textColor": "#ffffff",
      "user.settings.trustedDomain": "https://passbolt.local",
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
  return Object.assign(defaultProps, props || {});
}
