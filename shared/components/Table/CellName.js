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
 * @since         5.0.0
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import AttentionSVG from "../../../img/svg/attention.svg";
import ResourceIcon from "../Icons/ResourceIcon";

/**
 * This component represents a table cell name
 */
class CellName extends Component {
  /**
   * Returns true if the given date is under the current date.
   * @returns {boolean}
   */
  get isAttentionRequiredOnExpiryDate() {
    const expirationDate = this.props.value.expired;
    if (!expirationDate) {
      return false;
    }

    const expiryDate = new Date(expirationDate);
    return expiryDate <= new Date();
  }

  /**
   * Get the name
   * @return {Object}
   */
  get name() {
    return this.props.value.metadata?.name;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const hasAttentionRequired = this.props.hasAttentionRequiredFeature && this.isAttentionRequiredOnExpiryDate;
    return (
      <div title={this.name}>
        {this.props.hasIconVisibleCallback() && <ResourceIcon resource={this.props.value} />}
        <span>{this.name}</span>
        {hasAttentionRequired && <AttentionSVG className="attention-required" />}
      </div>
    );
  }
}

CellName.propTypes = {
  value: PropTypes.object.isRequired, // The value to display
  hasIconVisibleCallback: PropTypes.func, // true if the icon should be visible
  hasAttentionRequiredFeature: PropTypes.bool.isRequired, // Attention require feature is enabled
};

export default CellName;
