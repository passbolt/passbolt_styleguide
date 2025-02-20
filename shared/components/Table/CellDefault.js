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
import React, {Component, memo} from "react";
import PropTypes from "prop-types";

/**
 * This component represents a table cell default
 */
class CellDefault extends Component {
  /**
   * Get the value
   * @return {string}
   */
  get value() {
    return this.props.value;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    return (
      <div title={this.value}>
        {this.value}
      </div>
    );
  }
}

CellDefault.propTypes = {
  value: PropTypes.string.isRequired, // The value to display
};

export default memo(CellDefault);
