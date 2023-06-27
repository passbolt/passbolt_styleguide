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
 * @link          https=//www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */
/**
 * Model related to the user model for UI
 */
class UserModel {
  /**
   * Constructor
   * @param {UserDto} userDto
   */
  constructor(userDto) {
    this.id = userDto.id;
    this.active = userDto.active;
    this.deleted = userDto.deleted;
    this.gpgkey  = userDto.gpgkey;
    this.groupsUsers = userDto.groups_users;
    this.isMfaEnabled  = userDto.is_mfa_enabled;
    this.lastLoggedIn  = userDto.last_logged_in;
    this.profile   = userDto.profile;
    this.role  = userDto.role;
    this.roleId  = userDto.role_id;
    this.username  = userDto.username;
  }
}

export default UserModel;
