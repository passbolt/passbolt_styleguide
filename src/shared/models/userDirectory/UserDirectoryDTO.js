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
 * Model related to the user dto
 */
class UserDirectoryDTO {
  /**
   * Constructor
   * @param {UserDirectoryDTO} userDirectoryDTO
   */
  constructor(userDirectoryDTO) {
    //Sections opened
    this.openCredentials = userDirectoryDTO.length !== 0;
    this.openDirectoryConfiguration =  userDirectoryDTO.length !== 0 ? false;
    this.openSynchronizationOptions = false;
    //Form field option
    this.userDirectoryToggle = false;
    // CREDENTIALS FIELDS
    this.directoryType = "ad";
    this.connectionType = "plain";
    this.host = "";
    this.hostError = null;
    this.port = "389";
    this.portError = null;
    this.username = "";
    this.password = "";
    this.domain = "";
    this.domainError = null;
    this.baseDn = "";
    // DIRECTORY CONFIGURATION FIELDS
    this.groupPath = "";
    this.userPath = "";
    this.groupObjectClass = "";
    this.userObjectClass = "";
    this.useEmailPrefix = false;
    this.emailPrefix = "";
    this.emailSuffix = "";
    // SYNCHRONIZATION OPTIONS
    this.defaultAdmin = "";
    this.defaultGroupAdmin = "";
    this.groupsParentGroup = "";
    this.usersParentGroup = "";
    this.enabledUsersOnly = false;
    this.createUsers = true;
    this.deleteUsers = true;
    this.createGroups = true;
    this.deleteGroups = true;
    this.updateGroups = true;
  }
}

export default UserDirectoryModel;

