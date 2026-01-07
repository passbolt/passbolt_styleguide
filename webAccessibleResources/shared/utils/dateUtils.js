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

/**
 * Format date in time ago
 * @param {string} date The date to format
 * @param {function} translate The translation function
 * @param {string} locale the language to format the date to
 * @return {string}
 */
export const formatDateTimeAgo = (date, translate, locale) => {
  if (date === null) {
    return "n/a";
  }
  if (date === "Infinity") {
    return translate("Never");
  }
  const dateTime = DateTime.fromISO(date);
  const duration = dateTime.diffNow().toMillis();
  return duration > -1000 && duration < 0 ? translate("Just now") : dateTime.toRelative({ locale });
};

/**
 * Format expiration date in time ago
 * @param {string} date The date to format
 * @param {function} translate The translation function
 * @param {string} locale the language to format the date to
 * @return {string}
 */
export const formatExpirationDateTimeAgo = (date, translate, locale) => {
  if (!date) {
    return translate("Never");
  }

  return formatDateTimeAgo(date, translate, locale);
};

/**
 * Format the given date such that it matches the API format
 * @param {DateTime} date
 * @returns {string}
 */
export const formatDateForApi = (date) => date?.toUTC().toISO() || null;
