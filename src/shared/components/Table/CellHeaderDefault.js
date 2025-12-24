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
import React, { Component, memo } from "react";
import PropTypes from "prop-types";

/**
 * This component represents a cell header default
 */
class CellHeaderDefault extends Component {
  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return <span className="cell-header-text">{this.props.label}</span>;
  }
}

CellHeaderDefault.propTypes = {
  label: PropTypes.string.isRequired, // The label of the column
};

export default memo(CellHeaderDefault);
