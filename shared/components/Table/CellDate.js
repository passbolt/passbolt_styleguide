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
 * @since         4.5.0
 */
import React, { Component, memo } from "react";
import PropTypes from "prop-types";
import { formatDateTimeAgo } from "../../utils/dateUtils";

/**
 * This component represents a table date cell
 */
class CellDate extends Component {
  /**
   * Render the CellDate component
   * It displays the given date formatted as "time ago" in the cell and the absolute date as the HTML title.
   * However if the value is null, nothing is displayed.
   * @return {JSX}
   */
  render() {
    if (!this.props.value) {
      return null;
    }

    const displayedDate = formatDateTimeAgo(this.props.value, this.props.t, this.props.locale);
    return (
      <div title={this.props.value}>
        <span>{displayedDate}</span>
      </div>
    );
  }
}

CellDate.propTypes = {
  value: PropTypes.string, // a string formatted as a date or null
  locale: PropTypes.string, // the locale language
  t: PropTypes.func, // the translation function
};

export default memo(CellDate);
