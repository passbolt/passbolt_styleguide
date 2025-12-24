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
import { withTable } from "./Context/TableContext";

/**
 * This component represents a table body
 */
class TableBody extends Component {
  /**
   * Get table style width
   * @return {{width: string}}
   */
  get tableBodyStyle() {
    return {
      MozUserSelect: "none",
      WebkitUserSelect: "none",
      msUserSelect: "none",
      width: `${this.props.tableContext.tableWidth}px`,
    };
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <table style={this.tableBodyStyle}>
        <tbody ref={this.props.tableBodyRef}>{this.props.items}</tbody>
      </table>
    );
  }
}

TableBody.propTypes = {
  tableContext: PropTypes.any, // The table context
  items: PropTypes.array.isRequired, // The items to display
  tableBodyRef: PropTypes.any,
};

export default withTable(TableBody);
