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
 * @since         3.10.0
 */
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import SsoProviders from "../../Administration/ManageSsoSettings/SsoProviders.data";

/**
 * Default props
 * @params {Object} [props] Props to override
 * @returns {Object}
 */
export function defaultProps(props = {}) {
  const userSettings = new UserSettings({
    "user.settings.trustedDomain": (new URL(window.location.href)).origin,
    "user.id": "d57c10f5-639d-5160-9c81-8a0c6c4ec856",
    "user.username": "admin@passbolt.com",
    "user.firstname": "Admin",
    "user.lastname": "User",
    "user.settings.locale": "fr-FR"
  });
  const defaultProps = {
    context: defaultAppContext({userSettings}),
    userSettings: userSettings,
    onSignIn: jest.fn(() => Promise.resolve()),
    onSecondaryActionClick: jest.fn(() => Promise.resolve()),
    ssoProvider: SsoProviders.find(provider => provider.id === "azure")
  };
  return Object.assign(defaultProps, props);
}
