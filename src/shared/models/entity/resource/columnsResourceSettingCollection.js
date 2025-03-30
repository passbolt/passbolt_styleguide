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
 * @since         4.3.0
 */
import ColumnsSettingCollection from "../columnSetting/columnsSettingCollection";

class ColumnsResourceSettingCollection extends ColumnsSettingCollection {
  /*
   * ==================================================
   * Static getters
   * ==================================================
   */
  /**
   * Default columns resource setting collection
   * @return {ColumnsSettingCollection}
   * @constructor
   */
  static get DEFAULT() {
    return new ColumnsSettingCollection([
      {id: "favorite", label: "Favorite", position: 1, show: true},
      {id: "icon", label: "Icon", position: 2, show: true},
      {id: "name", label: "Name", position: 3, show: true},
      {id: "username", label: "Username", position: 4, show: true},
      {id: "password", label: "Password", position: 5, show: true},
      {id: "totp", label: "TOTP", position: 6, show: true},
      {id: "uri", label: "URI", position: 7, show: true},
      {id: "expired", label: "Expiry", position: 8, show: true},
      {id: "modified", label: "Modified", position: 9, show: true},
      {id: "location", label: "Location", position: 10, show: true}
    ]);
  }
}

export default ColumnsResourceSettingCollection;
