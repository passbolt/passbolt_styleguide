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

