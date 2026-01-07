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
 * @since         3.4.0
 */

import { defaultPasswordGeneratorSettingsDto } from "../../models/passwordPolicies/PasswordGeneratorSettingsDto.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const configuration = props?.configuration
    ? Object.assign({}, props.configuration)
    : defaultPasswordGeneratorSettingsDto({
        min_length: 8, // @todo Check if it shouldn't be moveed into the default settings.
        max_length: 24,
      });

  return {
    onConfigurationChanged: jest.fn((newConfiguration) => {
      Object.entries(newConfiguration).forEach(([fieldName]) => {
        configuration[fieldName] = newConfiguration[fieldName];
      });
    }),
    ...props,
    configuration,
  };
}
