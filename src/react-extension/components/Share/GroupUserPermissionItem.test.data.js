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
 * @since         5.13.0
 */
import UserSettings from "../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../test/fixture/Settings/userSettings";
import MockPort from "../../test/mock/MockPort";
import SiteSettings from "../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../test/fixture/Settings/siteSettings";
import { defaultUserDto } from "../../../shared/models/entity/user/userEntity.test.data";
import { defaultProfileDto } from "../../../shared/models/entity/profile/ProfileEntity.test.data";
import { pgpKeys } from "../../../../test/fixture/pgpKeys/keys";

/**
 * Returns the default app context for the unit test
 * @param {object} appContext An existing app context
 * @returns {object}
 */
export function defaultAppContext(appContext) {
  const port = new MockPort();
  port.addRequestListener("passbolt.keyring.get-public-key-info-by-user", () => pgpKeys.ada);

  const userSettings = new UserSettings(userSettingsFixture);
  const defaultAppContext = {
    userSettings,
    port,
    setContext: (newContext) => {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
    siteSettings: new SiteSettings(siteSettingsFixture),
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Returns the default props for the unit test
 * @param {object} data Props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(),
    user: defaultUserDto({
      username: "ada@passbolt.com",
      profile: defaultProfileDto({
        first_name: "Ada",
        last_name: "Lovelace",
      }),
    }),
    ...data,
  };
}

/**
 * Returns props for a suspended user (disabled field set to a past date)
 * @param {object} data Props to override
 * @returns {object}
 */
export function defaultSuspendedUserProps(data = {}) {
  return defaultProps({
    user: defaultUserDto({
      username: "carol@passbolt.com",
      disabled: "2020-05-11T09:32:49+00:00",
      profile: defaultProfileDto({
        first_name: "Carol",
        last_name: "Shaw",
      }),
    }),
    ...data,
  });
}
