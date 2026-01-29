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
import React, { Component } from "react";
import PropTypes from "prop-types";
import CellDefault from "./CellDefault";
import ColumnModel from "../../models/column/ColumnModel";

/**
 * This component represents a table cell wrapper
 */
class CellWrapper extends Component {
  /**
   * Get column
   * @return {ColumnModel}
   */
  get column() {
    return this.props.column;
  }

  /**
   * Get value
   * @return {*|string}
   */
  get value() {
    return this.props.value;
  }

  /**
   * Get props for custom cell
   * @return {{checked: boolean, value: (*|string)}|{value: (*|string)}}
   */
  get propsCell() {
    const props = this.column.cellRenderer?.props || {};
    props.value = this.value;
    if (this.column.id === "checkbox") {
      props.checked = this.props.isSelected;
    }
    return props;
  }

  /**
   * Get the column width style
   * @return {{width: string} | null}
   */
  get columnWidthStyle() {
    // Get the column width
    return this.column?.width ? { width: `${this.column.width}px` } : null;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const Cell = this.column.cellRenderer?.component || CellDefault;
    return (
      <td className={`cell-${this.column.id}`} style={this.columnWidthStyle}>
        <Cell {...this.propsCell} />
      </td>
    );
  }
}

CellWrapper.propTypes = {
  value: PropTypes.any, // The value to display
  column: PropTypes.instanceOf(ColumnModel).isRequired, // The columns to display
  isSelected: PropTypes.bool, // The isSelected boolean property
};

export default CellWrapper;
