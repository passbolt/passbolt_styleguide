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
 * @since         4.5.0
 */

/**
 * An enum to gather the different possible user statuses.
 * These are use in the UI directly and needs to be translated.
 *
 * Hack the translation mechanism:
 * this.props.t('active')
 * this.props.t('suspended')
 * this.props.t('deleted')
 */
export const USER_STATUS = {
  ACTIVE: "active",
  SUSPENDED: "suspended",
  DELETED: "deleted",
};

/**
 * Returns true if the user is suspended since the given date
 * @param {User} user the user to check the suspended state
 * @returns {boolean}
 */
export const isUserSuspended = user => Boolean(user?.disabled && new Date(user.disabled) <= new Date());

/**
 * Returns the given user's status
 * @param {User} user
 * @returns {string<USER_STATUS>}
 */
export const getUserStatus = user => {
  const isDeleted = Boolean(user?.deleted);
  if (isDeleted) {
    return USER_STATUS.DELETED;
  }

  const isSuspended = isUserSuspended(user);
  if (isSuspended) {
    return USER_STATUS.SUSPENDED;
  }

  return USER_STATUS.ACTIVE;
};

/**
 * Returns a string containing `firstname lastname` of the given user or `unknown user` if no data is available.
 * @param {User} user
 * @param {function} [t] the translation function. Not necessary if called in a context where it is sure the user is defined
 * @param {object} [options] options to pass to the formatting function
 * @returns {string}
 */
export const getUserFormattedName = (user, t = null, options = {withUsername: false}) => {
  const profile = user?.profile;
  if (!profile) {
    return t("Unknown user");
  }

  const hasName = Boolean(profile.first_name) || Boolean(profile.last_name);
  if (!hasName) {
    return t("Unknown user");
  }

  return options.withUsername
    ? `${profile.first_name} ${profile.last_name} (${user.username})`
    : `${profile.first_name} ${profile.last_name}`;
};
