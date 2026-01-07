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
 * @since         5.0.0
 */
import ColumnsSettingCollection from "../columnSetting/columnsSettingCollection";

class ColumnsUserSettingCollection extends ColumnsSettingCollection {
  /*
   * ==================================================
   * Static getters
   * ==================================================
   */
  /**
   * Default columns user setting collection
   * @return {ColumnsSettingCollection}
   * @constructor
   */
  static get DEFAULT() {
    return new ColumnsSettingCollection([
      { id: "name", label: "Name", position: 1, show: true },
      { id: "username", label: "Username", position: 2, show: true },
      { id: "role", label: "Role", position: 3, show: true },
      { id: "suspended", label: "Suspended", position: 4, show: true },
      { id: "modified", label: "Modified", position: 5, show: true },
      { id: "last_logged_in", label: "Last logged in", position: 6, show: true },
      { id: "mfa", label: "MFA", position: 6, show: true },
      { id: "account_recovery", label: "Account Recovery", position: 8, show: true },
    ]);
  }
}

export default ColumnsUserSettingCollection;
