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
import CellHeaderWrapper from "./CellHeaderWrapper";
import { withTable } from "./Context/TableContext";

/**
 * This component represents a table row header
 */
class RowHeader extends Component {
  /**
   * Get columns
   * @return {*}
   */
  get columns() {
    return this.props.tableContext.columns;
  }

  get isDragging() {
    return this.props.tableContext.isDraggingColumn;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <tr className={`${this.isDragging ? "dragging" : ""}`}>
        {this.columns.map((column, index) => (
          <CellHeaderWrapper key={column.id} column={column} index={index} />
        ))}
      </tr>
    );
  }
}

RowHeader.propTypes = {
  tableContext: PropTypes.any, // The table context
};

export default withTable(RowHeader);
