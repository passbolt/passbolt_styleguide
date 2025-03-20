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
import React, {Component, memo} from "react";
import PropTypes from "prop-types";
import {formatExpirationDateTimeAgo} from "../../utils/dateUtils";

/**
 * This component represents a table date cell
 */
class CellExpiryDate extends Component {
  /**
   * Render the CellExpiryDate component
   * It displays the value formatted as "time ago" with in the cell and `absoluteDate` as the HTML title.
   * However the value could be null and, in such case the value displayed is "Never" (same for the HTML title).
   * @return {JSX}
   */
  render() {
    if (!this.props.value) {
      return null;
    }

    const displayedDate = formatExpirationDateTimeAgo(this.props.value, this.props.t, this.props.locale);
    return (
      <div title={this.props.value || displayedDate}>
        <span>{displayedDate}</span>
      </div>
    );
  }
}

CellExpiryDate.propTypes = {
  value: PropTypes.string,
  locale: PropTypes.string, // the locale language
  t: PropTypes.func, // the translation function
};

export default memo(CellExpiryDate);
