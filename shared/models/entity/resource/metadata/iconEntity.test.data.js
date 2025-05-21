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
 * @since         5.2.0
 */

import {ICON_TYPE_KEEPASS_ICON_SET} from "./IconEntity";

/**
 * Build minimal icon dto.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const minimalIconDto = (data = {}) => ({
  type: ICON_TYPE_KEEPASS_ICON_SET,
  ...data,
});

/**
 * Build default icon dto.
 * @param {object} data The data to override the default dto.
 * @returns {object}
 */
export const defaultIconDto = (data = {}) => minimalIconDto({
  value: 42,
  background_color: "#E64626",
  ...data,
});
