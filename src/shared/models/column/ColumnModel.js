/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.2.0
 */

/**
 * Model related to the column use only with the UI
 */
class ColumnModel {
  /**
   * Constructor
   * @param {Object} columnDto
   */
  constructor(columnDto = {}) {
    this.id = columnDto.id;
    this.field = columnDto.field;
    this.label = columnDto.label;
    this.width = columnDto.width;
    this.defaultWidth = columnDto.defaultWidth;
    this.resizable = columnDto.resizable;
    this.draggable = columnDto.draggable;
    this.sortable = columnDto.sortable;
    this.getValue = columnDto.getValue;
    this.cellRenderer = columnDto.cellRenderer;
    this.headerCellRenderer = columnDto.headerCellRenderer;
  }
}

export default ColumnModel;

export const ColumnModelTypes = {
  CHECKBOX: "checkbox",
  EXPIRED: "expired",
  FAVORITE: "favorite",
  LOCATION: "location",
  MODIFIED: "modified",
  ICON: "icon",
  NAME: "name",
  PASSWORD: "password",
  TOTP: "totp",
  URI: "uri",
  USERNAME: "username",
  ROLE: "role",
  SUSPENDED: "suspended",
  LAST_LOGGED_IN: "last_logged_in",
  MFA: "mfa",
  ACCOUNT_RECOVERY: "account_recovery",
};

export const ColumnFields = {
  CHECKBOX: "checkbox",
  EXPIRED: "expired",
  FAVORITE: "favorite",
  LOCATION: "location",
  MODIFIED: "modified",
  PASSWORD: "password",
  TOTP: "totp",
  METADATA_NAME: "metadata.name",
  METADATA_USERNAME: "metadata.username",
  METADATA_URIS: "metadata.uris",
  USER_PROFILE: "profile",
  USER_USERNAME: "username",
  USER_ROLE: "role_id",
  USER_SUSPENDED: "disabled",
  USER_LAST_LOGGED_IN: "last_logged_in",
  USER_MFA: "is_mfa_enabled",
  USER_ACCOUNT_RECOVERY: "account_recovery_user_setting.status",
};
