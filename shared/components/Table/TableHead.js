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
import RowHeader from "./RowHeader";

/**
 * This component represents a table head
 */
class TableHead extends Component {
  /**
   * Get table style width
   * @return {{width: string}}
   */
  get tableStyleWidth() {
    return { width: `${this.props.tableContext.tableWidth}px` };
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div className="tableview-header">
        <table style={this.tableStyleWidth}>
          <thead>
            <RowHeader />
          </thead>
        </table>
      </div>
    );
  }
}

TableHead.propTypes = {
  tableContext: PropTypes.any, // The table context
};

export default withTable(TableHead);
