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
 * @since         5.13.0
 */

import ColumnModel, { ColumnFields, ColumnModelTypes } from "./ColumnModel";

/**
 * Model related to the column Offline Mode use only with the UI
 */
class ColumnOfflineModel extends ColumnModel {
  /**
   * Constructor
   * @param {Object} columnDto
   */
  constructor(columnDto = {}) {
    columnDto.id = ColumnModelTypes.OFFLINE_MODE;
    columnDto.field = ColumnFields.OFFLINE;
    columnDto.width = columnDto.width || 210;
    columnDto.defaultWidth = 210;
    columnDto.minWidth = 160;
    columnDto.resizable = true;
    columnDto.draggable = true;
    columnDto.sortable = false;
    columnDto.getValue = (value) => value;
    super(columnDto);
  }
}

export default ColumnOfflineModel;
