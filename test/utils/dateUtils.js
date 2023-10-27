
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

import {formatDateTimeAgo as formatDateTimeAgoOriginal} from "../../src/shared/utils/dateUtils";

/**
 * Test utils to format a given date such as the "production" version would do and with default translation functions and language.
 * @param {Date} promise the promise to await for and that can potentially crash
 * @returns {Promise<string>}
 */
export const formatDateTimeAgo = date => formatDateTimeAgoOriginal(date, t => t, 'en-GB');
