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

import ColumnModel, { ColumnFields, ColumnModelTypes } from "./ColumnModel";

/**
 * Model related to the column "attention required" use only with the UI
 */
class ColumnAttentionRequiredModel extends ColumnModel {
  /**
   * Constructor
   * @param {Object} columnDto
   */
  constructor(columnDto = {}) {
    columnDto.id = ColumnModelTypes.ATTENTION_REQUIRED;
    columnDto.field = ColumnFields.EXPIRED;
    columnDto.width = columnDto.width || 20;
    columnDto.defaultWidth = 20;
    columnDto.resizable = false;
    columnDto.draggable = false;
    columnDto.sortable = true;
    super(columnDto);
  }
}

export default ColumnAttentionRequiredModel;
