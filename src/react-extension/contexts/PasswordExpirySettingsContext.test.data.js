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
 * @since         4.4.0
 */
import { DateTime } from "luxon";
import { defaultPasswordExpirySettingsEntityDto } from "../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";
import { defaultUserAppContext } from "./ExtAppContext.test.data";

export const defaultPasswordExpirySettingsContext = (data = {}) => {
  const settings = data?.getSettings ? data.getSettings() : defaultPasswordExpirySettingsEntityDto(data);

  const isFeatureEnabled =
    Boolean(settings?.automatic_update) || Boolean(settings?.automatic_expiry) || Boolean(settings?.policy_override);

  const defaultExpiryDate = DateTime.utc().plus({ days: settings?.default_expiry_period }).toISO();

  const defaultData = {
    findSettings: () => {},
    getSettings: () => settings,
    isFeatureEnabled: () => isFeatureEnabled,
    getDefaultExpirationDate: () => defaultExpiryDate,
  };

  return Object.assign(defaultData, data);
};

export const defaultProps = (data = {}) => ({
  context: defaultUserAppContext(),
  ...data,
});
