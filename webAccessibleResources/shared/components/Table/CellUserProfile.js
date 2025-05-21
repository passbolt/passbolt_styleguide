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
import React, {Component, memo} from "react";
import PropTypes from "prop-types";
import AttentionSVG from "../../../img/svg/attention.svg";

/**
 * This component represents a table cell user profile name
 */
class CellUserProfile extends Component {
  /**
   * Returns true if the given date is under the current date.
   * @returns {boolean}
   */
  get isAttentionRequired() {
    return (Boolean(this.props.value.pending_account_recovery_request)) || this.props.value.missing_metadata_key_ids?.length > 0;
  }

  /**
   * Get the name
   * @return {Object}
   */
  get name() {
    return `${this.props.value.profile?.first_name} ${this.props.value.profile?.last_name}`;
  }

  /**
   * Render the component
   * @return {JSX}
   */
  render() {
    const hasAttentionRequired = this.props.hasAttentionRequiredFeature && this.isAttentionRequired;
    return (
      <div title={this.name}>
        <span>
          {this.name}
        </span>
        {hasAttentionRequired &&
          <AttentionSVG className="attention-required"/>
        }
      </div>
    );
  }
}

CellUserProfile.propTypes = {
  value: PropTypes.object.isRequired, // The value to display
  hasAttentionRequiredFeature: PropTypes.bool.isRequired // Attention require feature is enabled
};

export default memo(CellUserProfile);
