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
import React, {Component, memo} from "react";
import PropTypes from "prop-types";
import Icon from "../Icons/Icon";

/**
 * This component represents a table cell favorite
 */
class CellAttentionRequired extends Component {
  /**
   * Returns true if the given date is under the current date with the given `aboutToExpireDelay` threshold..
   * @param {string} expirationDate the expiration date
   * @param {number} aboutToExpireDelay the configuration expiry notification period
   * @returns {boolean}
   * @private
   */
  static isAttentionRequiredOnExpiryDate(expirationDate) {
    if (!expirationDate) {
      return false;
    }

    const expiryDate = new Date(expirationDate);
    return expiryDate <= new Date();
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const displayIcon = CellAttentionRequired.isAttentionRequiredOnExpiryDate(this.props.value);
    if (!displayIcon) {
      return null;
    }

    return (
      <Icon name="exclamation"/>
    );
  }
}

CellAttentionRequired.propTypes = {
  value: PropTypes.string, // The value from which to compute the "is attention required?",
};

export default memo(CellAttentionRequired);
